/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
import type { CSSProperties } from "react";
import type { ResearchProject } from "./projects";
import { projects } from "./projects";

export function ProjectDetail({ project }: { project: ResearchProject }) {
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const style = { "--project-accent": project.accent } as CSSProperties;

  return (
    <main className="project-page" style={style}>
      <header className="project-nav">
        <a className="wordmark" href="/" aria-label="Guanyue Qian, home">GQ<span>•</span></a>
        <nav aria-label="Project navigation"><a href="/#research">All research</a><a href="/#publications">Papers</a><a href="/#about">About</a></nav>
        <a className="project-nav-cv" href="/Guanyue-Qian-CV.pdf" target="_blank">View CV ↗</a>
      </header>

      <section className="project-detail-hero">
        <div className="project-detail-title">
          <p><span>{project.index}</span>{project.kicker}</p>
          <h1>{project.title}</h1>
          <div className="project-detail-lede"><p>{project.lede}</p><div><span>{project.status}</span><span>{project.period}</span></div></div>
        </div>
        <div className={`project-hero-media ${project.image ? "has-image" : "radar-media"}`}>
          {project.image ? <img src={project.image} alt={project.imageAlt ?? ""} /> : <RadarStudyVisual />}
          <div className="project-media-label"><span>GUANYUE QIAN · NYU WIRELESS</span><span>{project.kicker}</span></div>
        </div>
      </section>

      <section className="project-metrics" aria-label="Project highlights">
        {project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
      </section>

      <section className="project-narrative section-shell">
        <aside><p className="section-kicker">THE PROJECT</p><h2>The problem behind the result.</h2></aside>
        <div className="project-body-copy">
          {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <blockquote><span>RESEARCH QUESTION</span>{project.question}</blockquote>
        </div>
      </section>

      <section className="project-method">
        <div className="section-shell">
          <div className="project-method-head"><p className="section-kicker light">METHOD</p><h2>From input<br />to evidence.</h2></div>
          <div className="method-list">
            {project.method.map((step, index) => (
              <article key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      {project.gallery.length > 0 && (
        <section className="project-gallery section-shell">
          {project.gallery.map((item) => <figure key={item.src}><img src={item.src} alt={item.alt} /><figcaption>{item.caption}</figcaption></figure>)}
        </section>
      )}

      <section className="project-results section-shell">
        <div><p className="section-kicker">WHAT CHANGED</p><h2>Results that survive the handoff.</h2></div>
        <ol>{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ol>
      </section>

      <section className="project-toolkit section-shell">
        <p className="section-kicker">SYSTEM + TOOLKIT</p>
        <div>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
        {project.links.length > 0 && <div className="project-external-links">{project.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} ↗</a>)}</div>}
      </section>

      <a className="next-project" href={`/research/${nextProject.slug}/`}>
        <span>NEXT PROJECT · {nextProject.index}</span><strong>{nextProject.title}</strong><i aria-hidden="true">→</i>
      </a>

      <footer className="project-footer"><span>© 2026 Guanyue Qian</span><a href="mailto:gq2032@nyu.edu">gq2032@nyu.edu ↗</a></footer>
    </main>
  );
}

function RadarStudyVisual() {
  const echoes = Array.from({ length: 42 }, (_, index) => index);
  return (
    <div className="radar-study" aria-label="Stylized range-Doppler point-splat field">
      <div className="radar-grid" />
      <div className="radar-person"><i /><i /><i /><i /><i /><i /></div>
      {echoes.map((echo) => {
        const angle = echo * 2.17;
        const radiusX = 8 + (echo % 11) * 3.1;
        const radiusY = 6 + (echo % 9) * 3.2;
        return <b key={echo} style={{ left: `${50 + Math.cos(angle) * radiusX}%`, top: `${48 + Math.sin(angle) * radiusY}%`, width: `${2 + echo % 4}px`, height: `${2 + echo % 4}px`, opacity: .35 + (echo % 6) * .1 } as CSSProperties} />;
      })}
      <div className="radar-axis"><span>RANGE</span><span>DOPPLER</span></div>
    </div>
  );
}
