$(document).ready(async () => {
  await showUser();
});

function getIdFromQuery() {
  let stringQuery = window.location.search;
  let formQuery = new URLSearchParams(stringQuery);
  let id = formQuery.get("id");
  return id;
}

function getLi(message){
  return `<li class="list-group-item list-group-item-primary">${message}</li>`
}

function getHair(hair){
  let { color, type } = hair;
  return `${type} ${color}`;
}

function getAddress(data){
  let { address='', city='', postalCode='', state='' } = data;
  return `
    ${getLi(`Estado: ${state}`)}
    ${getLi(`Ciudad: ${city}`)}
    ${getLi(`Codigo Postal: ${postalCode}`)}
    ${getLi(`Dirección: ${address}`)}
  `;
}

function jsonToHtml(data) {
  let { age, gender, email, phone, username, birthDate, bloodGroup, height, weight, eyeColor, hair, address, university } = data;
  return `
    ${getLi(`Nombre de usuario: ${username}`)}
    ${getLi(`Edad: ${age}`)}
    ${getLi(`Genero: ${(gender=='male'?'Hombre':'Mujer')}`)}
    ${getLi(`Correo Electronico: ${email}`)}
    ${getLi(`Telefono: ${phone}`)}
    ${getLi(`Cumpleaños: ${birthDate}`)}
    ${getLi(`Grupo de sangre: ${bloodGroup}`)}
    ${getLi(`Altura: ${height}`)}
    ${getLi(`Peso: ${weight}`)}
    ${getLi(`Color de ojos: ${eyeColor}`)}
    ${getLi(`Cabello: ${getHair(hair)}`)}
    ${getAddress(address)}
    ${getLi(`Universidad: ${university}`)}
  `;
}

function userToHtml(name, data) {
  let { image } = data;
  return `
    <div class="card mb-3 bg-dark text-white">
      <img src="${image}" class="card-img-top p-2 mx-auto d-block" style="width: 40%;">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <ul class="card-text list-group list-group-flush bg-dark">
          ${jsonToHtml(data)}
        </ul>
      </div>
    </div>
    `;
}

async function showUser() {
  let id = getIdFromQuery();
  let view = document.getElementById("pnlView");
  let url = `https://dummyjson.com/users/${id}`;
  let fetched = await fetch(url).catch(err => alert(err));
  let data = await fetched.json();
  let { firstName, lastName, maidenName } = data;
  let name = `${firstName} ${lastName} ${maidenName}`;
  showUserSearch(name);
  view.innerHTML = userToHtml(name, data);
  console.log(data)
}

async function showUserSearch(name) {
  document.getElementById("lblUserSearch").innerHTML += name;
}

function back(){
  window.history.back();
}