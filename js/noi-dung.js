/**********************************************************************
 * js/noi-dung.js — TOÀN BỘ CHỮ CỦA WEBSITE NẰM Ở ĐÂY
 *
 * Sửa chữ trên web thì CHỈ MỞ FILE NÀY. Không cần đụng vào file .html nào.
 *
 * -------------------------------------------------------------------
 * BA QUY TẮC KHI SỬA — đọc một lần rồi thôi
 * -------------------------------------------------------------------
 * 1. Chữ nằm giữa hai dấu HUYỀN SẮC NGƯỢC  ` ... `  (phím dưới Esc).
 *    Bên trong đó anh gõ thoải mái: dấu nháy ' " , dấu chấm, xuống dòng
 *    đều được. CHỈ hai thứ không được gõ là dấu ` và cụm ${
 *
 * 2. Cuối mỗi dòng phải có dấu phẩy , — trừ dòng cuối cùng của một khối.
 *    Thiếu phẩy là cả trang trắng.
 *
 * 3. Muốn in đậm thì bọc <b>chữ</b>, in nghiêng <i>chữ</i>,
 *    xuống dòng trong một đoạn thì <br>.
 *
 * -------------------------------------------------------------------
 * NẾU LỠ SỬA HỎNG
 * -------------------------------------------------------------------
 * Trang sẽ trắng hoặc mất chữ. Bấm F12 → tab Console, nó chỉ đúng dòng sai.
 * Không sửa được thì vào GitHub → file này → nút History → chọn bản trước
 * → Revert. Không mất gì.
 *
 * -------------------------------------------------------------------
 * MỘT CHỖ SỬA, NHIỀU NƠI ĐỔI
 * -------------------------------------------------------------------
 * Ví dụ gói "Người gieo mầm" xuất hiện ở Trang chủ, trang Sản phẩm và
 * trang chi tiết. Cả ba đều lấy chữ từ khối `goi` bên dưới — sửa một lần
 * là đổi cả ba. Không còn cảnh sửa sót.
 **********************************************************************/

window.NOI_DUNG = {

/* ====================================================================
   1. DÙNG CHUNG CHO MỌI TRANG
   ==================================================================== */
chung: {
  bangThongBao: `Trang đang trong quá trình hoàn thiện.`,
  tenDayDu:     `HTX Lúa&nbsp;Di&nbsp;Sản Hội&nbsp;An`,

  /* Ô đăng nhập — dùng chung cho cả 5 trang */
  dangNhap: {
    tieuDe:   `Đăng nhập`,
    dan:      `Xã viên đăng nhập để nhập liệu. Anh/chị đã mua gạo đăng nhập bằng Mã KH để xem nhật ký thửa của mình.`,
    nhanUser: `Tên đăng nhập / Mã KH`,
    nhanPass: `Mật khẩu`,
    nut:      `Đăng nhập`,
  },
},

/* ====================================================================
   2. TRANG CHỦ  (index.html)
   ==================================================================== */
trangChu: {

  /* --- Phần đầu trang, chữ to trên ảnh nền --- */
  hero: {
    nhan:    `Hợp tác xã lúa hữu cơ · Từ 3 cánh đồng di sản`,
    tieuDe:  `Hạt gạo mang <em>câu chuyện</em> của đất và người Hội&nbsp;An`,
    dan:     `Từ những thửa ruộng ven sông Thu&nbsp;Bồn ở Cẩm&nbsp;Kim và Cẩm&nbsp;Thanh, chúng tôi canh tác lúa hữu cơ — không dùng bất cứ phân bón hay thuốc hóa học nào — và minh bạch từng khâu. Anh/chị có thể xem nhật ký của chính thửa ruộng làm ra hạt gạo mình ăn.`,
    nut1:    `Xem sản phẩm →`,
    nut2:    `Khám phá Cánh Đồng`,
  },

  /* --- Mục Câu chuyện (bản ngắn, có ảnh bên trái) --- */
  cauChuyen: {
    nhan:    `Câu chuyện của chúng tôi`,
    tieuDe:  `Giữ lại giống lúa của ông cha, trên chính cánh đồng quê`,
    doan1:   `Hợp tác xã Lúa&nbsp;Di&nbsp;Sản ra đời từ mong muốn giữ gìn những giống lúa bản địa và cách canh tác thuận tự nhiên trên các cánh đồng Ông&nbsp;Đảng, Đồng&nbsp;Cao, Đồng&nbsp;Mẫu.`,
    doan2:   `Mỗi lô ruộng được ghi mã riêng, gắn với tên người nông dân canh tác, ngày gieo sạ, ngày thu hoạch — tất cả công khai để anh/chị yên tâm về nguồn gốc.`,
    nut:     `Đọc câu chuyện đầy đủ →`,
  },

  /* --- Tiêu đề mục 3 gói (chữ trong từng thẻ nằm ở khối `goi`) --- */
  sanPham: {
    nhan:    `Sản phẩm`,
    tieuDe:  `Ba chương trình đồng hành cùng sào ruộng`,
  },

  /* --- Tiêu đề mục 3 cánh đồng (chữ trong thẻ nằm ở khối `canhDong`) --- */
  congDong: {
    nhan:    `Cộng đồng canh tác`,
    tieuDe:  `Ba cánh đồng, một di sản`,
  },

  /* --- Mục 4 con số. Riêng CON SỐ thì tự lấy từ Notion, không sửa ở đây --- */
  tacDong: {
    nhan:    `Tác động của chúng tôi`,
    tieuDe:  `Những con số từ cánh đồng thật`,
    nhan1:   `diện tích canh tác<br>hữu cơ`,
    nhan2:   `hộ nông dân<br>xã viên tham gia`,
    nhan3:   `thửa ruộng<br>được ghi mã riêng`,
    nhan4:   `cánh đồng<br>di sản`,
    ghiChu:  `* Diện tích, số hộ và số thửa lấy trực tiếp từ dữ liệu Notion của vụ đang canh tác, cộng từ cả 3 cánh đồng.`,
  },

  /* --- Mục để lại thông tin liên hệ --- */
  dangKy: {
    nhan:    `Giữ liên lạc`,
    tieuDe:  `Nhận tin về mùa vụ &amp; sản phẩm mới`,
    dan:     `Anh/chị để lại thông tin để HTX liên hệ khi có gạo vụ mới, hoặc khi mở nhận đặt hàng theo thửa.`,
    nut:     `Để lại thông tin liên hệ`,
  },

  /* --- Chân trang (chỉ trang chủ có bản đầy đủ) --- */
  footer: {
    gioiThieu:  `Hợp tác xã lúa hữu cơ tại Hội&nbsp;An, TP.&nbsp;Đà&nbsp;Nẵng — canh tác minh bạch, truy xuất nguồn gốc tới từng thửa ruộng.`,
    diaChi:     `Hội&nbsp;An, TP.&nbsp;Đà&nbsp;Nẵng`,
    dienThoai:  `Điện thoại: `,
    mangXaHoi:  `Facebook · YouTube`,
    banQuyen:   `© 2026 HTX Lúa&nbsp;Di&nbsp;Sản Hội&nbsp;An`,
    dongCuoi:   `Hội&nbsp;An · TP.&nbsp;Đà&nbsp;Nẵng`,
  },
},

/* ====================================================================
   3. TRANG VỀ CHÚNG TÔI  (ve-chung-toi.html)
   ==================================================================== */
veChungToi: {
  hero: {
    nhan:    `Về chúng tôi`,
    tieuDe:  `Giữ hạt gạo quê, giữ một vùng di sản`,
    dan:     `HTX Lúa&nbsp;Di&nbsp;Sản Hội&nbsp;An là nơi những người nông dân cùng nhau canh tác lúa hữu cơ hoàn toàn, gìn giữ giống lúa và cách làm ruộng của cha ông trên đất Cẩm&nbsp;Kim, Cẩm&nbsp;Thanh.`,
  },
  cauChuyen: {
    nhan:    `Câu chuyện`,
    tieuDe:  `Bắt đầu từ những cánh đồng ven sông Thu&nbsp;Bồn`,
    doan1:   `Những cánh đồng của HTX nằm bên dòng Thu&nbsp;Bồn, nơi phù sa bồi đắp cho hạt lúa vị ngọt riêng. Trước áp lực của phân bón và thuốc hóa học, một nhóm nông dân đã chọn quay lại cách canh tác thuận tự nhiên — bỏ hẳn hóa chất, không phải giảm bớt.`,
    doan2:   `Từ đó, hợp tác xã hình thành — không chỉ để bán gạo, mà để giữ lại một cách sống gắn với ruộng đồng, và để người ăn biết rõ hạt gạo mình dùng đến từ đâu.`,
  },
  giaTriHead: {
    nhan:    `Điều chúng tôi theo đuổi`,
    tieuDe:  `Ba giá trị cốt lõi`,
  },
  canhDongHead: {
    nhan:    `Cộng đồng canh tác`,
    tieuDe:  `Ba cánh đồng di sản`,
    nut:     `Khám phá Cánh Đồng →`,
  },
},

/* ====================================================================
   4. TRANG SẢN PHẨM  (san-pham.html)
   Chữ của từng gói nằm ở khối `goi` phía dưới.
   ==================================================================== */
trangSanPham: {
  hero: {
    nhan:    `Sản phẩm`,
    tieuDe:  `Ba chương trình đồng hành cùng sào ruộng di sản`,
    dan:     `Không chỉ là mua gạo — anh/chị cùng người nông dân nuôi dưỡng một sào ruộng Hội&nbsp;An, theo dõi hành trình của chính sào ruộng đó và ra đồng cùng bà con suốt mùa vụ.`,
  },

  /* Bảng đối chiếu chương trình × quyền lợi.
     Mỗi dòng: [tên quyền lợi, chương trình 1, 2, 3]
     Gõ  co  nếu chương trình đó CÓ, gõ  khong  nếu KHÔNG. */
  doiChieu: {
    nhan:    `Ba chương trình × Quyền lợi`,
    tieuDe:  `Tham gia chương trình nào thì nhận được gì?`,
    cot:     [`Quyền lợi`, `Gieo mầm`, `Đồng kiến tạo`, `Đối tác`],
    hang: [
      [`Gạo tươi Hội&nbsp;An giao định kỳ`,                 `co`,    `co`,    `co`],
      [`Theo dõi hành trình sào ruộng · báo cáo tác động`,  `co`,    `co`,    `co`],
      [`Tham quan, xuống giống, gặt lúa tại đồng`,          `co`,    `co`,    `co`],
      [`Gạo di sản làm quà tặng · nguyên liệu`,             `khong`, `co`,    `co`],
      [`Đồng hành truyền thông cùng HTX`,                   `khong`, `co`,    `co`],
      [`Báo cáo Offset Carbon Footprint`,                   `khong`, `khong`, `co`],
      [`Tên doanh nghiệp gắn tại sào ruộng`,                `khong`, `khong`, `co`],
      [`Bao bì &amp; câu chuyện thương hiệu riêng`,         `khong`, `khong`, `co`],
    ],
    ghiChu:  `Lịch các hoạt động tại đồng khớp với <a href="canh-dong.html" style="color:var(--dat-som);font-weight:600">dòng thời gian ở trang Cánh&nbsp;Đồng</a>.`,
  },
},

/* ====================================================================
   5. TRANG CÁNH ĐỒNG  (canh-dong.html) — phần đầu trang
   Dòng thời gian mùa vụ lấy ngày thật từ Notion, không sửa ở đây.
   ==================================================================== */
trangCanhDong: {
  hero: {
    nhan:    `Cánh Đồng`,
    tieuDe:  `Đi cùng cánh đồng suốt một mùa vụ`,
    dan:     `Xem bản đồ từng thửa ruộng, và theo dõi cả hành trình của cây lúa — từ lễ cúng xuống đồng, ngày gieo sạ, lúa trổ bông, đến ngày gặt và lễ tạ ơn cơm mới.`,
  },
},

/* ====================================================================
   6. BA CÁNH ĐỒNG
   Dùng ở: thẻ trên Trang chủ · ô trên Về chúng tôi · trang chi tiết
   ==================================================================== */
canhDong: {
  nhan: `Cánh đồng di sản`, ve: `canh-dong.html`,
  veChu: `Quay lại Cánh Đồng`, navId: `navCD`,
  khacTit: `Hai cánh đồng còn lại`,
  muc: {

    'ong-dang': {
      ten:    `Cánh đồng Ông&nbsp;Đảng`,
      tenNgan:`Ông&nbsp;Đảng`,
      viTri:  `Cẩm&nbsp;Kim`,
      phu:    `Cẩm&nbsp;Kim, Hội&nbsp;An`,
      anh:    `img/dong-ong-dang.jpg`,
      /* câu ngắn hiện trên thẻ ở Trang chủ */
      tomTat: `20 thửa ruộng ven sông, nơi HTX phát triển mô hình canh tác hữu cơ và du lịch nông nghiệp.`,
      /* câu dẫn dưới tiêu đề ở trang chi tiết */
      dan:    `Cánh đồng ven sông ở Cẩm&nbsp;Kim, nơi HTX phát triển mô hình canh tác hữu cơ gắn với du lịch nông nghiệp.`,
      so: [[`20`, `thửa ruộng`], [`~13.500`, `m² diện tích`], [`Hè&nbsp;Thu&nbsp;2026`, `vụ đang canh tác`]],
      than: [
        { h: `Vị trí và đặc điểm đất`,
          p: [`Cánh đồng nằm ở thôn Cẩm&nbsp;Kim, sát sông Thu&nbsp;Bồn, đất phù sa bồi hằng năm nên tơi xốp và giàu dinh dưỡng.`,
              `Nhờ vị trí ven sông, việc lấy nước và tiêu nước thuận lợi, phù hợp với canh tác lúa hữu cơ.`] },
        { h: `Cách canh tác`,
          ds: [`Không dùng bất cứ phân bón hay thuốc hóa học nào`,
               `Mỗi thửa có mã riêng, gắn tên hộ nông dân canh tác`,
               `Nhật ký thăm đồng ghi lại từng lần chăm sóc`,
               `Áp dụng lịch mùa vụ theo tập quán địa phương`] },
        { h: `Trải nghiệm dành cho anh/chị`,
          p: [`Đây cũng là nơi HTX đón anh/chị đến tham quan: lội ruộng gieo mạ, xay lúa bằng cối đá, làm mì gạo và sữa gạo tại chỗ.`] },
      ],
      nut: [[`canh-dong.html`, `Xem bản đồ &amp; dòng thời gian`], [`san-pham.html`, `Xem các gói sản phẩm`, `phu`]],
    },

    'dong-cao': {
      ten:    `Cánh đồng Đồng&nbsp;Cao`,
      tenNgan:`Đồng&nbsp;Cao`,
      viTri:  `Cẩm&nbsp;Thanh`,
      phu:    `Cẩm&nbsp;Thanh, Hội&nbsp;An`,
      anh:    `img/dong-dong-cao.jpg`,
      tomTat: `Cánh đồng lớn nhất với hơn 40 thửa, mỗi thửa gắn tên một hộ nông dân xã viên.`,
      dan:    `Cánh đồng lớn nhất của HTX với hơn 40 thửa, mỗi thửa gắn tên một hộ nông dân xã viên.`,
      so: [[`40+`, `thửa ruộng`], [`Cẩm&nbsp;Thanh`, `vị trí`], [`Hè&nbsp;Thu&nbsp;2026`, `vụ đang canh tác`]],
      than: [
        { h: `Quy mô lớn nhất trong ba cánh đồng`,
          p: [`Đồng&nbsp;Cao là cánh đồng rộng nhất, tập trung nhiều hộ xã viên nhất, nằm dọc đường Tống Văn Sương ở Cẩm&nbsp;Thanh.`,
              `Hệ thống kênh thủy lợi chạy qua giúp chủ động nước tưới suốt vụ.`] },
        { h: `Cách tổ chức canh tác`,
          ds: [`Chia thửa rõ ràng, nhiều hộ chia đôi thửa lớn`,
               `Lịch gieo sạ và thu hoạch thống nhất toàn cánh đồng`,
               `Ghi chép nhật ký đồng ruộng theo từng lô`] },
      ],
      nut: [[`canh-dong.html`, `Xem bản đồ &amp; dòng thời gian`], [`san-pham.html`, `Xem các gói sản phẩm`, `phu`]],
    },

    'dong-mau': {
      ten:    `Cánh đồng Đồng&nbsp;Mẫu`,
      tenNgan:`Đồng&nbsp;Mẫu`,
      viTri:  `Cẩm&nbsp;Thanh`,
      phu:    `Cẩm&nbsp;Thanh, Hội&nbsp;An`,
      anh:    `img/dong-dong-mau.jpg`,
      tomTat: `Những thửa ruộng rộng, canh tác giống lúa bản địa theo lịch mùa vụ truyền thống.`,
      dan:    `Những thửa ruộng rộng, canh tác giống lúa bản địa theo lịch mùa vụ truyền thống.`,
      so: [[`20`, `thửa ruộng`], [`Cẩm&nbsp;Thanh`, `vị trí`], [`Hè&nbsp;Thu&nbsp;2026`, `vụ đang canh tác`]],
      than: [
        { h: `Cánh đồng của những thửa lớn`,
          p: [`Đồng&nbsp;Mẫu có các thửa ruộng khổ lớn, thuận cho việc cơ giới hóa khâu làm đất và thu hoạch.`,
              `Đây là nơi HTX giữ gìn một số giống lúa bản địa theo cách canh tác truyền thống.`] },
        { h: `Điểm đáng chú ý`,
          ds: [`Thửa ruộng rộng, bố trí thẳng hàng theo kênh thủy lợi`,
               `Giữ giống lúa địa phương`,
               `Lịch mùa vụ theo tập quán lâu đời của làng`] },
      ],
      nut: [[`canh-dong.html`, `Xem bản đồ &amp; dòng thời gian`], [`san-pham.html`, `Xem các gói sản phẩm`, `phu`]],
    },

  },
},

/* ====================================================================
   7. BA GIÁ TRỊ CỐT LÕI
   Dùng ở: ô trên Về chúng tôi · trang chi tiết
   ==================================================================== */
giaTri: {
  nhan: `Giá trị cốt lõi`, ve: `ve-chung-toi.html`,
  veChu: `Quay lại Về chúng tôi`, navId: `navVe`,
  khacTit: `Hai giá trị còn lại`,
  muc: {

    'thuan-tu-nhien': {
      ten:  `Canh tác thuận tự nhiên`,
      phu:  `Giá trị 1`,
      icon: `🌱`,
      anh:  `img/gt-thuan-tu-nhien.jpg`,
      dan:  `Không dùng bất cứ phân thuốc hóa học nào — nuôi dưỡng đất và giữ hệ sinh thái đồng ruộng khỏe mạnh.`,
      than: [
        { h: `Vì sao chúng tôi chọn cách này`,
          p: [`Đất khỏe thì cây lúa khỏe, hạt gạo mới thật sự lành. Phân bón và thuốc hóa học làm đất bạc màu dần, cuối cùng người trồng và người ăn đều chịu thiệt. Vì vậy HTX chọn bỏ hẳn, không dùng liều thấp hay dùng hạn chế.`] },
        { h: `Chúng tôi làm cụ thể những gì`,
          ds: [`Chỉ dùng phân hữu cơ — tuyệt đối không dùng phân hóa học`,
               `Không dùng thuốc diệt cỏ, thuốc trừ sâu hay bất kỳ hóa chất nào`,
               `Giữ bờ ruộng, mương nước cho thiên địch sinh sống`,
               `Luân canh và để đất nghỉ giữa các vụ`] },
      ],
      nut: [[`canh-dong.html`, `Xem cánh đồng thực tế`], [`ve-chung-toi.html`, `Về chúng tôi`, `phu`]],
    },

    'minh-bach': {
      ten:  `Minh bạch nguồn gốc`,
      phu:  `Giá trị 2`,
      icon: `🔍`,
      anh:  `img/gt-minh-bach.jpg`,
      dan:  `Mỗi lô ruộng có mã riêng, gắn tên nông dân và nhật ký sản xuất công khai.`,
      than: [
        { h: `Truy xuất tới từng thửa ruộng`,
          p: [`Khác với gạo đóng bao thông thường, gạo của HTX gắn với một mã lô cụ thể. Từ mã đó, anh/chị biết được thửa ruộng nào, ai canh tác, gieo ngày nào, gặt ngày nào.`] },
        { h: `Hệ thống ghi chép`,
          ds: [`Bản đồ số hóa toàn bộ ba cánh đồng`,
               `Nhật ký thăm đồng có hình ảnh kèm theo`,
               `Mã sản phẩm riêng cho từng lô mỗi vụ`,
               `Anh/chị được cấp tài khoản riêng để xem nhật ký thửa của mình`] },
      ],
      nut: [[`canh-dong.html`, `Xem bản đồ canh tác`], [`san-pham.html`, `Xem các gói sản phẩm`, `phu`]],
    },

    'ben-vung': {
      ten:  `Cùng nhau bền vững`,
      phu:  `Giá trị 3`,
      icon: `🤝`,
      anh:  `img/gt-ben-vung.jpg`,
      dan:  `Hợp tác xã chia sẻ lợi ích với xã viên, giữ nghề nông sống được với chính đồng đất quê.`,
      than: [
        { h: `Bền vững là bền vững cho cả người trồng`,
          p: [`Một mô hình chỉ bền khi người nông dân sống được bằng nghề. HTX hoạt động theo hướng chia sẻ lợi ích với xã viên, thay vì ép giá thu mua.`] },
        { h: `Cách chúng tôi thực hiện`,
          ds: [`Thu mua lúa của xã viên với giá thỏa thuận ổn định`,
               `Hỗ trợ kỹ thuật canh tác hữu cơ cho các hộ`,
               `Phát triển du lịch nông nghiệp tạo thêm thu nhập`,
               `Giữ giống lúa bản địa và nghề làm ruộng cho lớp sau`] },
      ],
      nut: [[`ve-chung-toi.html`, `Về chúng tôi`], [`san-pham.html`, `Đồng hành cùng HTX`, `phu`]],
    },

  },
},

/* ====================================================================
   8. BA GÓI SẢN PHẨM
   Dùng ở: thẻ Trang chủ · trang Sản phẩm · trang chi tiết  (3 nơi)
   ==================================================================== */
goi: {
  nhan: `Sản phẩm`, ve: `san-pham.html`,
  veChu: `Quay lại Sản phẩm`, navId: `navSP`,
  khacTit: `Hai chương trình còn lại`,
  muc: {

    /* ---------- CHƯƠNG TRÌNH 1 ---------- */
    'gieo-mam': {
      ten:    `Người gieo mầm`,
      phu:    `Chương trình 1 · Dành cho gia đình`,
      anh:    `img/goi-1-gieo-mam.jpg`,
      gia:    `55.000đ`,
      giaDv:  `/ kg — tối thiểu 50 kg mỗi năm`,
      nutMua: `Tôi quan tâm chương trình này`,
      tomTat: `Cùng người nông dân nuôi dưỡng một sào ruộng Hội&nbsp;An, nhận gạo tươi giao tận nhà và đưa con trẻ ra đồng.`,
      dan:    `Mỗi bữa cơm là một hạt mầm cho tương lai. Anh/chị cùng người nông dân nuôi dưỡng một sào ruộng Hội&nbsp;An để mang những hạt gạo tươi lành đến gia đình, và gieo trong con trẻ tình yêu với đất, với lúa và với nguồn cội.`,
      quyenLoi: [`<b>Gạo tươi theo định kỳ</b> — đăng ký gạo tươi Hội&nbsp;An, giao tận nhà định kỳ hằng tháng`,
                 `<b>Minh bạch tác động bền vững</b> — theo dõi hành trình của sào ruộng và nhận báo cáo về tác động môi trường`,
                 `<b>Trải nghiệm dành cho gia đình</b> — tham quan, xuống giống, gặt lúa và trải nghiệm nông nghiệp bản địa`],
      hoatDong: `🎟️ <b>Trở thành Người gieo mầm:</b> tối thiểu 50 kg mỗi năm, 55.000đ/kg.`,
      than: [
        { h: `Gia đình nhận được gì`,
          ds: [`<b>Gạo tươi theo định kỳ.</b> Gia đình đăng ký gạo tươi Hội&nbsp;An và được giao tận nhà định kỳ hằng tháng.`,
               `<b>Minh bạch tác động bền vững.</b> Theo dõi hành trình của sào ruộng và nhận báo cáo về tác động môi trường.`,
               `<b>Trải nghiệm dành cho gia đình.</b> HTX tổ chức các chương trình tham quan, xuống giống, gặt lúa và trải nghiệm nông nghiệp bản địa cho gia đình.`] },
        { h: `Mức tham gia`,
          p: [`Tối thiểu 50 kg mỗi năm, giá 55.000đ/kg — tương đương 2.750.000đ cho trọn một năm.`] },
        { h: `Phù hợp với ai`,
          p: [`Anh/chị muốn gia đình dùng gạo sạch có nguồn gốc rõ ràng, và muốn con em được ra đồng, biết hạt cơm mình ăn đến từ đâu.`] },
      ],
    },

    /* ---------- CHƯƠNG TRÌNH 2 ---------- */
    'dong-kien-tao': {
      ten:    `Người đồng kiến tạo`,
      phu:    `Chương trình 2 · Dành cho doanh nghiệp`,
      anh:    `img/goi-2-dong-kien-tao.jpg`,
      gia:    `16.500.000đ`,
      giaDv:  `/ sào mỗi năm — tối thiểu 3 sào`,
      nutMua: `Tôi quan tâm chương trình này`,
      tomTat: `Doanh nghiệp nuôi dưỡng sào ruộng Hội&nbsp;An: gạo di sản làm quà tặng, nguyên liệu, và trải nghiệm cho nhân viên.`,
      dan:    `Doanh nghiệp không chỉ đồng hành với người nông dân mà còn góp phần kiến tạo những giá trị bền vững cho cộng đồng. Mỗi sào ruộng được nuôi dưỡng là một cam kết với môi trường, văn hóa và tương lai của vùng đất Hội&nbsp;An.`,
      quyenLoi: [`<b>Làm quà tặng / nguyên liệu</b> — gạo di sản tặng nhân viên, đối tác và làm nguyên liệu cho menu của doanh nghiệp`,
                 `<b>Minh bạch tác động bền vững</b> — theo dõi hành trình của sào ruộng và nhận báo cáo về tác động môi trường`,
                 `<b>Trải nghiệm dành cho doanh nghiệp</b> — tham quan, xuống giống, gặt lúa cho nhân viên, khách hàng và đối tác`,
                 `<b>Truyền thông thương hiệu</b> — đồng hành truyền thông cùng HTX Lúa&nbsp;Di&nbsp;Sản Hội&nbsp;An`],
      hoatDong: `🎟️ <b>Trở thành Người đồng kiến tạo:</b> tối thiểu 3 sào mỗi năm, 55.000đ/kg — 16.500.000đ mỗi sào một năm.`,
      than: [
        { h: `Doanh nghiệp nhận được gì`,
          ds: [`<b>Làm quà tặng / nguyên liệu.</b> Gạo di sản làm quà tặng cho nhân viên hoặc đối tác, và làm nguyên liệu cho menu của doanh nghiệp.`,
               `<b>Minh bạch tác động bền vững.</b> Theo dõi hành trình của sào ruộng và nhận báo cáo về tác động môi trường.`,
               `<b>Trải nghiệm dành cho doanh nghiệp.</b> HTX tổ chức các chương trình tham quan, xuống giống, gặt lúa và trải nghiệm nông nghiệp bản địa cho nhân viên, khách hàng và đối tác.`,
               `<b>Truyền thông thương hiệu.</b> Đồng hành truyền thông cùng HTX Lúa&nbsp;Di&nbsp;Sản Hội&nbsp;An.`] },
        { h: `Mức tham gia`,
          p: [`Tối thiểu 3 sào mỗi năm. Giá gạo 55.000đ/kg, tương đương 16.500.000đ cho mỗi sào một năm.`] },
        { h: `Phù hợp với ai`,
          p: [`Doanh nghiệp muốn có nguồn gạo sạch minh bạch để làm quà tặng hoặc nguyên liệu, đồng thời có câu chuyện thật để kể với nhân viên và khách hàng.`] },
      ],
    },

    /* ---------- CHƯƠNG TRÌNH 3 ---------- */
    'doi-tac': {
      ten:    `Đối tác kiến tạo di sản`,
      phu:    `Chương trình 3 · Dành cho doanh nghiệp tiên phong`,
      anh:    `img/goi-3-doi-tac.jpg`,
      gia:    `28.500.000đ`,
      giaDv:  `/ sào mỗi năm — tối thiểu 3 sào`,
      nutMua: `Tôi quan tâm chương trình này`,
      tomTat: `Đầu tư dài hạn cùng HTX gìn giữ đất, giống lúa bản địa và văn hóa lúa nước Hội&nbsp;An — có dấu ấn thương hiệu ngay trên cánh đồng.`,
      dan:    `Dành cho những doanh nghiệp mong muốn đầu tư dài hạn để cùng HTX và người nông dân gìn giữ đất, giống lúa bản địa và văn hóa lúa nước Hội&nbsp;An, như một phần trong chiến lược phát triển bền vững của mình.`,
      quyenLoi: [`Toàn bộ quyền lợi của chương trình Người đồng kiến tạo`,
                 `<b>Minh bạch dữ liệu lowcarbon</b> — báo cáo Offset Carbon Footprint chi tiết, phục vụ hoạt động ESG và CSR`,
                 `<b>Dấu ấn thương hiệu trên cánh đồng</b> — tên doanh nghiệp gắn tại sào ruộng đồng hành`,
                 `<b>Câu chuyện thương hiệu mang bản sắc riêng</b> — thiết kế bao bì quà tặng và nội dung đồng thương hiệu`],
      hoatDong: `🎟️ <b>Trở thành Đối tác kiến tạo di sản:</b> tối thiểu 3 sào mỗi năm, 95.000đ/kg — 28.500.000đ mỗi sào một năm.`,
      than: [
        { h: `Doanh nghiệp nhận được gì`,
          ds: [`<b>Làm quà tặng / nguyên liệu.</b> Gạo di sản làm quà tặng cho nhân viên hoặc đối tác, và làm nguyên liệu cho menu của doanh nghiệp.`,
               `<b>Minh bạch tác động bền vững.</b> Theo dõi hành trình của sào ruộng và nhận báo cáo về tác động môi trường, hỗ trợ doanh nghiệp trong các hoạt động ESG và CSR.`,
               `<b>Trải nghiệm dành riêng cho doanh nghiệp.</b> Tổ chức các chương trình tham quan, xuống giống, gặt lúa và trải nghiệm nông nghiệp bản địa cho nhân viên, khách hàng và đối tác.`,
               `<b>Minh bạch dữ liệu lowcarbon.</b> Cung cấp báo cáo Offset Carbon Footprint chi tiết.`,
               `<b>Dấu ấn thương hiệu trên cánh đồng.</b> Tên doanh nghiệp được gắn tại sào ruộng đồng hành, trở thành biểu tượng cho cam kết phát triển bền vững cùng người nông dân Hội&nbsp;An.`,
               `<b>Câu chuyện thương hiệu mang bản sắc riêng.</b> Thiết kế bao bì quà tặng, câu chuyện truyền thông và nội dung đồng thương hiệu gắn với hành trình của chính sào ruộng doanh nghiệp đồng hành.`] },
        { h: `Mức tham gia`,
          p: [`Tối thiểu 3 sào mỗi năm. Giá gạo 95.000đ/kg, tương đương 28.500.000đ cho mỗi sào một năm.`] },
        { h: `Phù hợp với ai`,
          p: [`Doanh nghiệp tiên phong coi phát triển bền vững là chiến lược dài hạn, cần dữ liệu carbon minh bạch và muốn ghi dấu ấn thương hiệu ngay trên cánh đồng di sản Hội&nbsp;An.`] },
      ],
    },

  },
},

};

/**********************************************************************
 * PHẦN DƯỚI ĐÂY LÀ MÁY MÓC — KHÔNG PHẢI NỘI DUNG, ĐỪNG SỬA.
 *
 * Trong phần chữ ở trên có dùng &nbsp; (khoảng trắng dính) để giữ các
 * cụm như "Hội&nbsp;An", "TP.&nbsp;Đà&nbsp;Nẵng" không bị bẻ làm hai
 * dòng. Trình duyệt hiểu &nbsp; khi chữ được đưa vào trang dưới dạng
 * HTML, nhưng có vài chỗ dùng chữ thuần — tiêu đề tab trình duyệt, nội
 * dung điền vào form. Ở đó phải gỡ &nbsp; ra, nếu không người xem sẽ
 * thấy đúng chuỗi "&nbsp;" nằm giữa câu.
 *
 * Hàm này đặt ở đây (chứ không ở js/chung.js) vì file này được nạp
 * trong <head>, sớm hơn — trang chi tiết cần dùng ngay.
 **********************************************************************/
function chuThuan(t){
  return String(t == null ? '' : t)
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .trim();
}
