import { AdminPageHeading } from "@/components/admin/page-heading";
import { ContentEditor } from "@/components/admin/content-editor";
export default function ContentPage(){return <><AdminPageHeading title="Nội dung website" description="Chỉnh sửa câu chữ, hình ảnh và thông tin hiển thị công khai."/><div className="mt-6 flex gap-2 overflow-x-auto">{["Trang chủ","Lưu trú","Trải nghiệm","FAQ","Chính sách","SEO"].map((x,i)=><button key={x} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${i===0?"bg-lago-ink text-white":"border bg-white"}`}>{x}</button>)}</div><ContentEditor/></>}
