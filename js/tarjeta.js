$(document).ready(function ($) {
  var cartTotal = shoppingCart.totalCart();

  if (cartTotal != 0.00) {

    let numeroTarjeta = $('.input-numero');
    let tarjetaNombre = $('#tarjeta-nombre');
    let tarjeta = $('.tarjeta-credito');
    let codigo = $('#tarjeta-codigo')
    let nombreImpreso = $('.tarjeta-credito .tarjeta-nombre div')
    numeroTarjeta.on('keyup change', function () {
      if (numeroTarjeta.val().length > 3) {
        $(this).next().focus();
      }

      var tarjeta_numero = '';

      numeroTarjeta.each(function () {
        tarjeta_numero += $(this).val() + ' ';
        if ($(this).val().length == 4) {
          $(this).next().focus();
        }
      })

      $('.tarjeta-credito .numero').html(tarjeta_numero);
    });



    tarjetaNombre.on('keyup change', function () {
      nombreImpreso.html(tarjetaNombre.val());
    });



    $('#tarjeta-validez-mes, #expiracion').change(function () {
      m = $('#tarjeta-validez-mes option').index($('#tarjeta-validez-mes option:selected'));
      m = (m < 10) ? '0' + m : m;
      y = $('#expiracion').val().substr(2, 2);
      $('.card-expiration-date div').html(m + '/' + y);
    })


    codigo.on('focus', function () {
      tarjeta.addClass('hover');
    }).on('blur', function () {
      tarjeta.removeClass('hover');
    }).on('keyup change', function () {
      $('.ccv div').html(codigo.val());
    });


    function soloLetras(event) {
      var value = String.fromCharCode(event.which);
      let regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g;
      return regex.test(value);
    }

    tarjetaNombre.bind('keypress', soloLetras);

    setTimeout(function () {
      codigo.focus().delay(2000).queue(function () {
        $(this).blur().dequeue();
      });
    }, 500);

    $('#free').hide();
  } else {
    $('#paymentForm').hide();
    $('#creditCard').hide();
  }


  $('.delete-item').click(function () {
    location.reload();
  });



  $("#paymentForm").validate({
    groups: {
      inputGroup: "num1 num2 num3 num4",
      inputValidez: "año mes"
    },
    rules: {
      nombreTarjeta: {
        required: true,
        minlength: 6
      },
      codigoTarjetaNum: {
        required: true,
        minlength: 3,
        digits: true
      },
      año: "required",
      mes: "required",
      num1:{
        required: true,
        minlength: 4,
        digits:true

      }, 
      num2: {
        required: true,
        minlength: 4,
        digits:true
        
      }, 
      num3: {
        required: true,
        minlength: 4
      }, 
      num4: {
        required: true,
        minlength: 4
      }, 
      },

    messages: {
      nombreTarjeta: {
        required: "Por favor complete su nombre",
        minlength: "Nombre Completo"
      },
      codigoTarjetaNum: {
        required: "Por favor complete el código",
        minlength: "Son 3 digitos"
      },
      año: "Por favor complete el año",
      mes: "Por favor complete el mes",
      num1: "Complete su número de tarjeta",
      num2: "Complete su número de tarjeta",
      num3: "Complete su número de tarjeta",
      num4: "Complete su número de tarjeta"
    },
    errorPlacement: function (error) {
      error.appendTo('#errordiv');
    },
     
    
    submitHandler: function (e) {
      
      console.log("Formulario Enviado");
      $('#paymentForm').hide();
      $('#creditCard').hide();
      $(".checkout").append(`<h2>Gracias por su Compra</h2>`);
      
    }

  });


  
  $("#formFree").validate({
   
    rules: {
      nombre: {
        required: true,
        minlength: 6
      },
    },
    messages: {
      nombre: {
        required: "Por favor complete su nombre",
        minlength: "Nombre Completo"
      },
       
    },
    errorPlacement: function (error) {
      error.appendTo('#errorFormFree');
    },
     
    
    submitHandler: function (e) {
      
      console.log("Formulario Enviado");
      $('#formFree').hide();
      $('#back').hide();
      $(".checkout").append(`<h2>Gracias</h2>`);
      
    }

  });
});




 