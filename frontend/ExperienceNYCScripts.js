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

  //on search button click
  $('#search').on('click', function(){
      var keywords = document.getElementById('keywords').value;
      var catagory = document.getElementById('catagory').value;
      var distance = document.getElementById('distance').value;
      var price = document.getElementById('price').value;
      var date = document.getElementById('date').value;

      login(data);
  });

  //on register button click
  $('#register').on('click', function(){
      var firstName = document.getElementById('first_name').value;
      var lastName = document.getElementById('last_name').value;
      var username = document.getElementById('username').value;
      var password = document.getElementById('registrationPassword').value;
      var email = document.getElementById('registrationEmail').value;
      var data = {type: "Register", firstName: firstName, lastName: lastName, username: username, password: password, email: email};
      register(data);
  });


  //on login button click
  $('#login').on('click', function(){
      var user = document.getElementById('user').value;
      var password = document.getElementById('loginPassword').value;
      var data = {type: "Login", password: password, user: user};
      login(data);
  });

  //user register request
  function register(data){
    $.post( "restClient.py", JSON.stringify(data))
     .done(function( response ) {
       if(response == "True"){
         alert("Registered Successfully!");
       }
       else {
         alert("Registration Failed!");
       }
    });
  }

  //user login request
  function login(data){
    $.post( "restClient.py", JSON.stringify(data))
     .done(function( response ) {
      if(response == "True"){
        alert("Logged In!");
      }
      else {
        alert("Incorrect Credentials!");
      }
    });
  }
});
