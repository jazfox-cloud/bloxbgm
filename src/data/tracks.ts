export type TrackStatus = "verified" | "candidate" | "unavailable";
export type TrackGenre = "phonk" | "hype" | "chill" | "meme" | "ambient" | "classic" | "other";

export interface Track {
  id: string;
  title: string;
  artist: string;
  genre: TrackGenre;
  mood: string[];
  bestFor: string[];
  status: TrackStatus;
  sourceName: string;
  sourceUrl: string;
  sourceAccessed: string;
  verifiedDate?: string;
  notes: string;
}

const robloxDen = "https://robloxden.com/music-codes";

export const tracks: Track[] = [
  {
    id: "138855854",
    title: "Get Hyper",
    artist: "Droideka",
    genre: "hype",
    mood: ["fast", "loud", "arcade"],
    bestFor: ["speedrun", "obby", "pvp"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "1837015626",
    title: "Tokyo Drift",
    artist: "Fumitake Igarashi",
    genre: "phonk",
    mood: ["drift", "night", "racing"],
    bestFor: ["speedrun", "racing", "pvp"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "1843436418",
    title: "Running",
    artist: "Tom Hillock",
    genre: "hype",
    mood: ["motion", "bright", "focused"],
    bestFor: ["speedrun", "obby", "training"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "1843391637",
    title: "Night Owl",
    artist: "Tom Hillock",
    genre: "chill",
    mood: ["night", "smooth", "steady"],
    bestFor: ["building", "hangout", "tycoon"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "1844095741",
    title: "Aurora",
    artist: "Outcome",
    genre: "ambient",
    mood: ["wide", "calm", "atmospheric"],
    bestFor: ["building", "roleplay", "hangout"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "1837247756",
    title: "Lost in Eternity",
    artist: "Morgan Sansous",
    genre: "ambient",
    mood: ["cinematic", "space", "slow"],
    bestFor: ["building", "roleplay", "exploration"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "1843403987",
    title: "Happy Song",
    artist: "Nicolas Boscovic",
    genre: "chill",
    mood: ["bright", "light", "friendly"],
    bestFor: ["tycoon", "hangout", "building"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "1844397736",
    title: "Wooden Bear",
    artist: "Gil Flat",
    genre: "chill",
    mood: ["warm", "simple", "loopable"],
    bestFor: ["building", "farming", "hangout"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "1835337424",
    title: "Insane Patients",
    artist: "Aardvark",
    genre: "hype",
    mood: ["tense", "weird", "busy"],
    bestFor: ["pvp", "horror", "challenge"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "1845572829",
    title: "Booming",
    artist: "Mark Nolan",
    genre: "hype",
    mood: ["impact", "drums", "arena"],
    bestFor: ["pvp", "boss fight", "training"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "1843327118",
    title: "Story",
    artist: "Tom Hillock",
    genre: "chill",
    mood: ["soft", "clean", "steady"],
    bestFor: ["roleplay", "building", "hangout"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "1836515424",
    title: "West Coast Tang",
    artist: "Junebug Slim",
    genre: "hype",
    mood: ["groove", "urban", "confident"],
    bestFor: ["pvp", "driving", "hangout"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "1837213982",
    title: "Muay Thai",
    artist: "Imade Saputra",
    genre: "hype",
    mood: ["fight", "sharp", "training"],
    bestFor: ["pvp", "fighting", "boss fight"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "1837822818",
    title: "Creator of Worlds",
    artist: "Epic Score",
    genre: "ambient",
    mood: ["epic", "cinematic", "worldbuilding"],
    bestFor: ["building", "roleplay", "exploration"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "138081566",
    title: "Spooky, Scary Skeletons",
    artist: "Andrew Gold",
    genre: "meme",
    mood: ["spooky", "funny", "seasonal"],
    bestFor: ["horror", "party", "meme"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "142376088",
    title: "Raining Tacos",
    artist: "Parry Gripp",
    genre: "meme",
    mood: ["funny", "bright", "chaotic"],
    bestFor: ["party", "meme", "hangout"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "166378555",
    title: "Team Fortress 2",
    artist: "Valve Studio Orchestra",
    genre: "classic",
    mood: ["arena", "comic", "action"],
    bestFor: ["pvp", "team fight", "obby"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  },
  {
    id: "138134680",
    title: "Let's Get It Started",
    artist: "The Black Eyed Peas",
    genre: "hype",
    mood: ["party", "sport", "pump-up"],
    bestFor: ["pvp", "sports", "race"],
    status: "candidate",
    sourceName: "Roblox Den music codes",
    sourceUrl: robloxDen,
    sourceAccessed: "2026-07-05",
    notes: "Source-listed Roblox music code; needs in-game boombox confirmation before verified labeling."
  }
];

export const verifiedTracks = tracks.filter((track) => track.status === "verified");
export const candidateTracks = tracks.filter((track) => track.status === "candidate");
