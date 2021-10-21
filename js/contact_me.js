$(function() {

$('#contact-btn').click(function() {
  $('#contact').toggle();
});
$('.close-contact').click(function() {
  $('#contact').hide();
});

$("#contact-form").submit(function( event ) {
    event.preventDefault(); // prevent default submit behaviour
    // get values from FORM
    var name = $("input#name").val();
    var email = $("input#email").val();
    var message = $("textarea#message").val();
    var firstName = name; // For Success/Failure Message
    // Check for white space in name for Success/Fail message
    if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
    }

    $.ajax({
        url: "https://docs.google.com/forms/d/1A-EwsIgQFeTq2shk2Im8ADcPj9i0j6v_-7Mcz_L8aOo/formResponse",
        type: "POST",
        crossDomain: true,
        dataType: "xml",
        data: {
            "entry.1250718290": name,
            "entry.55891339": email,
            "entry.2017814841": message
        },
        cache: false,
        success: function() {
            // Success message
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-success')
                .append("<strong>Your message has been sent. </strong>");
            $('#success > .alert-success')
                .append('</div>');

            //clear all fields
            $('#contactForm').trigger("reset");
        },
        error: function(response) {
          if (response.status == 200 || response.status == 404) {
            // Success message
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-success')
                .append("<div>訊息已送出，我們會盡快回覆您。</div>");
            $('#success > .alert-success')
                .append('</div>');

            $("input#name").val('');
            $("input#email").val('');
            $("textarea#message").val('');
            //clear all fields
            $('#contactForm').trigger("reset");

            }
            else {
              // Fail message
              $('#success').html("<div class='alert alert-danger'>");
              $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                  .append("</button>");
              $('#success > .alert-danger').append("<div>抱歉 " + firstName + ", 目前無法送出訊息，請聯繫contact@instants.xyz，謝謝");
              $('#success > .alert-danger').append('</div>');
              //clear all fields
              $('#contactForm').trigger("reset");
          }
        }
    });
});

$("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    (this).tab("show");
});
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
