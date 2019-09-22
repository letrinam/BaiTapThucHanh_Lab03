var Fullname = document.getElementById("edtTen");
var CaoVoi = document.getElementById("cbCaoVoi");
var TayTrang = document.getElementById("cbTayTrang");
var ChupHinhRang = document.getElementById("cbChupHinhRang");
var Tram = document.getElementById("edtTramRang");
var Tien = document.getElementById("txtTien");

function ThanhToan() {
    var fullname = Fullname.value;
    var cbCaoVoi = CaoVoi.checked;
    var cbTayTrang = TayTrang.checked;
    var cbChupHinh = ChupHinhRang.checked;
    var edtTramRang = Tram.value;

    if (fullname.length < 1) {
        alert("Vui lòng nhập tên khách hàng");
        return;
    }

    var dichvu = cbCaoVoi == true || cbTayTrang == true || cbChupHinhRang == true || edtTramRang > 0;
    if (!dichvu) {
        alert("Vui lòng chọn ít nhất 1 dịch vụ để thanh toán");
        return;
    }
    if (edtTramRang < 0) {
        alert("Số lượng trám vui lòng >= 0");
        return;
    }

    Tien.innerText = TT();
    saveInfo();
}

function TT() {
    var cbCaoVoi = CaoVoi.checked;
    var cbTayTrang = TayTrang.checked;
    var cbChupHinh = ChupHinhRang.checked;
    var edtTramRang = Tram.value;

    var tongTien = 0;

    if (cbCaoVoi) tongTien += 100000;
    if (cbTayTrang) tongTien += 1200000;
    if (cbChupHinh) tongTien += 200000;

    tongTien += edtTramRang * 80000;
    return tongTien;
}

function reset() {
    if (!confirm("Bạn muốn reset không?"));
    Fullname.value = "";
    Tram.value = 0;
    CaoVoi.checked = false;
    TayTrang.checked = false;
    ChupHinhRang.checked = false;
    Tien.innerText = 0;
}

function saveInfo() {
    localStorage.setItem("fullname", Fullname.value);
    localStorage.setItem("cbCaoVoi", CaoVoi.checked);
    localStorage.setItem("cbTayTrang", TayTrang.checked);
    localStorage.setItem("cbChupHinhRang", ChupHinhRang.checked);
    localStorage.setItem("edtTramRang", Tram.checked);
}
T