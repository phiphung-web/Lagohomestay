import { PrismaClient, ContentType, RuleType, UserRole } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const lagoHouse = {
  name: "Lago House",
  slug: "lago-house",
  shortName: "Nhà nguyên căn · riêng tư trọn vẹn",
  description: "Một ngôi nhà rộng mở dành trọn cho gia đình và nhóm bạn, nơi mọi người ở gần nhau nhưng vẫn có khoảng riêng để nghỉ ngơi.",
  maxGuests: 8,
  baseGuests: 6,
  bedrooms: 3,
  beds: 4,
  bathrooms: 2,
  area: 140,
  basePrice: 4200000,
  heroImage: "/images/stay-lago.jpg",
  gallery: ["/images/stay-lago.jpg", "/images/detail-1.jpg", "/images/detail-2.jpg"],
  amenities: ["Toàn bộ nhà riêng", "Bếp đầy đủ", "Sân BBQ", "Phòng khách lớn", "Hiên hướng thiên nhiên", "Wi-Fi"],
  featured: true,
  unitCode: "LAGO-01"
};

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

  const { unitCode, ...data } = lagoHouse;
  const type = await prisma.accommodationType.upsert({
    where: { slug: data.slug },
    update: { ...data, active: true },
    create: { ...data, propertyId: property.id }
  });

  await prisma.accommodationType.updateMany({
    where: { propertyId: property.id, id: { not: type.id } },
    data: { active: false, featured: false }
  });

  await prisma.unit.upsert({
    where: { code: unitCode },
    update: { active: true, name: data.name, accommodationTypeId: type.id },
    create: { code: unitCode, name: data.name, accommodationTypeId: type.id }
  });

  await prisma.rateRule.deleteMany({ where: { accommodationTypeId: type.id } });
  await prisma.rateRule.createMany({ data: [
    { accommodationTypeId: type.id, name: "Giá cuối tuần", type: RuleType.WEEKDAY, priority: 10, amount: 250000, weekdays: [5, 6] },
    { accommodationTypeId: type.id, name: "Phụ thu khách", type: RuleType.EXTRA_GUEST, priority: 20, amount: 300000, minGuests: data.baseGuests + 1, weekdays: [] }
  ] });

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
    ["home.hero.eyebrow", "Dòng giới thiệu", "Nhà nguyên căn giữa thiên nhiên"],
    ["home.hero.title", "Tiêu đề trang chủ", "Một căn nhà, trọn một khoảng riêng."],
    ["home.hero.description", "Mô tả trang chủ", "Lago House dành trọn cho gia đình và nhóm bạn—đủ gần để kết nối, đủ riêng để mỗi người thật sự được nghỉ ngơi."]
  ];
  for (const [key, label, value] of content) {
    await prisma.contentBlock.upsert({
      where: { key },
      update: { value },
      create: { propertyId: property.id, key, label, value, type: ContentType.TEXT }
    });
  }
}

main().finally(() => prisma.$disconnect());
