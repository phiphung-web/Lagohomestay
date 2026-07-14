import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { StayCard } from "@/components/stay-card";
import { stays } from "@/lib/demo-data";

export const metadata: Metadata = { title: "Không gian lưu trú" };

export default function StaysPage() {
  return <SiteShell><PageHero eyebrow="Không gian lưu trú" title="Một căn nhà vừa với cách bạn muốn nghỉ" description="Từ căn nhỏ cho hai người đến ngôi nhà dành cho cả nhóm, mỗi không gian tại Lago đều có khoảng riêng và nhịp sống của chính mình."/><section className="section-pad"><div className="container-lago grid gap-8 md:grid-cols-2 lg:grid-cols-3">{stays.map((stay) => <StayCard key={stay.id} stay={stay}/>)}</div></section></SiteShell>;
}
