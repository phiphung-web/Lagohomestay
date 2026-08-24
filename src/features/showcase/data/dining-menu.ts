export type LocalizedMenuText = { vi: string; en: string };

export type DiningMenuGroup = {
  title: LocalizedMenuText;
  items: LocalizedMenuText[];
};

export type DiningMenuVenue = {
  id: "restaurant" | "cafe";
  eyebrow: LocalizedMenuText;
  title: LocalizedMenuText;
  introduction: LocalizedMenuText;
  groups: DiningMenuGroup[];
};

const item = (vi: string, en: string): LocalizedMenuText => ({ vi, en });

// Curated from LAKA's operating menu workbook. Prices, internal notes and
// reference-only rows are intentionally excluded from this public layout data.
export const diningMenuVenues: DiningMenuVenue[] = [
  {
    id: "restaurant",
    eyebrow: item("Bếp bên hồ", "The lakeside kitchen"),
    title: item("Nhà Hàng Ven Hồ", "Lakeside Restaurant"),
    introduction: item(
      "Những nhóm món đang được LAKA hoàn thiện cho các bữa ăn quây quần, từ món mở đầu nhẹ đến đồ nướng, lẩu và bữa cơm dùng chung.",
      "LAKA is shaping a menu for shared meals, from light starters to grilled dishes, hot pots and familiar rice-table favourites."
    ),
    groups: [
      {
        title: item("Khai vị", "Starters"),
        items: [
          item("Dưa chuột chẻ", "Smashed cucumber"),
          item("Khoai tây chiên", "French fries"),
          item("Ngô chiên", "Crispy corn"),
          item("Khoai môn Lệ Phố", "Crispy taro cakes"),
          item("Cánh gà chiên mắm", "Fish-sauce glazed chicken wings")
        ]
      },
      {
        title: item("Món nướng", "From the grill"),
        items: [
          item("Gà đồi nướng nguyên con", "Whole grilled hill chicken"),
          item("Cá quả hoặc cá chim nướng", "Grilled snakehead or pomfret"),
          item("Cá rô phi nướng", "Grilled tilapia"),
          item("Lợn mán nướng lá mắc mật", "Grilled mountain pork with mac mat leaves")
        ]
      },
      {
        title: item("Bữa ăn để sẻ chia", "Made for sharing"),
        items: [
          item("Mẹt nướng tổng hợp", "Mixed grill platter"),
          item("Set BBQ cho nhóm nhỏ", "BBQ set for a small group"),
          item("Set BBQ cho nhóm đông", "BBQ set for a larger group"),
          item("Lẩu gà đồi lá é", "Hill chicken and basil hot pot"),
          item("Lẩu Thái", "Thai-style hot pot")
        ]
      },
      {
        title: item("Món nhà", "At the family table"),
        items: [
          item("Rau rừng hoặc rau theo mùa", "Forest greens or seasonal vegetables"),
          item("Măng trúc xào", "Stir-fried bamboo shoots"),
          item("Cơm rang thập cẩm", "Mixed fried rice"),
          item("Sườn xào chua ngọt", "Sweet-and-sour ribs"),
          item("Canh theo mùa", "Seasonal soup")
        ]
      }
    ]
  },
  {
    id: "cafe",
    eyebrow: item("Một khoảng nghỉ giữa ngày", "A pause in the day"),
    title: item("Tiệm Cà Phê Tầng Mây", "Tang May Coffee Shop"),
    introduction: item(
      "Danh mục đồ uống đang được xây dựng theo nhiều nhịp: cà phê quen thuộc, cold brew, trà trái cây, matcha, nước ép cùng một số món ăn nhẹ.",
      "The drinks list is taking shape around familiar coffee, cold brew, fruit tea, matcha, fresh juice and a small selection of snacks."
    ),
    groups: [
      {
        title: item("Cà phê", "Coffee"),
        items: [
          item("Cà phê đen", "Vietnamese black coffee"),
          item("Cà phê nâu", "Vietnamese coffee with condensed milk"),
          item("Bạc xỉu", "Bac xiu"),
          item("Cà phê muối", "Salted coffee"),
          item("Cold brew nguyên bản", "Classic cold brew"),
          item("Cold brew Yuzu", "Yuzu cold brew")
        ]
      },
      {
        title: item("Trà", "Tea"),
        items: [
          item("Trà sữa gạo rang", "Roasted rice milk tea"),
          item("Trà lê mộc tê", "Pear and osmanthus tea"),
          item("Trà quýt Yuzu", "Yuzu mandarin tea"),
          item("Trà đào cam sả", "Peach, orange and lemongrass tea"),
          item("Trà mơ hương rừng", "Forest apricot tea"),
          item("Kombucha gừng hibiscus", "Ginger hibiscus kombucha")
        ]
      },
      {
        title: item("Matcha & trái cây", "Matcha and fruit"),
        items: [
          item("Matcha latte", "Matcha latte"),
          item("Matcha dâu tây", "Strawberry matcha"),
          item("Coco matcha", "Coconut matcha"),
          item("Nước ép cam", "Fresh orange juice"),
          item("Nước ép dứa", "Fresh pineapple juice"),
          item("Bơ già dừa non", "Avocado and young coconut smoothie")
        ]
      },
      {
        title: item("Bánh & đồ ăn nhẹ", "Pastries and snacks"),
        items: [
          item("Croissant", "Croissant"),
          item("Pain au chocolat", "Pain au chocolat"),
          item("Khoai tây chiên", "French fries"),
          item("Nem chua rán", "Fried fermented pork rolls"),
          item("Set viên chiên tổng hợp", "Mixed fried snack platter")
        ]
      }
    ]
  }
];
