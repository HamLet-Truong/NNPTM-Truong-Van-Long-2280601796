async function getData() {
    try {
        let res = await fetch('http://localhost:3000/posts');
        let posts = await res.json();
        let body = document.getElementById('table_body');
        body.innerHTML = '';
        for (const post of posts) {
            let style = post.isDeleted ? 'style="text-decoration: line-through"' : '';
            body.innerHTML += `<tr ${style}>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.views}</td>
                <td><input type='submit' value='Delete' onclick='Delete("${post.id}")'></td>
            </tr>`
        }
    } catch (error) {
        console.log(error);
    }
}

async function Save() {
    let id = document.getElementById('txt_id').value;
    let title = document.getElementById('txt_title').value;
    let views = document.getElementById('txt_views').value;

    if (id) {
        // Edit existing post
        let getItem = await fetch('http://localhost:3000/posts/' + id);
        if (getItem.ok) {
            let res = await fetch('http://localhost:3000/posts/' + id, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    views: views
                })
            })
            if (res.ok) {
                console.log("Cập nhật thành công");
                getData();
            }
        }
    } else {
        // Create new post with auto-increment ID
        let resAll = await fetch('http://localhost:3000/posts');
        let posts = await resAll.json();
        
        // Find max ID
        let maxId = 0;
        if (posts.length > 0) {
            maxId = Math.max(...posts.map(p => parseInt(p.id)));
        }
        let newId = (maxId + 1).toString();

        let res = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: newId,
                title: title,
                views: views,
                isDeleted: false
            })
        })
        if (res.ok) {
            console.log("Thêm mới thành công với ID: " + newId);
            getData();
        }
    }
}

async function Delete(id) {
    let res = await fetch('http://localhost:3000/posts/' + id, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isDeleted: true
        })
    })
    if (res.ok) {
        console.log("Xóa mềm thành công");
        getData();
    }
}

getData();


