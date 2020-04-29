$(document).ready(function () {

	setup_selectDeviceNo();
	DanhSachThietBiHetHan();
	interval_SOS();

	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();


	//if ($(window).width() <= 1024) {
	//	if (!($('.si-sidebar').hasClass('active')))
	//	{
	//		$('.si-sidebar').addClass('active');
	//		$('#menubar').removeClass('active');
	//		$('#s-logo-menu').removeClass('d-none');
	//		$('.navbar-nav').addClass('d-none');
			
 //       }
	//}



	$('#sidebarCollapse').on('click', function () {


		$('.si-sidebar').toggleClass('active');
		$('#menubar').toggleClass('active');
		$('#s-logo-menu').addClass('d-none');
		$("#sidebarCollapse").removeClass("d-none");
		$("#giamsat_toggle").addClass("d-none");

		if ($('#content').hasClass('huy')) {

			$('#content').removeClass('huy')
		} else {
			$('#content').addClass('huy')
        }

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

		//$('.navbar-nav').toggleClass('d-none');
		$("#navbarSupportedContent").removeClass("d-none");
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
	if ($(window).width() < 481) { $("#sidebarCollapse").click(); }
});


