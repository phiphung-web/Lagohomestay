# -*- coding: utf-8 -*-
"""
LAKA HOMESTAY — HỆ THỐNG ORDER TÀI NGUYÊN MEDIA & HÌNH ẢNH TOÀN DIỆN
- Xuất file Excel: LAKA_Homestay_Asset_Order_List.xlsx (Nhúng trực tiếp ảnh chụp vị trí UI thực tế)
- Xuất file HTML: LAKA_Homestay_Asset_Order_Sheet.html (Giao diện web trực quan, Lightbox xem ảnh vị trí)
- 100% Khớp với cấu trúc codebase thực tế (main-home.tsx, complete-template-site.tsx, etc.)
"""

import os
import sys
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.drawing.image import Image as OpenpyxlImage
from PIL import Image as PILImage

PROJECT_DIR = r"c:\Users\VHC\OneDrive\Máy tính\Code\lagohomestay"
SCREENSHOT_DIR = os.path.join(PROJECT_DIR, "public", "screenshots", "order")
THUMB_DIR = os.path.join(SCREENSHOT_DIR, "thumbs")
os.makedirs(THUMB_DIR, exist_ok=True)

def ensure_thumbnails():
    if not os.path.exists(SCREENSHOT_DIR):
        return
    for f in os.listdir(SCREENSHOT_DIR):
        if f.endswith(".jpg") and not f.startswith("thumb_"):
            src_p = os.path.join(SCREENSHOT_DIR, f)
            dst_p = os.path.join(THUMB_DIR, f)
            if not os.path.exists(dst_p):
                try:
                    im = PILImage.open(src_p)
                    im.thumbnail((160, 90))
                    im.save(dst_p, "JPEG", quality=85)
                except Exception as e:
                    print(f"Error creating thumbnail for {f}: {e}")

ensure_thumbnails()

# BẢNG MÀU LAKA HOMESTAY
FOREST = "16311C"       # Deep Forest Green (Brand Primary)
FOREST_LIGHT = "23482B" # Medium Forest Green
CREAM = "EAE1D2"        # Paper Cream background
SAND = "E7DED1"         # Sand border/accent
GOLD = "80613F"         # Antique Gold / Wood accent
WHITE = "FFFFFF"
GRAY_LIGHT = "F9F8F6"   # Alternating row
GRAY_BORDER = "D8D2C7"  # Clean border
RED_BG = "FDE8E8"
RED_TEXT = "9B1C1C"
GREEN_BG = "DEF7EC"
GREEN_TEXT = "03543F"
YELLOW_BG = "FEF08A"
YELLOW_TEXT = "854D0E"

# Fonts
font_title = Font(name="Segoe UI", size=14, bold=True, color=WHITE)
font_sub = Font(name="Segoe UI", size=9.5, italic=True, color=CREAM)
font_header = Font(name="Segoe UI", size=10, bold=True, color=WHITE)
font_section = Font(name="Segoe UI", size=10.5, bold=True, color=FOREST)
font_total = Font(name="Segoe UI", size=11, bold=True, color=FOREST)
font_total_num = Font(name="Segoe UI", size=11, bold=True, color=RED_TEXT)
font_data = Font(name="Segoe UI", size=9.5, color="1F2937")
font_data_bold = Font(name="Segoe UI", size=9.5, bold=True, color="111827")
font_qty_bold = Font(name="Segoe UI", size=11, bold=True, color=FOREST)
font_code = Font(name="Consolas", size=9.5, color="16311C")
font_fmt = Font(name="Consolas", size=9.5, bold=True, color="1E40AF")

# Fills
fill_title = PatternFill(start_color=FOREST, end_color=FOREST, fill_type="solid")
fill_header = PatternFill(start_color=FOREST, end_color=FOREST, fill_type="solid")
fill_section = PatternFill(start_color=SAND, end_color=SAND, fill_type="solid")
fill_total = PatternFill(start_color=CREAM, end_color=CREAM, fill_type="solid")
fill_zebra = PatternFill(start_color=GRAY_LIGHT, end_color=GRAY_LIGHT, fill_type="solid")
fill_white = PatternFill(start_color=WHITE, end_color=WHITE, fill_type="solid")
fill_p1 = PatternFill(start_color=RED_BG, end_color=RED_BG, fill_type="solid")
fill_p2 = PatternFill(start_color=YELLOW_BG, end_color=YELLOW_BG, fill_type="solid")
fill_p3 = PatternFill(start_color=GREEN_BG, end_color=GREEN_BG, fill_type="solid")

# Borders
thin_side = Side(border_style="thin", color=GRAY_BORDER)
border_data = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thin_side)
thick_bottom = Side(border_style="medium", color=FOREST)
border_header = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thick_bottom)
border_total_top = Side(border_style="thin", color=FOREST)
border_total_bottom = Side(border_style="double", color=FOREST)
border_total = Border(left=thin_side, right=thin_side, top=border_total_top, bottom=border_total_bottom)

# Alignments
align_center = Alignment(horizontal="center", vertical="center", wrap_text=True)
align_left = Alignment(horizontal="left", vertical="center", wrap_text=True)
align_right = Alignment(horizontal="right", vertical="center")
align_header = Alignment(horizontal="center", vertical="center", wrap_text=True)

# CỘT TIÊU CHUẨN
columns_standard = [
    ("STT", 6, align_center),
    ("Ảnh vị trí (Screenshot)", 24, align_center),
    ("Vị trí hiển thị trên Website (Section & Tọa độ UI thực tế)", 44, align_left),
    ("Mã tài nguyên (Tên file đề xuất)", 32, align_left),
    ("Hạng mục", 16, align_center),
    ("SL bàn giao (ảnh)", 15, align_center),
    ("Định dạng file", 14, align_center),
    ("Kích thước chuẩn (px)", 18, align_center),
    ("Tỷ lệ", 11, align_center),
    ("Mức độ ưu tiên", 14, align_center),
    ("Trạng thái", 15, align_center),
    ("Phụ trách", 14, align_center),
    ("Ghi chú / Link Driver", 24, align_left)
]

def setup_sheet_header(ws, page_name, page_url, total_summary_str):
    ws.views.sheetView[0].showGridLines = True
    num_cols = len(columns_standard)
    end_col_letter = get_column_letter(num_cols)

    ws.merge_cells(f"A1:{end_col_letter}1")
    cell1 = ws["A1"]
    cell1.value = f"LAKA HOMESTAY · DANH MỤC ORDER TÀI NGUYÊN — {page_name.upper()}"
    cell1.font = font_title
    cell1.fill = fill_title
    cell1.alignment = Alignment(horizontal="left", vertical="center", indent=1)
    ws.row_dimensions[1].height = 36

    ws.merge_cells(f"A2:{end_col_letter}2")
    cell2 = ws["A2"]
    cell2.value = f"Đường dẫn URL: {page_url}  |  Dự án: LAKA Homestay (Dốc Dây Diều, Sóc Sơn, Hà Nội)  |  Định mức: {total_summary_str}"
    cell2.font = font_sub
    cell2.fill = PatternFill(start_color=FOREST_LIGHT, end_color=FOREST_LIGHT, fill_type="solid")
    cell2.alignment = Alignment(horizontal="left", vertical="center", indent=1)
    ws.row_dimensions[2].height = 22

    ws.row_dimensions[3].height = 30
    for col_idx, (col_name, col_width, col_align) in enumerate(columns_standard, 1):
        cell = ws.cell(row=3, column=col_idx, value=col_name)
        cell.font = font_header
        cell.fill = fill_header
        cell.alignment = align_header
        cell.border = border_header
        col_letter = get_column_letter(col_idx)
        ws.column_dimensions[col_letter].width = col_width

    ws.freeze_panes = "A4"

def populate_sheet(ws, rows_data):
    current_row = 4
    num_cols = len(columns_standard)
    qty_cells = []

    for item in rows_data:
        if isinstance(item, dict) and item.get("is_section_header"):
            ws.merge_cells(start_row=current_row, start_column=1, end_row=current_row, end_column=num_cols)
            c = ws.cell(row=current_row, column=1, value=f"  📌 {item['title'].upper()}")
            c.font = font_section
            c.fill = fill_section
            c.alignment = Alignment(horizontal="left", vertical="center")
            for col_i in range(1, num_cols + 1):
                ws.cell(row=current_row, column=col_i).border = border_data
            ws.row_dimensions[current_row].height = 26
            current_row += 1
            continue

        ws.row_dimensions[current_row].height = 68
        is_zebra = (current_row % 2 == 0)
        row_fill = fill_zebra if is_zebra else fill_white

        (stt, thumb_file, vi_tri, ma_file, hang_muc, sl, dinh_dang, kich_thuoc, ty_le, uu_tien, trang_thai, phu_trach, ghi_chu) = item

        c1 = ws.cell(row=current_row, column=1, value=stt)
        c1.font = font_data_bold
        c1.alignment = align_center

        c2 = ws.cell(row=current_row, column=2)
        c2.alignment = align_center
        if thumb_file:
            thumb_path = os.path.join(THUMB_DIR, thumb_file)
            if not os.path.exists(thumb_path):
                thumb_path = os.path.join(SCREENSHOT_DIR, thumb_file)
            if os.path.exists(thumb_path):
                try:
                    img = OpenpyxlImage(thumb_path)
                    ratio = img.width / img.height if img.height else 1.77
                    target_h = 60
                    target_w = int(target_h * ratio)
                    if target_w > 135:
                        target_w = 135
                        target_h = int(target_w / ratio)
                    img.width = target_w
                    img.height = target_h
                    ws.add_image(img, f"B{current_row}")
                except Exception as ex:
                    c2.value = f"[{thumb_file}]"
            else:
                c2.value = "[Chưa có ảnh]"
        else:
            c2.value = "-"

        c3 = ws.cell(row=current_row, column=3, value=vi_tri)
        c3.font = font_data_bold
        c3.alignment = align_left

        c4 = ws.cell(row=current_row, column=4, value=ma_file)
        c4.font = font_code
        c4.alignment = align_left

        c5 = ws.cell(row=current_row, column=5, value=hang_muc)
        c5.font = font_data
        c5.alignment = align_center

        c6 = ws.cell(row=current_row, column=6, value=sl)
        c6.font = font_qty_bold
        c6.alignment = align_center
        if isinstance(sl, int) and sl > 0:
            qty_cells.append(c6.coordinate)

        c7 = ws.cell(row=current_row, column=7, value=dinh_dang)
        c7.font = font_fmt
        c7.alignment = align_center

        c8 = ws.cell(row=current_row, column=8, value=kich_thuoc)
        c8.font = font_data
        c8.alignment = align_center

        c9 = ws.cell(row=current_row, column=9, value=ty_le)
        c9.font = font_data
        c9.alignment = align_center

        c10 = ws.cell(row=current_row, column=10, value=uu_tien)
        c10.alignment = align_center
        if "P1" in str(uu_tien):
            c10.fill = fill_p1
            c10.font = Font(name="Segoe UI", size=9.5, bold=True, color=RED_TEXT)
        elif "P2" in str(uu_tien):
            c10.fill = fill_p2
            c10.font = Font(name="Segoe UI", size=9.5, bold=True, color=YELLOW_TEXT)
        else:
            c10.fill = fill_p3
            c10.font = Font(name="Segoe UI", size=9.5, bold=True, color=GREEN_TEXT)

        c11 = ws.cell(row=current_row, column=11, value=trang_thai)
        c11.alignment = align_center
        if "Đã có" in str(trang_thai):
            c11.fill = fill_p3
            c11.font = Font(name="Segoe UI", size=9, bold=True, color=GREEN_TEXT)
        else:
            c11.font = Font(name="Segoe UI", size=9, italic=True, color="6B7280")

        c12 = ws.cell(row=current_row, column=12, value=phu_trach)
        c12.font = font_data
        c12.alignment = align_center

        c13 = ws.cell(row=current_row, column=13, value=ghi_chu)
        c13.font = font_data
        c13.alignment = align_left

        for col_i in range(1, num_cols + 1):
            cell = ws.cell(row=current_row, column=col_i)
            cell.border = border_data
            if col_i not in [10, 11]:
                cell.fill = row_fill

        current_row += 1

    ws.row_dimensions[current_row].height = 30
    for c_i in range(1, num_cols + 1):
        cell = ws.cell(row=current_row, column=c_i)
        cell.border = border_total
        cell.fill = fill_total

    ws.cell(row=current_row, column=3, value="TỔNG CỘNG SỐ LƯỢNG ẢNH:").font = font_total
    ws.cell(row=current_row, column=3).alignment = Alignment(horizontal="right", vertical="center")

    if qty_cells:
        sum_formula = f"=SUM({qty_cells[0]}:{qty_cells[-1]})"
        c_sum = ws.cell(row=current_row, column=6, value=sum_formula)
        c_sum.font = font_total_num
        c_sum.alignment = align_center

    return current_row


def generate_workbook_and_html():
    wb = openpyxl.Workbook()

    # =========================================================================
    # TAB 1: 00_Tong_Quan_Dashboard
    # =========================================================================
    ws_dash = wb.active
    ws_dash.title = "00_Tong_Quan_Dashboard"
    ws_dash.views.sheetView[0].showGridLines = True

    ws_dash.merge_cells("A1:H1")
    c = ws_dash["A1"]
    c.value = "LAKA HOMESTAY · BẢNG ĐIỀU HÀNH & TỔNG HỢP SỐ LƯỢNG TÀI NGUYÊN"
    c.font = font_title
    c.fill = fill_title
    c.alignment = Alignment(horizontal="center", vertical="center")
    ws_dash.row_dimensions[1].height = 42

    ws_dash.merge_cells("A2:H2")
    c2 = ws_dash["A2"]
    c2.value = "Checklist order tài nguyên: Vị trí hiển thị kèm ảnh chụp màn hình UI, chuẩn WebP, kích thước pixel và số lượng bàn giao"
    c2.font = font_sub
    c2.fill = PatternFill(start_color=FOREST_LIGHT, end_color=FOREST_LIGHT, fill_type="solid")
    c2.alignment = Alignment(horizontal="center", vertical="center")
    ws_dash.row_dimensions[2].height = 24

    kpis = [
        ("TỔNG SỐ ẢNH BÀN GIAO MỚI", "104 ẢNH THỰC TẾ", "Chưa kể 14 tài nguyên scan & logo có sẵn", RED_BG, RED_TEXT),
        ("CHUẨN ĐỊNH DẠNG TÀI NGUYÊN", "WebP (sRGB)", "Tối ưu nén nhẹ, tải trang tức thì < 2s", YELLOW_BG, YELLOW_TEXT),
        ("SỐ LƯỢNG ĐÃ CÓ SẴN (SCAN / LOGO)", "14 FILE", "10 trang scan menu + 4 file logo brand", GREEN_BG, GREEN_TEXT),
        ("TỔNG SỐ TRANG WEB PHỤC VỤ", "13 TRANG", "Trang chủ + 12 trang con song ngữ", CREAM, FOREST)
    ]

    for k_idx, (k_title, k_val, k_sub, k_bg, k_color) in enumerate(kpis):
        start_col = 1 + k_idx * 2
        end_col = start_col + 1
        start_letter = get_column_letter(start_col)
        end_letter = get_column_letter(end_col)

        ws_dash.merge_cells(f"{start_letter}4:{end_letter}4")
        cell_t = ws_dash[f"{start_letter}4"]
        cell_t.value = k_title
        cell_t.font = Font(name="Segoe UI", size=8.5, bold=True, color="4B5563")
        cell_t.fill = PatternFill(start_color=k_bg, end_color=k_bg, fill_type="solid")
        cell_t.alignment = Alignment(horizontal="center", vertical="center")

        ws_dash.merge_cells(f"{start_letter}5:{end_letter}5")
        cell_v = ws_dash[f"{start_letter}5"]
        cell_v.value = k_val
        cell_v.font = Font(name="Segoe UI", size=13.5, bold=True, color=k_color)
        cell_v.fill = PatternFill(start_color=k_bg, end_color=k_bg, fill_type="solid")
        cell_v.alignment = Alignment(horizontal="center", vertical="center")

        ws_dash.merge_cells(f"{start_letter}6:{end_letter}6")
        cell_s = ws_dash[f"{start_letter}6"]
        cell_s.value = k_sub
        cell_s.font = Font(name="Segoe UI", size=8, italic=True, color="6B7280")
        cell_s.fill = PatternFill(start_color=k_bg, end_color=k_bg, fill_type="solid")
        cell_s.alignment = Alignment(horizontal="center", vertical="center")

    dash_headers = [
        ("STT", 6),
        ("Tên Trang / Tab Sheet", 26),
        ("Đường dẫn URL Website", 30),
        ("SL ảnh bàn giao thực tế", 22),
        ("Định dạng file", 16),
        ("Ưu tiên", 14),
        ("Tỷ lệ & Kích thước chủ đạo", 24),
        ("Trạng thái", 18)
    ]

    ws_dash.row_dimensions[9].height = 28
    for c_i, (h_name, h_w) in enumerate(dash_headers, 1):
        cell = ws_dash.cell(row=9, column=c_i, value=h_name)
        cell.font = font_header
        cell.fill = fill_header
        cell.alignment = align_header
        cell.border = border_header
        ws_dash.column_dimensions[get_column_letter(c_i)].width = h_w

    tab_summary_data = [
        (1, "01_Trang_Chu", "/", 21, "WebP", "P1 - Cốt lõi", "16:9, 4:3, 3:4, 16:10", "Chưa chụp"),
        (2, "02_Luu_Tru_8_Dong_Can", "/luu-tru", 47, "WebP", "P1 - Cốt lõi", "4:3 (Bìa) + 3:2 (Gallery)", "Chưa chụp"),
        (3, "03_Trai_Nghiem", "/trai-nghiem", 8, "WebP", "P2 - Quan trọng", "16:10 (1600x1000)", "Chưa chụp"),
        (4, "04_Am_Thuc", "/am-thuc", 5, "WebP + Scan", "P1 - Cốt lõi", "16:10 + A4 Menu Scan", "10 file scan đã có"),
        (5, "05_Dich_Vu", "/dich-vu", 5, "WebP", "P2 - Quan trọng", "2:3 / 3:4.8 Đứng", "Chưa chụp"),
        (6, "06_Ve_Laka", "/ve-laka", 5, "WebP", "P2 - Quan trọng", "16:11 (1600x1100)", "Chưa chụp"),
        (7, "07_Di_Chuyen_Map", "/di-chuyen", 3, "WebP + Graphic", "P2 - Quan trọng", "Sơ đồ & Map Vector", "Chưa chụp"),
        (8, "08_Trang_Con_Phap_Ly_FAQ", "6 trang con", 12, "WebP", "P3 - Bổ trợ", "Banner vòm + Thẻ nổi", "Tái sử dụng kho ảnh"),
        (9, "09_Brand_Assets_Logo", "Toàn site", 4, "SVG, PNG, ICO", "P1 - Cốt lõi", "Logo & Favicon", "Đã có sẵn 4 file")
    ]

    for r_idx, row_item in enumerate(tab_summary_data, 10):
        ws_dash.row_dimensions[r_idx].height = 25
        is_z = (r_idx % 2 == 0)
        for c_i, val in enumerate(row_item, 1):
            cell = ws_dash.cell(row=r_idx, column=c_i, value=val)
            cell.border = border_data
            cell.fill = fill_zebra if is_z else fill_white
            cell.alignment = align_center if c_i in [1, 4, 5, 6, 8] else align_left
            cell.font = font_data_bold if c_i in [1, 2, 4] else font_data
            if c_i == 4:
                cell.font = font_qty_bold
            elif c_i == 5:
                cell.font = font_fmt
            elif c_i == 6:
                cell.fill = fill_p1 if "P1" in str(val) else (fill_p2 if "P2" in str(val) else fill_p3)
                cell.font = Font(name="Segoe UI", size=9.5, bold=True, color=RED_TEXT if "P1" in str(val) else (YELLOW_TEXT if "P2" in str(val) else GREEN_TEXT))
            elif c_i == 8 and "Đã có" in str(val):
                cell.fill = fill_p3
                cell.font = Font(name="Segoe UI", size=9, bold=True, color=GREEN_TEXT)

    sum_row_dash = 10 + len(tab_summary_data)
    ws_dash.row_dimensions[sum_row_dash].height = 28
    for c_i in range(1, 9):
        cell = ws_dash.cell(row=sum_row_dash, column=c_i)
        cell.border = border_total
        cell.fill = fill_total

    ws_dash.cell(row=sum_row_dash, column=3, value="TỔNG CỘNG TOÀN BỘ WEBSITE:").font = font_total
    ws_dash.cell(row=sum_row_dash, column=3).alignment = Alignment(horizontal="right", vertical="center")
    c_total_deliv = ws_dash.cell(row=sum_row_dash, column=4, value=f"=SUM(D10:D{sum_row_dash-1})")
    c_total_deliv.font = font_total_num
    c_total_deliv.alignment = align_center
    c_total_fmt = ws_dash.cell(row=sum_row_dash, column=5, value="WebP / File")
    c_total_fmt.font = font_fmt
    c_total_fmt.alignment = align_center

    spec_start_row = sum_row_dash + 2
    ws_dash.merge_cells(f"A{spec_start_row}:H{spec_start_row}")
    c_specs_h = ws_dash[f"A{spec_start_row}"]
    c_specs_h.value = "HƯỚNG DẪN KỸ THUẬT QUAN TRỌNG DÀNH CHO ĐỘI NGŨ SẢN XUẤT NỘI DUNG & MEDIA"
    c_specs_h.font = font_section
    c_specs_h.fill = fill_section
    ws_dash.row_dimensions[spec_start_row].height = 26

    specs = [
        ("Định dạng file chuẩn", "WebP (chuẩn số 1 cho web thế hệ mới tải nhanh < 2s) hoặc JPEG chất lượng cao (Quality 85-90%)."),
        ("Không gian màu (Color Space)", "BẮT BUỘC dùng hệ màu sRGB. Tuyệt đối không để AdobeRGB / CMYK vì sẽ bị lệch/xỉn màu trên màn hình iPhone & Android."),
        ("Dung lượng file tối ưu", "Ảnh Banner lớn: 300KB - 500KB | Ảnh Card & Gallery: 150KB - 250KB | Ảnh Thumbnail: < 80KB."),
        ("Bố cục Responsive", "Website dùng chung 1 ảnh (CSS object-cover tự co giãn thông minh cho Desktop & Mobile), không cần chụp riêng 2 bản."),
        ("Ảnh chụp vị trí UI", "Mỗi hàng trong file đều kèm ảnh chụp màn hình UI thực tế trên web giúp ekip hình dung góc máy và bố cục chuẩn xác 100%."),
        ("Tổ chức bàn giao", "Google Drive tạo các thư mục tương ứng với từng Tab trong bảng tính này.")
    ]

    for idx, (sp_name, sp_desc) in enumerate(specs, spec_start_row + 1):
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

    # =========================================================================
    # TAB 2: 01_Trang_Chu (URL: /)
    # 100% Khớp với main-home.tsx
    # =========================================================================
    ws_home = wb.create_sheet(title="01_Trang_Chu")
    setup_sheet_header(ws_home, "Trang Chủ", "/", "21 Ảnh bàn giao thực tế")

    home_rows = [
        {"is_section_header": True, "title": "Section 1: Hero Màn hình đầu tiên (Tiêu đề: \"Chọn\" Cabin - \"Trọn\" Thung Lũng | Eyebrow: LAKA - Nhà giữa khoảng xanh)"},
        (1, "home_01_hero.jpg", "Trang Chủ > Hero Màn hình đầu tiên tràn viền (Full-screen hero)",
         "laka-home-hero.webp", "Ảnh Banner Hero", 1, "WebP", "2560 x 1440", "16:9",
         "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Ảnh đại diện mở đầu trang chủ, tỷ lệ 16:9 tự co giãn desktop/mobile"),

        {"is_section_header": True, "title": "Section 2: Sứ mệnh (#gioi-thieu | \"Lưu giữ vẻ đẹp nguyên sơ qua từng khung kính...\")"},
        (2, "home_02_brand_story.jpg", "Trang Chủ > Section 2 (#gioi-thieu) > Khung ảnh cửa sổ nổi bên phải",
         "laka-story-window.webp", "Ảnh Thẻ Sứ Mệnh", 1, "WebP", "1600 x 1200", "4:3",
         "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Góc nhìn qua khung kính ra thiên nhiên, biểu tượng cho sứ mệnh LAKA"),

        {"is_section_header": True, "title": "Section 3: Lưu Trú (#luu-tru | Tiêu đề: Lưu Trú - \"Một khoảng xanh, một nhịp riêng.\")"},
        (3, "home_03_landscape_collections.jpg", "Trang Chủ > Section 3 (#luu-tru) > Bộ 3 thẻ trượt đại diện 3 phong cách (Hồ, Đồi, Rừng)",
         "laka-col-01..03.webp (Bộ 3 thẻ)", "Ảnh Thẻ Lưu Trú", 3, "WebP", "1200 x 1600", "3:4",
         "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Gồm: Nhà Bên Hồ, Nhà Trên Đồi, Nhà Giữa Rừng (Thẻ đứng tỷ lệ 3:4)"),

        {"is_section_header": True, "title": "Section 4: Ẩm thực (#am-thuc | Tiêu đề: Ẩm thực - \"Những hương vị nối dài cuộc vui.\")"},
        (4, "home_04_dining_preview.jpg", "Trang Chủ > Section 4 (#am-thuc) > 3 Thẻ không gian ẩm thực (Bữa sáng, Nhà hàng ven hồ, Cà phê tầng mây)",
         "laka-dining-01..03.webp (Bộ 3 món)", "Ảnh Không Gian Ẩm Thực", 3, "WebP", "1600 x 1000", "16:10",
         "P2 - Quan trọng", "Chưa chụp", "Bếp + Media", "3 không gian ẩm thực kết nối thực tế tại LAKA"),

        {"is_section_header": True, "title": "Section 5: Một ngày ở LAKA (#mot-ngay | Tiêu đề: Một ngày ở LAKA - \"Hôm nay chỉ để vui thôi!\")"},
        (5, "home_05_day_journey.jpg", "Trang Chủ > Section 5 (#mot-ngay) > 4 Thẻ trải nghiệm cuộn ngang (Pickleball, Kayak, Hồ Xanh, Đạp xe)",
         "laka-journey-01..04.webp (Bộ 4 chặng)", "Ảnh Trải Nghiệm", 4, "WebP", "1080 x 1350", "4:5",
         "P2 - Quan trọng", "Chưa chụp", "Media Team", "4 khoảnh khắc vận động và thư giãn tại LAKA"),

        {"is_section_header": True, "title": "Section 6: Thư viện ký ức (#ky-uc | Tiêu đề: Thư viện ký ức - \"Những khung hình lưu lại một ngày thật đáng nhớ.\")"},
        (6, "home_06_memory_gallery.jpg", "Trang Chủ > Section 6 (#ky-uc) > Lưới 9 ô ảnh phóng to Lightbox (Grid 3x3)",
         "laka-memory-01..09.webp (Bộ 9 ảnh)", "Ảnh Lightbox Ký Ức", 9, "WebP", "1600 x 1200", "4:3 / 1:1",
         "P2 - Quan trọng", "Chưa chụp", "Media Team", "9 khoảnh khắc tiêu biểu toàn khu, bấm vào phóng to màn hình"),

        {"is_section_header": True, "title": "Section 7: Cảm nhận khách nghỉ (#feedback | Tiêu đề: Cảm nhận khách nghỉ - \"Những cảm nhận còn lại...\")"},
        (7, "home_07_guest_stories.jpg", "Trang Chủ > Section 7 (#feedback) > 4 Thẻ trích dẫn đánh giá thực tế của khách",
         "feedback-khach-hang.doc", "Nội Dung Văn Bản", 0, "DOC / TXT", "Văn bản", "N/A",
         "P2 - Quan trọng", "Đang có bản nháp", "Content Team", "Nội dung phản hồi chân thực từ khách nghỉ, không cần chụp ảnh")
    ]
    populate_sheet(ws_home, home_rows)

    # =========================================================================
    # TAB 3: 02_Luu_Tru_8_Dong_Can (URL: /luu-tru)
    # =========================================================================
    ws_stays = wb.create_sheet(title="02_Luu_Tru_8_Dong_Can")
    setup_sheet_header(ws_stays, "Lưu Trú (8 Dòng căn / 20 Căn thực tế)", "/luu-tru", "47 Ảnh bàn giao (2 Banner + 8 Bìa + 37 Gallery)")

    stay_compact_types = [
        ("01", "Guest House (Căn 001 · 1 căn · 35m² · 5 giường · tối đa 10 khách)", "Guest House 001",
         "laka-stay-gh-01-cover.webp", 1, "laka-stay-gh-02..06.webp (Bộ 5 ảnh)", 5),
        ("02", "Forest Lake Suite (Căn 006–011 · 6 căn · 25m² · view hồ)", "Forest Lake Suite",
         "laka-stay-fls-01-cover.webp", 1, "laka-stay-fls-02..06.webp (Bộ 5 ảnh)", 5),
        ("03", "Forest Lake Bathtub Suite / Cabin Vô Cực (Căn 014–017 · 4 căn · Bồn tắm 180°)", "Cabin Vô Cực (Bathtub Suite)",
         "laka-stay-bts-01-cover.webp", 1, "laka-stay-bts-02..06.webp (Bộ 5 ảnh)", 5),
        ("04", "Lake Suite / Cabin An Trú (Căn 004–005 · 2 căn · 25m² · Cửa sổ tĩnh lặng)", "Cabin An Trú (Lake Suite)",
         "laka-stay-ls-01-cover.webp", 1, "laka-stay-ls-02..05.webp (Bộ 4 ảnh)", 4),
        ("05", "Bungalow (Căn 002–003 · 2 căn · 15m² · 2 Tầng gác xép gỗ · 5–7 khách)", "Bungalow Gác Xép",
         "laka-stay-bg-01-cover.webp", 1, "laka-stay-bg-02..06.webp (Bộ 5 ảnh)", 5),
        ("06", "Cabin Group (Căn 012–013 · 2 căn · 30m² · 7 Giường tầng · tối đa 14 khách)", "Cabin Group",
         "laka-stay-cg-01-cover.webp", 1, "laka-stay-cg-02..05.webp (Bộ 4 ảnh)", 4),
        ("07", "Lake Suite Giữa Rừng (Căn 018–019 · 2 căn · 25m² · Nép dưới rừng thông)", "Lake Suite Giữa Rừng",
         "laka-stay-lsf-01-cover.webp", 1, "laka-stay-lsf-02..05.webp (Bộ 4 ảnh)", 4),
        ("08", "Villa Top Hill (Căn 020 · 1 căn · 35m² + Sân lớn · 15–20 khách)", "Villa Top Hill",
         "laka-stay-vth-01-cover.webp", 1, "laka-stay-vth-02..06.webp (Bộ 5 ảnh)", 5)
    ]

    stay_rows = [
        {"is_section_header": True, "title": "Banner Đầu Trang Lưu Trú (StayBannerHero)"},
        (1, "subpage_banner_hero.jpg", "Trang Lưu Trú > Banner vòm nền & Thẻ ảnh nổi đầu trang",
         "laka-banner-luu-tru.webp (2 ảnh)", "Ảnh Banner Trang", 2, "WebP", "2000 x 1200 / 1200 x 1600", "16:9 + 3:4",
         "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Bộ đôi ảnh Banner vòm nền và Thẻ ảnh nổi trang Lưu Trú")
    ]

    stt_cnt = 2
    for stt_r, r_name, short_name, cov_f, cov_q, gal_f, gal_q in stay_compact_types:
        stay_rows.append({"is_section_header": True, "title": f"Dòng căn {stt_r}: {r_name}"})
        stay_rows.append((
            stt_cnt, "subpage_stays_explorer.jpg",
            f"Trang Lưu Trú (#bo-suu-tap-can) > Thẻ danh mục căn {short_name}",
            cov_f, "Ảnh Bìa / Đại diện", cov_q, "WebP", "1600 x 1200", "4:3",
            "P1 - Cốt lõi", "Chưa chụp", "Media Team", f"Ảnh đại diện chính của {short_name}"
        ))
        stt_cnt += 1
        stay_rows.append((
            stt_cnt, "subpage_stay_detail_modal.jpg",
            f"Trang Lưu Trú > Popup xem chi tiết căn > Thư viện ảnh trượt {short_name}",
            gal_f, "Bộ ảnh Gallery", gal_q, "WebP", "2000 x 1333", "3:2",
            "P1 - Cốt lõi", "Chưa chụp", "Media Team", f"Góc phòng ngủ, bồn tắm, ban công, view thung lũng {short_name}"
        ))
        stt_cnt += 1

    populate_sheet(ws_stays, stay_rows)

    # =========================================================================
    # TAB 4: 03_Trai_Nghiem (URL: /trai-nghiem)
    # =========================================================================
    ws_exp = wb.create_sheet(title="03_Trai_Nghiem")
    setup_sheet_header(ws_exp, "Trải Nghiệm", "/trai-nghiem", "8 Ảnh bàn giao (2 Banner + 6 Hoạt động)")

    exp_rows = [
        {"is_section_header": True, "title": "Banner Đầu Trang Trải Nghiệm (PageBannerHero)"},
        (1, "subpage_banner_hero.jpg", "Trang Trải Nghiệm > Banner vòm nền & Thẻ ảnh nổi đầu trang",
         "laka-banner-trai-nghiem.webp (2 ảnh)", "Ảnh Banner Trang", 2, "WebP", "2000 x 1200 / 1200 x 1600", "16:9 + 3:4",
         "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Bộ đôi banner mở đầu trang Trải nghiệm"),

        {"is_section_header": True, "title": "Section Danh mục Trải nghiệm (#trai-nghiem · \"Những trải nghiệm nhỏ, cảm nhận thật sâu.\")"},
        (2, "subpage_experience_catalog.jpg", "Trang Trải Nghiệm > Section #trai-nghiem > Thẻ hoạt động PickleBall",
         "laka-exp-pickleball.webp", "Ảnh Thẻ Hoạt Động", 1, "WebP", "1600 x 1000", "16:10",
         "P2 - Quan trọng", "Chưa chụp", "Media Team", "PickleBall Bật Mood: sân đón nắng, góc đánh năng lượng"),

        (3, "subpage_experience_catalog.jpg", "Trang Trải Nghiệm > Section #trai-nghiem > Thẻ hoạt động Kayak",
         "laka-exp-kayak.webp", "Ảnh Thẻ Hoạt Động", 1, "WebP", "1600 x 1000", "16:10",
         "P2 - Quan trọng", "Chưa chụp", "Media Team", "Lướt Hồ Cùng Kayak: chèo thuyền mặt nước ven hồ"),

        (4, "subpage_experience_catalog.jpg", "Trang Trải Nghiệm > Section #trai-nghiem > Thẻ hoạt động Bể bơi hồ xanh",
         "laka-exp-pool.webp", "Ảnh Thẻ Hoạt Động", 1, "WebP", "1600 x 1000", "16:10",
         "P2 - Quan trọng", "Chưa chụp", "Media Team", "Thư giãn cùng Hồ Xanh: làn nước trong mát nhìn ra thung lũng"),

        (5, "subpage_experience_catalog.jpg", "Trang Trải Nghiệm > Section #trai-nghiem > Thẻ hoạt động Xe đạp",
         "laka-exp-bicycle.webp", "Ảnh Thẻ Hoạt Động", 1, "WebP", "1600 x 1000", "16:10",
         "P2 - Quan trọng", "Chưa chụp", "Media Team", "Đạp xe Rong Ruổi: cung đường xanh quanh hồ và rừng thông"),

        (6, "subpage_experience_catalog.jpg", "Trang Trải Nghiệm > Section #trai-nghiem > Thẻ hoạt động Board Game",
         "laka-exp-boardgame.webp", "Ảnh Thẻ Hoạt Động", 1, "WebP", "1600 x 1000", "16:10",
         "P3 - Bổ trợ", "Chưa chụp", "Media Team", "Board Game: không gian ấm cúng, bộ trò chơi giải trí nhóm"),

        (7, "subpage_experience_catalog.jpg", "Trang Trải Nghiệm > Section #trai-nghiem > Thẻ hoạt động Bida",
         "laka-exp-billiards.webp", "Ảnh Thẻ Hoạt Động", 1, "WebP", "1600 x 1000", "16:10",
         "P3 - Bổ trợ", "Chưa chụp", "Media Team", "Bida: bàn bida tiêu chuẩn giải trí nhẹ nhàng")
    ]
    populate_sheet(ws_exp, exp_rows)

    # =========================================================================
    # TAB 5: 04_Am_Thuc (URL: /am-thuc)
    # =========================================================================
    ws_din = wb.create_sheet(title="04_Am_Thuc")
    setup_sheet_header(ws_din, "Ẩm Thực & Thực Đơn", "/am-thuc", "15 Tài nguyên (5 Ảnh chụp + 10 Trang Scan Menu có sẵn)")

    din_rows = [
        {"is_section_header": True, "title": "Banner Đầu Trang Ẩm Thực (PageBannerHero)"},
        (1, "subpage_banner_hero.jpg", "Trang Ẩm Thực > Banner vòm nền & Thẻ ảnh nổi đầu trang",
         "laka-banner-am-thuc.webp (2 ảnh)", "Ảnh Banner Trang", 2, "WebP", "2000 x 1200 / 1200 x 1600", "16:9 + 3:4",
         "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Bộ đôi banner ẩm thực mở đầu trang"),

        {"is_section_header": True, "title": "Section Ba không gian ẩm thực (\"Ba trải nghiệm, trọn vẹn hương vị.\")"},
        (2, "subpage_dining_spaces.jpg", "Trang Ẩm Thực > 3 Thẻ không gian ẩm thực (Bữa sáng, Nhà hàng ven hồ, Cà phê tầng mây)",
         "laka-dining-spaces-01..03.webp (Bộ 3 ảnh)", "Ảnh Không Gian Ẩm Thực", 3, "WebP", "1600 x 1000", "16:10",
         "P1 - Cốt lõi", "Chưa chụp", "Bếp + Media", "3 không gian trải nghiệm ẩm thực: Bữa sáng thiên nhiên, Nhà hàng ven hồ, Tiệm cà phê tầng mây"),

        {"is_section_header": True, "title": "Section Thực đơn nhà hàng (#thuc-don · Bộ 10 trang Scan menu vẽ tay nghệ thuật)"},
        (3, "subpage_dining_menu.jpg", "Trang Ẩm Thực > Section #thuc-don > Bộ sưu tập 10 trang menu scan vẽ tay",
         "laka-menu-scan-page-01..10.webp (10 trang)", "File Scan Menu A4", 10, "WebP", "1200 x 1700", "A4 (1:1.414)",
         "P1 - Cốt lõi", "Đã có sẵn bản scan", "Thiết kế & Bếp", "10 trang scan menu đồ ăn & thức uống thủ công, đã hoàn thiện")
    ]
    populate_sheet(ws_din, din_rows)

    # =========================================================================
    # TAB 6: 05_Dich_Vu (URL: /dich-vu)
    # =========================================================================
    ws_srv = wb.create_sheet(title="05_Dich_Vu")
    setup_sheet_header(ws_srv, "Dịch Vụ & Tiện Ích", "/dich-vu", "5 Ảnh bàn giao (2 Banner + 3 Dịp đặc biệt)")

    srv_rows = [
        {"is_section_header": True, "title": "Banner Đầu Trang Dịch Vụ (PageBannerHero)"},
        (1, "subpage_banner_hero.jpg", "Trang Dịch Vụ > Banner vòm nền & Thẻ ảnh nổi đầu trang",
         "laka-banner-dich-vu.webp (2 ảnh)", "Ảnh Banner Trang", 2, "WebP", "2000 x 1200 / 1200 x 1600", "16:9 + 3:4",
         "P2 - Quan trọng", "Chưa chụp", "Media Team", "Bộ đôi banner trang dịch vụ tiện ích"),

        {"is_section_header": True, "title": "Section Dịp nhiều ý nghĩa (#danh-muc-dich-vu · \"Một dịp đặc biệt vẫn thật sự riêng tư.\")"},
        (2, "subpage_services_catalog.jpg", "Trang Dịch Vụ > Section #danh-muc-dich-vu > 3 Thẻ sự kiện đặc biệt",
         "laka-service-events-01..03.webp (Bộ 3 ảnh)", "Ảnh Sự Kiện & Dịch Vụ", 3, "WebP", "1200 x 1800", "2:3 / 3:4.8",
         "P2 - Quan trọng", "Chưa chụp", "Media Team", "Team Building, Tiệc ngoài trời (sân khấu ca nhạc) và Lửa trại ấm áp"),

        {"is_section_header": True, "title": "Hệ Tiện ích dùng chung (5 Tiện ích: Nhà hàng, Cà phê, Pickleball, Bể bơi, Săn mây)"},
        (3, "subpage_services_catalog.jpg", "Trang Dịch Vụ > Danh mục 5 tiện ích dùng chung",
         "Tái sử dụng ảnh ẩm thực & cảnh quan", "Ảnh Tiện Ích", 0, "WebP", "1600 x 1000", "16:10",
         "P2 - Quan trọng", "Đã có theo các mục khác", "Media Team", "Không cần chụp thêm, sử dụng đồng bộ ảnh từ các section tương ứng")
    ]
    populate_sheet(ws_srv, srv_rows)

    # =========================================================================
    # TAB 7: 06_Ve_Laka (URL: /ve-laka)
    # =========================================================================
    ws_abt = wb.create_sheet(title="06_Ve_Laka")
    setup_sheet_header(ws_abt, "Về LAKA", "/ve-laka", "5 Ảnh bàn giao (2 Banner + 3 Dấu ấn)")

    abt_rows = [
        {"is_section_header": True, "title": "Banner Đầu Trang Về LAKA (PageBannerHero)"},
        (1, "subpage_banner_hero.jpg", "Trang Về LAKA > Banner vòm nền & Thẻ ảnh nổi đầu trang",
         "laka-banner-ve-laka.webp (2 ảnh)", "Ảnh Banner Trang", 2, "WebP", "2000 x 1200 / 1200 x 1600", "16:9 + 3:4",
         "P2 - Quan trọng", "Chưa chụp", "Media Team", "Bộ đôi banner câu chuyện thương hiệu"),

        {"is_section_header": True, "title": "Section Dấu ấn LaKa (#cau-chuyen · 3 Trụ cột bản sắc & biểu tượng)"},
        (2, "subpage_about_pillars.jpg", "Trang Về LAKA > Section #cau-chuyen > 3 Thẻ trụ cột dấu ấn",
         "laka-about-pillars-01..03.webp (Bộ 3 ảnh)", "Ảnh Trụ Cột Bản Sắc", 3, "WebP", "1600 x 1100", "16:11",
         "P2 - Quan trọng", "Chưa chụp", "Media Team", "01. Biểu Tượng Xanh, 02. Khoảnh Khắc Kết Nối, 03. Trải Nghiệm Nguyên Bản")
    ]
    populate_sheet(ws_abt, abt_rows)

    # =========================================================================
    # TAB 8: 07_Di_Chuyen_Map (URL: /di-chuyen)
    # =========================================================================
    ws_dir = wb.create_sheet(title="07_Di_Chuyen_Map")
    setup_sheet_header(ws_dir, "Chỉ Đường & Di Chuyển", "/di-chuyen", "3 Tài nguyên (2 Banner + 1 Sơ đồ Map)")

    dir_rows = [
        {"is_section_header": True, "title": "Banner Đầu Trang Di Chuyển (PageBannerHero)"},
        (1, "subpage_banner_hero.jpg", "Trang Di Chuyển > Banner vòm nền & Thẻ ảnh nổi đầu trang",
         "laka-banner-di-chuyen.webp (2 ảnh)", "Ảnh Banner Trang", 2, "WebP", "2000 x 1200 / 1200 x 1600", "16:9 + 3:4",
         "P2 - Quan trọng", "Chưa chụp", "Media Team", "Bộ đôi banner di chuyển đến LAKA"),

        {"is_section_header": True, "title": "Section Chỉ đường & Bản đồ (#chi-duong · Sơ đồ quy hoạch Master Plan)"},
        (2, "subpage_directions_journey.jpg", "Trang Di Chuyển > Section #chi-duong > Sơ đồ bản đồ tới LAKA",
         "laka-master-plan-map.webp", "File Đồ Họa / Vector", 1, "WebP / SVG", "2000 x 1400", "4:3",
         "P2 - Quan trọng", "Chưa chụp", "Thiết kế Đồ họa", "Bản đồ hướng dẫn cung đường Dốc Dây Diều, Sóc Sơn & sơ đồ toàn khu")
    ]
    populate_sheet(ws_dir, dir_rows)

    # =========================================================================
    # TAB 9: 08_Trang_Con_Phap_Ly_FAQ
    # =========================================================================
    ws_sub = wb.create_sheet(title="08_Trang_Con_Phap_Ly_FAQ")
    setup_sheet_header(ws_sub, "Trang Con Pháp Lý & FAQ (6 Trang)", "6 trang con", "12 Ảnh banner đồng bộ")

    sub_pages_data = [
        ("01", "Trang Hỏi & Đáp (/faq)", "laka-banner-faq.webp & card-faq.webp", 2, "P3 - Bổ trợ"),
        ("02", "Trang Chính Sách Lưu Trú (/chinh-sach-luu-tru)", "laka-banner-chinh-sach.webp & card-chinh-sach.webp", 2, "P3 - Bổ trợ"),
        ("03", "Trang Điều Khoản Dịch Vụ (/dieu-khoan)", "laka-banner-dieu-khoan.webp & card-dieu-khoan.webp", 2, "P3 - Bổ trợ"),
        ("04", "Trang Chính Sách Bảo Mật (/bao-mat)", "laka-banner-bao-mat.webp & card-bao-mat.webp", 2, "P3 - Bổ trợ"),
        ("05", "Trang Thông Tin Cần Biết (/thong-tin)", "laka-banner-thong-tin.webp & card-thong-tin.webp", 2, "P3 - Bổ trợ"),
        ("06", "Trang Liên Hệ & Đặt Căn (/lien-he)", "laka-banner-lien-he.webp & card-lien-he.webp", 2, "P2 - Quan trọng")
    ]

    sub_rows = []
    for stt_s, s_name, s_files, s_qty, s_pri in sub_pages_data:
        sub_rows.append({"is_section_header": True, "title": f"Mục {stt_s}: {s_name}"})
        sub_rows.append((
            int(stt_s), "subpage_banner_hero.jpg",
            f"{s_name} > Banner vòm nền & Thẻ ảnh nổi đầu trang",
            s_files, "Bộ đôi Banner Trang", s_qty, "WebP", "2000 x 1200 / 1200 x 1600", "16:9 + 3:4",
            s_pri, "Chưa chụp", "Media Team", "Có thể tuyển chọn và tái sử dụng từ kho ảnh phong cảnh & chi tiết của LAKA"
        ))
    populate_sheet(ws_sub, sub_rows)

    # =========================================================================
    # TAB 10: 09_Brand_Assets_Logo
    # =========================================================================
    ws_brand = wb.create_sheet(title="09_Brand_Assets_Logo")
    setup_sheet_header(ws_brand, "Nhận Diện Thương Hiệu & Logo", "Toàn site", "4 File tài nguyên đồ họa")

    brand_rows = [
        {"is_section_header": True, "title": "Bộ nhận diện thương hiệu LAKA Homestay"},
        (1, "", "Header & Footer toàn bộ website (Bản ngang)",
         "laka-logo-primary.svg / png", "Logo Chính Thức", 1, "SVG / PNG", "Vector / 800x240", "Ngang",
         "P1 - Cốt lõi", "Đã có sẵn bản thiết kế", "Design Team", "File vector chuẩn trong suốt dùng cho Header và Footer"),

        (2, "", "Biểu tượng nhận diện nhỏ (Tròn / Vuông)",
         "laka-icon-mark.svg / png", "Icon Thương Hiệu", 1, "SVG / PNG", "512 x 512", "1:1",
         "P1 - Cốt lõi", "Đã có sẵn bản thiết kế", "Design Team", "Icon chữ L cách điệu hoặc khung cửa sổ LAKA"),

        (3, "", "Tab trình duyệt (Favicon đa kích thước)",
         "favicon.ico & icon-192.png", "Favicon Website", 1, "ICO / PNG", "32x32 / 192x192", "1:1",
         "P1 - Cốt lõi", "Đã có sẵn bản thiết kế", "Design Team", "Hiển thị trên tab trình duyệt Chrome, Safari, Edge"),

        (4, "", "Ảnh xem trước khi chia sẻ link Facebook, Zalo",
         "laka-og-social-preview.jpg", "Social OpenGraph", 1, "JPG / PNG", "1200 x 630", "1.91:1",
         "P1 - Cốt lõi", "Chưa chụp", "Media Team", "Ảnh đại diện thung lũng & cabin LAKA tuyệt đẹp khi gửi link trên mạng xã hội")
    ]
    populate_sheet(ws_brand, brand_rows)

    # LƯU EXCEL
    excel_path = os.path.join(PROJECT_DIR, "LAKA_Homestay_Asset_Order_List.xlsx")
    backup_path = os.path.join(PROJECT_DIR, "LAKA_Homestay_Asset_Order_List_Latest.xlsx")
    try:
        wb.save(excel_path)
        print(f"Excel saved successfully: {excel_path}")
    except PermissionError:
        wb.save(backup_path)
        print(f"Excel is open by user! Saved to backup: {backup_path}")

    # XUẤT HTML SHEET
    generate_html_sheet(dash_data=tab_summary_data, tabs_content=[
        ("01_Trang_Chu", "Trang Chủ", "/", home_rows),
        ("02_Luu_Tru_8_Dong_Can", "Lưu Trú", "/luu-tru", stay_rows),
        ("03_Trai_Nghiem", "Trải Nghiệm", "/trai-nghiem", exp_rows),
        ("04_Am_Thuc", "Ẩm Thực", "/am-thuc", din_rows),
        ("05_Dich_Vu", "Dịch Vụ", "/dich-vu", srv_rows),
        ("06_Ve_Laka", "Về LAKA", "/ve-laka", abt_rows),
        ("07_Di_Chuyen_Map", "Chỉ Đường", "/di-chuyen", dir_rows),
        ("08_Trang_Con_Phap_Ly_FAQ", "Trang Con & FAQ", "6 trang con", sub_rows),
        ("09_Brand_Assets_Logo", "Brand & Logo", "Toàn site", brand_rows)
    ])


def generate_html_sheet(dash_data, tabs_content):
    html = """<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LAKA Homestay — Bảng Order Tài Nguyên & Ảnh Chụp Vị Trí UI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Lora:ital,wght@0,500;0,600;1,400;1,600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --forest: #16311c;
      --forest-dark: #0a1a13;
      --forest-light: #23482b;
      --cream: #eae1d2;
      --cream-light: #f4ede3;
      --sand: #e7ded1;
      --gold: #80613f;
      --gold-light: #dfc6a5;
      --white: #ffffff;
      --border: #d8d2c7;
      --border-dark: #16311c20;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Be Vietnam Pro', sans-serif;
      background-color: var(--cream);
      color: var(--forest);
      line-height: 1.5;
      padding-bottom: 80px;
    }
    header.hero {
      background: linear-gradient(135deg, var(--forest-dark) 0%, var(--forest) 100%);
      color: var(--white);
      padding: 40px 24px 32px;
      border-bottom: 4px solid var(--gold);
    }
    .hero-container {
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }
    .hero-title h1 {
      font-family: 'Lora', serif;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: -0.5px;
      color: var(--white);
    }
    .hero-title p {
      font-size: 13.5px;
      color: var(--gold-light);
      margin-top: 6px;
    }
    .hero-kpis {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }
    .kpi-card {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 12px;
      padding: 12px 18px;
      min-width: 140px;
      text-align: center;
      backdrop-blur: 8px;
    }
    .kpi-card .val {
      font-size: 20px;
      font-weight: 800;
      color: var(--gold-light);
    }
    .kpi-card .lbl {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: rgba(255,255,255,0.7);
      margin-top: 2px;
    }

    /* Tab Navigation */
    .tab-bar-wrap {
      background: var(--sand);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 40;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .tab-bar {
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding: 8px 24px;
      scrollbar-width: none;
    }
    .tab-bar::-webkit-scrollbar { display: none; }
    .tab-btn {
      background: none;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      color: var(--forest);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s;
    }
    .tab-btn:hover {
      background: rgba(22, 49, 28, 0.08);
    }
    .tab-btn.active {
      background: var(--forest);
      color: var(--white);
    }

    /* Main Container */
    .main-content {
      max-width: 1440px;
      margin: 30px auto 0;
      padding: 0 24px;
    }

    /* Tab Panels */
    .tab-panel {
      display: none;
    }
    .tab-panel.active {
      display: block;
      animation: fadeIn 0.25s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Table Styling */
    .table-card {
      background: var(--white);
      border-radius: 14px;
      border: 1px solid var(--border);
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(22, 49, 28, 0.06);
    }
    .table-header-info {
      padding: 16px 20px;
      background: var(--cream-light);
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .table-header-info h2 {
      font-family: 'Lora', serif;
      font-size: 18px;
      color: var(--forest);
      font-weight: 600;
    }
    .badge-url {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      background: var(--sand);
      padding: 4px 10px;
      border-radius: 6px;
      color: var(--gold);
      font-weight: 600;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    th {
      background: var(--forest);
      color: var(--white);
      padding: 12px 14px;
      text-align: center;
      font-weight: 600;
      font-size: 12.5px;
      border-right: 1px solid rgba(255,255,255,0.12);
      white-space: nowrap;
    }
    th:last-child { border-right: none; }
    td {
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
      border-right: 1px solid var(--border);
      vertical-align: middle;
    }
    td:last-child { border-right: none; }
    tr:nth-child(even) td {
      background-color: var(--gray-light);
    }
    tr:hover td {
      background-color: #f0eae1;
    }

    /* Section Row */
    tr.section-row td {
      background: var(--sand) !important;
      color: var(--forest);
      font-weight: 700;
      font-size: 13.5px;
      padding: 10px 18px;
      border-top: 2px solid var(--border);
      border-bottom: 2px solid var(--border);
    }

    /* Screenshot Thumbnail */
    .screenshot-thumb-box {
      width: 120px;
      height: 68px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border);
      background: #10251d;
      position: relative;
      cursor: pointer;
      margin: 0 auto;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .screenshot-thumb-box:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    }
    .screenshot-thumb-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .zoom-hint {
      position: absolute;
      bottom: 2px;
      right: 2px;
      background: rgba(0,0,0,0.65);
      color: #fff;
      font-size: 9px;
      padding: 1px 4px;
      border-radius: 4px;
      pointer-events: none;
    }

    /* Badges */
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 700;
      text-align: center;
      white-space: nowrap;
    }
    .badge-p1 { background: #FDE8E8; color: #9B1C1C; }
    .badge-p2 { background: #FEF08A; color: #854D0E; }
    .badge-p3 { background: #DEF7EC; color: #03543F; }
    .badge-ready { background: #DEF7EC; color: #03543F; }
    .badge-pending { background: #F3F4F6; color: #4B5563; font-style: italic; }

    .col-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: var(--forest);
      font-weight: 600;
    }
    .col-fmt {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      color: #1E40AF;
    }
    .col-qty {
      font-size: 14px;
      font-weight: 800;
      color: var(--forest);
      text-align: center;
    }

    /* Lightbox Modal */
    .lightbox-modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(10, 26, 19, 0.92);
      backdrop-filter: blur(8px);
      z-index: 100;
      justify-content: center;
      align-items: center;
      padding: 24px;
    }
    .lightbox-modal.open {
      display: flex;
    }
    .lightbox-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      background: #10251d;
      border: 1px solid rgba(255,255,255,0.2);
    }
    .lightbox-content img {
      max-width: 90vw;
      max-height: 82vh;
      display: block;
      object-fit: contain;
    }
    .lightbox-caption {
      padding: 12px 16px;
      background: var(--forest);
      color: var(--white);
      font-size: 13.5px;
      font-weight: 600;
      text-align: center;
      border-top: 1px solid rgba(255,255,255,0.15);
    }
    .lightbox-close {
      position: absolute;
      top: 10px;
      right: 14px;
      color: #fff;
      font-size: 24px;
      cursor: pointer;
      background: rgba(0,0,0,0.5);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      border: none;
    }
    .lightbox-close:hover {
      background: var(--gold);
    }

    /* Summary Card */
    .summary-footer-box {
      margin-top: 24px;
      padding: 16px 20px;
      background: var(--sand);
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 700;
      color: var(--forest);
      font-size: 14px;
    }
    .summary-footer-box .total-number {
      font-size: 20px;
      color: #9B1C1C;
    }
  </style>
</head>
<body>

  <header class="hero">
    <div class="hero-container">
      <div class="hero-title">
        <h1>LAKA HOMESTAY · BẢNG ORDER TÀI NGUYÊN MEDIA</h1>
        <p>Hệ thống định mức hình ảnh thực tế — Đầy đủ ảnh chụp màn hình vị trí UI chuẩn xác từ website</p>
      </div>
      <div class="hero-kpis">
        <div class="kpi-card">
          <div class="val">104 ẢNH</div>
          <div class="lbl">Bàn giao mới</div>
        </div>
        <div class="kpi-card">
          <div class="val">WebP</div>
          <div class="lbl">Chuẩn sRGB</div>
        </div>
        <div class="kpi-card">
          <div class="val">14 FILE</div>
          <div class="lbl">Đã có (Scan & Logo)</div>
        </div>
        <div class="kpi-card">
          <div class="val">13 TRANG</div>
          <div class="lbl">Phục vụ toàn web</div>
        </div>
      </div>
    </div>
  </header>

  <div class="tab-bar-wrap">
    <nav class="tab-bar" id="tabBar">
      <button class="tab-btn active" onclick="switchTab('tab-dash')">📊 00. Tổng quan Dashboard</button>
      <button class="tab-btn" onclick="switchTab('tab-home')">🏡 01. Trang Chủ</button>
      <button class="tab-btn" onclick="switchTab('tab-stays')">🛏️ 02. Lưu Trú (8 Dòng Căn)</button>
      <button class="tab-btn" onclick="switchTab('tab-exp')">🛶 03. Trải Nghiệm</button>
      <button class="tab-btn" onclick="switchTab('tab-din')">🍲 04. Ẩm Thực & Menu</button>
      <button class="tab-btn" onclick="switchTab('tab-srv')">✨ 05. Dịch Vụ</button>
      <button class="tab-btn" onclick="switchTab('tab-abt')">🌲 06. Về LAKA</button>
      <button class="tab-btn" onclick="switchTab('tab-dir')">🗺️ 07. Chỉ Đường</button>
      <button class="tab-btn" onclick="switchTab('tab-sub')">📜 08. Trang Con & FAQ</button>
      <button class="tab-btn" onclick="switchTab('tab-brand')">🏷️ 09. Brand & Logo</button>
    </nav>
  </div>

  <main class="main-content">
    <!-- TAB 0: DASHBOARD -->
    <div id="tab-dash" class="tab-panel active">
      <div class="table-card">
        <div class="table-header-info">
          <h2>TỔNG HỢP NHU CẦU TÀI NGUYÊN THEO TỪNG TRANG</h2>
          <span class="badge-url">Tất cả các trang web LAKA</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Trang / Tab Sheet</th>
              <th>URL Website</th>
              <th>SL ảnh bàn giao</th>
              <th>Định dạng file</th>
              <th>Ưu tiên</th>
              <th>Tỷ lệ & Kích thước chủ đạo</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
"""

    for r in dash_data:
        pri_class = "badge-p1" if "P1" in str(r[5]) else ("badge-p2" if "P2" in str(r[5]) else "badge-p3")
        st_class = "badge-ready" if "Đã có" in str(r[7]) else "badge-pending"
        html += f"""
            <tr>
              <td style="text-align:center; font-weight:700;">{r[0]}</td>
              <td style="font-weight:700; color:var(--forest);">{r[1]}</td>
              <td style="font-family:'JetBrains Mono',monospace;">{r[2]}</td>
              <td class="col-qty">{r[3]}</td>
              <td class="col-fmt" style="text-align:center;">{r[4]}</td>
              <td style="text-align:center;"><span class="badge {pri_class}">{r[5]}</span></td>
              <td style="text-align:center;">{r[6]}</td>
              <td style="text-align:center;"><span class="badge {st_class}">{r[7]}</span></td>
            </tr>
"""

    html += """
          </tbody>
        </table>
      </div>
      <div class="summary-footer-box">
        <span>TỔNG CỘNG TÀI NGUYÊN TOÀN BỘ WEBSITE:</span>
        <span class="total-number">104 ẢNH CHỤP MỚI + 14 FILE CÓ SẴN = 118 FILE TÀI NGUYÊN</span>
      </div>
    </div>
"""

    tab_ids = {
        "01_Trang_Chu": "tab-home",
        "02_Luu_Tru_8_Dong_Can": "tab-stays",
        "03_Trai_Nghiem": "tab-exp",
        "04_Am_Thuc": "tab-din",
        "05_Dich_Vu": "tab-srv",
        "06_Ve_Laka": "tab-abt",
        "07_Di_Chuyen_Map": "tab-dir",
        "08_Trang_Con_Phap_Ly_FAQ": "tab-sub",
        "09_Brand_Assets_Logo": "tab-brand"
    }

    for tab_key, tab_title, tab_url, rows in tabs_content:
        tab_id = tab_ids.get(tab_key, "tab-other")
        total_q = sum(r[5] for r in rows if not (isinstance(r, dict) and r.get("is_section_header")))

        html += f"""
    <!-- TAB: {tab_title} -->
    <div id="{tab_id}" class="tab-panel">
      <div class="table-card">
        <div class="table-header-info">
          <h2>DANH MỤC ORDER: {tab_title.upper()}</h2>
          <span class="badge-url">Đường dẫn: {tab_url}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh vị trí (UI Preview)</th>
              <th>Vị trí hiển thị trên Web (Section thực tế)</th>
              <th>Mã tài nguyên đề xuất</th>
              <th>Hạng mục</th>
              <th>SL bàn giao</th>
              <th>Định dạng</th>
              <th>Kích thước</th>
              <th>Tỷ lệ</th>
              <th>Ưu tiên</th>
              <th>Trạng thái</th>
              <th>Phụ trách</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
"""

        for item in rows:
            if isinstance(item, dict) and item.get("is_section_header"):
                html += f"""
            <tr class="section-row">
              <td colspan="13">📌 {item['title'].upper()}</td>
            </tr>
"""
                continue

            (stt, thumb_file, vi_tri, ma_file, hang_muc, sl, dinh_dang, kich_thuoc, ty_le, uu_tien, trang_thai, phu_trach, ghi_chu) = item
            pri_class = "badge-p1" if "P1" in str(uu_tien) else ("badge-p2" if "P2" in str(uu_tien) else "badge-p3")
            st_class = "badge-ready" if "Đã có" in str(trang_thai) else "badge-pending"

            if thumb_file:
                full_img_src = f"public/screenshots/order/{thumb_file}"
                thumb_img_src = f"public/screenshots/order/thumbs/{thumb_file}"
                thumb_html = f"""
                  <div class="screenshot-thumb-box" onclick="openLightbox('{full_img_src}', '{vi_tri}')">
                    <img src="{thumb_img_src}" alt="{vi_tri}" onerror="this.src='{full_img_src}'">
                    <span class="zoom-hint">🔍 Xem</span>
                  </div>
"""
            else:
                thumb_html = """<span style="color:#9CA3AF; font-size:12px;">-</span>"""

            html += f"""
            <tr>
              <td style="text-align:center; font-weight:700;">{stt}</td>
              <td style="text-align:center;">{thumb_html}</td>
              <td style="font-weight:600; color:var(--forest); max-width:300px;">{vi_tri}</td>
              <td class="col-code">{ma_file}</td>
              <td style="text-align:center;">{hang_muc}</td>
              <td class="col-qty">{sl if sl > 0 else 0}</td>
              <td class="col-fmt" style="text-align:center;">{dinh_dang}</td>
              <td style="text-align:center;">{kich_thuoc}</td>
              <td style="text-align:center;">{ty_le}</td>
              <td style="text-align:center;"><span class="badge {pri_class}">{uu_tien}</span></td>
              <td style="text-align:center;"><span class="badge {st_class}">{trang_thai}</span></td>
              <td style="text-align:center;">{phu_trach}</td>
              <td style="color:#4B5563; font-size:12.5px;">{ghi_chu}</td>
            </tr>
"""

        html += f"""
          </tbody>
        </table>
      </div>
      <div class="summary-footer-box">
        <span>TỔNG CỘNG SỐ LƯỢNG ẢNH TRANG NÀY:</span>
        <span class="total-number">{total_q} ẢNH</span>
      </div>
    </div>
"""

    html += """
  </main>

  <!-- Lightbox Modal -->
  <div id="lightbox" class="lightbox-modal" onclick="closeLightbox(event)">
    <div class="lightbox-content" onclick="event.stopPropagation()">
      <button class="lightbox-close" onclick="closeLightbox(event)">×</button>
      <img id="lightbox-img" src="" alt="Vị trí hiển thị">
      <div id="lightbox-caption" class="lightbox-caption"></div>
    </div>
  </div>

  <script>
    function switchTab(tabId) {
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      const target = document.getElementById(tabId);
      if (target) target.classList.add('active');
      event.target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openLightbox(src, caption) {
      document.getElementById('lightbox-img').src = src;
      document.getElementById('lightbox-caption').innerText = caption;
      document.getElementById('lightbox').classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox(e) {
      document.getElementById('lightbox').classList.remove('open');
      document.body.style.overflow = '';
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  </script>
</body>
</html>
"""

    out_html = os.path.join(PROJECT_DIR, "LAKA_Homestay_Asset_Order_Sheet.html")
    with open(out_html, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"HTML Sheet saved successfully: {out_html}")


if __name__ == "__main__":
    generate_workbook_and_html()
