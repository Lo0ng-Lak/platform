"use client";

import type { SiteSettings } from "@/lib/settings-types";
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

const SettingsContext = createContext<SiteSettings | null>(null);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: ReactNode;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettings | null {
  return useContext(SettingsContext);
}
