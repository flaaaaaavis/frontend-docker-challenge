let users;

function clearInputs() {
    document.querySelector('form').reset()
}

async function list() {
    const table = document.querySelector('table')
    const tbody = document.querySelector('tbody')

    users = await fetch('http://localhost:3000/list', {
        method: 'GET'
    }).then( response => {
        return response.json()
    }).then ( data => { // Aqui os dados saem como um array
        // console.log(data)
        clearInputs()
        return data
    })

    console.log(users)

    if(users.length > 0) {
        table.style.display = 'table'
    } else if (users.length == 0) {
        table.style.display = 'none'
    }

    tbody.innerHTML = ''

    let counter = -1;
    while (counter <= users.length) {
        counter = counter + 1;

        const user = users[counter];
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <tr>
                <td class="nameTd">${user.name}</td>
                <td class="emailTd">${user.email}</td>
                <td>
                    <button type="button" onclick="del()">Delete</button>
                </td>
            </tr>
        `
        tbody.append(tr)
    }
}

async function cadastrar() {
    console.log('clicou')
    

    try {
        let nameInput = document.getElementById('name').value
        let emailInput = document.getElementById('email').value

        console.log(nameInput)

        let body = {
            email: emailInput,
            name: nameInput
        }

        await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: Object.keys(body)
                .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
                .join('&')
        }).then( resposta => {
            return resposta.json()
        }).then ( json => {
            console.log(json)
            // clearInputs()
            list()
        })
    } catch (error) {
        alert('Falha na solicitação. Tente novamente')
    }
}


async function del() {
    users = await fetch('http://localhost:3000/delete', {
        method: 'POST',
        body: {
            email: document.querySelector('.emailTd').textContent
        }
    }).then( response => {
        return response.json()
    }).then ( data => {
        return data;
        clearInputs()
    })

    list()
}