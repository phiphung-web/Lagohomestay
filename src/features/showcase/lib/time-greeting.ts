export type GreetingMood = "editorial" | "cinematic" | "organic";
export type DayPeriod = "morning" | "day" | "evening" | "night";

export function getDayPeriod(hour: number): DayPeriod {
  const normalizedHour = ((Math.trunc(hour) % 24) + 24) % 24;
  if (normalizedHour >= 5 && normalizedHour < 10) return "morning";
  if (normalizedHour >= 10 && normalizedHour < 17) return "day";
  if (normalizedHour >= 17 && normalizedHour < 22) return "evening";
  return "night";
}

const greetings: Record<GreetingMood, Record<DayPeriod, string>> = {
  editorial: {
    morning: "Buổi sớm · một ngày thật chậm đang mở ra",
    day: "Ban ngày · để thời gian trôi theo nhịp riêng",
    evening: "Hoàng hôn · LAKA đang dịu ánh đèn",
    night: "Đêm yên · một khoảng nghỉ đang chờ"
  },
  cinematic: {
    morning: "Cảnh 01 · ánh sớm vừa chạm mặt hồ",
    day: "Cảnh ngày · thiên nhiên đang lên màu",
    evening: "Golden hour · hoàng hôn đang hạ",
    night: "After dark · LAKA đã lên đèn"
  },
  organic: {
    morning: "Chào buổi sáng · hôm nay mình đi trốn nhé!",
    day: "Trời đang xanh · đến lúc xách ba lô lên",
    evening: "Chiều đẹp rồi · hội mình gặp nhau thôi",
    night: "Đêm ấm áp · nhà đang chờ cả nhóm"
  }
};

export function getTemplateTimeGreeting(mood: GreetingMood, hour: number) {
  const period = getDayPeriod(hour);
  return { period, message: greetings[mood][period] };
}
