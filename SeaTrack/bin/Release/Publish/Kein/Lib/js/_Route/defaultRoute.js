var map;
var positionView = 0;
var _def_Lat = 13.2000472;
var _def_Lng = 109.1243889;
var _def_zoom = 6;

var _armarker = [];
var _flightPath = [];
var _interval;
var point;
var infowin;
var _listDeviceStatus = [];
var _listSOS = [];

var _drawingLinePoint = [];
var _infowins = [];
var _drawingMarker = [];
var slider = $("myRange");
var _c_marker = 0;
var _intervalSOS;

var _intervalWaning;
var _intervalDeviceStatus;
var _intervalDataline;

var _stt_ = {
	0:{"name": "Không xác định","menucon": "tau-black.png","polycon": "tau-den.png","color":"white"},
	1:{"name": "Tàu chạy","menucon": "tau-green.png","polycon": "tau-xanh.png","color":"green"},
	2:{"name": "Tàu dừng","menucon": "tau-black.png","polycon": "tau-den.png","color":"black"},
	3:{"name": "Mất tín hiệu","menucon": "tau-yellow.png","polycon": "tau-cam.png","color":"#ff7f22"},
	4:{"name": "SOS khẩn","menucon": "tau-red.png","polycon": "tau-do.png","color":"red"}
  };








