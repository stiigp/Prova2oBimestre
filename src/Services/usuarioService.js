const url = 'https://backend-bcc-2-b.vercel.app/usuario'

export async function gravar(usuario) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
    });
    return await res.json();
}

export async function deletar(usuario) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
    });
    return await res.json();
}

export async function atualizar(usuario) {
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
    });
    return await res.json();
}

export async function consultar(termo) {
    if (!termo)
        termo = "";
    const res = await fetch(url + termo, {
        method: 'GET',
    });
    return await res.json();
}

export async function autenticar(nickname, senha) {
    const res = await fetch(url + "login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, senha })
    });
    return await res.json();
}
