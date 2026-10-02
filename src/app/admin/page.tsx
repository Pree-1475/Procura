import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Search, Eye, Filter } from 'lucide-react';

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const requirements = await prisma.requirement.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return { bg: '#e0e7ff', text: '#3730a3', border: '#c7d2fe' };
      case 'Under Review': return { bg: '#fef3c7', text: '#92400e', border: '#fde68a' };
      case 'Sourcing': return { bg: '#ffedd5', text: '#9a3412', border: '#fed7aa' };
      case 'Procurement': return { bg: '#e0f2fe', text: '#075985', border: '#bae6fd' };
      case 'Delivered': return { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' };
      default: return { bg: 'var(--muted)', text: 'var(--foreground)', border: 'var(--border)' };
    }
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: "1200px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 className="page-title" style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>Dashboard</h1>
          <p className="page-subtitle" style={{ fontSize: "0.875rem" }}>Manage all incoming research requirements.</p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }} />
            <input 
              type="text" 
              placeholder="Search ID or Title..." 
              className="input" 
              style={{ paddingLeft: "2.5rem", width: "250px", backgroundColor: "var(--background)" }} 
            />
          </div>
          <button className="btn btn-outline" style={{ display: "flex", gap: "0.5rem", backgroundColor: "var(--background)" }}>
            <Filter size={16} /> Filter
          </button>
        </div>
      </header>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--muted)", borderBottom: "1px solid var(--border)", textAlign: "left" }}>
              <th style={{ padding: "1rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Reference ID</th>
              <th style={{ padding: "1rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Requirement</th>
              <th style={{ padding: "1rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Contact</th>
              <th style={{ padding: "1rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Date</th>
              <th style={{ padding: "1rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)" }}>Status</th>
              <th style={{ padding: "1rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted-foreground)", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requirements.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "var(--muted-foreground)" }}>
                  No requirements found.
                </td>
              </tr>
            ) : (
              requirements.map((req) => {
                const colors = getStatusColor(req.status);
                return (
                  <tr key={req.id} style={{ borderBottom: "1px solid var(--border)", transition: "background-color 0.2s" }}>
                    <td style={{ padding: "1rem", fontWeight: 500, fontSize: "0.875rem" }}>
                      <Link href={`/admin/requirement/${req.id}`} style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>
                        {req.referenceId}
                      </Link>
                    </td>
                    <td style={{ padding: "1rem", fontSize: "0.875rem", maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {req.title}
                    </td>
                    <td style={{ padding: "1rem", fontSize: "0.875rem" }}>
                      {req.profName}
                    </td>
                    <td style={{ padding: "1rem", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                      {req.createdAt.toLocaleDateString()}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{ 
                        backgroundColor: colors.bg, 
                        color: colors.text, 
                        border: `1px solid ${colors.border}`,
                        padding: "0.25rem 0.625rem",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        fontWeight: 600
                      }}>
                        {req.status}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", textAlign: "right" }}>
                      <Link href={`/admin/requirement/${req.id}`} className="btn btn-outline" style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem", gap: "0.25rem" }}>
                        <Eye size={14} /> View
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
