import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("/sitemap-index.xml", site);
  const llms = new URL("/llms.txt", site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\nLLMs-Txt: ${llms}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
