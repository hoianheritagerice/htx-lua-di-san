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
    nut1:    `Xem sản phẩm <svg class="nav-arrow" width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M5 15 15 5M5 5h10v10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    nut2:    `Khám phá Cánh Đồng`,
  },

  /* --- Mục Câu chuyện (bản ngắn, có ảnh bên trái) --- */
  cauChuyen: {
    nhan:    `Câu chuyện của chúng tôi`,
    tieuDe:  `Giữ lại giống lúa của ông cha, trên chính cánh đồng quê`,
    doan1:   `Hợp tác xã Lúa&nbsp;Di&nbsp;Sản ra đời từ mong muốn giữ gìn những giống lúa bản địa và cách canh tác thuận tự nhiên trên các cánh đồng Ông&nbsp;Đảng, Đồng&nbsp;Cao, Đồng&nbsp;Mẫu.`,
    doan2:   `Mỗi lô ruộng được ghi mã riêng, gắn với tên người nông dân canh tác, ngày gieo sạ, ngày thu hoạch — tất cả công khai để anh/chị yên tâm về nguồn gốc.`,
    nut:     `Đọc câu chuyện đầy đủ <svg class="nav-arrow" width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M5 15 15 5M5 5h10v10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
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
    nut:     `Khám phá Cánh Đồng <svg class="nav-arrow" width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M5 15 15 5M5 5h10v10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
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
    tieuDe: `Sự kiện di sản thường niên`,
    dan: `Đặc quyền chia sẻ chung cho cả gói Người gieo mầm di sản và Cách mạng di sản. Cùng HTX Lúa Di Sản trải nghiệm bốn lễ hội của hai mùa vụ trong năm.`,
    hanhTrinh: [
      { so:`1`, ten:`Lễ Tịch Điền (Xuống đồng)`, moTa:`Dọn dẹp cảnh quan, lễ cúng truyền thống, tương tác trâu cày và tự tay gieo mạ non.` },
      { so:`2`, ten:`Lễ hội mừng Lúa mới (Thu hoạch)`, moTa:`Cắt lúa, tuốt lúa bằng xe bò, trải nghiệm bồ đập lúa và trình diễn xay bột gạo thủ công.` },
      { so:`3`, ten:`Lễ Tịch Điền (Xuống đồng vụ 2)`, moTa:`Lặp lại chu kỳ tái sinh của đất mẹ, gieo mầm vụ mới.` },
      { so:`4`, ten:`Lễ hội mừng Lúa mới (Thu hoạch vụ 2)`, moTa:`Thu hoạch lúa vàng, phơi rơm, rê lúa và thưởng thức mâm cúng tạ ơn thiên nhiên.` },
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
              `Cánh đồng sử dụng nước giếng khoan, chủ động nguồn nước tưới cho canh tác.`] },
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
      tomTat: `Cánh đồng có nhiều xã viên nhất của HTX, với hơn 40 thửa ruộng.`,
      dan:    `Cánh đồng có nhiều xã viên nhất của HTX, với hơn 40 thửa ruộng.`,
      so: [[`40+`, `thửa ruộng`], [`Cẩm&nbsp;Thanh`, `vị trí`], [`Hè&nbsp;Thu&nbsp;2026`, `vụ đang canh tác`]],
      than: [
        { h: `Nhiều xã viên nhất`,
          p: [`Đồng&nbsp;Cao tập trung nhiều hộ xã viên nhất, nằm dọc đường Tống Văn Sương ở Cẩm&nbsp;Thanh.`] },
        { h: `Cách tổ chức canh tác`,
          ds: [`Lịch gieo sạ và thu hoạch thống nhất toàn cánh đồng`,
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
      ten: `Người gieo mầm di sản`,
      phu: `Gói sào ruộng`,
      anh: `img/goi-1-gieo-mam.jpg`,
      gia: `65.000đ`, giaDv: `/kg · Giá chưa bao gồm VAT`,
      dongHanhToiThieu: `80 kg gạo/năm`,
      nutMua: `Tôi quan tâm chương trình này`,
      tomTat: `Chọn giống lúa bản địa, nhận gạo tươi xát dối, theo dõi thửa ruộng và tham gia bốn lễ hội mùa vụ hằng năm.`,
      dan: `Cùng người nông dân nuôi dưỡng một sào ruộng Hội An và nhận gạo tươi lành cho gia đình hoặc tổ chức.`,
      // Dòng "Dành cho doanh nghiệp" trên bản in của gói này bị sai.
      phuHop: `Hộ gia đình, nhóm hộ gia đình, trường học hoặc doanh nghiệp nhỏ.`,
      quyenLoi: [
        `<b>Giống lúa</b><br>Chọn 1 giống lúa bản địa Non-GMO.`,
        `<b>Nguồn cung</b><br>Gạo tươi xát dối thượng hạng, an toàn 0% hóa chất.`,
        `<b>Truy xuất</b><br>Mã QR định danh riêng, nhật ký canh tác thời gian thực.`,
        `<b>Ứng dụng</b><br>Làm quà tặng nội bộ hoặc đưa vào thực đơn nhà hàng.`,
        `<b>Trải nghiệm văn hóa</b><br>Tham gia 4 lễ hội mùa vụ thường niên của HTX.`,
        `<b>Quyền tự do kiểm tra thực địa</b><br>Đến thăm bất kỳ lúc nào, tại đúng thửa ruộng mang tên bạn.`,
      ],
      than: [
        { h:`Đối tượng phù hợp`, p:[`Hộ gia đình, nhóm hộ gia đình, trường học hoặc doanh nghiệp nhỏ.`] },
        { h:`Quyền lợi`, ds:[
          `<b>Giống lúa:</b> Chọn 1 giống lúa bản địa Non-GMO.`,
          `<b>Nguồn cung:</b> Gạo tươi xát dối thượng hạng, an toàn 0% hóa chất.`,
          `<b>Truy xuất:</b> Mã QR định danh riêng, nhật ký canh tác thời gian thực.`,
          `<b>Ứng dụng:</b> Làm quà tặng nội bộ hoặc đưa vào thực đơn nhà hàng.`,
          `<b>Trải nghiệm văn hóa:</b> Tham gia 4 lễ hội mùa vụ thường niên của HTX.`,
          `<b>Quyền tự do kiểm tra thực địa:</b> Đến thăm bất kỳ lúc nào, tại đúng thửa ruộng mang tên bạn.`,
        ] },
      ],
      nut: [[`canh-dong.html#ban-do-mua-vu`,`Xem cánh đồng đồng hành`],[`canh-dong.html#dongThoiGian`,`Xem lễ hội mùa vụ`,`phu`]],
    },

    /* ---------- GÓI SÀO RUỘNG 2 ---------- */
    'doi-tac': {
      ten: `Cách mạng di sản`,
      phu: `Gói sào ruộng · Dành cho doanh nghiệp`,
      anh: `img/goi-3-doi-tac.jpg`,
      gia: `115.000đ`, giaDv: `/kg · Giá chưa bao gồm VAT`,
      giaSao: `34.500.000đ/sào/năm`, sanLuongSao: `~300 kg/sào`,
      dongHanhToiThieu: `3 sào ruộng`,
      nutMua: `Tôi quan tâm chương trình này`,
      tomTat: `Toàn bộ quyền lợi của Người gieo mầm di sản, thêm trải nghiệm khách hàng, bảo chứng chất lượng, nhận diện ESG và mô hình trạm gạo tươi.`,
      dan: `Dành cho doanh nghiệp muốn đồng hành cùng cánh đồng di sản và đưa câu chuyện gạo tươi Hội An đến khách hàng.`,
      phuHop: `Doanh nghiệp khách sạn, nhà hàng, resort,…`,
      quyenLoi: [
        `<b>Toàn bộ quyền lợi của Người gieo mầm di sản</b><br>Chọn giống bản địa Non-GMO, nhận gạo tươi xát dối, truy xuất bằng mã QR, sử dụng làm quà tặng hoặc thực đơn, tham gia bốn lễ hội mùa vụ và tự do thăm thửa ruộng.`,
      ],
      dacQuyen: [
        `<b>Trải nghiệm khách hàng</b><br>1 tour/tuần trải nghiệm đồng ruộng sinh thái cao cấp, dành riêng cho khách hàng hoặc nhân viên của doanh nghiệp (~32 tour/năm).`,
        `<b>Bảo chứng chất lượng</b><br>Được đặc quyền lựa chọn nguồn gạo từ cánh đồng đạt Chứng nhận Hữu cơ Quốc gia TCVN 11041-2.`,
        `<b>Nhận diện & ESG</b><br>Bảng tên định danh thương hiệu cắm trực tiếp tại ruộng và báo cáo kiểm toán Carbon.`,
        `<b>Setup Trạm Gạo Tươi Refilled</b><br>Tư vấn triển khai mô hình trạm gạo Refilled độc bản, tự tay đong gạo tươi mỗi ngày; lan tỏa thông điệp zero-waste và phong cách sống bền vững.`,
      ],
      than: [
        { h:`Đối tượng phù hợp`, p:[`Doanh nghiệp khách sạn, nhà hàng, resort,…`] },
        { h:`Bao gồm toàn bộ quyền lợi của Người gieo mầm di sản`, ds:[
          `Chọn 1 giống lúa bản địa Non-GMO.`,
          `Gạo tươi xát dối thượng hạng, an toàn 0% hóa chất.`,
          `Mã QR định danh riêng, nhật ký canh tác thời gian thực.`,
          `Làm quà tặng nội bộ hoặc đưa vào thực đơn nhà hàng.`,
          `Tham gia 4 lễ hội mùa vụ thường niên của HTX.`,
          `Đến thăm bất kỳ lúc nào, tại đúng thửa ruộng mang tên doanh nghiệp.`,
        ] },
        { h:`Đặc quyền thêm`, ds:[
          `<b>Trải nghiệm khách hàng:</b> 1 tour/tuần trải nghiệm đồng ruộng sinh thái cao cấp, dành riêng cho khách hàng hoặc nhân viên của doanh nghiệp (~32 tour/năm).`,
          `<b>Bảo chứng chất lượng:</b> Được đặc quyền lựa chọn nguồn gạo từ cánh đồng đạt Chứng nhận Hữu cơ Quốc gia TCVN 11041-2.`,
          `<b>Nhận diện & ESG:</b> Bảng tên định danh thương hiệu cắm trực tiếp tại ruộng và báo cáo kiểm toán Carbon.`,
          `<b>Setup Trạm Gạo Tươi Refilled:</b> Tư vấn triển khai mô hình trạm gạo Refilled độc bản, tự tay đong gạo tươi mỗi ngày; lan tỏa thông điệp zero-waste và phong cách sống bền vững.`,
        ] },
        { h:`Sản lượng và mức giá`, p:[`Khoảng 300 kg/sào, 115.000đ/kg; tương đương 34.500.000đ/sào/năm. Tối thiểu 3 sào ruộng. Giá chưa bao gồm VAT.`] },
      ],
      nut: [[`canh-dong.html#ban-do-mua-vu`,`Xem cánh đồng đồng hành`],[`canh-dong.html#dongThoiGian`,`Xem lễ hội mùa vụ`,`phu`]],
    },

    /* ---------- SỰ KIỆN THƯỜNG NIÊN ---------- */
    'su-kien-doc-ban': {
      ten: `Sự kiện di sản thường niên`,
      phu: `Bốn lễ hội · Hai mùa vụ`,
      anh: `img/timeline/12-ngay-hoi-gat.jpg`,
      nutMua: `Tôi quan tâm chương trình này`,
      tomTat: `Bốn lễ hội mùa vụ dành cho cả Người gieo mầm di sản và Cách mạng di sản: xuống đồng và mừng lúa mới ở hai vụ lúa trong năm.`,
      dan: `Đặc quyền chia sẻ chung cho cả hai gói đồng hành: cùng HTX Lúa Di Sản trải nghiệm bốn lễ hội của hai mùa vụ trong năm.`,
      than: [
        { h:`1. Lễ Tịch Điền (Xuống đồng)`, p:[`Dọn dẹp cảnh quan, lễ cúng truyền thống, tương tác trâu cày và tự tay gieo mạ non.`] },
        { h:`2. Lễ hội mừng Lúa mới (Thu hoạch)`, p:[`Cắt lúa, tuốt lúa bằng xe bò, trải nghiệm bồ đập lúa và trình diễn xay bột gạo thủ công.`] },
        { h:`3. Lễ Tịch Điền (Xuống đồng vụ 2)`, p:[`Lặp lại chu kỳ tái sinh của đất mẹ, gieo mầm vụ mới.`] },
        { h:`4. Lễ hội mừng Lúa mới (Thu hoạch vụ 2)`, p:[`Thu hoạch lúa vàng, phơi rơm, rê lúa và thưởng thức mâm cúng tạ ơn thiên nhiên.`] },
      ],
      nut: [[`canh-dong.html#dongThoiGian`,`Xem mùa vụ & lễ hội`],[`san-pham.html`,`Xem hai gói đồng hành`,`phu`]],
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
