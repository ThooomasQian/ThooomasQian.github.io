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

const projectRecords: readonly ResearchProject[] = [
  {
    slug: "horama",
    index: "01",
    kicker: "VISION + WIRELESS",
    title: "From a phone scan to a radio-ready digital twin.",
    lede: "HoRAMA is an automated framework that turns an RGB-D walkthrough into a ray-tracing-ready 3D model with electromagnetic material labels, reducing scene construction from months to hours.",
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
      "High-fidelity ray-tracing scenes are usually assembled by hand. HoRAMA replaces that workflow with phone-scale RGB-D capture, SLAM reconstruction, point-level semantic understanding, and vision-language material assignment.",
      "The 700 m² NYU MakerSpace reconstruction is evaluated with NYURay against twelve measured TX–RX links at 6.75 and 16.95 GHz. Its channel accuracy is comparable to an expert hand-built reference while requiring a fraction of the modeling time.",
    ],
    question: "Can an automatically reconstructed scene preserve the geometry and materials that matter to radio propagation—without months of manual CAD work?",
    method: [
      { title: "Capture", text: "Fuse RGB-D video and MASt3R-SLAM poses into a dense point-cloud model of the operating space." },
      { title: "Understand", text: "Use PTv3 semantic segmentation to organize the scan into radio-relevant surface and object classes." },
      { title: "Reconstruct", text: "Fit and regularize planes, openings, columns, ducts, and object proxies into a compact scene." },
      { title: "Assign materials", text: "Use Qwen3-VL-assisted labeling to map visual semantics to frequency-dependent ITU-R electromagnetic material models." },
      { title: "Validate", text: "Calibrate scattering and compare simulated path loss, delay, and angular structure with measurements." },
    ],
    outcomes: [
      "Automated path-loss accuracy reaches 2.26 dB at 6.75 GHz and 3.84 dB at 16.95 GHz.",
      "The workflow supports downstream coverage, beam-management, and robotic sensing studies from the same digital twin.",
      "A held-out 3.7 GHz campaign tests the frozen reconstruction and calibration procedure under a reconfigured hall layout.",
    ],
    tools: ["RGB-D", "MASt3R-SLAM", "PTv3", "Qwen3-VL", "RANSAC", "NYURay", "Mitsuba", "ITU-R P.2040"],
    gallery: [
      { src: "/media/horama-pipeline.jpg", alt: "HoRAMA reconstruction and wireless validation pipeline", caption: "END-TO-END PIPELINE · CAPTURE → RECONSTRUCTION → CHANNEL VALIDATION" },
      { src: "/media/horama-reconstruction.jpg", alt: "Material-aware HoRAMA reconstruction", caption: "SEMANTIC GEOMETRY · MATERIAL-AWARE DIGITAL TWIN" },
    ],
    links: [{ label: "Read the ICC paper", href: "https://arxiv.org/abs/2602.12942" }],
  },
  {
    slug: "horama-l",
    index: "03",
    kicker: "LIGHTWEIGHT DIGITAL TWINS",
    title: "From a two-minute walk-through to an RT-ready mesh.",
    lede: "HoRAMA-L combines RGB-D geometry, architectural completion, vision-language retrieval, and reusable or generated assets to reconstruct a material-aware indoor factory in 40 minutes.",
    status: "Submitted · IEEE WCNC 2027",
    period: "2026—2027",
    accent: "#5a6fe8",
    image: "/media/horama-l-reconstruction.png",
    imageAlt: "Top and interior views comparing the original HoRAMA reconstruction with HoRAMA-L",
    metrics: [
      { value: "2 min", label: "smartphone walk-through" },
      { value: "40 min", label: "RT-ready reconstruction" },
      { value: "3.83 / 3.38 dB", label: "PL RMSE at 6.75 / 16.95 GHz" },
    ],
    overview: [
      "HoRAMA-L reconstructs a simulation-ready indoor environment from a brief RGB-D walk-through. It recovers continuous wall, floor, and ceiling structure; identifies furniture; and replaces incomplete point fragments with reusable or generated object meshes.",
      "The 700-square-meter NYU MakerSpace study uses the same 259 input frames as HoRAMA and validates the reconstructed scene against twelve measured TX–RX links at 6.75 and 16.95 GHz under identical NYURay settings.",
    ],
    question: "Can a brief phone scan produce a compact, complete, and materially plausible digital twin whose radio predictions approach those of a hand-built CAD model?",
    method: [
      { title: "Capture briefly", text: "Record a two-minute RGB-D walk-through with camera poses and LiDAR depth instead of a detailed ten-minute scan." },
      { title: "Complete architecture", text: "Segment wall, floor, and ceiling surfaces, consolidate fragmented observations, and recover continuous room structure." },
      { title: "Identify and retrieve", text: "Use vision-language reasoning to identify furniture and retrieve compatible reusable 3D assets." },
      { title: "Generate missing assets", text: "Create approximate Blender models when no library match exists, using source images and depth-derived dimensions." },
      { title: "Validate by radio", text: "Assign electromagnetic materials and compare NYURay path loss, delay spread, and angular spreads with field measurements." },
    ],
    outcomes: [
      "The 450,141-triangle mesh is 88.9% smaller than HoRAMA and processes the same 259 frames 4.5 times faster.",
      "At 0.25 m tolerance, reference wall coverage rises from 38.2% to 68.7% and reconstruction agreement from 36.2% to 75.8%.",
      "Path-loss RMSE reaches 3.83 and 3.38 dB, while delay-spread RMSE reaches 8.73 and 9.11 ns at 6.75 and 16.95 GHz.",
    ],
    tools: ["RGB-D", "LiDAR", "ARKit", "SegFormer", "Vision-Language Models", "LLMs", "Blender", "NYURay", "Mitsuba", "ITU-R P.2040"],
    gallery: [
      { src: "/media/horama-l-wall-coverage.png", alt: "Wall coverage versus distance tolerance for HoRAMA and HoRAMA-L", caption: "WALL COVERAGE · HANDCRAFTED REFERENCE" },
      { src: "/media/horama-l-path-loss.png", alt: "Measured and simulated path loss at 6.75 and 16.95 GHz", caption: "PATH LOSS · 12 LINKS PER BAND" },
      { src: "/media/horama-l-spread-cdf.png", alt: "Delay and angular spread distributions at 6.75 and 16.95 GHz", caption: "DELAY + ANGULAR SPREAD · DUAL-BAND VALIDATION" },
    ],
    links: [],
  },
  {
    slug: "geometry-completion",
    index: "04",
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
    index: "05",
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
    index: "06",
    kicker: "CALIBRATION + RIS",
    title: "Site-specific radio intelligence.",
    lede: "NYURay, SPARC, and PRIMO connect calibrated site-specific ray tracing with sparse learned path correction and fast RIS-assisted coverage optimization.",
    status: "Journal + conference research",
    period: "2025—2026",
    accent: "#e0a62f",
    image: "/media/nyuray-primo-scenario.png",
    imageAlt: "PRIMO ray-traced MetroTech Commons scenario with base station, RIS candidates, and indoor users",
    metrics: [
      { value: "18.74 → 4.74", label: "dB path-power RMSE" },
      { value: "≈100×", label: "faster joint optimization" },
      { value: "273", label: "ITU-tagged scene meshes" },
    ],
    overview: [
      "NYURay is a Python ray tracer for upper-mid-band channel prediction that models reflection, diffraction, penetration, and scattering. Its GPU pipeline traces one million rays in roughly 3–5 seconds per TX–RX pair and supports 3D antenna patterns and site-specific placement.",
      "SPARC corrects per-path power errors from a small measurement set while retaining physical ray geometry. PRIMO then uses dual-band FR1(C)/FR3 ray-traced channels to jointly optimize base-station precoding, RIS phase shifts, and RIS placement for outdoor-to-indoor coverage.",
    ],
    question: "How can a detailed ray tracer be calibrated with limited measurements and then used inside an optimization loop without making the loop prohibitively slow?",
    method: [
      { title: "Calibrate location", text: "Align simulated and measured power-delay profiles before matching multipath components by delay, power, and geometric identity." },
      { title: "Learn sparse corrections", text: "Predict only the residual adjustments needed for path powers while keeping ray geometry intact." },
      { title: "Validate by location", text: "Hold out measurement locations so calibration accuracy reflects spatial generalization." },
      { title: "Factor the RIS problem", text: "Jointly optimize base-station precoding, RIS phase shifts, and deployment position using GPU-parallel site-specific channel evaluations." },
      { title: "Measure operational gain", text: "Report both prediction error and end-task coverage/optimization speed." },
    ],
    outcomes: [
      "Sparse residual calibration reduces path-power RMSE from 18.74 to 4.74 dB while preserving interpretable ray paths.",
      "The RIS workflow reaches roughly two orders of magnitude faster optimization than a brute-force site search.",
      "The same scene representation supports calibration, coverage analysis, beam studies, and generative-channel anchors.",
    ],
    tools: ["NYURay", "GPU Ray Tracing", "SPARC", "Sparse Learning", "PRIMO", "RIS", "Beamforming", "Site-Specific Channels"],
    gallery: [
      { src: "/media/nyuray-primo-system.png", alt: "PRIMO outdoor-to-indoor RIS-assisted system model", caption: "PRIMO · OUTDOOR-TO-INDOOR RIS SYSTEM" },
      { src: "/media/nyuray-sparc-results.svg", alt: "SPARC per-path calibration RMSE and empirical distribution results", caption: "SPARC · PER-PATH CALIBRATION RESULTS" },
    ],
    links: [
      { label: "Read the calibration paper", href: "https://www.nature.com/articles/s44459-025-00014-x" },
      { label: "Read SPARC", href: "https://arxiv.org/abs/2609.06077" },
      { label: "Read PRIMO", href: "https://arxiv.org/abs/2610.03887" },
    ],
  },
  {
    slug: "radar-splatting",
    index: "02",
    kicker: "4D POINT SPLATTING",
    title: "4D Point Splatting for mmWave radar micro-Doppler.",
    lede: "4DPS fits an explicit moving scene to a real radar capture, rendering raw complex returns that can be processed into any downstream radar representation.",
    status: "Under review · ICLR 2027",
    period: "2026—2027",
    accent: "#52d8b8",
    image: "/media/4dps-pipeline.png",
    imageAlt: "4D Point Splatting pipeline from synchronized input through inverse rendering to radar products and downstream tasks",
    metrics: [
      { value: "335", label: "fitted radar sequences" },
      { value: "0.988 / 0.966", label: "micro-Doppler correlation · HuPR / RT-Pose" },
      { value: "21.9 cm", label: "RT-Pose MPJPE · synthetic-only training" },
    ],
    overview: [
      "Human radar signatures depend on articulated geometry, material scattering, surface normals, and radial velocity. 4DPS turns these physical factors into an explicit differentiable scene rather than learning a direct image-to-image translation.",
      "Synchronized cameras initialize the room and moving body. Oriented points then carry material, normal, and velocity, splatting their contributions into range and Doppler bins before producing raw complex radar returns.",
    ],
    question: "Can inverse rendering recover a compact moving scene that reproduces real micro-Doppler signatures and transfers to downstream perception?",
    method: [
      { title: "Initialize the scene", text: "Use synchronized camera observations to reconstruct static room geometry and time-varying human motion." },
      { title: "Build oriented splats", text: "Attach material, normal, position, and velocity to explicit 4D points for both body and environment." },
      { title: "Splat range and Doppler", text: "Use closed-form range and Doppler kernels to accumulate differentiable complex returns." },
      { title: "Fit to real captures", text: "Optimize physical scene parameters by gradient descent over 235 HuPR and 100 RT-Pose sequences." },
      { title: "Reuse the raw signal", text: "Apply the standard DSP chain to produce ADC, CRP, RA, RD, RAE, or micro-Doppler representations." },
    ],
    outcomes: [
      "Median micro-Doppler correlation reaches 0.988 on HuPR and 0.966 on RT-Pose; range–azimuth correlation reaches 0.940 and 0.830.",
      "A pose estimator trained only on 4DPS renders reaches 21.9 cm MPJPE on real RT-Pose data, compared with 16.7 cm for real-data training.",
      "The renderer exposes interpretable geometry, motion, and scattering parameters while supporting simulation, inverse sensing, and synthetic-data generation.",
    ],
    tools: ["PyTorch", "CUDA", "FMCW Radar", "Inverse Rendering", "Point Splatting", "HuPR", "RT-Pose", "RAED", "Micro-Doppler"],
    gallery: [
      { src: "/media/4dps-splatting.png", alt: "Range and Doppler point splatting for differentiable radar rendering", caption: "CLOSED-FORM RANGE + DOPPLER SPLATTING" },
    ],
    links: [{ label: "Read the 4DPS paper", href: "https://arxiv.org/abs/2611.08342" }],
  },
];

export const projects: readonly ResearchProject[] = [
  "horama",
  "radar-splatting",
  "horama-l",
  "nyuray-intelligence",
].map((slug) => {
  const project = projectRecords.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing project record: ${slug}`);
  return project;
});

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
