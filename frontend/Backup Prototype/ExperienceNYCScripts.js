$(document).ready(function(){
  //Materialize CSS Element Initializations
  $('.sidenav').sidenav({edge: 'right'});
  $('#catagory').select();
  $('#price').select();
  $('.datepicker').datepicker();
  $('.collapsible').collapsible();
  $('.modal').modal();
  $('.tabs').tabs();

  $('#sideBtn').on('click', function(){
    $('.sidenav').sidenav('hide');
  });

  //on search button click
  $('#search').on('click', function(){
      var keywords = $('#keywords').val();
      var catagory = $('#catagory').val();
      var distance = $('#distance').val();
      var price = $('#price').val();
      var date = $('#date').val();

      filter(keywords, catagory, distance, price, date)
  });

  //on register button click
  $('#register').on('click', function(){
      var firstName = $('#first_name').val();
      var lastName = $('#last_name').val();
      var username = $('#username').val();
      var password = $('#registrationPassword').val();
      var email = $('#registrationEmail').val();
      var data = {type: "Register", firstName: firstName, lastName: lastName, username: username, password: password, email: email};
      register(data);
  });


  //on login button click
  $('#login').on('click', function(){
      var user = $('#user').val();
      var password = $('#password').val();
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

  //request filtered data
  function filter(keywords, catagory, distance, price, date){
    $.post( "restClient.py", {keywords: keywords, catagory: JSON.stringify(catagory), distance: distance, price: price, date: date})
     .done(function( response ) {

    });
  }

});
