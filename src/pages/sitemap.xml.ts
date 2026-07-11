import { playlists } from "@/data/playlists";
import { pageUrl, site } from "@/data/site";

const staticRoutes = ["/", "/codes/", "/how-to-use/", "/about/", "/privacy-policy/", "/terms/"];

export function GET() {
  const playlistRoutes = playlists.map((playlist) => `/playlists/${playlist.slug}/`);
  const routes = [...staticRoutes, ...playlistRoutes];
  const updated = site.launchDate;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => `  <url>
    <loc>${pageUrl(route)}</loc>
    <lastmod>${updated}</lastmod>
  </url>`)
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
