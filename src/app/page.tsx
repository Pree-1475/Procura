import Link from "next/link";
import Image from "next/image";
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const sourcedItems = await prisma.requirement.findMany({
    where: { visibility: 'public', status: 'Delivered' },
    orderBy: { updatedAt: 'desc' },
    take: 5
  });

  return (
    <div className="animate-fade-in">
      
      {/* HERO */}
      <section className="bg-ivory" style={{ padding: "4rem 0 5rem" }}>
        <div className="container hero-grid">
          <div>
            <h1 style={{
              fontSize: "clamp(42px, 5vw, 66px)",
              fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.025em",
              color: "var(--deep-ink)", marginBottom: "1.25rem", maxWidth: "600px"
            }}>
              Research shouldn't be held back by procurement.
            </h1>
            <p style={{ fontSize: "17px", lineHeight: 1.5, color: "var(--slate)", marginBottom: "2rem", maxWidth: "460px" }}>
              Procura helps researchers navigate sourcing and procurement — from specialized materials to complex equipment.
            </p>
            <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
              <Link href="/submit" className="btn btn-primary">Submit a Requirement</Link>
              <Link href="/track" style={{ fontSize: "15px", fontWeight: 500, color: "var(--slate)", borderBottom: "1px solid var(--border-color)", paddingBottom: "2px" }}>
                Track a Request
              </Link>
            </div>
            <p style={{ fontSize: "13px", color: "var(--deep-ink)", fontWeight: 600 }}>
              An initiative by Dr. Manjesh Kumar and Harsha Kondaveeti.
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-inner" style={{ 
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {/* Subtle technical background */}
              <div style={{ position: "absolute", top: "5%", left: "5%", width: "90%", height: "90%", border: "1px solid var(--border-color)", opacity: 0.15, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "20%", left: "-10px", width: "calc(100% + 20px)", borderTop: "1px solid var(--border-color)" }} />
                <div style={{ position: "absolute", top: "70%", left: "-10px", width: "calc(100% + 20px)", borderTop: "1px dashed var(--border-color)" }} />
                <div style={{ position: "absolute", left: "25%", top: "-10px", height: "calc(100% + 20px)", borderLeft: "1px solid var(--border-color)" }} />
              </div>

              {/* Research equipment photograph */}
              <div style={{ 
                position: "relative", 
                width: "90%",
                maxWidth: "480px",
                aspectRatio: "3/4",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 20px 40px -15px rgba(23, 32, 39, 0.15)",
                zIndex: 2,
                animation: "fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}>
                <Image 
                  src="/images/hero-equipment.jpg" 
                  alt="Precision scientific research equipment" 
                  fill 
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM + WHAT PROCURA DOES — merged into one tight section */}
      <section className="bg-white" style={{ borderTop: "1px solid var(--border-color)", padding: "4rem 0" }}>
        <div className="container">
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 600, lineHeight: 1.12, letterSpacing: "-0.02em",
            color: "var(--deep-ink)", maxWidth: "780px", marginBottom: "2.5rem"
          }}>
            Researchers should be spending time on research — not chasing suppliers, specifications, and logistics.
          </h2>
          <p style={{ fontSize: "16px", color: "var(--slate)", lineHeight: 1.6, maxWidth: "640px" }}>
            Procura sits between your research needs and the complexity of procurement. You tell us what you need — we handle suppliers, quotations, and coordination.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-ink" style={{ padding: "4rem 0 5rem" }}>
        <div className="container">
          <h2 style={{
            fontSize: "clamp(28px, 3vw, 38px)",
            fontWeight: 600, color: "var(--pure-white)",
            marginBottom: "3rem", maxWidth: "500px",
            lineHeight: 1.15, letterSpacing: "-0.02em"
          }}>
            A requirement moves through five stages.
          </h2>
          <div className="steps-grid">
            {[
              { n: '01', t: 'Submit', d: 'Tell us what you need.' },
              { n: '02', t: 'Review', d: 'We review the requirement.' },
              { n: '03', t: 'Source', d: 'We work through sourcing.' },
              { n: '04', t: 'Procure', d: 'We coordinate procurement.' },
              { n: '05', t: 'Deliver', d: 'Delivered to you.' }
            ].map(s => (
              <div key={s.n} className="step-item">
                <div className="step-num">{s.n}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 500, marginBottom: "0.25rem", color: "var(--pure-white)" }}>{s.t}</h3>
                <p style={{ fontSize: "14px", color: "var(--soft-blue-grey)", lineHeight: 1.45, opacity: 0.7 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE'VE SOURCED */}
      <section id="sourced" className="bg-ivory" style={{ padding: "4rem 0 5rem" }}>
        <div className="container">
          <h2 style={{
            fontSize: "clamp(28px, 3vw, 38px)",
            fontWeight: 600, color: "var(--deep-ink)",
            marginBottom: "2rem", lineHeight: 1.15, letterSpacing: "-0.02em"
          }}>
            What We've Sourced
          </h2>

          {sourcedItems.length === 0 ? (
            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
              <p style={{ fontSize: "16px", color: "var(--slate)" }}>
                We're building this record as requirements are fulfilled. Sourced items will appear here once cleared for public showcase.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {sourcedItems.map(item => (
                <div key={item.id} className="sourced-item" style={{
                  padding: "1.25rem 1.5rem", backgroundColor: "var(--pure-white)",
                  border: "1px solid var(--border-color)", cursor: "default"
                }}>
                  <p style={{ fontSize: "12px", color: "var(--slate)", marginBottom: "0.5rem", fontFamily: "var(--font-mono)", letterSpacing: "0.03em" }}>
                    {item.referenceId}
                  </p>
                  <h3 style={{ fontSize: "18px", fontWeight: 500, color: "var(--deep-ink)", marginBottom: "0.5rem" }}>{item.title}</h3>
                  <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                    <p style={{ fontSize: "14px", color: "var(--slate)" }}>{item.department}</p>
                    <p style={{ fontSize: "14px", color: "var(--slate)" }}>
                      {new Date(item.updatedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ABOUT THE INITIATIVE */}
      <section id="about" className="bg-white" style={{ borderTop: "1px solid var(--border-color)", padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(24px, 3vw, 32px)",
            fontWeight: 600, color: "var(--deep-ink)",
            marginBottom: "1rem", lineHeight: 1.2, letterSpacing: "-0.02em"
          }}>
            About the Initiative
          </h2>
          <p style={{ fontSize: "16px", color: "var(--slate)", lineHeight: 1.6, marginBottom: "3rem", maxWidth: "600px" }}>
            Procura was created to help researchers communicate what they need while the team works through the sourcing and procurement process — removing friction from difficult or specialized requirements.
          </p>

          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "2rem" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--slate)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
              The people behind Procura
            </p>
            <div className="founders-grid">
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: 600, color: "var(--deep-ink)", marginBottom: "0.25rem" }}>Dr. Manjesh Kumar</h3>
                <p style={{ fontSize: "14px", color: "var(--slate)" }}>Faculty Member, SRM University-AP</p>
              </div>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: 600, color: "var(--deep-ink)", marginBottom: "0.25rem" }}>Harsha Kondaveeti</h3>
                <p style={{ fontSize: "14px", color: "var(--slate)", fontStyle: "italic" }}>Profile details will be added.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted-blue" style={{ padding: "4rem 0" }}>
        <div className="container">
          <h2 style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600, color: "var(--pure-white)",
            marginBottom: "1.25rem", lineHeight: 1.15, letterSpacing: "-0.02em"
          }}>
            Have a research requirement?
          </h2>
          <Link href="/submit" className="btn btn-primary" style={{ backgroundColor: "var(--pure-white)", color: "var(--deep-ink)" }}>
            Submit a Requirement →
          </Link>
        </div>
      </section>

      {/* TRACK */}
      <section className="bg-ink" style={{ padding: "3.5rem 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 600, color: "var(--pure-white)", marginBottom: "0.25rem", lineHeight: 1.2 }}>
              Check your request.
            </h2>
            <p style={{ fontSize: "15px", color: "var(--soft-blue-grey)" }}>
              Enter your Reference ID to see the current status.
            </p>
          </div>
          <Link href="/track" className="btn btn-outline" style={{ borderColor: "rgba(255,255,255,0.2)", color: "var(--pure-white)" }}>
            Track Request →
          </Link>
        </div>
      </section>

    </div>
  );
}
