import type { Data } from "@puckeditor/core";
import fs from "fs";
import path from "path";
import {
  defaultSettings,
  type SiteProduct,
  type SiteSettings,
} from "@/lib/settings-types";

export type { SiteProduct, SiteSettings };
export { defaultSettings };

export type PageMeta = {
  path: string;
  title: string;
  updatedAt: string;
};

export type Database = {
  header: Data;
  footer: Data;
  pages: Record<string, Data>;
  meta: Record<string, PageMeta>;
  settings: SiteSettings;
};

const DB_PATH = path.join(process.cwd(), "database.json");

export function emptyRegion(title: string): Data {
  return {
    root: { props: { title } },
    content: [],
  };
}

export function emptyPage(title: string): Data {
  return {
    root: {
      props: {
        title,
        pageBackground: "#fafaf9",
      },
    },
    content: [],
  } as Data;
}

export function readDatabase(): Database {
  if (!fs.existsSync(DB_PATH)) {
    return {
      header: emptyRegion("Header"),
      footer: emptyRegion("Footer"),
      pages: {},
      meta: {},
      settings: defaultSettings(),
    };
  }

  const raw = JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) as Partial<Database> & {
    pages?: Record<string, Data>;
  };

  return {
    header: raw.header ?? emptyRegion("Header"),
    footer: raw.footer ?? emptyRegion("Footer"),
    pages: raw.pages ?? {},
    meta: raw.meta ?? {},
    settings: {
      ...defaultSettings(),
      ...(raw.settings || {}),
      contact: {
        ...defaultSettings().contact,
        ...(raw.settings?.contact || {}),
      },
      social: {
        ...defaultSettings().social,
        ...(raw.settings?.social || {}),
      },
      products: raw.settings?.products ?? defaultSettings().products,
    },
  };
}

export function writeDatabase(db: Database) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

export function getSettings(): SiteSettings {
  return readDatabase().settings;
}

export function saveSettings(settings: SiteSettings) {
  const db = readDatabase();
  db.settings = settings;
  writeDatabase(db);
}

export function getHeader(): Data {
  return readDatabase().header;
}

export function getFooter(): Data {
  return readDatabase().footer;
}

export function saveHeader(data: Data) {
  const db = readDatabase();
  db.header = data;
  writeDatabase(db);
}

export function saveFooter(data: Data) {
  const db = readDatabase();
  db.footer = data;
  writeDatabase(db);
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

  // Strip legacy per-page header/footer if present
  const cleaned = {
    ...data,
    root: {
      ...data.root,
      props: {
        ...(data.root?.props || {}),
        title: resolvedTitle,
        header: undefined,
        footer: undefined,
      },
    },
  } as Data;

  db.pages[pagePath] = cleaned;
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

  const data = emptyPage(title);
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

export function renamePage(oldPath: string, newPath: string, title?: string) {
  const db = readDatabase();
  const from = normalizePath(oldPath);
  const to = normalizePath(newPath);

  if (!db.pages[from]) throw new Error("Không tìm thấy trang");
  if (from !== to && db.pages[to]) throw new Error("Đường dẫn mới đã tồn tại");

  const data = db.pages[from];
  const meta = db.meta[from];
  delete db.pages[from];
  delete db.meta[from];

  db.pages[to] = data;
  db.meta[to] = {
    path: to,
    title: title?.trim() || meta?.title || to,
    updatedAt: new Date().toISOString(),
  };
  writeDatabase(db);
  return db.meta[to];
}
