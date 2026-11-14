/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
import type { ResearchProject } from "./projects";
import { projects } from "./projects";

export function ProjectDetail({ project }: { project: ResearchProject }) {
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const primaryImage = project.image ?? project.gallery[0]?.src ?? "/media/geometry-wall-completion.png";
  const primaryAlt = project.imageAlt ?? project.gallery[0]?.alt ?? "Research project visualization";

  return (
    <>
      <nav className="top-nav">
        <div className="nav-inner">
          <a className="brand" href="/">Guanyue Qian</a>
          <div className="nav-links"><a href="/#about">About</a><a href="/#research">Research</a><a href="/#publications">Publications</a><a href="/#honors">Honors</a><a href="/Guanyue-Qian-CV.pdf" target="_blank" rel="noreferrer">CV</a></div>
        </div>
      </nav>

      <main className="academic-main detail-main">
        <section className="detail-hero">
          <p className="detail-kicker">{project.index} · {project.kicker}</p>
          <h1>{project.title}</h1>
          <p className="detail-lede">{project.lede}</p>
          <div className="detail-meta"><span>{project.status}</span><span>{project.period}</span></div>
          {project.collaborators && project.collaborators.length > 0 && <p className="collaboration">Collaborative work with {project.collaborators.map((collaborator, index) => <span key={collaborator.name}>{index > 0 && ", "}{collaborator.href ? <a href={collaborator.href} target="_blank" rel="noreferrer">{collaborator.name}</a> : collaborator.name}</span>)}.</p>}
          <figure className="detail-cover"><img src={primaryImage} alt={primaryAlt} /><figcaption>{project.kicker} · project overview</figcaption></figure>
        </section>

        <section>
          <h2>Highlights</h2>
          <div className="detail-metrics">{project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
        </section>

        <section>
          <h2>Research Context</h2>
          <div className="detail-copy">{project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p><strong>Research question:</strong> {project.question}</p></div>
        </section>

        <section>
          <h2>Method</h2>
          <ol className="detail-method">{project.method.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.text}</span></li>)}</ol>
        </section>

        {project.gallery.length > 0 && <section><h2>Figures</h2><div className={`gallery g${Math.min(project.gallery.length, 4)}`}>{project.gallery.map((item) => <figure key={item.src}><img src={item.src} alt={item.alt} /><figcaption>{item.caption}</figcaption></figure>)}</div></section>}

        <section>
          <h2>Results</h2>
          <ul className="plain">{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
        </section>

        <section>
          <h2>Resources</h2>
          <p className="tool-line"><strong>Tools:</strong> {project.tools.join(" · ")}</p>
          <div className="plinks">{project.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>[{link.label}]</a>)}</div>
        </section>

        <section className="next-detail"><strong>Next project:</strong> <a href={`/research/${nextProject.slug}/`}>{nextProject.title} →</a></section>
      </main>
      <footer className="academic-footer">© Guanyue Qian · <a href="mailto:gq2032@nyu.edu">gq2032@nyu.edu</a></footer>
    </>
  );
}
