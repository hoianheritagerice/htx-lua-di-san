/**********************************************************************
 * js/ban-do.js — RIÊNG cho ban-do.html (nặng: dữ liệu bản đồ + logic thửa)
 * Tách ra từ index.html gốc — KHÔNG đổi logic/tính năng.
 * Cần chung.js load TRƯỚC file này (dùng $, goiAPI, phienHienTai,
 * veUserBox, moModal, dongModal, linkNotion, escHtml).
 **********************************************************************/

// (b) Mã nông dân trong Mã sản phẩm Notion (CKOD-<MÃ>-HT26-…)
//     Sửa vế phải cho khớp CHÍNH XÁC với mã trong Notion của anh.
const MA_NONG_DAN = {
  // ----- Ông Đảng — Cẩm Kim -----
  CKOD: {
    'TRẦN CƯỚC': 'CUOC',
    'NGUYỄN HỘ': 'HO',
    'TÔ VĂN HƯNG': 'HUNG',        // 19/08/2026: đổi từ Nguyễn Thị Mừng (MUNG)   // đổi từ Tô Văn Hưng (HUNG) — lô Notion đã đổi theo
    'NGUYỄN SÔ': 'NGSO',          // ⚠ trùng với TRẦN SỞ — sửa theo Notion
    'TRẦN ĐÌNH CHÍNH': 'CHINH',   // 19/08/2026: đổi từ Nguyễn Thị Sáu (SAU)   // đổi từ Trần Đình Chính (CHINH) — lô Notion đã đổi theo
    'PHẠM THỊ HƯƠNG': 'HUONG',
    'HUỲNH KIM LONG 1/2': 'LONG1',
    'HUỲNH KIM LONG 2/2': 'LONG2',
    'TÔ THỊ ANH': 'ANH',
    'ĐỖ HỮU THÁI': 'THAI',
    'TRẦN SỞ': 'TRANSO',            // ⚠ trùng với NGUYỄN SÔ — sửa theo Notion
    'NGUYỄN MẠNH THẤN': 'THAN',
    'NGUYỄN ĐÌNH BÁN': 'BAN',
    'DƯƠNG NGUYỆN': 'NGUYEN',
    'DƯƠNG THỊ HOA': 'HOA',       // 20/08/2026: tách từ thửa Dương Nguyện (2029,4 → 1134,7 + 894,7)
    'NGUYỄN LA 1/2': 'LA1',
    'NGUYỄN LA 2/2': 'LA2',
    'ĐỖ HỐT 1/2': 'HOT1',
    'ĐỖ HỐT 2/2': 'HOT2',
    'VÕ THỊ THU': 'THU',
    'HUỲNH KIM BÌNH': 'BINH',
  },
  // ----- Đồng Cao — Cẩm Thanh -----
  CTDC: {
    'LÊ VĂN CẬY': 'CAY',
    'PHÚC': 'PHUC',
    'TRẦN LỆ 1/2': 'LE1',   // thửa lớn 1/2, thửa nhỏ 2/2 (đã sửa theo xác nhận)
    'TRANG CHÂU': 'CHAU',
    'LÊ PHÓ': 'PHO',
    'TRẦN BÉ 1/2': 'BE1',
    'LÊ HẢI TRIỀU 1/2': 'TRIEU1',
    'TRẦN VĂN CƯ 1/2': 'CU1',
    'VÕ THÀ 1/2': 'THA1',
    'TRẦN LỆ 2/2': 'LE2',   // thửa lớn 1/2, thửa nhỏ 2/2 (đã sửa theo xác nhận)
    'TRẦN THỊ HỦ 1/2': 'HU1',
    'TRẦN THỊ HỦ 2/2': 'HU2',
    'NGUYỄN VĂN KHÁNH 1/2': 'KHANH1',
    'PHẠM VĂN BẰNG': 'BANG',
    'LÊ VĂN THỨC 1/2': 'THUC1',
    'TRẦN HÒA': 'HOA',
    'LÊ THỊ BỐN': 'LBON',
    'HUỲNH PHƯỚC LONG': 'LONG',
    'ĐINH THỊ MỸ HẠNH': 'HANH',
    'PHẠM THỊ SÁU': 'SAU',
    'TRẦN BÉ 2/2': 'BE2',
    'ĐINH VĂN PHiÊN': 'PHIEN',
    'NGÔ BỐN': 'NBON',
    'NHÂN': 'NHAN',
    'TRẦN TRỌNG': 'TRONG',
    'ĐINH ĐỘ 1/2': 'DO1',
    'NGUYỄN VĂN MAI': 'MAI',
    'PHAN TUẤN VÂN': 'VAN',
    'VÕ THÀ 2/2': 'THA2',
    'NGUYỄN THỊ NGUYỆT': 'NGUYET',
    'NGUYỄN VĂN KHÁNH 2/2': 'KHANH2',
    'TRẦN VĂN CƯ 2/2': 'CU2',
    'TRẦN THỊ MỸ': 'MY',
    'NGUYỄN THỊ YẾN': 'YEN',
    'TRẦN THỊ HUỆ': 'HUE',
    'QUẢNG THỊ THÀNH': 'THANH',
    'ĐINH ĐỘ 2/2': 'DO2',
    'LÊ HẢI TRIỀU 2/2': 'TRIEU2',
    'PHAN THỊ TÁM': 'TAM',
    'NGUYỄN VĂN SƠN': 'SON',
    'LÊ VĂN THỨC 2/2': 'THUC2',
  },
  // ----- Đồng Mẫu — Cẩm Thanh -----
  CTDM: {
    'PHẠM TRỌNG': 'TRONG',
    'TOÀN': 'TOAN',
    'BÙI CƯ': 'CU',
    'PHẠM HẬU': 'HAU',
    'NGUYỄN BÉ': 'BE',
    'TRẦN VĂN HỘI 1/2': 'HOI1',
    'NGUYỄN THỊ XÊ': 'XE',
    'NGUYỄN QUANG': 'QUANG',
    'LÊ HẢI': 'HAI',
    'LÊ THỊ HÀ': 'HA',
    'HUỲNH TƯ': 'TU7',   // ⚠ HUỲNH TƯ=TU, HUỲNH TỨ=HTU — 2 hộ khác nhau, để ý khi tạo lô
    'ĐỖ VĂN TÂM': 'TAM',
    'HUỲNH THÔNG': 'HTHONG',
    'TRẦN VĂN HỘI 2/2': 'HOI2',
    'VÕ THỊ NGỌC': 'NGOC',
    'HUỲNH TỨ': 'TU5',   // ⚠ HUỲNH TƯ=TU, HUỲNH TỨ=HTU — 2 hộ khác nhau, để ý khi tạo lô
    'TRƯƠNG THỊ SƯƠNG': 'SUONG',
    'NGUYỄN THỊ BÀN': 'BAN',
    'PHỔ': 'PHO',
    'PHẠM THÔNG': 'PTHONG',   // PHẠM THÔNG (phân biệt HUỲNH THÔNG=THONG)
  },
};

/* ================================================================
   2. DỮ LIỆU BẢN ĐỒ (sinh tự động từ file DXF — không cần sửa)
   ================================================================ */
const ALL_FIELDS = {
  CKOD: {"field": "CKOD", "fieldName": "Ông Đảng — Cẩm Kim", "viewW": 5726.6, "viewH": 4686.4, "plots": [{"farmer": "NGUYỄN HỘ", "symbol": "", "area": "532.2", "code": "HO", "points": [[249.7, 2721.6], [589.8, 2770.5], [451.6, 3293.1], [120.0, 3250.6]], "cx": 352.8, "cy": 3007.6}, {"farmer": "TRẦN CƯỚC", "symbol": "", "area": "535.5", "code": "CUOC", "points": [[589.8, 2770.5], [451.6, 3293.1], [887.6, 3348.9], [1003.7, 2829.9]], "cx": 732.2, "cy": 3062.6}, {"farmer": "TÔ VĂN HƯNG", "symbol": "", "area": "695.9", "code": "HUNG", "points": [[887.6, 3348.9], [1293.2, 3400.9], [1396.3, 2762.7], [1031.2, 2708.7]], "cx": 1150.7, "cy": 3060.7, "nl": ["TÔ VĂN", "HƯNG"]}, {"farmer": "NGUYỄN SÔ", "symbol": "", "area": "675.2", "code": "NGSO", "points": [[1396.3, 2762.7], [1847.3, 2829.4], [1742.3, 3255.6], [1486.0, 3425.6], [1293.2, 3400.9]], "cx": 1551.7, "cy": 3082.2}, {"farmer": "TRẦN ĐÌNH CHÍNH", "symbol": "", "area": "612.8", "code": "CHINH", "points": [[1742.3, 3255.6], [1967.4, 2371.2], [2221.8, 2405.3], [2039.6, 3324.8]], "cx": 1990.4, "cy": 2852.6, "rot": -78.8}, {"farmer": "PHẠM THỊ HƯƠNG", "symbol": "", "area": "1009.7", "code": "HUONG", "points": [[2039.6, 3324.8], [2456.3, 3421.9], [2630.1, 2460.0], [2221.8, 2405.3]], "cx": 2337.8, "cy": 2906.3, "rot": -79.8}, {"farmer": "HUỲNH KIM LONG", "symbol": "2/2", "area": "496.7", "code": "LONG2", "points": [[2773.0, 3304.7], [3060.5, 3322.0], [3194.3, 2535.7], [2905.4, 2497.0]], "cx": 2982.8, "cy": 2913.7, "rot": -80.7}, {"farmer": "TÔ THỊ ANH", "symbol": "", "area": "1043.1", "code": "ANH", "points": [[3218.2, 2395.3], [3023.4, 3548.4], [3503.4, 3590.9], [3658.7, 2443.9]], "cx": 3349.4, "cy": 3002.5}, {"farmer": "ĐỖ HỮU THÁI", "symbol": "", "area": "603.7", "code": "THAI", "points": [[2630.1, 2460.0], [2905.4, 2497.0], [2773.0, 3304.7], [2477.5, 3304.7]], "cx": 2694.8, "cy": 2894.8, "rot": -79.8}, {"farmer": "HUỲNH KIM LONG", "symbol": "1/2", "area": "947.1", "code": "LONG1", "points": [[5044.1, 3348.8], [4464.8, 3297.6], [4514.5, 2603.8], [5101.6, 2754.3]], "cx": 4774.1, "cy": 2998.4}, {"farmer": "TRẦN SỞ", "symbol": "", "area": "1196.9", "code": "TRANSO", "points": [[4464.8, 3297.6], [4464.8, 3393.8], [4247.4, 3393.8], [4199.2, 3552.1], [3947.6, 3491.6], [4023.8, 2477.9], [4514.5, 2603.8]], "cx": 4221.6, "cy": 3005.0}, {"farmer": "NGUYỄN MẠNH THẤN", "symbol": "", "area": "780.5", "code": "THAN", "points": [[5533.4, 3387.6], [5640.5, 2884.7], [5101.6, 2754.3], [5044.1, 3348.8]], "cx": 5324.4, "cy": 3087.3}, {"farmer": "NGUYỄN ĐÌNH BÁN", "symbol": "", "area": "930.1", "code": "BAN", "points": [[4023.8, 2477.9], [3658.7, 2443.9], [3503.4, 3590.9], [3947.6, 3491.6]], "cx": 3777.8, "cy": 3016.0, "fs": 40}, {"farmer": "DƯƠNG THỊ HOA", "symbol": "", "area": "894.7", "code": "HOA", "points": [[2081.6, 1924.0], [2075.8, 1946.5], [3239.0, 2254.4], [3284.8, 1965.9], [2140.1, 1662.9]], "cx": 2685.0, "cy": 1957.8}, {"farmer": "DƯƠNG NGUYỆN", "symbol": "", "area": "1134.7", "code": "NGUYEN", "points": [[2075.8, 1946.5], [1967.4, 2371.2], [3194.3, 2535.7], [3239.0, 2254.4]], "cx": 2576.8, "cy": 2269.4}, {"farmer": "NGUYỄN LA", "symbol": "1/2", "area": "1164.1", "code": "LA1", "points": [[2140.1, 1662.9], [2207.3, 1363.5], [3340.2, 1663.6], [3284.8, 1965.9]], "cx": 2743.0, "cy": 1664.2}, {"farmer": "ĐỖ HỐT", "symbol": "2/2", "area": "611.2", "code": "HOT2", "points": [[1812.6, 1261.8], [2207.3, 1363.5], [2081.6, 1924.0], [1670.9, 1818.3]], "cx": 1942.6, "cy": 1593.8}, {"farmer": "ĐỖ HỐT", "symbol": "1/2", "area": "686.7", "code": "HOT1", "points": [[1374.9, 1136.4], [1225.6, 1703.8], [1670.9, 1818.3], [1812.6, 1261.8]], "cx": 1520.1, "cy": 1480.3}, {"farmer": "NGUYỄN LA", "symbol": "2/2", "area": "762.5", "code": "LA2", "points": [[1555.1, 451.3], [1976.7, 646.7], [1812.6, 1261.8], [1374.9, 1136.4]], "cx": 1676.1, "cy": 872.4}, {"farmer": "VÕ THỊ THU", "symbol": "", "area": "977.8", "code": "THU", "points": [[1976.7, 646.7], [2277.2, 786.1], [2221.4, 1091.4], [2794.3, 1239.3], [2736.4, 1499.9], [1812.6, 1261.8]], "cx": 2236.8, "cy": 1136.4, "lx": 2100.0, "ly": 1180.0}, {"farmer": "HUỲNH KIM BÌNH", "symbol": "", "area": "765", "code": "BINH", "points": [[737.6, 547.8], [840.6, 120.0], [1555.1, 451.3], [1468.2, 766.5]], "cx": 1133.0, "cy": 464.2}], "zones": [{"text": "ĐẤT MÀU", "x": 2995.5, "y": 1457.0}, {"text": "ĐẤT MÀU", "x": 1841.1, "y": 362.9}, {"text": "ĐẤT MÀU", "x": 1043.7, "y": 1122.9}, {"text": "ĐẤT MÀU", "x": 1598.0, "y": 2304.4}, {"text": "KHU DÂN CƯ", "x": 1183.8, "y": 3542.8}, {"text": "KHU DÂN CƯ", "x": 4825.0, "y": 3598.4}, {"text": "SÔNG THU BỒN", "x": 3433.8, "y": 782.9, "fs": 96, "rot": 42.0}, {"text": "ĐƯỜNG BÊ TÔNG", "x": 3036.7, "y": 993.4, "fs": 60, "rot": 43.8}, {"text": "XƯỞNG GHE BẦU", "x": 3646.8, "y": 2174.1, "fs": 60, "rot": 7.2}], "canals": [], "roads": [[[1162.9, -624.0], [1682.1, -231.2], [2059.8, 61.1], [2466.9, 388.5], [2734.4, 613.8], [2997.9, 845.9], [3256.3, 1086.0], [3524.2, 1350.9], [3967.9, 1812.5], [4106.5, 1941.8], [4238.9, 2049.8], [4364.3, 2136.4], [4508.7, 2221.0], [4661.8, 2297.1], [4822.9, 2366.0], [4973.1, 2422.3], [5181.1, 2491.2], [5726.6, 2645.3], [5706.4, 2778.5], [5284.7, 2662.0], [5077.4, 2598.4], [4874.3, 2528.4], [4676.7, 2449.9], [4486.1, 2360.7], [4393.9, 2311.5], [4216.4, 2202.3], [4131.5, 2141.8], [3951.5, 1993.0], [3781.1, 1829.4], [3451.4, 1483.7], [3172.8, 1204.1], [2885.7, 935.4], [2591.4, 676.2], [2291.0, 424.8], [1985.8, 179.7], [1677.0, -60.7], [1053.3, -533.6]]], "viewX0": 60.0, "viewY0": -684.0},
  CTDC: {"field": "CTDC", "fieldName": "Đồng Cao — Cẩm Thanh", "viewW": 8337.3, "viewH": 6369.9, "plots": [{"farmer": "LÊ VĂN CẬY", "symbol": "", "area": "616", "code": "CAY", "points": [[2912.1, 2434.3], [4000.5, 2434.3], [4029.8, 4416.6], [2912.1, 3604.8]], "cx": 3460.6, "cy": 3019.6, "lx": 3459.9, "ly": 3138.3, "fs": 70, "rot": -1.0}, {"farmer": "PHÚC", "symbol": "", "area": "749", "code": "PHUC", "points": [[5280.3, 1284.5], [6764.8, 1284.5], [6794.4, 2434.3], [5315.1, 2434.3]], "cx": 6038.6, "cy": 1859.4, "lx": 6030.9, "ly": 1798.2, "fs": 70, "rot": -1.0}, {"farmer": "TRẦN LỆ", "symbol": "1/2", "area": "711", "code": "LE1", "points": [[2034.3, 1284.5], [2034.3, 128.4], [3439.1, 128.4], [3439.1, 1284.5]], "cx": 2736.7, "cy": 706.4, "lx": 2728.5, "ly": 655.0, "fs": 70, "rot": -1.0}, {"farmer": "TRANG CHÂU", "symbol": "", "area": "508", "code": "CHAU", "points": [[5802.2, 4253.3], [5787.5, 3621.2], [6824.6, 3649.8], [6848.4, 4818.1], [5802.2, 4793.3]], "cx": 6313.0, "cy": 3951.5, "lx": 6297.0, "ly": 4187.0, "fs": 70, "rot": -1.0}, {"farmer": "LÊ PHÓ", "symbol": "", "area": "530", "code": "PHO", "points": [[5737.2, 1284.5], [5711.3, 128.4], [6739.9, 128.4], [6764.8, 1284.5]], "cx": 6238.3, "cy": 706.4, "lx": 6270.9, "ly": 655.0, "fs": 70, "rot": -1.0}, {"farmer": "TRẦN BÉ", "symbol": "1/2", "area": "536", "code": "BE1", "points": [[6840.6, 4291.6], [8136.3, 4339.4], [8173.0, 5225.4], [6858.7, 5176.3]], "cx": 7501.9, "cy": 4757.8, "lx": 7424.6, "ly": 4775.8, "fs": 70, "rot": -1.0}, {"farmer": "LÊ HẢI TRIỀU", "symbol": "1/2", "area": "501", "code": "TRIEU1", "points": [[4773.5, 1284.5], [4733.8, 128.4], [5711.3, 128.4], [5737.2, 1284.5]], "cx": 5238.9, "cy": 706.4, "lx": 5191.0, "ly": 663.1, "fs": 70, "rot": -1.0}, {"farmer": "TRẦN VĂN CƯ", "symbol": "1/2", "area": "509", "code": "CU1", "points": [[6819.2, 3430.4], [8100.2, 3468.2], [8136.3, 4339.4], [6840.6, 4291.6]], "cx": 7473.8, "cy": 3879.9, "lx": 7452.4, "ly": 3874.9, "fs": 70, "rot": -1.0}, {"farmer": "VÕ THÀ", "symbol": "1/2", "area": "504", "code": "THA1", "points": [[4824.8, 2434.3], [5759.9, 2434.3], [5787.5, 3621.2], [4867.3, 3621.2]], "cx": 5309.9, "cy": 3027.8, "lx": 5327.8, "ly": 3019.9, "fs": 70, "rot": -1.0}, {"farmer": "TRẦN LỆ", "symbol": "2/2", "area": "502", "code": "LE2", "points": [[6777.0, 1735.4], [8008.9, 1735.4], [8055.5, 2620.0], [6799.0, 2620.0]], "cx": 7410.1, "cy": 2177.7, "lx": 7399.2, "ly": 2204.9, "fs": 70, "rot": -1.0}, {"farmer": "TRẦN THỊ HỦ", "symbol": "1/2", "area": "464", "code": "HU1", "points": [[6759.0, 1014.5], [6739.9, 128.4], [7945.8, 128.4], [7980.6, 1014.5]], "cx": 7356.3, "cy": 571.4, "lx": 7332.3, "ly": 603.1, "fs": 70, "rot": -1.0}, {"farmer": "TRẦN THỊ HỦ", "symbol": "2/2", "area": "467", "code": "HU2", "points": [[137.2, 1281.9], [120.0, 120.0], [1040.7, 124.0], [1044.7, 1284.5]], "cx": 585.7, "cy": 702.9, "lx": 591.9, "ly": 668.1, "fs": 70, "rot": -1.0}, {"farmer": "NGUYỄN VĂN KHÁNH", "symbol": "1/2", "area": "484", "code": "KHANH1", "points": [[6799.0, 2620.0], [8055.5, 2620.0], [8100.2, 3468.2], [6819.2, 3430.4]], "cx": 7443.0, "cy": 3025.2, "lx": 7428.9, "ly": 2987.5, "fs": 70, "rot": -1.0}, {"farmer": "PHẠM VĂN BẰNG", "symbol": "", "area": "499", "code": "BANG", "points": [[3865.8, 1284.5], [3865.8, 128.4], [4733.8, 128.4], [4773.5, 1284.5]], "cx": 4309.7, "cy": 706.4, "lx": 4307.5, "ly": 679.5, "fs": 70, "rot": -1.0}, {"farmer": "LÊ VĂN THỨC", "symbol": "1/2", "area": "375", "code": "THUC1", "points": [[6858.7, 5176.3], [8173.0, 5225.4], [8209.0, 6057.4], [6877.5, 5825.4]], "cx": 7527.4, "cy": 5525.4, "lx": 7510.1, "ly": 5530.8, "fs": 70, "rot": -1.0}, {"farmer": "TRẦN HÒA", "symbol": "", "area": "360", "code": "HOA", "points": [[5828.2, 5642.6], [5802.2, 4793.3], [6848.4, 4818.1], [6853.7, 5176.1], [6877.5, 5825.4]], "cx": 6341.6, "cy": 5409.4, "lx": 6286.6, "ly": 5213.7, "fs": 70, "rot": -1.0}, {"farmer": "LÊ THỊ BỐN", "symbol": "", "area": "473", "code": "LBON", "points": [[2034.3, 2434.3], [2912.1, 2434.3], [2912.1, 3604.8], [2034.3, 3429.9]], "cx": 2473.2, "cy": 2932.1, "lx": 2510.7, "ly": 2816.3, "fs": 70, "rot": -1.0}, {"farmer": "HUỲNH PHƯỚC LONG", "symbol": "", "area": "471", "code": "LONG", "points": [[3985.3, 1284.5], [4773.5, 1284.5], [4824.8, 2434.3], [4000.5, 2434.3]], "cx": 4396.0, "cy": 1859.4, "lx": 4393.0, "ly": 1866.7, "fs": 70, "rot": -1.0}, {"farmer": "ĐINH THỊ MỸ HẠNH", "symbol": "", "area": "414", "code": "HANH", "points": [[1042.1, 3268.7], [996.9, 2434.3], [2034.3, 2434.3], [2034.3, 3429.9]], "cx": 1526.9, "cy": 2851.5, "lx": 1505.3, "ly": 2799.4, "fs": 70, "rot": -1.0}, {"farmer": "PHẠM THỊ SÁU", "symbol": "", "area": "468", "code": "SAU", "points": [[6759.0, 1014.5], [7980.6, 1014.5], [8008.9, 1735.4], [6777.0, 1735.4]], "cx": 7381.4, "cy": 1374.9, "lx": 7326.2, "ly": 1326.2, "fs": 70, "rot": -1.0}, {"farmer": "TRẦN BÉ", "symbol": "2/2", "area": "415", "code": "BE2", "points": [[4026.4, 4191.3], [4012.9, 3275.9], [4855.0, 3275.9], [4888.8, 4219.6]], "cx": 4445.5, "cy": 3733.6, "lx": 4420.3, "ly": 3685.9, "fs": 70, "rot": -1.0}, {"farmer": "ĐINH VĂN PHiÊN", "symbol": "", "area": "338", "code": "PHIEN", "points": [[4000.5, 2434.3], [4824.8, 2434.3], [4855.0, 3275.9], [4012.9, 3275.9]], "cx": 4423.3, "cy": 2855.1, "lx": 4411.8, "ly": 2858.5, "fs": 70, "rot": -1.0}, {"farmer": "NGÔ BỐN", "symbol": "", "area": "273", "code": "NBON", "points": [[4930.6, 5385.5], [4909.3, 4793.3], [5802.2, 4793.3], [5828.2, 5642.6], [5057.2, 5521.7]], "cx": 5365.6, "cy": 5089.4, "lx": 5375.8, "ly": 5089.7, "fs": 70, "rot": -1.0}, {"farmer": "NHÂN", "symbol": "", "area": "227", "code": "NHAN", "points": [[1487.9, 1284.5], [1460.3, 125.8], [2034.3, 128.4], [2034.3, 1284.5]], "cx": 1754.2, "cy": 706.4, "lx": 1747.2, "ly": 668.7, "fs": 70, "rot": -1.0}, {"farmer": "TRẦN TRỌNG", "symbol": "", "area": "306", "code": "TRONG", "points": [[3439.1, 1284.5], [3985.3, 1284.5], [4000.5, 2434.3], [3439.1, 2434.3]], "cx": 3716.0, "cy": 1859.4, "lx": 3650.1, "ly": 1897.9, "fs": 70, "rot": -91.0}, {"farmer": "ĐINH ĐỘ", "symbol": "1/2", "area": "247", "code": "DO1", "points": [[5774.2, 3049.5], [5759.9, 2434.3], [6794.4, 2434.3], [6809.7, 3049.5]], "cx": 6284.6, "cy": 2741.9, "lx": 6271.1, "ly": 2731.1, "fs": 70, "rot": -1.0}, {"farmer": "NGUYỄN VĂN MAI", "symbol": "", "area": "260", "code": "MAI", "points": [[1508.8, 2434.3], [1487.9, 1284.5], [2034.3, 1284.5], [2034.3, 2434.3]], "cx": 1766.4, "cy": 1859.4, "lx": 1719.8, "ly": 1866.4, "fs": 70, "rot": -91.0}, {"farmer": "PHAN TUẤN VÂN", "symbol": "", "area": "275", "code": "VAN", "points": [[934.5, 1284.7], [1487.9, 1284.5], [1508.8, 2434.3], [996.9, 2434.3]], "cx": 1232.0, "cy": 1859.5, "lx": 1207.9, "ly": 1850.6, "fs": 70, "rot": -91.0}, {"farmer": "VÕ THÀ", "symbol": "2/2", "area": "238", "code": "THA2", "points": [[6809.7, 3049.5], [6824.6, 3649.8], [5787.5, 3621.2], [5774.2, 3049.5]], "cx": 6298.8, "cy": 3335.4, "lx": 6254.7, "ly": 3289.7, "fs": 70, "rot": -1.0}, {"farmer": "NGUYỄN THỊ NGUYỆT", "symbol": "", "area": "270", "code": "NGUYET", "points": [[2912.1, 1284.5], [3439.1, 1284.5], [3439.1, 2434.3], [2912.1, 2434.3]], "cx": 3175.6, "cy": 1859.4, "lx": 3165.1, "ly": 1882.2, "fs": 70, "rot": -91.0}, {"farmer": "NGUYỄN VĂN KHÁNH", "symbol": "2/2", "area": "275", "code": "KHANH2", "points": [[4029.8, 4416.6], [4026.4, 4191.3], [4888.8, 4219.6], [4930.6, 5385.5]], "cx": 4696.7, "cy": 4901.0, "lx": 4510.0, "ly": 4438.5, "fs": 70, "rot": -1.0, "nl": ["NGUYỄN VĂN", "KHÁNH 2/2"]}, {"farmer": "TRẦN VĂN CƯ", "symbol": "2/2", "area": "262", "code": "CU2", "points": [[4773.5, 1284.5], [5280.3, 1284.5], [5315.1, 2434.3], [4824.8, 2434.3]], "cx": 5048.4, "cy": 1859.4, "lx": 5042.3, "ly": 1826.2, "fs": 65, "rot": -1.0, "nl": ["TRẦN VĂN", "CƯ 2/2"]}, {"farmer": "TRẦN THỊ MỸ", "symbol": "", "area": "239", "code": "MY", "points": [[4888.8, 4219.6], [4867.3, 3621.2], [5787.5, 3621.2], [5802.2, 4253.3]], "cx": 5336.2, "cy": 3920.4, "lx": 5344.4, "ly": 3860.0, "fs": 70, "rot": -1.0}, {"farmer": "NGUYỄN THỊ YẾN", "symbol": "", "area": "211", "code": "YEN", "points": [[267.2, 1282.3], [548.7, 1283.3], [653.7, 3262.3], [372.5, 3262.6]], "cx": 460.5, "cy": 2272.8, "lx": 492.0, "ly": 2267.6, "fs": 70, "rot": -91.0}, {"farmer": "TRẦN THỊ HUỆ", "symbol": "", "area": "262", "code": "HUE", "points": [[2445.2, 1284.5], [2912.1, 1284.5], [2912.1, 2434.3], [2445.2, 2434.3]], "cx": 2678.7, "cy": 1859.4, "lx": 2645.7, "ly": 1897.9, "fs": 70, "rot": -91.0}, {"farmer": "QUẢNG THỊ THÀNH", "symbol": "", "area": "226", "code": "THANH", "points": [[4909.3, 4793.3], [4888.8, 4219.6], [5802.2, 4253.3], [5802.2, 4793.3]], "cx": 5350.9, "cy": 4523.3, "lx": 5323.9, "ly": 4441.3, "fs": 70, "rot": -1.0}, {"farmer": "ĐINH ĐỘ", "symbol": "2/2", "area": "223", "code": "DO2", "points": [[1044.7, 1284.5], [1040.7, 124.0], [1460.3, 125.8], [1487.9, 1283.6]], "cx": 1258.4, "cy": 704.7, "lx": 1243.2, "ly": 703.0, "fs": 70, "rot": -91.0}, {"farmer": "LÊ HẢI TRIỀU", "symbol": "2/2", "area": "196", "code": "TRIEU2", "points": [[3439.1, 1284.5], [3439.1, 128.4], [3865.8, 128.4], [3865.8, 1284.5]], "cx": 3652.5, "cy": 706.4, "lx": 3661.7, "ly": 784.3, "fs": 70, "rot": -91.0}, {"farmer": "PHAN THỊ TÁM", "symbol": "", "area": "257", "code": "TAM", "points": [[2034.3, 1284.5], [2445.2, 1284.5], [2445.2, 2434.3], [2034.3, 2434.3]], "cx": 2239.8, "cy": 1859.4, "lx": 2240.1, "ly": 1892.7, "fs": 70, "rot": -91.0}, {"farmer": "NGUYỄN VĂN SƠN", "symbol": "", "area": "177", "code": "SON", "points": [[548.7, 1283.3], [749.3, 1284.1], [848.3, 3265.5], [653.7, 3262.3]], "cx": 700.0, "cy": 2273.2, "lx": 722.8, "ly": 2275.1, "fs": 70, "rot": -91.0}, {"farmer": "LÊ VĂN THỨC", "symbol": "2/2", "area": "161", "code": "THUC2", "points": [[749.3, 1284.1], [934.5, 1284.7], [1042.1, 3268.7], [848.3, 3265.5]], "cx": 893.5, "cy": 2275.1, "lx": 912.1, "ly": 2294.0, "fs": 70, "rot": -91.0}], "canals": [[[2912.1, 3604.8], [4029.8, 4416.6], [5057.2, 5521.7], [8209.0, 6057.4], [8217.3, 6249.9], [4976.2, 5691.6], [3936.8, 4584.2], [2912.1, 3824.6]]], "zones": [{"text": "ĐƯỜNG TỐNG VĂN SƯƠNG", "x": 8603.8, "y": 3522.7, "fs": 180, "rot": 87.8}, {"text": "NHÀ HÀNG THE FIELD", "x": 82.0, "y": 2573.5, "fs": 180, "rot": 87.8}, {"text": "SÔNG", "x": 2316.1, "y": 4647.8, "fs": 240, "rot": 28.2}, {"text": "ĐƯỜNG BÊ TÔNG", "x": 4032.4, "y": -376.3, "fs": 180, "rot": 0.7}, {"text": "KÊNH THỦY LỢI", "x": 6898.6, "y": 5967.1, "fs": 107, "rot": 9.5}, {"text": "KÊNH THỦY LỢI", "x": 3462.6, "y": 4164.4, "fs": 107, "rot": 37.5}]},
  CTDM: {"field": "CTDM", "fieldName": "Đồng Mẫu — Cẩm Thanh", "viewW": 9910.7, "viewH": 16745.3, "plots": [{"farmer": "PHẠM TRỌNG", "symbol": "", "area": "1365", "code": "TRONG", "points": [[350.0, 11954.5], [4864.2, 12164.5], [4864.2, 14775.6], [350.0, 14476.1]], "cx": 2607.1, "cy": 13320.3, "lx": 2553.7, "ly": 13297.0, "fs": 200, "rot": 2.0}, {"farmer": "TOÀN", "symbol": "", "area": "1077", "code": "TOAN", "points": [[9555.5, 12193.7], [5130.3, 11998.2], [5130.3, 9659.2], [9555.5, 9757.7]], "cx": 7342.9, "cy": 10877.9, "lx": 7262.7, "ly": 10742.4, "fs": 200, "rot": 2.0}, {"farmer": "BÙI CƯ", "symbol": "", "area": "1017", "code": "CU", "points": [[5130.3, 11998.2], [9555.5, 12193.7], [9555.5, 14530.3], [5130.3, 14302.2]], "cx": 7342.9, "cy": 13247.9, "lx": 7188.6, "ly": 13038.4, "fs": 200, "rot": 2.0}, {"farmer": "PHẠM HẬU", "symbol": "", "area": "1027", "code": "HAU", "points": [[350.0, 3067.2], [4864.2, 3199.6], [4864.2, 5209.0], [350.0, 5143.8]], "cx": 2607.1, "cy": 4171.7, "lx": 2587.3, "ly": 4091.1, "fs": 200, "rot": 2.0}, {"farmer": "NGUYỄN BÉ", "symbol": "", "area": "1036", "code": "BE", "points": [[350.0, 5143.8], [4864.2, 5209.0], [4864.2, 7133.9], [350.0, 6990.9]], "cx": 2607.1, "cy": 6100.0, "lx": 2575.6, "ly": 6051.1, "fs": 200, "rot": 2.0}, {"farmer": "TRẦN VĂN HỘI", "symbol": "1/2", "area": "734", "code": "HOI1", "points": [[5130.3, 14302.2], [9555.5, 14530.3], [9555.5, 16395.3], [5130.3, 15977.7]], "cx": 7342.9, "cy": 15254.0, "lx": 7219.7, "ly": 15058.7, "fs": 200, "rot": 2.0}, {"farmer": "NGUYỄN THỊ XÊ", "symbol": "", "area": "735", "code": "XE", "points": [[9555.5, 614.2], [9555.5, 2343.1], [5130.3, 2343.1], [5130.3, 614.2]], "cx": 7342.9, "cy": 1478.6, "lx": 7284.6, "ly": 1506.8, "fs": 200, "rot": 2.0}, {"farmer": "NGUYỄN QUANG", "symbol": "", "area": "668", "code": "QUANG", "points": [[5130.3, 3648.0], [9555.5, 3648.0], [9555.5, 5267.4], [5130.3, 5267.4]], "cx": 7342.9, "cy": 4457.7, "lx": 7237.7, "ly": 4435.7, "fs": 200, "rot": 2.0}, {"farmer": "LÊ HẢI", "symbol": "", "area": "691", "code": "HAI", "points": [[5130.3, 6539.7], [9555.5, 6539.7], [9555.5, 8165.8], [5130.3, 8117.4]], "cx": 7342.9, "cy": 7328.6, "lx": 7219.7, "ly": 7201.5, "fs": 200, "rot": 2.0}, {"farmer": "LÊ THỊ HÀ", "symbol": "", "area": "713", "code": "HA", "points": [[9555.5, 9757.7], [5130.3, 9659.2], [5130.3, 8117.4], [9555.5, 8165.8]], "cx": 7342.9, "cy": 8912.5, "lx": 7226.3, "ly": 8764.6, "fs": 200, "rot": 2.0}, {"farmer": "HUỲNH TƯ", "symbol": "", "area": "758", "code": "TU7", "points": [[350.0, 2029.9], [350.0, 613.7], [4864.2, 614.2], [4864.2, 2171.2]], "cx": 2607.1, "cy": 1322.0, "lx": 2539.9, "ly": 1153.7, "fs": 200, "rot": 2.0}, {"farmer": "ĐỖ VĂN TÂM", "symbol": "", "area": "572", "code": "TAM", "points": [[5130.3, 2343.1], [9555.5, 2343.1], [9555.5, 3648.0], [5130.3, 3648.0]], "cx": 7342.9, "cy": 2995.5, "lx": 7293.9, "ly": 2955.6, "fs": 200, "rot": 2.0}, {"farmer": "HUỲNH THÔNG", "symbol": "", "area": "584", "code": "HTHONG", "points": [[5130.3, 5267.4], [9555.5, 5267.4], [9555.5, 6539.7], [5130.3, 6539.7]], "cx": 7342.9, "cy": 5903.5, "lx": 7301.8, "ly": 5754.6, "fs": 200, "rot": 2.0}, {"farmer": "TRẦN VĂN HỘI", "symbol": "2/2", "area": "524", "code": "HOI2", "points": [[350.0, 14476.1], [4864.2, 14775.6], [4864.2, 15961.1], [350.0, 15530.9]], "cx": 2607.1, "cy": 15153.3, "lx": 2639.7, "ly": 15076.5, "fs": 200, "rot": 2.0}, {"farmer": "VÕ THỊ NGỌC", "symbol": "", "area": "512", "code": "NGOC", "points": [[350.0, 6990.9], [4864.2, 7133.9], [4864.2, 8230.9], [350.0, 8002.0]], "cx": 2607.1, "cy": 7567.9, "lx": 2596.1, "ly": 7478.9, "fs": 200, "rot": 2.0}, {"farmer": "HUỲNH TỨ", "symbol": "", "area": "530", "code": "TU5", "points": [[350.0, 2029.9], [4864.2, 2171.2], [4864.2, 3199.6], [350.0, 3067.2]], "cx": 2607.1, "cy": 2619.2, "lx": 2538.3, "ly": 2511.0, "fs": 200, "rot": 2.0}, {"farmer": "TRƯƠNG THỊ SƯƠNG", "symbol": "", "area": "525", "code": "SUONG", "points": [[350.0, 10957.7], [4864.2, 11116.0], [4864.2, 12164.5], [350.0, 11954.5]], "cx": 2607.1, "cy": 11535.3, "lx": 2465.7, "ly": 11512.1, "fs": 200, "rot": 2.0}, {"farmer": "NGUYỄN THỊ BÀN", "symbol": "", "area": "482", "code": "BAN", "points": [[350.0, 9907.0], [4864.2, 10136.9], [4864.2, 11116.0], [350.0, 10957.7]], "cx": 2607.1, "cy": 10547.3, "lx": 2488.8, "ly": 10412.9, "fs": 200, "rot": 2.0}, {"farmer": "PHỔ", "symbol": "", "area": "506", "code": "PHO", "points": [[350.0, 8911.6], [4864.2, 9152.2], [4864.2, 10136.9], [350.0, 9907.0]], "cx": 2607.1, "cy": 9529.6, "lx": 2479.9, "ly": 9449.7, "fs": 200, "rot": 2.0}, {"farmer": "PHẠM THÔNG", "symbol": "", "area": "530", "code": "PTHONG", "points": [[350.0, 8002.0], [4864.2, 8230.9], [4864.2, 9152.2], [350.0, 8911.6]], "cx": 2607.1, "cy": 8571.2, "lx": 2558.6, "ly": 8494.6, "fs": 200, "rot": 2.0}], "canals": [[[9555.5, 614.2], [5125.1, 613.7], [5130.3, 15977.7], [4869.4, 15953.1], [4869.4, 614.2], [355.2, 613.7], [355.2, 350.0], [9560.7, 350.0]]], "zones": [{"text": "ĐƯỜNG TỐNG VĂN SƯƠNG", "x": 10493.0, "y": 7272.2, "fs": 360, "rot": 90.2}, {"text": "ĐƯỜNG BÊ TÔNG", "x": 22.3, "y": 8327.2, "fs": 240, "rot": 90.7}, {"text": "ĐƯỜNG BÊ TÔNG", "x": 5009.8, "y": 16527.8, "fs": 240, "rot": 5.1}, {"text": "KÊNH THỦY LỢI", "x": 4944.1, "y": 7102.1, "fs": 158, "rot": 90.2}, {"text": "KÊNH THỦY LỢI", "x": 5151.6, "y": 536.7, "fs": 161}]},
};

let MAP_DATA = ALL_FIELDS.CKOD;

/* ================================================================
   3. LOGIC — không cần sửa từ đây trở xuống
   ================================================================ */
/* ==================================================================
   CHẾ ĐỘ KHÁCH VÃNG LAI (chưa đăng nhập)
   ------------------------------------------------------------------
   Khách chỉ thấy hình dáng cánh đồng, tất cả thửa một màu xanh nhạt
   như nhau. Không màu trạng thái, không chú thích, chạm vào thửa thì
   mời đăng nhập chứ không mở chi tiết.

   LƯU Ý THẬT LÒNG: đây là che ở phần giao diện. Dữ liệu từng thửa vẫn
   nằm trong phản hồi của API, người rành kỹ thuật mở tab Network vẫn
   đọc được. Muốn chặn thật thì phải sửa Code.gs để server không trả
   dữ liệu thửa khi chưa đăng nhập.
   ================================================================== */
const HIEN_TEN_HO_CHO_KHACH = false;   // đổi thành true nếu muốn khách vẫn thấy tên hộ trên từng thửa

function laKhach(){
  return (typeof phienHienTai !== 'function') || !phienHienTai();
}

let ketQuaCuoi = null;     // giữ kết quả Notion gần nhất để vẽ lại khi đăng nhập/đăng xuất

let notionPlots = {};      // maNongDan -> {productCode, organic, area}
let thuaDangChon = null;
let cheDoChonNhieu = false;
let thuaDaChonNhieu = new Set();   // chỉ số các thửa đã tick
let zoomLv = 1;
let xoayLv = 0;

function nhanThua(p){ return (p.farmer + (p.symbol ? ' ' + p.symbol : '')).trim(); }

/* ---------- vẽ bản đồ ---------- */
/* ---------- vẽ bản đồ ---------- */
function veBanDo(){
  const d = MAP_DATA;
  xoayLv = 0;   // đổi bản đồ thì trả hướng về mặc định
  const x0 = d.viewX0 || 0, y0 = d.viewY0 || 0;
  let s = `<svg id="svgBanDo" viewBox="${x0} ${y0} ${d.viewW} ${d.viewH}" xmlns="http://www.w3.org/2000/svg"><g id="gXoay">`;
  const netVien = Math.max(12, Math.round(Math.max(d.viewW, d.viewH) * 0.0021));
  (d.canals||[]).forEach(c=>{
    s += `<polygon class="kenh" points="${c.map(pt=>pt.join(',')).join(' ')}" stroke-width="${netVien}"/>`;
  });
  (d.roads||[]).forEach(c=>{
    s += `<polygon class="duong" points="${c.map(pt=>pt.join(',')).join(' ')}" stroke-width="${netVien}"/>`;
  });
  d.plots.forEach((p,i)=>{
    const pts = p.points.map(pt=>pt.join(',')).join(' ');
    const lopThua = laKhach() ? 'thua khach' : 'thua chua-ro';
    s += `<polygon id="thua${i}" class="${lopThua}" points="${pts}" stroke-width="${netVien}" data-sw="${netVien}" onclick="chonThua(${i})"/>`;
  });
  const anTenHo = laKhach() && !HIEN_TEN_HO_CHO_KHACH;
  if(!anTenHo) d.plots.forEach(p=>{
    const nhan = nhanThua(p);
    const lx = p.lx || p.cx, ly = p.ly || p.cy;
    const f1 = p.fs || 46, f2 = (p.fs ? p.fs-2 : 42);
    const g = p.rot ? ` transform="rotate(${p.rot} ${lx} ${ly})"` : '';
    s += `<g${g}>`;
    const dongTen = p.nl || [nhan];
    dongTen.forEach((t,k)=>{
      s += `<text class="ten-nd" x="${lx}" y="${(ly - f1*0.26 + k*f1*1.1).toFixed(1)}" font-size="${f1}" text-anchor="middle">${t}</text>`;
    });
    s += `<text class="dt-nd" x="${lx}" y="${(ly + f1*0.96 + (dongTen.length-1)*f1*1.1).toFixed(1)}" font-size="${f2}" text-anchor="middle">${p.area}</text>`;
    s += `</g>`;
  });
  d.zones.forEach(z=>{
    const zr = z.rot ? ` transform="rotate(${z.rot} ${z.x} ${z.y})"` : '';
    s += `<text class="vung" x="${z.x}" y="${z.y}" font-size="${z.fs||86}" text-anchor="middle"${zr}>${z.text}</text>`;
  });
  s += '</g></svg>';
  $('svgwrap').innerHTML = s;
}

/* ---------- xoay bản đồ ---------- */
/* ---------- xoay bản đồ ---------- */
function xoay(delta){
  xoayLv = (xoayLv + delta) % 360;
  capNhatXoay();
}
function capNhatXoay(){
  const d = MAP_DATA;
  const svg = $('svgBanDo'), g = $('gXoay');
  if(!svg || !g) return;
  const x0 = d.viewX0 || 0, y0 = d.viewY0 || 0;
  const cx = x0 + d.viewW/2, cy = y0 + d.viewH/2;
  const rad = xoayLv * Math.PI/180;
  const c = Math.abs(Math.cos(rad)), si = Math.abs(Math.sin(rad));
  // nới khung nhìn theo góc để 4 góc bản đồ không bị cắt khi xoay
  const W = d.viewW*c + d.viewH*si, H = d.viewW*si + d.viewH*c;
  svg.setAttribute('viewBox', `${(cx - W/2).toFixed(1)} ${(cy - H/2).toFixed(1)} ${W.toFixed(1)} ${H.toFixed(1)}`);
  g.setAttribute('transform', `rotate(${xoayLv.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})`);
}

function zoom(f){
  zoomLv = Math.min(6, Math.max(1, zoomLv*f));
  $('svgwrap').style.width = (zoomLv*100)+'%';
  const svg = document.querySelector('#svgwrap svg');
  if(svg) svg.style.maxHeight = (zoomLv > 1) ? 'none' : '72vh';
}

/* ---------- nạp dữ liệu Notion & tô màu ---------- */
/* ---------- nạp dữ liệu Notion & tô màu ---------- */
const EP_MOI = new URLSearchParams(location.search).get('moi') === '1'; // ?moi=1 = bỏ qua đệm

function apDungKetQua(r){
  const tt = $('trangthai');
  ketQuaCuoi = r;
  notionPlots = {};
  r.plots.forEach(pl=>{
    const parts = (pl.productCode||'').split('-');
    if(parts.length >= 2) notionPlots[parts[1].toUpperCase()] = pl;
  });
  let khop = 0;
  const hoHuuCo = new Set();   // 1 người 2 thửa (LONG1/LONG2…) chỉ tính 1 hộ
  MAP_DATA.plots.forEach((p,i)=>{
    const ma = ((MA_NONG_DAN[MAP_DATA.field]||{})[nhanThua(p)]||'').toUpperCase();
    const nd = notionPlots[ma];
    const el = $('thua'+i);
    if(nd){
      khop++;
      if(nd.organic) hoHuuCo.add(p.farmer.trim().toUpperCase());
    }
    /* Khách: giữ nguyên một màu xanh nhạt, không tô trạng thái canh tác */
    if(laKhach()){
      el.classList.remove('huu-co','khong-huu-co','chua-ro');
      el.classList.add('khach');
      return;
    }
    el.classList.remove('khach','huu-co','vi-pham','khong-huu-co','chua-ro');
    /* Vụ ĐÃ THU HOẠCH mà thửa không có mã sản phẩm → hộ đó không tham gia
       hữu cơ vụ ấy, tô be. Vụ ĐANG canh tác thì để xám "chưa có dữ liệu",
       vì lúc đó nhiều khả năng chỉ là chưa kịp nhập liệu. */
    if(!nd && r.season && r.season.daXong){ el.classList.add('khong-huu-co'); return; }
    /* BA trạng thái: hữu cơ · hữu cơ nhưng vi phạm quy trình · không hữu cơ.
       Phải hỏi viPham TRƯỚC, vì máy chủ đặt organic=false cho lô vi phạm. */
    el.classList.add(!nd ? 'chua-ro' : (nd.viPham ? 'vi-pham' : (nd.organic ? 'huu-co' : 'khong-huu-co')));
  });
  tt.textContent = laKhach()
    ? 'Đăng nhập để xem trạng thái canh tác và nhật ký của từng thửa.'
    : `Đã khớp ${khop}/${MAP_DATA.plots.length} thửa (vụ ${$('selVu').value}).`;
  veVuPanel(r.season, hoHuuCo.size);
}

async function napNotion(){
  const tt = $('trangthai');
  tt.className='';
  const khoaDem = 'htxmap_v2_' + MAP_DATA.field + '_' + $('selVu').value;
  // Hiện ngay bằng dữ liệu lần trước (nếu có) rồi âm thầm tải bản mới
  let coDem = false;
  if(!EP_MOI){
    try{
      const dem = localStorage.getItem(khoaDem);
      if(dem){ apDungKetQua(JSON.parse(dem)); coDem = true; }
    }catch(e){}
  }
  if(!coDem) tt.textContent = 'Đang tải dữ liệu…';
  try{
    const r = await goiAPI({action:'getMapData', field: MAP_DATA.field, season: $('selVu').value, fresh: EP_MOI ? 1 : 0});
    if(!r.ok) throw r.error;
    apDungKetQua(r);
    try{ localStorage.setItem(khoaDem, JSON.stringify(r)); }catch(e){}
  }catch(e){
    if(!coDem){
      tt.className='loi';
      tt.textContent = 'Không tải được dữ liệu: ' + e + ' — bản đồ vẫn xem được, màu sắc chưa cập nhật.';
    }
  }
}

/* ---------- thanh tiến độ mùa vụ ---------- */
/* ---------- thanh tiến độ mùa vụ ---------- */
/* Xếp nhãn mốc thành nhiều hàng sao cho KHÔNG nhãn nào chồng nhãn nào.
   ------------------------------------------------------------------
   Cách cũ so le chẵn/lẻ không đủ: "Chín vàng 06/09" và "Thu hoạch 10/09"
   chỉ cách nhau 4 ngày, tức vài phần trăm chiều ngang, trong khi mỗi nhãn
   rộng 60-70px — khác hàng vẫn đè nếu hai nhãn nữa cùng hàng lại gần nhau.

   Nay ĐO chiều rộng thật của từng nhãn rồi xếp kiểu "chồng hộp": duyệt từ
   trái sang phải, mỗi nhãn tìm hàng thấp nhất còn chỗ trống. Cần bao nhiêu
   hàng thì dùng bấy nhiêu, và chừa đúng bấy nhiêu chỗ phía dưới thanh.
   Chạy lại mỗi khi đổi kích thước cửa sổ vì chiều rộng đổi thì chỗ đổi. */
function xepHangMocNhan_(){
  const khung = $('tienDoKhung');
  if(!khung) return;
  const nhan = Array.prototype.slice.call(khung.querySelectorAll('.moc-nhan'));
  if(!nhan.length) return;

  const W = khung.clientWidth || 1;
  const KHE = 10;          // khoảng hở tối thiểu giữa hai nhãn cùng hàng (px)
  const CAO_HANG = 30;     // phải khớp con số trong css/chung.css

  const ds = nhan.map(function(el){
    el.classList.remove('co-noi');
    el.style.setProperty('--h', 0);
    const tam = (parseFloat(el.style.left) || 0) / 100 * W;
    const w   = el.getBoundingClientRect().width || 70;
    return { el: el, tu: tam - w / 2, den: tam + w / 2 };
  }).sort(function(a, b){ return a.tu - b.tu; });

  const mepPhai = [];      // mép phải đã dùng của từng hàng
  let soHang = 1;
  ds.forEach(function(o){
    let h = 0;
    while(mepPhai[h] !== undefined && o.tu < mepPhai[h] + KHE) h++;
    mepPhai[h] = o.den;
    o.el.style.setProperty('--h', h);
    if(h > 0) o.el.classList.add('co-noi');
    if(h + 1 > soHang) soHang = h + 1;
  });

  khung.style.marginBottom = (22 + soHang * CAO_HANG) + 'px';
}

let henXepLai = null;
window.addEventListener('resize', function(){
  clearTimeout(henXepLai);
  henXepLai = setTimeout(xepHangMocNhan_, 150);
});

function veVuPanel(s, soHoDem){
  const panel = $('vuPanel');
  if(!s || !s.gieoSa || !s.thuHoach){ panel.style.display='none'; return; }
  panel.style.display='block';
  $('vuTen').textContent = 'Tiến độ mùa vụ — ' + (s.name || $('selVu').options[$('selVu').selectedIndex].text);

  const D = 86400000;
  const start = new Date(s.gieoSa+'T00:00:00');
  const end   = new Date(s.thuHoach+'T00:00:00');
  const nay   = new Date(); nay.setHours(0,0,0,0);
  const tongNgay = Math.max(1, Math.round((end-start)/D));
  const quaNgay  = Math.round((nay-start)/D);
  const pct = Math.min(100, Math.max(0, quaNgay/tongNgay*100));

  // Các mốc: chỉ hiện mốc đã có ngày trong Notion
  // Toàn bộ mốc lấy từ DB Vụ Mùa trong Notion — không có ngưỡng nào đặt cứng
  const mocs = [
    {ten:'Gieo sạ',      ngay:s.gieoSa},
    {ten:'Đẻ nhánh rộ',  ngay:s.deNhanh},
    {ten:'Làm đòng',     ngay:s.donDong},
    {ten:'Trổ bông',     ngay:s.troBong},
    {ten:'Chắc hạt',     ngay:s.chacHat},
    {ten:'Chín vàng',    ngay:s.chinVang},
    {ten:'Thu hoạch',    ngay:s.thuHoach},
  ].filter(m=>m.ngay).sort((a,b)=>a.ngay.localeCompare(b.ngay));

  let html = `<div class="tienDoFill" style="width:${pct}%"></div>`;
  let giaiDoanHT = 'Gieo sạ';
  mocs.forEach((m, i)=>{
    const d = new Date(m.ngay+'T00:00:00');
    const p = Math.min(100, Math.max(0, (d-start)/(end-start)*100));
    const qua = d <= nay;
    if(qua) giaiDoanHT = m.ten;
    const [y,mo,da] = m.ngay.split('-');
    html += `<div class="moc${qua?' qua':''}" style="left:${p}%"></div>`;
    html += `<div class="moc-nhan${qua?' qua':''}" style="left:${p}%">${m.ten}<small>${da}/${mo}</small></div>`;
  });
  $('tienDoKhung').innerHTML = html;
  xepHangMocNhan_();

  $('vuGiaiDoan').innerHTML = (quaNgay >= 0 && nay <= end)
    ? `🌾 Đang giai đoạn: <b>${giaiDoanHT}</b> — ngày thứ <b>${quaNgay}</b> sau gieo sạ (${Math.round(pct)}%)`
    : (nay > end ? `✅ Vụ đã kết thúc — tổng ${tongNgay} ngày canh tác` : `🌱 Vụ chưa bắt đầu — gieo sạ ngày ${s.gieoSa}`);

  // 3 thông số tổng
  $('tsDienTich').textContent = s.tongDienTich != null
    ? (s.tongDienTich >= 10000
        ? (s.tongDienTich/10000).toFixed(2).replace('.',',') + ' ha'
        : Math.round(s.tongDienTich).toLocaleString('vi-VN') + ' m²')
    : '—';
  $('tsSoHo').textContent = (soHoDem > 0) ? soHoDem + ' hộ'
    : (s.soHo != null ? s.soHo + ' hộ' : '—');
  $('tsSanLuong').textContent = (s.tongSanLuong != null && s.tongSanLuong > 0)
    ? Math.round(s.tongSanLuong).toLocaleString('vi-VN') + ' kg'
    : 'Chưa thu hoạch';
}

/* ---------- chọn thửa ---------- */
/* ---------- chọn thửa ---------- */
function chonThua(i){
  if(laKhach()){ moModal('mpDN'); return; }    // khách vãng lai: không mở chi tiết thửa
  if(cheDoChonNhieu){ tickThua(i); return; }   // đang chọn nhiều → chạm là tick
  thuaDangChon = i;
  document.querySelectorAll('.thua').forEach(e=>e.classList.remove('chon-active'));
  $('thua'+i).classList.add('chon-active');
  const p = MAP_DATA.plots[i];
  const ma = ((MA_NONG_DAN[MAP_DATA.field]||{})[nhanThua(p)]||'').toUpperCase();
  const nd = notionPlots[ma];
  $('tThua').textContent = nhanThua(p) + ' — ' + p.area + ' m²';
  $('tMa').textContent = nd ? nd.productCode : 'Chưa có mã sản phẩm';
  $('tBadge').innerHTML = nd
    ? (nd.viPham
        ? '<span class="badge vp">Canh tác hữu cơ nhưng vi phạm quy trình và tiêu chuẩn</span>'
          + (nd.nssDung != null ? '<div class="vp-ghi">Dừng tuân thủ từ NSS ' + nd.nssDung + ' — nhật ký không cập nhật tiếp sau mốc này.</div>' : '')
        : (nd.organic ? '<span class="badge hc">Canh tác hữu cơ</span>'
                      : '<span class="badge khc">Không hữu cơ</span>'))
    : '<span class="badge cr">Chưa có dữ liệu</span>';

  /* Nút sang trang truy xuất công khai — đúng trang khách quét mã QR sẽ
     thấy. Chỉ hiện khi thửa đã có mã sản phẩm trong Notion; thửa chưa có
     mã mà vẫn cho bấm thì khách sẽ rơi vào trang "không tìm thấy". */
  const nutTX = $('tTruyXuat');
  if (nutTX) {
    if (nd && nd.productCode) {
      nutTX.href = 'truy-xuat.html?ma=' + encodeURIComponent(nd.productCode);
      nutTX.style.display = '';
    } else {
      nutTX.style.display = 'none';
    }
  }
  moModal('mpThua');
}

/* ---------- chọn nhiều thửa ---------- */
/* ---------- chọn nhiều thửa ---------- */
function toggleChonNhieu(){
  cheDoChonNhieu = !cheDoChonNhieu;
  $('btnChonNhieu').classList.toggle('dang-bat', cheDoChonNhieu);
  $('thanhChonNhieu').style.display = cheDoChonNhieu ? 'flex' : 'none';
  if(!cheDoChonNhieu) xoaTickTatCa();
}
/* MỘT chỗ duy nhất cập nhật dòng đếm. Trước đây ba nơi tự gán chuỗi
   riêng; thêm chỗ thứ tư là chắc chắn quên một nơi nào đó. */
function capNhatDemChon(ghiChu){
  $('cnSoLuong').innerHTML = 'Đã chọn ' + thuaDaChonNhieu.size + ' thửa'
    + (ghiChu ? '<small>' + ghiChu + '</small>' : '');
}
function tickThua(i){
  if(thuaDaChonNhieu.has(i)){ thuaDaChonNhieu.delete(i); $('thua'+i).classList.remove('dachon-nhieu'); }
  else { thuaDaChonNhieu.add(i); $('thua'+i).classList.add('dachon-nhieu'); }
  capNhatDemChon('');   // tick tay thì bỏ ghi chú của lần chọn tự động
}
function xoaTickTatCa(){
  thuaDaChonNhieu.forEach(i=>{ const el=$('thua'+i); if(el) el.classList.remove('dachon-nhieu'); });
  thuaDaChonNhieu.clear();
  capNhatDemChon('');
}

/* ---------- chọn hết thửa đang canh tác hữu cơ ----------
   Căn cứ DUY NHẤT là cột "Canh tác hữu cơ" trong Notion, đọc qua
   notionPlots. Không suy từ màu trên bản đồ: màu chỉ là kết quả của
   cùng dữ liệu đó, lấy màu làm căn cứ là đi vòng và sẽ sai âm thầm nếu
   sau này đổi cách tô màu.

   NÓI RÕ CÁI GÌ BỊ BỎ QUA. Đây là bước chuẩn bị ghi xuống Notion cho
   hàng chục thửa cùng lúc; im lặng bỏ sót vài thửa rồi người dùng tưởng
   đã ghi hết là kiểu lỗi tốn cả buổi mới lần ra. */
function chonHetHuuCo(){
  const ph = phienHienTai();
  if(!ph){ moModal('mpDN'); return; }
  if(ph.role === 'khach'){ alert('Tài khoản khách không nhập liệu được.'); return; }

  if(!Object.keys(notionPlots).length){
    alert('Chưa tải xong dữ liệu thửa từ Notion nên chưa biết thửa nào hữu cơ.\n\n'
        + 'Anh chờ dòng trạng thái phía trên hiện "Đã khớp ... thửa" rồi bấm lại.');
    return;
  }

  if(!cheDoChonNhieu) toggleChonNhieu();   // tự bật chế độ chọn nhiều
  xoaTickTatCa();

  let khongHC = 0, chuaCoMa = 0;
  MAP_DATA.plots.forEach((p,i)=>{
    const ma = ((MA_NONG_DAN[MAP_DATA.field]||{})[nhanThua(p)]||'').toUpperCase();
    const nd = notionPlots[ma];
    if(!nd){ chuaCoMa++; return; }          // thửa chưa có mã sản phẩm trong vụ này
    if(!nd.organic){ khongHC++; return; }
    thuaDaChonNhieu.add(i);
    const el = $('thua'+i); if(el) el.classList.add('dachon-nhieu');
  });

  const boQua = [];
  if(khongHC)  boQua.push(khongHC + ' thửa không hữu cơ');
  if(chuaCoMa) boQua.push(chuaCoMa + ' thửa chưa có mã sản phẩm');
  capNhatDemChon('đang canh tác hữu cơ, vụ ' + $('selVu').value
    + (boQua.length ? ' · bỏ qua ' + boQua.join(', ') : ''));

  if(!thuaDaChonNhieu.size){
    alert('Cánh đồng này chưa có thửa nào được đánh dấu "Canh tác hữu cơ" trong vụ '
        + $('selVu').value + '.');
  }
}
function huyChonNhieu(){
  cheDoChonNhieu = false;
  $('btnChonNhieu').classList.remove('dang-bat');
  $('thanhChonNhieu').style.display = 'none';
  xoaTickTatCa();
}

/* nhapNhieuThua / moNhapLieu / guiNhapLieu ĐÃ GỠ 11/08/2026.

   Chúng là BẢN SAO CHẾT: ban-do.html định nghĩa hàm cùng tên rồi gán đè
   lên window sau khi file này chạy, nên bản ở đây chưa từng được gọi.
   Bằng chứng: cả ba đều đọc $('nlTrangThai') — ô đó đã bị bỏ khỏi form
   từ lâu; nếu thật sự chạy thì form đã văng lỗi mỗi lần mở.

   Nguy hiểm ở chỗ ai đó sửa bản ở đây sẽ thấy sửa xong mà không có gì
   đổi, và mất cả buổi mới hiểu. Bản đang sống nằm trong ban-do.html.

   veXemAnh / boAnh / docFileB64 / veXemVideo / boVideo / nenAnh vẫn Ở LẠI
   file này — ban-do.html KHÔNG định nghĩa lại chúng, chúng đang chạy thật.
   Đừng dọn tiếp. */

/* ---------- nhật ký ---------- */
/* ---------- nhật ký ---------- */
async function moNhatKy(){
  const p = MAP_DATA.plots[thuaDangChon];
  const nd = notionPlots[((MA_NONG_DAN[MAP_DATA.field]||{})[nhanThua(p)]||'').toUpperCase()];
  if(!nd){ alert('Thửa này chưa có dữ liệu nên chưa xem được nhật ký.'); return; }
  dongModal('mpThua'); moModal('mpNK');
  $('nkMa').textContent = nd.productCode;
  $('nkDS').innerHTML = '<div class="trong">Đang tải…</div>';
  try{
    const phNK = phienHienTai();
    const r = await goiAPI({action:'getHistory', productCode: nd.productCode,
      token: phNK ? phNK.token : ''});
    if(!r.ok) throw r.error;
    if(!r.entries.length){ $('nkDS').innerHTML = '<div class="trong">Chưa có bản ghi nào cho thửa này trong vụ này.</div>'; return; }
    const khoa = !phNK;   // chưa đăng nhập → chi tiết bị khóa từ máy chủ
    const dongKhoa = khoa
      ? `<div class="nk-khoa">🔒 Mô tả chi tiết và ảnh/video chỉ dành cho tài khoản xã viên hoặc khách hàng của HTX. <button onclick="dongModal('mpNK');moModal('mpDN')">Đăng nhập</button></div>`
      : '';
    $('nkDS').innerHTML = dongKhoa + r.entries.map((e,idx)=>`
      <div class="nkmuc">
        <div class="nk-ngay">${e.date||''}</div>
        <div class="nk-tieude">${e.title}</div>
        ${e.status?`<span class="nk-tt">${e.status}</span>`:''}
        ${(e.desc || (e.media && e.media.count))?`<div class="nk-mota" id="nkmt${idx}" style="display:none">${e.desc?escHtml(e.desc):''}${dinhKemHtml(e.media)}</div>
           <button class="nk-xemthem" onclick="toggleMota(${idx})" id="nkbtn${idx}">Xem thêm ▾</button>`:''}
        ${e.url?`<div><a href="${linkNotion(e.url)}" target="_blank" rel="noopener">Xem chi tiết trên Notion ↗</a></div>`:''}
      </div>`).join('');
  }catch(e){ $('nkDS').innerHTML = '<div class="trong">Lỗi tải nhật ký: '+e+'</div>'; }
}

function toggleMota(i){
  const m = $('nkmt'+i), b = $('nkbtn'+i);
  const an = m.style.display === 'none';
  m.style.display = an ? 'block' : 'none';
  b.textContent = an ? 'Thu gọn ▴' : 'Xem thêm ▾';
}

// Nhãn đính kèm: liệt kê từng ảnh/video thành link riêng — bấm cái nào mở cái đó,
// xem được hết mọi file, không phụ thuộc mũi tên của Drive.
function dinhKemHtml(media){
  if(!media || !media.count) return '';
  const tong = [];
  if(media.anh)   tong.push(media.anh + ' ảnh');
  if(media.video) tong.push(media.video + ' video');
  let s = '<div class="nk-dinhkem-box"><div class="nk-dinhkem-tit">📎 Đính kèm: ' + tong.join(', ') + '</div><div class="nk-dinhkem-ds">';
  let sa = 0, sv = 0;
  (media.items || []).forEach(it=>{
    if(!it.url){ return; }
    const nhan = it.video ? ('Video ' + (++sv)) : ('Ảnh ' + (++sa));
    s += '<a class="nk-media" href="' + it.url + '" target="_blank" rel="noopener">' + nhan + '</a>';
  });
  s += '</div></div>';
  return s;
}

/* ---------- nhập liệu ---------- */
let anhDaChon = [];
let videoDaChon = [];
/* Số file ảnh/video đang đọc dở. > 0 nghĩa là CHƯA được phép bấm Lưu.
   Phải khai báo TRƯỚC hai listener bên dưới, đừng dời xuống.
   guiNhapLieu() trong ban-do.html đọc biến này qua window. */
let dangDocAnh = 0;
let dangNhapNhieu = false;      // form đang ở chế độ nhiều thửa?
let maNhieuThua = [];           // danh sách mã Notion khi nhập nhiều thửa
function veXemAnh(){
  const kho = $('nlXemAnh');
  kho.innerHTML = '';
  anhDaChon.forEach((a, i)=>{
    const o = document.createElement('div');
    o.className = 'anh-o';
    o.innerHTML = '<img src="data:image/jpeg;base64,' + a.base64 + '">'
      + '<button type="button" class="anh-x" aria-label="Bỏ ảnh này" onclick="boAnh(' + i + ')">×</button>';
    kho.appendChild(o);
  });
}

function boAnh(i){
  anhDaChon.splice(i, 1);
  veXemAnh();
}

/* ---- ảnh: nén về JPEG ≤1600px rồi mới đưa vào anhDaChon ----

   ⚠⚠ LISTENER NÀY TỪNG BIẾN MẤT — ĐỪNG XOÁ, ĐỪNG DỌN.

   Phát hiện 22/08/2026: trong bản gộp ngày 21/08, khối này không còn.
   Hậu quả: người dùng chọn ảnh → KHÔNG có gì xảy ra. Không xem trước,
   không báo lỗi, anhDaChon rỗng, bấm Lưu vẫn hiện "✓ Đã lưu". Xã viên
   ra tận đồng chụp rồi về mới biết mất trắng.

   Vì sao mất: đợt dọn 11/08/2026 gỡ ba hàm bản-sao-chết ở ngay phía
   trên (nhapNhieuThua / moNhapLieu / guiNhapLieu). Listener này nằm kề
   đó và bị cắt theo, trong khi hàm nenAnh() vẫn còn — nên grep 'nenAnh'
   vẫn thấy có, tưởng là còn nguyên. Bẫy nằm ở chỗ đó.

   CÁCH TỰ KIỂM 10 GIÂY: mở form, chọn một ảnh. Phải thấy ảnh hiện ra
   ngay dưới ô chọn. Không thấy = listener lại mất, ĐỪNG ghi tiếp.
   Ngoài ra guiNhapLieu() trong ban-do.html có chốt chặn tự bắt lỗi này. */
$('nlAnh') && $('nlAnh').addEventListener('change', async function(){
  const hong = [];
  let stt = 0;
  /* Khoá nút Lưu trong lúc nén. Đây là chỗ đã làm mất ảnh sáng 22/08/2026:
     nenAnh() là hàm BẤT ĐỒNG BỘ, ảnh camera 12MP mất một hai giây để giải
     mã và vẽ lại. Trong khoảng đó anhDaChon VẪN RỖNG. Bấm Lưu ngay sau khi
     chụp thì gói tin bay đi với images: [] mà form vẫn báo "✓ Đã lưu".
     Bằng chứng trong Notion: bản ghi 22/08 không có cột Hình ảnh và cũng
     không có khối bookmark nào — cả hai đều sinh từ imageLinks, mất cả hai
     nghĩa là máy chủ chưa từng nhận được ảnh. */
  dangDocAnh++;
  capNhatNutLuu();
  try{
    for(const f of this.files){
      try{
        const b64 = await nenAnh(f);
        if(!b64) throw new Error('nén ra rỗng');
        anhDaChon.push({
          name: f.name.replace(/\.[^.]+$/,'') + '_' + Date.now() + '_' + (++stt) + '.jpg',
          mimeType: 'image/jpeg',
          base64: b64,
        });
        veXemAnh();          // hiện dần từng ảnh cho người dùng thấy máy đang chạy
      }catch(e){
        hong.push(f.name);
      }
    }
  } finally {
    this.value = '';
    dangDocAnh--;
    capNhatNutLuu();
    veXemAnh();
  }

  /* Ảnh hỏng phải KÊU TO. Bỏ qua im lặng chính là lỗi đã làm mất ảnh
     của xã viên nhiều lần rồi. */
  if(hong.length){
    alert('⚠ KHÔNG đọc được ' + hong.length + ' ảnh:\n\n' + hong.join('\n') +
      '\n\nNhững ảnh này CHƯA được lưu. Đừng đóng form khi chưa xử lý.\n\n' +
      'Thường gặp nhất là ảnh iPhone định dạng HEIC mà máy này không mở được.\n' +
      'Cách chữa: iPhone → Cài đặt → Camera → Định dạng → chọn "Tương thích nhất", ' +
      'rồi chụp lại. Ảnh cũ thì mở trong app Ảnh, bấm Sửa rồi Xong để máy đổi sang JPG.');
  }
});

function capNhatNutLuu(){
  const nut = $('nlGui');
  if(!nut) return;
  if(dangDocAnh > 0){
    nut.disabled = true;
    nut.dataset.chuCu = nut.dataset.chuCu || nut.textContent;
    nut.textContent = '⏳ Đang xử lý ảnh…';
  }else{
    nut.disabled = false;
    if(nut.dataset.chuCu){ nut.textContent = nut.dataset.chuCu; delete nut.dataset.chuCu; }
  }
}

// ---- video: đọc nguyên file (không nén), giới hạn 20MB/video ----
$('nlVideo') && $('nlVideo').addEventListener('change', async function(){
  /* Khoá nút Lưu y như bên ảnh. Đọc base64 một video 20MB còn lâu hơn nén
     ảnh nhiều, nên chỗ này thậm chí dễ mất hơn. */
  const hong = [];
  dangDocAnh++; capNhatNutLuu();
  try{
    for(const f of this.files){
      if(f.size > 20*1024*1024){
        alert('Video "' + f.name + '" nặng ' + (f.size/1048576).toFixed(1) +
              'MB — vượt 20MB nên bị bỏ qua. Anh quay clip ngắn 15–30 giây nhé.');
        continue;
      }
      try{
        const b64 = await docFileB64(f);
        if(!b64) throw new Error('đọc ra rỗng');
        const duoi = (f.name.match(/\.[^.]+$/) || ['.mp4'])[0];
        videoDaChon.push({
          name: f.name.replace(/\.[^.]+$/,'') + '_' + Date.now() + duoi,
          mimeType: f.type || 'video/mp4',
          base64: b64,
          mb: (f.size/1048576).toFixed(1),
        });
        veXemVideo();
      }catch(e){ hong.push(f.name); }
    }
  } finally {
    this.value = '';
    dangDocAnh--; capNhatNutLuu();
    veXemVideo();
  }
  if(hong.length){
    alert('⚠ KHÔNG đọc được ' + hong.length + ' video:\n\n' + hong.join('\n') +
          '\n\nNhững video này CHƯA được lưu.');
  }
});

function docFileB64(f){
  return new Promise((res, rej)=>{
    const r = new FileReader();
    r.onload = ()=>res(r.result.split(',')[1]);
    r.onerror = rej;
    r.readAsDataURL(f);
  });
}

function veXemVideo(){
  $('nlXemVideo').innerHTML = videoDaChon.map((v,i)=>
    '<div class="vid-chip">🎬 <span>' + v.name + '</span> (' + v.mb + 'MB)' +
    '<button type="button" aria-label="Bỏ video này" onclick="boVideo(' + i + ')">×</button></div>'
  ).join('');
}

function boVideo(i){
  videoDaChon.splice(i, 1);
  veXemVideo();
}

function nenAnh(file){
  return new Promise((res, rej)=>{
    const img = new Image();
    const url = URL.createObjectURL(file);
    /* Nhớ thu hồi URL ở CẢ hai nhánh. Xã viên chọn vài chục ảnh một
       buổi, không thu hồi thì trình duyệt trên điện thoại phình bộ nhớ
       rồi tự tải lại trang — mất luôn form đang nhập dở. */
    img.onload = ()=>{
      try{
        const MAX = 1600;
        let w = img.width, h = img.height;
        if(!w || !h) throw new Error('ảnh không có kích thước');
        if(Math.max(w,h) > MAX){ const k = MAX/Math.max(w,h); w=Math.round(w*k); h=Math.round(h*k); }
        const c = document.createElement('canvas'); c.width=w; c.height=h;
        c.getContext('2d').drawImage(img,0,0,w,h);
        res(c.toDataURL('image/jpeg',0.8).split(',')[1]);
      }catch(e){ rej(e); }
      finally{ URL.revokeObjectURL(url); }
    };
    img.onerror = ()=>{
      URL.revokeObjectURL(url);
      /* Hay gặp nhất: HEIC/HEIF của iPhone trên trình duyệt không phải
         Safari. Trả lỗi có chữ để chỗ gọi còn biết đường báo người dùng. */
      rej(new Error('Trình duyệt không mở được file này (' + (file.type || 'không rõ định dạng') + ')'));
    };
    img.src = url;
  });
}

/* ---------- khởi động ---------- */
veBanDo();

/* ---- zoom bằng lăn chuột & véo 2 ngón ---- */
/* ---- zoom bằng lăn chuột & véo 2 ngón ---- */
const kbando = document.querySelector('.khung-bando');
kbando.addEventListener('wheel', function(e){
  e.preventDefault();
  const rect = kbando.getBoundingClientRect();
  const mx = e.clientX - rect.left + kbando.scrollLeft;
  const my = e.clientY - rect.top  + kbando.scrollTop;
  const cu = zoomLv;
  zoom(e.deltaY < 0 ? 1.07 : 1/1.07);
  const r = zoomLv / cu;
  if(r !== 1){
    kbando.scrollLeft = mx*r - (e.clientX - rect.left);
    kbando.scrollTop  = my*r - (e.clientY - rect.top);
  }
}, {passive:false});

let veo2ngon = 0, veoGoc = null;
function goc2ngon(e){
  return Math.atan2(e.touches[1].clientY - e.touches[0].clientY,
                    e.touches[1].clientX - e.touches[0].clientX) * 180/Math.PI;
}
kbando.addEventListener('touchstart', function(e){
  if(e.touches.length === 2){
    veo2ngon = Math.hypot(e.touches[0].clientX - e.touches[1].clientX,
                          e.touches[0].clientY - e.touches[1].clientY);
    veoGoc = goc2ngon(e);
  }
}, {passive:true});
kbando.addEventListener('touchmove', function(e){
  if(e.touches.length === 2 && veo2ngon){
    e.preventDefault();
    const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX,
                         e.touches[0].clientY - e.touches[1].clientY);
    zoom(d / veo2ngon);
    veo2ngon = d;
    const g = goc2ngon(e);       // vặn 2 ngón = xoay bản đồ theo tay
    let dg = g - veoGoc;
    if(dg > 180) dg -= 360; if(dg < -180) dg += 360;
    xoay(dg);
    veoGoc = g;
  }
}, {passive:false});
kbando.addEventListener('touchend', function(){ veo2ngon = 0; veoGoc = null; });

/* Ẩn/hiện chú thích màu và nút chọn nhiều thửa theo quyền xem.
   Được gọi lại sau khi đăng nhập hoặc đăng xuất (xem js/chung.js). */
function capNhatGiaoDienKhach(){
  const khach = laKhach();
  const ct = document.querySelector('.chuthich');
  if(ct) ct.style.display = khach ? 'none' : '';
  const nutNhieu = $('btnChonNhieu');
  if(nutNhieu) nutNhieu.style.display = khach ? 'none' : '';
  if(khach && cheDoChonNhieu && typeof huyChonNhieu === 'function') huyChonNhieu();
}

/* Vẽ lại toàn bộ khi quyền xem thay đổi (đăng nhập / đăng xuất) */
function capNhatQuyenXem(){
  veBanDo();
  capNhatGiaoDienKhach();
  if(ketQuaCuoi) apDungKetQua(ketQuaCuoi);
  else if(laKhach()) $('trangthai').textContent =
      'Đăng nhập để xem trạng thái canh tác và nhật ký của từng thửa.';
}

/* Nút "← Cánh Đồng" mang theo cánh đồng đang xem, để quay lại đúng chỗ. */
(function(){
  const nut = $('nutQuayLai');
  if(nut && MAP_DATA && MAP_DATA.field) nut.href = 'canh-dong.html?dong=' + MAP_DATA.field;
})();

/* Ô chọn vụ lấy danh sách từ máy chủ (CONFIG.VU trong Code.gs) — thêm vụ
   mới chỉ cần sửa Code.gs, không phải sửa file này hay ban-do.html. */
goiAPI({ action: 'getCauHinh' }).then(function (r) {
  if (!r || !r.ok || !r.vu || !r.vu.DS) return;
  const sel = $('selVu'); if (!sel) return;
  const dangChon = sel.value;
  sel.innerHTML = r.vu.DS.map(function (v) {
    return '<option value="' + v.ma + '">' + v.ten + '</option>';
  }).join('');
  sel.value = r.vu.DS.some(function (v) { return v.ma === dangChon; })
            ? dangChon : (r.vu.HIEN_TAI || r.vu.DS[0].ma);
}).catch(function () {});

capNhatGiaoDienKhach();

$('selVu').addEventListener('change', napNotion);
$('selDong').addEventListener('change', function(){
  if(cheDoChonNhieu) huyChonNhieu();   // đổi đồng thì bỏ chọn nhiều (chỉ số thửa khác nhau)
  MAP_DATA = ALL_FIELDS[this.value];
  zoomLv = 1; $('svgwrap').style.width = '100%';
  veBanDo();
  if(API_URL.startsWith('http')) napNotion();
});
if(API_URL.startsWith('http')) napNotion();
else $('trangthai').textContent = 'Đang kết nối dữ liệu…';

