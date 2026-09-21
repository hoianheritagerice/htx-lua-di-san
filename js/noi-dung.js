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

  /* --- Mục 4 con số. Số cố định cộng từ js/canh-dong-so-chot.js. --- */
  tacDong: {
    nhan:    `Tác động của chúng tôi`,
    tieuDe:  `Những con số từ cánh đồng thật`,
    nhan1:   `tổng diện tích<br>ba cánh đồng`,
    nhan2:   `hộ nông dân<br>xã viên tham gia`,
    nhan3:   `thửa ruộng<br>được ghi mã riêng`,
    nhan4:   `cánh đồng<br>di sản`,
    ghiChu:  ``,
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
    nhan:    `Sản phẩm & chương trình`,
    tieuDe:  `Ba cách kết nối với cánh đồng di sản`,
    dan:     `Chọn cách đồng hành phù hợp với gia đình, tổ chức hoặc một sự kiện riêng — rồi đi tiếp sang cánh đồng, mùa vụ và hành trình thực tế.`,
  },
  loiDan: {
    nhan: `Chọn theo cách bạn muốn tạo ra giá trị`,
    tieuDe: `Từ bữa cơm hằng ngày đến một dấu ấn dài hạn trên cánh đồng`,
    dan: `Mỗi lựa chọn bên dưới dẫn tới một trải nghiệm khác nhau, nhưng cùng gặp nhau ở một điểm: kết nối người dùng với đất, người nông dân, lúa gạo và văn hóa Hội An.`,
  },
  suKienDocBan: {
    tieuDe: `Trải nghiệm MICE: Từ đồng ruộng đến bàn ăn`,
    hanhTrinh: [
      { so:`1`, ten:`Chạm vào Đất`, moTa:`Tương tác với trâu cày, tự tay gieo mạ non, học cách cấy lúa truyền thống hoặc đập lúa.` },
      { so:`2`, ten:`Văn hóa & Tâm linh`, moTa:`Lắng nghe nông dân kể chuyện chuyển đổi sinh thái. Trực tiếp tham gia Lễ cúng xuống giống hoặc mừng mùa.` },
      { so:`3`, ten:`Chế biến Di sản`, moTa:`Trình diễn xay bột bằng cối đá, hướng dẫn khách tự tráng lá mì, làm bánh đập thủ công.` },
      { so:`4`, ten:`Ẩm thực Farm-to-Table`, moTa:`Welcome drink với nước gạo rang, teabreak bánh địa phương, và mâm cơm mỳ Quảng, cá hấp giữa đồng.` },
    ],
    giaTri: [
      { ten:`Văn hóa & Sinh thái`, moTa:`Trải nghiệm cưỡi trâu, cày bừa, cấy lúa tay và giã gạo bằng cối gỗ truyền thống.` },
      { ten:`Không gian Sự kiện`, moTa:`Setup bàn ghế tre mộc mạc nhưng tinh tế ngay giữa đồng ruộng xanh mát.` },
      { ten:`Ẩm thực Bản địa`, moTa:`Welcome drink thảo mộc (nước gạo, trà đậu ván), Teabreak bánh quê (bánh xoài, bánh ram), và Tiệc chính Mỳ Quảng trộn, Bánh đập.` },
    ],
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

    /* ---------- GÓI SÀO RUỘNG 1 ---------- */
    'gieo-mam': {
      ten:    `Người gieo mầm`,
      phu:    `Gói sào ruộng · Xã viên tiêu dùng`,
      anh:    `img/goi-1-gieo-mam.jpg`,
      gia:    `65.000 VND`,
      giaDv:  `/ kg`,
      dongHanhToiThieu: `80kg/năm`,
      nutMua: `Tôi quan tâm chương trình này`,
      tagline: `Chỉ gần 30k/ngày, khi làm Xã viên tiêu dùng của HTX, Anh chị nhận về những điều gì?`,
      tomTat: `Mỗi bữa cơm là một hạt mầm cho tương lai. Anh/chị cùng người nông dân nuôi dưỡng một sào ruộng Hội An để mang những hạt gạo tươi lành đến gia đình, và gieo trong con trẻ tình yêu với đất, với lúa và với nguồn cội.`,
      dan:    `Mỗi bữa cơm là một hạt mầm cho tương lai. Anh/chị cùng người nông dân nuôi dưỡng một sào ruộng Hội An để mang những hạt gạo tươi lành đến gia đình, và gieo trong con trẻ tình yêu với đất, với lúa và với nguồn cội.`,
      phuHop: `Gia đình, trường học, công ty và các cá nhân yêu Nông nghiệp`,
      quyenLoi: [
        `<b>1. Gạo tươi giao định kỳ hàng tháng</b><br>Lúa đã mua được lưu trữ và xay xát thành gạo tươi theo mô hình "Ăn tới đâu, xát tới đó"  tại xưởng gạo của HTX. Gạo tươi được giao tận nhà, trường học, công ty... định kỳ hằng tháng  (1 lần/tháng) và miễn phí vận chuyển.`,
        `<b>2. Làm quà tặng</b><br>Làm quà tặng nội bộ, quà tặng cho các tổ chức từ thiện, quà tặng cho đối tác, thực đơn nhà hàng...`,
        `<b>3. Lựa chọn giống lúa bản địa, Non-GMO</b><br>ST25, VRN20, Nếp cẩm, Xiệt — canh tác hữu cơ sinh thái, không hoá chất.`,
        `<b>4. Truy xuất nguồn gốc thời gian thực</b><br>Mỗi khách hàng sở hữu mã QR định danh riêng, xem được nhật ký canh tác sào ruộng của mình theo thời gian thực.`,
        `<b>5. Minh bạch tác động bền vững.</b><br>Theo dõi hành trình của sào ruộng của mình và nhận báo cáo về tác động xã hội và môi trường qua một tài khoản cá nhân riêng.`,
        `<b>6. Tham gia chương trình trải nghiệm của năm</b><br>Miễn phí tham gia 4 chương trình trải nghiệm trên cánh đồng của năm: Lễ Tịch Điền, Lễ Cúng mừng lúa mới của 2 vụ Đông Xuân và Hè Thu.`,
        `<b>7. Quyền tự do kiểm tra thực địa & học tập, tìm hiểu</b><br>Là xã viên tiêu dùng của HTX và cộng đồng, Người gieo mầm được thăm đồng ruộng  và sào ruộng của mình tự do; Có nhiều cơ hội tìm hiểu kiến thức trồng lúa và nông nghiệp hữu cơ; Được hỗ trợ kiến thức để Người gieo mầm có thể tự trồng được lúa; Được ưu tiên tham gia các chương trình sự kiện đặc biệt khác.`,
        `<b>8. Chia sẻ rủi ro cùng nông dân - Trao đi để nhận về</b><br>Việc mua lúa cả năm của Người gieo mầm đã cùng HTX ứng trước 50% chi phí vật tư đầu vào để nông dân an tâm gieo trồng, cam kết giá thu mua tối thiểu bất kể biến động thị trường.`,
      ],
      than: [
        { h:`Phù hợp với ai?`, p:[`Gia đình, trường học, công ty và các cá nhân yêu Nông nghiệp`] },
        { h:`Người gieo mầm nhận được gì?`, ds:[
          `1. Gạo tươi giao định kỳ hàng tháng<br>Lúa đã mua được lưu trữ và xay xát thành gạo tươi theo mô hình "Ăn tới đâu, xát tới đó"  tại xưởng gạo của HTX. Gạo tươi được giao tận nhà, trường học, công ty... định kỳ hằng tháng  (1 lần/tháng) và miễn phí vận chuyển.`,
          `2. Làm quà tặng<br>Làm quà tặng nội bộ, quà tặng cho các tổ chức từ thiện, quà tặng cho đối tác, thực đơn nhà hàng...`,
          `3. Lựa chọn giống lúa bản địa, Non-GMO<br>ST25, VRN20, Nếp cẩm, Xiệt — canh tác hữu cơ sinh thái, không hoá chất.`,
          `4. Truy xuất nguồn gốc thời gian thực<br>Mỗi khách hàng sở hữu mã QR định danh riêng, xem được nhật ký canh tác sào ruộng của mình theo thời gian thực.`,
          `5. Minh bạch tác động bền vững.<br>Theo dõi hành trình của sào ruộng của mình và nhận báo cáo về tác động xã hội và môi trường qua một tài khoản cá nhân riêng.`,
          `6. Tham gia chương trình trải nghiệm của năm<br>Miễn phí tham gia 4 chương trình trải nghiệm trên cánh đồng của năm: Lễ Tịch Điền, Lễ Cúng mừng lúa mới của 2 vụ Đông Xuân và Hè Thu.`,
          `7. Quyền tự do kiểm tra thực địa & học tập, tìm hiểu<br>Là xã viên tiêu dùng của HTX và cộng đồng, Người gieo mầm được thăm đồng ruộng  và sào ruộng của mình tự do; Có nhiều cơ hội tìm hiểu kiến thức trồng lúa và nông nghiệp hữu cơ; Được hỗ trợ kiến thức để Người gieo mầm có thể tự trồng được lúa; Được ưu tiên tham gia các chương trình sự kiện đặc biệt khác.`,
          `8. Chia sẻ rủi ro cùng nông dân - Trao đi để nhận về<br>Việc mua lúa cả năm của Người gieo mầm đã cùng HTX ứng trước 50% chi phí vật tư đầu vào để nông dân an tâm gieo trồng, cam kết giá thu mua tối thiểu bất kể biến động thị trường.`,
        ]},
        { h:`Đồng hành tối thiểu`, p:[`80kg/năm`] },
      ],
      nut: [[`canh-dong.html#ban-do-mua-vu`,`Xem cánh đồng đồng hành`],[`canh-dong.html#dongThoiGian`,`Xem chương trình trải nghiệm`,`phu`]],
    },

    /* ---------- GÓI SÀO RUỘNG 2 ---------- */
    'doi-tac': {
      ten:    `Đối tác cách mạng di sản`,
      phu:    `Gói sào ruộng · Dành cho doanh nghiệp`,
      anh:    `img/goi-3-doi-tac.jpg`,
      gia:    `95.000 VND`,
      giaDv:  `/ kg`,
      dongHanhToiThieu: `3 sào`,
      nutMua: `Tôi quan tâm chương trình này`,
      tomTat: `Dành cho những doanh nghiệp mong muốn đầu tư dài hạn để cùng HTX và người nông dân gìn giữ đất, giống lúa bản địa và văn hóa lúa nước Hội An, như một phần trong chiến lược phát triển bền vững của mình.`,
      dan:    `Dành cho những doanh nghiệp mong muốn đầu tư dài hạn để cùng HTX và người nông dân gìn giữ đất, giống lúa bản địa và văn hóa lúa nước Hội An, như một phần trong chiến lược phát triển bền vững của mình.`,
      phuHop: `Doanh nghiệp Khách sạn, Nhà hàng, Resort<br>Doanh nghiệp tiên phong coi phát triển bền vững là chiến lược dài hạn, cần dữ liệu carbon minh bạch và muốn ghi dấu ấn thương hiệu ngay trên cánh đồng di sản Hội An.`,
      quyenLoi: [
        `<b>1. Gạo tươi giao định kỳ hàng tháng hoặc theo nhu cầu đã thỏa thuận</b><br>Lúa đã mua được lưu trữ và xay xát thành gạo tươi theo mô hình "Ăn tới đâu, xát tới đó"  tại xưởng gạo của HTX. Gạo tươi được giao tận nhà, trường học, công ty... định kỳ theo thỏa thuận và miễn phí vận chuyển.`,
        `<b>2. Làm quà tặng</b><br>Thiết kế bao bì quà tặng, câu chuyện truyền thông và nội dung đồng thương hiệu gắn với hành trình của chính sào ruộng doanh nghiệp đồng hành để làm quà tặng nội bộ, quà tặng cho các tổ chức từ thiện, quà tặng cho đối tác, thực đơn nhà hàng/khách sạn...`,
        `<b>3. Lựa chọn giống lúa bản địa, Non-GMO</b><br>ST25, VRN20, Nếp cẩm, Xiệt — canh tác hữu cơ sinh thái, không hoá chất.`,
        `<b>4. Truy xuất nguồn gốc thời gian thực</b><br>Mỗi khách hàng sở hữu mã QR định danh riêng, xem được nhật ký canh tác sào ruộng của mình theo thời gian thực.`,
        `<b>5. Minh bạch tác động bền vững.</b><br>Theo dõi hành trình của sào ruộng của mình và nhận báo cáo về tác động xã hội và môi trường qua một tài khoản cá nhân riêng.`,
        `<b>6. Tham gia chương trình trải nghiệm của năm</b><br>Miễn phí tham gia 4 chương trình trải nghiệm trên cánh đồng của năm: Lễ Tịch Điền, Lễ Cúng mừng lúa mới của 2 vụ Đông Xuân và Hè Thu.`,
        `<b>7. Quyền tự do kiểm tra thực địa & học tập, tìm hiểu</b><br>Là xã viên tiêu dùng của HTX và cộng đồng, Đối tác cách mạng di sản được thăm đồng ruộng  và sào ruộng của mình tự do; Có nhiều cơ hội tìm hiểu kiến thức trồng lúa và nông nghiệp hữu cơ; Được hỗ trợ kiến thức để có thể tự trồng được lúa; Được ưu tiên tham gia các chương trình sự kiện đặc biệt khác.`,
        `<b>8. Chia sẻ rủi ro cùng nông dân - Trao đi để nhận về</b><br>Việc mua lúa cả năm của Đối tác cách mạng di sản đã cùng HTX ứng trước 50% chi phí vật tư đầu vào để nông dân an tâm gieo trồng, cam kết giá thu mua tối thiểu bất kể biến động thị trường.`,
      ],
      dacQuyen: [
        `<b>1. Trải nghiệm Khách hàng:</b><br>2 Tour/tuần trải nghiệm đồng ruộng sinh thái dành riêng cho khách hàng hoặc nhân viên của doanh nghiệp.`,
        `<b>2. Vận hành điểm chạm về lúa gạo Hội An</b><br>Tư vấn và setup trực tiếp theo nhu cầu mô hình Refill Gạo Tươi  (Trạm nạp lại) hoặc gian hàng trưng bày gạo tươi ngay tại không gian nhà hàng/khách sạn`,
        `<b>3. Bảo chứng chất lượng:</b><br>Được đặc quyền lựa chọn gạo tươi  từ cánh đồng đạt chứng nhận Hữu cơ Quốc gia TCVN 11041-2.`,
        `<b>4. Nhận diện & ESG:</b><br>Bảng tên định danh thương hiệu cắm trực tiếp tại ruộng và báo cáo kiểm toán Carbon (Offset Footprint)`,
      ],
      than: [
        { h:`Phù hợp với ai?`, p:[`Doanh nghiệp Khách sạn, Nhà hàng, Resort`,`Doanh nghiệp tiên phong coi phát triển bền vững là chiến lược dài hạn, cần dữ liệu carbon minh bạch và muốn ghi dấu ấn thương hiệu ngay trên cánh đồng di sản Hội An.`] },
        { h:`CÁC LỢI ÍCH CƠ BẢN`, ds:[
          `1. Gạo tươi giao định kỳ hàng tháng hoặc theo nhu cầu đã thỏa thuận<br>Lúa đã mua được lưu trữ và xay xát thành gạo tươi theo mô hình "Ăn tới đâu, xát tới đó"  tại xưởng gạo của HTX. Gạo tươi được giao tận nhà, trường học, công ty... định kỳ theo thỏa thuận và miễn phí vận chuyển.`,
          `2. Làm quà tặng<br>Thiết kế bao bì quà tặng, câu chuyện truyền thông và nội dung đồng thương hiệu gắn với hành trình của chính sào ruộng doanh nghiệp đồng hành để làm quà tặng nội bộ, quà tặng cho các tổ chức từ thiện, quà tặng cho đối tác, thực đơn nhà hàng/khách sạn...`,
          `3. Lựa chọn giống lúa bản địa, Non-GMO<br>ST25, VRN20, Nếp cẩm, Xiệt — canh tác hữu cơ sinh thái, không hoá chất.`,
          `4. Truy xuất nguồn gốc thời gian thực<br>Mỗi khách hàng sở hữu mã QR định danh riêng, xem được nhật ký canh tác sào ruộng của mình theo thời gian thực.`,
          `5. Minh bạch tác động bền vững.<br>Theo dõi hành trình của sào ruộng của mình và nhận báo cáo về tác động xã hội và môi trường qua một tài khoản cá nhân riêng.`,
          `6. Tham gia chương trình trải nghiệm của năm<br>Miễn phí tham gia 4 chương trình trải nghiệm trên cánh đồng của năm: Lễ Tịch Điền, Lễ Cúng mừng lúa mới của 2 vụ Đông Xuân và Hè Thu.`,
          `7. Quyền tự do kiểm tra thực địa & học tập, tìm hiểu<br>Là xã viên tiêu dùng của HTX và cộng đồng, Đối tác cách mạng di sản được thăm đồng ruộng  và sào ruộng của mình tự do; Có nhiều cơ hội tìm hiểu kiến thức trồng lúa và nông nghiệp hữu cơ; Được hỗ trợ kiến thức để có thể tự trồng được lúa; Được ưu tiên tham gia các chương trình sự kiện đặc biệt khác.`,
          `8. Chia sẻ rủi ro cùng nông dân - Trao đi để nhận về<br>Việc mua lúa cả năm của Đối tác cách mạng di sản đã cùng HTX ứng trước 50% chi phí vật tư đầu vào để nông dân an tâm gieo trồng, cam kết giá thu mua tối thiểu bất kể biến động thị trường.`,
        ]},
        { h:`CÁC LỢI ÍCH ĐẶC QUYỀN KHÁC:`, ds:[
          `1. Trải nghiệm Khách hàng:<br>2 Tour/tuần trải nghiệm đồng ruộng sinh thái dành riêng cho khách hàng hoặc nhân viên của doanh nghiệp.`,
          `2. Vận hành điểm chạm về lúa gạo Hội An<br>Tư vấn và setup trực tiếp theo nhu cầu mô hình Refill Gạo Tươi  (Trạm nạp lại) hoặc gian hàng trưng bày gạo tươi ngay tại không gian nhà hàng/khách sạn`,
          `3. Bảo chứng chất lượng:<br>Được đặc quyền lựa chọn gạo tươi  từ cánh đồng đạt chứng nhận Hữu cơ Quốc gia TCVN 11041-2.`,
          `4. Nhận diện & ESG:<br>Bảng tên định danh thương hiệu cắm trực tiếp tại ruộng và báo cáo kiểm toán Carbon (Offset Footprint)`,
        ]},
        { h:`Đồng hành tối thiểu`, p:[`3 sào`] },
      ],
      nut: [[`canh-dong.html#ban-do-mua-vu`,`Xem cánh đồng đồng hành`],[`canh-dong.html#dongThoiGian`,`Xem tác động & hành trình mùa vụ`,`phu`]],
    },

    /* ---------- TOUR / SỰ KIỆN ---------- */
    'su-kien-doc-ban': {
      ten:    `Sự kiện độc bản`,
      phu:    `Tour · Trải nghiệm MICE`,
      anh:    `img/timeline/12-ngay-hoi-gat.jpg`,
      nutMua: `Tôi quan tâm chương trình này`,
      tomTat: `Từ đồng ruộng đến bàn ăn. Khách được chào đón trên cánh đồng, xuống đồng gặt lúa, chơi với rơm, tham gia xay bột – tráng bánh đập và thưởng thức chính những món vừa làm.`,
      dan:    `Từ đồng ruộng đến bàn ăn. Khách được chào đón trên cánh đồng, xuống đồng gặt lúa, chơi với rơm, tham gia xay bột – tráng bánh đập và thưởng thức chính những món vừa làm.`,
      than: [
        { h:`1. Chạm vào Đất`, p:[`Tương tác với trâu cày, tự tay gieo mạ non, học cách cấy lúa truyền thống hoặc đập lúa.`] },
        { h:`2. Văn hóa & Tâm linh`, p:[`Lắng nghe nông dân kể chuyện chuyển đổi sinh thái. Trực tiếp tham gia Lễ cúng xuống giống hoặc mừng mùa.`] },
        { h:`3. Chế biến Di sản`, p:[`Trình diễn xay bột bằng cối đá, hướng dẫn khách tự tráng lá mì, làm bánh đập thủ công.`] },
        { h:`4. Ẩm thực Farm-to-Table`, p:[`Welcome drink với nước gạo rang, teabreak bánh địa phương, và mâm cơm mỳ Quảng, cá hấp giữa đồng.`] },
        { h:`Văn hóa & Sinh thái`, p:[`Trải nghiệm cưỡi trâu, cày bừa, cấy lúa tay và giã gạo bằng cối gỗ truyền thống.`] },
        { h:`Không gian Sự kiện`, p:[`Setup bàn ghế tre mộc mạc nhưng tinh tế ngay giữa đồng ruộng xanh mát.`] },
        { h:`Ẩm thực Bản địa`, p:[`Welcome drink thảo mộc (nước gạo, trà đậu ván), Teabreak bánh quê (bánh xoài, bánh ram), và Tiệc chính Mỳ Quảng trộn, Bánh đập.`] },
      ],
      nut: [[`canh-dong.html#ban-do-mua-vu`,`Xem cánh đồng`],[`ve-chung-toi.html`,`Tìm hiểu HTX`,`phu`]],
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
