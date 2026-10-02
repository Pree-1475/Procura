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
              
              <ul style={{ fontSize: "14px", color: "var(--slate)", lineHeight: 1.6, paddingLeft: "1.2rem", marginBottom: "1.5rem", fontWeight: 500 }}>
                <li>Founder and CEO of Volta</li>
                <li>Head Researcher of Hydrogen Storage at Project Volta</li>
                <li>Internship at NUS Singapore</li>
                <li>2x Internships at DRDO</li>
                <li>2x Gold Medalist of Research Day at SRMAP</li>
                <li>4x International Conferences</li>
              </ul>
              
              <div style={{ fontSize: "14px", color: "var(--slate)", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p>Founder and CEO of Volta, a startup in the EV sector that aims to revolutionize the transportation industry with sustainable and affordable solutions. He has led Volta from its inception to its current stage, securing funding, building partnerships, and overseeing product development and marketing.</p>
                <p>He is also a Head researcher of Hydrogen storage at Project_Volta, a collaborative initiative between academia and industry to explore the potential of hydrogen as an alternative fuel source for EVs. He has contributed to the design, testing, and optimization of hydrogen storage vessels, applying his skills in 3D printing, material science, and manufacturing, with multiple papers and patents published on this topic.</p>
                <p>With a passion for engineering and innovation, and a strong academic background in mechanical engineering from SRM University, AP, he has worked on various projects, such as a solar electric cycle and a drone. He is skilled in battery electric vehicles, Ansys Workbench, and SolidWorks.</p>
                <p>His goal is to make a positive impact on the environment and society by advancing the EV sector and promoting green mobility, always eager to learn new things, collaborate, and take on new challenges.</p>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
