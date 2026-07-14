import { Plus } from "lucide-react";
import { AdminPageHeading } from "@/features/admin/components/page-heading";
import { BookingTable } from "@/features/admin/components/booking-table";
export default function BookingsPage(){return <><AdminPageHeading title="Booking" description="Quản lý toàn bộ vòng đời yêu cầu đặt phòng." action={<button className="btn-primary"><Plus className="h-4 w-4"/>Tạo booking</button>}/><BookingTable/></>}
