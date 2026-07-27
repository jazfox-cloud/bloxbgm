import fs from "node:fs";
import path from "node:path";

const measurementId = "G-NSEMR2NQQY";
const productionHost = "bloxbgm.com";
const failures = [];
const roots = ["src", "scripts"];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(filePath) : [filePath];
  });
}

function fail(message) {
  failures.push(message);
}

const files = roots
  .filter((root) => fs.existsSync(root))
  .flatMap(walk)
  .filter((filePath) => /\.(astro|js|mjs|ts|tsx|jsx|css|html)$/.test(filePath));

const corpus = files.map((filePath) => [filePath, fs.readFileSync(filePath, "utf8")]);
const allText = corpus.map(([, text]) => text).join("\n");
const measurementIds = [...allText.matchAll(/\bG-[A-Z0-9]{6,}\b/g)].map((match) => match[0]);
const otherIds = [...new Set(measurementIds.filter((id) => id !== measurementId))];

if (!measurementIds.includes(measurementId)) fail(`Missing expected Measurement ID ${measurementId}.`);
if (otherIds.length > 0) fail(`Unexpected Measurement ID(s): ${otherIds.join(", ")}.`);
if (!allText.includes(`productionHost = "${productionHost}"`)) fail("Missing apex production host guard.");
if (!allText.includes("window.location.hostname === productionHost")) fail("Production host guard must compare window.location.hostname.");
if (!allText.includes("dataLayer.push(arguments)")) fail("Google tag command queue must use dataLayer.push(arguments).");
const forbiddenQueueShape = "dataLayer.push" + "(args)";
if (allText.includes(forbiddenQueueShape)) fail("Forbidden dataLayer push args implementation found.");

for (const key of ["analytics_storage", "ad_storage", "ad_user_data", "ad_personalization"]) {
  if (!allText.includes(key)) fail(`Consent Mode v2 key missing: ${key}.`);
}

const consentFile = corpus.find(([filePath]) => filePath.endsWith("AnalyticsConsent.astro"))?.[1] ?? "";
const defaultIndex = consentFile.indexOf('gtag("consent", "default"');
const configIndex = consentFile.indexOf('gtag("config", measurementId');
if (defaultIndex === -1 || configIndex === -1 || defaultIndex > configIndex) {
  fail("Consent default must be queued before GA config.");
}

if (!consentFile.includes('ad_storage: "denied"') || !consentFile.includes('ad_personalization: "denied"')) {
  fail("Advertising consent must remain denied in analytics accept flow.");
}

const privacy = fs.readFileSync("src/pages/privacy-policy.astro", "utf8");
if (/Google-certified advertising CMP[^.]*current/i.test(privacy)) {
  fail("Privacy text appears to claim a Google-certified CMP is currently active.");
}
if (!privacy.includes("not a Google-certified advertising CMP")) {
  fail("Privacy text must disclose that the homemade analytics banner is not a certified advertising CMP.");
}

if (failures.length > 0) {
  console.error(`Analytics audit failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Analytics audit passed for ${measurementId} on ${productionHost}.`);
