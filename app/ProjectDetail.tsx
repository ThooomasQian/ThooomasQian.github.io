/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
import type { ResearchProject } from "./projects";
import { projects } from "./projects";

export function ProjectDetail({ project }: { project: ResearchProject }) {
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const primaryImage = project.image ?? project.gallery[0]?.src ?? "/media/geometry-wall-completion.png";
  const primaryAlt = project.imageAlt ?? project.gallery[0]?.alt ?? "Research project visualization";

  return (
    <main className="project-page">
      <header className="site-header project-header">
        <a className="site-identity" href="/"><strong>Guanyue Qian</strong><span>Research portfolio</span></a>
        <nav aria-label="Project navigation"><a href="/#research">Research</a><a href="/#publications">Publications</a><a href="/#education">Background</a></nav>
        <a className="header-cv" href="/Guanyue-Qian-CV.pdf" target="_blank" rel="noreferrer">Curriculum Vitae</a>
      </header>

      <article>
        <section className="project-hero">
          <div className="project-hero-copy">
            <p className="project-kicker"><span>{project.index}</span>{project.kicker}</p>
            <h1>{project.title}</h1>
            <p className="project-lede">{project.lede}</p>
            <dl className="project-facts">
              <div><dt>Status</dt><dd>{project.status}</dd></div>
              <div><dt>Period</dt><dd>{project.period}</dd></div>
              <div><dt>Researcher</dt><dd>Guanyue Qian · NYU</dd></div>
            </dl>
          </div>
          <figure className="project-primary-figure"><img src={primaryImage} alt={primaryAlt} /><figcaption>{project.kicker} · project overview</figcaption></figure>
        </section>

        <section className="project-metrics" aria-label="Project highlights">{project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</section>

        <section className="project-content project-overview">
          <div className="content-label"><span>01</span><h2>Research context</h2></div>
          <div className="content-body">{project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<blockquote><span>Research question</span>{project.question}</blockquote></div>
        </section>

        <section className="project-content project-method">
          <div className="content-label"><span>02</span><h2>Method</h2></div>
          <div className="method-list">{project.method.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
        </section>

        {project.gallery.length > 0 && <section className="project-gallery" aria-label="Project figures">{project.gallery.map((item) => <figure key={item.src}><img src={item.src} alt={item.alt} /><figcaption>{item.caption}</figcaption></figure>)}</section>}

        <section className="project-content project-results">
          <div className="content-label"><span>03</span><h2>Results</h2></div>
          <ol className="result-list">{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ol>
        </section>

        <section className="project-content project-resources">
          <div className="content-label"><span>04</span><h2>Resources</h2></div>
          <div><div className="tool-list">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>{project.links.length > 0 && <div className="resource-links">{project.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} ↗</a>)}</div>}</div>
        </section>
      </article>

      <a className="next-project" href={`/research/${nextProject.slug}/`}><span>Next project · {nextProject.index}</span><strong>{nextProject.title}</strong><i aria-hidden="true">→</i></a>
      <footer className="project-footer"><span>© 2026 Guanyue Qian</span><a href="mailto:gq2032@nyu.edu">gq2032@nyu.edu</a></footer>
    </main>
  );
}
