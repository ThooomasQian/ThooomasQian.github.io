export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectStep = {
  title: string;
  text: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ResearchProject = {
  slug: string;
  index: string;
  kicker: string;
  title: string;
  lede: string;
  status: string;
  period: string;
  accent: string;
  image?: string;
  imageAlt?: string;
  imageFit?: "contain" | "cover";
  metrics: readonly ProjectMetric[];
  overview: readonly string[];
  question: string;
  method: readonly ProjectStep[];
  outcomes: readonly string[];
  tools: readonly string[];
  gallery: readonly { src: string; alt: string; caption: string }[];
  links: readonly ProjectLink[];
};

export const projects: readonly ResearchProject[] = [
  {
    slug: "horama",
    index: "01",
    kicker: "VISION + WIRELESS",
    title: "From a phone scan to a radio-ready digital twin.",
    lede: "HoRAMA turns an RGB-D walkthrough into a material-aware 3D scene that is ready for deterministic wireless ray tracing and channel validation.",
    status: "Published · IEEE ICC",
    period: "2025—2026",
    accent: "#6d5ce7",
    image: "/media/horama-pointcloud.png",
    imageAlt: "Oblique RGB-D point cloud of the NYU MakerSpace captured for HoRAMA",
    metrics: [
      { value: "10 min", label: "smartphone capture" },
      { value: "4–6 cm", label: "planar accuracy" },
      { value: "2.3 / 3.8 dB", label: "PL RMSE at 6.75 / 16.95 GHz" },
    ],
    overview: [
      "High-fidelity ray-tracing scenes are normally built by hand. HoRAMA replaces that slow modeling loop with a pipeline that begins with a phone-scale RGB-D capture and ends with geometry, semantics, electromagnetic materials, and a simulator-ready scene.",
      "The canonical MakerSpace reconstruction contains 297 planar facets and 131 machine, clutter, duct, and column proxies. It is evaluated against twelve measured TX–RX links and an expert hand-built reference at two upper-mid-band frequencies.",
    ],
    question: "Can an automatically reconstructed scene preserve the geometry and materials that matter to radio propagation—without months of manual CAD work?",
    method: [
      { title: "Capture", text: "Fuse RGB-D video and SLAM poses into a dense 2.03-million-point scan of the operating space." },
      { title: "Understand", text: "Lift semantic labels into 3D and consolidate them into seven radio-relevant macro classes." },
      { title: "Reconstruct", text: "Fit and regularize planes, openings, columns, ducts, and object proxies into a compact scene." },
      { title: "Assign materials", text: "Map visual semantics to frequency-dependent ITU-R electromagnetic material models." },
      { title: "Validate", text: "Calibrate scattering and compare simulated path loss, delay, and angular structure with measurements." },
    ],
    outcomes: [
      "Automated path-loss accuracy reaches 2.26 dB at 6.75 GHz and 3.84 dB at 16.95 GHz.",
      "The workflow supports downstream coverage, beam-management, and robotic sensing studies from the same digital twin.",
      "A held-out 3.7 GHz campaign tests the frozen reconstruction and calibration procedure under a reconfigured hall layout.",
    ],
    tools: ["RGB-D", "SLAM", "LabelMaker", "RANSAC", "Sionna RT", "NYURay", "Mitsuba", "ITU-R P.2040"],
    gallery: [
      { src: "/media/horama-pipeline.jpg", alt: "HoRAMA reconstruction and wireless validation pipeline", caption: "END-TO-END PIPELINE · CAPTURE → RECONSTRUCTION → CHANNEL VALIDATION" },
      { src: "/media/horama-reconstruction.jpg", alt: "Material-aware HoRAMA reconstruction", caption: "SEMANTIC GEOMETRY · MATERIAL-AWARE DIGITAL TWIN" },
    ],
    links: [{ label: "Read the ICC paper", href: "https://ieeexplore.ieee.org/document/11587993" }],
  },
  {
    slug: "geometry-completion",
    index: "02",
    kicker: "GENERATIVE GEOMETRY",
    title: "Complete what the camera cannot see.",
    lede: "A visibility-aware, ray-anchored completion system recovers occluded objects and persistent walls while treating measured free space as a hard physical constraint.",
    status: "Research in progress",
    period: "2026—PRESENT",
    accent: "#20bfae",
    metrics: [
      { value: "0.741", label: "cross-domain object F1" },
      { value: "3.09 cm", label: "object Chamfer distance" },
      { value: "0", label: "known-free violations" },
    ],
    overview: [
      "A phone scan only observes surfaces visible from its route. Occluded wall spans and the backs of machines remain absent, even though those missing surfaces can change line-of-sight decisions and multipath structure.",
      "This project represents observation, ray-carved free space, uncertainty, and geometry priors explicitly. It uses different models for different geometry: stochastic 3D diffusion for object completion and a constrained plane-local U-Net for structural surfaces.",
    ],
    question: "How can a generative model add useful geometry while guaranteeing that it never fills space a measured camera ray proved was empty?",
    method: [
      { title: "Encode visibility", text: "Build seven-channel metric tensors containing observed surfaces, known free space, unknown regions, priors, and coordinates." },
      { title: "Anchor every step", text: "Project measured occupied and ray-carved free voxels back to their fixed values throughout reverse diffusion." },
      { title: "Separate structures", text: "Use plane-local models for walls and floors so openings are not erased by an object prior." },
      { title: "Test domain shift", text: "Train on InH geometry, select only on InH validation, and evaluate once on untouched InF objects and layouts." },
      { title: "Bridge to RT", text: "Append only newly completed metric points before HoRAMA facet construction, retaining the measured prefix exactly." },
    ],
    outcomes: [
      "Cross-domain diffusion improves mean per-frame F1 by 0.0509 over the deterministic U-Net and reduces Chamfer distance by 3.27 cm.",
      "For structural walls, the constrained U-Net reaches 0.9969 F1; the plane-diffusion alternative is retained as a documented negative result.",
      "End-to-end replay checks whether geometric additions improve channel prediction rather than geometry metrics alone.",
    ],
    tools: ["PyTorch", "3D Diffusion", "3D U-Net", "RGB-D", "Ray Carving", "Voxel Grids", "Sionna RT", "Blender"],
    gallery: [
      { src: "/media/geometry-wall-completion.png", alt: "Conservative wall additions on a real HoRAMA MakerSpace scan", caption: "REAL MAKERSPACE · CONSERVATIVE PERSISTENT-WALL COMPLETION" },
      { src: "/media/diffusion-completion.jpg", alt: "Visibility-aware geometry completion visualization", caption: "OBSERVED + KNOWN FREE + GENERATED GEOMETRY" },
    ],
    links: [],
  },
  {
    slug: "pdp-diffusion",
    index: "03",
    kicker: "RT-ANCHORED PDP DIFFUSION",
    title: "Generate the residual. Keep the physics.",
    lede: "A leakage-controlled conditional diffusion framework corrects ray-traced power-delay profiles while retaining site geometry, absolute delay, and frequency context.",
    status: "Under review · IEEE T-WC",
    period: "2026",
    accent: "#8a78ff",
    image: "/media/pdp-rays.jpg",
    imageAlt: "Ray paths through a reconstructed indoor scene used as a physical PDP anchor",
    imageFit: "cover",
    metrics: [
      { value: "401", label: "quality-gated links" },
      { value: "7 bands", label: "3.7–142 GHz" },
      { value: "57%", label: "masked PDP RMSE reduction" },
    ],
    overview: [
      "Deterministic ray tracing supplies the correct scene-conditioned skeleton of a channel, but material uncertainty and finite geometric fidelity leave structured residual errors. A learned model is most useful when it corrects those residuals rather than replacing the simulator.",
      "The evaluation spans five scenes and seven bands, with link, frequency, site, and scenario splits designed to expose data leakage and test how site-specific the generated correction truly is.",
    ],
    question: "Can a generative model improve channel realism without learning a shortcut from the same link, site, or frequency it will later be scored on?",
    method: [
      { title: "Build the anchor", text: "Calibrate a deterministic ray-traced PDP and preserve its path timing and site-specific support." },
      { title: "Learn the residual", text: "Condition a 1-D U-Net v-diffusion model on the RT anchor, link geometry, band, and environment." },
      { title: "Control leakage", text: "Train and score under within-pair, cross-frequency, cross-site, and cross-scenario protocols." },
      { title: "Evaluate realism", text: "Measure masked RMSE, delay statistics, texture, pooled distributions, and site-identifiability—not one scalar alone." },
      { title: "Stress extrapolation", text: "Hold out the 3.7 GHz band and test downward frequency extrapolation from the frozen training corpus." },
    ],
    outcomes: [
      "Masked PDP RMSE falls from 23.09 to 9.94 dB across three seeds; 97.6% of quality-gated links improve.",
      "At held-out 3.7 GHz, error falls from 30.0 to 10.9 dB under downward band extrapolation.",
      "Geometry-swap and site-specificity probes separate genuine environmental conditioning from distribution matching.",
    ],
    tools: ["PyTorch", "1-D U-Net", "v-Diffusion", "Sionna RT", "NYUSIM", "PDP", "Cross-Site Evaluation"],
    gallery: [
      { src: "/media/pdp-rays.jpg", alt: "Indoor ray-tracing paths used as physical anchors", caption: "SITE-SPECIFIC RAY TRACING · PHYSICAL ANCHOR" },
      { src: "/media/pdp-scene-rays.png", alt: "Ray paths through a reconstructed indoor scene", caption: "ABSOLUTE PATH DELAY · GEOMETRY-CONDITIONED SUPPORT" },
    ],
    links: [],
  },
  {
    slug: "nyuray-intelligence",
    index: "04",
    kicker: "CALIBRATION + RIS",
    title: "Site-specific radio intelligence.",
    lede: "Two linked research threads make deterministic propagation models more useful: sparse learned calibration for path power, and fast joint optimization of beams, RIS phase, and deployment.",
    status: "Journal + conference research",
    period: "2025—2026",
    accent: "#e0a62f",
    image: "/media/nyuray-office.png",
    imageAlt: "Top-down NYURay model of the 2 MetroTech ninth-floor office",
    metrics: [
      { value: "18.74 → 4.74", label: "dB path-power RMSE" },
      { value: "≈100×", label: "faster joint optimization" },
      { value: "273", label: "ITU-tagged scene meshes" },
    ],
    overview: [
      "Site-specific simulators predict individual paths, not just aggregate fading statistics. Their value depends on accurate material, antenna, and location calibration—and on algorithms that can act on the resulting channel efficiently.",
      "SPARC learns sparse path-aware residual corrections to measured multipath components. A complementary RIS project uses the simulator as a differentiable decision surface for outdoor-to-indoor coverage design.",
    ],
    question: "How can a detailed ray tracer be calibrated with limited measurements and then used inside an optimization loop without making the loop prohibitively slow?",
    method: [
      { title: "Align paths", text: "Match simulated and measured multipath components using delay, power, and geometric identity." },
      { title: "Learn sparse corrections", text: "Predict only the residual adjustments needed for path powers while keeping ray geometry intact." },
      { title: "Validate by location", text: "Hold out measurement locations so calibration accuracy reflects spatial generalization." },
      { title: "Factor the RIS problem", text: "Jointly optimize precoding, RIS phases, and placement using structured site-specific channel evaluations." },
      { title: "Measure operational gain", text: "Report both prediction error and end-task coverage/optimization speed." },
    ],
    outcomes: [
      "Sparse residual calibration reduces path-power RMSE from 18.74 to 4.74 dB while preserving interpretable ray paths.",
      "The RIS workflow reaches roughly two orders of magnitude faster optimization than a brute-force site search.",
      "The same scene representation supports calibration, coverage analysis, beam studies, and generative-channel anchors.",
    ],
    tools: ["NYURay", "Sionna RT", "Sparse Learning", "RIS", "Beamforming", "Mitsuba", "Site-Specific Channels"],
    gallery: [
      { src: "/media/rt-scene.jpg", alt: "Ray-tracing scene and propagation paths", caption: "SCENE-SPECIFIC GEOMETRY · CALIBRATED MULTIPATH" },
    ],
    links: [{ label: "Read the calibration paper", href: "https://www.nature.com/articles/s44459-025-00014-x" }],
  },
  {
    slug: "radar-splatting",
    index: "05",
    kicker: "4D POINT SPLATTING",
    title: "Differentiable radar rendering from monocular video.",
    lede: "A differentiable renderer converts articulated motion from monocular video into 77 GHz MIMO radar returns, then fits scattering and velocity parameters directly to measurements.",
    status: "Cornell Tech research project",
    period: "2025",
    accent: "#52d8b8",
    metrics: [
      { value: "77 GHz", label: "MIMO radar" },
      { value: "0.784", label: "Doppler-centroid correlation" },
      { value: "+21%", label: "relative correlation gain" },
    ],
    overview: [
      "Human radar signatures are shaped by pose, articulation, surface scattering, and radial velocity. Forward simulation usually hides those factors behind a non-differentiable renderer or requires a dedicated 3D capture setup.",
      "This project begins with monocular video, represents the moving subject as time-varying point splats, and makes the radar formation model differentiable so physical parameters can be fitted to measured range-Doppler returns.",
    ],
    question: "Can ordinary video provide enough motion structure to synthesize and optimize physically meaningful radar signatures?",
    method: [
      { title: "Recover motion", text: "Estimate articulated pose and joint trajectories from a synchronized monocular video sequence." },
      { title: "Build 4D splats", text: "Attach position, reflectivity, extent, and time-varying velocity to a differentiable point representation." },
      { title: "Render radar", text: "Accumulate range, angle, and Doppler contributions under a 77 GHz MIMO sensing model." },
      { title: "Fit parameters", text: "Optimize scattering coefficients and per-joint velocities by gradient descent against measured returns." },
      { title: "Evaluate motion fidelity", text: "Compare Doppler centroids and temporal signatures on held-out HuPR sequences." },
    ],
    outcomes: [
      "Doppler-centroid correlation improves from 0.647 to 0.784 on held-out data.",
      "The representation exposes which body parts and velocities contribute to a measured radar signature.",
      "The same differentiable setup can support simulation, data augmentation, and inverse sensing studies.",
    ],
    tools: ["PyTorch", "Differentiable Rendering", "Point Splatting", "77 GHz Radar", "Computer Vision", "Gradient Descent"],
    gallery: [],
    links: [],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
