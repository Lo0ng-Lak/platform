"use client";

import type { Config } from "@puckeditor/core";
import type { ReactNode } from "react";
import { config as baseConfig } from "@/puck.config";

/** Editor chỉ cho HEADER toàn site */
export const headerConfig = {
  ...baseConfig,
  root: {
    label: "HEADER (toàn website)",
    fields: {
      title: { type: "text", label: "Tên vùng (nội bộ)" },
    },
    defaultProps: {
      title: "Header",
    },
    render: ({ children }: { children: ReactNode; title: string }) => (
      <div data-region="header" style={{ width: "100%" }}>
        {children}
      </div>
    ),
  },
  categories: {
    site: {
      title: "Header widgets",
      components: [
        "Navbar",
        "Container",
        "InnerContainer",
        "Heading",
        "Text",
        "Button",
        "Image",
        "Spacer",
      ],
    },
    layout: {
      title: "Layout",
      components: ["Columns", "Column"],
    },
  },
} as unknown as Config;

/** Editor chỉ cho FOOTER toàn site */
export const footerConfig = {
  ...baseConfig,
  root: {
    label: "FOOTER (toàn website)",
    fields: {
      title: { type: "text", label: "Tên vùng (nội bộ)" },
    },
    defaultProps: {
      title: "Footer",
    },
    render: ({ children }: { children: ReactNode; title: string }) => (
      <div data-region="footer" style={{ width: "100%" }}>
        {children}
      </div>
    ),
  },
  categories: {
    site: {
      title: "Footer widgets",
      components: [
        "Footer",
        "Container",
        "InnerContainer",
        "Heading",
        "Text",
        "Button",
        "Image",
        "Spacer",
        "Divider",
      ],
    },
    layout: {
      title: "Layout",
      components: ["Columns", "Column"],
    },
  },
} as unknown as Config;
