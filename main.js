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

function loadListCustomer()
{
    eList.innerHTML = "";
    var i = 1;
    while (true)
    {
        var j =  localStorage.getItem("kh" + i);
            if (j == null) return;
        if (j.length < 1) return;
        var kh = JSON.parse(j);

        eList.innerHTML += "<option value='"+i+"'>"+kh.fullname+"</option>";

        i++;
    }
}

function loadCustomer() {
    var id = eList.value;
    if (id == null) return;
    var j =  localStorage.getItem("kh" + id);
    if (j == null) return;
    if (j.length < 1) return 0;
    var kh = JSON.parse(j);

    eFullname.value = kh.fullname;
    eTram.value = kh.tram;
    eCaoVoi.checked = kh.caovoi;
    eTayTrang.checked = kh.taytrang;
    eChupHinh.checked = kh.chuphinh;
    eTien.innerText = formatMoney(cal());
    return 1;
}

function saveInfo()
{
    localStorage.setItem("fullname", Fullname.value);
    localStorage.setItem("cbCaoVoi", CaoVoi.checked);
    localStorage.setItem("cbTayTrang", TayTrang.checked);
    localStorage.setItem("cbChupHinhRang", ChupHinhRang.checked);
    localStorage.setItem("edtTramRang", Tram.checked);


    // luu list
    var kh = new khachHang(Fullname.value, CaoVoi.checked, TayTrang.checked, ChupHinh.checked, Tram.value);
    var number  = localStorage.getItem("number");
    if (number == null)number = 0;
    else if (number.length < 1) number = 0;
    number++;
    
    localStorage.setItem("kh" + number, JSON.stringify(kh));
    localStorage.setItem("number", number);
    loadListCustomer();
}


function formatMoney(money)
{
    money = money.toString();
    if (money.length < 1) return 0;
    var newMoney = "";
    var count = 1;
    for (var i = money.length - 1; i >= 0; i--) {
        if (count%3==0 && i!=0) newMoney = "." + money[i] + newMoney;
        else newMoney = money[i] + newMoney;
        count++;
    }
    return newMoney;
}

function autoFixName()
{
    fullname = eFullname.value;
    if (fullname.length < 1) return;
    fullname = fullname.replace("  ", " ");
    var newName = "";
    var flag = true;
    for (var i = 0; i < fullname.length; i++) {
        if (flag) {
            newName += fullname[i].toUpperCase();
            flag = false;
        }
        else newName += fullname[i];
        if (fullname[i] == " ") flag = true;
    }

    eFullname.value = newName;;
}

loadListCustomer();
