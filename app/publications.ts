type Publication = {
  index: string;
  year: string;
  title: string;
  venue: string;
  status: string;
  href?: string;
};

export const publications: readonly Publication[] = [
  {
    index: "C1",
    year: "2027",
    title: "4D Point Splatting for mmWave Radar Micro-Doppler Differentiable Rendering",
    venue: "International Conference on Learning Representations (ICLR)",
    status: "Under review",
    href: "https://arxiv.org/abs/2611.08342",
  },
  {
    index: "C2",
    year: "2027",
    title: "Impact of Geometric Fidelity on Wireless Channel Prediction Using Site-Specific Ray Tracing in an Indoor Factory at Upper Mid-Band",
    venue: "European Conference on Antennas and Propagation (EuCAP)",
    status: "Submitted",
  },
  {
    index: "C3",
    year: "2027",
    title: "HoRAMA-L: Lightweight Holistic Reconstruction of 3D Indoor Environments With Automated Material Assignment for Wireless Ray Tracing",
    venue: "IEEE Wireless Communications and Networking Conference (WCNC)",
    status: "Submitted",
  },
  {
    index: "C4",
    year: "2027",
    title: "Wideband Indoor Hotspot Propagation Measurements and Channel Models at 3.7 GHz for 5G/6G FR1 Deployments",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Submitted",
  },
  {
    index: "C5",
    year: "2027",
    title: "Wideband Outdoor Urban Microcell Propagation Measurements and Channel Models at 3.7 GHz for 5G/6G FR1 Deployments",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Submitted",
  },
  {
    index: "C6",
    year: "2027",
    title: "Path Loss, Delay Spread, and Angular Spread from Wideband Indoor Factory Measurements at 3.7 GHz",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Submitted",
  },
  {
    index: "C7",
    year: "2027",
    title: "Joint Calibration of the 3GPP Urban Microcell Channel Model Using Measurements at 6.75, 16.95, 28, 73 and 142 GHz",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Submitted",
  },
  {
    index: "J1",
    year: "2026",
    title: "Site-Specific Location Calibration and Validation of Ray-Tracing Simulator NYURay at Upper Mid-Band Frequencies",
    venue: "npj Wireless Technology · Vol. 2, Article 8",
    status: "Journal",
    href: "https://www.nature.com/articles/s44459-025-00014-x",
  },
  {
    index: "C8",
    year: "2026",
    title: "Joint Beamforming and RIS Deployment Optimization for Outdoor-to-Indoor Coverage at Upper Mid-Band: A Dual-Band Ray-Tracing Study",
    venue: "Asilomar Conference on Signals, Systems, and Computers",
    status: "Accepted",
    href: "https://arxiv.org/abs/2610.03887",
  },
  {
    index: "C9",
    year: "2026",
    title: "SPARC: Sparse Path-Aware Residual Calibrator for Wireless Ray Tracing at Upper Mid-Band",
    venue: "IEEE Global Communications Conference (GLOBECOM)",
    status: "Accepted",
    href: "https://arxiv.org/abs/2609.06077",
  },
  {
    index: "C10",
    year: "2026",
    title: "Robust Hybrid Beamforming with Liquid Crystal Antennas and Liquid Neural Networks",
    venue: "IEEE 103rd Vehicular Technology Conference",
    status: "Conference",
    href: "https://arxiv.org/abs/2604.07219",
  },
  {
    index: "C11",
    year: "2026",
    title: "HoRAMA: Holistic Reconstruction with Automated Material Assignment for Ray Tracing using NYURay",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Conference",
    href: "https://arxiv.org/abs/2602.12942",
  },
  {
    index: "C12",
    year: "2026",
    title: "NYUSIM: A Roadmap to AI-Enabled Statistical Channel Modeling and Simulation",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Conference",
    href: "https://arxiv.org/abs/2602.15737",
  },
  {
    index: "C13",
    year: "2025",
    title: "Standardized Machine-Readable Point-Data Format for Consolidating Wireless Propagation Across Environments, Frequencies, and Institutions",
    venue: "IEEE Military Communications Conference (MILCOM)",
    status: "Conference",
    href: "https://arxiv.org/abs/2510.00141",
  },
];
