function clearInfoWin() {
    for (var i = 0; i < _infowins.length; i++) {
        _infowins[i].close();
    }
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function () {
    output.innerHTML = this.value;
}

function setRange(a) {
    $("#myRange").attr("max", a);
}
function loadSpeedLimit() {
    var pathValues = [];

    var a = new google.maps.LatLng(10.834650, 106.667149);
    var b = new google.maps.LatLng(10.833454, 106.670258);
    var c = new google.maps.LatLng(10.832250, 106.673723);

    pathValues.push(a.toUrlValue());
    pathValues.push(b.toUrlValue());
    pathValues.push(c.toUrlValue());
    $.get("https://roads.googleapis.com/v1/speedLimits", {
        //key: "AIzaSyARovOsZKZ1v0BQwAtcmoCNjT39z15exuI",
        key: "AIzaSyADYWIGFSnn3DHlJblK0hntz5KQiwbD0hk",
        path: pathValues.join('|'),
    },
        function (data) {
            console.log(data);
        });
}

var _listDeviceStatus = [];
updateListDeviceStatus();
setInterval(function () { updateListDeviceStatus(); }, 30000);
function win_reload() {
    window.location.reload();
}
function redirectRoute() {
    window.location = "/Home/Route";
}

function toHaily(a) {
    return (Math.round((a * 0.53996) * 10) / 10);
}
function updateListDeviceStatus() {
    _listDeviceStatus = [];
    $.ajax({
        type: 'GET',
        url: '/Home/GetListDeviceStatus',
        data: {},
        success: function (data, txtStatus, XMLHttpRequest) {
            _listDeviceStatus = data.Result;
        }
    }, "json");
}
function attachInforwindows(marker, string_) {
    var infowin = new google.maps.InfoWindow({
        content: 'Đang cập nhật dữ liệu!',
    });
    infowin.setContent(string_);
    marker.addListener('click', function () {
        clearInfoWin();
        infowin.open(map, marker);
    });

    _armarker.push(marker);
    _infowins.push(infowin);
}
function getInfoWindow(_dv) { // hiển thị table thông tin tại tọa độ hiện tại của tàu
    var strStatus = '';

    var dt = new Date(parseInt(_dv.TransmitTime.substr(6)));

    var dte = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear()
        + ' ' + dt.getHours() + ':' + dt.getMinutes();

    strStatus += 'Tên thiết bị: <b>' + _dv.DeviceName + '</b><br>'
        + 'Thời gian: <b>' + dte + '</b><br>';

    strStatus += 'Trạng thái: <b>' + status + '</b><br>';

    strStatus += 'Toạ độ: <b>' + _dv.Latitude
        + ' (' + _dv.DirectionSN + ')</b> - <b>'
        + _dv.Longitude + ' (' + _dv.DirectionEW + ')</b><br>';

    strStatus += 'Tốc độ: <b>' + toHaily(_dv.Speed) + '</b> Hải lý / giờ <br>';

    return strStatus;
}


function newPointToLine(point) {
    var path = flightPath.getPath();
    path.push(point);
    flightPath.setPath(path);

    var markerLB = new MarkerWithLabel({
        position: point,
        icon: "/Content/public/img/icon/marker_ex.png",
        map: map
    });
}

function checkDevice(id) {
    i = 0;
    while (i < _listDeviceStatus.length) {
        if (_listDeviceStatus[i].DeviceID == id)
            return _listDeviceStatus[i];
        i++;
    }
    return 0;
}
function makePoint(id, icon = "") {
    if (icon == "") icon = "/Content/public/img/icon/marker_ex.png";
    cleanMap(1);
    var i = 0;
    var lasted;
    var _device;
    _device = checkDevice(id);
    console.log(_device);
    if (_device != 0) {
        point = new window.google.maps.LatLng(_device.Latitude, _device.Longitude);

        marker = new MarkerWithLabel({
            position: point,
            icon: "/Content/public/img/icon/marker_ex.png",
        });
        var infowin = new google.maps.InfoWindow({
            content: 'Đang cập nhật dữ liệu!',
        });

        infowin.setContent('<div class="">' + getInfoWindow(_device) + '</div>');
        google.maps.event.addListener(marker, 'click', function () {
            clearInfoWin();
            infowin.open(map, marker);
        });
        _infowins.push(infowin);
        map.panTo(point);
        map.setZoom(12);
        _armarker.push(marker);
        marker.setMap(map);
    }
    else alert("Chưa có dữ liệu, vui lòng thử lại sau");
}
function makeListStop(list) {
    var re = [];
    for (var i = 0; i < list.length; i++) {
        var status = '';
        var sp = toHaily(list[i].Speed);
        if (sp < 3) { sp = 0; status = 'Tàu dừng' }
        else { sp = toHaily(list[i].Speed); status = 'Tàu chạy' }
        var dt = new Date(parseInt(list[i].TransmitTime.substr(6)));
        var dte = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear()
            + ' ' + dt.getHours() + ':' + dt.getMinutes();

        re[i] = { lat: list[i].Latitude, lng: list[i].Longitude, time: dte, speed: sp, status: status };
    }
    return re;
}
var list_lin = [];
function setdrawingLinePoint(a = 0) { // hiển thị thông tin tại điểm hiển tại của tàu 
    var id = $("#list_xelotrinh").val();
    var from = $("#date_form_d").val() + " " + $("#date_form_h").val();
    var to = $("#date_t_d").val() + " " + $("#date_t_h").val();

    var list = [];
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

                var listStop = makeListStop(list_lin);
                drawingLinePoint(listStop, id, a, list_lin);

                if (list_lin.length > 0) {
                    var speed = toHaily(list_lin[0]["Speed"]);
                    var k = 0; var i = 0; var status = true;
                    //  if (speed <= 3) status = false; else status = true;
                    while (i < list_lin.length) {
                        speed = toHaily(list_lin[i]["Speed"]);
                        if (status) {
                            if (speed < 3) {

                                status = false;
                                list.push(list_lin[i])
                                i++;
                            } else {
                                list.push(list_lin[i])
                                i++;
                            }
                        }
                        else {
                            if (speed > 3) {
                                status = true;
                                list.push(list_lin[i])
                                i++;
                            }
                            else {
                                i++;
                            }
                        }

                    }
                    ShowTableDataLine(list);
                }

            }
        },
    }, "json");
}
function nhaytoday(i) {
    clearInfoWin();
    var b = new google.maps.LatLng(list_lin[i].Latitude, list_lin[i].Longitude);
    map.panTo(b);
    _infowins[i].open(map, _armarker[i]);
}
function ShowTableDataLine(list_lin) {

    var _tbl = "";
    for (var i = 0; i < list_lin.length; i++) {
        console.log('demo ' + list_lin[i])
        var dt = new Date(parseInt(list_lin[i]["TransmitTime"].substr(6)));
        var dte = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear()
            + ' ' + dt.getHours() + ':' + dt.getMinutes();
        var vantoc = toHaily(list_lin[i]["Speed"]);
        var speed = 0;
        if (vantoc < 3) {
            speed = 0
        }
        else {
            speed = toHaily(list_lin[i]["Speed"]);
        }
        _tbl +=
            '<tr onclick="nhaytoday(' + i + ')" id="tr' + list_lin[i]["DeviceID"] + i + '">' +
            '<td>' + list_lin[i]["Latitude"] + '.' + list_lin[i]["DirectionEW"] + '  '
            + list_lin[i]["Longitude"] + '.' + list_lin[i]["DirectionSN"] + '</td>' +
            '<td>' + speed + '</td >' +
            '<td>' + dte + '</td>' +
            '</tr > ';
    }
    $("#tblbodydataline").html(_tbl);
}
function drawingLinePoint(listStop, id, a) { // gọi tới setdrawingLinePoint tạo ra listStop 
    cleanMap(0);
    var flightPath = new google.maps.Polyline({
        path: listStop,
        geodesic: true,
        strokeColor: '#14a84e',
        strokeOpacity: 1.0,
        strokeWeight: 1
    });
    flightPath.setMap(map);
    _flightPath.push(flightPath);
    var iml = listStop.length - 1;
    var i = 0;
    for (i; i < iml; i++) {
        var point = new google.maps.LatLng(listStop[i].lat, listStop[i].lng);
        var marker = new MarkerWithLabel({
            position: point,
            icon: "/Content/public/img/icon/marker_ef.png",
            //labelContent: i + " lat: " + listStop[i].lat,
        });
        marker.setMap(map);

        var content_ =
            '<div class="">Tọa độ: '
            + listStop[i].lat + ' - '
            + listStop[i].lng + '<br/> ' + 'Thời gian: '
            + listStop[i].time + '<br/> ' + 'Trạng thái: '
            + listStop[i].status + '<br/> ' + 'Vận tốc: '
            + listStop[i].speed + ' Hải lý/Giờ' +
            '</div>';
        attachInforwindows(marker, content_);

    }

    _device = checkDevice(id);
    var point = new google.maps.LatLng(listStop[iml].lat, listStop[iml].lng);
    var marker = new MarkerWithLabel({
        position: point,
        icon: "/Content/public/img/icon/marker_ex.png",
    });
    marker.setMap(map);
    var infowin = new google.maps.InfoWindow({
        content: 'Đang cập nhật dữ liệu!',
    });
    infowin.setContent('<div class="">' + getInfoWindow(_device) + '</div>');
    marker.addListener('click', function () {
        clearInfoWin();
        infowin.open(map, marker);
    });
    _armarker.push(marker);
    _infowins.push(infowin);

    if (a == 1) {
        map.panTo(point);
        map.setZoom(12);
    }

    console.log("Again");

}
function interval_draw() {
    if (_interval != null) clearInterval(_interval);
    _interval = setInterval(function () { setdrawingLinePoint() }, 120000);
}
function setup_DataTable() {
    var dad = [];
    $.ajax({
        type: 'GET',
        url: '/Home/GetListDeviceStatus',
        data: {},
        success: function (data, txtStatus, XMLHttpRequest) {
            dad = data.Result;
            //console.log(data);
            if (dad.length > 0) {

                var _tb = "";
                for (var i = 0; i < dad.length; i++) {
                    var dt = new Date(parseInt(dad[i]["TransmitTime"].substr(6)));
                    var dte = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear()
                        + ' ' + dt.getHours() + ':' + dt.getMinutes();
                    var today = new Date();
                    var phut = Math.floor((today - dt) / 1000 * 60);


                    var pic = 2;
                    if (speed > 3) {
                        pic = 1;
                    }
                    if (phut > 45) {
                        pic = 3;
                    }
                    _tb += '<tr id="tr' + dad[i]["DeviceID"]
                        + '" classname="groupXe" onclick="makePoint(' + dad[i]["DeviceID"]
                        + ');" data-toggle="" data-placement="right" data-html="true" class="tr_hover_select">'
                        + '<td class="alignCenter">'
                        + (i + 1) + '</td><td>'
                        + '<img src="/Content/public/img/tau/' + _stt_cmd2[pic]["img"] + '">  '
                        + dad[i]["DeviceName"]
                        + '</td><td>' + toHaily(dad[i]["Speed"])
                        + '</td><td>' + dte + '</td><td>'
                        + dad[i]["Latitude"] + "." + dad[i]["DirectionSN"] + " - "
                        + dad[i]["Longitude"] + "." + dad[i]["DirectionEW"]
                        + '</td></tr>';
                }
                $("#tblbodydata").html(_tb);
            }
        }
    }, "json");

}
function setup_selectDataLine() {
    var dad = [];
    $.ajax({
        type: 'GET',
        url: '/Home/GetListDeviceStatus',
        data: {},
        success: function (data, txtStatus, XMLHttpRequest) {
            dad = data.Result;
            if (dad.length > 0) {
                //var _tb = '<option value="0">Tất cả</option>';
                var _tb = '';
                for (var i = 0; i < dad.length; i++) {
                    _tb += '<option value="' + dad[i]["DeviceID"] + '">' + dad[i]["DeviceName"] + '</option>';
                }
                $("#list_xelotrinh").append(_tb);
            }
        }
    });
}
function setupMap(lat, lng, mapZoom) {
    var mapLatlng = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: mapZoom,
        center: mapLatlng,
        mapTypeControl: false,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        fullscreenControl: false,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    var styles = {
        default: null,
        night: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }]
            }
        ],
    };

    var styleSelector = document.getElementById('style-selector');
    map.setOptions({
        styles: styles[styleSelector.value]
    });

    styleSelector.addEventListener('change', function () {
        if (styleSelector.value === "satellite") { map.setMapTypeId('hybrid'); }
        else {
            map.setMapTypeId('roadmap');
            map.setOptions({ styles: styles[styleSelector.value] });
        }
    });
};
function cleanMap(a = 0) {
    if (a == 1) {
        clearInterval(_interval);
    }
    if (_armarker.length > 0) {
        for (i = 0; i < _armarker.length; i++) {
            _armarker[i].setMap(null);
        }
        if (a == 0) _armarker = [];
    }
    if (_flightPath.length > 0) {
        for (j = 0; j < _flightPath.length; j++) {
            _flightPath[j].setMap(null);
        }
        if (a == 0) _flightPath = [];
    }

}
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
    // var datetimeF = currentdate.getFullYear() + "-" + curentMonth + "-" + curentdate + "T00:" + "00:00";
    //var datetimeF = currentdate.getFullYear() + "-" + curentMonth + "-" + curentdate;
    // var datetimeE = currentdate.getFullYear() + "-" + curentMonth + "-" + curentdate + "T" + curentHour + ":" + curentMinute + ":" + curentSecond;

    document.getElementById("date_form_h").value = "00:00";
    document.getElementById("date_form_d").value = datetimeF;
    document.getElementById("date_t_h").value = "23:59";
    document.getElementById("date_t_d").value = datetimeF;
};

