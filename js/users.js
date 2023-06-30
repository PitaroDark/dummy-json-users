$(document).ready(async () => {
  showUsername();
  await showUsers();
});

function getLi(message){
  return `<li class="list-group-item list-group-item-primary">${message}</li>`
}

function userHtml(id, name, old, img, birthday, username, email) {
  return `
    <div id="${id}" class="card mb-3 bg-dark text-white" onclick="showUser(${id})">
      <img src="${img}" class="card-img-top p-2 mx-auto d-block" style="width: 40%;">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <ul class="card-text list-group list-group-flush bg-dark">
          ${getLi(`Nombre de usuario: ${username}`)}
          ${getLi(`Edad: ${old}`)}
          ${getLi(`Cumpleaños: ${birthday}`)}
          ${getLi(`Email: ${email}`)}
        </ul>
      </div>
    </div>
    `;
}

async function showUsers() {
  let list = document.getElementById("pnlList");
  let url = "https://dummyjson.com/users";
  let fetched = await fetch(url);
  let { users } = await fetched.json();
  users.forEach((user) => {
    let { id, firstName, lastName, maidenName, age, email, username, birthDate, image } = user;
    let name = `${firstName} ${lastName} ${maidenName}`;
    list.innerHTML += userHtml(id, name, age, image, birthDate, username, email);
  });
}

function showUsername() {
  let stringQuery = window.location.search;
  let formQuery = new URLSearchParams(stringQuery);
  let name = formQuery.get("name");
  document.getElementById("lblUsername").innerHTML += name;
  console.log("Usuario -> ", name);
}

function showUser(id){
  location.href = `user.html?id=${id}`;
}

function logout() {
  location.href = `../index.html`;
}
