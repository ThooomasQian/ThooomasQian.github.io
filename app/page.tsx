/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
import { projects } from "./projects";
import { publications } from "./publications";

const researchAreas = [
  { index: "01", title: "Wireless digital twins", text: "Material-aware 3D reconstruction and site-specific ray tracing for accurate, reusable models of real environments." },
  { index: "02", title: "Physics-grounded learning", text: "Generative and differentiable models that improve simulated geometry and signals without discarding physical structure." },
  { index: "03", title: "Channel measurement", text: "Wideband FR1(C) and FR3 measurement, modeling, and validation across indoor, factory, and urban environments." },
] as const;

const appointments = [
  { date: "2025—2026", role: "Teaching Assistant", place: "NYU MakerSpace", detail: "Fabrication and prototyping instruction across 3D printing, laser cutting, water-jet machining, and interdisciplinary design." },
  { date: "2024", role: "Assistant Baseband Engineer", place: "Quectel", detail: "Designed schematics, multilayer PCB layouts, and automotive test hardware for 5G IoT modules." },
  { date: "2020—Present", role: "Robotics Design Lead and Coach", place: "FRC and RoboMaster", detail: "Led mechanical design, electronics, controls, fabrication, and match strategy for student robotics teams." },
] as const;

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="site-identity" href="#top"><strong>Guanyue Qian</strong><span>Electrical Engineering · NYU</span></a>
        <nav aria-label="Primary navigation"><a href="#research">Research</a><a href="#publications">Publications</a><a href="#education">Education</a><a href="#contact">Contact</a></nav>
        <a className="header-cv" href="/Guanyue-Qian-CV.pdf" target="_blank" rel="noreferrer">Curriculum Vitae</a>
      </header>

      <section className="academic-hero" aria-labelledby="hero-title">
        <div className="hero-profile">
          <img src="/media/guanyue-qian.jpg" alt="Portrait of Guanyue Qian" width={800} height={800} />
          <dl>
            <div><dt>Affiliation</dt><dd>NYU WIRELESS<br />New York University</dd></div>
            <div><dt>Fields</dt><dd>Wireless systems<br />Machine learning<br />3D computer vision</dd></div>
            <div><dt>Email</dt><dd><a href="mailto:gq2032@nyu.edu">gq2032@nyu.edu</a></dd></div>
          </dl>
        </div>
        <div className="hero-statement">
          <p className="overline">Research profile · 2026</p>
          <h1 id="hero-title">I build computational models of the physical world for <em>wireless intelligence.</em></h1>
          <p className="hero-lede">I am an electrical engineering student and researcher at New York University. My work connects site-specific radio propagation, machine learning, and 3D reconstruction to create digital twins that can be measured, simulated, and trusted.</p>
          <p className="hero-note">I am particularly interested in research at the intersection of physical modeling and learned representations, including differentiable sensing, material-aware reconstruction, and generative channel models.</p>
          <div className="hero-links"><a href="#research">View research</a><a href="https://scholar.google.com/citations?hl=en&user=ZR0V8iQAAAAJ" target="_blank" rel="noreferrer">Google Scholar ↗</a><a href="https://github.com/ThooomasQian" target="_blank" rel="noreferrer">GitHub ↗</a></div>
        </div>
      </section>

      <section className="research-areas page-section" aria-labelledby="areas-title">
        <div className="section-label"><span>Research interests</span><span>Methods + systems</span></div>
        <h2 id="areas-title">Research grounded in geometry, measurements, and physical constraints.</h2>
        <div className="area-grid">{researchAreas.map((area) => <article key={area.index}><span>{area.index}</span><h3>{area.title}</h3><p>{area.text}</p></article>)}</div>
      </section>

      <section className="projects-section page-section" id="research" aria-labelledby="research-title">
        <div className="section-label"><span>Selected research</span><span>{projects.length} projects</span></div>
        <div className="section-introduction"><h2 id="research-title">Current projects</h2><p>Each project page summarizes the research question, method, evidence, and associated manuscripts. The emphasis is on what was built and how it was validated.</p></div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="academic-project" key={project.slug}>
              <a className="project-image" href={`/research/${project.slug}/`} aria-label={`Read about ${project.title}`}><img src={project.image ?? "/media/geometry-wall-completion.png"} alt={project.imageAlt ?? "Visibility-aware geometry completion result"} loading="lazy" /></a>
              <div className="project-copy">
                <div className="project-meta"><span>{project.index}</span><span>{project.status}</span><span>{project.period}</span></div>
                <h3><a href={`/research/${project.slug}/`}>{project.title}</a></h3>
                <p>{project.lede}</p>
                <div className="project-evidence">{project.metrics.slice(0, 2).map((metric) => <span key={metric.label}><strong>{metric.value}</strong>{metric.label}</span>)}</div>
                <a className="read-link" href={`/research/${project.slug}/`}>Project details <span aria-hidden="true">→</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="publications-section page-section" id="publications" aria-labelledby="publications-title">
        <div className="section-label"><span>Publications</span><span>Journal + conference + manuscripts</span></div>
        <div className="section-introduction"><h2 id="publications-title">Selected writing</h2><p>Preprints and publisher records are linked where a public version is available. Submission status is shown explicitly.</p></div>
        <ol className="publication-list">
          {publications.map((paper) => {
            const content = <><span className="publication-index">{paper.index}</span><span className="publication-title">{paper.title}</span><span className="publication-venue">{paper.venue}</span><span className="publication-state">{paper.year}<br />{paper.status}</span><span className="publication-arrow" aria-hidden="true">{paper.href ? "↗" : "—"}</span></>;
            return <li key={paper.index}>{paper.href ? <a href={paper.href} target="_blank" rel="noreferrer">{content}</a> : <div>{content}</div>}</li>;
          })}
        </ol>
        <div className="publication-footer"><a href="https://scholar.google.com/citations?hl=en&user=ZR0V8iQAAAAJ" target="_blank" rel="noreferrer">Complete record on Google Scholar ↗</a><a href="/Guanyue-Qian-CV.pdf" target="_blank" rel="noreferrer">Publication list in CV ↗</a></div>
      </section>

      <section className="background-section page-section" id="education" aria-labelledby="background-title">
        <div className="section-label"><span>Background</span><span>Education + experience</span></div>
        <div className="section-introduction"><h2 id="background-title">Education and appointments</h2><p>My training combines electrical engineering, experimental wireless systems, fabrication, and research software.</p></div>
        <div className="education-card"><div><span>2023—2027</span><span>New York, NY</span></div><div><p>Bachelor of Science in Electrical Engineering</p><h3>New York University</h3><p className="education-detail">GPA 3.96 / 4.00 · William J. Stolze Award · Tau Beta Pi · Dean’s List · Rappaport Scholarship</p></div></div>
        <div className="appointment-list">{appointments.map((item) => <article key={`${item.date}-${item.role}`}><span>{item.date}</span><div><h3>{item.role}</h3><p>{item.place}</p></div><p>{item.detail}</p></article>)}</div>
      </section>

      <section className="fieldwork-section page-section" aria-labelledby="fieldwork-title">
        <div className="section-label"><span>Fieldwork and community</span><span>Research beyond the paper</span></div>
        <div className="section-introduction compact"><h2 id="fieldwork-title">Measurement, making, and exchange</h2><p>Research is also the practical work of assembling instruments, testing systems, presenting results, and learning from collaborators.</p></div>
        <div className="fieldwork-grid">
          <figure><img src="/media/about-channel-measurement.jpg" alt="Preparing channel-measurement equipment" loading="lazy" /><figcaption>Channel measurement · equipment preparation</figcaption></figure>
          <figure><img src="/media/conference-poster-session.jpg" alt="Presenting HoRAMA at a conference poster session" loading="lazy" /><figcaption>HoRAMA · conference poster session</figcaption></figure>
          <figure><img src="/media/about-stolze-award.jpg" alt="Guanyue Qian receiving the William J. Stolze Award" loading="lazy" /><figcaption>William J. Stolze Award · NYU Tandon</figcaption></figure>
        </div>
      </section>

      <footer id="contact">
        <div><p className="overline">Contact</p><h2>Research questions and collaborations are welcome.</h2></div>
        <div className="footer-contact"><a href="mailto:gq2032@nyu.edu">gq2032@nyu.edu</a><a href="https://www.linkedin.com/in/guanyue-qian/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/ThooomasQian" target="_blank" rel="noreferrer">GitHub ↗</a><a href="/Guanyue-Qian-CV.pdf" target="_blank" rel="noreferrer">CV ↗</a></div>
        <p className="footer-note">© 2026 Guanyue Qian · New York University</p>
      </footer>
    </main>
  );
}
