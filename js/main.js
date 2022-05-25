const firebaseConfig = {
    apiKey: "AIzaSyDh-UkHuIGczO1ySvmhZq1HXhk1ajfKbCc",
    authDomain: "bloog-liceu.firebaseapp.com",
    projectId: "bloog-liceu",
    storageBucket: "bloog-liceu.appspot.com",
    messagingSenderId: "527745171220",
    appId: "1:527745171220:web:bb79208aeb8c8965b00c01",
    measurementId: "G-55P2XCMRRR"
  };

function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}


const yearElement = document.getElementById('year');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const postareBtn = document.getElementById('postare-btn');
const salutare = document.getElementById('username');

let user = null;
let admins =["aS2bHOIZxZUwtQqaj0ExmmDZQPk1", "pQrNs4tKPUQ89zSw0WsNGoL6Hyz1"];

// setam bazele firebase, ne conectam la serviciu
firebase.initializeApp(firebaseConfig);

// referinta la serviciul de autentificare
const auth = firebase.auth();

const db = firebase.firestore();
const postariDb = db.collection('postari');


// alegem providerul de logare -> Google
const provider = new firebase.auth.GoogleAuthProvider();
 
loginBtn.onclick =function() {
    console.log("logare...");
    auth.signInWithPopup(provider). then(function() {window.location.reload();});

}
logoutBtn.onclick = function() {
    auth.signOut();
    window.location.reload();
}
function isAdmin() {
    let admin;
    if(user == null)
    return false;
    admin = admins.includes(user.uid);
    return admin;
}
auth.onAuthStateChanged(function(fuser) {
     user = fuser;
     console.log(user);
     if (user !=null){
        //  logat 
        logoutBtn.style.display="block";
        loginBtn.style.display="none";

salutare.innerHTML =  "Salutare, " + user.displayName;

        if (isAdmin() == true) {
            postareBtn.style.display ="block";
        }
        else {
            postareBtn.style.display ="none";

        }
     }
     else {
        // nu i logat
        logoutBtn.style.display ="none";
        loginBtn.style.display ="block";
        postareBtn.style.display = "none";
    }
    document.querySelector("body").style.display ="block";
})

function formatDate(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
  
    let result = day + "-" + month + "-" + year;

    return result; 
}



if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getFullYear() + " ©";
}

