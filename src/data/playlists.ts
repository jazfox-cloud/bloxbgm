import { tracks } from "./tracks";

export interface Playlist {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  metaDescription: string;
  useCase: string;
  trackIds: string[];
  updatedDate: string;
  monetizationAngle: string;
}

export const playlists: Playlist[] = [
  {
    slug: "speedrun-phonk",
    title: "Speedrun Phonk",
    eyebrow: "Obby / Parkour / Racing",
    description: "Fast, punchy tracks for Roblox runs where rhythm helps the route feel sharper.",
    metaDescription:
      "Browse source-listed Roblox music ID candidates selected for obbies, racing rounds, speedruns, and progression sessions that need momentum.",
    useCase: "Use this set for obbies, racing rounds, and progression grinds that need momentum.",
    trackIds: ["138855854", "1837015626", "1843436418", "1845572829", "1836515424", "138134680"],
    updatedDate: "2026-07-05",
    monetizationAngle: "Future fit: private server recommendations, speedrun gear affiliates, and sponsored creator playlists."
  },
  {
    slug: "pvp-hype",
    title: "PvP Hype",
    eyebrow: "Arena / Fighting / Bosses",
    description: "High-pressure BGM candidates for fighting games, boss attempts, and arena warmups.",
    metaDescription:
      "Browse source-listed Roblox music ID candidates for PvP, fighting games, boss attempts, weapon training, and high-pressure arena warmups.",
    useCase: "Best for Roblox PvP, fighting, weapon training, and high-stakes challenge servers.",
    trackIds: ["1835337424", "1845572829", "1837213982", "166378555", "138855854", "1836515424"],
    updatedDate: "2026-07-05",
    monetizationAngle: "Future fit: PvP game guides, server-hosting placements, and creator loadout partnerships."
  },
  {
    slug: "chill-building",
    title: "Chill Building",
    eyebrow: "Tycoon / Building / Hangout",
    description: "Loopable, lower-pressure BGM candidates for long sessions and social Roblox worlds.",
    metaDescription:
      "Browse source-listed Roblox music ID candidates for building, tycoon, farming, roleplay, hangouts, and other lower-pressure sessions.",
    useCase: "Use this set for tycoon grinding, building, farming, roleplay, and hangout servers.",
    trackIds: ["1843391637", "1844095741", "1837247756", "1843403987", "1844397736", "1843327118", "1837822818"],
    updatedDate: "2026-07-05",
    monetizationAngle: "Future fit: builder tools, premium playlist packs, and labeled sponsor placements."
  }
];

export function getPlaylistTracks(trackIds: string[]) {
  const byId = new Map(tracks.map((track) => [track.id, track]));
  return trackIds.map((id) => byId.get(id)).filter((track) => track !== undefined);
}
