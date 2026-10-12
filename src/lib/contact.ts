/**
 * Contact form submission.
 *
 * This runs in the browser, not on the server, because Web3Forms rejects
 * server-side requests on the free plan:
 *   "This method is not allowed. Use our API in client side or contact
 *    support with server IP address (Pro plan is required)"
 *
 * That is fine for this provider — a Web3Forms access key is public by
 * design, scoped to one inbox, and rate-limited on their side. It is not a
 * credential, which is why it uses the NEXT_PUBLIC_ prefix here.
 *
 * Written as a plain async function so `useActionState` can drive it exactly
 * like a Server Action, keeping the pending/error/success handling identical.
 */

import { profile } from "@/content/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Per-field messages, keyed by input name. */
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SUCCESS = "Thanks — your message is on its way. I'll reply soon.";

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  /* Honeypot: a real person never sees or fills this field. */
  const trap = String(formData.get("company") ?? "").trim();

  if (trap.length > 0) {
    // Report success so bots get no signal that they were caught.
    return { status: "success", message: SUCCESS };
  }

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(email))
    fieldErrors.email = "Enter a valid email address.";
  if (message.length < 10)
    fieldErrors.message =
      "A little more detail would help — at least 10 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[contact] NEXT_PUBLIC_WEB3FORMS_KEY is not set — copy .env.example to .env.local and add your key.",
      );
    }
    return {
      status: "error",
      message: `The form is not configured right now — please email ${profile.email} directly.`,
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: `Portfolio enquiry from ${name}`,
        from_name: "Portfolio Contact Form",
        replyto: email,
        /* Web3Forms' own bot field, in addition to the honeypot above. */
        botcheck: false,
      }),
    });

    const data: { success?: boolean; message?: string } = await response
      .json()
      .catch(() => ({}));

    if (!response.ok || !data.success) {
      return {
        status: "error",
        message:
          data.message ??
          `Something went wrong — please email ${profile.email} directly.`,
      };
    }

    return { status: "success", message: SUCCESS };
  } catch {
    return {
      status: "error",
      message: "Network error. Please check your connection and try again.",
    };
  }
}
