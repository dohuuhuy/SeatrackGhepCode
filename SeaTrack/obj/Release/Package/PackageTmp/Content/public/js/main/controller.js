﻿var _listDeviceStatus = [];
function win_reload() {
    window.location.reload();
}
function toHaily(a) {

    return (Math.round((a * 0.53996) * 10) / 10);
}
function checkDevice(id) {
    i = 0;
    while (i < _listDeviceStatus.length) {
        if (_listDeviceStatus[i].DeviceID == id) return _listDeviceStatus[i];
        i++;
    }
    return 0;
}

// lấy danh sách tàu 
function setup_selectDeviceNo() {
    var dad = [];
    $.ajax({
        type: 'GET',
        url: '/Home/GetListDeviceStatus',
        data: {},
        success: function (data, txtStatus, XMLHttpRequest) {
            dad = data.Result;
            if (dad.length > 0) {
                var _tb = '';

                for (var i = 0; i < dad.length; i++) {
                    _tb += '<option value="' + dad[i]["DeviceID"] + '">' + dad[i]["DeviceName"] + '</option>';
                }
                $("#listDeviceNo").append(_tb);


            }
        }
    });
}

// tốc độ của tàu chạy 
function TocDoCuaTau() {
    var id = $("#listDeviceNo").val();
    var date = $("#datefilter").val();
    var datetime = date.split(" - ");
    var from = datetime[0].replace('/', '-');
    var from = from.replace('/', '-');
    var from = from + ' 00:00';
    var to = datetime[1].replace('/', '-');
    var to = to.replace('/', '-');
    var to = to + ' 23:00';
    var DS_tong = [];
    var DS_diemtheotocdo = [];
    var DS_diemnammotcho = [];
    var ki = 0;
    $.ajax({
        type: 'GET',
        url: '/Home/GetRoadmapByDateTime',
        data: { deviceID: id, From: from, To: to },
        success: function (data, txtStatus, XMLHttpRequest) {
            DS_diem = data.Result;
            if (DS_diem == null) {
                alert("Chưa có dữ liệu cho phạm vi thời gian đã chọn");
            } else {
                if (DS_diem.length > 0) {
                    var speed = toHaily(DS_diem[0]["Speed"]);
                    var k = 0; var i = 0; var test = true;
                    if (speed <= 3) test = false; else test = true;
                    while (i < DS_diem.length) {
                        speed = toHaily(DS_diem[i]["Speed"]);
                        if (test) {
                            if (speed >= 3) {
                                DS_diemtheotocdo.push(DS_diem[i]);
                                i++;
                                continue;
                            } else {
                                DS_tong[ki] = DS_diemtheotocdo;
                                ki++;
                                DS_diemtheotocdo = [];
                                test = false;
                            }
                        } else {
                            if (speed < 3) {
                                DS_diemnammotcho.push(DS_diem[i]);
                                i++;
                                continue;
                            } else {
                                DS_tong[ki] = DS_diemnammotcho;
                                ki++;
                                DS_diemnammotcho = [];
                                test = true;
                            }
                        }
                    }
                }
                ShowTable_BaoCaoTocDo(DS_tong);
            }
        }
    });
}

function TongHopTheoTau() {
    var id = $("#listDeviceNo").val();
    var date = $("#datefilter").val();
    var datetime = date.split(" - ");
    var from = datetime[0].replace('/', '-');
    var from = from.replace('/', '-');
    var from = from + ' 00:00';
    var to = datetime[1].replace('/', '-');
    var to = to.replace('/', '-');
    var to = to + ' 23:00';
    var DS_tong = [];
    var DS_diemtheotocdo = [];
    var DS_diemnammotcho = [];
    var ki = 0;
    $.ajax({
        type: 'GET',
        url: '/Home/GetRoadmapByDateTime',
        data: { deviceID: id, From: from, To: to },
        success: function (data, txtStatus, XMLHttpRequest) {
            DS_diem = data.Result;
            if (DS_diem == null) {
                alert("Chưa có dữ liệu cho phạm vi thời gian đã chọn");
            } else {
                if (DS_diem.length > 0) {
                    var speed = toHaily(DS_diem[0]["Speed"]);
                    var k = 0; var i = 0; var test = true;
                    if (speed <= 3) test = false; else test = true;
                    while (i < DS_diem.length) {
                        speed = toHaily(DS_diem[i]["Speed"]);
                        if (test) {
                            if (speed >= 3) {
                                DS_diemtheotocdo.push(DS_diem[i]);
                                i++;
                                continue;
                            } else {
                                DS_tong[ki] = DS_diemtheotocdo;
                                ki++;
                                DS_diemtheotocdo = [];
                                test = false;
                            }
                        } else {
                            if (speed < 3) {
                                DS_diemnammotcho.push(DS_diem[i]);
                                i++;
                                continue;
                            } else {
                                DS_tong[ki] = DS_diemnammotcho;
                                ki++;
                                DS_diemnammotcho = [];
                                test = true;
                            }
                        }
                    }
                }
                ShowTable_TongHopTheoTau(DS_tong);
            }
        }
    });
}
function ShowTable_BaoCaoTocDo(list) {
    var _tbl = "";
    for (var i = 0; i < list.length; i++) {
        var startdate = new Date(parseInt(list[i][0]["TransmitTime"].substr(6)));
        var TuNgay = startdate.getDate() + '/' + (startdate.getMonth() + 1) + '/' + startdate.getFullYear() + ' ' + startdate.getHours() + ':' + startdate.getMinutes();
        var fishdate = new Date(parseInt(list[i][list[i].length - 1]["TransmitTime"].substr(6)));
        var DenNgay = fishdate.getDate() + '/' + (fishdate.getMonth() + 1) + '/' + fishdate.getFullYear() + ' ' + fishdate.getHours() + ':' + fishdate.getMinutes();
        var tocdotrungbinh = TinhVanTocTrungBinh(list[i]);
        var tocdotoida = TinhVanTocToiDa(list[i]);
        var quangduong = TinhQuangDuong(list[i]);
        _tbl +=
            '<tr>' +
            '<td>' + (i) + '</td>' + // số thứ tự
            '<td>' + TuNgay + '</td>' + // từ ngày
            '<td>' + DenNgay + '</td>' + // đến ngày 
            '<td>' + tocdotrungbinh + '</td>' + // tốc độ trung bình
            '<td>' + tocdotoida + '</td>' + // tốc độ tối đa
            '<td>' + quangduong + '</td>' + // quảng đường
            '</tr>';
        $("#tbody_tocdocuatau").html(_tbl);
    }
}
function ShowTable_TongHopTheoTau(list) {
    var _tbl = "";
    for (var i = 0; i < list.length; i++) {
        var startdate = new Date(parseInt(list[i][0]["TransmitTime"].substr(6)));
        var TuNgay = startdate.getDate() + '/' + (startdate.getMonth() + 1) + '/' + startdate.getFullYear() + ' ' + startdate.getHours() + ':' + startdate.getMinutes();
        var fishdate = new Date(parseInt(list[i][list[i].length - 1]["TransmitTime"].substr(6)));
        var DenNgay = fishdate.getDate() + '/' + (fishdate.getMonth() + 1) + '/' + fishdate.getFullYear() + ' ' + fishdate.getHours() + ':' + fishdate.getMinutes();
        var tocdotrungbinh = TinhVanTocTrungBinh(list[i]);
        var tocdotoida = TinhVanTocToiDa(list[i]);
        var quangduong = TinhQuangDuong(list[i]);
        _tbl +=
            '<tr>' +
            '<td>' + (i) + '</td>' + // số thứ tự
            '<td>' + TuNgay + '</td>' + // từ ngày
            '<td>' + DenNgay + '</td>' + // đến ngày 
            '<td>' + quangduong + '</td>' + // quảng đường
            '<td>' + tocdotrungbinh + '</td>' + // tốc độ trung bình
            '<td>' + tocdotoida + '</td>' + // tốc độ tối đa

            '</tr>';
        $("#tonghoptheotau").html(_tbl);
    }
}

// tính quảng đường trong 1 khoảng thời gian
function TinhQuangDuong(list) {
    var d = 0;

    for (var i = 1; i < list.length; i++) {



        var la2 = list[i]["Latitude"];

        var la1 = list[i - 1]["Latitude"];

        var lo2 = list[i]["Longitude"];
        var lo1 = list[i - 1]["Longitude"];

        var R = 6371;
        var dLat = (la2 - la1) * (Math.PI / 180);
        var dLon = (lo2 - lo1) * (Math.PI / 180);
        var la1ToRad = la1 * (Math.PI / 180);
        var la2ToRad = la2 * (Math.PI / 180);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(la1ToRad) * Math.cos(la2ToRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        d += R * c;


    }
    return toHaily(d);

}




// tính vận tốc tối đa trong 1 khoảng thời gian
function TinhVanTocToiDa(list) {

    var max = toHaily(list[0]['Speed']);
    for (var i = 0; i < list.length; i++) {

        var vantoc = toHaily(list[i]["Speed"]);
        var latitude = list[i]["Latitude"]


        if (max < vantoc) {
            max = vantoc;
        }

    }
    if (max < 3) {
        return max = 0;
    }
    return max;
}

// tính vận tốc trung bình trong 1 khoảng thời gian
function TinhVanTocTrungBinh(list) {

    var Tong = 0;
    var l = 0;
    for (var i = 0; i < list.length; i++) {

        var vantoc = toHaily(list[i]["Speed"]);
        if (vantoc >= 3) {
            Tong += vantoc;
            l++;
        }

    }
    if (l == 0) {
        return (Math.round((Tong) * 10) / 10)
    }
    return (Math.round((Tong / l) * 10) / 10)
}
// báo cáo hành trình tàu chạy
function BaoCaoHanhTrinhTauChay() {
    var id = $("#listDeviceNo").val();
    var date = $("#datefilter").val();
    var datetime = date.split(" - ");
    var from = datetime[0].replace('/', '-');
    var from = from.replace('/', '-');
    var from = from + ' 00:00';
    var to = datetime[1].replace('/', '-');
    var to = to.replace('/', '-');
    var to = to + ' 23:00';
    var list_lin = [];

    $.ajax({
        type: 'GET',
        url: '/Home/GetRoadmapByDateTime',
        data: { deviceID: id, From: from, To: to },
        success: function (data, txtStatus, XMLHttpRequest) {
            console.log(data);
            list_lin = data.Result;
            if (list_lin == null) {
                alert("Chưa có dữ liệu cho phạm vi thời gian đã chọn");
            } else {


                if (list_lin.length > 0) {
                    var _tbl = "";
                    for (var i = 0; i < list_lin.length; i++) {
                        var dt = new Date(parseInt(list_lin[i]["TransmitTime"].substr(6)));
                        var dte = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear()
                            + ' ' + dt.getHours() + ':' + dt.getMinutes();
                        var speed = toHaily(list_lin[i]["Speed"]);
                        var status = "";
                        if (speed <= 2.5) {
                            status = "Tàu dừng";
                        }
                        else {
                            status = "Tàu chạy";
                        };
                        _tbl +=
                            '<tr id="tr' + list_lin[i]["DeviceID"] + i + '"><td> ' + (i + 1) + '</td ><td>'
                            + dte + '</td><td>' + speed + '</td ><td>' + status + '</td ><td>'
                            + list_lin[i]["Latitude"] + '.' + list_lin[i]["DirectionEW"] + '  '
                            + list_lin[i]["Longitude"] + '.' + list_lin[i]["DirectionSN"]
                            + '</td></tr>';

                    }
                    $("#tbody_bgt_hanhtrinh").html(_tbl);
                }
            }
        },
    }, "json");
}
// danh sách tìm kiếm thiết bị 
function ListDeviceSearch(id_search, list_result) {
    var _id_search, _list_result, filter, tr, td;
    _id_search = document.getElementById(id_search);
    _list_result = document.getElementById(list_result);
    tr = _list_result.getElementsByTagName('tr');
    filter = _id_search.value.toUpperCase();

    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[1];
        if (td.innerText.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
};
// cài đặt định dạng cho ngày theo Short date
function setDate() {
    if (positionView == 0) {
        positionView = 1;
        if (armarker.length > 0) {
            for (var b = 0; b < armarker.length; b++) {
                armarker[b][1].setMap(null);
            }
            if (listdata != null) {
                if (listdata.length > 0) {
                    if (line) line.setMap(null);
                    if (line1) line1.setMap(null);
                    SetupLine(listdata, _CategoryID);
                    drawPointStop(listData_PauseStop);
                }
            }
        }
    }
    var currentdate = new Date();
    var curentMonth = (currentdate.getMonth() + 1) < 10 ? "0" + (currentdate.getMonth() + 1) : (currentdate.getMonth() + 1);
    var curentdate = currentdate.getDate() < 10 ? "0" + currentdate.getDate() : currentdate.getDate();
    var curentHour = currentdate.getHours() < 10 ? "0" + currentdate.getHours() : currentdate.getHours();
    var curentMinute = currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes();
    var curentSecond = currentdate.getSeconds() < 10 ? "0" + currentdate.getSeconds() : currentdate.getSeconds();
    var datetimeF = curentdate + "-" + +curentMonth + "-" + currentdate.getFullYear();

    document.getElementById("date_form_h").value = "00:00";
    document.getElementById("date_form_d").value = datetimeF;
    document.getElementById("date_t_h").value = "23:59";
    document.getElementById("date_t_d").value = datetimeF;
};

// lấy thông tin của người dùng 
// USER
function GetInfo_User() {
    //var obj = document.querySelector('.preloader'), inner = document.querySelector('.preloader_inner'), page = document.querySelector('.main');
    //obj.classList.add('show');
    //page.classList.remove('show');

    $.ajax({
        type: 'GET',
        dataType: "json",
        url: '/Home/UserInfo',
        data: {},
        success: function (data, txtStatus, XMLHttpRequest) {
            console.log(data);
            //var obj = document.querySelector('.preloader'), inner = document.querySelector('.preloader_inner'), page = document.querySelector('.main');
            //obj.classList.add('show');
            //page.classList.remove('show');

            if (data != null) {

                if (data["RoleID"] == 3) {
                    $("#item-taikhoan-them").show()
                    $("#item-taikhoan-sua").show()
                    $("#item-taikhoan-xoa").show()
                    $("#item-taikhoan-status").hide()
                    //GetList_User_Refresh();
                    console.log(1);
                }
                else if (data["RoleID"] == 4) {
                    $("#item-taikhoan-them").hide()
                    $("#item-taikhoan-sua").hide()
                    $("#item-taikhoan-xoa").hide()
                    $("#item-taikhoan-status").show()
                    var _tbody_taikhoan = document.getElementById("tbody_taikhoan");
                    _tbody_taikhoan.innerHTML = "";
                    var _tr = document.createElement("tr");
                    var _td = document.createElement("td");
                    _td.setAttribute("colspan", "9");
                    _td.innerHTML = "Bạn không có quyền xem danh sách tài khoản";
                    _tr.appendChild(_td);
                    _tbody_taikhoan.appendChild(_tr);
                }

                $("#thongtin_nguoitao").val(data["CreateBy"]);
                console.log(2);
                $("#thongtin_taikhoan").val(data["Username"]);
                console.log(3);
                $("#thongtin_tenkhachhang").val(data["FullName"]);
                console.log(4);
                $("#thongtin_sodienthoai").val(data["Phone"]);
                console.log(5);
                $("#thongtin_email").val("");
                console.log(6);
                $("#thongtin_diachi").val(data["Address"]);
                console.log(7);


            } else { alert("Không có dữ liệu thông tin tài khoản"); }

            //obj.classList.remove('show');
            //page.classList.add('show');
        }
    });

};