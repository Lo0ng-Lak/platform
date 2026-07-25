"use client";

import type { Data } from "@puckeditor/core";
import { Puck } from "@puckeditor/core";
import config from "@/puck.config";

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  return (
    <Puck
      config={config}
      data={data}
      onPublish={async (publishedData) => {
        await fetch("/puck/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: publishedData, path }),
        });
        alert("Đã xuất bản trang!");
      }}
    />
  );
}
