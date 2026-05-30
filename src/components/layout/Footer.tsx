"use client";

export function Footer() {
  return (
    <footer
      className="py-12 text-center"
      style={{
        background: "#05070A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container mx-auto px-6 flex flex-col items-center gap-6">
        <h2
          className="font-sans font-bold text-3xl tracking-tighter"
          style={{ color: "#e1e2e7" }}
        >
          AJ
        </h2>
        <p
          className="font-mono text-xs uppercase"
          style={{ color: "#908f9e", letterSpacing: "0.2em" }}
        >
          © {new Date().getFullYear()} Ayush Carpenter. Engineered with Precision.
        </p>
        <div className="flex items-center gap-6 font-mono text-[10px] uppercase" style={{ letterSpacing: "0.2em" }}>
          {["Privacy Policy", "Terminal Access", "Source Code"].map((item) => (
            <a
              key={item}
              href="#"
              className="transition-colors"
              style={{ color: "#454653" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e1e2e7")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#454653")}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
