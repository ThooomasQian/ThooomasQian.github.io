import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import Home from "../../app/page";
import { ProjectDetail } from "../../app/ProjectDetail";
import { getProject } from "../../app/projects";
import "../../app/globals.css";

function resolvePage(pathname: string) {
  const match = pathname.match(/^\/research\/([^/]+)/);
  const project = match ? getProject(decodeURIComponent(match[1])) : undefined;
  return project ? <ProjectDetail project={project} /> : <Home />;
}

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    {resolvePage(window.location.pathname)}
  </StrictMode>,
);
