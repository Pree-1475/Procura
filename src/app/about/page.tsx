export default function AboutPage() {
  return (
    <div className="animate-fade-in bg-white" style={{ minHeight: "100%", flex: 1 }}>
      <div className="container" style={{ maxWidth: "800px", padding: "8rem 2rem" }}>
        
        <header style={{ marginBottom: "6rem" }}>
          <h1 style={{ fontSize: "clamp(40px, 4vw, 56px)", fontWeight: 600, color: "var(--deep-ink)", marginBottom: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            About Procura
          </h1>
          <p style={{ fontSize: "20px", color: "var(--slate)", lineHeight: 1.5 }}>
            Procura is an initiative by Dr. Manjesh Kumar and Harsha Kondaveeti, created to help researchers navigate difficult sourcing and procurement requirements.
          </p>
        </header>

        <div style={{ position: "relative", padding: "4rem 0", borderTop: "1px solid var(--border-color)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", '@media (min-width: 768px)': { gridTemplateColumns: "1fr 1fr" } } as any}>
            
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 600, color: "var(--deep-ink)", marginBottom: "0.25rem" }}>
                Dr. Manjesh Kumar
              </h2>
              <p style={{ fontSize: "14px", color: "var(--slate)", fontWeight: 500, marginBottom: "1.5rem" }}>CO-FOUNDER</p>
            </div>

            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 600, color: "var(--deep-ink)", marginBottom: "0.25rem" }}>
                Harsha Kondaveeti
              </h2>
              <p style={{ fontSize: "14px", color: "var(--slate)", fontWeight: 500, marginBottom: "1.5rem" }}>CO-FOUNDER</p>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
