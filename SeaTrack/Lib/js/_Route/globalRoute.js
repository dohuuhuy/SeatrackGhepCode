
$(document).ready(function () {

    setupMap(_def_Lat, _def_Lng, _def_zoom);
	
	DanhSachThietBiHetHan();

	$('#SOS').draggable({
		scroll: true,
		scrollSensitivity: 40,
		scrollSpeed: 40
	});
	
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();

	//if (window.innerWidth < 1080) {
	//	alert(window.innerWidth);
	//	if ($('#s-sidebar').hasClass('active')) {
	//		$("#sidebarCollapse").addClass("d-none");
 //       }
 ////   }
	//if ($(window).width > 480) {

	//	$('#menubar').toggleClass('active');

	//}
	//else
	//{
	//	$('#menubar').removeClass('active');

	//	$('#menubar').addClass('active1');
	//	$('#menu2').addClass("d-none");

	//}



	$('#sidebarCollapse').on('click', function () {

		$('#s-sidebar').toggleClass('active');
		$('#menubar').toggleClass('active');
		$('#s-logo-menu').addClass('d-none');
		$("#sidebarCollapse").removeClass("d-none");
		$("#giamsat_toggle").addClass("d-none");

		if ($(window).width() <= 480) {
			if ($('#sidebarCollapse').hasClass('key')) {
				$('#menu2').addClass("d-none");
				$('#sidebarCollapse').removeClass('key')

			} else {
				$('#menu2').removeClass("d-none");
				$('#sidebarCollapse').addClass('key')
			}
		}

		if (!($("#navbarSupportedContent").hasClass("d-none"))) {
			$("#navbarSupportedContent").addClass("d-none");
		}
	});


	$('#menu2').on('click', function () {
	
			$("#navbarSupportedContent").removeClass("d-none"); 
});

	$('#giamsat_toggle').on('click', function () {

		$('#s-sidebar').toggleClass('active');
		$('.s-sidebar').toggleClass('active');
		$('#menubar').toggleClass('active');
		$('#s-logo-menu').toggleClass('d-none');
		$("#sidebarCollapse").removeClass("d-none");
		$("#giamsat_toggle").addClass("d-none");
		if ($("#navbarSupportedContent").removeClass("d-none")) { // chưa ẩn
			$("#navbarSupportedContent").addClass("d-none"); // thì ẩn
        }
	});



	$('#s-info-button').on('click', function () {
		$('#popUpBox_theMeaningOfIcon').toggleClass('d-none');
	});
	$("#closeMeaningOfIcon").on('click', function () {
		$('#s-info-button').trigger('click');
	})
	$('#sublefttab_1').mouseenter(function () {
		$('#sublefttab_1').addClass('s-over-width');
	});
	$('#sublefttab_1').mouseleave(function () {
		$('#sublefttab_1').removeClass('s-over-width');
	});



	$('input[name="datefilter"]').daterangepicker({
		autoUpdateInput: true,
		locale: {
			cancelLabel: 'Đóng',
			format: 'dd/mm/yyyy'
		}
	});
	$('input[name="datefilter"]').on('apply.daterangepicker', function (ev, picker) {
		$(this).val(picker.startDate.format('dd/MM/yyyy') + ' - ' + picker.endDate.format('dd/MM/yyyy'));
	});
	$('input[name="datefilter"]').on('cancel.daterangepicker', function (ev, picker) {
		$(this).val('');
	});
	$('.form_datetime').datetimepicker({
		language: 'vi',
		weekStart: 1,
		todayBtn: 1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
		showMeridian: 1,
		format: 'dd-mm-yyyy'
	});
	$('.form_date').datetimepicker({
		language: 'vi',
		weekStart: 1,
		todayBtn: 1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
		format: 'dd-mm-yyyy'
	});
	$('.form_time').datetimepicker({
		language: 'vi',
		weekStart: 1,
		todayBtn: 1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 1,
		minView: 0,
		maxView: 1,
		forceParse: 0,
		format: 'hh:ii'
	});


});


var _infowindow = new google.maps.InfoWindow();
var service = new google.maps.DirectionsService();