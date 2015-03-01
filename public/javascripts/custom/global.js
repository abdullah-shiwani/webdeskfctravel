if(window.location.hostname.match('localhost')){
	var DOMAIN_NAME = "http://localhost:9000/";
}
else{
	var DOMAIN_NAME = "/";
}

var OOPS_ERROR_MESSAGE = "Oops, something went wrong."
var MINIMUM_PASS_LENGTH = 6;
var SUCCESS_VALIDATING = 'Please wiat ....';
var ERROR_EMAIL_ADDRESS_EMPTY = "Please input email address";
var ERROR_EMAIL_ADDRESS_NOT_VALID = "Please input correct email address";
var ERROR_USERNAME_EMPTY = "Please input username";
var ERROR_PASSWORD_EMPTY = "Please input password";
var ERROR_PASSWORD_MIN_LIMIT = "Passowrd must be "+MINIMUM_PASS_LENGTH+" character long";
var SUCCESS_USER_AUTH = "login successfully";


function sendPOST(url,fdata,onSuccess,onFailure,btn,hideLoader) {
	
	//if(hideLoader == null || hideLoader == 0) {
	//	$('#page_loader').removeClass('hide');
	//}
	
	if(btn != null)
		$(btn).attr('disabled','disabled');
	
	$.ajax({
		type    : "POST",
		url     : url,
		data    : fdata,
		success : function(data) {
			if(btn != null)
				$(btn).removeAttr('disabled');
			
			//data = $.parseJSON(data);

			if(hideLoader == null || hideLoader == 0)
				$('#page_loader').addClass('hide');
			
			if(data.success == "1") {
				onSuccess(data);
				return;
			}
			
			onFailure(data);
	
		},
		
		fail : function(data) {
			//data = $.parseJSON(data.data);

			//if(hideLoader == null || hideLoader == 0)
			//	$('#page_loader').addClass('hide');

			onFailure(data);
		}
	});
}


function showLoader(){
	$('#page_loader').removeClass('hide');
}

function hideLoader(){
	$('#page_loader').addClass('hide');
}

function validateEmail(email){

	var atpos = email.indexOf("@");
	var dotpos = email.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length)
	  return false;

	return true;
}

function wrapContainer(id,tag) {
	return $('#' + id).wrap(tag).parent().html()
}


function redirect(link) {
	window.location.href = link;
}

function reload(link) {
	window.location.reload();
}


function showAlert(div, message, onReturnFocus, sender, serderState){
	$('#'+div+' span').html(message);
	$('#'+div).removeClass('hide');
	$('#'+onReturnFocus).focus();
	$('#'+sender).button(serderState);
}

function empty_correction(e){
	if(isNaN($(e).val()) || $(e).val() == '')
		$(e).val(0);
}

function ignore_special_chars(e)
{	
	
	// for tab and backspace and 4 arrow keys
	var keyCode = e.keyCode || e.which
	if(keyCode == 8 || keyCode == 9 || keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40) 
   		return true;
	
	var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);

    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
}

$('#reportFileter').click(function(){
	var month = $('#reportMonthFilter').val();
	var year = $('#reportYearFilter').val();
	var url = $(this).attr('url');

	if(year == 0){
		redirect(url);
	}

	if(year != 0){
		url += year + '/';

		if(month != 0)
			url += month;
	}

	redirect(url);
});


function objectLength(obj) {
	var count = 0;
	
	if(obj != null) {
		$.each(obj,function(key,val) {
			count++;
		});
	}
	
	return count;
}
 


