import { AdminPageHeading } from "@/features/admin/components/page-heading";

const bars = [42, 55, 48, 62, 70, 68, 81, 76, 64, 72, 86, 78];

export default function ReportsPage() {
  return <>
    <AdminPageHeading title="Báo cáo" description="Theo dõi hiệu quả vận hành và xu hướng đặt nguyên căn Lago House." />
    <div className="mt-8 grid gap-5 lg:grid-cols-3">
      <div className="card p-6 lg:col-span-2">
        <div className="flex items-center justify-between"><div><p className="text-sm font-bold">Doanh thu theo tháng</p><p className="display mt-2 text-4xl font-semibold">486,8 triệu</p></div><select className="rounded-lg border p-2 text-xs"><option>2026</option></select></div>
        <div className="mt-10 flex h-56 items-end gap-2">{bars.map((value, index) => <div key={index} className="group flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-md bg-lago-moss transition hover:bg-lago-forest" style={{ height: `${value}%` }} /><span className="text-[.6rem] text-lago-ink/45">T{index + 1}</span></div>)}</div>
      </div>
      <div className="card p-6"><p className="text-sm font-bold">Hiệu quả Lago House</p><div className="mt-8"><div className="flex justify-between text-sm"><span>Công suất tháng</span><strong>68%</strong></div><div className="mt-2 h-2 rounded-full bg-lago-cream"><div className="h-full w-[68%] rounded-full bg-lago-clay" /></div></div><div className="mt-8 border-t border-lago-ink/10 pt-6"><span className="text-xs text-lago-ink/50">Giá trị booking trung bình</span><p className="display mt-2 text-3xl font-semibold">8,2 triệu</p></div><div className="mt-6"><span className="text-xs text-lago-ink/50">Thời gian lưu trú trung bình</span><p className="display mt-2 text-3xl font-semibold">2,4 đêm</p></div></div>
    </div>
  </>;
}
