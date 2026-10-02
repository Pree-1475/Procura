'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SubmitPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/requirements', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit requirement');
      }

      setSuccessId(data.referenceId);
      window.scrollTo(0, 0);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (successId) {
    return (
      <div className="bg-white" style={{ minHeight: "100%", flex: 1 }}>
        <div className="container animate-fade-in section-padding" style={{ maxWidth: "600px", textAlign: "center" }}>

          <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "var(--deep-ink)", color: "var(--pure-white)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>

          <span className="eyebrow">SUBMISSION COMPLETE</span>
          <h1 className="large-statement" style={{ marginBottom: "1.5rem", fontSize: "2.5rem" }}>
            Requirement Logged.
          </h1>
          <p className="body-text" style={{ marginBottom: "4rem" }}>
            Your request has been received and is now moving into the review stage.
          </p>

          <div style={{ padding: "3rem", border: "1px solid var(--border-color)", marginBottom: "3rem", position: "relative" }}>
            <div style={{ position: "absolute", top: "-10px", left: "2rem", backgroundColor: "var(--pure-white)", padding: "0 10px" }}>
              <span className="metadata">REFERENCE ID</span>
            </div>
            <p style={{ fontSize: "2.5rem", fontWeight: 400, fontFamily: "var(--font-mono)", letterSpacing: "0.05em", color: "var(--deep-ink)" }}>
              {successId}
            </p>
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href={`/track?id=${successId}`} className="btn btn-primary">
              Track Request Status &rarr;
            </Link>
            <button onClick={() => setSuccessId(null)} className="btn btn-outline">
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory" style={{ minHeight: "100%", flex: 1, padding: "4rem 0" }}>
      <div className="container animate-fade-in" style={{ maxWidth: "800px" }}>

        <header style={{ marginBottom: "4rem" }}>
          <h1 style={{ fontSize: "clamp(40px, 4vw, 56px)", fontWeight: 600, color: "var(--deep-ink)", marginBottom: "1rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Submit a Requirement
          </h1>
          <p style={{ fontSize: "18px", color: "var(--slate)" }}>
            Provide details about the research tools, equipment, or resources you need.
          </p>
        </header>

        {error && (
          <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: "1rem", borderRadius: "4px", marginBottom: "2rem", fontSize: "14px", border: "1px solid #fecaca" }}>
            {error}
          </div>
        )}

        <div className="card" style={{ padding: "3rem", borderRadius: "2px", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            <div className="form-grid">
              <div>
                <label htmlFor="profName" className="label">Professor Name</label>
                <input type="text" id="profName" name="profName" className="input" required placeholder="Dr. Jane Doe" />
              </div>

              <div>
                <label htmlFor="collegeEmail" className="label">College Email ID</label>
                <input type="email" id="collegeEmail" name="collegeEmail" className="input" required placeholder="jane.doe@university.edu" />
              </div>
            </div>

            <div className="form-grid">
              <div>
                <label htmlFor="department" className="label">Department</label>
                <input type="text" id="department" name="department" className="input" required placeholder="Computer Science" />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="label">Phone Number</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" className="input" required placeholder="+91 1234567890" />
              </div>
            </div>

            <div>
              <label htmlFor="title" className="label">Requirement Title</label>
              <input type="text" id="title" name="title" className="input" required placeholder="e.g. 5x MacBook Pro 16-inch for Data Science Team" />
            </div>

            <div>
              <label htmlFor="description" className="label">Detailed Specification</label>
              <textarea
                id="description"
                name="description"
                className="input"
                required
                rows={6}
                style={{ height: "auto", resize: "vertical", padding: "1rem" }}
                placeholder="Provide precise specifications, preferred vendors, and intended research application."
              />
            </div>

            <div>
              <label htmlFor="attachment" className="label">Supporting Document (Optional)</label>
              <input 
                type="file" 
                id="attachment" 
                name="attachment" 
                className="input" 
                accept="image/*,.pdf" 
                style={{ padding: "0.8rem", backgroundColor: "var(--pure-white)" }} 
              />
              <p style={{ fontSize: "12px", color: "var(--slate)", marginTop: "0.5rem" }}>Upload a reference image or PDF document.</p>
            </div>

            <div className="form-grid">
              <div>
                <label htmlFor="requiredDate" className="label">Required By Date</label>
                <input type="date" id="requiredDate" name="requiredDate" className="input" required />
              </div>

              <div>
                <label htmlFor="urgency" className="label">Urgency</label>
                <select id="urgency" name="urgency" className="input" required defaultValue="Medium">
                  <option value="Low">Low - Not time sensitive</option>
                  <option value="Medium">Medium - Standard processing</option>
                  <option value="High">High - Needed ASAP</option>
                  <option value="Critical">Critical - Research blocking</option>
                </select>
              </div>
            </div>

            <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-color)", marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ padding: "0 3rem" }}
              >
                {isSubmitting ? "Submitting..." : "Submit Requirement →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
