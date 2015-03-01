$(document).ready(function(){

	var USER_LOGIN = DOMAIN_NAME+"users/login";

	jQuery(function($) {
		$(document).on('click', '.toolbar a[data-target]', function(e) {
			e.preventDefault();
			var target = $(this).data('target');
			$('.widget-box.visible').removeClass('visible');//hide others
			$(target).addClass('visible');//show target
		});
	});

	//you don't need this, just used for changing background
	jQuery(function($) {
		$('#btn-login-dark').on('click', function(e) {
		$('body').attr('class', 'login-layout');
		$('#id-text2').attr('class', 'white');
		$('#id-company-text').attr('class', 'blue');
		e.preventDefault();
	});

	$('#btn-login-light').on('click', function(e) {
		$('body').attr('class', 'login-layout light-login');
		$('#id-text2').attr('class', 'grey');
		$('#id-company-text').attr('class', 'blue');

		e.preventDefault();
	});

	$('#btn-login-blur').on('click', function(e) {
		$('body').attr('class', 'login-layout blur-login');
		$('#id-text2').attr('class', 'white');
		$('#id-company-text').attr('class', 'light-blue');

		e.preventDefault();
		});

	});

	$('#btnLogin').on('click',function(e){
		
		$(this).button('loading');
		$('.alert').addClass("hide");
		username = $('#usernameLogin').val();
		password = $('#passwordLogin').val();

		if(username == '' || username == null){
			showAlert('error_msg', ERROR_USERNAME_EMPTY, 'usernameLogin', "btnLogin", 'reset');
			return;
		}

		if(password == '' || password == null ){
			showAlert('error_msg', ERROR_PASSWORD_EMPTY, 'passwordLogin', "btnLogin", 'reset');
			return;
		}

		if(password.length < MINIMUM_PASS_LENGTH){
			showAlert('error_msg', ERROR_PASSWORD_MIN_LIMIT, 'passwordLogin', "btnLogin", 'reset');
			return;
		}

		sendPOST(USER_LOGIN,$('#formLogin').serialize(),onLoginSuccess,onLoginFailure,null,null);
	});

	function onLoginSuccess(data){
		$('#success_msg').find("label").html(data.message);
		$('#success_msg').removeClass("hide");
		redirect(DOMAIN_NAME+'dashboard');
	}

	function onLoginFailure(data){
		if(data.message == null)
			data.message = OOPS_ERROR_MESSAGE;

		$('#error_msg').find("label").html(data.message);
		$('#error_msg').removeClass("hide");
	}
});