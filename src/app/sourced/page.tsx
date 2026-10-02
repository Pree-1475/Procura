import { prisma } from '@/lib/db';
import Link from 'next/link';

export default async function SourcedPage() {
  const sourcedItems = await prisma.requirement.findMany({
    where: { 
      visibility: 'public',
      status: 'Delivered'
    },
    orderBy: { updatedAt: 'desc' },
    take: 20
  });

  return (
    <div className="bg-ivory" style={{ minHeight: "100%", flex: 1, padding: "6rem 0" }}>
      <div className="container animate-fade-in" style={{ maxWidth: "1000px" }}>
        
        <header style={{ marginBottom: "6rem" }}>
          <h1 style={{ fontSize: "clamp(40px, 4vw, 56px)", fontWeight: 600, color: "var(--deep-ink)", marginBottom: "1rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            What We've Sourced
          </h1>
          <p style={{ fontSize: "18px", color: "var(--slate)" }}>
            A growing record of research requirements that Procura has helped move through sourcing and procurement.
          </p>
        </header>

        {sourcedItems.length === 0 ? (
          <div style={{ padding: "4rem 0", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
            <div style={{ maxWidth: "500px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 500, color: "var(--deep-ink)", marginBottom: "1rem" }}>
                We're building this record as requirements are fulfilled.
              </h3>
              <p style={{ fontSize: "18px", color: "var(--slate)", marginBottom: "2rem" }}>
                There are no public sourcing records available at this time. Sourced equipment and materials will appear here once cleared for public showcase.
              </p>
              <Link href="/submit" className="btn btn-outline" style={{ display: "inline-flex" }}>
                Submit a Requirement &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {sourcedItems.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id} style={{ 
                  display: "grid", 
                  gridTemplateColumns: isEven ? "1fr 1fr" : "1fr 1fr", 
                  borderTop: "1px solid var(--border-color)",
                  padding: "4rem 0"
                }}>
                  {/* Content Side */}
                  <div style={{ paddingRight: isEven ? "4rem" : "0", paddingLeft: isEven ? "0" : "4rem", gridColumn: isEven ? "1" : "2" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                      <span className="metadata" style={{ color: "var(--slate)" }}>{String(index + 1).padStart(2, '0')}</span>
                      <span className="metadata" style={{ backgroundColor: "var(--warm-grey)", padding: "2px 8px", color: "var(--deep-ink)" }}>RECENTLY SOURCED</span>
                    </div>
                    
                    <h3 style={{ fontSize: "2rem", fontWeight: 500, color: "var(--deep-ink)", marginBottom: "2rem", lineHeight: 1.2 }}>
                      {item.title}
                    </h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      <div>
                        <p className="metadata" style={{ marginBottom: "0.25rem" }}>Requested by</p>
                        <p style={{ fontSize: "15px", color: "var(--deep-ink)", fontWeight: 500 }}>{item.profName}</p>
                      </div>
                      
                      <div>
                        <p className="metadata" style={{ marginBottom: "0.25rem" }}>Institution / Department</p>
                        <p style={{ fontSize: "15px", color: "var(--slate)" }}>{item.department}</p>
                      </div>
                      
                      <div>
                        <p className="metadata" style={{ marginBottom: "0.25rem" }}>Delivered</p>
                        <p style={{ fontSize: "15px", color: "var(--slate)" }}>
                          {new Date(item.updatedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Visual Side */}
                  <div style={{ gridColumn: isEven ? "2" : "1", gridRow: "1", position: "relative", minHeight: "300px", backgroundColor: "var(--pure-white)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
                    {/* Subtle technical placeholder visual */}
                    <div style={{ position: "absolute", top: "1rem", left: "1rem", opacity: 0.3 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--slate)" strokeWidth="1"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p className="metadata" style={{ color: "var(--slate)", marginBottom: "0.5rem" }}>REF: {item.referenceId}</p>
                      <div className="req-line-h" style={{ width: "40px", margin: "0 auto 1rem" }}></div>
                      <p style={{ fontSize: "13px", color: "var(--slate)", maxWidth: "200px" }}>
                        Equipment details and specifications securely archived.
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
