$(document).ready(function(){
  //Materialize CSS Element Initializations
  $('.sidenav').sidenav({edge: 'right'});
  $('select').select();
  $('.datepicker').datepicker();
  $('.collapsible').collapsible();
  $('.modal').modal();
  $('.tabs').tabs();

  $('#sideBtn').on('click', function(){
    $('.sidenav').sidenav('hide');
  });



  $('#register').on('click', function(){
      var firstName = document.getElementById('first_name').value;
      var lastName = document.getElementById('last_name').value;
      var password = document.getElementById('registrationPassword').value;
      var email = document.getElementById('registrationEmail').value;

      $.post( "url", {type: "Register", firstName: firstName, lastName: lastName, password: password, email: email})
       .done(function( data ) {
        alert("Registered!");
      });
  });

  $('#login').on('click', function(){
      var password = document.getElementById('loginPassword').value;
      var email = document.getElementById('loginEmail').value;

      $.post( "url", {type: "Login", password: password, email: email})
       .done(function( data ) {
        alert("Logged In!");
      });
  });
});
