import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, Check, Clock, Package, FileSearch, User, Mail, Calendar, FileText, Lock, Globe } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default async function RequirementDetails({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const requirement = await prisma.requirement.findUnique({
    where: { id: params.id },
    include: { attachments: true }
  });

  if (!requirement) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "4rem 0" }}>
        <h2>Requirement not found</h2>
        <Link href="/admin" className="btn btn-primary" style={{ marginTop: "1rem" }}>Back to Dashboard</Link>
      </div>
    );
  }

  const statuses = ['Submitted', 'Under Review', 'Sourcing', 'Procurement', 'Delivered'];

  // Server Actions for updating
  async function updateStatus(formData: FormData) {
    'use server';
    const newStatus = formData.get('status') as string;
    await prisma.requirement.update({
      where: { id: params.id },
      data: { status: newStatus }
    });
    revalidatePath(`/admin/requirement/${params.id}`);
  }

  async function updateNotes(formData: FormData) {
    'use server';
    const notes = formData.get('notes') as string;
    await prisma.requirement.update({
      where: { id: params.id },
      data: { internalNotes: notes }
    });
    revalidatePath(`/admin/requirement/${params.id}`);
  }

  async function updateVisibility(formData: FormData) {
    'use server';
    const visibility = formData.get('visibility') as string;
    await prisma.requirement.update({
      where: { id: params.id },
      data: { visibility }
    });
    revalidatePath(`/admin/requirement/${params.id}`);
  }

  return (
    <div className="container animate-fade-in" style={{ maxWidth: "1000px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
            <h1 className="page-title" style={{ fontSize: "2rem", margin: 0 }}>{requirement.referenceId}</h1>
            <div className="badge" style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}>
              {requirement.status}
            </div>
          </div>
          <p className="page-subtitle" style={{ margin: 0, fontSize: "1.125rem", color: "var(--foreground)", fontWeight: 500 }}>
            {requirement.title}
          </p>
        </div>
        
        <form action={updateVisibility} style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "var(--background)", padding: "0.5rem 1rem", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
          <span style={{ fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {requirement.visibility === 'public' ? <Globe size={16} style={{ color: "#10b981" }} /> : <Lock size={16} style={{ color: "var(--muted-foreground)" }} />}
            Visibility:
          </span>
          <select name="visibility" defaultValue={requirement.visibility} onChange={(e) => e.target.form?.requestSubmit()} style={{ fontSize: "0.875rem", border: "none", backgroundColor: "transparent", outline: "none", cursor: "pointer", fontWeight: 600 }}>
            <option value="private">Private (Default)</option>
            <option value="public">Public (Showcase)</option>
          </select>
        </form>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        
        {/* Main Content Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div className="card">
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FileText size={18} /> Description
            </h3>
            <p style={{ whiteSpace: "pre-wrap", color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: 1.6 }}>
              {requirement.description}
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem" }}>Update Status</h3>
            <form action={updateStatus} style={{ display: "flex", gap: "1rem" }}>
              <select name="status" defaultValue={requirement.status} className="input" style={{ flex: 1 }}>
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
            
            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", position: "relative" }}>
              <div style={{ position: "absolute", top: "1rem", left: "0", right: "0", height: "2px", backgroundColor: "var(--border)", zIndex: 0 }} />
              {statuses.map((status, index) => {
                const currentIndex = statuses.indexOf(requirement.status);
                const isCompleted = index <= currentIndex;
                
                return (
                  <div key={status} style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
                    <div style={{ 
                      width: "2rem", height: "2rem", borderRadius: "50%", 
                      backgroundColor: isCompleted ? "var(--foreground)" : "var(--background)",
                      border: `2px solid ${isCompleted ? "var(--foreground)" : "var(--border)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: isCompleted ? "var(--background)" : "transparent",
                      marginBottom: "0.5rem"
                    }}>
                      <Check size={14} />
                    </div>
                    <span style={{ fontSize: "0.75rem", color: isCompleted ? "var(--foreground)" : "var(--muted-foreground)" }}>{status}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem" }}>Internal Notes</h3>
            <form action={updateNotes}>
              <textarea 
                name="notes" 
                defaultValue={requirement.internalNotes || ''} 
                className="input" 
                style={{ height: "150px", resize: "vertical", marginBottom: "1rem" }}
                placeholder="Add private internal notes for the procurement team..."
              />
              <button type="submit" className="btn btn-outline">Save Notes</button>
            </form>
          </div>

        </div>

        {/* Sidebar Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div className="card">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Contact Information</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <User size={16} style={{ color: "var(--muted-foreground)" }} />
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{requirement.profName} ({requirement.department})</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Mail size={16} style={{ color: "var(--muted-foreground)" }} />
                <a href={`mailto:${requirement.collegeEmail}`} style={{ fontSize: "0.875rem", textDecoration: "underline", color: "var(--muted-foreground)" }}>
                  {requirement.collegeEmail}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Globe size={16} style={{ color: "var(--muted-foreground)" }} />
                <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                  {requirement.phoneNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Requirements Details</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Clock size={16} style={{ color: "var(--muted-foreground)" }} />
                <span style={{ fontSize: "0.875rem" }}>
                  Required by: <strong style={{ fontWeight: 500 }}>{requirement.requiredDate.toLocaleDateString()}</strong>
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Package size={16} style={{ color: "var(--muted-foreground)" }} />
                <span style={{ fontSize: "0.875rem" }}>
                  Urgency: <strong style={{ fontWeight: 500 }}>{requirement.urgency}</strong>
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Calendar size={16} style={{ color: "var(--muted-foreground)" }} />
                <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                  Submitted: {requirement.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Attachments</h3>
            {requirement.attachments.length === 0 ? (
              <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", fontStyle: "italic" }}>No attachments provided.</p>
            ) : (
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {requirement.attachments.map(att => (
                  <li key={att.id}>
                    <a href={`/api/admin/attachments/${att.id}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--primary)", textDecoration: "underline", padding: "0.5rem", backgroundColor: "var(--muted)", borderRadius: "var(--radius)" }}>
                      <FileText size={14} />
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{att.originalName}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
