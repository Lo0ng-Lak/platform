import { writeFileSync } from "fs";
import { join } from "path";
import { homepageTemplate } from "../src/lib/templates";

const dbPath = join(process.cwd(), "database.json");

const db = {
  pages: {
    "/": homepageTemplate,
  },
  meta: {
    "/": {
      path: "/",
      title: "Trang chủ",
      updatedAt: new Date().toISOString(),
    },
  },
};

writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
console.log("Seeded public homepage into database.json");
