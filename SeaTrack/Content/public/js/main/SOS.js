
function interval_SOS(){
                    
    _SOS = setInterval(function () { SOS() },60000);
}
function SOS(){
    var SOS = [];
    var id ="";
    $.ajax({
        type: 'GET',
        url: '/SOS/GetSOS',
        data: {},
        success: function (data, txtStatus, XMLHttpRequest) {
            SOS = data;
            console.log(SOS);
            if(SOS != null && _IsDislay == null) {
                _IsDislay = confirm("Cảnh báo sự cố, xác nhận điều hướng sang trang giám sát");
                if (_IsDislay) window.location.href = "/";
                else _IsDislay = null;
            }
        }
    });
}
