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
var _infowins = [];
var _listDeviceStatus;




var w = 0, t, obj, inner, page;
var activeAutoLoad = 0;
var ArrMarkerSelect = [];
var lotrinhpoint = [], _ArrMarkerDes = [], infowindows = [], arrayMarker = [], infowindowcop = [];
var Gmarker_lotrinh_end;
var _stt_rows = 0, pagination_num = 0;
var flag_interval = false;
var _danhgia = 0;
var load_exp_dv = 0;
var Arr_username = [];
var _dstaikhoan_loginname = "";
var _arr_dstaikhoan_select = [], _arr_loginname = [], _arr_info_row_select = [];
var _first_click = true;
var _arr_dsxe_byuserid = [];
var _dsxe_ofuser_change = "", _dsxe_ofuser_change_delete = "";
var _arr_tonghop_select = [], _arr_tonghop_unselect = [];
var list_infoDevice = [];
var _dstaikhoan_length = 0;
var list_thietbi_loaixe, list_thietbi_tinh, list_thietbi_loaivantai, list_thietbi_nhomxe;
var _arr_info_allrow_saved = [];
var valueItem_current = 0;
var _arr_list_deviceid = [];
var _arr_dsxe_select = [];
var _arr_dsxe_unselect = [];
var _arr_dstaixe_select = [];
var _arr_dsthietbi_select = [];
var line, line1, _distance, listdata, listData_PauseStop;
var status_btn = 1, speed_btn = 0, speed = 60, count = 0, count_max = 0, intervalForAnimation;
var _CategoryID;
var imageURL_ = '';
var armarker = [];


var armarkerTemp = [];
var imgArr = [];
var flag_ = 0;
var old_lat = -1;
var old_long = -1;
var _moveMarker;
var distance;
var _marker_dir;

var directionDisplay;
var directionsService;
var stepDisplay;
var position;
var marker = [];
var flightPath = [];
var polyline = [];
var poly2 = [];
var poly = null;
var startLocation = [];
var endLocation = [];
var timerHandle = [];
var speed = 0.000005, wait = 1;
var infowindow = null;
var myPano;
var panoClient;
var nextPanoId;
var Colors = ["#FF0000", "#00FF00", "#0000FF"];
var rendererOptions;
var lastVertex = 1;
var stepnum = 0;
var step = 50;
var tick = 100;
var eol = [];
var requestArray = [], renderArray = [];
//var cur = 0;
var directionsDisplay = [];
// status
// 1: Đang hoạt động
// 2: Đang neo
// 3: Mất liên lạc
// 4: Hết hạn
var _stt_cmd = {
	1:{"img": "bus-green.png",},
	2:{"img": "bus-black.png",},
	3:{"img": "bus-red.png",},
	4:{"img": "bus-black.png",}
};
var _stt_cmd2 = {
	1: { "img": "tau-green.png", },
	2: { "img": "tau-black.png", },
	3: { "img": "tau-red.png", },
	4: { "img": "tau-black.png", }
};
var _c_marker = 0;



