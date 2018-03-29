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

$("#time").on("click", function() {
  $(`#time`).css('border', 'green 5px solid')
})





// Importing timer object
var clockRunning = false;

// Create a timer for the game to run by
var stopwatch = {
  time: 0,
  reset: function () {
    // Stop's timer and sets time to zero, as well as prints beginning to the page
    stopwatch.stop();
    stopwatch.time = 0;
    $('#time').text("00:00:00");
  },
  start: function () {
    //  Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
      $('#time').text("00:00:00");
    }
  },
  stop: function () {
    //  Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  },
  count: function () {
    
      stopwatch.time++;
      // TODO - assign time to firebase database for network storage.
      var var2 = stopwatch.timeConverter(stopwatch.time);
      $('#time').text(var2);
    
  },
  timeConverter: function (t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    let hours = Math.floor(t / 3600);
    let minutes = t - (hours * 12);
    // var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
    // let hours = Math.floor(minutes / 60);

    // Default settings
    // var minutes = Math.floor(t / 60);
    // var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

        
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (hours === 0) {
      hours = "00";
    }

    else if (hours < 10) {
      hours = "0" + hours;
    }

    return hours + `:` + minutes + ":" + seconds;
  }
};



stopwatch.start();

// TO-Do's

// input for wage. 

// start button

// be able to see total made and also rate per second per minute etc

// every second see it add up into a bucket showing todays total.
// maybe database with much more history etc.











