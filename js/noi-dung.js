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
  tenDayDu:     `HTX Lúa Di Sản Hội An`,

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
    tieuDe:  `Hạt gạo mang <em>câu chuyện</em> của đất và người Hội An`,
    dan:     `Từ những thửa ruộng ven sông Thu Bồn ở Cẩm Kim và Cẩm Thanh, chúng tôi canh tác lúa hữu cơ — không dùng bất cứ phân bón hay thuốc hóa học nào — và minh bạch từng khâu. Anh/chị có thể xem nhật ký của chính thửa ruộng làm ra hạt gạo mình ăn.`,
    nut1:    `Xem sản phẩm →`,
    nut2:    `Khám phá Cánh Đồng`,
  },

  /* --- Mục Câu chuyện (bản ngắn, có ảnh bên trái) --- */
  cauChuyen: {
    nhan:    `Câu chuyện của chúng tôi`,
    tieuDe:  `Giữ lại giống lúa của ông cha, trên chính cánh đồng quê`,
    doan1:   `Hợp tác xã Lúa Di Sản ra đời từ mong muốn giữ gìn những giống lúa bản địa và cách canh tác thuận tự nhiên trên các cánh đồng Ông Đảng, Đồng Cao, Đồng Mẫu.`,
    doan2:   `Mỗi lô ruộng được ghi mã riêng, gắn với tên người nông dân canh tác, ngày gieo sạ, ngày thu hoạch — tất cả công khai để anh/chị yên tâm về nguồn gốc.`,
    nut:     `Đọc câu chuyện đầy đủ →`,
  },

  /* --- Tiêu đề mục 3 gói (chữ trong từng thẻ nằm ở khối `goi`) --- */
  sanPham: {
    nhan:    `Sản phẩm`,
    tieuDe:  `Ba cách để đồng hành cùng cánh đồng`,
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
    gioiThieu:  `Hợp tác xã lúa hữu cơ tại Hội An, TP. Đà Nẵng — canh tác minh bạch, truy xuất nguồn gốc tới từng thửa ruộng.`,
    diaChi:     `Hội An, TP. Đà Nẵng`,
    dienThoai:  `Điện thoại: `,
    mangXaHoi:  `Facebook · YouTube`,
    banQuyen:   `© 2026 HTX Lúa Di Sản Hội An`,
    dongCuoi:   `Hội An · TP. Đà Nẵng`,
  },
},

/* ====================================================================
   3. TRANG VỀ CHÚNG TÔI  (ve-chung-toi.html)
   ==================================================================== */
veChungToi: {
  hero: {
    nhan:    `Về chúng tôi`,
    tieuDe:  `Giữ hạt gạo quê, giữ một vùng di sản`,
    dan:     `HTX Lúa Di Sản Hội An là nơi những người nông dân cùng nhau canh tác lúa hữu cơ hoàn toàn, gìn giữ giống lúa và cách làm ruộng của cha ông trên đất Cẩm Kim, Cẩm Thanh.`,
  },
  cauChuyen: {
    nhan:    `Câu chuyện`,
    tieuDe:  `Bắt đầu từ những cánh đồng ven sông Thu Bồn`,
    doan1:   `Những cánh đồng của HTX nằm bên dòng Thu Bồn, nơi phù sa bồi đắp cho hạt lúa vị ngọt riêng. Trước áp lực của phân bón và thuốc hóa học, một nhóm nông dân đã chọn quay lại cách canh tác thuận tự nhiên — bỏ hẳn hóa chất, không phải giảm bớt.`,
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
    tieuDe:  `Ba cách đồng hành cùng cánh đồng di sản`,
    dan:     `Không chỉ là mua gạo — mỗi gói gắn anh/chị với một thửa ruộng và những hoạt động diễn ra suốt mùa vụ, từ lễ xuống đồng đến ngày hội gặt.`,
  },

  /* Bảng đối chiếu gói × hoạt động.
     Mỗi dòng: [tên hoạt động, gói 1, gói 2, gói 3]
     Gõ  co  nếu gói đó CÓ tham gia, gõ  khong  nếu KHÔNG. */
  doiChieu: {
    nhan:    `Gói × Mùa vụ`,
    tieuDe:  `Mua gói nào được tham gia hoạt động nào?`,
    cot:     [`Hoạt động mùa vụ`, `Gieo mầm`, `Đồng kiến tạo`, `Đối tác`],
    hang: [
      [`Bản tin các mốc mùa vụ`,              `co`,    `co`, `co`],
      [`Gắn với một thửa ruộng`,              `khong`, `co`, `co`],
      [`Trải nghiệm xuống giống · thăm đồng`, `khong`, `co`, `co`],
      [`Ngày hội gặt`,                        `co`,    `co`, `co`],
      [`Lễ cúng xuống đồng · cơm mới`,        `khong`, `khong`, `co`],
    ],
    ghiChu:  `Các hoạt động này khớp với <a href="canh-dong.html" style="color:var(--dat-som);font-weight:600">dòng thời gian ở trang Cánh Đồng</a>.`,
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
      ten:    `Cánh đồng Ông Đảng`,
      tenNgan:`Ông Đảng`,
      viTri:  `Cẩm Kim`,
      phu:    `Cẩm Kim, Hội An`,
      anh:    `img/dong-ong-dang.jpg`,
      /* câu ngắn hiện trên thẻ ở Trang chủ */
      tomTat: `20 thửa ruộng ven sông, nơi HTX phát triển mô hình canh tác hữu cơ và du lịch nông nghiệp.`,
      /* câu dẫn dưới tiêu đề ở trang chi tiết */
      dan:    `Cánh đồng ven sông ở Cẩm Kim, nơi HTX phát triển mô hình canh tác hữu cơ gắn với du lịch nông nghiệp.`,
      so: [[`20`, `thửa ruộng`], [`~13.500`, `m² diện tích`], [`Hè Thu 2026`, `vụ đang canh tác`]],
      than: [
        { h: `Vị trí và đặc điểm đất`,
          p: [`Cánh đồng nằm ở thôn Cẩm Kim, sát sông Thu Bồn, đất phù sa bồi hằng năm nên tơi xốp và giàu dinh dưỡng.`,
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
      ten:    `Cánh đồng Đồng Cao`,
      tenNgan:`Đồng Cao`,
      viTri:  `Cẩm Thanh`,
      phu:    `Cẩm Thanh, Hội An`,
      anh:    `img/dong-dong-cao.jpg`,
      tomTat: `Cánh đồng lớn nhất với hơn 40 thửa, mỗi thửa gắn tên một hộ nông dân xã viên.`,
      dan:    `Cánh đồng lớn nhất của HTX với hơn 40 thửa, mỗi thửa gắn tên một hộ nông dân xã viên.`,
      so: [[`40+`, `thửa ruộng`], [`Cẩm Thanh`, `vị trí`], [`Hè Thu 2026`, `vụ đang canh tác`]],
      than: [
        { h: `Quy mô lớn nhất trong ba cánh đồng`,
          p: [`Đồng Cao là cánh đồng rộng nhất, tập trung nhiều hộ xã viên nhất, nằm dọc đường Tống Văn Sương ở Cẩm Thanh.`,
              `Hệ thống kênh thủy lợi chạy qua giúp chủ động nước tưới suốt vụ.`] },
        { h: `Cách tổ chức canh tác`,
          ds: [`Chia thửa rõ ràng, nhiều hộ chia đôi thửa lớn`,
               `Lịch gieo sạ và thu hoạch thống nhất toàn cánh đồng`,
               `Ghi chép nhật ký đồng ruộng theo từng lô`] },
      ],
      nut: [[`canh-dong.html`, `Xem bản đồ &amp; dòng thời gian`], [`san-pham.html`, `Xem các gói sản phẩm`, `phu`]],
    },

    'dong-mau': {
      ten:    `Cánh đồng Đồng Mẫu`,
      tenNgan:`Đồng Mẫu`,
      viTri:  `Cẩm Thanh`,
      phu:    `Cẩm Thanh, Hội An`,
      anh:    `img/dong-dong-mau.jpg`,
      tomTat: `Những thửa ruộng rộng, canh tác giống lúa bản địa theo lịch mùa vụ truyền thống.`,
      dan:    `Những thửa ruộng rộng, canh tác giống lúa bản địa theo lịch mùa vụ truyền thống.`,
      so: [[`20`, `thửa ruộng`], [`Cẩm Thanh`, `vị trí`], [`Hè Thu 2026`, `vụ đang canh tác`]],
      than: [
        { h: `Cánh đồng của những thửa lớn`,
          p: [`Đồng Mẫu có các thửa ruộng khổ lớn, thuận cho việc cơ giới hóa khâu làm đất và thu hoạch.`,
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
  nhan: `Gói sản phẩm`, ve: `san-pham.html`,
  veChu: `Quay lại Sản phẩm`, navId: `navSP`,
  khacTit: `Hai gói còn lại`,
  muc: {

    'gieo-mam': {
      ten:    `Người gieo mầm`,
      phu:    `Gói 1`,
      anh:    `img/goi-1-gieo-mam.jpg`,
      gia:    `— đ`,
      giaDv:  `/ đơn vị`,
      nutMua: `Tôi quan tâm gói này`,
      /* câu ngắn trên thẻ Trang chủ */
      tomTat: `Gói cơ bản để bắt đầu trải nghiệm gạo hữu cơ Hội An — anh/chị nhận gạo và quyền xem nhật ký sản xuất.`,
      /* câu dẫn ở trang Sản phẩm và đầu trang chi tiết */
      dan:    `Gói khởi đầu để làm quen với gạo hữu cơ Hội An và cách canh tác minh bạch của HTX.`,
      /* gạch đầu dòng ở trang Sản phẩm */
      quyenLoi: [`Nhận gạo hữu cơ từ cánh đồng di sản`,
                 `Xem nhật ký sản xuất của lô ruộng làm ra gạo`,
                 `Nhận tin về mùa vụ và sản phẩm mới`],
      hoatDong: `🎟️ <b>Hoạt động mùa vụ:</b> nhận bản tin các mốc chính (gieo sạ, trổ bông, thu hoạch).`,
      than: [
        { h: `Anh/chị nhận được gì`,
          ds: [`Gạo hữu cơ từ cánh đồng di sản`,
               `Quyền xem nhật ký sản xuất của lô ruộng làm ra gạo`,
               `Bản tin các mốc chính của mùa vụ`] },
        { h: `Hoạt động mùa vụ được tham gia`,
          p: [`Nhận bản tin khi cánh đồng tới các mốc chính: gieo sạ, trổ bông, thu hoạch. Được mời tham dự Ngày hội gặt cuối vụ.`] },
        { h: `Phù hợp với ai`,
          p: [`Anh/chị muốn thử gạo hữu cơ Hội An lần đầu, hoặc muốn tìm hiểu cách HTX canh tác trước khi gắn bó lâu dài.`] },
      ],
    },

    'dong-kien-tao': {
      ten:    `Người đồng kiến tạo`,
      phu:    `Gói 2`,
      anh:    `img/goi-2-dong-kien-tao.jpg`,
      gia:    `— đ`,
      giaDv:  `/ vụ`,
      nutMua: `Tôi quan tâm gói này`,
      tomTat: `Gói dành cho anh/chị muốn gắn bó — nhận gạo định kỳ và được gắn với một thửa ruộng cụ thể trên bản đồ.`,
      dan:    `Dành cho anh/chị muốn gắn bó lâu dài và gần hơn với cánh đồng.`,
      quyenLoi: [`Toàn bộ quyền lợi của gói Người gieo mầm`,
                 `Được gắn với một thửa ruộng cụ thể trên bản đồ`,
                 `Nhận gạo định kỳ theo vụ`],
      hoatDong: `🎟️ <b>Hoạt động mùa vụ:</b> mời tham gia trải nghiệm xuống giống &amp; thăm đồng mùa lúa trổ.`,
      than: [
        { h: `Anh/chị nhận được gì`,
          ds: [`Toàn bộ quyền lợi của gói Người gieo mầm`,
               `Được gắn với một thửa ruộng cụ thể trên bản đồ`,
               `Nhận gạo định kỳ theo vụ`,
               `Tài khoản riêng xem nhật ký thửa của mình`] },
        { h: `Hoạt động mùa vụ được tham gia`,
          p: [`Được mời tham gia trải nghiệm cùng nông dân xuống giống đầu vụ, thăm đồng mùa lúa trổ, và Ngày hội gặt.`] },
        { h: `Phù hợp với ai`,
          p: [`Anh/chị có gia đình muốn dùng gạo sạch đều đặn và thích cho con em ra đồng trải nghiệm theo mùa.`] },
      ],
    },

    'doi-tac': {
      ten:    `Đối tác kiến tạo di sản`,
      phu:    `Gói 3`,
      anh:    `img/goi-3-doi-tac.jpg`,
      gia:    `— đ`,
      giaDv:  `/ vụ`,
      nutMua: `Tôi quan tâm gói này`,
      tomTat: `Gói đồng hành sâu — hỗ trợ cả vụ canh tác của một thửa, tên anh/chị hiện trên bản đồ (nếu đồng ý).`,
      dan:    `Gói đồng hành sâu nhất — cùng HTX giữ gìn cả một thửa ruộng qua trọn mùa vụ.`,
      quyenLoi: [`Toàn bộ quyền lợi của gói Người đồng kiến tạo`,
                 `Đồng hành trọn vụ canh tác của một thửa ruộng`,
                 `Tên hiện trên bản đồ thửa ruộng <i>(nếu đồng ý)</i>`],
      hoatDong: `🎟️ <b>Hoạt động mùa vụ:</b> mời dự lễ cúng xuống đồng, ngày hội gặt và lễ cúng cơm mới.`,
      than: [
        { h: `Anh/chị nhận được gì`,
          ds: [`Toàn bộ quyền lợi của gói Người đồng kiến tạo`,
               `Đồng hành trọn vụ canh tác của một thửa ruộng`,
               `Tên hiện trên bản đồ thửa ruộng <i>(nếu đồng ý)</i>`,
               `Sản lượng gạo của thửa theo thỏa thuận`] },
        { h: `Hoạt động mùa vụ được tham gia`,
          p: [`Được mời dự đầy đủ: lễ cúng xuống đồng đầu mùa, các trải nghiệm giữa vụ, Ngày hội gặt và lễ cúng cơm mới tạ ơn cuối vụ.`] },
        { h: `Phù hợp với ai`,
          p: [`Anh/chị là doanh nghiệp, tổ chức hoặc cá nhân muốn đồng hành lâu dài với việc giữ gìn cánh đồng di sản Hội An.`] },
      ],
    },

  },
},

};
