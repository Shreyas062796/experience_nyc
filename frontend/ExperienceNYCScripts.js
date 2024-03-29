$(document).ready(function(){
  //Materialize CSS Element Initializations
  $('.modal').modal();
  //$('.fixed-action-btn').floatingActionButton();
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
      var password = jQuery.md5($('#registrationPassword').val());
      var email = $('#registrationEmail').val();
      var data = {type: "Register", firstName: firstName, lastName: lastName, username: username, password: password, email: email};
      register(data);
  });


  //on login button click

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
    $.get( "restClient.py", {keywords: keywords, catagory: JSON.stringify(catagory), distance: distance, price: price, date: date})
     .done(function( response ) {

    });
  }

});
