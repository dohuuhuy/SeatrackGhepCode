$(document).ready(function () {

	setup_selectDeviceNo();
	//interval_SOS();

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
		//$( "#sidebarCollapse" ).trigger( "click" );
		$('#s-sidebar').toggleClass('active');
		$('.s-sidebar').toggleClass('active');
		$('#menubar').toggleClass('active');
		$('#s-logo-menu').toggleClass('d-none');
		$("#sidebarCollapse").removeClass("d-none");
		$("#giamsat_toggle").addClass("d-none");
	});

	$('input[name="datefilter"]').daterangepicker({
		autoUpdateInput: true,
		locale: {
			cancelLabel: 'Đóng',
			format: 'DD/MM/YYYY'
		}
	});
	$('input[name="datefilter"]').on('apply.daterangepicker', function (ev, picker) {
		$(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
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

	$("#player").disabled = true;
	$("#speed").disabled = true;

});


