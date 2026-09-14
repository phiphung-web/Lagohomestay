import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def create_laka_asset_order_workbook():
    wb = openpyxl.Workbook()

    # Palette colors (LAKA Brand Identity)
    FOREST = "16311C"      # Dark Forest Green (Primary Brand)
    FOREST_LIGHT = "23482B"# Medium Forest Green
    CREAM = "EAE1D2"       # Cream paper background
    SAND = "E7DED1"        # Sand border/accent
    GOLD = "C7A882"        # Clay Gold accent
    WHITE = "FFFFFF"
    GRAY_LIGHT = "F8F7F4"  # Alternating row background
    GRAY_BORDER = "D3CFC7" # Thin cell border
    RED_BG = "FDE8E8"
    RED_TEXT = "9B1C1C"
    GREEN_BG = "DEF7EC"
    GREEN_TEXT = "03543F"
    YELLOW_BG = "FEF08A"
    YELLOW_TEXT = "854D0E"

    # Fonts
    font_title = Font(name="Segoe UI", size=15, bold=True, color=WHITE)
    font_sub = Font(name="Segoe UI", size=10, italic=True, color=CREAM)
    font_header = Font(name="Segoe UI", size=10, bold=True, color=WHITE)
    font_section = Font(name="Segoe UI", size=11, bold=True, color=FOREST)
    font_data = Font(name="Segoe UI", size=9.5, color="1F2937")
    font_data_bold = Font(name="Segoe UI", size=9.5, bold=True, color="111827")
    font_code = Font(name="Consolas", size=9, color="16311C")

    # Fills
    fill_title = PatternFill(start_color=FOREST, end_color=FOREST, fill_type="solid")
    fill_header = PatternFill(start_color=FOREST, end_color=FOREST, fill_type="solid")
    fill_section = PatternFill(start_color=SAND, end_color=SAND, fill_type="solid")
    fill_zebra = PatternFill(start_color=GRAY_LIGHT, end_color=GRAY_LIGHT, fill_type="solid")
    fill_white = PatternFill(start_color=WHITE, end_color=WHITE, fill_type="solid")
    fill_gold = PatternFill(start_color=GOLD, end_color=GOLD, fill_type="solid")
    fill_p1 = PatternFill(start_color=RED_BG, end_color=RED_BG, fill_type="solid")
    fill_p2 = PatternFill(start_color=YELLOW_BG, end_color=YELLOW_BG, fill_type="solid")
    fill_p3 = PatternFill(start_color=GREEN_BG, end_color=GREEN_BG, fill_type="solid")

    # Borders
    thin_side = Side(border_style="thin", color=GRAY_BORDER)
    border_data = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thin_side)
    thick_bottom = Side(border_style="medium", color=FOREST)
    border_header = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thick_bottom)

    # Alignments
    align_center = Alignment(horizontal="center", vertical="center", wrap_text=True)
    align_left = Alignment(horizontal="left", vertical="center", wrap_text=True)
    align_header = Alignment(horizontal="center", vertical="center", wrap_text=True)

    columns_standard = [
        ("STT", 6, align_center),
        ("Mã tài nguyên (Tên file đề xuất)", 28, align_left),
        ("Vị trí Section / Component", 25, align_left),
        ("Hạng mục", 15, align_center),
        ("Kích thước chuẩn (px)", 18, align_center),
        ("Tỷ lệ", 10, align_center),
        ("Mô tả chi tiết góc chụp & Yêu cầu nội dung", 48, align_left),
        ("Mức độ ưu tiên", 14, align_center),
        ("Trạng thái", 15, align_center),
        ("Phụ trách", 14, align_center),
        ("Ghi chú / Link Driver", 20, align_left)
    ]

    def setup_sheet_header(ws, page_name, page_url, total_items_str):
        ws.views.sheetView[0].showGridLines = True

        # Row 1: Title Banner
        ws.merge_cells("A1:K1")
        cell1 = ws["A1"]
        cell1.value = f"LAKA HOMESTAY · DANH MỤC ORDER TÀI NGUYÊN — {page_name.upper()}"
        cell1.font = font_title
        cell1.fill = fill_title
        cell1.alignment = Alignment(horizontal="left", vertical="center", indent=1)
        ws.row_dimensions[1].height = 36

        # Row 2: Subtitle info
        ws.merge_cells("A2:K2")
        cell2 = ws["A2"]
        cell2.value = f"Đường dẫn URL: {page_url}  |  Dự án: LAKA Homestay (Dốc Dây Diều, Sóc Sơn, Hà Nội)  |  Tổng số hạng mục: {total_items_str}"
        cell2.font = font_sub
        cell2.fill = PatternFill(start_color=FOREST_LIGHT, end_color=FOREST_LIGHT, fill_type="solid")
        cell2.alignment = Alignment(horizontal="left", vertical="center", indent=1)
        ws.row_dimensions[2].height = 22

        # Row 3: Column Headers
        ws.row_dimensions[3].height = 28
        for col_idx, (col_name, col_width, col_align) in enumerate(columns_standard, 1):
            cell = ws.cell(row=3, column=col_idx, value=col_name)
            cell.font = font_header
            cell.fill = fill_header
            cell.alignment = align_header
            cell.border = border_header
            col_letter = get_column_letter(col_idx)
            ws.column_dimensions[col_letter].width = col_width

        ws.freeze_panes = "A4"

    def populate_rows(ws, rows_data):
        current_row = 4
        for row_item in rows_data:
            if isinstance(row_item, dict) and row_item.get("is_section_header"):
                # Section separator row
                ws.merge_cells(start_row=current_row, start_column=1, end_row=current_row, end_column=len(columns_standard))
                cell = ws.cell(row=current_row, column=1, value=f"  📌 {row_item['title'].upper()}")
                cell.font = font_section
                cell.fill = fill_section
                cell.alignment = Alignment(horizontal="left", vertical="center")
                for c in range(1, len(columns_standard) + 1):
                    ws.cell(row=current_row, column=c).border = border_data
                ws.row_dimensions[current_row].height = 24
                current_row += 1
                continue

            ws.row_dimensions[current_row].height = 32
            is_zebra = (current_row % 2 == 0)
            row_fill = fill_zebra if is_zebra else fill_white

            for col_idx, val in enumerate(row_item, 1):
                cell = ws.cell(row=current_row, column=col_idx, value=val)
                cell.border = border_data
                cell.fill = row_fill
                cell.alignment = columns_standard[col_idx - 1][2]
                cell.font = font_data

                # Custom formatting by column
                if col_idx == 1: # STT
                    cell.font = font_data_bold
                elif col_idx == 2: # Filename
                    cell.font = font_code
                elif col_idx == 8: # Priority
                    val_str = str(val).strip()
                    if "P1" in val_str:
                        cell.fill = fill_p1
                        cell.font = Font(name="Segoe UI", size=9.5, bold=True, color=RED_TEXT)
                    elif "P2" in val_str:
                        cell.fill = fill_p2
                        cell.font = Font(name="Segoe UI", size=9.5, bold=True, color=YELLOW_TEXT)
                    elif "P3" in val_str:
                        cell.fill = fill_p3
                        cell.font = Font(name="Segoe UI", size=9.5, bold=True, color=GREEN_TEXT)
                elif col_idx == 9: # Status
                    val_str = str(val).strip()
                    if "Đã có" in val_str:
                        cell.fill = fill_p3
                        cell.font = Font(name="Segoe UI", size=9, bold=True, color=GREEN_TEXT)
                    else:
                        cell.font = Font(name="Segoe UI", size=9, italic=True, color="6B7280")

            current_row += 1

    # =========================================================================
    # TAB 1: 00_Tong_Quan_Dashboard
    # =========================================================================
    ws_dash = wb.active
    wb.remove(ws_dash) # Remove default sheet

    ws_dash = wb.create_sheet(title="00_Tong_Quan_Dashboard")
    ws_dash.views.sheetView[0].showGridLines = True

    # Title
    ws_dash.merge_cells("A1:H1")
    c = ws_dash["A1"]
    c.value = "LAKA HOMESTAY · BẢNG ĐIỀU HÀNH & TỔNG QUAN TÀI NGUYÊN WEBSITE"
    c.font = font_title
    c.fill = fill_title
    c.alignment = Alignment(horizontal="center", vertical="center")
    ws_dash.row_dimensions[1].height = 40

    ws_dash.merge_cells("A2:H2")
    c2 = ws_dash["A2"]
    c2.value = "Hệ thống checklist order hình ảnh, nội dung thực tế phục vụ bàn giao website hoàn chỉnh 100%"
    c2.font = font_sub
    c2.fill = PatternFill(start_color=FOREST_LIGHT, end_color=FOREST_LIGHT, fill_type="solid")
    c2.alignment = Alignment(horizontal="center", vertical="center")
    ws_dash.row_dimensions[2].height = 24

    # Technical Specs Box
    ws_dash.merge_cells("A4:H4")
    c_specs_h = ws_dash["A4"]
    c_specs_h.value = "1. QUY CHUẨN KỸ THUẬT SẢN XUẤT MEDIA BẮT BUỘC"
    c_specs_h.font = font_section
    c_specs_h.fill = fill_section
    ws_dash.row_dimensions[4].height = 26

    specs = [
        ("Định dạng file xuất", "WebP (ưu tiên số 1) hoặc JPEG chất lượng cao (Quality 85-90%). Không dùng PNG cho ảnh chụp phong cảnh để tránh nặng trang."),
        ("Không gian màu (Color Space)", "sRGB (Bắt buộc). Tuyệt đối không để AdobeRGB/CMYK vì sẽ bị sai lệch/xỉn màu trên màn hình iPhone/Android."),
        ("Dung lượng file mục tiêu", "Ảnh Banner/Hero Fullscreen: 300KB - 500KB | Ảnh Card/Gallery: 150KB - 250KB | Ảnh Thumbnail/Icon: < 80KB."),
        ("Quy tắc đặt tên file", "Chữ thường không dấu, dùng gạch nối '-' phân cách. Ví dụ: laka-guest-house-01.webp, laka-san-pickleball-01.webp."),
        ("Video nền Ambient Loop", "Độ phân giải 1080p (1920x1080), không tiếng (muted), định dạng MP4 h.264 hoặc WebM, thời lượng 10-15s, nén dưới 8MB."),
        ("Cơ cấu lưu trữ bàn giao", "Google Drive chia theo từng thư mục tương ứng với từng tab trong bảng tính này.")
    ]

    for idx, (sp_name, sp_desc) in enumerate(specs, 5):
        ws_dash.row_dimensions[idx].height = 24
        ws_dash.cell(row=idx, column=1, value=sp_name).font = font_data_bold
        ws_dash.cell(row=idx, column=1).alignment = Alignment(horizontal="left", vertical="center")
        ws_dash.cell(row=idx, column=1).border = border_data
        ws_dash.merge_cells(start_row=idx, start_column=2, end_row=idx, end_column=8)
        c_desc = ws_dash.cell(row=idx, column=2, value=sp_desc)
        c_desc.font = font_data
        c_desc.alignment = Alignment(horizontal="left", vertical="center")
        for col_i in range(2, 9):
            ws_dash.cell(row=idx, column=col_i).border = border_data

    # Table of Content / Tab Index
    ws_dash.merge_cells("A12:H12")
    c_tabs_h = ws_dash["A12"]
    c_tabs_h.value = "2. BẢNG PHÂN BỔ TÀI NGUYÊN THEO TỪNG TAB TRONG WORKBOOK"
    c_tabs_h.font = font_section
    c_tabs_h.fill = fill_section
    ws_dash.row_dimensions[12].height = 26

    dash_headers = ["STT", "Tên Tab trong Sheet", "Trang tương ứng trên Web", "Số lượng ảnh", "Nội dung / Text cần chốt", "Mức độ ưu tiên", "Trạng thái", "Phụ trách"]
    ws_dash.row_dimensions[13].height = 26
    for c_i, h_name in enumerate(dash_headers, 1):
        cell = ws_dash.cell(row=13, column=c_i, value=h_name)
        cell.font = font_header
        cell.fill = fill_header
        cell.alignment = align_header
        cell.border = border_header

    tab_summary_data = [
        (1, "01_Trang_Chu", "Trang Chủ (/)", "16 ảnh + 1 video", "Review của khách thực tế", "P1 - Cốt lõi", "Chờ chụp thực tế", "Media + Content"),
        (2, "02_Luu_Tru_8_Dong_Can", "Trang Lưu Trú (/luu-tru)", "62 ảnh (8 cover + 54 gallery)", "Chính sách giá & tiêu chuẩn", "P1 - Cốt lõi", "Chờ chụp thực tế", "Media + Vận hành"),
        (3, "03_Trai_Nghiem", "Trang Trải Nghiệm (/trai-nghiem)", "8 ảnh hoạt động", "Quy định an toàn kayak/bơi", "P2 - Quan trọng", "Chờ chụp thực tế", "Media + Vận hành"),
        (4, "04_Dich_Vu_Su_Kien", "Trang Dịch Vụ (/dich-vu)", "5 ảnh dịch vụ/bãi xe", "Chi phí âm thanh sân khấu", "P2 - Quan trọng", "Chờ chụp thực tế", "Media + Vận hành"),
        (5, "05_Am_Thuc_Cafe", "Trang Ẩm Thực (/am-thuc)", "6 ảnh món + 10 menu scan", "Menu & giá Cà phê Tầng Mây", "P1 - Cốt lõi", "10 scan sẵn sàng", "Bếp + Media"),
        (6, "06_Ve_LAKA_Brand", "Về LAKA (/ve-laka)", "3 ảnh thương hiệu", "Bài viết Brand Story (200 từ)", "P3 - Bổ trợ", "Chờ nội dung", "Content"),
        (7, "07_Thong_Tin_FAQ", "Thông Tin & FAQ (/thong-tin, /faq)", "2 ảnh sảnh đón", "Giờ check-in/out, cọc, trẻ em", "P1 - Cốt lõi", "Chờ vận hành", "Vận hành"),
        (8, "08_Chi_Duong_Ban_Do", "Chỉ Đường (/chi-duong)", "3 ảnh + 1 bản đồ Master Plan", "Mốc rẽ Dốc Dây Diều, Sơ đồ khu", "P2 - Quan trọng", "Chờ bản vẽ", "Media + Thiết kế"),
        (9, "09_Chinh_Sach_Phap_Ly", "Chính Sách & Điều Khoản (/chinh-sach)", "3 ảnh phong cảnh", "Tài khoản nhận cọc, tỷ lệ cọc", "P1 - Cốt lõi", "Chờ chốt số TK", "Kế toán / Chủ"),
        (10, "10_Lien_He_Kenh_Chinh_Thuc", "Liên Hệ (/lien-he)", "2 ảnh tiếp đón", "Số hotline 24/7, số Zalo nhận lead", "P1 - Cốt lõi", "Đã có social link", "Quản lý"),
        (11, "11_Banner_12_Trang_Con", "Hệ thống Banner đồng bộ 12 trang", "24 ảnh (12 vòm nền + 12 card)", "Đồng bộ phong cách 3 tầng", "P2 - Quan trọng", "Chờ chọn ảnh", "Media Team")
    ]

    for r_i, r_data in enumerate(tab_summary_data, 14):
        ws_dash.row_dimensions[r_i].height = 24
        is_z = (r_i % 2 == 0)
        for c_i, val in enumerate(r_data, 1):
            cell = ws_dash.cell(row=r_i, column=c_i, value=val)
            cell.border = border_data
            cell.fill = fill_zebra if is_z else fill_white
            cell.alignment = align_center if c_i in [1, 4, 6, 7] else align_left
            cell.font = font_data_bold if c_i in [1, 2] else font_data
            if c_i == 6:
                cell.fill = fill_p1 if "P1" in str(val) else fill_p2
                cell.font = Font(name="Segoe UI", size=9.5, bold=True, color=RED_TEXT if "P1" in str(val) else YELLOW_TEXT)

    ws_dash.column_dimensions["A"].width = 6
    ws_dash.column_dimensions["B"].width = 26
    ws_dash.column_dimensions["C"].width = 30
    ws_dash.column_dimensions["D"].width = 25
    ws_dash.column_dimensions["E"].width = 32
    ws_dash.column_dimensions["F"].width = 16
    ws_dash.column_dimensions["G"].width = 18
    ws_dash.column_dimensions["H"].width = 18

    # =========================================================================
    # TAB 2: 01_Trang_Chu
    # =========================================================================
    ws_home = wb.create_sheet(title="01_Trang_Chu")
    setup_sheet_header(ws_home, "Trang Chủ", "/", "16 Ảnh + 1 Video + Feedback")

    home_rows = [
        {"is_section_header": True, "title": "Section 1: Hero Màn hình đầu tiên (HomeHero)"},
        (1, "laka-home-hero-desktop.webp", "Hero Banner Fullscreen (Desktop)", "Ảnh Banner", "2560 x 1440", "16:9", "Toàn cảnh LAKA từ trên cao (Flycam) nhìn thấy hồ, thung lũng sương mù, rừng thông lúc bình minh nắng sớm. Tĩnh lặng, khoáng đạt.", "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Ảnh đại diện trang chủ"),
        (2, "laka-home-hero-mobile.webp", "Hero Banner Fullscreen (Mobile)", "Ảnh Banner", "1080 x 1920", "9:16", "Góc flycam đứng dọc ôm trọn mặt hồ nước xanh biếc và đồi thông mây phủ.", "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Tối ưu cho smartphone"),
        (3, "laka-hero-ambient.mp4", "Hero Background Video (Tùy chọn)", "Video Clip", "1920 x 1080", "16:9", "Clip flycam lướt êm 10-15s, không tiếng, chuyển động êm đềm, nén nhẹ dưới 8MB.", "P3 - Nâng cao", "Chưa quay", "Media Team", "Video loop trang chủ"),

        {"is_section_header": True, "title": "Section 2: Sứ mệnh & Câu chuyện (HomeBrandStory - #gioi-thieu)"},
        (4, "laka-story-window.webp", "Thẻ ảnh nổi trung tâm", "Ảnh Thẻ", "1600 x 1200", "4:3", "Khung kính lớn nhìn ra thiên nhiên, có tách trà/cà phê nóng bên bậu cửa sổ gỗ mộc mạc, hoặc người ngồi ngắm cảnh.", "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Ảnh minh họa sứ mệnh"),

        {"is_section_header": True, "title": "Section 3: Bộ sưu tập Lưu trú (HomeLandscapeCollections - #bo-suu-tap-luu-tru)"},
        (5, "laka-col-nha-ben-ho.webp", "Thẻ 01: Nhà Bên Hồ", "Ảnh Thẻ", "1200 x 1600", "3:4", "Căn cabin sát mặt nước yên ả, phản chiếu bóng thông và mây trời.", "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Thẻ nhóm căn hồ"),
        (6, "laka-col-nha-giua-rung.webp", "Thẻ 02: Nhà Giữa Rừng", "Ảnh Thẻ", "1200 x 1600", "3:4", "Căn bungalow gỗ nép mình dưới tán thông già, có làn sương mờ mộc mạc.", "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Thẻ nhóm căn rừng"),
        (7, "laka-col-nha-tren-doi.webp", "Thẻ 03: Nhà Trên Đồi", "Ảnh Thẻ", "1200 x 1600", "3:4", "Villa Top Hill biệt lập trên đồi cao nhìn bao quát toàn bộ thung lũng.", "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Thẻ nhóm căn đồi"),

        {"is_section_header": True, "title": "Section 4: Ba hệ cảnh quan (HomeLandscapeReveal - #he-canh-quan)"},
        (8, "laka-zone-lake-reveal.webp", "Dải cảnh quan: Ven Hồ", "Ảnh Dải rộng", "1080 x 1600", "3:4 / 9:16", "Cảnh quan mặt nước hồ lớn, cầu gỗ, thuyền kayak lướt êm.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Hiệu ứng mở rộng hover"),
        (9, "laka-zone-forest-reveal.webp", "Dải cảnh quan: Rừng Thông", "Ảnh Dải rộng", "1080 x 1600", "3:4 / 9:16", "Đại ngàn rừng thông, thảm cỏ xanh, lối đi dạo bậc đá.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Hiệu ứng mở rộng hover"),
        (10, "laka-zone-hill-reveal.webp", "Dải cảnh quan: Đỉnh Đồi", "Ảnh Dải rộng", "1080 x 1600", "3:4 / 9:16", "Đồi cao lộng gió, biển mây bay qua thung lũng lúc sáng sớm.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Hiệu ứng mở rộng hover"),

        {"is_section_header": True, "title": "Section 5: Căn nhà nổi bật (HomeStaySpotlight - #luu-tru-noi-bat)"},
        (11, "laka-spotlight-hero.webp", "Ảnh toàn cảnh căn tiêu biểu", "Ảnh Toàn cảnh", "2560 x 1440", "16:9", "Góc chụp đẹp nhất lúc hoàng hôn hoặc chạng vạng lên đèn của Cabin Vô Cực hoặc Villa Top Hill.", "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Spotlight trang chủ"),

        {"is_section_header": True, "title": "Section 6: Một ngày ở LAKA (HomeDayJourney - #mot-ngay)"},
        (12, "laka-journey-morning.webp", "Chặng 01: Sáng sớm", "Ảnh Đứng", "1080 x 1350", "4:5", "Trận đấu Pickleball đầy hứng khởi đón nắng mai hoặc ngắm bình minh trên hồ.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Có người thật tương tác"),
        (13, "laka-journey-noon.webp", "Chặng 02: Buổi trưa", "Ảnh Đứng", "1080 x 1350", "4:5", "Chèo thuyền kayak đôi trên mặt hồ xanh mát hoặc thư giãn tại bể bơi bốn mùa.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Có người thật tương tác"),
        (14, "laka-journey-afternoon.webp", "Chặng 03: Buổi chiều", "Ảnh Đứng", "1080 x 1350", "4:5", "Đạp xe dạo quanh cung đường đồi thông hoặc ngồi nhâm nhi trà chiều ngắm mây.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Có người thật tương tác"),
        (15, "laka-journey-night.webp", "Chặng 04: Buổi tối", "Ảnh Đứng", "1080 x 1350", "4:5", "Bếp nướng BBQ nghi ngút khói hoặc quây quần bên đống lửa trại rực ấm.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Có người thật tương tác"),

        {"is_section_header": True, "title": "Section 7: Ẩm thực & Bếp nhà (HomeDiningPreview - #bep-nha)"},
        (16, "laka-dining-bbq.webp", "Món 01: Mẹt nướng BBQ", "Ảnh Ngang", "1600 x 1000", "16:10", "Mẹt gà đồi nướng than hoa, xiên thịt nướng thơm lừng bên bếp than hồng.", "P2 - Quan trọng", "Chưa chụp", "Bếp + Media", "Chụp thực tế món"),
        (17, "laka-dining-hotpot.webp", "Món 02: Lẩu ấm sương mù", "Ảnh Ngang", "1600 x 1000", "16:10", "Nồi lẩu gà lá é/lẩu riêu cua bốc hơi nghi ngút, đĩa đồ nhúng tươi sạch.", "P2 - Quan trọng", "Chưa chụp", "Bếp + Media", "Chụp thực tế món"),
        (18, "laka-dining-cafe.webp", "Món 03: Cà phê tầng mây", "Ảnh Ngang", "1600 x 1000", "16:10", "Ly cà phê/cold brew đặt trên bàn gỗ ban công, hậu cảnh là mây và rừng thông.", "P2 - Quan trọng", "Chưa chụp", "Bếp + Media", "Chụp thực tế món"),

        {"is_section_header": True, "title": "Section 8: Cảm nhận khách hàng (HomeGuestStories - #cam-nhan)"},
        (19, "feedback-khach-hang.doc", "Nội dung nhận xét thực tế", "Nội dung Text", "Văn bản", "N/A", "4-6 Lời nhận xét thật của khách hàng từng lưu trú (Tên khách, loại đoàn, căn ở).", "P2 - Quan trọng", "Đang có bản nháp", "Content Team", "Thay thế text mẫu")
    ]
    populate_rows(ws_home, home_rows)

    # =========================================================================
    # TAB 3: 02_Luu_Tru_8_Dong_Can
    # =========================================================================
    ws_stays = wb.create_sheet(title="02_Luu_Tru_8_Dong_Can")
    setup_sheet_header(ws_stays, "Lưu Trú (8 Dòng căn / 20 Căn thực tế)", "/luu-tru", "62 Ảnh chi tiết")

    stay_rows = []

    # 8 Home types config
    stay_types = [
        ("01", "Guest House (Căn 001 · 1 căn · 35m² · 5 giường · tối đa 10 khách)", "guest-house", [
            ("laka-stay-gh-01-cover.webp", "Ảnh Bìa / Đại diện", "1600 x 1200", "4:3", "Góc toàn cảnh căn Guest House 001 nép mình bên hồ lớn lúc sáng sớm."),
            ("laka-stay-gh-02-beds.webp", "Gallery: 5 Giường ngủ", "2000 x 1333", "3:2", "Toàn cảnh không gian 5 giường đôi rộng rãi, chăn nệm phẳng phiu sạch sẽ."),
            ("laka-stay-gh-03-window.webp", "Gallery: Cửa sổ view hồ", "2000 x 1333", "3:2", "Khung kính mở nhìn ra mặt nước mênh mông và đồi núi xa."),
            ("laka-stay-gh-04-bathroom.webp", "Gallery: WC khép kín", "2000 x 1333", "3:2", "Phòng tắm và vệ sinh khép kín, tiện nghi, vòi sen nước nóng."),
            ("laka-stay-gh-05-porch.webp", "Gallery: Hiên ngồi ngoài trời", "2000 x 1333", "3:2", "Bộ bàn ghế uống trà bên hiên nhà hóng gió hồ."),
            ("laka-stay-gh-06-night.webp", "Gallery: Căn lên đèn về đêm", "2000 x 1333", "3:2", "Ánh đèn vàng ấm cúng bên trong căn phản chiếu xuống mặt nước ban đêm.")
        ]),
        ("02", "Forest Lake Suite (Căn 006–011 · 6 căn · 25m² · 1 giường lớn · view hồ)", "forest-lake-suite", [
            ("laka-stay-fls-01-cover.webp", "Ảnh Bìa / Đại diện", "1600 x 1200", "4:3", "Mặt tiền căn suite kính hiện đại ven hồ."),
            ("laka-stay-fls-02-bed-view.webp", "Gallery: Giường view kính kịch trần", "2000 x 1333", "3:2", "Mặt kính lớn ôm trọn cảnh sắc thiên nhiên, nằm trên giường ngắm mây hồ."),
            ("laka-stay-fls-03-interior.webp", "Gallery: Bàn trang điểm & nội thất", "2000 x 1333", "3:2", "Bàn trang điểm, tủ quần áo, điều hòa, ấm siêu tốc."),
            ("laka-stay-fls-04-bathroom.webp", "Gallery: Phòng tắm khép kín", "2000 x 1333", "3:2", "Nhà vệ sinh sạch sẽ, trang bị máy sấy, khăn tắm tiêu chuẩn."),
            ("laka-stay-fls-05-balcony.webp", "Gallery: Ban công ngắm hồ", "2000 x 1333", "3:2", "Bàn ghế ngoài trời đón gió hồ buổi sớm mai."),
            ("laka-stay-fls-06-dawn.webp", "Gallery: Bình minh qua ô kính", "2000 x 1333", "3:2", "Ánh nắng ban mai xuyên qua tán cây và mặt kính vào phòng.")
        ]),
        ("03", "Forest Lake Bathtub Suite / Cabin Vô Cực (Căn 014–017 · 4 căn · Bồn tắm 180°)", "bathtub-suite", [
            ("laka-stay-bts-01-cover.webp", "Ảnh Bìa / Đại diện", "1600 x 1200", "4:3", "Kiến trúc độc đáo của Cabin Vô Cực nhô ra hướng hồ."),
            ("laka-stay-bts-02-bathtub-hero.webp", "Gallery: BỒN TẮM NGÂM VIEW HỒ 180°", "2000 x 1333", "3:2", "GÓC ĐINH: Bồn tắm ngâm mình thư giãn đặt sát 2 mặt kính 180° ngắm toàn cảnh hồ."),
            ("laka-stay-bts-03-bed.webp", "Gallery: Giường ngủ kính góc", "2000 x 1333", "3:2", "Giường đôi cao cấp với tầm nhìn Panorama không góc chết."),
            ("laka-stay-bts-04-details.webp", "Gallery: Chi tiết ngâm bồn", "2000 x 1333", "3:2", "Set khăn tắm, nến thơm, hoa hoặc muối khoáng ngâm bồn."),
            ("laka-stay-bts-05-sunset.webp", "Gallery: Hoàng hôn trên bồn tắm", "2000 x 1333", "3:2", "Ánh hoàng hôn tím vàng chiếu qua cửa kính vào bồn tắm."),
            ("laka-stay-bts-06-night.webp", "Gallery: Không gian lãng mạn đêm", "2000 x 1333", "3:2", "Đèn ấm lung linh lãng mạn dành riêng cho kỳ nghỉ cặp đôi.")
        ]),
        ("04", "Lake Suite / Cabin An Trú (Căn 004–005 · 2 căn · 25m² · Cửa sổ vuông tĩnh lặng)", "lake-suite", [
            ("laka-stay-ls-01-cover.webp", "Ảnh Bìa / Đại diện", "1600 x 1200", "4:3", "Ngoại cảnh cabin mộc mạc bên hồ nước tĩnh lặng."),
            ("laka-stay-ls-02-frame-window.webp", "Gallery: Khung cửa kính như tranh", "2000 x 1333", "3:2", "Ô cửa kính vuông vức thu trọn sắc xanh mặt nước và núi non."),
            ("laka-stay-ls-03-bed.webp", "Gallery: Giường ngủ an yên", "2000 x 1333", "3:2", "Không gian nghỉ ngơi ấm áp, tách biệt ồn ào."),
            ("laka-stay-ls-04-bathroom.webp", "Gallery: Phòng tắm khép kín", "2000 x 1333", "3:2", "WC tiện nghi, sạch sẽ."),
            ("laka-stay-ls-05-teatime.webp", "Gallery: Góc thưởng trà", "2000 x 1333", "3:2", "Góc bàn nhỏ thưởng trà đọc sách bên cửa sổ.")
        ]),
        ("05", "Bungalow (Căn 002–003 · 2 căn · 15m² · 2 Tầng gác xép gỗ · 5–7 khách)", "bungalow", [
            ("laka-stay-bg-01-cover.webp", "Ảnh Bìa / Đại diện", "1600 x 1200", "4:3", "Mặt tiền Bungalow mái dốc gỗ sáng màu đối diện hồ lớn."),
            ("laka-stay-bg-02-living-loft.webp", "Gallery: Toàn cảnh trệt & cầu thang", "2000 x 1333", "3:2", "Góc nhìn thấy tầng trệt, cầu thang gỗ và gác xép xinh xắn."),
            ("laka-stay-bg-03-loft-bed.webp", "Gallery: Phòng ngủ gác xép", "2000 x 1333", "3:2", "Không gian nệm ngủ trên gác xép gỗ ấm cúng, trần dốc đáng yêu."),
            ("laka-stay-bg-04-lower-bed.webp", "Gallery: Giường ngủ tầng trệt", "2000 x 1333", "3:2", "Giường lớn tầng 1 và giá treo đồ."),
            ("laka-stay-bg-05-bathroom.webp", "Gallery: Phòng tắm", "2000 x 1333", "3:2", "Nhà vệ sinh khép kín tầng trệt."),
            ("laka-stay-bg-06-family.webp", "Gallery: Không gian gia đình", "2000 x 1333", "3:2", "Không gian sum vầy ấm cúng của gia đình có trẻ nhỏ.")
        ]),
        ("06", "Cabin Group (Căn 012–013 · 2 căn · 30m² · 7 Giường tầng · tối đa 14 khách)", "cabin-group", [
            ("laka-stay-cg-01-cover.webp", "Ảnh Bìa / Đại diện", "1600 x 1200", "4:3", "Căn cabin cộng đồng nép mình giữa rừng thông."),
            ("laka-stay-cg-02-bunk-beds.webp", "Gallery: Hệ 7 giường tầng", "2000 x 1333", "3:2", "Hệ giường tầng gỗ ngăn nắp, bậc thang vững chãi, nệm riêng từng ô."),
            ("laka-stay-cg-03-windows.webp", "Gallery: 4 Ô kính view thông", "2000 x 1333", "3:2", "Các khung cửa kính lấy sáng ngắm tán cây rừng thông xanh mát."),
            ("laka-stay-cg-04-bathroom.webp", "Gallery: Khu vệ sinh", "2000 x 1333", "3:2", "Nhà vệ sinh đáp ứng cho đoàn đông người."),
            ("laka-stay-cg-05-group-chill.webp", "Gallery: Khu sinh hoạt đoàn", "2000 x 1333", "3:2", "Không gian ngồi trò chuyện, gắn kết cả nhóm.")
        ]),
        ("07", "Lake Suite Giữa Rừng (Căn 018–019 · 2 căn · 25m² · Nép dưới rừng thông)", "lake-suite-forest", [
            ("laka-stay-lsf-01-cover.webp", "Ảnh Bìa / Đại diện", "1600 x 1200", "4:3", "Cabin gỗ ẩn mình dưới những thân thông cao vút."),
            ("laka-stay-lsf-02-bed-view.webp", "Gallery: Giường ngủ view rừng", "2000 x 1333", "3:2", "Khung kính nhìn ra đồi thông nguyên sơ, đón gió ngàn."),
            ("laka-stay-lsf-03-interior.webp", "Gallery: Tiện nghi phòng", "2000 x 1333", "3:2", "Bàn trang điểm, điều hòa, ấm siêu tốc, tủ đồ."),
            ("laka-stay-lsf-04-bathroom.webp", "Gallery: WC khép kín", "2000 x 1333", "3:2", "Phòng tắm sạch sẽ, tiện nghi."),
            ("laka-stay-lsf-05-porch.webp", "Gallery: Hiên gỗ giữa rừng", "2000 x 1333", "3:2", "Hiên gỗ mộc thưởng trà giữa tiếng thông reo rì rào.")
        ]),
        ("08", "Villa Top Hill (Căn 020 · 1 căn · 35m² + Sân lớn · 15–20 khách)", "villa-top-hill", [
            ("laka-stay-vth-01-cover.webp", "Ảnh Bìa / Đại diện", "1600 x 1200", "4:3", "Toàn cảnh Villa Top Hill trên đỉnh đồi nhìn xuống thung lũng."),
            ("laka-stay-vth-02-outdoor-patio.webp", "Gallery: SÂN TIỆC NGOÀI TRỜI VIEW PANORAMA", "2000 x 1333", "3:2", "Sân lớn ngoài trời tổ chức tiệc BBQ, ngắm trọn hồ và mây trời."),
            ("laka-stay-vth-03-living-room.webp", "Gallery: Phòng khách rộng rãi", "2000 x 1333", "3:2", "Sofa, tivi, bàn trà không gian sinh hoạt chung lớn."),
            ("laka-stay-vth-04-bedroom-5beds.webp", "Gallery: Phòng ngủ 5 giường", "2000 x 1333", "3:2", "Không gian 5 giường ngủ sạch sẽ cho đoàn 15-20 người."),
            ("laka-stay-vth-05-bbq-kitchen.webp", "Gallery: Khu vực bếp nướng BBQ", "2000 x 1333", "3:2", "Bếp nướng, tủ lạnh, bàn ăn gia đình."),
            ("laka-stay-vth-06-night-villa.webp", "Gallery: Villa lung linh về đêm", "2000 x 1333", "3:2", "Đỉnh đồi sáng rực ánh đèn, đoàn quây quần ăn tiệc đêm.")
        ])
    ]

    stt_counter = 1
    for stt_sec, type_title, folder, photos in stay_types:
        stay_rows.append({"is_section_header": True, "title": f"Dòng căn {stt_sec}: {type_title}"})
        for f_name, comp_name, dims, asp, desc in photos:
            prio = "P1 - Cốt lõi" if ("cover" in f_name or "hero" in f_name or "patio" in f_name) else "P2 - Quan trọng"
            stay_rows.append((
                stt_counter,
                f_name,
                f"Thư mục: public/images/stays/{folder}/",
                comp_name,
                dims,
                asp,
                desc,
                prio,
                "Chưa chụp",
                "Media Team",
                f"Ảnh thực tế {folder}"
            ))
            stt_counter += 1

    populate_rows(ws_stays, stay_rows)

    # =========================================================================
    # TAB 4: 03_Trai_Nghiem
    # =========================================================================
    ws_exp = wb.create_sheet(title="03_Trai_Nghiem")
    setup_sheet_header(ws_exp, "Trải Nghiệm", "/trai-nghiem", "8 Ảnh hoạt động + 4 Nhật ký")

    exp_rows = [
        {"is_section_header": True, "title": "Banner Hero Trang Trải Nghiệm"},
        (1, "laka-banner-exp-bg.webp", "Banner Hero Vòm Nền", "Ảnh Banner", "2560 x 1440", "16:9", "Mặt hồ lấp lánh nắng sớm, đồi núi trập trùng phía xa.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Nền banner trang"),
        (2, "laka-banner-exp-card.webp", "Banner Hero Thẻ 3D Nổi", "Ảnh Thẻ 3D", "1000 x 1300", "4:5.2", "Mũi thuyền kayak rẽ nước trên hồ hoặc vợt Pickleball trên sân nắng.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Thẻ card banner"),

        {"is_section_header": True, "title": "Danh mục 6 Hoạt động thể thao & giải trí (TemplateExperienceCatalog)"},
        (3, "laka-act-pickleball.webp", "Thẻ 01: Pickleball Bật Mood", "Ảnh Thẻ", "1200 x 1500", "4:5", "Khách đang đánh bóng trên sân Pickleball ngoài trời rợp nắng.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Ảnh chụp có khách"),
        (4, "laka-act-kayak.webp", "Thẻ 02: Lướt Hồ Cùng Kayak", "Ảnh Thẻ", "1200 x 1500", "4:5", "2 người mặc áo phao chèo thuyền kayak rẽ sóng trên hồ xanh.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Ảnh chụp có khách"),
        (5, "laka-act-pool.webp", "Thẻ 03: Thư giãn Bể Bơi Bốn Mùa", "Ảnh Thẻ", "1200 x 1500", "4:5", "Bể bơi công nghệ tự nhiên, khách thả lỏng ngắm mây trời.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Ảnh chụp có khách"),
        (6, "laka-act-cycling.webp", "Thẻ 04: Đạp xe Rong Ruổi", "Ảnh Thẻ", "1200 x 1500", "4:5", "Khách đạp xe qua những con đường làng quanh co và đồi thông.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Ảnh chụp có khách"),
        (7, "laka-act-boardgame.webp", "Thẻ 05: Board Game rộn rã", "Ảnh Thẻ", "1200 x 1500", "4:5", "Bàn chơi Ma sói / Uno / Rút gỗ tiếng cười rộn rã.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Ảnh chụp nhóm bạn"),
        (8, "laka-act-billiards.webp", "Thẻ 06: Bida giải trí", "Ảnh Thẻ", "1200 x 1500", "4:5", "Khách ngắm cơ đánh những đường bi đẹp mắt trên bàn bi-a LAKA.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Ảnh phòng giải trí"),

        {"is_section_header": True, "title": "Thông tin & Quy định an toàn vận hành"},
        (9, "quy-dinh-kayak-boi.doc", "Quy định an toàn mặt nước", "Nội dung Text", "Văn bản", "N/A", "Thời gian mở cửa bể bơi, quy định bắt buộc mặc áo phao khi chèo thuyền kayak.", "P1 - Cốt lõi", "Chờ văn bản", "Vận hành", "Hiển thị tại khu vực chơi")
    ]
    populate_rows(ws_exp, exp_rows)

    # =========================================================================
    # TAB 5: 04_Dich_Vu_Su_Kien
    # =========================================================================
    ws_srv = wb.create_sheet(title="04_Dich_Vu_Su_Kien")
    setup_sheet_header(ws_srv, "Dịch Vụ & Sự Kiện Đoàn", "/dich-vu", "5 Ảnh + Nội dung vận hành")

    srv_rows = [
        {"is_section_header": True, "title": "Banner Hero Trang Dịch Vụ"},
        (1, "laka-banner-services-bg.webp", "Banner Hero Vòm Nền", "Ảnh Banner", "2560 x 1440", "16:9", "Đường nội khu rợp bóng cây xanh của LAKA.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Nền banner"),
        (2, "laka-banner-services-card.webp", "Banner Hero Thẻ 3D Nổi", "Ảnh Thẻ 3D", "1000 x 1300", "4:5.2", "Khay trà ấm mộc mạc hoặc chi tiết sảnh tiếp đón.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Thẻ card banner"),

        {"is_section_header": True, "title": "Khoảnh khắc đặc biệt & Dịch vụ đoàn (SpecialMoments)"},
        (3, "laka-moment-teambuilding.webp", "Team Building ngoài trời", "Ảnh Ngang", "1600 x 1000", "16:10", "Sân chơi team building 100m² rợp bóng cây, các trò chơi gắn kết đồng đội.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Có người thật"),
        (4, "laka-moment-stage.webp", "Sân khấu ca nhạc ngoài trời", "Ảnh Ngang", "1600 x 1000", "16:10", "Sân khấu 100m² lên đèn ban đêm, ban nhạc acoustic hoặc ca sĩ đang biểu diễn.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Đêm ca nhạc LAKA"),
        (5, "laka-moment-campfire.webp", "Đêm lửa trại quây quần", "Ảnh Ngang", "1600 x 1000", "16:10", "Đoàn khách ngồi quanh đống lửa ấm áp bập bùng, ánh lửa soi sáng gương mặt.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Đêm lửa trại"),

        {"is_section_header": True, "title": "Tiện ích cơ sở vật chất dùng chung (Facilities)"},
        (6, "laka-fac-parking.webp", "Bãi đỗ xe rộng rãi", "Ảnh Ngang", "1600 x 1000", "16:10", "Bãi xe ô tô rộng rãi, đỗ được xe 16 đến 45 chỗ thoải mái.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Minh chứng bãi xe lớn"),
        (7, "laka-fac-reception.webp", "Quầy trợ lý lưu trú đón khách", "Ảnh Ngang", "1600 x 1000", "16:10", "Sảnh đón tiếp và nhân viên hỗ trợ khách nhận căn nhẹ nhàng, chu đáo.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Chăm sóc khách"),

        {"is_section_header": True, "title": "Nội dung vận hành sự kiện cần xác nhận"},
        (8, "chi-phi-su-kien-doan.doc", "Bảng giá & Quy định sự kiện", "Nội dung Text", "Văn bản", "N/A", "Chi phí gói âm thanh loa mic ngoài trời, giới nghiêm âm lượng trước 22:00.", "P1 - Cốt lõi", "Chờ chốt giá", "Vận hành", "Báo giá cho khách đoàn")
    ]
    populate_rows(ws_srv, srv_rows)

    # =========================================================================
    # TAB 6: 05_Am_Thuc_Cafe
    # =========================================================================
    ws_din = wb.create_sheet(title="05_Am_Thuc_Cafe")
    setup_sheet_header(ws_din, "Ẩm Thực & Bàn Tiệc", "/am-thuc", "6 Ảnh món + 10 Trang Menu Scan")

    din_rows = [
        {"is_section_header": True, "title": "Banner Hero Trang Ẩm Thực"},
        (1, "laka-banner-dining-bg.webp", "Banner Hero Vòm Nền", "Ảnh Banner", "2560 x 1440", "16:9", "Không gian nhà hàng ven hồ lúc lên đèn hoàng hôn ấm áp.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Nền banner"),
        (2, "laka-banner-dining-card.webp", "Banner Hero Thẻ 3D Nổi", "Ảnh Thẻ 3D", "1000 x 1300", "4:5.2", "Mẹt thịt nướng xèo xèo đượm than hồng hoặc đĩa gà nướng thơm lừng.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Thẻ card banner"),

        {"is_section_header": True, "title": "Thực đơn Nhà hàng LAKA (Đã có sẵn trong Codebase)"},
        (3, "01-nuong-bbq.webp -> 10-do-uong.webp", "10 Trang scan menu thực tế", "Ảnh Scan", "992 x 1404", "A4 đứng", "ĐÃ CÓ ĐỦ 10 TRANG VẼ TAY: Mẹt nướng BBQ, Combo nhóm, Lẩu nhúng, Khai vị, Thịt gia cầm, Cá nước ngọt, Hải sản, Đặc sản đặt trước, Cơm nhà, Đồ uống.", "P1 - Cốt lõi", "Đã có sẵn 100%", "Đã hoàn thành", "public/images/dining/restaurant/"),

        {"is_section_header": True, "title": "Ảnh món ăn thực tế đã chế biến (Kích thích vị giác)"},
        (4, "laka-dish-bbq-platter.webp", "Mẹt nướng gà đồi & thịt xiên", "Ảnh Món", "1600 x 1000", "16:10", "Mẹt đồ nướng đầy đặn bên bếp than hồng và rau xanh tươi.", "P2 - Quan trọng", "Chưa chụp", "Bếp + Media", "Chụp món thật"),
        (5, "laka-dish-hotpot.webp", "Nồi lẩu nóng bốc khói", "Ảnh Món", "1600 x 1000", "16:10", "Nồi lẩu gà lá é/lẩu riêu cua bốc hơi nghi ngút giữa khí trời se lạnh.", "P2 - Quan trọng", "Chưa chụp", "Bếp + Media", "Chụp món thật"),
        (6, "laka-dish-breakfast-set.webp", "Khay điểm tâm sáng kèm phòng", "Ảnh Món", "1600 x 1000", "16:10", "Bữa sáng miễn phí tiêu chuẩn: Bát phở/bún/bánh mì ốp la + hoa quả + nước ép.", "P2 - Quan trọng", "Chưa chụp", "Bếp + Media", "Chụp món thật"),
        (7, "laka-dish-special-order.webp", "Món đặc sản đặt trước", "Ảnh Món", "1600 x 1000", "16:10", "Cá hồ nướng hoặc gà nướng mắc khén nguyên con hấp dẫn.", "P2 - Quan trọng", "Chưa chụp", "Bếp + Media", "Chụp món thật"),

        {"is_section_header": True, "title": "Tiệm Cà Phê Tầng Mây (Đang chờ Menu)"},
        (8, "laka-cafe-menu.doc / webp", "Thực đơn & Đơn giá Cafe", "Nội dung Text", "Danh mục", "N/A", "Bảng giá đồ uống: Cà phê phin, cold brew, trà thảo mộc, sinh tố, nước ép.", "P1 - Cốt lõi", "Chưa có menu", "Quầy Bar / Cafe", "Cần cung cấp sớm"),
        (9, "laka-cafe-space.webp", "Không gian tiệm cafe tầng mây", "Ảnh Không gian", "1600 x 1000", "16:10", "Góc view ngắm mây và rừng thông tuyệt đẹp từ quán cafe.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Ảnh không gian cafe")
    ]
    populate_rows(ws_din, din_rows)

    # =========================================================================
    # TAB 7: 06_Ve_LAKA_Brand
    # =========================================================================
    ws_abt = wb.create_sheet(title="06_Ve_LAKA_Brand")
    setup_sheet_header(ws_abt, "Về LAKA", "/ve-laka", "3 Ảnh + 1 Bài viết Brand Story")

    abt_rows = [
        {"is_section_header": True, "title": "Banner Hero Trang Giới Thiệu"},
        (1, "laka-banner-about-bg.webp", "Banner Hero Vòm Nền", "Ảnh Banner", "2560 x 1440", "16:9", "Rừng thông đại ngàn trùng điệp bao bọc lấy thung lũng LAKA.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Nền banner"),
        (2, "laka-banner-about-card.webp", "Banner Hero Thẻ 3D Nổi", "Ảnh Thẻ 3D", "1000 x 1300", "4:5.2", "Biển tên LAKA khắc gỗ mộc mạc hoặc logo LAKA bằng gốm/đồng.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Thẻ card banner"),

        {"is_section_header": True, "title": "Bài viết Câu chuyện thương hiệu (Brand Story)"},
        (3, "laka-brand-story.doc", "Câu chuyện ra đời của LAKA", "Nội dung Text", "200 từ", "N/A", "Ý nghĩa cái tên 'LAKA', nguồn cảm hứng xây dựng khu nghỉ dưỡng ven hồ Dốc Dây Diều, thông điệp về sự an yên và gắn kết tình thân.", "P1 - Cốt lõi", "Chờ viết chính thức", "Chủ nhà / Content", "Thay thế nội dung demo"),
        (4, "laka-brand-founder.webp", "Ảnh nhà sáng lập hoặc kiến trúc", "Ảnh Tư liệu", "1600 x 1200", "4:3", "Góc chụp tâm huyết về quá trình kiến tạo LAKA hoặc bức tranh tổng thể.", "P3 - Nâng cao", "Chưa có", "Media Team", "Tăng tính tin cậy")
    ]
    populate_rows(ws_abt, abt_rows)

    # =========================================================================
    # TAB 8: 07_Thong_Tin_FAQ
    # =========================================================================
    ws_faq = wb.create_sheet(title="07_Thong_Tin_FAQ")
    setup_sheet_header(ws_faq, "Thông Tin Cần Biết & FAQ", "/thong-tin, /faq", "2 Ảnh + Bảng thông số vận hành")

    faq_rows = [
        {"is_section_header": True, "title": "Banner Hero Trang Thông Tin & FAQ"},
        (1, "laka-banner-info-bg.webp", "Banner Hero Vòm Nền", "Ảnh Banner", "2560 x 1440", "16:9", "Sảnh đón tiếp LAKA trong nắng sớm.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Nền banner"),
        (2, "laka-banner-info-card.webp", "Banner Hero Thẻ 3D Nổi", "Ảnh Thẻ 3D", "1000 x 1300", "4:5.2", "Chiếc chìa khóa gỗ đánh số phòng hoặc thẻ đón tiếp khách.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Thẻ card banner"),

        {"is_section_header": True, "title": "Thông số vận hành cốt lõi cần chốt"},
        (3, "thong-tin-checkin.txt", "Giờ nhận & trả phòng", "Nội dung Text", "Thông số", "N/A", "Xác nhận giờ Check-in (14:00) và Check-out (12:00 trưa hôm sau). Mức phí nhận sớm/trả muộn nếu có.", "P1 - Cốt lõi", "Chờ chốt", "Vận hành", "Thông số quan trọng"),
        (4, "thong-tin-tre-em.txt", "Chính sách trẻ em & phụ thu", "Nội dung Text", "Thông số", "N/A", "Độ tuổi trẻ em được miễn phí (dưới 6 tuổi?). Phí phụ thu kê thêm đệm/ăn sáng cho người thứ 3.", "P1 - Cốt lõi", "Chờ chốt", "Vận hành", "Tránh tranh chấp"),
        (5, "thong-tin-thu-cung.txt", "Quy định mang thú cưng", "Nội dung Text", "Quy định", "N/A", "Có cho phép mang chó mèo (Pet-friendly) không? Điều kiện mang thú cưng và phí vệ sinh nếu có.", "P2 - Quan trọng", "Chờ chốt", "Vận hành", "Khách hỏi thường xuyên"),
        (6, "thong-tin-vat.txt", "Chính sách xuất hóa đơn VAT", "Nội dung Text", "Tài chính", "N/A", "Giá phòng đã bao gồm VAT chưa? Thông tin xuất hóa đơn đỏ cho khách đoàn công ty.", "P2 - Quan trọng", "Chờ chốt", "Kế toán", "Khách công ty")
    ]
    populate_rows(ws_faq, faq_rows)

    # =========================================================================
    # TAB 9: 08_Chi_Duong_Ban_Do
    # =========================================================================
    ws_dir = wb.create_sheet(title="08_Chi_Duong_Ban_Do")
    setup_sheet_header(ws_dir, "Chỉ Đường & Bản Đồ", "/chi-duong", "3 Ảnh + 1 Bản đồ Master Plan")

    dir_rows = [
        {"is_section_header": True, "title": "Banner Hero Trang Chỉ Đường"},
        (1, "laka-banner-dir-bg.webp", "Banner Hero Vòm Nền", "Ảnh Banner", "2560 x 1440", "16:9", "Đoạn đường đèo thông reo uốn lượn dẫn vào Dốc Dây Diều.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Nền banner"),
        (2, "laka-banner-dir-card.webp", "Banner Hero Thẻ 3D Nổi", "Ảnh Thẻ 3D", "1000 x 1300", "4:5.2", "Cổng chào mộc mạc hoặc biển chỉ dẫn LAKA Homestay.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Thẻ card banner"),

        {"is_section_header": True, "title": "Tài nguyên chỉ dẫn đường đi thực tế"},
        (3, "laka-master-plan-map.webp", "Sơ đồ mặt bằng tổng thể (Master Plan)", "Bản vẽ 2D/3D", "2000 x 1400", "4:3 / 16:9", "Bản vẽ phối cảnh đánh dấu rõ: Cổng vào, Bãi xe, 20 căn (001-020), Hồ nước, Nhà hàng, Sân Pickleball, Bể bơi. Khách lưu về máy để tự định vị.", "P1 - Cốt lõi", "Chờ file thiết kế", "Kiến trúc sư / Thiết kế", "Rất hữu ích cho khách"),
        (4, "laka-gate-landmark.webp", "Mốc nhận diện cổng chào", "Ảnh Thực tế", "1600 x 1000", "16:10", "Ảnh chụp rõ lối rẽ từ đường lớn vào ngõ homestay tại Dốc Dây Diều (giúp lái xe không đi quá).", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Hướng dẫn lái xe"),
        (5, "huong-dan-lo-trinh.doc", "Hướng dẫn lộ trình di chuyển", "Nội dung Text", "Văn bản", "N/A", "Lộ trình chi tiết: 1. Tuyến ô tô qua Cầu Nhật Tân -> Cao tốc Nội Bài -> QL3 -> Dốc Dây Diều (khoảng 45 phút). 2. Tuyến xe máy.", "P2 - Quan trọng", "Đã có khung sườn", "Content Team", "Đã tích hợp GG Maps")
    ]
    populate_rows(ws_dir, dir_rows)

    # =========================================================================
    # TAB 10: 09_Chinh_Sach_Phap_Ly
    # =========================================================================
    ws_pol = wb.create_sheet(title="09_Chinh_Sach_Phap_Ly")
    setup_sheet_header(ws_pol, "Chính Sách & Điều Khoản", "/chinh-sach, /dieu-khoan, /bao-mat", "3 Ảnh nền + Thông số cọc & tài khoản")

    pol_rows = [
        {"is_section_header": True, "title": "Banner Hero các trang văn bản pháp lý"},
        (1, "laka-banner-policy-bg.webp", "Banner Nền Trang Chính Sách", "Ảnh Banner", "2560 x 1440", "16:9", "Góc vườn cỏ lát đá tĩnh lặng.", "P3 - Bổ trợ", "Chưa chụp", "Media Team", "Nền banner"),
        (2, "laka-banner-policy-card.webp", "Thẻ Card Trang Chính Sách", "Ảnh Thẻ 3D", "1000 x 1300", "4:5.2", "Tấm biển gỗ chỉ dẫn mộc mạc bên lối đi.", "P3 - Bổ trợ", "Chưa chụp", "Media Team", "Thẻ card"),

        {"is_section_header": True, "title": "Thông số Tài chính & Đặt cọc phòng bắt buộc"},
        (3, "chinh-sach-dat-coc.txt", "Tỷ lệ cọc khóa lịch", "Nội dung Text", "Tài chính", "N/A", "Quy định đặt cọc bao nhiêu % (ví dụ 50% tổng giá trị đơn đặt phòng để giữ chỗ).", "P1 - Cốt lõi", "Chờ chốt", "Quản lý / Kế toán", "Quy định bắt buộc"),
        (4, "chinh-sach-hoan-huy.txt", "Điều kiện hoàn / hủy cọc", "Nội dung Text", "Tài chính", "N/A", "Báo hủy trước 7 ngày: hoàn 100% hay bảo lưu trong 90 ngày? Báo hủy trước 3 ngày: hoàn bao nhiêu %? Hủy trong 24h: mất cọc.", "P1 - Cốt lõi", "Chờ chốt", "Quản lý / Kế toán", "Quy định bắt buộc"),
        (5, "tai-khoan-ngan-hang.txt", "Số tài khoản nhận cọc chính thức", "Nội dung Text", "Tài chính", "N/A", "Ngân hàng, Số tài khoản, Chủ tài khoản, Cú pháp chuyển khoản: [Họ tên] [SĐT] [Mã căn] [Ngày đi].", "P1 - Cốt lõi", "Chờ cung cấp STK", "Chủ homestay", "Hiển thị tại trang giữ chỗ")
    ]
    populate_rows(ws_pol, pol_rows)

    # =========================================================================
    # TAB 11: 10_Lien_He_Kenh_Chinh_Thuc
    # =========================================================================
    ws_cnt = wb.create_sheet(title="10_Lien_He_Kenh_Chinh_Thuc")
    setup_sheet_header(ws_cnt, "Liên Hệ & Kênh Chính Thức", "/lien-he", "2 Ảnh + Danh sách Hotline / Social")

    cnt_rows = [
        {"is_section_header": True, "title": "Banner Hero Trang Liên Hệ"},
        (1, "laka-banner-contact-bg.webp", "Banner Hero Vòm Nền", "Ảnh Banner", "2560 x 1440", "16:9", "Hoàng hôn buông ấm áp trên thung lũng LAKA.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Nền banner"),
        (2, "laka-banner-contact-card.webp", "Banner Hero Thẻ 3D Nổi", "Ảnh Thẻ 3D", "1000 x 1300", "4:5.2", "Góc bàn lễ tân thân mật hoặc ly nước chào đón khách.", "P2 - Quan trọng", "Chưa chụp", "Media Team", "Thẻ card"),

        {"is_section_header": True, "title": "Các kênh liên lạc tiếp nhận khách (Đã tích hợp trong Code)"},
        (3, "Hotline 24/7", "Số điện thoại nghe máy trực tiếp", "Kênh Thoại", "Số di động", "N/A", "Cần xác nhận số điện thoại chính thức để khách bấm gọi thẳng từ nút 'Gọi ngay'.", "P1 - Cốt lõi", "Cần kiểm tra số", "Quản lý", "Gắn toàn trang"),
        (4, "Zalo Official / Hotline", "Số Zalo nhận tin nhắn đặt phòng", "Kênh Zalo", "Số Zalo", "N/A", "Số điện thoại dùng để mở app Zalo chat nhanh khi khách cần tư vấn.", "P1 - Cốt lõi", "Cần kiểm tra số", "Quản lý", "Gắn toàn trang"),
        (5, "Facebook Fanpage", "https://www.facebook.com/LAKAHomestay/", "Social Fanpage", "Link chuẩn", "N/A", "ĐÃ TÍCH HỢP CHUẨN XÁC: LAKA Homestay", "P1 - Cốt lõi", "Đã có sẵn 100%", "Đã tích hợp", "src/shared/lib/public-contact.ts"),
        (6, "Instagram", "https://www.instagram.com/lakahomestay/", "Social Insta", "Link chuẩn", "N/A", "ĐÃ TÍCH HỢP CHUẨN XÁC: @lakahomestay", "P1 - Cốt lõi", "Đã có sẵn 100%", "Đã tích hợp", "src/shared/lib/public-contact.ts"),
        (7, "TikTok", "https://www.tiktok.com/@laka.homestay", "Social TikTok", "Link chuẩn", "N/A", "ĐÃ TÍCH HỢP CHUẨN XÁC: @laka.homestay", "P1 - Cốt lõi", "Đã có sẵn 100%", "Đã tích hợp", "src/shared/lib/public-contact.ts"),
        (8, "Google Maps", "https://maps.app.goo.gl/8MpEPu5WjE3Y268L6", "Bản đồ số", "Link maps", "N/A", "ĐÃ TÍCH HỢP CHUẨN XÁC: Vị trí ghim Dốc Dây Diều, Sóc Sơn", "P1 - Cốt lõi", "Đã có sẵn 100%", "Đã tích hợp", "src/shared/lib/public-contact.ts")
    ]
    populate_rows(ws_cnt, cnt_rows)

    # =========================================================================
    # TAB 12: 11_Banner_12_Trang_Con
    # =========================================================================
    ws_ban = wb.create_sheet(title="11_Banner_12_Trang_Con")
    setup_sheet_header(ws_ban, "Quy Chuẩn Banner 12 Trang Con", "Toàn bộ Subpages", "24 Ảnh (12 Nền + 12 Card)")

    subpages_banners = [
        ("01", "Lưu Trú (/luu-tru)", "laka-banner-stay-bg.webp", "laka-banner-stay-card.webp", "Vòm rừng thông sương mờ", "Cửa sổ kính cabin nhìn ra mặt hồ"),
        ("02", "Trải Nghiệm (/trai-nghiem)", "laka-banner-exp-bg.webp", "laka-banner-exp-card.webp", "Mặt hồ lấp lánh nắng sớm", "Mũi thuyền kayak rẽ nước trên hồ"),
        ("03", "Dịch Vụ (/dich-vu)", "laka-banner-services-bg.webp", "laka-banner-services-card.webp", "Con đường nội khu rợp bóng cây", "Khay trà gốm mộc mạc"),
        ("04", "Ẩm Thực (/am-thuc)", "laka-banner-dining-bg.webp", "laka-banner-dining-card.webp", "Không gian nhà hàng ven hồ", "Mẹt thịt nướng xèo xèo đượm than"),
        ("05", "Về LAKA (/ve-laka)", "laka-banner-about-bg.webp", "laka-banner-about-card.webp", "Rừng thông đại ngàn trùng điệp", "Logo LAKA khắc trên gỗ mộc"),
        ("06", "Thông Tin (/thong-tin)", "laka-banner-info-bg.webp", "laka-banner-info-card.webp", "Sảnh đón tiếp LAKA trong nắng", "Chiếc chìa khóa gỗ đánh số phòng"),
        ("07", "FAQ (/faq)", "laka-banner-faq-bg.webp", "laka-banner-faq-card.webp", "Không gian sảnh tiếp đón ấm cúng", "Góc hiên nhà đọc sách bình yên"),
        ("08", "Chỉ Đường (/chi-duong)", "laka-banner-dir-bg.webp", "laka-banner-dir-card.webp", "Cung đường đèo thông reo uốn lượn", "Cổng chào LAKA Dốc Dây Diều"),
        ("09", "Chính Sách (/chinh-sach)", "laka-banner-policy-bg.webp", "laka-banner-policy-card.webp", "Lối đi lát đá uốn quanh vườn", "Tấm biển gỗ chỉ dẫn mộc mạc"),
        ("10", "Điều Khoản (/dieu-khoan)", "laka-banner-terms-bg.webp", "laka-banner-terms-card.webp", "Mặt hồ phẳng lặng buổi sớm mai", "Góc ban công tĩnh lặng"),
        ("11", "Bảo Mật (/bao-mat)", "laka-banner-privacy-bg.webp", "laka-banner-privacy-card.webp", "Tán thông cao vút che chở", "Khung cửa sổ đóng hờ bình yên"),
        ("12", "Liên Hệ (/lien-he)", "laka-banner-contact-bg.webp", "laka-banner-contact-card.webp", "Hoàng hôn buông xuống thung lũng", "Bàn tiếp đón ấm cúng")
    ]

    ban_rows = []
    stt_b = 1
    for stt_p, p_name, bg_file, card_file, bg_desc, card_desc in subpages_banners:
        ban_rows.append({"is_section_header": True, "title": f"Trang {stt_p}: {p_name}"})
        ban_rows.append((stt_b, bg_file, f"Banner Vòm Nền ({p_name})", "Ảnh Banner", "2560 x 1440", "16:9", bg_desc, "P2 - Quan trọng", "Chưa chụp", "Media Team", "Vùng tối để chữ nổi bật"))
        stt_b += 1
        ban_rows.append((stt_b, card_file, f"Thẻ Card 3D Nổi ({p_name})", "Ảnh Thẻ 3D", "1000 x 1300", "4:5.2", card_desc, "P2 - Quan trọng", "Chưa chụp", "Media Team", "Ảnh chụp cận cảnh"))
        stt_b += 1

    populate_rows(ws_ban, ban_rows)

    # Save workbook
    output_filename = "LAKA_Homestay_Asset_Order_List.xlsx"
    wb.save(output_filename)
    print(f"Successfully generated: {output_filename}")

if __name__ == "__main__":
    create_laka_asset_order_workbook()
