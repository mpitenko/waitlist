document.addEventListener('DOMContentLoaded', init);

function init() {
  console.log('It works!');

  $('#form-login').on('submit', function(e) {
  	e.preventDefault();

  	console.log('on submit')
  	var username = $('input[name="username"]')[0].value;
  	var password = $('input[name="password"]')[0].value;

    console.log(password);

  	$.ajax({
  		url: '/admin/login',
      method: 'POST',
  		data: {
  			username: username,
  			password: password
  		},
  		success: function(data) {
        window.location.href = '/admin';
  		},
  		error: function (data) {
  			console.error('error', data)
        alert(data.responseText);
  		}
  	});
  	return false;
  });

  $('#logoutbtn').on('click', function(e) {

    $.ajax({
      url: '/admin/logout',
      method: 'GET',
      success: function(data) {
        window.location.href = '/admin/login';
      },
      error: function (data) {
        console.error('error', data)
        alert(data.responseText);
      }
    });
  });
}

var events = [{
  id: 'qweqqwe', 
  name: "qweqwe"
}]

var clients = [
{
  id: 'qweqqwe', 
  name: "qweqwe",
  eventId: "qweqqwe"
}
]
