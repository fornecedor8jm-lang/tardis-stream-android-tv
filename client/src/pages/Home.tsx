/* TARDIS STREAM TV — Cinema de Sala.
 * Dados: a aba CLÁSSICA usa apenas os 11 cartões e os arcos confirmados no Blogspot.
 * Separação obrigatória: poster da temporada ≠ thumbnail do arco ≠ URL do vídeo.
 */
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Clock3, Home as HomeIcon, Info, Menu, Play, Search, Tv, X } from "lucide-react";
import { auditedClassics, classicSourcePage, type Episode } from "@/data/tardisCatalog";

type Status = "Disponível" | "Em breve" | "Série completa" | "Especial";
type CatalogItem = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  poster: string;
  status: Status;
  group: string;
  sourcePage: string;
  episodes: Episode[];
};

const homeSource = "https://tardisstream.blogspot.com/?m=1#cards-grid";
const poster = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;

const classicItems: CatalogItem[] = auditedClassics.map((item) => ({
  id: `classic-${item.season}`,
  title: `${item.season}ª Temporada`,
  subtitle: "Arcos em formato de filme de fã",
  year: item.year,
  poster: item.poster,
  status: item.episodes.some((episode) => episode.available) ? "Disponível" : "Em breve",
  group: "Versão filme",
  sourcePage: item.sourcePage,
  episodes: item.episodes,
}));

const spinOffs: CatalogItem[] = [
  ["torchwood-1", "Torchwood · 1ª Temporada", "Spin-off", "2006", "1_BROyoRA3nvGA1n9ojYcP4Cm05ZdoDMC", "Disponível"],
  ["torchwood-2", "Torchwood · 2ª Temporada", "Spin-off", "2008", "1j4HwPX40Pkrksx42UM0V1Jd2RLE4X4jK", "Em breve"],
  ["torchwood-3", "Torchwood · Temp. 3 (Children of Earth)", "Spin-off", "2009", "1EKXX2fBF6RZEgvwBDG5wAAeE-HnuUkyZ", "Em breve"],
  ["torchwood-4", "Torchwood · Temp. 4 (Miracle Day)", "Spin-off", "2011", "1KgBkIsLR9F6HnVKHw1-r4IKsCOyWPF9n", "Em breve"],
  ["sja-1", "The Sarah Jane Adventures · 1ª Temporada", "Spin-off", "2007", "15R5uAWyyYFCDNgtYIqOUj04QfNHkqhCP", "Em breve"],
  ["sja-2", "The Sarah Jane Adventures · 2ª Temporada", "Spin-off", "2008", "1XTC3TPkXCxhQw1OUOxiGGEedHAZeXwK5", "Em breve"],
  ["sja-3", "The Sarah Jane Adventures · 3ª Temporada", "Spin-off", "2009", "1a9kDTNknIMmlVGG4USUZ8AXrp5Zb-Q6B", "Em breve"],
  ["sja-4", "The Sarah Jane Adventures · 4ª Temporada", "Spin-off", "2010", "1aa_XPfTSosH6yNbItZgfmqUX5nJh7LoF", "Em breve"],
  ["sja-5", "The Sarah Jane Adventures · 5ª Temporada", "Spin-off", "2011", "1nKo_yxu2PeAK5Y0N1o9bnMXq0zY89o3R", "Em breve"],
  ["class", "Class Dublado (Série Completa)", "Spin-off · série completa", "2016", "1n9NQUEPoTQdmZBOMAhFnkFNcStnqXzZl", "Série completa"],
  ["tales", "Tales of the TARDIS", "Spin-off especial", "2023", "1TZU5i1Ift3Vg7E3js36cqrrUcsg4pOUK", "Especial"],
].map(([id, title, subtitle, year, image, status]) => ({ id, title, subtitle, year, poster: poster(image), status: status as Status, group: "Spin-offs", sourcePage: homeSource, episodes: [] }));

const documentaries: CatalogItem[] = [{ id: "confidential", title: "Doctor Who Confidential — Temporada 5", subtitle: "Documentário", year: "2010", poster: poster("1p45DhvMsLGhU4sT3n2Bow8CjjXKh7s7G"), status: "Disponível", group: "Documentários", sourcePage: homeSource, episodes: [] }];
const specials: CatalogItem[] = [{ id: "specials", title: "Especiais", subtitle: "Especiais de 60 anos", year: "2023", poster: poster("14HAhvowsK8cPnFxUhtfcOApwAtCME8GI"), status: "Especial", group: "Especiais de 60 anos", sourcePage: homeSource, episodes: [] }];
const groups: Record<string, CatalogItem[]> = { "CLÁSSICA": classicItems, "SPIN-OFFS": spinOffs, "DOCUMENTÁRIOS": documentaries, "ESPECIAIS DE 60 ANOS": specials };
const navItems = [
  { label: "INÍCIO", icon: <HomeIcon /> },
  { label: "CLÁSSICA", icon: <Tv /> },
  { label: "SPIN-OFFS", icon: <span className="nav-glyph">✦</span> },
  { label: "DOCUMENTÁRIOS", icon: <span className="nav-glyph">▣</span> },
  { label: "ESPECIAIS DE 60 ANOS", icon: <span className="nav-glyph">∞</span> },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState("INÍCIO");
  const [activeCard, setActiveCard] = useState(0);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(true);
  const visible = useMemo(() => activeNav === "INÍCIO" ? classicItems : groups[activeNav] ?? [], [activeNav]);
  const filtered = useMemo(() => visible.filter((item) => `${item.title} ${item.subtitle} ${item.year}`.toLowerCase().includes(query.toLowerCase())), [visible, query]);
  const selected = filtered[activeCard] ?? filtered[0] ?? visible[0] ?? classicItems[0];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Backspace") setMenuOpen(false);
      if (event.key === "ArrowRight") setActiveCard((value) => Math.min(value + 1, Math.max(filtered.length - 1, 0)));
      if (event.key === "ArrowLeft") setActiveCard((value) => Math.max(value - 1, 0));
      if (event.key === "ArrowDown") document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (event.key === "ArrowUp") window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered.length]);

  useEffect(() => {
    document.querySelector<HTMLElement>(".season-card.selected")?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeCard, activeNav, filtered.length]);

  const selectNav = (label: string) => { setActiveNav(label); setActiveCard(0); setQuery(""); };
  const openSource = () => window.open(selected.sourcePage || homeSource, "_blank", "noopener,noreferrer");
  const title = activeNav === "INÍCIO" ? "Início" : activeNav;
  const kicker = activeNav === "CLÁSSICA" || activeNav === "INÍCIO" ? "VERSÃO FILME · ARCOS SELECCIONADOS" : activeNav === "SPIN-OFFS" ? "UNIVERSOS DERIVADOS" : activeNav === "DOCUMENTÁRIOS" ? "POR TRÁS DA TARDIS" : "ESPECIAIS DE 60 ANOS";
  const episodeLabel = selected.episodes.length ? `${selected.episodes.length} arcos confirmados na fonte` : "A fonte confirma o título, sem lista de reprodução auditada nesta página";

  return <div className="tardis-app">
    <aside className={`tardis-rail ${menuOpen ? "rail-expanded" : ""}`}>
      <button className="tardis-brand" onClick={() => selectNav("INÍCIO")}><span className="tardis-box">✦</span><span>TARDIS<br /><b>STREAM</b></span></button>
      <button className="rail-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
      <nav className="tardis-nav">{navItems.map((item) => <button key={item.label} className={activeNav === item.label ? "rail-active" : ""} onClick={() => selectNav(item.label)}>{item.icon}<span>{item.label}</span></button>)}</nav>
      <div className="rail-footer"><button aria-label="Pesquisar" onClick={() => document.getElementById("tardis-search")?.focus()}><Search /></button><span className="rail-year">1963—∞</span></div>
    </aside>
    <header className="tardis-topbar"><div><span className="eyebrow">UNIVERSO DOCTOR WHO</span><h1>{title}</h1></div><div className="top-actions"><span className="live-clock"><Clock3 size={16} /> 21:42</span><label className="tardis-search"><Search size={18} /><input id="tardis-search" value={query} onChange={(event) => { setQuery(event.target.value); setActiveCard(0); }} placeholder="Buscar títulos" aria-label="Buscar títulos" /></label></div></header>
    <main>
      <section className="tardis-hero"><div className="hero-vortex" /><div className="hero-copy"><span className="hero-kicker">{kicker}</span><h2>{selected.title}<br /><em>{selected.year}</em></h2><p>{activeNav === "CLÁSSICA" ? "Arcos seleccionados em formato de filme, feitos por fãs. A série clássica completa não está disponível no TARDIS Stream." : `${selected.subtitle}. Catálogo organizado a partir dos cartões públicos da fonte.`}</p><div className="hero-meta"><span>{selected.status}</span><span>{visible.length} títulos nesta secção</span><span>Fonte consultada</span></div><div className="hero-actions"><button className="primary-action" onClick={openSource}><Play size={18} fill="currentColor" /> Abrir fonte</button><button className="secondary-action" onClick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}><Info size={18} /> Ver catálogo</button></div></div><div className="hero-mark"><span className="hero-star">✦</span><b>THE<br />TIME<br />LORD</b><small>PUBLIC CALL BOX</small></div></section>
      <section className="tardis-section" id="catalogo"><div className="section-heading"><div><span className="eyebrow">{activeNav === "INÍCIO" ? "DESTAQUE DA HOME" : "CATÁLOGO PÚBLICO"}</span><h2>{activeNav === "INÍCIO" ? "Versão filme clássica" : activeNav}</h2></div><span className="section-count">{filtered.length} títulos</span></div><div className="season-rail">{filtered.map((item, index) => <button key={item.id} className={`season-card ${item.id === selected.id ? "selected" : ""}`} onFocus={() => setActiveCard(index)} onClick={() => setActiveCard(index)}><div className="season-art"><img src={item.poster} alt={`Poster de ${item.title}`} /><span className="season-play"><Play size={16} fill="currentColor" /></span></div><strong>{item.title}</strong><small>{item.subtitle} · {item.year}</small><em>{item.status}</em></button>)}</div></section>
      <section className="episode-section"><div className="episode-header"><div><span className="eyebrow">DETALHE DO TÍTULO</span><h2>{selected.title}</h2><p>{selected.subtitle} · {selected.year} · {selected.status}</p></div><button className="source-button" onClick={openSource}>Abrir fonte <ArrowRight size={17} /></button></div><div className="episode-layout"><div className="selected-poster"><img src={selected.poster} alt={`Poster de ${selected.title}`} /></div><div className="episode-list">{selected.episodes.length ? selected.episodes.map((episode) => <button key={`${selected.id}-${episode.num}`} className="episode-row" onClick={() => episode.available && window.open(episode.url, "_blank", "noopener,noreferrer")} disabled={!episode.available}><span className="episode-number">{episode.num}</span>{episode.thumb ? <img className="episode-thumb" src={episode.thumb} alt="" /> : null}<span><strong>{episode.name}</strong><small>{episode.available ? "Abrir vídeo confirmado na fonte" : "Sem link público confirmado"}</small></span><Play size={18} fill="currentColor" /></button>) : <div className="episode-empty"><strong>{episodeLabel}</strong><span>O botão abre a página pública original; não foram inventados episódios ou links.</span></div>}</div></div></section>
    </main>
    <footer className="tardis-footer"><span>TARDIS STREAM</span><span>Catálogo público · versão filme, spin-offs, documentários e especiais</span><a href={classicSourcePage} target="_blank" rel="noreferrer">Abrir site original <ArrowRight size={15} /></a></footer><div className="remote-hint"><ArrowLeft size={15} /><ArrowRight size={15} /> navegar <kbd>OK</kbd> seleccionar <span>Backspace</span> voltar</div>
  </div>;
}
