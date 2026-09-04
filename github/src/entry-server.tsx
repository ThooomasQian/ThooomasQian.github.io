import { renderToString } from "react-dom/server";
import Home from "../../app/page";
import { ProjectDetail } from "../../app/ProjectDetail";
import { getProject, projects } from "../../app/projects";

export const staticRoutes = projects.map((project) => ({
  pathname: `/research/${project.slug}/`,
  title: `${project.title} — Guanyue Qian`,
  description: project.lede,
  image: project.image ?? null,
}));

export function render(pathname = "/") {
  const match = pathname.match(/^\/research\/([^/]+)/);
  const project = match ? getProject(match[1]) : undefined;
  return renderToString(project ? <ProjectDetail project={project} /> : <Home />);
}
