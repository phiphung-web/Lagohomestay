import { PrismaClient, ContentType, RuleType, UserRole } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const stays = [
  {
    name: "Nhà Mây",
    slug: "nha-may",
    shortName: "Dành cho hai người",
    description: "Một căn nhỏ bên triền cỏ, nơi buổi sáng bắt đầu bằng ánh nắng và tiếng lá.",
    maxGuests: 2,
    baseGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    area: 38,
    basePrice: 1450000,
    heroImage: "/images/stay-cloud.jpg",
    gallery: ["/images/stay-cloud.jpg", "/images/detail-1.jpg"],
    amenities: ["Bồn tắm nhìn vườn", "Bữa sáng", "Máy chiếu", "Sân hiên riêng"],
    featured: true,
    unitCode: "MAY-01"
  },
  {
    name: "Nhà Rừng",
    slug: "nha-rung",
    shortName: "Ấm cúng cho gia đình",
    description: "Không gian gỗ ấm, khu vườn riêng và những bữa tối quây quần dưới hiên.",
    maxGuests: 4,
    baseGuests: 2,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    area: 62,
    basePrice: 2250000,
    heroImage: "/images/stay-forest.jpg",
    gallery: ["/images/stay-forest.jpg", "/images/detail-2.jpg"],
    amenities: ["Bếp riêng", "Vườn kín", "Bàn ăn ngoài trời", "Bồn tắm"],
    featured: true,
    unitCode: "RUNG-01"
  },
  {
    name: "Lago House",
    slug: "lago-house",
    shortName: "Nguyên căn cho nhóm bạn",
    description: "Ngôi nhà rộng mở hướng mặt hồ, đủ riêng tư cho một kỳ nghỉ dài cùng người thân.",
    maxGuests: 8,
    baseGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    area: 140,
    basePrice: 4200000,
    heroImage: "/images/stay-lago.jpg",
    gallery: ["/images/stay-lago.jpg", "/images/detail-3.jpg"],
    amenities: ["Bếp đầy đủ", "BBQ", "Phòng khách lớn", "View mặt hồ"],
    featured: true,
    unitCode: "LAGO-01"
  }
];

async function main() {
  const property = await prisma.property.upsert({
    where: { slug: "lago-homestay" },
    update: {},
    create: {
      name: "Lago Homestay",
      slug: "lago-homestay",
      address: "Một nơi bình yên giữa thiên nhiên",
      phone: "0900 000 000",
      zalo: "0900000000",
      email: "hello@lagohomestay.vn"
    }
  });

  for (const stay of stays) {
    const { unitCode, ...data } = stay;
    const type = await prisma.accommodationType.upsert({
      where: { slug: data.slug },
      update: data,
      create: { ...data, propertyId: property.id }
    });
    await prisma.unit.upsert({
      where: { code: unitCode },
      update: { active: true },
      create: { code: unitCode, name: `${data.name} 01`, accommodationTypeId: type.id }
    });
    await prisma.rateRule.deleteMany({ where: { accommodationTypeId: type.id } });
    await prisma.rateRule.createMany({ data: [
      { accommodationTypeId: type.id, name: "Giá cuối tuần", type: RuleType.WEEKDAY, priority: 10, amount: 250000, weekdays: [5, 6] },
      { accommodationTypeId: type.id, name: "Phụ thu khách", type: RuleType.EXTRA_GUEST, priority: 20, amount: 300000, minGuests: data.baseGuests + 1, weekdays: [] }
    ]});
  }

  await prisma.user.upsert({
    where: { email: "owner@lago.local" },
    update: {},
    create: {
      propertyId: property.id,
      name: "Chủ Lago",
      email: "owner@lago.local",
      passwordHash: await hash("Lago@2026", 12),
      role: UserRole.OWNER
    }
  });

  const content = [
    ["home.hero.eyebrow", "Dòng giới thiệu", "Ở chậm giữa thiên nhiên"],
    ["home.hero.title", "Tiêu đề trang chủ", "Một khoảng xanh để mình thật sự nghỉ ngơi"],
    ["home.hero.description", "Mô tả trang chủ", "Lago là nơi những ngày dài được đo bằng nắng sớm, bữa cơm ấm và thời gian dành trọn cho nhau."]
  ];
  for (const [key, label, value] of content) {
    await prisma.contentBlock.upsert({
      where: { key }, update: { value },
      create: { propertyId: property.id, key, label, value, type: ContentType.TEXT }
    });
  }
}

main().finally(() => prisma.$disconnect());
