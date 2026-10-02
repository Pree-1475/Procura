import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="bg-white" style={{ minHeight: "100%", flex: 1, padding: "6rem 0" }}>
      <div className="container animate-fade-in" style={{ maxWidth: "800px" }}>
        
        <header style={{ marginBottom: "6rem" }}>
          <h1 style={{ fontSize: "clamp(40px, 4vw, 56px)", fontWeight: 600, color: "var(--deep-ink)", marginBottom: "1rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Contact Us
          </h1>
          <p style={{ fontSize: "18px", color: "var(--slate)", maxWidth: "600px" }}>
            Have a question about a complex requirement or need to speak with the procurement team?
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "0", borderTop: "1px solid var(--border-color)", marginBottom: "6rem" }}>
          
          <div style={{ padding: "3rem 0", borderBottom: "1px solid var(--border-color)", display: "grid", gridTemplateColumns: "1fr", gap: "2rem", '@media (min-width: 768px)': { gridTemplateColumns: "200px 1fr" } } as any}>
            <div>
              <p className="metadata" style={{ color: "var(--deep-ink)" }}>EMAIL</p>
            </div>
            <div>
              <p className="body-text" style={{ marginBottom: "1rem" }}>
                For general inquiries and support.
              </p>
              <a href="mailto:procurement@procura.com" style={{ fontSize: "19px", color: "var(--deep-ink)", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                procurement@procura.com
              </a>
            </div>
          </div>

          <div style={{ padding: "3rem 0", borderBottom: "1px solid var(--border-color)", display: "grid", gridTemplateColumns: "1fr", gap: "2rem", '@media (min-width: 768px)': { gridTemplateColumns: "200px 1fr" } } as any}>
            <div>
              <p className="metadata" style={{ color: "var(--deep-ink)" }}>INTERNAL CHAT</p>
            </div>
            <div>
              <p className="body-text" style={{ marginBottom: "1rem" }}>
                Reach out on our internal Slack channel.
              </p>
              <span style={{ fontSize: "19px", color: "var(--deep-ink)", fontFamily: "var(--font-mono)" }}>
                #research-procurement
              </span>
            </div>
          </div>
          
        </div>
        
        <div style={{ backgroundColor: "var(--warm-ivory)", padding: "4rem", border: "1px solid var(--border-color)" }}>
          <h3 style={{ fontSize: "1.75rem", fontWeight: 400, color: "var(--deep-ink)", marginBottom: "1.5rem" }}>
            Need to submit a requirement?
          </h3>
          <p className="body-text" style={{ marginBottom: "2.5rem", maxWidth: "600px" }}>
            Please use our official submission form rather than emailing requirements directly. This ensures we capture all necessary details and can track your request properly.
          </p>
          <Link href="/submit" className="btn btn-primary" style={{ display: "inline-flex" }}>
            Go to Submission Form &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
