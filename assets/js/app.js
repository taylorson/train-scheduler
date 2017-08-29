 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyDhM5PBso5tOz0fKl8Q53f0vr9g4UpD2Lo",
     authDomain: "train-timer-ca587.firebaseapp.com",
     databaseURL: "https://train-timer-ca587.firebaseio.com",
     projectId: "train-timer-ca587",
     storageBucket: "train-timer-ca587.appspot.com",
     messagingSenderId: "500335492358"
 };
 firebase.initializeApp(config);

 var database = firebase.database();

 // Button for adding Trains
 $("#add-train").on("click", function(event) {
     event.preventDefault();

     // Grabs user input
     var name = $("#name-input").val().trim();
     var destination = $("#destination-input").val().trim();
     var time = moment($("#time-input").val().trim(), "DD/MM/YY").format("X");
     var frequency = $("#frequency-input").val().trim();

     // Creates local "temporary" object for holding data
     var newTrain = {
         name: name,
         destination: destination,
         time: time,
         frequency: frequency
     };

     // Uploads data to the database
     database.ref().push(newTrain);

     // Logs everything to console
     console.log(newTrain.name);
     console.log(newTrain.destination);
     console.log(newTrain.time);
     console.log(newTrain.frequency);
     console.log(moment().format("hh:mm"));

     // Clears all of the text-boxes
     $("#name-input").val("");
     $("#destination-input").val("");
     $("#time-input").val("");
     $("#frequency-input").val("");
 });

 // Create Firebase event for adding train to the database and a row in the html when a user adds an entry
 database.ref().on("child_added", function(childSnapshot, prevChildKey) {

     console.log(childSnapshot.val());

     // Store everything into a variable.
     var name = childSnapshot.val().name;
     var destination = childSnapshot.val().destination;
     var time = childSnapshot.val().time;
     var frequency = childSnapshot.val().frequency;

     // Train Info
     console.log(name);
     console.log(destination);
     console.log(time);
     console.log(frequency);

     // First Time 
     var firstTimeConverted = moment.unix(time, "hh:mm").subtract(1, "years");
     console.log(firstTimeConverted);
     // Current Time
     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
     // Difference between the times
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);
     // Time apart (remainder)
     var remainder = diffTime % frequency;
     console.log(remainder);
     // Minute Until Train
     var minutesAway = frequency - remainder;
     console.log("MINUTES TILL TRAIN: " + minutesAway);
     // Next Train
     var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

     // Add each train's data into the table
     $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
         frequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td><td>");


 });