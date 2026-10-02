'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button 
        className="nav-mobile-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'var(--warm-ivory)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 10px 20px -10px rgba(0,0,0,0.1)',
          animation: 'fadeIn 0.2s ease forwards'
        }}>
          <Link href="/#how-it-works" onClick={() => setIsOpen(false)} style={{ fontSize: '16px', fontWeight: 500, color: 'var(--deep-ink)', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>How It Works</Link>
          <Link href="/#sourced" onClick={() => setIsOpen(false)} style={{ fontSize: '16px', fontWeight: 500, color: 'var(--deep-ink)', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>What We've Sourced</Link>
          <Link href="/#about" onClick={() => setIsOpen(false)} style={{ fontSize: '16px', fontWeight: 500, color: 'var(--deep-ink)', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>About the Initiative</Link>
          <Link href="/track" onClick={() => setIsOpen(false)} style={{ fontSize: '16px', fontWeight: 500, color: 'var(--deep-ink)', padding: '0.5rem 0' }}>Track Request</Link>
          <Link href="/submit" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>Submit a Requirement</Link>
        </div>
      )}
    </>
  );
}
