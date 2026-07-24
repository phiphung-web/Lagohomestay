import { PrismaClient, RuleType, UserRole } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const staySeeds = [
  { name: "LAKA House", slug: "lago-house", zoneSlug: "he-ho", shortName: "Nhà bên hồ · cho nhóm bạn", description: "Căn nhà rộng mở hướng mặt nước, dành cho những cuộc hội ngộ nhiều tiếng cười và bữa tối thật dài.", maxGuests: 8, baseGuests: 6, bedrooms: 3, beds: 4, bathrooms: 2, area: 140, basePrice: 4200000, heroImage: "/images/stay-lago.jpg", gallery: ["/images/stay-lago.jpg", "/images/detail-1.jpg"], amenities: ["Bếp đầy đủ", "Sân BBQ", "Phòng khách lớn", "Hiên hướng hồ"], featured: true, units: [{ code: "HO-01", name: "LAKA House · Hồ 01" }] },
  { name: "Nhà Mây", slug: "nha-may", zoneSlug: "he-doi", shortName: "Căn nhỏ trên cao · cho hai người", description: "Một căn nhà nhỏ đón mây qua khung cửa, nơi buổi sáng bắt đầu bằng ánh nắng và sự tĩnh lặng.", maxGuests: 2, baseGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, area: 42, basePrice: 1650000, heroImage: "/images/stay-cloud.jpg", gallery: ["/images/stay-cloud.jpg", "/images/detail-2.jpg"], amenities: ["Bồn tắm nhìn rừng", "Hiên riêng", "Máy chiếu", "Bếp nhỏ"], featured: true, units: [{ code: "MAY-01", name: "Nhà Mây 01" }, { code: "MAY-02", name: "Nhà Mây 02" }] },
  { name: "Nhà Rừng", slug: "nha-rung", zoneSlug: "he-rung", shortName: "Ẩn dưới tán cây · cho gia đình", description: "Không gian gỗ ấm ôm lấy khu vườn riêng, để cả nhà gần thiên nhiên mà vẫn đủ đầy tiện nghi.", maxGuests: 5, baseGuests: 4, bedrooms: 2, beds: 3, bathrooms: 2, area: 86, basePrice: 2850000, heroImage: "/images/stay-forest.jpg", gallery: ["/images/stay-forest.jpg", "/images/detail-1.jpg"], amenities: ["Vườn riêng", "Bếp gia đình", "Bàn ăn ngoài trời", "Đồ dùng trẻ em"], featured: true, units: [{ code: "RUNG-01", name: "Nhà Rừng 01" }, { code: "RUNG-02", name: "Nhà Rừng 02" }] },
  { name: "Nhà Đồi", slug: "nha-doi", zoneSlug: "he-doi", shortName: "Khoảng mở trên đồi · cho kỳ nghỉ dài", description: "Căn nhà nhiều ánh sáng với studio riêng, khoảng hiên rộng và tầm nhìn mở về phía thung lũng.", maxGuests: 6, baseGuests: 4, bedrooms: 2, beds: 3, bathrooms: 2, area: 108, basePrice: 3400000, heroImage: "/images/stay-hill.jpg", gallery: ["/images/stay-hill.jpg", "/images/detail-3.jpg"], amenities: ["Studio làm việc", "Hiên ngắm hoàng hôn", "Bếp đầy đủ", "Máy giặt"], featured: true, units: [{ code: "DOI-01", name: "Nhà Đồi 01" }] },
  { name: "Nhà Bến", slug: "nha-ben", zoneSlug: "he-ho", shortName: "Chạm mặt nước · cho gia đình nhỏ", description: "Căn nhà thấp bên mép hồ, có cầu gỗ riêng và phòng khách mở để cả nhà nhìn thấy mặt nước.", maxGuests: 5, baseGuests: 4, bedrooms: 2, beds: 3, bathrooms: 2, area: 92, basePrice: 3200000, heroImage: "/images/stay-lago.jpg", gallery: ["/images/stay-lago.jpg", "/images/detail-1.jpg"], amenities: ["Cầu gỗ riêng", "Hiên sát mặt nước", "Bếp gia đình", "Bàn ăn 6 chỗ"], featured: true, units: [{ code: "BEN-01", name: "Nhà Bến 01" }, { code: "BEN-02", name: "Nhà Bến 02" }] },
  { name: "Nhà Sậy", slug: "nha-say", zoneSlug: "he-ho", shortName: "Một mái hiên bên lau · cho hai người", description: "Căn studio riêng tư nép sau bờ lau, có cửa kính rộng, bồn tắm trong nhà và góc đọc sách.", maxGuests: 2, baseGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, area: 38, basePrice: 1850000, heroImage: "/images/stay-cloud.jpg", gallery: ["/images/stay-cloud.jpg", "/images/detail-2.jpg"], amenities: ["Bồn tắm trong nhà", "Hiên riêng bên lau", "Góc đọc sách", "Bếp nhỏ"], featured: true, units: [{ code: "SAY-01", name: "Nhà Sậy 01" }, { code: "SAY-02", name: "Nhà Sậy 02" }] },
  { name: "Cabin Thông", slug: "cabin-thong", zoneSlug: "he-rung", shortName: "Cabin gỗ giữa rừng · cho hai người", description: "Cabin nhỏ có giường sát cửa kính, hiên treo giữa tán thông và bể ngâm ngoài trời.", maxGuests: 2, baseGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, area: 32, basePrice: 1950000, heroImage: "/images/stay-forest.jpg", gallery: ["/images/stay-forest.jpg", "/images/detail-1.jpg"], amenities: ["Bể ngâm ngoài trời", "Hiên gỗ riêng", "Giường nhìn rừng", "Phòng tắm khép kín"], featured: true, units: [{ code: "THONG-01", name: "Cabin Thông 01" }, { code: "THONG-02", name: "Cabin Thông 02" }, { code: "THONG-03", name: "Cabin Thông 03" }] },
  { name: "Nhà Tổ", slug: "nha-to", zoneSlug: "he-rung", shortName: "Hai tầng dưới tán cây · cho nhóm nhỏ", description: "Căn nhà hai tầng với phòng sinh hoạt chung, góc boardgame và khoảng sân riêng.", maxGuests: 6, baseGuests: 4, bedrooms: 2, beds: 4, bathrooms: 2, area: 104, basePrice: 3550000, heroImage: "/images/stay-forest.jpg", gallery: ["/images/stay-forest.jpg", "/images/detail-3.jpg"], amenities: ["Phòng sinh hoạt chung", "Boardgame", "Bếp đầy đủ", "Sân riêng"], featured: true, units: [{ code: "TO-01", name: "Nhà Tổ 01" }, { code: "TO-02", name: "Nhà Tổ 02" }] }
];

const zoneSeeds = [
  { name: "Hệ Hồ", slug: "he-ho", description: "Những căn nhà hướng về mặt hồ và các cuộc hội ngộ.", image: "/images/stay-lago.jpg", sortOrder: 1 },
  { name: "Hệ Rừng", slug: "he-rung", description: "Những căn nhà nép dưới tán cây và khu vườn riêng.", image: "/images/stay-forest.jpg", sortOrder: 2 },
  { name: "Hệ Đồi", slug: "he-doi", description: "Những căn nhà trên cao đón mây, thung lũng và hoàng hôn.", image: "/images/stay-hill.jpg", sortOrder: 3 }
];

async function main() {
  const property = await prisma.property.upsert({
    where: { slug: "lago-homestay" },
    update: {},
    create: { name: "LAKA Homestay", slug: "lago-homestay", address: "Một nơi bình yên giữa thiên nhiên", phone: "0900 000 000", zalo: "0900000000", email: "hello@lagohomestay.vn" }
  });

  const zoneBySlug = new Map<string, string>();
  for (const zone of zoneSeeds) {
    const saved = await prisma.zone.upsert({
      where: { slug: zone.slug },
      update: { ...zone, propertyId: property.id, active: true },
      create: { ...zone, propertyId: property.id }
    });
    zoneBySlug.set(zone.slug, saved.id);
  }

  const activeTypeIds: string[] = [];
  for (const stay of staySeeds) {
    const { units, zoneSlug, ...data } = stay;
    const type = await prisma.accommodationType.upsert({
      where: { slug: data.slug },
      update: { ...data, zoneId: zoneBySlug.get(zoneSlug), active: true },
      create: { ...data, propertyId: property.id, zoneId: zoneBySlug.get(zoneSlug) }
    });
    activeTypeIds.push(type.id);
    const activeUnitCodes = units.map((unit) => unit.code);
    for (const unit of units) {
      await prisma.unit.upsert({
        where: { code: unit.code },
        update: { active: true, name: unit.name, accommodationTypeId: type.id },
        create: { ...unit, accommodationTypeId: type.id }
      });
    }
    await prisma.unit.updateMany({ where: { accommodationTypeId: type.id, code: { notIn: activeUnitCodes } }, data: { active: false } });
    await prisma.rateRule.deleteMany({ where: { accommodationTypeId: type.id } });
    await prisma.rateRule.createMany({ data: [
      { accommodationTypeId: type.id, name: "Giá cuối tuần", type: RuleType.WEEKDAY, priority: 10, amount: 250000, weekdays: [5, 6] },
      { accommodationTypeId: type.id, name: "Phụ thu khách", type: RuleType.EXTRA_GUEST, priority: 20, amount: 300000, minGuests: data.baseGuests + 1, weekdays: [] }
    ] });
  }

  await prisma.accommodationType.updateMany({ where: { propertyId: property.id, id: { notIn: activeTypeIds } }, data: { active: false, featured: false } });

  await prisma.user.upsert({
    where: { email: "owner@lago.local" },
    update: {},
    create: { propertyId: property.id, name: "Chủ LAKA", email: "owner@lago.local", passwordHash: await hash("LAKA@2026", 12), role: UserRole.OWNER }
  });

}

main().finally(() => prisma.$disconnect());
