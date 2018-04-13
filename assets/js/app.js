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

// storing my is as a variable because i can't figure out cors issue
var myID = "VspYPh88CaSLRA9J4MnftYJZeY23";

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
  user = null;
  console.log("test");
});

//creating a function to build new timers to the page
//TODO - build in functionality for a key, so that this object can be referenced by the key in teh database object.
function newTimer(name) {

  // pieces of the timer object
  var timeObject = $('<div>');
  var timeName = $('<p>' + name + '</p>');
  var time = $('<p>00:00:00</p>');
  var totTime = $('<p>Total Time: 00:00:00</p>');
  var startButton = $('<button class="btn btn-primary">Start</button>');
  var pauseButton = $('<button class="btn btn-secondary">Pause</button>');

  // appending pieces together

  timeObject.append(timeName);
  timeObject.append(time);
  timeObject.append(totTime);
  timeObject.append(startButton);
  timeObject.append(pauseButton);

  return timeObject;

}

//testing function
$('#timer-fill').prepend(newTimer('billyjoe'));




// Add a reatime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    user = firebaseUser;
    console.log(firebaseUser)
    console.log("is this working?")
    console.log(firebaseUser.email)
    // console.log(firebaseUser.Kb.I)
    logOut.classList.remove("hide");
    $("#userName").text("Hi " + firebaseUser.email + "!");

    // listener for data
    // firebase.database().ref('/users/' + myID).on('value', function (snapshot) {
    //   console.log(snapshot.val() + " wizard");
    // });


    // TODO - this is pulling data from teh database just fine. for every project that is in the database we need to load a new timer in the paused status and append it to the screen. ordered by date added is just fine

    db.ref('/users/' + myID).orderByChild("dateAdded").on("child_added", function (snapshot) {
      var sv = snapshot.val();

      console.log(sv.dateAdded + `date`);
      console.log(sv.projectName + ` name`);
    })











  } else {
    console.log('not logged in');
    firebaseTest();
    // console.log(firebaseUser)
    logOut.classList.add("hide");
    $("#userName").html("<a href='sign-in.html'>Hi! Click to Log In</a>");
  }
});


// **************************** END USER AUTHENTICATION ********************************

$("#timer").on("click", function () {
  $(`#timer`).css('border', 'green 5px solid')
})


function firebaseTest() {

  //first thing is to write data

  // update it by referencing the key
  var newPostKey = firebase.database().ref().push().key;

  var postData = {
    time: 0,
    projectName: `Jimmy's Timer`,
    key: newPostKey,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };


  // this test will be called after the auth checks if there is a user

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/timers/' + newPostKey] = postData;
  updates['/user-timers/' + myID + '/' + newPostKey] = postData;

  firebase.database().ref().update(updates);


  //secondly i'm going to need to read from the database

// create listener to catch changes in the database
db.ref('/user-timers/' + myID + '/').orderByChild('dateAdded').on("child_added", function(snapshot) {
  // Variable to store response from database
  var sv = snapshot.val();

  console.log(JSON.stringify(sv.key) + 'reading database test');
  // console.log(sv.key + ' key');
  


});





  //thirdly i need to be able to update and point to a particular timer object




}
















// Modal Button Functionality for adding Project
$("#projectSubmit").on('click', function () {
  event.preventDefault();
  // capture input from  user
  let projectName = $('#projectName').val().trim();



  // if (user === null || user == undefined){
  //   console.log("noone is logged in to store data for");
  // } else {


  console.log(newPostKey);

  // a good example of pushing data to the database  
  db.ref("users/" + myID).push({
    projectName: projectName,
    time: 0,
    key: newPostKey,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  })

  // 04-11-18 next thing i need to be able to do is to update this data and to be able to filter current time objects by key







  // var updates = {};
  // updates['/users/' + myID + "/-L9r-OpNLpxTDuaVTGh0" + "/time"] = 19;
  // // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  // firebase.database().ref().update(updates);


  // how to find specific timer object


  // currently my database is built like this. i have a pool of data that i keep just pushing new objects into, which can be organized by most recent. however this becomes inconvenient when trying to update information because it's hard to point at objects.

  // to fix this i'm going to create a section for timers like this

  // users/timers/

  // then when a new timer is created it will set data for that like this

  // users/timers/key-token

  // then inside of that there will be the json object which contains all o the goodies.

  // this will then make available the option to save the key-token to the html object when it is created, and then when the timer is clicked or whatever we can reference the corect timer object in the database.







  // }

  // setting timer variables to firebase server
  // variables include
  // name
  // username of owner
  // time will be handled in stopwatch object
  // one time pull of totaltime
  // time will push new objects every day


  // db.ref("users/" + myID).push({
  //   projectName: projectName,
  //   dateAdded: firebase.database.ServerValue.TIMESTAMP
  // })

})



// playing with firebase database handling

$("#accountSubmit").on("click", function () {

  //  if (user === null || user == undefined){
  //    console.log("noone is logged in to store data for");
  //  } else {


  // db.ref("users/" + myID).push({
  //   projectName: projectName,
  //   dateAdded: firebase.database.ServerValue.TIMESTAMP
  // })




  //  }



})

// Here is the structure I'm going to use for storing the data to our warehouse
// setting user id
//var userId = firebase.auth().currentmyID;
// set data
//firebase.database().ref('users/' + userId).set({
//username: "name",
//email: "email",
//profile_picture: "imageUrl"
//});


// changing some data
//var updates = {};
//updates['/users/moGczXfHVRc6S8WvKeBRne7NN6o2/email'] = "testemail";
//firebase.database().ref().update(updates);



// listener for data
//firebase.database().ref('/users/' + userId + '/email').on('value', function (snapshot) {
//  console.log(snapshot.val() + " wizard");
//});






















































































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
    let newNumber = t - (hours * 60 * 60);
    var minutes = Math.floor(newNumber / 60);

    var seconds = newNumber - (minutes * 60);

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
    console.log(seconds, minutes, hours);

    return hours + `:` + minutes + ":" + seconds;
  }
};

// TO-Do's
// every second save time to firebase for network storage
// save second variable, link it to the day that you started the timer
// be able to work with multiple days and count the total time for timer






// add functionality for add project button for naming and such
// on click function that starts timer and stops it as well
// network listener looks for project opened by user and pulls time if they have a project.
