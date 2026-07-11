export const site = {
  name: "BloxBGM",
  domain: "bloxbgm.com",
  url: "https://bloxbgm.com",
  tagline: "Roblox music IDs organized by play style.",
  description:
    "Search Roblox music IDs and browse scenario-based BGM playlists for speedruns, PvP, building, tycoon, and hangout games.",
  launchDate: "2026-07-05",
  dataPolicy:
    "BloxBGM separates source-listed candidates from IDs that have been checked in a Roblox boombox environment.",
  monetization: {
    phaseOne: ["Display ads after indexation", "Sponsored playlist placements with labels"],
    phaseTwo: ["Game server and private-server affiliate placements", "Creator playlist partnerships"],
    phaseThree: ["Premium downloadable playlist packs", "Lightweight API/data licensing"]
  }
};

export function pageUrl(path = "/") {
  if (path === "/" || path === "") return site.url;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalizedPath.endsWith("/") ? normalizedPath : `${normalizedPath}/`}`;
}
