import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const sourceRoot = process.argv[2];

if (!sourceRoot) {
  throw new Error(
    "Usage: node scripts/import-laka-images.mjs <Images Laka folder> [output folder]",
  );
}

const outputRoot = path.resolve(
  process.argv[3] ?? path.join(process.cwd(), "public", "images", "laka"),
);

const mappings = [
  ["TrangchuLaka/banner pc.png", "home/hero-desktop.webp"],
  ["TrangchuLaka/banner mobile.png", "home/hero-mobile.webp"],
  ["TrangchuLaka/sứ mệnh.png", "home/mission.webp"],
  ["TrangchuLaka/Nhà bên hồ.png", "home/stay-lakeside.webp"],
  ["TrangchuLaka/nhà hàng.png", "home/dining-restaurant.webp"],
  ["TrangchuLaka/cà phê.png", "home/dining-coffee.webp"],
  ["TrangchuLaka/pick.png", "home/journey-pickleball.webp"],
  ["TrangchuLaka/kayak.png", "home/journey-kayak.webp"],
  ["TrangchuLaka/bể bơi.png", "home/journey-pool.webp"],
  ["TrangchuLaka/đạp xe.png", "home/journey-bicycle.webp"],
  ["TrangchuLaka/thư viện.png", "home/gallery-01.webp"],
  ["TrangchuLaka/thư viện (2).png", "home/gallery-02.webp"],
  ["TrangchuLaka/thư viện (3).png", "home/gallery-03.webp"],
  ["TrangchuLaka/thư viện (4).png", "home/gallery-04.webp"],
  ["TrangchuLaka/thư viện (5).png", "home/gallery-05.webp"],
  ["TrangchuLaka/thư viện (6).png", "home/gallery-06.webp"],
  ["TrangchuLaka/thư viện (7).png", "home/gallery-07.webp"],
  ["TrangchuLaka/thư viện (8).png", "home/gallery-08.webp"],
  ["TrangchuLaka/thư viện (9).png", "home/gallery-09.webp"],

  ["LuutruLaka/1 kính.png", "stays/forest-lake-suite/cover.webp"],
  ["LuutruLaka/1 kính (2).png", "stays/forest-lake-suite/room.webp"],
  ["LuutruLaka/1 kính (3).png", "stays/forest-lake-suite/lake-view.webp"],
  ["LuutruLaka/1 kính (4).png", "stays/forest-lake-suite/amenities.webp"],
  ["LuutruLaka/2 kính.png", "stays/bathtub-suite/cover.webp"],
  ["LuutruLaka/2 kính (2).png", "stays/bathtub-suite/room.webp"],
  ["LuutruLaka/2 kính (3).png", "stays/bathtub-suite/bathtub-view.webp"],
  ["LuutruLaka/cửa sổ.png", "stays/lake-suite/cover.webp"],
  ["LuutruLaka/cửa sổ (2).png", "stays/lake-suite/room.webp"],
  ["LuutruLaka/cửa sổ (3).png", "stays/lake-suite/bed.webp"],
  ["LuutruLaka/cửa sổ (4).png", "stays/lake-suite/window-view.webp"],
  ["LuutruLaka/bungalow.png", "stays/bungalow/cover.webp"],
  ["LuutruLaka/bungalow (2).png", "stays/bungalow/bedroom.webp"],
  ["LuutruLaka/bungalow (3).png", "stays/bungalow/window-view.webp"],
  ["LuutruLaka/bungalow (4).png", "stays/bungalow/room.webp"],
  ["LuutruLaka/bungalow (5).png", "stays/bungalow/loft.webp"],
  ["LuutruLaka/bungalow (6).png", "stays/bungalow/bathroom.webp"],
  ["LuutruLaka/bungalow (7).png", "stays/bungalow/brand-detail.webp"],
  ["LuutruLaka/villa.png", "stays/villa-top-hill/cover.webp"],
  ["LuutruLaka/villa (2).png", "stays/villa-top-hill/group-room.webp"],
  ["LuutruLaka/villa (3).png", "stays/villa-top-hill/bedroom.webp"],
  ["LuutruLaka/villa (4).png", "stays/villa-top-hill/forest-view.webp"],

  ["TrainghiemLaka/banner.png", "experiences/banner.webp"],
  ["TrainghiemLaka/49.png", "experiences/banner-card.webp"],
  ["TrainghiemLaka/50.png", "experiences/pickleball.webp"],
  ["TrainghiemLaka/51.png", "experiences/kayak.webp"],
  ["TrainghiemLaka/52.png", "experiences/pool.webp"],
  ["TrainghiemLaka/53.png", "experiences/bicycle.webp"],
  ["TrainghiemLaka/54.png", "experiences/board-games.webp"],
  ["TrainghiemLaka/55.png", "experiences/billiards.webp"],

  ["DichvuLaka/57.png", "services/banner.webp"],
  ["DichvuLaka/58.png", "services/banner-card.webp"],
  ["DichvuLaka/59.png", "services/team-building.webp"],
  ["DichvuLaka/60.png", "services/outdoor-event.webp"],
  ["DichvuLaka/61.png", "services/campfire.webp"],
];

// These homepage files are byte-identical to the canonical stay covers below.
// Keep validating that the delivery contains them, but do not publish copies.
const duplicateSources = ["TrangchuLaka/nhà giữa rừng.png", "TrangchuLaka/nhà trên đồi.png"];

async function listRelativeFiles(root, current = root) {
  const entries = await readdir(current, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) return listRelativeFiles(root, absolute);
      return path.relative(root, absolute).replaceAll("\\", "/");
    }),
  );
  return nested.flat();
}

const delivered = (await listRelativeFiles(sourceRoot)).sort();
const mapped = [...mappings.map(([source]) => source), ...duplicateSources].sort();
const missing = mapped.filter((file) => !delivered.includes(file));
const unmapped = delivered.filter((file) => !mapped.includes(file));

if (missing.length || unmapped.length) {
  throw new Error(JSON.stringify({ missing, unmapped }, null, 2));
}

let sourceBytes = 0;
let outputBytes = 0;

for (const [source, destination] of mappings) {
  const inputPath = path.join(sourceRoot, ...source.split("/"));
  const outputPath = path.join(outputRoot, ...destination.split("/"));
  await mkdir(path.dirname(outputPath), { recursive: true });
  sourceBytes += (await stat(inputPath)).size;
  await sharp(inputPath)
    .rotate()
    .webp({ quality: 82, alphaQuality: 90, effort: 5, smartSubsample: true })
    .toFile(outputPath);
  outputBytes += (await stat(outputPath)).size;
}

console.log(
  JSON.stringify(
    {
      imported: mappings.length,
      sourceMB: Number((sourceBytes / 1024 / 1024).toFixed(2)),
      outputMB: Number((outputBytes / 1024 / 1024).toFixed(2)),
      reductionPercent: Number(((1 - outputBytes / sourceBytes) * 100).toFixed(1)),
      outputRoot,
    },
    null,
    2,
  ),
);
