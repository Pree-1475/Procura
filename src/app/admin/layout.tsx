import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  // If no session, allow them to view the login page
  // We'll handle this by letting the layout render, but the specific pages
  // will check auth. Actually, it's better to check auth in middleware or layout,
  // but since we have /admin/login inside /admin, we don't want an infinite redirect.
  // We will handle auth checks in the page.tsx instead, or we can check the pathname.
  
  return (
    <div style={{ backgroundColor: "var(--muted)", minHeight: "100vh", width: "100%", position: "absolute", top: 0, left: 0, zIndex: 100 }}>
      <nav style={{ 
        backgroundColor: "var(--background)", 
        borderBottom: "1px solid var(--border)",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link href="/admin" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            Procura Admin
          </Link>
          {session && (
            <div style={{ display: "flex", gap: "1rem", fontSize: "0.875rem" }}>
              <Link href="/admin" style={{ fontWeight: 500 }}>Dashboard</Link>
            </div>
          )}
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/" style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            View Public Site
          </Link>
          {session && (
            <form action="/api/admin/logout" method="POST">
              <button type="submit" className="btn btn-outline" style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem" }}>
                Sign Out
              </button>
            </form>
          )}
        </div>
      </nav>
      
      <main style={{ padding: "2rem" }}>
        {children}
      </main>
    </div>
  );
}
