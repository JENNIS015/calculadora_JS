class Unidad {
  constructor(metrosCuadrados, precioMesVigenteMenor, precioMesVigenteMayor) {
    this.metrosCuadrados = metrosCuadrados;
    this.precioMesVigenteMenor = precioMesVigenteMenor;
    this.precioMesVigenteMayor = precioMesVigenteMayor;
  }
  calcularValorMenor() {
    return this.metrosCuadrados * this.precioMesVigenteMenor;
  }
  calcularValorMayor() {
    return this.metrosCuadrados * this.precioMesVigenteMayor;
  }
}


let miFormulario = $("#form1");
miFormulario.on("submit", functSubmit);



function functSubmit(e) {

  let placeElegido = sessionStorage.getItem('Barrio').toUpperCase();
  sessionStorage.setItem('enviado', true);

  e.preventDefault();
  console.log("Formulario Enviado");
  $('#form1').hide();
  $('#title').hide();

  if (placeElegido !== "ERROR") {
    calcularValor();
    cabaApi();
  } else {
    let errorBarrio =
      '<h5>Oops! Ha ocurrido un error.</h5><br><br><br>' +
      '<a class="button" id="clear">Reiniciar Formulario</a>';

    $("#ejemplo").append(errorBarrio);

    $("#clear").click(() => {
      sessionStorage.clear();
      location.reload();
    });


  }
}

var currentTab = 0;
mostrarFormulario(currentTab);

//oculta formulario si ya se envio
var formEnviado = sessionStorage.getItem('enviado');
if (formEnviado) {
  $('#form1').hide();
  $('#title').hide();
  let valorGuardado = sessionStorage.getItem('valorDevuelto');
  $("#ejemplo").append(valorGuardado);
  cabaApi();
}



function calcularValor() {

  let selectedUnidad = $("input:radio[name=unidad]:checked").val();

  let placeElegido = sessionStorage.getItem('Barrio').toUpperCase();
  let usuarioMetros2 = $("#m2_propiedad").val();

  let checkBarrioDto = preciosBarrios_Dto.findIndex(barrio => barrio.barrio === placeElegido);
  let checkBarrioCasa = preciosBarrios_Casa.findIndex(barrio => barrio.barrio === placeElegido);

  //departamento
  if (selectedUnidad === "Departamento" && checkBarrioDto >= 0) {

    const buscarBarrio_Dto = preciosBarrios_Dto.find(barrio => barrio.barrio === placeElegido);
    let precioMenor_Dto = buscarBarrio_Dto.precioMenor;
    let precioMayor_Dto = buscarBarrio_Dto.precioMayor;
    const valorUnidadDto = new Unidad(usuarioMetros2, precioMenor_Dto, precioMayor_Dto);

    let valorDto = `<h5> ¿Conocias el valor de tu  ${selectedUnidad} en  ${placeElegido} por m2?</h5>
    <p> Min USD ${buscarBarrio_Dto.precioMenor} | Max USD ${buscarBarrio_Dto.precioMayor} </p>
    <h3>El valor minimo puede ser de  USD   ${valorUnidadDto.calcularValorMenor()}   mientras que máximo de USD ${valorUnidadDto.calcularValorMayor()} </h3>`;
    $("#ejemplo").append(valorDto);
    sessionStorage.setItem('valorDevuelto', valorDto);

  } else if ((selectedUnidad === "Departamento") && checkBarrioDto == -1) {

    let errorValorDto = `<h5> Oops! No disponemos tasaciones para   ${selectedUnidad} en  ${placeElegido} </h5>`;
    $("#ejemplo").append(errorValorDto);
    sessionStorage.setItem('valorDevuelto', errorValorDto);

  } else if ((selectedUnidad === "Casa") && checkBarrioCasa >= 0) {

    //casa
    const buscarBarrio_Casa = preciosBarrios_Casa.find(barrio => barrio.barrio === placeElegido);
    let precioMenor_Casa = buscarBarrio_Casa.precioMenor;
    let precioMayor_Casa = buscarBarrio_Casa.precioMayor;
    const valorUnidadCasa = new Unidad(usuarioMetros2, precioMenor_Casa, precioMayor_Casa);

    let valorCasa = `<h5> ¿Conocias el valor de tu  ${selectedUnidad} en  ${placeElegido} por m2?</h5> <br>
    <p> Min USD ${precioMenor_Casa} | Max USD ${precioMayor_Casa} </p>
    <h3>El valor minimo puede ser de  USD  ${valorUnidadCasa.calcularValorMenor()}   mientras que máximo de USD ${valorUnidadCasa.calcularValorMayor()} </h3>
    `;
    $("#ejemplo").append(valorCasa);
    sessionStorage.setItem('valorDevuelto', valorCasa);

  } else {

    $("#ejemplo").append(errorValorCasa);
    let errorValorCasa = `<h5> Oops! No disponemos tasaciones para   ${selectedUnidad} en  ${placeElegido} </h5> `;
    sessionStorage.setItem('valorDevuelto', errorValorCasa);
  }
}

function cabaApi() {

  let selectedUbicacion = $("input:radio[name=ubicar]:checked").val();
  if (selectedUbicacion == "caba") {
    sessionStorage.setItem('CABA', true);
  }
  let esCapital = sessionStorage.getItem('CABA');


  if (esCapital) {
    var html_to_append =
      '<br><h5>Datos Generales</h5>' +
      '<h3>Comuna</h3><p>' + sessionStorage.getItem('Comuna') + '</p>' +
      '<h3>Barrio</h3><p>' + sessionStorage.getItem('Barrio') + '</p>' +
      '<h3>Sección Catastral</h3><p>' + sessionStorage.getItem('Sección Catastral') + '</p>' +
      '<h3>Código Postal</h3><p>' + sessionStorage.getItem('Sección Catastral') + '</p>' +
      '<br><h5>Datos de interes</h5>' +
      '<h3>Área Hospitalaria</h3><p>' + sessionStorage.getItem('Área Hospitalaria') + '</p>' +
      '<h3>Área Hospitalaria</h3><p>' + sessionStorage.getItem('Área Hospitalaria') + '</p>' +
      '<h3>Distrito Escolar</h3><p>' + sessionStorage.getItem('Distrito Escolar') + '</p>' +
      '<br><br> <a class="button" href="#precios">¿Deseas tu tasación?</a><br><br><br>' +
      '<a class="button" id="clear">Reiniciar Formulario</a>';

    $("#datosGeo").append(html_to_append);
  } else {

    var html_to_append = '<br><br><a class="button" href="#precios">¿Deseas tu tasación?</a><br><br><br>' +
      '<a class="button" id="clear">Reiniciar Formulario</a>';
    $("#datosGeo").append(html_to_append);


  }
  $("#clear").click(() => {
    sessionStorage.clear();
    location.reload();
  });

}



function mostrarFormulario(n) {
  var x = $('.tab');
  let prev = $('#prevBtn');
  let next = $('#nextBtn');

  if (n < x.length) {
    x.eq(n).attr("style", "display:block");
  }

  if (n == 0) {
    prev.hide();
  } else {
    prev.show();
  }
  if (n == 4) {
    next.click(() => {
      let placePcia = $('#place').val();
      if (placePcia != "none") {
        sessionStorage.setItem('Barrio', placePcia);
      }
    });
  }

  if (n == 2) {

    next.click(() => {
      let direccion = $('#direccion_calle').val();
      let numero = $('#direccion_numero').val();
      const APIURL = 'https://datosabiertos-usig-apis.buenosaires.gob.ar/datos_utiles?calle=' + direccion + '&altura=' + numero;


      $.ajax({
        url: APIURL,
        method: "GET",
        dataType: 'json',
        success: function (data) {

          apiData(data);
          sessionStorage.setItem('Barrio', data.barrio);
        },
        error: function (data) {
          console.log(data);
          sessionStorage.clear();
          sessionStorage.setItem('Barrio', 'error');

        }
      });

    });


  }

  if (n == 5) {
    next.attr("type", "submit");
    next.html("Enviar");

  } else {
    next.show();
    next.html("Siguiente");
  }

}


function apiData(data) {
  console.log(data);

  sessionStorage.setItem('Comuna', data.comuna);
  sessionStorage.setItem('Sección Catastral', data.seccion_catastral);
  sessionStorage.setItem('Código Postal', data.codigo_postal);
  sessionStorage.setItem('Código Postal', data.codigo_postal);
  sessionStorage.setItem('Comisaria Vecinal', data.comisaria_vecinal);
  sessionStorage.setItem('Área Hospitalaria', data.area_hospitalaria);
  sessionStorage.setItem('Distrito Escolar', data.distrito_escolar);

}

function nextPrev(n) {
  var x = $('.tab');

  if (!validarFormulario()) return false;
  x.eq(currentTab).hide();
  currentTab = currentTab + n;
  mostrarFormulario(currentTab);
}

let nextButton = $('#nextBtn');

nextButton.on("click", () => {
  if (currentTab == 1) {
    var val = $('input:radio[name=ubicar]:checked').val();
    switch (val) {
      case 'pcia':
        nextPrev(2);
        break;
      case 'caba':
        nextPrev(1);
        break;
    }
  } else if (currentTab == 2) {
    nextPrev(2);
  } else {
    nextPrev(1);

  }
});

$('#prevBtn').on('click', () => {
  var val = $('input:radio[name=ubicar]:checked').val();
  if (currentTab == 4 && val == "pcia") {
    nextPrev(-1);
  } else if (currentTab == 4 && val == "caba") {
    nextPrev(-2);
  } else if (currentTab == 3) {
    nextPrev(-2);
  } else {
    nextPrev(-1);
  }
});


function validarFormulario() {
  valid = true;
  x = $(".tab");

  let optionTipo = $("[name='unidad']")
  let optionRegion = $("[name='ubicar']")

  if ((currentTab == 0) && (!(optionTipo[0].checked || optionTipo[1].checked))) {
    $('#unidad_error').html('Por favor seleccione una unidad');
    valid = false;
  }

  if ((currentTab == 1) && (!(optionRegion[0].checked || optionRegion[1].checked))) {
    $('#ubicar_error').html('Por favor seleccione una ubicación');
    valid = false;
  }

  if ((currentTab == 2) && ($("#direccion_calle").val() == '')) {
    $('#direccion_error').html('Indique la calle');
    valid = false;
  }
  if ((currentTab == 2) && ($("#direccion_numero").val() == '')) {
    $('#direccion_error').html('Indique el número');
    valid = false;
  }
  if ((currentTab == 3) && (0 == $('#place')[0].selectedIndex)) {
    $('#lugar_error').html('Seleccione una ubicación');
    valid = false;
  }
  if ((currentTab == 4) && ($("#m2_propiedad").val() == '')) {
    $('#metros_error').html('Indique un valor');
    valid = false;
  }

  if (valid) {

    $('#metros_error').html('');
    $('#ubicar_error').html('');
    $('#unidad_error').html('');
    $('#lugar_error').html('');
    $('#direccion_error').html('');

  }
  return valid;
}

//evitar errores
$('#m2_propiedad').keyup(function () {
  this.value = this.value.replace(/[^0-9]/g, '');
});