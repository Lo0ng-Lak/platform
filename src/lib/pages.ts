import type { Data } from "@puckeditor/core";
import fs from "fs";
import path from "path";

export type PageMeta = {
  path: string;
  title: string;
  updatedAt: string;
};

export type Database = {
  pages: Record<string, Data>;
  meta: Record<string, PageMeta>;
};

const DB_PATH = path.join(process.cwd(), "database.json");

export function readDatabase(): Database {
  if (!fs.existsSync(DB_PATH)) {
    return { pages: {}, meta: {} };
  }

  const raw = JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) as Database;
  return {
    pages: raw.pages ?? {},
    meta: raw.meta ?? {},
  };
}

export function writeDatabase(db: Database) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

export function getPage(pagePath: string): Data | null {
  const db = readDatabase();
  return db.pages[pagePath] ?? null;
}

export function listPages(): PageMeta[] {
  const db = readDatabase();
  return Object.values(db.meta).sort((a, b) =>
    a.updatedAt < b.updatedAt ? 1 : -1
  );
}

export function savePage(pagePath: string, data: Data, title?: string) {
  const db = readDatabase();
  const resolvedTitle =
    title ||
    (data.root?.props?.title as string | undefined) ||
    db.meta[pagePath]?.title ||
    pagePath;

  db.pages[pagePath] = data;
  db.meta[pagePath] = {
    path: pagePath,
    title: resolvedTitle,
    updatedAt: new Date().toISOString(),
  };

  writeDatabase(db);
}

export function createPage(pagePath: string, title: string) {
  const normalized = normalizePath(pagePath);
  const db = readDatabase();

  if (db.pages[normalized]) {
    throw new Error("Trang đã tồn tại");
  }

  const data = {
    root: {
      props: {
        title,
        pageBackground: "#fafaf9",
        contentMaxWidth: 1140,
        header: [],
        footer: [],
      },
    },
    content: [],
  } as Data;

  db.pages[normalized] = data;
  db.meta[normalized] = {
    path: normalized,
    title,
    updatedAt: new Date().toISOString(),
  };

  writeDatabase(db);
  return db.meta[normalized];
}

export function deletePage(pagePath: string) {
  const db = readDatabase();
  delete db.pages[pagePath];
  delete db.meta[pagePath];
  writeDatabase(db);
}

export function normalizePath(input: string) {
  let value = input.trim();
  if (!value.startsWith("/")) value = `/${value}`;
  if (value.length > 1 && value.endsWith("/")) value = value.slice(0, -1);
  return value.replace(/\/+/g, "/");
}
