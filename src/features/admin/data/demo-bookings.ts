export type DemoBooking = {
  code: string;
  guest: string;
  phone: string;
  stay: string;
  checkIn: string;
  checkOut: string;
  total: number;
  status: "HELD" | "CONFIRMED";
  created: string;
};

export const demoBookings: DemoBooking[] = [
  {
    code: "LAGO-260714-A8K2",
    guest: "Nguyễn Minh Anh",
    phone: "090 123 4567",
    stay: "Lago House",
    checkIn: "18/07",
    checkOut: "20/07",
    total: 3_150_000,
    status: "HELD",
    created: "12 phút trước",
  },
  {
    code: "LAGO-260712-P4M9",
    guest: "Trần Gia Hân",
    phone: "098 765 4321",
    stay: "Lago House",
    checkIn: "21/07",
    checkOut: "23/07",
    total: 4_750_000,
    status: "CONFIRMED",
    created: "2 ngày trước",
  },
  {
    code: "LAGO-260710-Q7N1",
    guest: "Lê Hoàng Nam",
    phone: "091 442 8832",
    stay: "Lago House",
    checkIn: "25/07",
    checkOut: "27/07",
    total: 8_650_000,
    status: "CONFIRMED",
    created: "4 ngày trước",
  },
];
