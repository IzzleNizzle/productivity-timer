// Initialize Firebase
var config = {
  apiKey: "AIzaSyABRXDoxPgzP_Mm3_hG8ETPnm0c2P_e3kM",
  authDomain: "productivity-timer-18ca6.firebaseapp.com",
  databaseURL: "https://productivity-timer-18ca6.firebaseio.com",
  projectId: "productivity-timer-18ca6",
  storageBucket: "",
  messagingSenderId: "602162324986"
};
firebase.initializeApp(config);
//shortcut reference for firebase database
var db = firebase.database();



// **************************** USER AUTHENTICATION ********************************

// Variables with user authentication
const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => { });
var logOut = document.getElementById("btnLogOut");

// Get Elements
var txtEmail;
var txtPassword;
var user;


// Add login event
$("#btnLogin").on("click", function () {

  // Get email and pass
  txtEmail = $("#txtEmail").val();
  txtPassword = $("#txtPassword").val();
  // Sign in 
  const promise = auth.signInWithEmailAndPassword(txtEmail, txtPassword);
  promise.catch(e => console.log(e.message));
})

// Add Sign up event
$("#btnSignUp").on("click", function () {
  // Get email and pass
  txtEmail = $("#txtEmail").val().trim();
  txtPassword = $("#txtPassword").val().trim();
  // Sign up 
  const promise = auth.createUserWithEmailAndPassword(txtEmail, txtPassword);
  promise.catch(e => console.log(e.message));
})



// Add Sign out event
$("#btnLogOut").on("click", function () {
  // Sign out 
  firebase.auth().signOut();
  console.log("test");
});


// Add a reatime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    user = firebaseUser;
    console.log(firebaseUser)
    console.log("is this working?")
    console.log(firebaseUser.email)
    console.log(firebaseUser.uid)
    // console.log(firebaseUser.Kb.I)
    logOut.classList.remove("hide");
    $("#userName").text("Hi " + firebaseUser.email + "!");
  } else {
    console.log('not logged in');
    console.log(firebaseUser)
    logOut.classList.add("hide");
    $("#userName").html("<a href='sign-in.html'>Hi! Click to Log In</a>");
  }
});


// **************************** END USER AUTHENTICATION ********************************
