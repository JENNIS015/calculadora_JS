// seccion en index creada
const barriosCaros = [{
    nombre: "Puerto Madero",
    detalle: "Puerto Madero es un barrio con características diferentes en la Ciudad. Un área muy sofisticada y elegante, con altos edificios, restaurantes, bares."
  },
  {
    nombre: "Barrio Norte",
    detalle: "Barrio Norte se caracteriza por su opulencia, gran vida cultural, su arquitectura, sus palacios, residencias, museos y amplios parques."
  },
  {
    nombre: "Nuñez",
    detalle: "La zona tiene abundantes edificios de gran tamaño con departamentos y una alta actividad comercial, especialmente en la Avenida Cabildo y la Avenida del Libertador."
  },
];


barriosCaros.forEach((item, index) => {

  var div = document.createElement("td");
  div.className = `mostrar_div_${index + 1}`;
  div.id = `mostrar_div_${index + 1}`;
  div.innerHTML = `<tr><h2>${item.nombre}</h2> <br> <p> ${item.detalle}</p></tr>`;
  div.innerHTML = `<tr><h2>${item.nombre}</h2> <br> <p> ${item.detalle}</p></tr>`;

  const especialDiv = document.getElementById("barriosCarosSeccion");
  especialDiv.appendChild(div);
});