export type Photograph = {
  src: string;
  alt: string;
  caption: string;
  shape: "portrait" | "landscape" | "wide";
};

export const photographs: readonly Photograph[] = [
  { src: "/media/photography/670f7dcd39d84d5c87fe2ab75c9a5d.jpg", alt: "Long-exposure star trails above Mont-Saint-Michel at night", caption: "STAR TRAILS · NIGHT STUDY", shape: "landscape" },
  { src: "/media/photography/091fa25566fb68bf747fe38ee3e9b1.jpg", alt: "Low-angle view of the Eiffel Tower against a deep teal sky", caption: "PARIS · LOOKING UP", shape: "portrait" },
  { src: "/media/photography/c9c306954693a4cf0d0c56d230bb8e.jpg", alt: "Arc de Triomphe with motion-blurred traffic at sunset", caption: "PARIS · IN MOTION", shape: "landscape" },
  { src: "/media/photography/0f3c449fc1d1754722bfdfa4bef1d0.jpg", alt: "Aerial night view of pedestrians crossing Shibuya", caption: "TOKYO · HUMAN FLOW", shape: "portrait" },
  { src: "/media/photography/f5a09bcbae829988a5447aeae40e4b.jpg", alt: "Aerial view of a green football pitch on a snowy coastal island", caption: "ARCTIC FIELD · FROM ABOVE", shape: "portrait" },
  { src: "/media/photography/16c7b2695b9f3ecb50f027bf3d437c.jpg", alt: "Japan Airlines aircraft photographed with a panning motion blur", caption: "AIRFIELD · PANNING STUDY", shape: "landscape" },
  { src: "/media/photography/3f766c3543388a6a637483ecad2e3e.jpg", alt: "Aerial view of a snow-covered fishing village and turquoise sea", caption: "NORTHERN COAST · AERIAL", shape: "portrait" },
  { src: "/media/photography/280f0bc4c1d0466afc4a886c06ca7b.jpg", alt: "Tokyo Tower and red-white vehicle light trails at night", caption: "TOKYO · SIGNAL RED", shape: "portrait" },
  { src: "/media/photography/69895a464f6c1daa6bf87cc4685bee.jpg", alt: "A mist-covered mountain reflected in still blue water", caption: "ICELAND · LONG EXPOSURE", shape: "landscape" },
  { src: "/media/photography/38674569184597c8a1699e69645bac.jpg", alt: "Top-down aerial view of a narrow bridge over vivid blue water", caption: "COASTAL GEOMETRY", shape: "landscape" },
  { src: "/media/photography/a970e716edaaae778cbbec44d7353b.jpg", alt: "Two white seabirds flying above dark rocks and breaking waves", caption: "NORTH ATLANTIC · FLIGHT", shape: "portrait" },
  { src: "/media/photography/4d5cc77cb17ba023402ff57e8ec3ba.jpg", alt: "Panoramic winter coastline under dramatic clouds", caption: "WINTER COAST · PANORAMA", shape: "wide" },
  { src: "/media/photography/b6021c23d7eac11637852922b3f7ac.jpg", alt: "Crowd viewing the Mona Lisa in a dark gallery", caption: "THE LOUVRE · ATTENTION", shape: "wide" },
  { src: "/media/photography/d2969cb6303eda2d9f2342fa1559fd.jpg", alt: "Illuminated sculptural arch framing an arctic cathedral", caption: "TROMSØ · FRAMED LIGHT", shape: "portrait" },
  { src: "/media/photography/f72e6b788a67e3b67335786ef479d5.jpg", alt: "Shinkansen photographed with a panning motion blur", caption: "SHINKANSEN · VELOCITY", shape: "landscape" },
  { src: "/media/photography/11890bf15126635c45a0fbde8bee57.jpg", alt: "Black-and-white lighthouse beneath a field of stars", caption: "LIGHTHOUSE · NIGHT WATCH", shape: "landscape" },
  { src: "/media/photography/2b09ea8d9ca16a047b77371bb56c51.jpg", alt: "Small human silhouette beneath a dense star field", caption: "DARK SKY · SCALE", shape: "portrait" },
];
