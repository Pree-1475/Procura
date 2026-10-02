'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container animate-fade-in" style={{ maxWidth: "450px", marginTop: "4rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ 
          width: "48px", 
          height: "48px", 
          borderRadius: "50%", 
          backgroundColor: "var(--muted)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          margin: "0 auto 1rem",
          color: "var(--foreground)"
        }}>
          <Lock size={24} />
        </div>
        <h1 className="page-title" style={{ fontSize: "1.875rem", marginBottom: "0.5rem" }}>Admin Portal</h1>
        <p className="page-subtitle" style={{ fontSize: "0.875rem" }}>
          Sign in to manage procurement requests.
        </p>
      </div>

      {error && (
        <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: "1rem", borderRadius: "var(--radius)", marginBottom: "1.5rem", fontSize: "0.875rem", border: "1px solid #fecaca" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label htmlFor="email" className="label">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="input" 
            required 
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password" className="label">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="input" 
            required 
          />
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: "100%", padding: "0.75rem" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : (
              <>Sign In <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
