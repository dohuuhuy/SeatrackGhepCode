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
    }, function (data) {
        console.log(data);
    });
}


var _listDeviceStatus = [];
var _drawingLinePoint = [];
var _infowins = [];
var _drawingMarker = [];
var slider = $("myRange");



slider.oninput = function () { }
function setRange(a) {
    $("#myRange").attr("max", a);
}
function setupMap(lat, lng, mapZoom) {
    var mapLatlng = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: mapZoom,
        center: mapLatlng,
        mapTypeControl: false,
        streetViewControl: false,
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
};
function setDate() {
    cleanMap(0);
    // if (positionView == 0) {
    //   positionView = 1;
    //   if (armarker.length > 0) {
    //     for (var b = 0; b < armarker.length; b++) {
    //       armarker[b][1].setMap(null);
    //     }
    //     if (listdata != null) {
    //       if (listdata.length > 0) {
    //         if (line) line.setMap(null);
    //         if (line1) line1.setMap(null);
    //         SetupLine(listdata, _CategoryID);
    //         drawPointStop(listData_PauseStop);
    //       }
    //     }
    //   }
    // }
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
function win_reload() { window.location.reload(); }
function redirectRoute() { window.location = "/Home/Route"; }
function toHaily(a) { return (Math.round((a * 0.53996) * 10) / 10); }
function clearInfoWin() {
    for (var i = 0; i < _infowins.length; i++) {
        _infowins[i].close();
    }
}
function updateListDeviceStatus() {
    if (_listDeviceStatus.length > 0) { _listDeviceStatus = []; }
    $.ajax({
        type: 'GET',
        url: '/Home/GetListDeviceStatus',
        data: {},
        success: function (data, txtStatus, XMLHttpRequest) {
            _listDeviceStatus = data["Result"].slice();
            for (var i = 0; i < _listDeviceStatus.length; i++) {
                var status = 0;
                var sp = toHaily(_listDeviceStatus[i]["Speed"]);
                if (sp < 3) { sp = 0; status = 2; }
                else { sp = toHaily(_listDeviceStatus[i]["Speed"]); status = 1; }
                var dt = new Date(parseInt(_listDeviceStatus[i]["TransmitTime"].substr(6)));
                var d = new Date();
                if (Math.floor((d - dt) / 1000 / 60) > 45) status = 3;
                _listDeviceStatus[i]["TransmitTime"] = dt;
                _listDeviceStatus[i]["Speed"] = sp;
                _listDeviceStatus[i]["Status"] = status;
            }
            setup_DataTable();
        }
    }, "json");
}
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
    if (_infowins.length > 0) {
        for (j = 0; j < _infowins.length; j++) {
            _infowins[j].close();
        }
        if (a == 0) _infowins = [];
    }
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
    cleanMap(1);
    var i = 0;
    var lasted;
    var _device;
    _device = checkDevice(id);
    if (icon == "") icon = "/Content/images/tau/" + _stt_[_device.Status]["polycon"];
    if (_device != 0) {
        point = new window.google.maps.LatLng(_device.Latitude, _device.Longitude);

        marker = new google.maps.Marker({
            position: point,
            icon: icon,
        });
        var infowin = new google.maps.InfoWindow({
            content: 'Đang cập nhật dữ liệu!',
        });

        infowin.setContent(getInfoWindow(_device));
        google.maps.event.addListener(marker, 'click', function () {
            clearInfoWin();
            infowin.open(map, marker);
        });
        _infowins.push(infowin);
        map.panTo(point);
        map.setZoom(13);
        _armarker.push(marker);
        marker.setMap(map);
    }
    else alert("Chưa có dữ liệu, vui lòng thử lại sau");
}
function makeListStop() {
    for (var i = 0; i < _drawingLinePoint.length; i++) {
        var status = 0;
        var sp = toHaily(_drawingLinePoint[i]["Speed"]);
        if (sp < 3) { sp = 0; status = 2; }
        else { sp = toHaily(_drawingLinePoint[i]["Speed"]); status = 1; }
        var dt = new Date(parseInt(_drawingLinePoint[i]["TransmitTime"].substr(6)));
        if (i >= 1) {
            var d = _drawingLinePoint[i - 1]["TransmitTime"];
            if (Math.floor((dt - d) / 1000 / 60) > 45) status = 3;
        }
        _drawingLinePoint[i]["TransmitTime"] = dt;
        _drawingLinePoint[i]["Speed"] = sp;
        _drawingLinePoint[i]["Status"] = status;
    }
    var te = new Date();
    var il = Math.floor((te - _drawingLinePoint[_drawingLinePoint.length - 1]["TransmitTime"]) / 1000 / 60);
    if (il > 45) { _drawingLinePoint[_drawingLinePoint.length - 1]["Status"] = 3; }
}
function setdrawingLinePoint(a = 0) {
    var id = $("#list_xelotrinh").val();
    var from = $("#date_form_d").val() + " " + $("#date_form_h").val();
    var to = $("#date_t_d").val() + " " + $("#date_t_h").val();

    $.ajax({
        type: 'GET',
        url: '/Home/GetRoadmapByDateTime',
        data: { deviceID: id, From: from, To: to },
        success: function (data, txtStatus, XMLHttpRequest) {
            _drawingLinePoint = data.Result;
            console.log(_drawingLinePoint.length);
            if (_drawingLinePoint == null) {
                alert("Chưa có dữ liệu cho phạm vi thời gian đã chọn");
            } else {
                makeListStop();
                drawingLinePoint(id, a);
                if (_drawingLinePoint.length > 0) {
                    ShowTableDataLine();
                }

            }
        },
    }, "json");
}
function drawingLinePoint(id, a = 0) {
    cleanMap(0);
    var flightPath = new google.maps.Polyline({
        path: reListStop(),
        geodesic: true,
        strokeColor: '#14a84e',
        strokeOpacity: 1.0,
        strokeWeight: 1.3
    });
    flightPath.setMap(map);
    _flightPath.push(flightPath);
    var i = 0;
    for (i; i < _drawingLinePoint.length - 1; i++) {
        var point = new google.maps.LatLng(_drawingLinePoint[i]["Latitude"], _drawingLinePoint[i]["Longitude"]);
        var angle = TinhGoc(_drawingLinePoint[i]["Latitude"], _drawingLinePoint[i]["Longitude"], _drawingLinePoint[i + 1]["Latitude"], _drawingLinePoint[i + 1]["Longitude"]);
        var color = _stt_[_drawingLinePoint[i]["Status"]]["color"];
        var marker;
        marker = new google.maps.Marker({
            position: point,
            visible: !(_drawingLinePoint[i]["Status"] == 2 && _drawingLinePoint[i + 1]["Status"] == 2),
            //icon: "/Content/public/img/icon/marker_ef.png",//labelContent: i + " lat: " + listStop[i].lat,
            icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 1.3,
                rotation: angle,
                strokeColor: color
            }
        });

        marker.setMap(map);

        content_ =
            '<div class="">Tọa độ: '
            + _drawingLinePoint[i].Latitude + ' - '
            + _drawingLinePoint[i].Longitude + '<br/> ' + 'Thời gian: '
            + _drawingLinePoint[i].TransmitTime + '<br/> ' + 'Trạng thái: '
            + _stt_[_drawingLinePoint[i].Status].name + '<br/> ' + 'Vận tốc: '
            + _drawingLinePoint[i].speed + ' Hải lý/Giờ' +
            '</div>';
        content_ = getInfoWindow(_drawingLinePoint[i]);
        attachInforwindows(marker, content_);
    }
    //var markerCluster = new MarkerClusterer(map, _drawingMarker,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    //var markerCluster = new MarkerClusterer(map, _drawingMarker,{imagePath: 'https://test.gpsvin.vn/Content/images/tau/tau-den'});

    _device = checkDevice(id);
    var point = new google.maps.LatLng(_drawingLinePoint[_drawingLinePoint.length - 1].Latitude, _drawingLinePoint[_drawingLinePoint.length - 1].Longitude);
    var marker = new google.maps.Marker({
        position: point,
        icon: "/Content/images/tau/" + _stt_[_drawingLinePoint[_drawingLinePoint.length - 1]["Status"]]["polycon"],
    });
    marker.setMap(map);
    var infowin = new google.maps.InfoWindow({
        content: 'Đang cập nhật dữ liệu!',
    });
    content_ = getInfoWindow(_device);
    attachInforwindows(marker, content_);

    if (a == 1) {
        map.panTo(point);
        map.setZoom(13);
    }
}
function reListStop() {
    var re = [];
    for (var i = 0; i < _drawingLinePoint.length; i++) {
        re[i] = { lat: _drawingLinePoint[i].Latitude, lng: _drawingLinePoint[i].Longitude };
    }
    return re;
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
function getInfoWindow(_dv) {
    var strStatus = '';

    var dte = _dv["TransmitTime"].getDate() + '/' + (_dv["TransmitTime"].getMonth() + 1) + '/' + _dv["TransmitTime"].getFullYear()
        + ' ' + _dv["TransmitTime"].getHours() + ':' + _dv["TransmitTime"].getMinutes();

    strStatus += '<div class="">';
    if (_dv["DeviceName"] != null)
        strStatus += 'Tên thiết bị: <b>' + _dv["DeviceName"] + '</b><br>';

    strStatus += 'Thời gian: <b>' + dte + '</b><br>'
        + 'Trạng thái: <b>' + _stt_[_dv["Status"]]["name"] + '</b><br>'
        + 'Toạ độ: <b>' + _dv["Latitude"] + ' (' + _dv["DirectionSN"]
        + ')</b> - <b>' + _dv["Longitude"] + ' (' + _dv["DirectionEW"] + ')</b><br>'
        + 'Tốc độ: <b>' + _dv["Speed"] + '</b> Hải lý / giờ <br>' + '</div>';

    return strStatus;
}
function ShowTableDataLine() {
    var _tbl = "";
    for (var i = 0; i < _drawingLinePoint.length; i++) {
        var dte = _drawingLinePoint[i]["TransmitTime"].getDate() + '/' + (_drawingLinePoint[i]["TransmitTime"].getMonth() + 1) + '/'
            + _drawingLinePoint[i]["TransmitTime"].getFullYear() + ' ' + _drawingLinePoint[i]["TransmitTime"].getHours() + ':'
            + _drawingLinePoint[i]["TransmitTime"].getMinutes();

        _tbl +=
            '<tr class="s-left-holight" onclick="nhaytoday(' + i + ')" id="tr' + _drawingLinePoint[i]["DeviceID"] + i + '">' +
            '<td>' + _drawingLinePoint[i]["Latitude"] + ' - '
            + _drawingLinePoint[i]["Longitude"] + '</td>' +
            '<td>' + _drawingLinePoint[i]["Speed"] + '</td >' +
            '<td>' + dte + '</td>' +
            '</tr > ';
    }
    $("#tblbodydataline").html(_tbl);
}
function nhaytoday(i) {
    clearInfoWin();
    var b = new google.maps.LatLng(_drawingLinePoint[i].Latitude, _drawingLinePoint[i].Longitude);
    map.panTo(b);
    _infowins[i].open(map, _armarker[i]);
}
function TinhGoc(lat1, long1, lat2, long2) {
    var dLon = (long2 - long1);
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    var brng = Math.atan2(y, x);

    brng = brng * (180 / Math.PI);
    brng = (brng + 360) % 360;
    brng = 360 - brng;

    return brng;
}
function interval_draw() {
    if (_interval != null) clearInterval(_interval);
    _interval = setInterval(function () { setdrawingLinePoint() }, 120000);
}
function setup_DataTable() {
    //if(_listDeviceStatus.length <= 0) updateListDeviceStatus();
    var _tb = "";
    for (var i = 0; i < _listDeviceStatus.length; i++) {

        var dte = _listDeviceStatus[i]["TransmitTime"].getDate() + '/' + (_listDeviceStatus[i]["TransmitTime"].getMonth() + 1) + '/'
            + _listDeviceStatus[i]["TransmitTime"].getFullYear() + ' ' + _listDeviceStatus[i]["TransmitTime"].getHours() + ':'
            + _listDeviceStatus[i]["TransmitTime"].getMinutes();

        _tb += '<tr id="tr' + _listDeviceStatus[i]["DeviceID"]
            + '" classname="groupXe" onclick="makePoint(' + _listDeviceStatus[i]["DeviceID"]
            + ');" data-toggle="" data-placement="right" data-html="true" class="tr_hover_select">'
            + '<td class="alignCenter">'
            + (i + 1) + '</td><td>'
            + '<img src="/Content/public/img/tau/' + _stt_[_listDeviceStatus[i]["Status"]]["menucon"] + '">  '
            + _listDeviceStatus[i]["DeviceName"]
            + '</td><td>' + _listDeviceStatus[i]["Speed"]
            + '</td><td>' + dte + '</td><td>'
            + _listDeviceStatus[i]["Latitude"] + "." + _listDeviceStatus[i]["DirectionSN"] + " - "
            + _listDeviceStatus[i]["Longitude"] + "." + _listDeviceStatus[i]["DirectionEW"]
            + '</td></tr>';
    }
    $("#tblbodydata").html(_tb);
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
function ListDeviceSearch(id_search, list_result) {
    var _id_search,
        _list_result,
        filter, tr, td;

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
}

var lineSymbol = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: '#005db5',
    strokeWidth: '#005db5'
};
var drawLineInterval;
function liveshowLo() {
    animateCircle(_flightPath[0]);
}

$("#myRange").change(function () {
    var kin = $("#myRange");
    if (_flightPath.length > 0) {
        animateCir(_flightPath[0], kin.val());
    }
});
function animateCircle(polyline) {
    var count = 0;
    var defaultIcon = [
        {
            icon: lineSymbol,
            offset: '100%'
        }];
    drawLineInterval = window.setInterval(runany, 20);
    function runany() {
        if (count >= 199) clearInterval(drawLineInterval);
        else {
            count = (count + 1) % 200;
            var icons = defaultIcon;
            icons[0].offset = (count / 2) + '%';
            polyline.set('icons', icons);
        }
    }
}
function animateCir(polyline, pl) {
    var defaultIcon = [
        {
            icon: lineSymbol,
            offset: '100%'
        }];
    var icons = defaultIcon;
    icons[0].offset = (pl / 2) + '%';
    polyline.set('icons', icons);
}
function animateC(polyline) {
    var count = 0;
    var defaultIcon = [
        {
            icon: lineSymbol,
            offset: '100%'
        }];

    drawLineInterval = window.setInterval(function () {
        count = (count + 1) % 200;
        var icons = defaultIcon;
        icons[0].offset = (count / 2) + '%';
        polyline.set('icons', icons);
    }, 20);
}






$(document).ready(function () {
    setupMap(_def_Lat, _def_Lng, _def_zoom);
    updateListDeviceStatus();
    setup_selectDataLine();
});