import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

// -------- load .env.local (no dotenv needed) ----------
function loadEnv(file = ".env.local") {
  if (!fs.existsSync(file)) return;
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const l = line.trim();
    if (!l || l.startsWith("#")) continue;
    const eq = l.indexOf("=");
    if (eq === -1) continue;
    const key = l.slice(0, eq).trim();
    const val = l.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
const KEY = process.env.CLOUDINARY_API_KEY;
const SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD || !KEY || !SECRET) {
  console.error("Missing Cloudinary env vars. Put them in .env.local");
  process.exit(1);
}

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const BASE_PREFIX = "lacueva"; // folder name on Cloudinary

// Exclusions: keep logos local (do not upload / convert)
const EXCLUDE_PATTERNS = [
  /\/brand\//i,
  /logo/i,
  /\.svg$/i,
];

const ALLOWED_EXT = new Set([".webp", ".jpg", ".jpeg", ".png"]);
const UPLOAD_ENDPOINT = `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`;

function shouldExclude(p) {
  return EXCLUDE_PATTERNS.some((re) => re.test(p.replaceAll("\\", "/")));
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function sha1Signature(params, secret) {
  // Cloudinary signature: sort params (excluding file), join k=v with &, append secret, sha1
  const keys = Object.keys(params).sort();
  const toSign = keys.map(k => `${k}=${params[k]}`).join("&") + secret;
  return crypto.createHash("sha1").update(toSign).digest("hex");
}

async function uploadFile(absPath) {
  const relFromPublic = path.relative(PUBLIC_DIR, absPath).replaceAll("\\", "/");
  const ext = path.extname(relFromPublic).toLowerCase();
  if (!ALLOWED_EXT.has(ext)) return null;
  if (shouldExclude(relFromPublic)) return null;

  // Keep folder structure in Cloudinary
  const publicId = `${BASE_PREFIX}/${relFromPublic}`.replace(/\.[^.]+$/, ""); // remove extension
  const folder = publicId.split("/").slice(0, -1).join("/");

  const timestamp = Math.floor(Date.now() / 1000);

  // We set: folder + public_id + overwrite + resource_type + timestamp
  const params = {
    folder,
    public_id: publicId.split("/").pop(), // public_id is last segment when folder is provided
    overwrite: "true",
    resource_type: "image",
    timestamp: String(timestamp),
  };

  const signature = sha1Signature(params, SECRET);

  const form = new FormData();
  form.set("file", new Blob([fs.readFileSync(absPath)]), path.basename(absPath));
  form.set("api_key", KEY);
  form.set("timestamp", String(timestamp));
  form.set("folder", folder);
  form.set("public_id", params.public_id);
  form.set("overwrite", "true");
  form.set("signature", signature);

  const res = await fetch(UPLOAD_ENDPOINT, { method: "POST", body: form });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Upload failed (${res.status}) ${relFromPublic}\n${txt}`);
  }
  const json = await res.json();
  return {
    local: relFromPublic,
    public_id: json.public_id,
    secure_url: json.secure_url,
  };
}

async function main() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error("No public/ folder found.");
    process.exit(1);
  }

  const files = walk(PUBLIC_DIR);

  const targets = files.filter(f => {
    const rel = path.relative(PUBLIC_DIR, f).replaceAll("\\", "/");
    const ext = path.extname(rel).toLowerCase();
    return ALLOWED_EXT.has(ext) && !shouldExclude(rel);
  });

  console.log(`Found ${targets.length} assets to upload (excluding logos/brand/svg).`);

  const mapping = [];
  let ok = 0, fail = 0;

  for (let i = 0; i < targets.length; i++) {
    const f = targets[i];
    const rel = path.relative(PUBLIC_DIR, f).replaceAll("\\", "/");
    process.stdout.write(`[${i+1}/${targets.length}] ${rel} ... `);
    try {
      const r = await uploadFile(f);
      if (r) {
        ok++;
        mapping.push(r);
        console.log("OK");
      } else {
        console.log("SKIP");
      }
    } catch (e) {
      fail++;
      console.log("FAIL");
      console.error(String(e));
    }
  }

  const outPath = path.join(ROOT, "cloudinary-mapping.json");
  fs.writeFileSync(outPath, JSON.stringify(mapping, null, 2));
  console.log(`\nDone. OK=${ok}, FAIL=${fail}`);
  console.log(`Mapping saved -> ${outPath}`);
}
main();
