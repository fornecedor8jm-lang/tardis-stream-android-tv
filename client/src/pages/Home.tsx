/* TARDIS STREAM TV — interface de catálogo para sala: rail temporal, posters originais, foco amplo e episódios por temporada. */
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Clock3, Home as HomeIcon, Info, Menu, Play, Search, Tv, X } from "lucide-react";

const driveFolders = [
  "1tipC1tw2x85ZZsvaqpeeM_H-sGeTKaTJ", "1qipiTfMf_njXPeAh3N7Ai807OFjWYJpr", "1u0N6xscFNNxPaNABGHEojwQ3mOcJ6oyA", "1mL7cWOpVyK5uUGdpJpBAuOf8OIY7kK3A", "13-AfYtvvTqosPBWPtH1GUiYlnMRrPBCm", "17Y8BdNH-kZ00rXyOdWOAH2UFOLHBP5M7", "1Q6e1qnAeeKmAC8XNck5_B_qweOtvXDHF", "17yrMj9hH16rsZtlyz2h8hE9iIbGO8P4q", "117a3y45-WFqSlkufmdsrmlKfE2whJlUC", "127jqXFzeXG_HR6mH5mq1SNKJ3iro-Fun", "1N3kBIA-gZxtpl6cxQ0B5_V6ytqnz82wf", "1ZJCohUzQF7dq4FBCkoMdgmqT3Jaaty0F", "1VxsceYq6amXMHEZujxy0xAqUhSLHpUXX", "1PtsYIZSOuXIkcS2BQotdUD8Tl_8YznsT", "1VTTl8bWjPkCmq18CKytQzU_qqP3sgRa3"
];

const posterMap: Record<number, string> = {
  7: "12at8cGeHpcsBDJehz1RnfKoI5c8IUQ0W",
  8: "1WQi2d2W2gz_yYTF3YEPtD6naoZEIfX2R",
  9: "1VTiDuMwRccIeQM14Lb10vLXGG_nDx8yr",
  10: "1zwVfOGox5spHR2IdfnbWnUz3eh5ir56o",
  12: "1sisgEXvxmpGFeX0mt0UxhGYRMiCxBdOx",
  13: "1sbA6QHWDsPL-4w_nFEBGuUlJq2mdIoth",
  14: "1uERt4EV9VU12-Myl78BwqLe9Dvqu12xB",
  15: "1jsXz7yMFWqYqedFT3iuIJ7A8VOHHgvF0",
  17: "14Xp1hHne-MBlPndx_hoTM5Q8lpEbY2CM",
  18: "1GJ8VaF6o1kyv_tyysVLncPi4yg44MBxQ",
  19: "1c5sam1bd12l2Rox0ljPbLPBqKROku0-i"
};

const seasonNames: Record<number, string> = {
  1: "A Nova Era", 2: "O Doutor e a Rose", 3: "A Tempestade se Aproxima", 4: "O Último Viajante", 5: "A Pandorica", 6: "O Silêncio", 7: "A Era de Sarah Jane", 8: "O Último Grande Senhor do Tempo", 9: "A Queda de Gallifrey", 10: "O Piloto", 11: "A Mulher que Caiu na Terra", 12: "Spyfall", 13: "Flux", 14: "A Nova Viagem", 15: "A Guerra da Realidade"
};

const availableClassicSeasons = [7, 8, 9, 10, 12, 13, 14, 15];

const episodeSamples: Record<number, string[]> = {
  1: ["Rose", "O Fim do Mundo", "Os Mortos Inquietos", "Dalek"],
  2: ["A Invasão do Natal", "Nova Terra", "Dente e Garra", "Reunião Escolar"],
  3: ["A Noiva em Fuga", "Smith e Jones", "O Código Shakespeare", "Não Pisque"],
  4: ["A Viagem dos Condenados", "Parceiros no Crime", "Os Fogos de Pompeia", "O Fim do Tempo"],
  5: ["A Décima Primeira Hora", "A Besta de Baixo", "O Tempo dos Anjos", "O Big Bang"],
  6: ["Um Conto de Natal", "O Astronauta Impossível", "A Esposa do Doutor", "O Casamento de River Song"],
  7: ["O Doutor, a Viúva e o Guarda-roupas", "O Asilo dos Daleks", "O Dia do Doutor"],
  8: ["A Hora do Doutor", "Respire Fundo", "Dentro do Dalek", "Morte no Paraíso"],
  9: ["O Último Natal", "O Aprendiz de Mágico", "A Garota Que Morreu", "Os Maridos de River Song"],
  10: ["O Retorno do Doutor Mistério", "O Piloto", "Sorria", "A Queda do Doutor"],
  11: ["Eram Duas Vezes", "A Mulher Que Caiu na Terra", "Rosa", "A Batalha de Ranskoor Av Kolos"],
  12: ["Resolução", "Spyfall — Parte 1", "Fugindo dos Judoon", "As Crianças Atemporais"],
  13: ["A Revolução dos Daleks", "O Apocalipse do Dia das Bruxas", "O Vilarejo dos Anjos", "O Poder do Doutor"],
  14: ["A Fera Estelar", "A Imensidão Azul", "Risadinha", "Império da Morte"],
  15: ["Joy Para o Mundo", "A Revolução Robô", "Lux", "A Guerra da Realidade"]
};

function folderUrl(season: number) { return `https://drive.google.com/drive/folders/${driveFolders[season - 1]}`; }
function posterUrl(id?: string) { return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w900` : ""; }

export default function Home() {
  const [activeNav, setActiveNav] = useState("Clássica");
  const [activeSeason, setActiveSeason] = useState(7);
  const [activeCard, setActiveCard] = useState(0);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const seasons = useMemo(() => availableClassicSeasons.filter((season) => `temporada ${season} ${seasonNames[season]}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const selected = seasons[activeCard] ?? activeSeason;
  const episodes = episodeSamples[selected] ?? [];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Backspace") setMenuOpen(false);
      if (event.key === "ArrowRight") setActiveCard((value) => Math.min(value + 1, Math.max(seasons.length - 1, 0)));
      if (event.key === "ArrowLeft") setActiveCard((value) => Math.max(value - 1, 0));
      if (event.key === "ArrowDown") setActiveSeason(selected);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [seasons.length, selected]);

  const openSource = (url: string) => { window.location.href = url; };
  const poster = posterUrl(posterMap[selected]);

  return <div className="tardis-app">
    <aside className={`tardis-rail ${menuOpen ? "rail-expanded" : ""}`}>
      <button className="tardis-brand" onClick={() => setActiveNav("Início")} aria-label="Tardis Stream"><span className="tardis-box">✦</span><span>TARDIS<br /><b>STREAM</b></span></button>
      <button className="rail-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
      <nav className="tardis-nav" aria-label="Navegação principal">
        {[{ label: "Início", icon: <HomeIcon /> }, { label: "Clássica", icon: <Tv /> }, { label: "Spin-offs", icon: <span className="nav-glyph">✦</span> }, { label: "Especiais", icon: <span className="nav-glyph">∞</span> }].map((item) => <button key={item.label} className={activeNav === item.label ? "rail-active" : ""} onClick={() => setActiveNav(item.label)}>{item.icon}<span>{item.label}</span></button>)}
      </nav>
      <div className="rail-footer"><button aria-label="Pesquisar" onClick={() => document.getElementById("tardis-search")?.focus()}><Search /></button><span className="rail-year">1963—∞</span></div>
    </aside>

    <header className="tardis-topbar"><div><span className="eyebrow">UNIVERSO DOCTOR WHO</span><h1>{activeNav}</h1></div><div className="top-actions"><span className="live-clock"><Clock3 size={16} /> 21:42</span><label className="tardis-search"><Search size={18} /><input id="tardis-search" value={query} onChange={(event) => { setQuery(event.target.value); setActiveCard(0); }} placeholder="Buscar temporadas" aria-label="Buscar temporadas" /></label></div></header>

    <main>
      <section className="tardis-hero">
        <div className="hero-vortex" />
        <div className="hero-copy"><span className="hero-kicker">SINTONIZANDO O VÓRTEX TEMPORAL</span><h2>Doctor Who<br /><em>Clássica</em></h2><p>Uma viagem por décadas de aventuras, doutores e mundos impossíveis. Escolha uma temporada para começar.</p><div className="hero-meta"><span>1963 — ∞</span><span>{seasons.length} temporadas com poster</span><span>Fonte externa</span></div><div className="hero-actions"><button className="primary-action" onClick={() => openSource(folderUrl(selected))}><Play size={18} fill="currentColor" /> Abrir temporada {String(selected).padStart(2, "0")}</button><button className="secondary-action" onClick={() => document.getElementById("temporadas")?.scrollIntoView({ behavior: "smooth" })}><Info size={18} /> Ver temporadas</button></div></div>
        <div className="hero-mark"><span className="hero-star">✦</span><b>THE<br />TIME<br />LORD</b><small>PUBLIC CALL BOX</small></div>
      </section>

      <section className="tardis-section" id="temporadas"><div className="section-heading"><div><span className="eyebrow">CATÁLOGO PRINCIPAL</span><h2>Temporadas clássicas</h2></div><span className="section-count">{seasons.length} com poster original</span></div><div className="season-rail">{seasons.map((season, index) => <button key={season} className={`season-card ${season === selected ? "selected" : ""}`} onFocus={() => { setActiveCard(index); setActiveSeason(season); }} onClick={() => setActiveSeason(season)} aria-label={`Abrir temporada ${season}`}><div className="season-art"><img src={posterUrl(posterMap[season])} alt={`Poster original da temporada ${season}`} /><span className="season-play"><Play size={16} fill="currentColor" /></span></div><strong>{season}ª Temporada</strong><small>{seasonNames[season]}</small><em>Poster original</em></button>)}</div></section>

      <section className="episode-section"><div className="episode-header"><div><span className="eyebrow">TEMPORADA {String(selected).padStart(2, "0")}</span><h2>{seasonNames[selected]}</h2><p>{episodes.length} episódios destacados · pasta pública no Google Drive</p></div><button className="source-button" onClick={() => openSource(folderUrl(selected))}>Abrir pasta <ArrowRight size={17} /></button></div><div className="episode-layout"><div className="selected-poster"><img src={poster} alt={`Poster original da temporada ${selected}`} /></div><div className="episode-list">{episodes.map((episode, index) => <button key={episode} className="episode-row" onClick={() => openSource(folderUrl(selected))}><span className="episode-number">{String(index + 1).padStart(2, "0")}</span><span><strong>{episode}</strong><small>Temporada {selected} · ficheiro MP4 na pasta oficial</small></span><Play size={18} fill="currentColor" /></button>)}</div></div></section>
    </main>
    <footer className="tardis-footer"><span>TARDIS STREAM</span><span>Universo Doctor Who · 1963 — ∞</span><a href="https://tardisstream.blogspot.com/" target="_blank" rel="noreferrer">Abrir site original <ArrowRight size={15} /></a></footer>
    <div className="remote-hint"><ArrowLeft size={15} /><ArrowRight size={15} /> navegar <kbd>OK</kbd> seleccionar <span>Backspace</span> voltar</div>
  </div>;
}
