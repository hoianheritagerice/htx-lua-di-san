/* Mục Tác động: tổng quy mô cố định của ba cánh đồng, không gọi mạng. */
(function(){
  function render(){
    if(!document.getElementById('tdDienTich'))return;
    const total=tongSoChotCanhDong();
    demSoHienDan(document.getElementById('tdDienTich'),total.dienTich/10000,{soLe:2,hau:' ha'});
    document.getElementById('tdDienTich').title=total.dienTich.toLocaleString('vi-VN',{maximumFractionDigits:1})+' m²';
    demSoHienDan(document.getElementById('tdSoHo'),total.soHo,{hau:' hộ'});
    demSoHienDan(document.getElementById('tdThua'),total.soThua);
    demSoHienDan(document.getElementById('tdSoDong'),total.soDong);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);
  else render();
})();
