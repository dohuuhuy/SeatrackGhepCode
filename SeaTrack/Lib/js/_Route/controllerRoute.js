function hide(n) {
    document.getElementById(n).style.display = "none";
}


function fetchdata() {
    //win_reload();
    updateListDeviceStatus();
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
    }, function (data) {
        console.log(data);
    });
}

bo = [
    {
        lat: 23.280141,
        lng: 105.347008
    },
    {
        lat: 21.532631301291076,
        lng: 108.05561492727831
    },
    {
        lat: 21.20972222,
        lng: 108.2086
    },
    {
        lat: 20.71888889,
        lng: 107.4561
    },
    {
        lat: 20.614444,
        lng: 107.206944
    },
    {
        lat: 19.3475,
        lng: 105.93388889
    },
    {
        lat: 18.79277778,
        lng: 105.99638889
    },
    {
        lat: 17.91388889,
        lng: 106.67250000
    },
    {
        lat: 17.16083333,
        lng: 107.34305556
    },
    {
        lat: 15.37777778,
        lng: 109.13972222
    },
    {
        lat: 12.65500000,
        lng: 109.56944444
    },
    {
        lat: 11.14972222,
        lng: 109.15722222
    },
    {
        lat: 10.01055556,
        lng: 106.97888889
    },
    {
        lat: 9.35750000,
        lng: 106.67194444
    },
    {
        lat: 8.97416667,
        lng: 105.74805556
    },
    {
        lat: 8.41805556,
        lng: 105.24027778
    },
    {
        lat: 8.40888889,
        lng: 104.53694444
    },
    {
        lat: 10.00000000,
        lng: 104.53666667
    },
    {
        lat: 10,
        lng: 104.00500000
    },
    {
        lat: 10.1538,
        lng: 103.9352
    },
    {
        lat: 10.2177,
        lng: 103.9234
    },
    {
        lat: 10.2420,
        lng: 103.9131
    },
    {
        lat: 10.2612,
        lng: 103.9009
    },
    {
        lat: 10.2908,
        lng: 103.8266
    },
    {
        lat: 10.3837,
        lng: 103.8051
    },
    {
        lat: 10.40201,
        lng: 103.83776
    },
    {
        lat: 10.3902,
        lng: 103.9143
    },
    {
        lat: 10.43034,
        lng: 103.92653
    },
    {
        lat: 10.4439,
        lng: 103.9426
    },
    {
        lat: 10.4799,
        lng: 103.9715
    },
    {
        lat: 10.4804,
        lng: 104.0112
    },
    {
        lat: 10.4206,
        lng: 104.0885
    },
    {
        lat: 10.3835,
        lng: 104.1107
    },
    {
        lat: 10.34014,
        lng: 104.11135
    },
    {
        lat: 10.30778,
        lng: 104.11968
    },
    {
        lat: 10.28570,
        lng: 104.11782
    },
    {
        lat: 10.25693,
        lng: 104.12397
    },
    {
        lat: 10.23190,
        lng: 104.12436
    },
    {
        lat: 10.421051,
        lng: 104.438897
    }];
long = [
    {
        lat: 23.280141,
        lng: 105.347008
    },
    {
        lat: 21.532631301291076,
        lng: 108.05561492727831
    },
    {
        lat: 21.209722,
        lng: 108.208611
    },
    {
        lat: 20.803333,
        lng: 108.294444
    },
    {
        lat: 20.000000,
        lng: 107.128056
    },
    {
        lat: 19.551944,
        lng: 106.621389
    },
    {
        lat: 18.666667,
        lng: 106.621389
    },
    {
        lat: 18.316111,
        lng: 106.885556
    },
    {
        lat: 18,
        lng: 107.031944
    },
    {
        lat: 17.393889,
        lng: 107.580000
    },
    {
        lat: 15.621111,
        lng: 109.624444
    },
    {
        lat: 12.614444,
        lng: 110.089722
    },
    {
        lat: 10.776667,
        lng: 109.576111
    },
    {
        lat: 9.603611,
        lng: 107.351667
    },
    {
        lat: 8.968611,
        lng: 107.046944
    },
    {
        lat: 8.553333,
        lng: 106.046389
    },
    {
        lat: 7.918333,
        lng: 105.466111
    },
    {
        lat: 7.898889,
        lng: 104.033056
    },
    {
        lat: 9.500000,
        lng: 104.030556
    },
    {
        lat: 9.5,
        lng: 103.694444
    },
    {
        lat: 9.993333,
        lng: 103.424444
    },
    {
        lat: 10.1538,
        lng: 103.9352
    },
    {
        lat: 10.2177,
        lng: 103.9234
    },
    {
        lat: 10.2420,
        lng: 103.9131
    },
    {
        lat: 10.2612,
        lng: 103.9009
    },
    {
        lat: 10.2908,
        lng: 103.8266
    },
    {
        lat: 10.3837,
        lng: 103.8051
    },
    {
        lat: 10.40201,
        lng: 103.83776
    },
    {
        lat: 10.3902,
        lng: 103.9143
    },
    {
        lat: 10.43034,
        lng: 103.92653
    },
    {
        lat: 10.4439,
        lng: 103.9426
    },
    {
        lat: 10.4799,
        lng: 103.9715
    },
    {
        lat: 10.4804,
        lng: 104.0112
    },
    {
        lat: 10.4206,
        lng: 104.0885
    },
    {
        lat: 10.3835,
        lng: 104.1107
    },
    {
        lat: 10.34014,
        lng: 104.11135
    },
    {
        lat: 10.30778,
        lng: 104.11968
    },
    {
        lat: 10.28570,
        lng: 104.11782
    },
    {
        lat: 10.25693,
        lng: 104.12397
    },
    {
        lat: 10.23190,
        lng: 104.12436
    },
    {
        lat: 10.421051,
        lng: 104.438897
    }];
//bờ: 2-19
//lộng:4-21
var bolong = [];
var vungbo;
var vungbolong;
var vunglong;


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
function checkDevice(id, n) {
    i = 0;
    if (n == 1) {
        while (i < _listDeviceStatus.length) {
            if (_listDeviceStatus[i].DeviceID == id) {
                return _listDeviceStatus[i];
            }
            i++;
        }
    }
    if (n == 2) {
        return _listSOS[id];
    }
    return 0;
}
function makePoint(id, n) {
    cleanMap(1);
    var i = 0;
    var lasted;
    var _device;
    _device = checkDevice(id, n);
    if (n == 1) {
        icon = "/Content/images/tau/" + _stt_[_device.Status]["polycon"];
        if (_device != 0) {
            point = new window.google.maps.LatLng(_device.Latitude, _device.Longitude);
            marker = new google.maps.Marker({
                position: point,
                icon: icon,
            });
            var infowin = new google.maps.InfoWindow({
                content: 'Đang cập nhật dữ liệu!',
            });
            infowin.setContent(getInfoWindow(_device, 1));
            google.maps.event.addListener(marker, 'click', function () {
                clearInfoWin();
                infowin.open(map, marker);
            });
            _infowins.push(infowin);
            map.panTo(point);
            map.setZoom(10);
            _armarker.push(marker);
            marker.setMap(map);
        }
    }
    if (n == 2) {
        icon = "/Content/images/tau/tau-do.png";
        if (_device != 0) {
            point = new window.google.maps.LatLng(_device.Latitude, _device.Longitude);
            map.panTo(point);
            map.setZoom(6);
        }
    }
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
    runWaiting();
    var id = $("#list_xelotrinh").val();
    var from = $("#date_form_d").val() + " " + $("#date_form_h").val();
    var to = $("#date_t_d").val() + " " + $("#date_t_h").val();
    var dfg = new Date(to);
    console.log(to);

    $.ajax({
        type: 'GET',
        url: '/Home/GetRoadmapByDateTime',
        data: { deviceID: id, From: from, To: to },
        success: function (data, txtStatus, XMLHttpRequest) {
            var u = checkDevice(id,1).DeviceName;
            _drawingLinePoint = data.Result;
            _drawingLinePoint.forEach(t => { t.DeviceName = u;});
            //console.log(_drawingLinePoint.length);
            if (_drawingLinePoint == null) {
                alert("Chưa có dữ liệu cho phạm vi thời gian đã chọn");
            } else {
                makeListStop();
                drawingLinePoint(id, a);
                if (_drawingLinePoint.length > 0) {
                    ShowTableDataLine();
                }

            }
            downWaiting();
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
            '<div class="">'
            + 'Tên thiết bị: ' + _drawingLinePoint["dvn"]
            + 'Tọa độ: '
            + _drawingLinePoint[i].Latitude + ' - '
            + _drawingLinePoint[i].Longitude + '<br/> ' + 'Thời gian: '
            + _drawingLinePoint[i].TransmitTime + '<br/> ' + 'Trạng thái: '
            + _stt_[_drawingLinePoint[i].Status].name + '<br/> ' + 'Vận tốc: '
            + _drawingLinePoint[i].speed + ' Hải lý/Giờ' +
            '</div>';
        content_ = getInfoWindow(_drawingLinePoint[i], 1);
        attachInforwindows(marker, content_);
    }
    //var markerCluster = new MarkerClusterer(map, _drawingMarker,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    //var markerCluster = new MarkerClusterer(map, _drawingMarker,{imagePath: 'https://test.gpsvin.vn/Content/images/tau/tau-den'});

    _device = checkDevice(id, 1);
    var point = new google.maps.LatLng(_drawingLinePoint[_drawingLinePoint.length - 1].Latitude, _drawingLinePoint[_drawingLinePoint.length - 1].Longitude);
    var marker = new google.maps.Marker({
        position: point,
        icon: "/Content/images/tau/" + _stt_[_drawingLinePoint[_drawingLinePoint.length - 1]["Status"]]["polycon"],
    });
    marker.setMap(map);
    var infowin = new google.maps.InfoWindow({
        content: 'Đang cập nhật dữ liệu!',
    });
    if (a == 1) {
        content_ = getInfoWindow(_device, 1);
        attachInforwindows(marker, content_);
        map.panTo(point);
        map.setZoom(13);
    }
    if (a == 2) {
        content_ = getInfoWindow(_device, 2);
        attachInforwindows(marker, content_);
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
function getInfoWindow(_dv, n) {
    if (n == 1) {
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
    if (n == 2) {
        var strStatus = '';
        var time = new Date(parseInt(_dv["DateRequest"].substr(6)));
        var dte = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear()
            + ' ' + time.getHours() + ':' + time.getMinutes();

        strStatus += '<div class="">';
        if (_dv["DeviceName"] != null)
            strStatus += 'Tên thiết bị: <b>' + _dv["DeviceName"] + '</b><br>';

        strStatus += 'Thời gian: <b>' + dte + '</b><br>'
            + 'Trạng thái: <b>' + _stt_[_dv["Status"]]["name"] + '</b><br>'
            + 'Toạ độ: <b>' + _dv["Latitude"] + ' (' + _dv["DirectionSN"]
            + ')</b> - <b>' + _dv["Longitude"] + ' (' + _dv["DirectionEW"] + ')</b><br>'
            + '</div>';
        return strStatus;

    }
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
function SOS() {
    for (var i = 0; i < _arSOSMarker.length; i++) {
        _arSOSMarker[i].setMap(null);
    }
    // for(var i = 0; i < markerSOS.length; I++){
    //     markerSOS[i].setMap(null);
    // }
    _arSOSMarker = [];
    $.ajax({
        type: 'GET',
        url: '/SOS/GetSOS',
        data: {},
        success: function (data, txtStatus, XMLHttpRequest) {
            _listSOS = data;
            //console.log(_listSOS);
            var _tb = "";
            if (_listSOS == null) {
                document.getElementById("SOS").style.display = "none";
            }
            for (var i = 0; i < _listSOS.length; i++) {
                var p = new google.maps.LatLng(_listSOS[i]["Latitude"], _listSOS[i]["Longitude"]);

                var marker = new google.maps.Marker({
                    position: p,
                    icon: "/Content/images/tau/tau-do.png",
                });


                var SOSInfo = new google.maps.InfoWindow({
                    content: 'Đang cập nhật dữ liệu!',
                });

                SOSInfo.setContent(getInfoWindow(_listSOS[i], 2));

                marker.addListener('click', function () {
                    //clearInfoWin();
                    console.log(SOSInfo);
                    console.log(marker);
                    SOSInfo.open(map, marker);
                });
                marker.setMap(map);
                _SOSInfo.push(SOSInfo);
                _arSOSMarker.push(marker);

                var date = new Date(parseInt(_listSOS[i]["DateRequest"].substr(6)));
                //console.log(date);
                var dte = date.getDate() + '/' + (date.getMonth() + 1) + '/'
                    + date.getFullYear() + ' ' + date.getHours() + ':'
                    + date.getMinutes();

                _tb += '<tr id="SOS' + _listSOS[i]["DeviceID"]
                    + '" classname="groupXe" onclick="makePoint(' + i + ',2'
                    + ');" data-toggle="" data-placement="right" data-html="true" class="tr_hover_select">'
                    + '<td class="alignCenter">'
                    + (i + 1) + '</td><td>'
                    + '<img src="/Content/images/tau/tau-red.png">  '
                    + _listSOS[i]["DeviceName"]
                    + '</td><td>' + dte + '</td><td>'
                    + _listSOS[i]["Latitude"] + "." + _listSOS[i]["DirectionSN"] + " - "
                    + _listSOS[i]["Longitude"] + "." + _listSOS[i]["DirectionEW"]
                    + '</td></tr>';
            } $("#SOSData").html(_tb);
        }
    });
    //console.log("done");
}

function Warning() {
    for(var i=0;i<_listDeviceStatus.length;i++){
        var dv = _listDeviceStatus[i];
        var warning = "";
        var checkpoint = new google.maps.LatLng(dv.Latitude,dv.Longitude);
        var biengioi;
        if(dv.TypeShip == 1){
            if(google.maps.geometry.poly.containsLocation(checkpoint, vungbo) == true){
                biengioi = bo;
            }
            //cảnh báo tàu vi phạm vùng lộng
            warning = "Tàu "+ dv.DeviceName + " vi phạm vùng lộng";
            document.getElementById("WarningDiv").style.display = "block";
            document.getElementById("warning").innerText = warning;
            continue;
        }else{
            if(dv.TypeShip == 2){
                if(google.maps.geometry.poly.containsLocation(checkpoint, vungbolong) == true){
                    biengioi = bolong;
                }else{
                    if(google.maps.geometry.poly.containsLocation(checkpoint, vungbo) == true){
                        //Cảnh báo tàu vi phạm vùng bờ
                        warning = "Tàu "+ dv.DeviceName + " vi phạm vùng bờ";
                        document.getElementById("WarningDiv").style.display = "block";
                        document.getElementById("warning").innerText = warning;
                        continue;
                    }
                    warning = "Tàu "+ dv.DeviceName + " vi phạm vùng khơi";
                    document.getElementById("WarningDiv").style.display = "block";
                    document.getElementById("warning").innerText = warning;
                    //Cảnh báo tàu vi phạm vùng khơi
                    continue;
                }
            }else{
                if(dv.TypeShip == 3){
                    if(google.maps.geometry.poly.containsLocation(checkpoint, vunglong) == false){
                        biengioi = long;
                    }else{
                        if(google.maps.geometry.poly.containsLocation(checkpoint, vungbo) == true){
                            //Cảnh báo tàu cá vi phạm vùng bờ
                            warning = "Tàu "+ dv.DeviceName + " vi phạm vùng bờ";
                            document.getElementById("WarningDiv").style.display = "block";
                            document.getElementById("warning").innerText = warning;
                            continue;
                        }
                        //Cảnh báo tàu cá vi phạm vùng lộng
                        warning = "Tàu "+ dv.DeviceName + " vi phạm vùng lộng";
                        document.getElementById("WarningDiv").style.display = "block";
                        document.getElementById("warning").innerText = warning;
                        continue;
                    }
                }
            }
        }
        //console.log(biengioi.length);
        var ar = TimMin(dv["Latitude"],dv["Longitude"],biengioi);
        //console.log(ar);
        res = FindPoint(biengioi[ar[0]]["lat"],biengioi[ar[0]]["lng"],long[ar[1]]["lat"],long[ar[1]]["lng"],dv["Latitude"],dv["Longitude"]);
        console.log(res);
        if(res<5){
            warning = "Tàu "+ dv.DeviceName + " chuẩn bị ra khỏi phạm vi đánh bắt";
            document.getElementById("WarningDiv").style.display = "block";
            document.getElementById("warning").innerText = warning;
        }
            
    
    }
    //_listDeviceStatus
}
function FindPoint(lat1, lon1, lat2, lon2, lat3, lon3) {
    var a = Distance(lat3, lon3, lat1, lon1);
    var b = Distance(lat3, lon3, lat2, lon2);
    var c = Distance(lat1, lon1, lat2, lon2);
    var p = (a + b + c) / 2;
    var h = 2 * (Math.sqrt(p * (p - a) * (p - b) * (p - c)) / a);
    return h;
}
function Distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Km
    var φ1 = lat1 * Math.PI / 180;
    var φ2 = lat2 * Math.PI / 180;
    var Δφ = (lat2 - lat1) * Math.PI / 180;
    var Δλ = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function TimMin(lat, lng, biengioi) {
    if (biengioi.length > 0) {
        var min1 = 0;
        var min2 = 1;
        var ar = [];
        for (var i = 2; i < biengioi.length; i++) {
            var d = Distance(lat, lng, biengioi[i]["lat"], biengioi[i]["lng"]);
            if (d < Distance(lat, lng, biengioi[min1]["lat"], biengioi[min1]["lng"])) {
                min2 = min1;
                min1 = i;
            }
            else {
                if (d < Distance(lat, lng, biengioi[min2]["lat"], biengioi[min2]["lng"]))
                    min2 = i;
            }
        }
        ar = [min1, min2];
        return ar;
    }
}


function setup_DataTable() {
    //if(_listDeviceStatus.length <= 0) updateListDeviceStatus();
    var _tb = "";
    for (var i = 0; i < _listDeviceStatus.length; i++) {

        var dte = _listDeviceStatus[i]["TransmitTime"].getDate() + '/' + (_listDeviceStatus[i]["TransmitTime"].getMonth() + 1) + '/'
            + _listDeviceStatus[i]["TransmitTime"].getFullYear() + ' ' + _listDeviceStatus[i]["TransmitTime"].getHours() + ':'
            + _listDeviceStatus[i]["TransmitTime"].getMinutes();

        _tb += '<tr id="tr' + _listDeviceStatus[i]["DeviceID"]
            + '" classname="groupXe" onclick="makePoint(' + _listDeviceStatus[i]["DeviceID"] + ',1'
            + ');" data-toggle="" data-placement="right" data-html="true" class="tr_hover_select">'
            + '<td class="alignCenter">'
            + (i + 1) + '</td><td style="text-align:left">'
            + '<img src="/Content/images/tau/' + _stt_[_listDeviceStatus[i]["Status"]]["menucon"] + '">  '
            + _listDeviceStatus[i]["DeviceName"]
            + '</td><td>' + _listDeviceStatus[i]["Speed"]
            + '</td><td>' + dte + '</td><td>'
            + _listDeviceStatus[i]["Latitude"] + "." + _listDeviceStatus[i]["DirectionSN"] + " - "
            + _listDeviceStatus[i]["Longitude"] + "." + _listDeviceStatus[i]["DirectionEW"]
            + '</td><td style="display:none">' + _listDeviceStatus[i]["Status"] + '</td></tr>';
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
}

// select option giám sát tàu

function createTable(selectState, list_result) { // list_result = tbl_tablebody từ vùng kêt quả
    var _selectState, _list_result;
    _selectState = document.getElementById(selectState).value; // lây value option
    _list_result = document.getElementById(list_result); // lấy value từ vùng kq
    tr = _list_result.getElementsByTagName('tr'); // đặc = tr 

    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[5]; // lấy dòng đầu

        if (_selectState == 0) { // nêu select tât cả
            //alert('helo'); 
            // show tat cả dòng
            tr[i].style.display = "";
        }
        if (td.innerText == _selectState) { // dữ liệu cột 5 so sánh vs select --> có dữ liệu 
            tr[i].style.display = ""; // hiển thị
        } else if (_selectState != 0) {
            tr[i].style.display = "none"; // ẩn đi 
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
function interval_draw() {
    //if (_interval != null) clearInterval(_interval);
    //_interval = setInterval(function () { setdrawingLinePoint() }, 120000);
    _intervalDeviceStatus = setInterval(function () {updateListDeviceStatus()},120000);
    _intervalDataline = setInterval(function () {setup_selectDataLine()},180000);
    _intervalSOS = setInterval(function () { SOS() }, 120000);
    _intervalWaning = setInterval(function () {Warning()},12000);
}

function Taomang(){
    for(i = 2;i<20;i++){
        bolong.push(bo[i]);
    }
    for(i = 21;i>2;i--){
        bolong.push(long[i]);
    }
    //console.log(bolong.length);
    // var nothing = new google.maps.Polygon({
    //     path: bolong,
    // })
    vungbo = new google.maps.Polygon({
        paths: bo
    });
    vungbolong = new google.maps.Polygon({
        paths: bolong
    });
    vunglong = new google.maps.Polygon({
        paths: long
    });
}




$(document).ready(function () {
    setupMap(_def_Lat, _def_Lng, _def_zoom);
    updateListDeviceStatus();
    setup_selectDataLine();
    Taomang();
    interval_draw();
    SOS();
});