'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function TrackContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';
  
  const [referenceId, setReferenceId] = useState(initialId);
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const statuses = [
    'Submitted',
    'Under Review',
    'Sourcing',
    'Procurement',
    'Delivered'
  ];

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  async function handleSearch(searchId: string = referenceId) {
    if (!searchId.trim()) return;
    
    setIsSearching(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/track?id=${encodeURIComponent(searchId)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request not found');
      }
      
      setResult(data);
    } catch (err: any) {
      setError(err.message);
      setResult(null);
    } finally {
      setIsSearching(false);
    }
  }

  function renderStatusTimeline(currentStatus: string) {
    const currentIndex = statuses.indexOf(currentStatus);
    
    return (
      <div style={{ marginTop: "4rem", padding: "3rem", backgroundColor: "var(--deep-ink)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {statuses.map((status, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={status} style={{ display: "flex", alignItems: "center", gap: "1.5rem", position: "relative" }}>
                {/* Vertical connecting line */}
                {index < statuses.length - 1 && (
                  <div style={{ position: "absolute", top: "24px", left: "11px", bottom: "-32px", width: "1px", backgroundColor: "rgba(255,255,255,0.1)", zIndex: 0 }}></div>
                )}
                
                <div style={{ 
                  width: "24px", 
                  height: "24px", 
                  borderRadius: "50%", 
                  backgroundColor: isCompleted ? "var(--pure-white)" : "var(--deep-ink)",
                  border: `1px solid ${isCompleted ? "var(--pure-white)" : "rgba(255,255,255,0.3)"}`,
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  zIndex: 1,
                  transition: "all 0.3s ease",
                  boxShadow: isCurrent ? "0 0 0 4px rgba(255,255,255,0.1)" : "none"
                }}>
                  {isCompleted && <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--deep-ink)" }}></div>}
                </div>
                
                <div>
                  <span style={{ 
                    fontSize: "15px", 
                    fontWeight: isCurrent ? 600 : 400,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: isCompleted ? "var(--pure-white)" : "var(--slate)"
                  }}>
                    {status}
                  </span>
                  {isCurrent && <p style={{ fontSize: "13px", color: "var(--soft-blue-grey)", marginTop: "0.25rem" }}>Current Status</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ink" style={{ minHeight: "100%", flex: 1 }}>
      <div className="container animate-fade-in" style={{ maxWidth: "800px", padding: "6rem 2rem" }}>
        
        <header style={{ marginBottom: "4rem" }}>
          <h1 style={{ fontSize: "clamp(40px, 4vw, 56px)", fontWeight: 600, color: "var(--pure-white)", marginBottom: "1rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Check your request.
          </h1>
          <p style={{ fontSize: "18px", color: "var(--soft-blue-grey)" }}>
            Enter your Reference ID.
          </p>
        </header>

        <form 
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px", marginBottom: "4rem" }}
        >
          <input 
            type="text" 
            className="input" 
            placeholder="PRC-XXXXXXXX" 
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            style={{ 
              backgroundColor: "transparent", 
              borderColor: "rgba(255,255,255,0.2)", 
              color: "var(--pure-white)",
              fontSize: "17px",
              height: "56px"
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ backgroundColor: "var(--pure-white)", color: "var(--deep-ink)", height: "56px", alignSelf: "flex-start" }} disabled={isSearching || !referenceId.trim()}>
            {isSearching ? 'Searching...' : 'Check Request →'}
          </button>
        </form>

        {error && (
          <div style={{ backgroundColor: "rgba(220, 38, 38, 0.1)", color: "#fca5a5", padding: "1rem", borderRadius: "4px", marginBottom: "2rem", fontSize: "14px", border: "1px solid rgba(220, 38, 38, 0.2)" }}>
            {error}
          </div>
        )}

        {result && (
          <div className="animate-fade-in" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "4rem" }}>
            <div style={{ marginBottom: "3rem" }}>
              <p className="metadata" style={{ color: "var(--slate)", marginBottom: "0.5rem" }}>Reference ID</p>
              <h2 style={{ fontSize: "2rem", fontWeight: 400, color: "var(--pure-white)", fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>{result.referenceId}</h2>
            </div>
            
            <div style={{ marginBottom: "2rem", maxWidth: "600px" }}>
              <p className="metadata" style={{ color: "var(--slate)", marginBottom: "0.5rem" }}>Requirement</p>
              <p style={{ fontSize: "19px", color: "var(--warm-ivory)", lineHeight: 1.5 }}>{result.title}</p>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "1rem" }}>
              <div>
                <p className="metadata" style={{ color: "var(--slate)", marginBottom: "0.5rem" }}>Submitted</p>
                <p style={{ color: "var(--pure-white)" }}>{new Date(result.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="metadata" style={{ color: "var(--slate)", marginBottom: "0.5rem" }}>Last Updated</p>
                <p style={{ color: "var(--pure-white)" }}>{new Date(result.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>

            {renderStatusTimeline(result.status)}
            
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="container bg-ink" style={{ padding: "6rem 2rem", minHeight: "100vh" }}><p className="metadata" style={{color: "var(--slate)"}}>Loading...</p></div>}>
      <TrackContent />
    </Suspense>
  );
}
