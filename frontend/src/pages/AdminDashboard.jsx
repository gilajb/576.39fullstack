import { useState, useEffect, useCallback } from "react";
import PALETTE from "../constants/palette";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const fmt = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-KE", { day: "2-digit", month: "short", year: "numeric" });
};

const STATUS_COLORS = {
  new:      { bg: "rgba(201,168,76,0.15)",  text: "#C9A84C" },
  reviewed: { bg: "rgba(107,15,26,0.3)",    text: "#e8a0a0" },
  replied:  { bg: "rgba(42,80,42,0.35)",    text: "#90c890" },
  archived: { bg: "rgba(60,55,50,0.5)",     text: "#9B9590" },
};

const DIVISION_ICONS = {
  "Strategy Lab": "◈", "Cultural Engine": "◉",
  "Research & Intelligence": "◎", "Other": "○",
};

/* ─── LOGIN ─── */
function LoginScreen({ onLogin }) {
  const [creds, setCreds]   = useState({ username: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res  = await fetch(`${API_BASE}/admin/login/`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      const data = await res.json();
      if (res.ok) onLogin(data.username);
      else setError(data.error || "Authentication failed.");
    } catch { setError("Cannot reach the server. Is the backend running?"); }
    finally   { setLoading(false); }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#0A0705", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond', serif" }}>
      <div style={{ width:"100%", maxWidth:"440px", padding:"64px 48px", border:"1px solid rgba(201,168,76,0.15)", background:"rgba(42,37,32,0.6)", backdropFilter:"blur(12px)" }}>
        <div style={{ textAlign:"center", marginBottom:"48px" }}>
          <div style={{ fontSize:"36px", color:"#F5E6C8", letterSpacing:"0.3em" }}>576.39</div>
          <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", color:"#9B9590", letterSpacing:"0.4em", textTransform:"uppercase", marginTop:"8px" }}>Admin Portal</div>
        </div>
        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
          {["username","password"].map((field) => (
            <div key={field}>
              <label style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", color:"#9B9590", letterSpacing:"0.3em", textTransform:"uppercase", display:"block", marginBottom:"8px" }}>{field}</label>
              <input
                type={field==="password"?"password":"text"}
                value={creds[field]}
                onChange={(e) => setCreds({...creds,[field]:e.target.value})}
                required
                style={{ width:"100%", background:"transparent", border:"none", borderBottom:"1px solid rgba(201,168,76,0.25)", padding:"12px 0", fontSize:"18px", color:"#FAF5EC", outline:"none", fontFamily:"'Cormorant Garamond',serif" }}
                onFocus={(e)=>(e.target.style.borderBottomColor="#C9A84C")}
                onBlur={(e)=>(e.target.style.borderBottomColor="rgba(201,168,76,0.25)")}
              />
            </div>
          ))}
          {error && <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"11px", color:"#e07070", textAlign:"center" }}>{error}</div>}
          <button type="submit" disabled={loading}
            style={{ marginTop:"16px", padding:"16px", background:loading?"#2A2520":"#C9A84C", border:"none", fontFamily:"'Poppins',sans-serif", fontSize:"11px", letterSpacing:"0.25em", textTransform:"uppercase", color:"#0A0705", cursor:loading?"not-allowed":"pointer" }}
            onMouseEnter={(e)=>{ if(!loading) e.target.style.background="#F5E6C8"; }}
            onMouseLeave={(e)=>{ if(!loading) e.target.style.background="#C9A84C"; }}
          >{loading ? "Authenticating..." : "Enter"}</button>
        </form>
        <div style={{ marginTop:"32px", textAlign:"center", fontFamily:"'Poppins',sans-serif", fontSize:"10px", color:"rgba(155,149,144,0.4)", letterSpacing:"0.2em" }}>Staff access only</div>
      </div>
    </div>
  );
}

/* ─── STAT CARD ─── */
function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{ padding:"28px 32px", border:"1px solid rgba(201,168,76,0.12)", background:"rgba(42,37,32,0.4)", transition:"border-color 0.3s" }}
      onMouseEnter={(e)=>(e.currentTarget.style.borderColor="rgba(201,168,76,0.35)")}
      onMouseLeave={(e)=>(e.currentTarget.style.borderColor="rgba(201,168,76,0.12)")}
    >
      <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", color:"#9B9590", letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:"12px" }}>{label}</div>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"48px", color:accent||"#C9A84C", fontWeight:300, lineHeight:1 }}>{value}</div>
      {sub && <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"10px", color:"rgba(155,149,144,0.6)", marginTop:"8px" }}>{sub}</div>}
    </div>
  );
}

/* ─── STATUS BADGE ─── */
function StatusBadge({ value }) {
  const c = STATUS_COLORS[value] || STATUS_COLORS.new;
  return (
    <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", padding:"4px 12px", background:c.bg, color:c.text, border:`1px solid ${c.text}40` }}>
      {value}
    </span>
  );
}

/* ─── DETAIL DRAWER ─── */
function DetailDrawer({ inquiry, onClose, onUpdate }) {
  const [statusVal, setStatusVal] = useState(inquiry.status);
  const [notes, setNotes]         = useState(inquiry.admin_notes || "");
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/admin/inquiries/${inquiry.id}/`, {
        method:"PATCH", credentials:"include",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ status: statusVal, admin_notes: notes }),
      });
      if (res.ok) { const u = await res.json(); onUpdate(u); setSaved(true); setTimeout(()=>setSaved(false),2000); }
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete inquiry from ${inquiry.name}?`)) return;
    await fetch(`${API_BASE}/admin/inquiries/${inquiry.id}/`, { method:"DELETE", credentials:"include" });
    onUpdate(null, inquiry.id);
    onClose();
  };

  const Field = ({ label, value }) => (
    <div style={{ marginBottom:"24px" }}>
      <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", color:"#9B9590", letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:"6px" }}>{label}</div>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", color:"#FAF5EC", lineHeight:1.55 }}>{value||"—"}</div>
    </div>
  );

  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(10,7,5,0.7)", zIndex:200, backdropFilter:"blur(4px)" }} />
      <div style={{ position:"fixed", top:0, right:0, bottom:0, width:"min(520px,100vw)", background:"#2A2520", zIndex:201, overflowY:"auto", borderLeft:"1px solid rgba(201,168,76,0.15)", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"32px 40px", borderBottom:"1px solid rgba(201,168,76,0.1)", display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexShrink:0 }}>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"26px", color:"#FAF5EC", marginBottom:"4px" }}>{inquiry.name}</div>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"10px", color:"#9B9590" }}>{inquiry.email}</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#9B9590", fontSize:"24px", lineHeight:1, padding:"4px 8px" }}>×</button>
        </div>
        <div style={{ padding:"40px", flex:1 }}>
          <Field label="Organisation"       value={inquiry.organisation} />
          <Field label="Division"           value={`${DIVISION_ICONS[inquiry.division]||"○"}  ${inquiry.division}`} />
          <Field label="Received"           value={fmt(inquiry.created_at)} />
          <div style={{ marginBottom:"32px" }}>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", color:"#9B9590", letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:"10px" }}>Message</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", color:"rgba(250,245,236,0.75)", lineHeight:1.7, padding:"20px 24px", background:"rgba(10,7,5,0.35)", border:"1px solid rgba(201,168,76,0.1)" }}>
              {inquiry.message}
            </div>
          </div>
          {/* Status */}
          <div style={{ marginBottom:"24px" }}>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", color:"#9B9590", letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:"10px" }}>Status</div>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
              {["new","reviewed","replied","archived"].map((s) => {
                const c = STATUS_COLORS[s];
                const active = statusVal===s;
                return (
                  <button key={s} onClick={()=>setStatusVal(s)} style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", padding:"8px 18px", cursor:"pointer", background:active?c.bg:"transparent", color:active?c.text:"#9B9590", border:`1px solid ${active?c.text+"80":"rgba(155,149,144,0.2)"}`, transition:"all 0.2s" }}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Notes */}
          <div style={{ marginBottom:"32px" }}>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", color:"#9B9590", letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:"10px" }}>Admin Notes</div>
            <textarea rows={4} value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Internal notes..."
              style={{ width:"100%", background:"rgba(10,7,5,0.35)", border:"1px solid rgba(201,168,76,0.15)", color:"#FAF5EC", padding:"16px", fontFamily:"'Cormorant Garamond',serif", fontSize:"17px", outline:"none", resize:"vertical", lineHeight:1.6 }}
              onFocus={(e)=>(e.target.style.borderColor="rgba(201,168,76,0.4)")}
              onBlur={(e)=>(e.target.style.borderColor="rgba(201,168,76,0.15)")}
            />
          </div>
          <div style={{ display:"flex", gap:"12px" }}>
            <button onClick={handleSave} disabled={saving} style={{ flex:1, padding:"14px", background:saved?"rgba(42,80,42,0.6)":"#C9A84C", border:"none", fontFamily:"'Poppins',sans-serif", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:saved?"#90c890":"#0A0705", cursor:saving?"not-allowed":"pointer", transition:"all 0.3s" }}>
              {saving?"Saving…":saved?"✓ Saved":"Save Changes"}
            </button>
            <button onClick={handleDelete}
              style={{ padding:"14px 20px", background:"transparent", border:"1px solid rgba(224,112,112,0.3)", color:"#e07070", fontFamily:"'Poppins',sans-serif", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", cursor:"pointer", transition:"all 0.3s" }}
              onMouseEnter={(e)=>(e.currentTarget.style.background="rgba(224,112,112,0.1)")}
              onMouseLeave={(e)=>(e.currentTarget.style.background="transparent")}
            >Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── DASHBOARD ─── */
function Dashboard({ username, onLogout }) {
  const [stats, setStats]         = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [total, setTotal]         = useState(0);
  const [page, setPage]           = useState(1);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null);
  const [filters, setFilters]     = useState({ status:"all", division:"all", search:"" });
  const [searchInput, setSearchInput] = useState("");
  const PAGE_SIZE = 15;

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/stats/`, { credentials:"include" });
      if (res.ok) setStats(await res.json());
    } catch {}
  }, []);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const p = new URLSearchParams({ page, page_size:PAGE_SIZE, ...filters });
      const res = await fetch(`${API_BASE}/admin/inquiries/?${p}`, { credentials:"include" });
      if (res.ok) { const d = await res.json(); setInquiries(d.results); setTotal(d.total); }
    } finally { setLoading(false); }
  }, [page, filters]);

  useEffect(()=>{ fetchStats(); },[fetchStats]);
  useEffect(()=>{ fetchInquiries(); },[fetchInquiries]);

  useEffect(()=>{
    const t = setTimeout(()=>setFilters(f=>({...f,search:searchInput})),400);
    return ()=>clearTimeout(t);
  },[searchInput]);

  useEffect(()=>{ setPage(1); },[filters.status, filters.division, filters.search]);

  const handleUpdate = (updated, deletedId) => {
    if (deletedId) { setInquiries(p=>p.filter(i=>i.id!==deletedId)); setTotal(t=>t-1); fetchStats(); return; }
    setInquiries(p=>p.map(i=>i.id===updated.id?updated:i));
    fetchStats();
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE}/admin/logout/`, { method:"POST", credentials:"include" });
    onLogout();
  };

  const totalPages = Math.ceil(total/PAGE_SIZE);
  const statusCounts = stats ? Object.fromEntries(stats.by_status.map(({status,count})=>[status,count])) : {};

  const pBtn = (disabled, active) => ({
    fontFamily:"'Poppins',sans-serif", fontSize:"10px", letterSpacing:"0.15em",
    padding:"8px 16px", cursor:disabled?"not-allowed":"pointer",
    background:active?"#C9A84C":"transparent",
    color:disabled?"rgba(155,149,144,0.3)":active?"#0A0705":"#9B9590",
    border:`1px solid ${active?"#C9A84C":"rgba(155,149,144,0.2)"}`,
    transition:"all 0.2s",
  });

  return (
    <div style={{ minHeight:"100vh", background:"#0A0705", fontFamily:"'Cormorant Garamond',serif", display:"flex", flexDirection:"column" }}>

      {/* Top bar */}
      <header style={{ position:"sticky", top:0, zIndex:100, padding:"0 40px", height:"64px", background:"rgba(10,7,5,0.94)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(201,168,76,0.12)", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"20px" }}>
          <a href="/" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", color:"#F5E6C8", letterSpacing:"0.25em", textDecoration:"none" }}>576.39</a>
          <div style={{ width:"1px", height:"20px", background:"rgba(201,168,76,0.2)" }} />
          <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", color:"#9B9590", letterSpacing:"0.3em", textTransform:"uppercase" }}>Admin</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"24px" }}>
          <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:"10px", color:"#9B9590" }}>{username}</span>
          <button onClick={handleLogout} style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#9B9590", background:"none", border:"1px solid rgba(155,149,144,0.25)", padding:"7px 18px", cursor:"pointer" }}
            onMouseEnter={(e)=>{e.currentTarget.style.color="#FAF5EC";e.currentTarget.style.borderColor="rgba(155,149,144,0.6)";}}
            onMouseLeave={(e)=>{e.currentTarget.style.color="#9B9590";e.currentTarget.style.borderColor="rgba(155,149,144,0.25)";}}
          >Sign Out</button>
        </div>
      </header>

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        {/* Sidebar */}
        <aside style={{ width:"240px", flexShrink:0, borderRight:"1px solid rgba(201,168,76,0.1)", padding:"32px 0", overflowY:"auto", background:"rgba(42,37,32,0.3)" }}>
          <div style={{ padding:"0 24px", marginBottom:"24px" }}>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"8px", color:"#9B9590", letterSpacing:"0.35em", textTransform:"uppercase", marginBottom:"16px" }}>Status</div>
            {[
              {key:"all",      label:"All",      count:stats?.total},
              {key:"new",      label:"New",       count:statusCounts.new},
              {key:"reviewed", label:"Reviewed",  count:statusCounts.reviewed},
              {key:"replied",  label:"Replied",   count:statusCounts.replied},
              {key:"archived", label:"Archived",  count:statusCounts.archived},
            ].map(({key,label,count})=>{
              const active = filters.status===key;
              return (
                <button key={key} onClick={()=>setFilters(f=>({...f,status:key}))} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%", padding:"10px 16px", background:active?"rgba(201,168,76,0.1)":"transparent", border:"none", borderLeft:`2px solid ${active?"#C9A84C":"transparent"}`, cursor:"pointer", marginBottom:"2px", color:active?"#FAF5EC":"#9B9590" }}>
                  <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:"10px" }}>{label}</span>
                  <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", background:active?"rgba(201,168,76,0.2)":"rgba(155,149,144,0.1)", color:active?"#C9A84C":"#9B9590", padding:"2px 8px", borderRadius:"10px", minWidth:"24px", textAlign:"center" }}>{count??0}</span>
                </button>
              );
            })}
          </div>

          <div style={{ height:"1px", background:"rgba(201,168,76,0.08)", margin:"16px 0" }} />

          <div style={{ padding:"0 24px" }}>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"8px", color:"#9B9590", letterSpacing:"0.35em", textTransform:"uppercase", marginBottom:"16px" }}>Division</div>
            {[
              {key:"all",                      label:"All"},
              {key:"Strategy Lab",             label:"Strategy Lab"},
              {key:"Cultural Engine",          label:"Cultural Engine"},
              {key:"Research & Intelligence",  label:"Research & Intel"},
              {key:"Other",                    label:"Other"},
            ].map(({key,label})=>{
              const active = filters.division===key;
              const c = stats?.by_division?.find(d=>d.division===key)?.count;
              return (
                <button key={key} onClick={()=>setFilters(f=>({...f,division:key}))} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%", padding:"10px 16px", background:active?"rgba(107,15,26,0.25)":"transparent", border:"none", borderLeft:`2px solid ${active?"#6B0F1A":"transparent"}`, cursor:"pointer", marginBottom:"2px", color:active?"#FAF5EC":"#9B9590" }}>
                  <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:"10px" }}>{label}</span>
                  {key!=="all" && <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", color:"rgba(155,149,144,0.5)" }}>{c??0}</span>}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex:1, overflowY:"auto", padding:"40px" }}>

          {/* Stats */}
          {stats && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"40px" }}>
              <StatCard label="Total Inquiries" value={stats.total}           sub="All time"     accent="#C9A84C" />
              <StatCard label="This Week"       value={stats.this_week}       sub="Last 7 days"  accent="#F5E6C8" />
              <StatCard label="Awaiting Review" value={statusCounts.new??0}   sub="Unread"       accent="#e8a0a0" />
              <StatCard label="Replied"         value={statusCounts.replied??0} sub="Completed"  accent="#90c890" />
            </div>
          )}

          {/* Header row */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px", flexWrap:"wrap", gap:"16px" }}>
            <div>
              <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"32px", color:"#FAF5EC", lineHeight:1 }}>Inquiries</h1>
              <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"10px", color:"#9B9590", marginTop:"4px" }}>
                {total} {total===1?"result":"results"}
                {filters.status!=="all"?` · ${filters.status}`:""}
                {filters.division!=="all"?` · ${filters.division}`:""}
              </div>
            </div>
            <div style={{ position:"relative" }}>
              <input
                placeholder="Search name, email, org…"
                value={searchInput}
                onChange={(e)=>setSearchInput(e.target.value)}
                style={{ background:"rgba(42,37,32,0.6)", border:"1px solid rgba(201,168,76,0.15)", padding:"10px 16px 10px 40px", color:"#FAF5EC", outline:"none", fontFamily:"'Poppins',sans-serif", fontSize:"11px", width:"280px" }}
                onFocus={(e)=>(e.target.style.borderColor="rgba(201,168,76,0.4)")}
                onBlur={(e)=>(e.target.style.borderColor="rgba(201,168,76,0.15)")}
              />
              <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", color:"#9B9590", fontSize:"13px", pointerEvents:"none" }}>⌕</span>
            </div>
          </div>

          {/* Table */}
          <div style={{ border:"1px solid rgba(201,168,76,0.1)", overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 160px 110px 100px", padding:"14px 20px", background:"rgba(42,37,32,0.6)", borderBottom:"1px solid rgba(201,168,76,0.1)" }}>
              {["Sender","Message Preview","Division","Date","Status"].map(h=>(
                <div key={h} style={{ fontFamily:"'Poppins',sans-serif", fontSize:"8px", color:"#9B9590", letterSpacing:"0.3em", textTransform:"uppercase" }}>{h}</div>
              ))}
            </div>

            {loading ? (
              <div style={{ padding:"60px", textAlign:"center", color:"#9B9590", fontFamily:"'Cormorant Garamond',serif", fontSize:"20px" }}>Loading…</div>
            ) : inquiries.length===0 ? (
              <div style={{ padding:"60px", textAlign:"center" }}>
                <div style={{ fontSize:"40px", color:"#C9A84C", marginBottom:"12px" }}>◎</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", color:"#9B9590" }}>No inquiries found.</div>
              </div>
            ) : inquiries.map((inq,idx)=>(
              <div key={inq.id} onClick={()=>setSelected(inq)}
                style={{ display:"grid", gridTemplateColumns:"1fr 1fr 160px 110px 100px", padding:"18px 20px", cursor:"pointer", borderBottom:idx<inquiries.length-1?"1px solid rgba(201,168,76,0.06)":"none", background:inq.status==="new"?"rgba(201,168,76,0.03)":"transparent", transition:"background 0.2s", alignItems:"center" }}
                onMouseEnter={(e)=>(e.currentTarget.style.background="rgba(201,168,76,0.06)")}
                onMouseLeave={(e)=>(e.currentTarget.style.background=inq.status==="new"?"rgba(201,168,76,0.03)":"transparent")}
              >
                <div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"17px", color:"#FAF5EC" }}>
                    {inq.status==="new"&&<span style={{ color:"#C9A84C", marginRight:"6px", fontSize:"8px" }}>●</span>}
                    {inq.name}
                  </div>
                  <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"10px", color:"#9B9590", marginTop:"2px" }}>{inq.email}</div>
                  {inq.organisation&&<div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", color:"rgba(155,149,144,0.5)", marginTop:"1px" }}>{inq.organisation}</div>}
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"15px", color:"rgba(250,245,236,0.45)", lineHeight:1.4, paddingRight:"16px", overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
                  {inq.message}
                </div>
                <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"9px", color:"#9B9590" }}>
                  <span style={{ marginRight:"6px" }}>{DIVISION_ICONS[inq.division]||"○"}</span>{inq.division}
                </div>
                <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"10px", color:"#9B9590" }}>{fmt(inq.created_at)}</div>
                <div><StatusBadge value={inq.status} /></div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages>1&&(
            <div style={{ display:"flex", justifyContent:"center", gap:"8px", marginTop:"32px", alignItems:"center" }}>
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={pBtn(page===1)}>← Prev</button>
              {Array.from({length:totalPages},(_,i)=>i+1)
                .filter(p=>p===1||p===totalPages||Math.abs(p-page)<=1)
                .reduce((acc,p,i,arr)=>{ if(i>0&&p-arr[i-1]>1)acc.push("…"); acc.push(p); return acc; },[])
                .map((p,i)=>
                  p==="…"
                    ?<span key={`e${i}`} style={{ color:"#9B9590", fontFamily:"'Poppins',sans-serif", fontSize:"11px" }}>…</span>
                    :<button key={p} onClick={()=>setPage(p)} style={pBtn(false,p===page)}>{p}</button>
                )}
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} style={pBtn(page===totalPages)}>Next →</button>
            </div>
          )}
        </main>
      </div>

      {selected && (
        <DetailDrawer
          inquiry={selected}
          onClose={()=>setSelected(null)}
          onUpdate={(updated, deletedId)=>{ handleUpdate(updated,deletedId); if(updated)setSelected(updated); }}
        />
      )}
    </div>
  );
}

/* ─── ROOT ─── */
export default function AdminDashboard() {
  const [authState, setAuthState] = useState("checking");
  const [username, setUsername]   = useState("");

  useEffect(()=>{
    fetch(`${API_BASE}/admin/session/`,{credentials:"include"})
      .then(r=>{ if(r.ok)return r.json(); throw new Error(); })
      .then(d=>{ setUsername(d.username); setAuthState("authenticated"); })
      .catch(()=>setAuthState("unauthenticated"));
  },[]);

  if(authState==="checking")
    return <div style={{ minHeight:"100vh", background:"#0A0705", display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", color:"#9B9590", letterSpacing:"0.3em" }}>—</div></div>;

  if(authState==="unauthenticated")
    return <LoginScreen onLogin={(u)=>{ setUsername(u); setAuthState("authenticated"); }} />;

  return <Dashboard username={username} onLogout={()=>{ setUsername(""); setAuthState("unauthenticated"); }} />;
}
