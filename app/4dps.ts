import type { ResearchProject } from "./projects";

export const radarSplattingProject: ResearchProject = {
    slug: "radar-splatting",
    index: "02",
    kicker: "4D POINT SPLATTING",
    title: "4D Point Splatting for mmWave radar micro-Doppler.",
    lede: "4DPS fits an explicit moving scene to a real radar capture, rendering raw complex returns that can be processed into any downstream radar representation. It fits moving human bodies to real radar captures, making dataset-scale inverse rendering of mmWave radar possible for the first time.",
    status: "arXiv preprint · 2026",
    period: "Jun. 2026 – Sept. 2026",
    accent: "#52d8b8",
    image: "/media/4dps-pipeline.png",
    imageAlt: "4D Point Splatting pipeline from synchronized input through inverse rendering to radar products and downstream tasks",
    metrics: [
      { value: "335", label: "fitted radar sequences" },
      { value: "0.988 / 0.966", label: "micro-Doppler correlation · HuPR / RT-Pose" },
      { value: "5.8×", label: "lower pose error vs. RF-Genesis data" },
    ],
    overview: [
      "Human radar signatures depend on articulated geometry, material scattering, surface normals, and radial velocity. 4DPS turns these physical factors into an explicit differentiable scene rather than learning a direct image-to-image translation.",
      "Synchronized cameras initialize the room and moving body. Oriented points then carry material, normal, and velocity, splatting their contributions into range and Doppler bins before producing raw complex radar returns.",
      "I developed the scene initialization and calibration pipeline, integrating monocular depth, human segmentation, and radar-guided range anchoring, which reduced range drift from 0.140 to 0.065 m on HuPR.",
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
      "A pose estimator trained only on 4DPS renders achieves 5.8× lower error on real RT-Pose data than one trained on RF-Genesis data, within 5.2 cm of real-data training without using any real training data.",
      "The renderer exposes interpretable geometry, motion, and scattering parameters while supporting simulation, inverse sensing, and synthetic-data generation.",
    ],
    tools: ["PyTorch", "CUDA", "FMCW Radar", "Inverse Rendering", "Point Splatting", "HuPR", "RT-Pose", "RAED", "Micro-Doppler"],
    gallery: [
      { src: "/media/4dps-splatting.png", alt: "Range and Doppler point splatting for differentiable radar rendering", caption: "CLOSED-FORM RANGE + DOPPLER SPLATTING" },
    ],
    links: [{ label: "Read the 4DPS paper", href: "https://arxiv.org/abs/2611.08342" }],
  };

export const radarSplattingPublication = {
    index: "C4",
    year: "2026",
    authors: "A. Armouti, <b>G. Qian</b>, and R. Nandakumar",
    title: "4D Point Splatting for mmWave Radar Micro-Doppler Differentiable Rendering",
    venue: "arXiv:2611.08342",
    status: "Preprint",
    href: "https://arxiv.org/abs/2611.08342",
  } as const;

export const radarSplattingNews = ["Nov. 2026", "4D Point Splatting for mmWave radar micro-Doppler released as an arXiv preprint."] as const;
