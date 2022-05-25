const titlteInput = document.getElementById('titlul');
const imgInput = document.getElementById('link-img');
const longInput = document.getElementById('desc-lung');
const shorInput = document.getElementById('desc-scurt');
const createBtn = document.getElementById('creare-btn');
const form = document.getElementById('creare-form');

createBtn.onclick = function (e) {

    e.preventDefault();

    if (form.checkValidity() == false) {
        form.reportValidity();
    } else {


        let data = new Date();

        let postare = {
            title: titlteInput.value,
            img:imgInput.value,
            short:shorInput.value,
            long:longInput.value,
            likes:[],
            username:user.displayName,
            created: data.getTime()
        }
        form.reset();
        postariDb.add(postare);
       
        alert("Postarea a fost adaugata!");
        window.location="postari.html";
    }
    
} 
auth.onAuthStateChanged(function(fuser) {
    if(isAdmin() == false)  {
        window.Location = "/index.html"
    }
})


// titlu
// Image URL
// descriere pe Scurt
// textul  postari
// likes ->[]
// createdTimeStamp 1231451230541
// username

