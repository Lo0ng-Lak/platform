import "@puckeditor/core/puck.css";
import type { Metadata } from "next";
import { BuilderEditor } from "@/components/builder/BuilderEditor";
import { emptyRegion, getFooter } from "@/lib/pages";
import { footerConfig } from "@/puck/region-configs";

export const metadata: Metadata = {
  title: "Sửa Footer",
};

export default function AdminFooterEditor() {
  const data = getFooter() || emptyRegion("Footer");
  return (
    <BuilderEditor
      kind="footer"
      path="footer"
      data={data}
      editorConfig={footerConfig}
    />
  );
}

export const dynamic = "force-dynamic";
