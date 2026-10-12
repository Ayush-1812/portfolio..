"use server";

/**
 * Contact form submission.
 *
 * Runs on the server so the Web3Forms access key stays in the environment
 * rather than being shipped in the client bundle, and so validation and the
 * honeypot check cannot be bypassed by editing the request in devtools.
 */

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

const CONTACT_EMAIL = "ayushcarpenter1812.work@gmail.com";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
    // Silently accept so bots get no signal that they were caught.
    return { status: "success", message: "Thanks — your message is on its way." };
  }

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (message.length < 10)
    fieldErrors.message = "A little more detail would help — at least 10 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  const accessKey = process.env.WEB3FORMS_KEY;
  if (!accessKey) {
    /* Surfaced to the visitor, so it names the fallback rather than just
       failing. In development it also flags the missing variable. */
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[contact] WEB3FORMS_KEY is not set — copy .env.example to .env.local and add your key.",
      );
    }
    return {
      status: "error",
      message: `The form is not configured right now — please email ${CONTACT_EMAIL} directly.`,
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: `Portfolio enquiry from ${name}`,
        from_name: "Portfolio Contact Form",
        replyto: email,
      }),
    });

    const data: { success?: boolean; message?: string } = await response
      .json()
      .catch(() => ({}));

    if (!response.ok || !data.success) {
      return {
        status: "error",
        message: data.message ?? "Something went wrong — please try again, or email me directly.",
      };
    }

    return {
      status: "success",
      message: "Thanks — your message is on its way. I will reply soon.",
    };
  } catch {
    return {
      status: "error",
      message: "Network error. Please check your connection and try again.",
    };
  }
}
