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
    index: "J1",
    year: "2026",
    title: "Site-Specific Location Calibration and Validation of Ray-Tracing Simulator NYURay at Upper Mid-Band Frequencies",
    venue: "npj Wireless Technology · Vol. 2, Article 8",
    status: "Journal",
    href: "https://www.nature.com/articles/s44459-025-00014-x",
  },
  {
    index: "C1",
    year: "2026",
    title: "Joint Beamforming and RIS Deployment Optimization for Outdoor-to-Indoor Coverage at Upper Mid-Band",
    venue: "Asilomar Conference on Signals, Systems, and Computers",
    status: "Accepted",
  },
  {
    index: "C2",
    year: "2027",
    title: "Impact of Geometric Fidelity on Wireless Channel Prediction Using Site-Specific Ray Tracing in an Indoor Factory",
    venue: "European Conference on Antennas and Propagation (EuCAP)",
    status: "Submitted",
    href: "https://arxiv.org/abs/2604.07219",
  },
  {
    index: "C3",
    year: "2026",
    title: "SPARC: Sparse Path-Aware Residual Calibration of Wireless Ray Tracing at Upper Mid-Band",
    venue: "IEEE Global Communications Conference (GLOBECOM)",
    status: "Accepted",
  },
  {
    index: "C4",
    year: "2026",
    title: "Robust Hybrid Beamforming with Liquid Crystal Antennas and Liquid Neural Networks",
    venue: "IEEE 103rd Vehicular Technology Conference",
    status: "Conference",
    href: "https://ieeexplore.ieee.org/document/11587422",
  },
  {
    index: "C5",
    year: "2026",
    title: "HoRAMA: Holistic Reconstruction with Automated Material Assignment for Ray Tracing using NYURay",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Conference",
    href: "https://ieeexplore.ieee.org/document/11587993",
  },
  {
    index: "C6",
    year: "2026",
    title: "NYUSIM: A Roadmap to AI-Enabled Statistical Channel Modeling and Simulation",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Conference",
    href: "https://ieeexplore.ieee.org/document/11309979",
  },
  {
    index: "C7",
    year: "2025",
    title: "Standardized Machine-Readable Point-Data Format for Consolidating Wireless Propagation Across Environments, Frequencies, and Institutions",
    venue: "IEEE Military Communications Conference (MILCOM)",
    status: "Conference",
  },
];
