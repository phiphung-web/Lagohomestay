import type { Metadata } from "next";
import { TemplateSelector } from "@/features/showcase/components/template-selector";

export const metadata: Metadata = {
  title: "Chọn mẫu giao diện",
  description: "Ba hướng thiết kế khác biệt dành cho website LAKA Homestay."
};

export default function HomePage() {
  return <TemplateSelector />;
}
