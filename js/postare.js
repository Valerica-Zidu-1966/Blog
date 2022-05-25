const postareSection = document.getElementById('postare-section');

const url = new URL(document.location);
let id = url.searchParams.get("id");
let postare;
postariDb.doc(id).get().then(renderPost);

function renderPost(doc) {
     postare = doc.data();
    let deleteBtn ='';
    if (isAdmin() == true) {
    deleteBtn = `<div onclick="deletePost()" class="delete"><i class="fas fa-trash"></i></div>`;
    }
    let html = `
    <div class="postare-full">
                 ${deleteBtn}

                <div class="likes" onclick="like()">
                    <i class="far fa-heart" id="no-like"></i>
                    <i class="fas fa-heart" id="yes-like"></i>
                    <span id="likes-count">${postare.likes.length}</span>
                </div>

                <h1 class="centered">${postare.title}</h1>
                <img
                    src="${postare.img}">
                <p>
                   ${postare.long}
                </p>

                <br/>
                <span> <i>Creat de: </i></span>
               <i>${postare.username}</i>
                <br>
                <span id="data">${formatDate(postare.created)}</span>
        </div>

    `;
    postareSection.innerHTML = html;

   if (user != null && postare.likes.includes(user.uid) ) {
        document.getElementById('no-like').style.display = 'none';
    }
    else {
        document.getElementById('yes-like').style.display = 'none';
    }



}

function deletePost() {
    let confirmare = confirm("Sunteti sigur ?");
    if (confirmare == true){
        postariDb.doc(id).delete().then();
       
    }
}
 function showPostari() {
     window.location = "postari.html";
 }

 function refresh() {
    window.location.reload();
}

 function like() {

    if (postare.likes.includes(user.uid) == false) {
        postariDb.doc(id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(user.uid)
        }).then(refresh)
    }
    else {
        postariDb.doc(id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(user.uid)
        }).then(refresh)
    }

    
}
