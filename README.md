# Guanyue Qian — Research Portfolio

An interactive academic portfolio for PhD applications, presenting research in wireless ray tracing, generative modeling, 3D vision, and radar perception.

## Highlights

- Interactive TX-to-RX multipath ray-tracing canvas
- Interactive neural-field visualization with geometry and channel modes
- Research cases for HoRAMA, RT-anchored PDP diffusion, NYURay, and 4D point splatting
- Publications, education, honors, experience, fieldwork video, and downloadable CV
- Responsive layout, reduced-motion support, semantic HTML, and social sharing metadata

## Development

Requires Node.js 22.13 or newer and pnpm.

```bash
pnpm install
pnpm dev
pnpm test
```

The production build is emitted to `dist/` through vinext and is configured for OpenAI Sites hosting.
