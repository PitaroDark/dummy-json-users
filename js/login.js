document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();
    let username = document.getElementById('txtUser').value;
    let password = document.getElementById('txtPass').value;
    let body = { username, password };
    let fetched = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if(fetched.status != 200){
        alert('Las credenciales ingresadas son erroneas')
        document.getElementById('txtPass').value = ''
        return ;
    }
    let { firstName, lastName } = await fetched.json()
    let name = `${firstName} ${lastName}`
    location.href = `views/users.html?name=${name}`;
});