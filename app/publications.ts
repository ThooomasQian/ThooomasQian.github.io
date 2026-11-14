type Publication = {
  index: string;
  year: string;
  authors: string;
  title: string;
  venue: string;
  status: "Published" | "Accepted" | "Under review";
  href?: string;
};

const publicationRecords: readonly Publication[] = [
  {
    index: "J1",
    year: "2026",
    authors: "M. Ying, D. Shakya, P. Ma, <b>G. Qian</b>, and T. S. Rappaport",
    title: "Site-Specific Location Calibration and Validation of Ray-Tracing Simulator NYURay at Upper Mid-Band Frequencies",
    venue: "npj Wireless Technology, vol. 2, art. no. 8",
    status: "Published",
    href: "https://www.nature.com/articles/s44459-025-00014-x",
  },
  {
    index: "C1",
    year: "2027",
    authors: "<b>G. Qian</b>, M. Ying, X. Wang, R. Dhah, Y. Guo, P. Ma, I. S. Gupte, B. Meier, D. Abraham, and T. S. Rappaport",
    title: "HoRAMA-L: Lightweight Holistic Reconstruction of 3D Indoor Environments with Automated Material Assignment for Wireless Ray Tracing",
    venue: "IEEE Wireless Communications and Networking Conference (WCNC)",
    status: "Under review",
  },
  {
    index: "C2",
    year: "2027",
    authors: "<b>G. Qian</b>, M. Ying, X. Wang, Y. Guo, and T. S. Rappaport",
    title: "Impact of Geometric Fidelity on Wireless Channel Prediction Using Site-Specific Ray Tracing in an Indoor Factory at Upper Mid-Band",
    venue: "European Conference on Antennas and Propagation (EuCAP)",
    status: "Under review",
  },
  {
    index: "C3",
    year: "2026",
    authors: "<b>G. Qian</b>, M. Ying, X. Wang, X. Liu, I. S. Gupte, D. Shakya, and T. S. Rappaport",
    title: "Joint Beamforming and RIS Deployment Optimization for Outdoor-to-Indoor Coverage at Upper Mid-Band: A Dual-Band Ray-Tracing Study",
    venue: "Asilomar Conference on Signals, Systems, and Computers",
    status: "Published",
    href: "https://arxiv.org/abs/2610.03887",
  },
  {
    index: "C4",
    year: "2027",
    authors: "A. Armouti, <b>G. Qian</b>, and R. Nandakumar",
    title: "4D Point Splatting for mmWave Radar Micro-Doppler Differentiable Rendering",
    venue: "International Conference on Learning Representations (ICLR)",
    status: "Under review",
    href: "https://arxiv.org/abs/2611.08342",
  },
  {
    index: "C5",
    year: "2026",
    authors: "M. Ying, <b>G. Qian</b>, X. Wang, P. Ma, D. Shakya, and T. S. Rappaport",
    title: "HoRAMA: Holistic Reconstruction with Automated Material Assignment for Ray Tracing using NYURay",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Published",
    href: "https://ieeexplore.ieee.org/document/11587422",
  },
  {
    index: "C6",
    year: "2026",
    authors: "M. Ying, <b>G. Qian</b>, X. Wang, X. Liu, I. S. Gupte, P. Ma, D. Shakya, and T. S. Rappaport",
    title: "SPARC: Sparse Path-Aware Residual Calibrator for Wireless Ray Tracing at Upper Mid-Band",
    venue: "IEEE Global Communications Conference (GLOBECOM)",
    status: "Accepted",
    href: "https://arxiv.org/abs/2609.06077",
  },
  {
    index: "C7",
    year: "2027",
    authors: "M. Ying, I. S. Gupte, Y. Guo, R. Dhah, <b>G. Qian</b>, X. Wang, P. Ma, B. Meier, H. Nikbakht, D. Abraham, and T. S. Rappaport",
    title: "Wideband Indoor Hotspot Propagation Measurements and Channel Models at 3.7 GHz for 5G/6G FR1 Deployments",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Under review",
  },
  {
    index: "C8",
    year: "2027",
    authors: "M. Ying, X. Wang, R. Dhah, Y. Guo, <b>G. Qian</b>, I. S. Gupte, P. Ma, B. Meier, H. Nikbakht, D. Abraham, and T. S. Rappaport",
    title: "Wideband Outdoor Urban Microcell Propagation Measurements and Channel Models at 3.7 GHz for 5G/6G FR1 Deployments",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Under review",
  },
  {
    index: "C9",
    year: "2027",
    authors: "X. Wang, M. Ying, Y. Guo, R. Dhah, <b>G. Qian</b>, I. S. Gupte, B. Meier, H. Nikbakht, D. Abraham, and T. S. Rappaport",
    title: "Path Loss, Delay Spread, and Angular Spread from Wideband Indoor Factory Measurements at 3.7 GHz",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Under review",
  },
  {
    index: "C10",
    year: "2026",
    authors: "I. Jariwala, X. Wang, B. Meier, <b>G. Qian</b>, D. Shakya, M. Ying, H. Nikbakht, D. Abraham, and T. S. Rappaport",
    title: "NYUSIM: A Roadmap to AI-Enabled Statistical Channel Modeling and Simulation",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Published",
    href: "https://ieeexplore.ieee.org/document/11587993",
  },
  {
    index: "C11",
    year: "2026",
    authors: "X. Wang, M. Ying, H. Chen, <b>G. Qian</b>, X. Liu, P. Ma, D. Shakya, C. Argyropoulos, and T. S. Rappaport",
    title: "Robust Hybrid Beamforming with Liquid Crystal Antennas and Liquid Neural Networks",
    venue: "IEEE 103rd Vehicular Technology Conference (VTC)",
    status: "Published",
    href: "https://arxiv.org/abs/2604.07219",
  },
  {
    index: "C12",
    year: "2025",
    authors: "D. Shakya, N. A. Abbasi, M. Ying, I. Jariwala, J. J. Qin, I. S. Gupte, B. Meier, <b>G. Qian</b>, D. Abraham, T. S. Rappaport, and A. F. Molisch",
    title: "Standardized Machine-Readable Point-Data Format for Consolidating Wireless Propagation Across Environments, Frequencies, and Institutions",
    venue: "IEEE Military Communications Conference (MILCOM)",
    status: "Published",
    href: "https://ieeexplore.ieee.org/document/11309979",
  },
  {
    index: "C13",
    year: "2027",
    authors: "X. Wang, M. Ying, H. Nikbakht, <b>G. Qian</b>, Y. Guo, D. Abraham, and T. S. Rappaport",
    title: "Joint Calibration of the 3GPP Urban Microcell Channel Model Using Measurements at 6.75, 16.95, 28, 73 and 142 GHz",
    venue: "IEEE International Conference on Communications (ICC)",
    status: "Under review",
  },
  {
    index: "C14",
    year: "2027",
    authors: "M. Ying, <b>G. Qian</b>, P. Ma, D. Shakya, T. S. Rappaport, and D. Calin",
    title: "Fast Floor-Plan-Based Indoor Digital Twin Reconstruction and Measurement Validation of Ray Tracing at 6.75 and 16.95 GHz",
    venue: "IEEE Wireless Communications and Networking Conference (WCNC)",
    status: "Under review",
  },
  {
    index: "M1",
    year: "2026",
    authors: "L. Belostotski, A. Madanayake, J. Nielsen, M. Abdelhadi, X. Liu, X. Wang, <b>G. Qian</b>, S. Ekin, and T. S. Rappaport",
    title: "The Anatomy of RF Chains: Metrics, Measures, and Operating Efficiency",
    venue: "IEEE Microwave Magazine, pp. 2–16",
    status: "Published",
    href: "https://ieeexplore.ieee.org/abstract/document/11615106",
  },
];

function authorPosition(paper: Publication): number {
  const position = paper.authors.split(",").findIndex((author) => author.includes("<b>G. Qian</b>"));
  return position < 0 ? Number.POSITIVE_INFINITY : position;
}

export const publications: readonly Publication[] = [...publicationRecords].sort(
  (first, second) => authorPosition(first) - authorPosition(second),
);
