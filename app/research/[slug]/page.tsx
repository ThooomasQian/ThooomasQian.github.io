import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "../../ProjectDetail";
import { getProject, projects } from "../../projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} — Guanyue Qian`;
  const description = project.lede;
  const images = project.image ? [{ url: project.image, alt: project.imageAlt ?? project.title }] : [];
  return {
    title,
    description,
    alternates: { canonical: `/research/${project.slug}/` },
    openGraph: { title, description, type: "article", images },
    twitter: { card: project.image ? "summary_large_image" : "summary", title, description, images: project.image ? [project.image] : [] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}

