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
  { title: "Vitória", year: "2025", genre: "Drama", image: "https://image.tmdb.org/t/p/original/2mA74RgTDdGdu1dqvAm5xVxRXJJ.jpg", badge: "Top 20  #7", episodes: 6, source: "https://novelasportuguesass.com/serie/vitoria/" },
  { title: "A Serra", year: "2021", genre: "Novelas", image: "https://image.tmdb.org/t/p/original/xzX7npSDhtsHd7JE0Oezo1nsl3U.jpg", badge: "", episodes: 305, source: "https://novelasportuguesass.com/serie/a-serra/" },
  { title: "Páginas da Vida", year: "2026", genre: "Novelas", image: "https://image.tmdb.org/t/p/original/w8hJZMeGgP15u1ovBAVVnGI2Wek.jpg", badge: "Top 20  #14", episodes: 5, source: "https://novelasportuguesass.com/serie/paginas-da-vida/" },
  { title: "Terra Forte", year: "2025", genre: "Drama", image: "https://image.tmdb.org/t/p/original/7kvExcgCB8NuGbSyVe8VkBcuXXd.jpg", badge: "Top 20  #6", episodes: 5, source: "https://novelasportuguesass.com/serie/terra-forte/" },
  { title: "A Protegida", year: "2025", genre: "Comédia", image: "https://image.tmdb.org/t/p/original/qLNVsgOBJc2ClQJXa883mj11Lra.jpg", badge: "Top 20  #10", episodes: 50, source: "https://novelasportuguesass.com/serie/a-protegida/" },
  { title: "A Madrasta", year: "2026", genre: "Drama", image: "https://image.tmdb.org/t/p/original/AO0KrvtbmCZ9KwCL5sbLqe9DTX.jpg", badge: "Estreia", episodes: 4, source: "https://novelasportuguesass.com/serie/a-madrasta/" },
  { title: "Amor à Prova", year: "2026", genre: "Família", image: "https://image.tmdb.org/t/p/original/2PC9fbnlpYKn95ganjLfRBlu08l.jpg", badge: "Top 20  #15", episodes: 5, source: "https://novelasportuguesass.com/serie/amor-a-prova/" },
  { title: "Golpe de Sorte", year: "2019", genre: "Crime", image: "https://image.tmdb.org/t/p/original/lJrciegsSN6izYvVJ8udxllM2hD.jpg", badge: "", episodes: 242, source: "https://novelasportuguesass.com/serie/golpe-de-sorte/" },
  { title: "Dancin’ Days", year: "2012", genre: "Novelas", image: "https://image.tmdb.org/t/p/original/bRVXSOJ6DAd2sl1u8a49afAnvWP.jpg", badge: "", episodes: 341, source: "https://novelasportuguesass.com/serie/dancin-days/" },
  { title: "Ilha dos Amores", year: "2007", genre: "Novelas", image: "https://image.tmdb.org/t/p/original/gT4NjehbQFEiKnNOlDEqNEWa8TW.jpg", badge: "", episodes: 214, source: "https://novelasportuguesass.com/serie/ilha-dos-amores/" },
];

const episodeList = [
  { number: 1, title: "O começo da história", duration: "42 min" },
  { number: 2, title: "Uma escolha difícil", duration: "45 min" },
  { number: 3, title: "Segredos de família", duration: "44 min" },
  { number: 4, title: "O que ficou por dizer", duration: "46 min" },
  { number: 5, title: "A verdade aproxima-se", duration: "43 min" },
  { number: 6, title: "Novos caminhos", duration: "47 min" },
];

const navItems = [
  { label: "Início", icon: HomeIcon }, { label: "Novelas", icon: Tv }, { label: "Filmes", icon: Film }, { label: "Séries", icon: Layers3 }, { label: "Minha lista", icon: Heart },
];

function PosterCard({ item, index, active, onFocus, onSelect }: { item: typeof catalog[number]; index: number; active: boolean; onFocus: () => void; onSelect: (item: typeof catalog[number]) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (active) ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); }, [active]);
  return <button ref={ref} className={`poster ${active ? "poster-active" : ""}`} onFocus={onFocus} onClick={() => onSelect(item)} aria-label={`Abrir ${item.title}`}>
    <div className="poster-art"><img src={item.image} alt="" />{item.badge && <span className="poster-badge">{item.badge}</span>}<span className="poster-play"><Play size={18} fill="currentColor" /></span></div>
    <div className="poster-copy"><strong>{item.title}</strong><span>{item.year} · {item.genre}</span></div>
  </button>
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("Início");
  const [activeRow, setActiveRow] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [selectedShow, setSelectedShow] = useState(catalog[0]);
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
        <div className="poster-row" role="list" aria-label="Novidades">{filtered.slice(0, 8).map((item, index) => <PosterCard key={item.title} item={item} index={index} active={activeRow === 1 && activeCard === index} onFocus={() => { setActiveRow(1); setActiveCard(index); }} onSelect={setSelectedShow} />)}</div>
        <div className="row-title second-row"><h3>Escolhidas para si</h3><button className="see-all">Ver tudo <ChevronRight size={18} /></button></div>
        <div className="poster-row compact" role="list">{catalog.slice(4, 10).map((item, index) => <PosterCard key={item.title} item={item} index={index} active={activeRow === 2 && activeCard === index} onFocus={() => { setActiveRow(2); setActiveCard(index); }} onSelect={setSelectedShow} />)}</div>
        <section className="episodes-panel" aria-label={`Episódios de ${selectedShow.title}`}>
          <div className="episodes-heading"><div><span className="section-kicker">A SUA SÉRIE</span><h3>Episódios de {selectedShow.title}</h3></div><span className="episode-count">{selectedShow.episodes} episódios disponíveis</span></div>
          <div className="episodes-row">{episodeList.slice(0, Math.min(selectedShow.episodes, 6)).map((episode) => <button className="episode-card" key={episode.number} onClick={() => window.open(selectedShow.source, "_blank")}><span className="episode-number">{String(episode.number).padStart(2, "0")}</span><span className="episode-info"><strong>{episode.title}</strong><small>{episode.duration} · Episódio {episode.number}</small></span><span className="episode-play"><Play size={15} fill="currentColor" /></span></button>)}</div>
          <p className="episodes-note">Os episódios seguem a disponibilidade publicada na página original. Seleccione um cartão para abrir a página de origem.</p>
        </section>
      </section>
    </main>
    <div className="remote-hint"><span className="key">←</span><span className="key">→</span> navegar <span className="key key-enter">OK</span> seleccionar</div>
  </div>;
}
