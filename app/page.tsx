/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
import type { ResearchProject } from "./projects";
import { projects } from "./projects";
import { publications } from "./publications";

const bySlug = new Map(projects.map((project) => [project.slug, project]));

const researchGroups = [
  { title: "Wireless Digital Twins & Ray Tracing", slugs: ["horama", "horama-l", "geometry-completion", "nyuray-intelligence"] },
  { title: "Differentiable Sensing & Generative Wireless Models", slugs: ["radar-splatting", "pdp-diffusion"] },
] as const;

const news = [
  ["Nov. 2026", "4D Point Splatting for mmWave radar micro-Doppler released as an arXiv preprint and submitted to ICLR 2027."],
  ["Oct. 2026", "PRIMO study on joint beamforming and RIS deployment accepted at the Asilomar Conference."],
  ["Sept. 2026", "SPARC sparse path-aware calibration accepted at IEEE GLOBECOM 2026."],
  ["May 2026", "HoRAMA material-aware reconstruction presented at IEEE ICC 2026 in Glasgow."],
  ["Mar. 2026", "NYURay site-specific calibration and validation published in npj Wireless Technology."],
] as const;

const experience = [
  { title: "Researcher · NYU WIRELESS", date: "2025 – Present", detail: "New York, NY · Wireless digital twins, site-specific ray tracing, differentiable sensing, and generative channel modeling." },
  { title: "Teaching Assistant · NYU MakerSpace", date: "2025 – 2026", detail: "Fabrication and prototyping instruction spanning 3D printing, laser cutting, water-jet machining, and interdisciplinary design." },
  { title: "Assistant Baseband Engineer · Quectel", date: "2024", detail: "Designed schematics, multilayer PCB layouts, and automotive test hardware for 5G IoT modules." },
] as const;

function ProjectArticle({ project }: { project: ResearchProject }) {
  const media = [
    ...(project.image ? [{ src: project.image, alt: project.imageAlt ?? project.title, caption: "Project overview" }] : []),
    ...project.gallery,
  ].filter((item, index, items) => items.findIndex((candidate) => candidate.src === item.src) === index).slice(0, 4);

  return (
    <article className="proj">
      <div className="proj-head"><h4>{project.title}</h4><span className="meta">{project.period} · {project.status}{project.collaborators?.map((collaborator) => <span className="collab-inline" key={collaborator.name}> · with {collaborator.href ? <a href={collaborator.href} target="_blank" rel="noreferrer">{collaborator.name}</a> : collaborator.name}</span>)}</span></div>
      <ul>
        <li>{project.lede}</li>
        {project.outcomes.slice(0, 2).map((outcome) => <li key={outcome}>{outcome}</li>)}
      </ul>
      {media.length > 0 && <div className={`gallery g${Math.min(media.length, 4)}`}>{media.map((item) => <figure key={item.src}><img loading="lazy" src={item.src} alt={item.alt} /><figcaption>{item.caption}</figcaption></figure>)}</div>}
      <div className="plinks"><a href={`/research/${project.slug}/`}>[Project page]</a>{project.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>[{link.label}]</a>)}</div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <nav className="top-nav">
        <div className="nav-inner">
          <a className="brand" href="#about">Guanyue Qian</a>
          <div className="nav-links">
            <a href="#about">About</a><a href="#news">News</a><a href="#education">Education</a><a href="#experience">Experience</a><a href="#research">Research</a><a href="#publications">Publications</a><a href="#honors">Honors</a><a href="#service">Service</a><a href="/Guanyue-Qian-CV.pdf" target="_blank" rel="noreferrer">CV</a>
          </div>
        </div>
      </nav>

      <main className="academic-main">
        <section id="about" className="profile-hero">
          <img src="/media/guanyue-qian.jpg" alt="Guanyue Qian" />
          <div>
            <h1>Guanyue Qian</h1>
            <div className="role">B.S. Candidate in Electrical Engineering, <a href="https://www.nyu.edu/" target="_blank" rel="noreferrer">New York University</a></div>
            <p>I am an undergraduate researcher at <a href="https://wireless.engineering.nyu.edu/" target="_blank" rel="noreferrer">NYU WIRELESS</a>. My research connects site-specific wireless propagation, machine learning, and 3D reconstruction to build digital twins and sensing models that remain grounded in physical measurements.</p>
            <p>Research interests: wireless ray tracing, 3D reconstruction and digital twins, differentiable radar rendering, generative models for wireless channels, and upper mid-band channel measurement and modeling.</p>
            <p><strong>I am applying to Ph.D. programs and research opportunities in wireless systems, sensing, and machine learning.</strong></p>
            <div className="contact">Email: gq2032 [AT] nyu [DOT] edu<br /><a href="/Guanyue-Qian-CV.pdf" target="_blank" rel="noreferrer">CV</a><span className="sep">/</span><a href="https://scholar.google.com/citations?hl=en&user=ZR0V8iQAAAAJ" target="_blank" rel="noreferrer">Google Scholar</a><span className="sep">/</span><a href="https://github.com/ThooomasQian" target="_blank" rel="noreferrer">GitHub</a><span className="sep">/</span><a href="https://www.linkedin.com/in/guanyue-qian/" target="_blank" rel="noreferrer">LinkedIn</a></div>
          </div>
        </section>

        <section id="news"><h2>News</h2><ul className="news">{news.map(([date, item]) => <li key={`${date}-${item}`}><span className="date">{date}</span><span>{item}</span></li>)}</ul></section>

        <section id="education"><h2>Education</h2><ul className="timeline"><li><strong>B.S., Electrical Engineering</strong><span className="when">Sept. 2023 – 2027</span><span className="sub">New York University · GPA: 3.96 / 4.00</span></li></ul></section>

        <section id="experience"><h2>Research and Industry Experience</h2><ul className="timeline">{experience.map((item) => <li key={item.title}><strong>{item.title}</strong><span className="when">{item.date}</span><span className="sub">{item.detail}</span></li>)}</ul></section>

        <section id="research">
          <h2>Research</h2>
          <p className="research-note">The collaborative projects below identify shared work explicitly; descriptions are written from my role in the joint research.</p>
          {researchGroups.map((group) => <div key={group.title}><h3 className="theme">{group.title}</h3>{group.slugs.map((slug) => { const project = bySlug.get(slug); return project ? <ProjectArticle project={project} key={slug} /> : null; })}</div>)}
          <h3 className="theme">Channel Measurement & Modeling</h3>
          <article className="proj">
            <div className="proj-head"><h4>Wideband FR1(C) and FR3 Propagation Measurements</h4><span className="meta">2024 – Present · with <a href="https://yingmingjun.github.io/" target="_blank" rel="noreferrer">Mingjun Ying</a> and NYU WIRELESS collaborators</span></div>
            <ul><li>Contributed to 6.75 and 16.95 GHz campaigns in urban microcell, indoor hotspot, and indoor factory environments, including penetration-loss and cross-polarization measurements.</li><li>Conducted 3.7 GHz FR1(C) measurements with a 1 GHz sliding-correlator channel sounder across the same three deployment scenarios.</li><li>Developed statistical channel models and machine-readable point data for reproducible comparison across frequencies, environments, and institutions.</li></ul>
            <div className="media"><figure><video controls muted preload="metadata" playsInline><source src="/media/fr1-measurement.mp4" type="video/mp4" /></video><figcaption>3.7 GHz FR1(C) measurement campaign</figcaption></figure></div>
            <div className="gallery g3"><figure><img loading="lazy" className="photo" src="/media/about-channel-measurement.jpg" alt="Preparing channel measurement hardware" /><figcaption>Equipment preparation</figcaption></figure><figure><img loading="lazy" className="photo" src="/media/about-equipment-test.jpg" alt="Testing RF measurement equipment" /><figcaption>RF system test</figcaption></figure><figure><img loading="lazy" className="photo" src="/media/about-sounder-check.jpg" alt="Channel sounder equipment check" /><figcaption>Sounder verification</figcaption></figure></div>
          </article>
        </section>

        <section id="publications">
          <h2>Publications</h2><p className="filters">Preprints and publisher records are linked where a public version is available. Manuscript status is shown explicitly.</p>
          <div className="pub-group"><h3>Journal Articles</h3><ul className="publication-list">{publications.filter((paper) => paper.index.startsWith("J")).map((paper) => <li key={paper.index}><span className="pub-label">[{paper.index}]</span>{paper.title}, <em>{paper.venue}</em>, {paper.year}. {paper.href && <a href={paper.href} target="_blank" rel="noreferrer">[Paper]</a>}</li>)}</ul></div>
          <div className="pub-group"><h3>Conference Papers and Manuscripts</h3><ul className="publication-list">{publications.filter((paper) => paper.index.startsWith("C")).map((paper) => <li key={paper.index}><span className="pub-label">[{paper.index}]</span>{paper.title}, <em>{paper.venue}</em>, {paper.year}. <span className="status">{paper.status}.</span> {paper.href && <a href={paper.href} target="_blank" rel="noreferrer">[Paper]</a>}</li>)}</ul></div>
        </section>

        <section id="honors"><h2>Honors and Awards</h2><ul className="plain"><li>William J. Stolze Award, NYU Tandon School of Engineering</li><li>Tau Beta Pi Engineering Honor Society</li><li>Dean’s List, New York University</li><li>Rappaport Scholarship</li></ul><div className="gallery g2 honors-gallery"><figure><img loading="lazy" className="photo" src="/media/about-stolze-award.jpg" alt="Guanyue Qian receiving the William J. Stolze Award" /><figcaption>William J. Stolze Award · NYU Tandon</figcaption></figure><figure><img loading="lazy" className="photo" src="/media/conference-poster-session.jpg" alt="HoRAMA conference poster presentation" /><figcaption>HoRAMA · conference poster session</figcaption></figure></div></section>

        <section id="service"><h2>Leadership and Service</h2><ul className="plain"><li><strong>Robotics Design Lead and Coach</strong>, FRC and RoboMaster teams, 2020 – Present.</li><li><strong>Teaching Assistant</strong>, NYU MakerSpace, supporting student fabrication and interdisciplinary prototyping.</li><li><strong>Research communication</strong>, conference poster presentations and technical demonstrations for wireless digital-twin projects.</li></ul></section>
      </main>
      <footer className="academic-footer">© Guanyue Qian · Last updated: Nov. 2026</footer>
    </>
  );
}
