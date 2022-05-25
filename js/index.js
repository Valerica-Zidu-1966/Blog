const postsDiv = document.getElementById('postari');
const searchBtn = document.getElementById('search-btn');
const searchInput= document.getElementById('search-input');

searchBtn.onclick = function() {
    let text = searchInput.value;
    window.location = 'pages/postari.html?text=' + text;

}
searchInput.onkeydown = function(e) {
    if (e.keyCode == 13) {
        let text = searchInput.value;
        window.location = 'pages/postari.html?text=' + text;
    }
}

function getLastPosts() {
    postariDb.orderBy('created', 'desc')
        .limit(50).onSnapshot(processSnapshot);
}

function processSnapshot(snapshot) {
    let items = [];
    let docs = snapshot.docs;

    for (let i = 0; i < docs.length; i++) {
        let postare = {};

        postare.id = docs[i].id;
        postare.data = docs[i].data();
        items.push(postare);
    }

    renderPosts(items);
}
function renderPosts(items) {
    let html = "";

    for (let i = 0; i < items.length; i++) {

        let p = items[i];
        
        html += `
            <a class="postare" href="postare.html?id=${p.id}">
                    <img
                        src="${p.data.img}">
                    <div class="postare-info">
                        <h4>${p.data.title}</h4>
                        <p>
                            ${p.data.short}
                        </p>
                    <div class="sursa-postare">
                            <div class="sursa-info">
                                ${p.data.username}
                                <br />
                                ${formatDate(p.data.created)}
                            </div>
                        </div>

                        <div class="short-likes">
                            <i class="fas fa-heart"></i>
                            <span>${p.data.likes.length}</span>
                        </div>
                    </div>
                </a>
        `
    }

    postsDiv.innerHTML = html;

}
getLastPosts();
