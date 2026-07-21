import fs from "node:fs";
import path from "node:path";

const distDirectory = path.resolve("dist");
const siteOrigin = "https://bloxbgm.com";
const failures = [];

function fail(message) {
  failures.push(message);
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(filePath) : [filePath];
  });
}

function routeForFile(filePath) {
  const relative = path.relative(distDirectory, filePath);
  if (relative === "index.html") return "/";
  if (relative === "404.html") return "/404.html";
  return `/${relative.replace(/index\.html$/, "")}`;
}

function tags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map(
    (match) => match[0]
  );
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return match?.[2];
}

function meta(html, name, property = false) {
  const key = property ? "property" : "name";
  const tag = tags(html, "meta").find(
    (candidate) => attribute(candidate, key)?.toLowerCase() === name.toLowerCase()
  );
  return tag ? attribute(tag, "content") ?? "" : "";
}

function linkByRel(html, rel) {
  const tag = tags(html, "link").find((candidate) =>
    (attribute(candidate, "rel") ?? "")
      .toLowerCase()
      .split(/\s+/)
      .includes(rel.toLowerCase())
  );
  return tag ? attribute(tag, "href") ?? "" : "";
}

function visibleText(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

if (!fs.existsSync(distDirectory)) {
  console.error("dist/ does not exist. Run npm run build first.");
  process.exit(1);
}

const htmlFiles = walk(distDirectory).filter((filePath) => filePath.endsWith(".html"));
const pages = htmlFiles.map((filePath) => {
  const html = fs.readFileSync(filePath, "utf8");
  const route = routeForFile(filePath);
  const title = visibleText(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = meta(html, "description");
  const canonical = linkByRel(html, "canonical");
  const robots = meta(html, "robots").toLowerCase();
  const images = tags(html, "img");
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) =>
    visibleText(match[1])
  );
  const hrefs = tags(html, "a")
    .map((tag) => attribute(tag, "href"))
    .filter(Boolean);

  return { filePath, route, html, title, description, canonical, robots, images, h1, hrefs };
});

const indexablePages = pages.filter((page) => page.route !== "/404.html");
const pageRoutes = new Set(indexablePages.map((page) => page.route));
const sitemap = fs.readFileSync(path.join(distDirectory, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapRoutes = sitemapUrls.map((url) => {
  const parsed = new URL(url);
  return parsed.pathname === "/" ? "/" : parsed.pathname;
});

if (new Set(sitemapUrls).size !== sitemapUrls.length) fail("Sitemap contains duplicate URLs.");
for (const url of sitemapUrls) {
  const parsed = new URL(url);
  if (parsed.origin !== siteOrigin || parsed.search || parsed.hash) {
    fail(`Sitemap contains a non-canonical URL: ${url}`);
  }
}
for (const route of pageRoutes) {
  if (!sitemapRoutes.includes(route)) fail(`Indexable page is missing from sitemap: ${route}`);
}
for (const route of sitemapRoutes) {
  if (!pageRoutes.has(route)) fail(`Sitemap URL has no generated indexable page: ${route}`);
}

const descriptions = new Map();
const titles = new Map();
const inboundSources = new Map(indexablePages.map((page) => [page.route, new Set()]));

for (const page of indexablePages) {
  const expectedCanonical = page.route === "/" ? siteOrigin : `${siteOrigin}${page.route}`;
  if (!page.title) fail(`${page.route} has no title.`);
  if (!page.description) fail(`${page.route} has no meta description.`);
  if (page.description.length < 110 || page.description.length > 160) {
    fail(`${page.route} description length is ${page.description.length}; expected 110-160.`);
  }
  if (page.canonical !== expectedCanonical) {
    fail(`${page.route} canonical is ${page.canonical || "missing"}; expected ${expectedCanonical}.`);
  }
  if (page.robots.includes("noindex")) fail(`${page.route} is in sitemap but marked noindex.`);
  if (page.h1.length !== 1) fail(`${page.route} has ${page.h1.length} H1 elements.`);

  for (const image of page.images) {
    if (attribute(image, "alt") === undefined) fail(`${page.route} has an img without alt.`);
    const src = attribute(image, "src");
    if (src?.startsWith("/")) {
      const assetPath = path.join(distDirectory, src.replace(/^\//, ""));
      if (!fs.existsSync(assetPath)) fail(`${page.route} references missing image ${src}.`);
    }
  }

  for (const href of page.hrefs) {
    const url = new URL(href, `${siteOrigin}${page.route}`);
    if (url.origin !== siteOrigin) continue;
    const linkedRoute = url.pathname;
    const normalizedRoute = linkedRoute === "/" ? "/" : linkedRoute;
    if (!pageRoutes.has(normalizedRoute)) fail(`${page.route} links to missing page ${href}.`);
    if (normalizedRoute !== "/" && !normalizedRoute.endsWith("/")) {
      fail(`${page.route} links to redirecting URL ${href}.`);
    }
    if (inboundSources.has(normalizedRoute) && normalizedRoute !== page.route) {
      inboundSources.get(normalizedRoute).add(page.route);
    }
  }

  descriptions.set(page.description, [...(descriptions.get(page.description) ?? []), page.route]);
  titles.set(page.title, [...(titles.get(page.title) ?? []), page.route]);

  for (const script of [...page.html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]) {
    try {
      JSON.parse(script[1]);
    } catch {
      fail(`${page.route} contains invalid JSON-LD.`);
    }
  }
}

for (const [description, routes] of descriptions) {
  if (routes.length > 1) fail(`Duplicate description on ${routes.join(", ")}: ${description}`);
}
for (const [title, routes] of titles) {
  if (routes.length > 1) fail(`Duplicate title on ${routes.join(", ")}: ${title}`);
}
for (const [route, sources] of inboundSources) {
  if (route !== "/" && sources.size === 0) fail(`Indexable orphan page: ${route}`);
}

const notFound = pages.find((page) => page.route === "/404.html");
if (!notFound) {
  fail("Top-level 404.html is missing.");
} else {
  if (!notFound.robots.includes("noindex") || !notFound.robots.includes("follow")) {
    fail("404.html must use noindex, follow.");
  }
  if (notFound.canonical) fail("404.html must not output a canonical URL.");
  if (meta(notFound.html, "og:url", true)) fail("404.html must not output og:url.");
  if (!notFound.hrefs.includes("/")) fail("404.html must contain a plain home-page link.");
  if (sitemapRoutes.includes("/404.html") || sitemapRoutes.includes("/404/")) {
    fail("404 page must not appear in sitemap.");
  }
}

if (failures.length > 0) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `SEO audit passed: ${indexablePages.length} indexable pages, ${sitemapUrls.length} sitemap URLs, 0 broken internal links, 0 redirecting internal links.`
);
