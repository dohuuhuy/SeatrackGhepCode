
$(document).ready(function () {

    setupMap(_def_Lat, _def_Lng, _def_zoom);
    interval_SOS();
    SOS();


	$('#SOS').draggable({
		scroll: true,
		scrollSensitivity: 40,
		scrollSpeed: 40
	});
	
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();

	$('#sidebarCollapse').on('click', function () {
		$('#s-sidebar').toggleClass('active');
		$('.s-sidebar').toggleClass('active');
		$('#menubar').toggleClass('active');
		$('#s-logo-menu').toggleClass('d-none');
		$("#sidebarCollapse").addClass("d-none");
		$("#giamsat_toggle").removeClass("d-none");
	
	});
	



	$('#giamsat_toggle').on('click', function () {

		$('#s-sidebar').toggleClass('active');
		$('.s-sidebar').toggleClass('active');
		$('#menubar').toggleClass('active');
		$('#s-logo-menu').toggleClass('d-none');
		$("#sidebarCollapse").removeClass("d-none");
		$("#giamsat_toggle").addClass("d-none");
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