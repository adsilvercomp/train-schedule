/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyArBZOIFmLOgDBvIgvf7MBpkHAFv6jyDqE",
    authDomain: "train-a4371.firebaseapp.com",
    databaseURL: "https://train-a4371.firebaseio.com",
    storageBucket: ""
};




firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var start = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
    var frequency = $("#frequency-input").val().trim();

    // Creates local "train" object for holding train data
    var newTrain = {
        name: trainName,
        destination: destination,
        start: start,
        frequency: frequency
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainFrequency = childSnapshot.val().frequency;
    var trainStart = childSnapshot.val().start;
    var trainDestination = childSnapshot.val().destination;

    // train Info
    console.log(trainName);
    console.log(trainFrequency);
    console.log(trainStart);
    console.log(trainDestination);

    // Prettify the train start
    var trainStartPretty = moment.unix(trainStart).format("HH:mm ");

    // Calculate the months worked using hardcore math
    // To calculate the months worked

    var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    console.log(empMonths);

    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Add each train's data into the 
    //remember to add start
    $("#time-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        "</td><td>" + frequency + "</td>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case