/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
import type { CSSProperties } from "react";
import { HoramaPointCloud } from "./HoramaPointCloud";
import { NeuralField } from "./NeuralField";
import { publications } from "./publications";

export default function Home() {
  return (
    <main>
      <header className="nav-shell">
        <a className="wordmark" href="#top" aria-label="Guanyue Qian, home">GQ<span>•</span></a>
        <nav aria-label="Primary navigation">
          <a href="#research">Research</a>
          <a href="#publications">Papers</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </nav>
        <a className="nav-cta" href="/Guanyue-Qian-CV.pdf" target="_blank">View CV <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> Wireless Intelligence · 3D Vision</div>
          <h1>Making the invisible<br />world <em>computable.</em></h1>
          <p>I’m <strong>Guanyue Qian</strong>, an electrical engineering researcher at NYU building physically grounded models where wireless propagation, machine learning, and 3D reconstruction meet.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#research">Explore my research <span>↓</span></a>
            <a className="text-link" href="mailto:gq2032@nyu.edu">gq2032@nyu.edu <span>↗</span></a>
          </div>
          <div className="hero-meta" aria-label="Profile summary">
            <img src="/media/guanyue-qian.jpg" alt="Guanyue Qian" width={800} height={800} />
            <div><strong>NYU WIRELESS</strong><span>Brooklyn, New York</span></div>
            <div><strong>3.96 / 4.00</strong><span>B.S. Electrical Engineering</span></div>
          </div>
        </div>
        <div className="hero-demo" aria-label="Interactive HoRAMA point-cloud demonstration">
          <div className="demo-head"><span>HORAMA / LIVE RGB-D CLOUD</span><span className="live-dot">RECONSTRUCTING</span></div>
          <HoramaPointCloud />
        </div>
      </section>

      <section className="signal-strip" aria-label="Research focus areas">
        <span>01</span><strong>Wireless Ray Tracing</strong><i />
        <span>02</span><strong>Generative Models</strong><i />
        <span>03</span><strong>Machine Perception</strong>
      </section>

      <section className="section-shell research-section" id="research">
        <div className="section-heading reveal">
          <p className="section-kicker">SELECTED RESEARCH · 2025—PRESENT</p>
          <h2>Digital twins that<br />understand the real world.</h2>
          <p className="section-intro">My work connects machine perception to physical simulation—turning real spaces into models that can predict, optimize, and generate wireless channels.</p>
        </div>

        <article className="feature-card feature-horama reveal">
          <div className="feature-copy">
            <div className="project-topline"><span>01</span><span>HoRAMA · Vision + Wireless</span></div>
            <h3>From a phone scan to a radio-ready digital twin.</h3>
            <p>HoRAMA combines dense SLAM, semantic segmentation, and vision-language material assignment to build ray-tracing scenes in hours instead of months.</p>
            <div className="metric-row">
              <div><strong>10 min</strong><span>smartphone capture</span></div>
              <div><strong>4–6 cm</strong><span>planar accuracy</span></div>
              <div><strong>2.3 / 3.8 dB</strong><span>PL RMSE at 6.75 / 16.95 GHz</span></div>
            </div>
            <div className="feature-links"><a className="project-link" href="/research/horama/">Explore the project <span>→</span></a><a className="project-paper-link" href="https://ieeexplore.ieee.org/document/11587993" target="_blank" rel="noreferrer">ICC paper ↗</a></div>
          </div>
          <div className="feature-visual">
            <img src="/media/horama-pipeline.jpg" alt="HoRAMA pipeline from RGB-D capture to channel validation" width={1900} height={1081} />
            <div className="image-caption"><span>RGB-D → MATERIAL-AWARE 3D → RAY TRACING</span><span>NYU MAKERSPACE</span></div>
          </div>
        </article>

        <div className="project-grid">
          <article className="project-card project-neural reveal">
            <div className="project-topline"><span>02</span><span>Generative Geometry · In Progress</span></div>
            <h3>Diffusion models for what cameras cannot see.</h3>
            <p>A visibility-aware generative system completes missing walls and structures while preserving the geometry needed for downstream ray tracing.</p>
            <a className="card-detail-link" href="/research/geometry-completion/">View project <span>→</span></a>
            <NeuralField />
          </article>
          <article className="project-card project-pdp reveal">
            <div className="project-topline"><span>03</span><span>RT-Anchored PDP Diffusion</span></div>
            <h3>Generate the residual,<br />keep the physics.</h3>
            <p>A leakage-controlled diffusion framework corrects calibrated ray-traced power-delay profiles across seven bands and five scenes.</p>
            <div className="pdp-metric"><strong>57%</strong><span>reduction in masked PDP RMSE<br />23.09 → 9.94 dB</span></div>
            <a className="card-detail-link" href="/research/pdp-diffusion/">View project <span>→</span></a>
            <img src="/media/pdp-rays.jpg" alt="Top-down ray-tracing paths in an indoor environment" width={615} height={1200} />
          </article>
          <article className="project-card project-nyuray reveal">
            <div className="project-topline"><span>04</span><span>NYURay · Calibration + RIS</span></div>
            <h3>Site-specific radio intelligence.</h3>
            <p>SPARC learns sparse path corrections; PRIMO jointly optimizes precoding, RIS phase, and placement without training.</p>
            <div className="dual-metrics"><div><strong>18.74 → 4.74</strong><span>dB path-power RMSE</span></div><div><strong>≈100×</strong><span>faster optimization</span></div></div>
            <a className="card-detail-link" href="/research/nyuray-intelligence/">View project <span>→</span></a>
            <img src="/media/rt-scene.jpg" alt="Top-down NYU office ray-tracing scene" width={1800} height={904} />
          </article>
          <article className="project-card project-radar reveal">
            <div className="project-topline"><span>05</span><span>4D Point Splatting · Cornell Tech</span></div>
            <h3>Differentiable radar rendering from monocular video.</h3>
            <p>A renderer that fits scattering parameters and per-joint velocities to measured 77 GHz MIMO radar returns through gradient descent.</p>
            <div className="radar-chart" aria-label="Doppler centroid correlation improved from 0.647 to 0.784">
              <div><span>Baseline</span><i style={{ "--score": ".647" } as CSSProperties} /><b>0.647</b></div>
              <div><span>Ours</span><i style={{ "--score": ".784" } as CSSProperties} /><b>0.784</b></div>
            </div>
            <a className="card-detail-link" href="/research/radar-splatting/">View project <span>→</span></a>
            <small>DOPPLER-CENTROID CORRELATION · HELD-OUT HUPR</small>
          </article>
        </div>
      </section>

      <section className="film-section reveal" aria-labelledby="fieldwork-title">
        <div className="film-copy">
          <p className="section-kicker">FIELDWORK · FR1 MEASUREMENT</p>
          <h2 id="fieldwork-title">Measure first.<br />Model second.</h2>
          <p>I conduct 3.7 GHz campaigns across outdoor, indoor, and factory environments using a wideband sliding-correlator channel sounder.</p>
        </div>
        <div className="film-frame">
          <video controls muted loop playsInline preload="metadata"><source src="/media/fr1-measurement.mp4" type="video/mp4" /></video>
          <div className="film-label"><span>NYU 3.7 GHz MEASUREMENT CAMPAIGN</span><span>2026 · NEW YORK</span></div>
        </div>
      </section>

      <section className="publications-section" id="publications">
        <div className="section-shell">
          <div className="publications-head reveal">
            <div><p className="section-kicker light">PUBLICATIONS</p><h2>Research,<br />in print.</h2></div>
            <div className="pub-summary"><strong>9</strong><span>journal, conference,<br />and magazine articles</span><a href="https://scholar.google.com/citations?hl=en&user=ZR0V8iQAAAAJ" target="_blank" rel="noreferrer">Google Scholar ↗</a></div>
          </div>
          <div className="publication-list">
            {publications.map((paper) => {
              const content = <><span className="pub-index">{paper.index}</span><div className="pub-main"><h3>{paper.title}</h3><p>{paper.venue}</p></div><div className="pub-meta"><span>{paper.status}</span><strong>{paper.year}</strong></div><span className="pub-arrow">{paper.href ? "↗" : "·"}</span></>;
              return paper.href ? <a className="publication reveal" href={paper.href} target="_blank" rel="noreferrer" key={paper.index}>{content}</a> : <div className="publication reveal" key={paper.index}>{content}</div>;
            })}
          </div>
          <a className="all-papers-link" href="/Guanyue-Qian-CV.pdf" target="_blank">View full publication list in CV <span>↗</span></a>
        </div>
      </section>

      <section className="section-shell experience-section" id="experience">
        <div className="experience-title reveal"><p className="section-kicker">EDUCATION + EXPERIENCE</p><h2>Built across<br />disciplines.</h2></div>
        <div className="timeline">
          <article className="timeline-item reveal"><div className="timeline-date">2023—2027</div><div><span className="timeline-type">EDUCATION</span><h3>New York University</h3><p>B.S. in Electrical Engineering · GPA 3.96/4.00</p><div className="tag-list"><span>Stolze Award</span><span>Tau Beta Pi</span><span>Dean’s List</span><span>Rappaport Scholarship</span></div></div></article>
          <article className="timeline-item reveal"><div className="timeline-date">2025—2026</div><div><span className="timeline-type">TEACHING</span><h3>Teaching Assistant · NYU MakerSpace</h3><p>Fabrication and prototyping workshops spanning 3D printing, laser cutting, water-jet machining, and interdisciplinary design.</p></div></article>
          <article className="timeline-item reveal"><div className="timeline-date">2024</div><div><span className="timeline-type">ENGINEERING</span><h3>Assistant Baseband Engineer · Quectel</h3><p>Designed schematics, 13-layer PCB layouts, and automotive test hardware for 5G IoT modules.</p></div></article>
          <article className="timeline-item reveal"><div className="timeline-date">2020—NOW</div><div><span className="timeline-type">LEADERSHIP</span><h3>Robotics Design Lead + Coach</h3><p>Led CAD, electronics, controls, fabrication, and match strategy for FRC and RoboMaster teams in Shanghai and New York.</p></div></article>
        </div>
        <div className="skills-band reveal"><span>PYTHON</span><span>PYTORCH</span><span>CUDA</span><span>MATLAB</span><span>C++</span><span>BLENDER</span><span>CADENCE</span><span>SOLIDWORKS</span></div>
      </section>

      <section className="about-section" id="about">
        <div className="about-grid">
          <div className="about-copy reveal"><p className="section-kicker light">BEYOND THE LAB</p><h2>Curiosity is<br />a field practice.</h2><p>I build robots, photograph places, and carry research questions into the world. The same habit connects them: notice the structure, then make it tangible.</p><div className="about-links"><a href="https://www.linkedin.com/in/guanyue-qian/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="mailto:gq2032@nyu.edu">Email ↗</a></div></div>
          <figure className="photo photo-one reveal"><img src="/media/travel-road.jpg" alt="Guanyue on a mountain road in Europe" width={1800} height={1200} /><figcaption>FIELD NOTES · EUROPE, 2026</figcaption></figure>
          <figure className="photo photo-two reveal"><img src="/media/travel-snow.jpg" alt="Guanyue in a snowy mountain landscape" width={1017} height={1400} /><figcaption>BETWEEN CONFERENCES</figcaption></figure>
          <figure className="photo photo-three reveal"><img src="/media/travel-drone.jpg" alt="Guanyue carrying a drone at dusk in the mountains" width={1800} height={1200} /><figcaption>AERIAL PERCEPTION</figcaption></figure>
        </div>
      </section>

      <footer>
        <div><p className="section-kicker light">LET’S CONNECT</p><h2>Questions worth<br />building toward.</h2></div>
        <div className="footer-right"><a href="mailto:gq2032@nyu.edu">gq2032@nyu.edu <span>↗</span></a><p>NYU WIRELESS<br />370 Jay St, Brooklyn, NY</p></div>
        <div className="footer-bottom"><span>© 2026 Guanyue Qian</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
