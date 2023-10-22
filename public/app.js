document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;
        remove(id).then(()=> {
            const liElement = document.getElementById("div"+id);
            if (liElement) {
                liElement.remove();
            }
        })
    }

    if (event.target.dataset.type === 'update') {
        const id = event.target.dataset.id;
        const liElement = document.getElementById("li"+id);
        const text = liElement.innerText.trim();

        const title =  prompt("Введите новое значение",  text );

        if (title !== null) {
            update(id, title).then(()=> {
                liElement.innerText = title;
            })
        }
    }
})

async function remove (id) {
    await fetch (`/${id}`, {
        method: 'DELETE'
    })
}

async function update (id, title) {
     await fetch(`/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify ( {
            id: id,
            title: title
        })
    });
}
