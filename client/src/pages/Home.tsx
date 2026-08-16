/* Cinema de Sala — catálogo assimétrico, foco âmbar persistente e navegação por DPAD. */
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Home as HomeIcon, Tv, Film, Layers3, Heart, UserRound, Play, Plus, ChevronRight, ChevronDown, CircleUserRound, Clock3, Menu, X, ArrowLeft } from "lucide-react";

const HERO = {
  title: "Vitória",
  eyebrow: "EM DESTAQUE · NOVA TEMPORADA",
  description: "Uma mulher luta para realizar os seus sonhos diante de escolhas que podem mudar tudo. Descubra a nova novela portuguesa que está a marcar 2025.",
  meta: "2025  ·  Drama  ·  1 temporada",
};

const catalog = [
  { title: "Vitória", year: "2025", genre: "Drama", image: "/manus-storage/card-vitoria_65d9e27d.jpg", badge: "Top 20  #7" },
  { title: "A Serra", year: "2021", genre: "Novelas", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85", badge: "" },
  { title: "Páginas da Vida", year: "2026", genre: "Novelas", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=85", badge: "Top 20  #14" },
  { title: "A Madrasta", year: "2026", genre: "Drama", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=700&q=85", badge: "Estreia" },
  { title: "Terra Forte", year: "2025", genre: "Drama", image: "/manus-storage/card-terra-forte_bd061693.jpg", badge: "Top 20  #6" },
  { title: "A Protegida", year: "2025", genre: "Comédia", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85", badge: "Top 20  #10" },
  { title: "Amor à Prova", year: "2026", genre: "Família", image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=700&q=85", badge: "Top 20  #15" },
  { title: "Golpe de Sorte", year: "2019", genre: "Crime", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=85", badge: "" },
  { title: "Dancin’ Days", year: "2012", genre: "Novelas", image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=700&q=85", badge: "" },
  { title: "Ilha dos Amores", year: "2007", genre: "Novelas", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=700&q=85", badge: "" },
];

const navItems = [
  { label: "Início", icon: HomeIcon }, { label: "Novelas", icon: Tv }, { label: "Filmes", icon: Film }, { label: "Séries", icon: Layers3 }, { label: "Minha lista", icon: Heart },
];

function PosterCard({ item, index, active, onFocus }: { item: typeof catalog[number]; index: number; active: boolean; onFocus: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (active) ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); }, [active]);
  return <button ref={ref} className={`poster ${active ? "poster-active" : ""}`} onFocus={onFocus} onClick={() => alert(`A abrir ${item.title}`)} aria-label={`Abrir ${item.title}`}>
    <div className="poster-art"><img src={item.image} alt="" />{item.badge && <span className="poster-badge">{item.badge}</span>}<span className="poster-play"><Play size={18} fill="currentColor" /></span></div>
    <div className="poster-copy"><strong>{item.title}</strong><span>{item.year} · {item.genre}</span></div>
  </button>
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("Início");
  const [activeRow, setActiveRow] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => catalog.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())), [query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Backspace") { setMenuOpen(false); return; }
      if (event.key === "ArrowLeft" && activeCard > 0) setActiveCard((v) => v - 1);
      if (event.key === "ArrowRight" && activeCard < filtered.length - 1) setActiveCard((v) => v + 1);
      if (event.key === "ArrowDown") setActiveRow((v) => Math.min(v + 1, 2));
      if (event.key === "ArrowUp") setActiveRow((v) => Math.max(v - 1, 0));
    };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [activeCard, filtered.length]);

  return <div className="tv-shell">
    <header className="topbar">
      <button className="brand" aria-label="Novelas Portuguesas TV" onClick={() => setActiveNav("Início")}><img src="/manus-storage/novelas-mark_d0be10b2.png" alt="" /><span><b>NOVELAS</b><small>PORTUGUESAS</small></span></button>
      <div className="topbar-right"><span className="clock"><Clock3 size={17} /> 21:42</span><button className="icon-btn" aria-label="Pesquisar" onClick={() => document.getElementById("catalog-search")?.focus()}><Search size={21} /></button><button className="profile" aria-label="Conta"><CircleUserRound size={23} /><span>Conta</span></button></div>
    </header>
    <aside className={`rail ${menuOpen ? "rail-open" : ""}`}>
      <button className="rail-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      <nav>{navItems.map(({ label, icon: Icon }) => <button key={label} className={`rail-item ${activeNav === label ? "rail-active" : ""}`} onClick={() => setActiveNav(label)} aria-label={label}><Icon size={21} /><span>{label}</span></button>)}</nav>
      <div className="rail-bottom"><button className="rail-item" aria-label="Pedidos"><Plus size={21} /><span>Pedidos</span></button><button className="rail-item" aria-label="Definições"><UserRound size={21} /><span>Perfil</span></button></div>
    </aside>
    <main className="content">
      <section className="hero" style={{ backgroundImage: "url('/manus-storage/hero-portugal_e235b798.jpg')" }}>
        <div className="hero-shade" /><div className="hero-content"><span className="eyebrow">{HERO.eyebrow}</span><h1>{HERO.title}</h1><p>{HERO.description}</p><div className="hero-meta">{HERO.meta}</div><div className="hero-actions"><button className="primary-action" onClick={() => alert("A iniciar Vitória")}><Play size={19} fill="currentColor" /> Assistir agora</button><button className="secondary-action" onClick={() => alert("Adicionado à lista")}><Plus size={19} /> Minha lista</button></div></div><div className="hero-index"><span>01</span><i /><span>04</span></div>
      </section>
      <section className="catalog-area">
        <div className="section-head"><div><span className="section-kicker">PARA VER AGORA</span><h2>Top 20</h2></div><div className="catalog-tools"><label className="search-box"><Search size={18} /><input id="catalog-search" value={query} onChange={(e) => { setQuery(e.target.value); setActiveCard(0); }} placeholder="Procurar títulos" /></label><button className="filter-btn">Categorias <ChevronDown size={17} /></button></div></div>
        <div className="row-title"><h3>Novidades</h3><div className="tabs"><button className="tab-active">Todos</button><button>Filmes</button><button>Séries</button></div><button className="see-all">Ver tudo <ChevronRight size={18} /></button></div>
        <div className="poster-row" role="list" aria-label="Novidades">{filtered.slice(0, 8).map((item, index) => <PosterCard key={item.title} item={item} index={index} active={activeRow === 1 && activeCard === index} onFocus={() => { setActiveRow(1); setActiveCard(index); }} />)}</div>
        <div className="row-title second-row"><h3>Escolhidas para si</h3><button className="see-all">Ver tudo <ChevronRight size={18} /></button></div>
        <div className="poster-row compact" role="list">{catalog.slice(4, 10).map((item, index) => <PosterCard key={item.title} item={item} index={index} active={activeRow === 2 && activeCard === index} onFocus={() => { setActiveRow(2); setActiveCard(index); }} />)}</div>
      </section>
    </main>
    <div className="remote-hint"><span className="key">←</span><span className="key">→</span> navegar <span className="key key-enter">OK</span> seleccionar</div>
  </div>;
}
