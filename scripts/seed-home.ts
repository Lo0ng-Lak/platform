import { writeFileSync } from "fs";
import { join } from "path";
import {
  contactTemplate,
  footerTemplate,
  headerTemplate,
  homepageTemplate,
  servicesTemplate,
} from "../src/lib/templates";

const dbPath = join(process.cwd(), "database.json");
const now = new Date().toISOString();

const db = {
  header: headerTemplate,
  footer: footerTemplate,
  pages: {
    "/": homepageTemplate,
    "/services": servicesTemplate,
    "/contact": contactTemplate,
  },
  meta: {
    "/": { path: "/", title: "Trang chủ", updatedAt: now },
    "/services": { path: "/services", title: "Dịch vụ", updatedAt: now },
    "/contact": { path: "/contact", title: "Liên hệ", updatedAt: now },
  },
};

writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
console.log("Seeded header + footer + 3 pages into database.json");
