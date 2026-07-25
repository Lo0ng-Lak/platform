import "@puckeditor/core/puck.css";
import type { Metadata } from "next";
import { BuilderEditor } from "@/components/builder/BuilderEditor";
import { emptyRegion, getHeader } from "@/lib/pages";
import { headerConfig } from "@/puck/region-configs";

export const metadata: Metadata = {
  title: "Sửa Header",
};

export default function AdminHeaderEditor() {
  const data = getHeader() || emptyRegion("Header");
  return (
    <BuilderEditor
      kind="header"
      path="header"
      data={data}
      editorConfig={headerConfig}
    />
  );
}

export const dynamic = "force-dynamic";
