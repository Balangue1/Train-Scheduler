// Initialize firebase
var config = {
    apiKey: "AIzaSyAG9ie5dXoyKh2FrEatsaO5YyiJBWrkaQE",
    authDomain: "train-scheduler-7626f.firebaseapp.com",
    databaseURL: "https://train-scheduler-7626f.firebaseio.com",
    projectId: "train-scheduler-7626f",
    storageBucket: "train-scheduler-7626f.appspot.com",
    messagingSenderId: "653021632819"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  var trainDB = database.ref("/trains");
  
  //add train event
  $("#add-train").click(function(event){
  
    event.preventDefault();
    var name = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var frequency = $("#train-frequency").val().trim();
//    var arrival = $("#train-arrival").val().trim();
//    var minutes = $("#train-minutes").val().trim();
    var start = $("#first-train-time").val().trim();
//    var rate = parseInt($("#employee-monthly-pay").val().trim());
    //input validation for salary
//    if(isNaN(rate)){
//      $("#employee-monthly-pay").after("Please enter a number");
//      return false;
//    }

    //push to firebase
    trainDB.push({
      name,
      destination,
      frequency,
//      arrival,
//      minutes,
      start
//      rate
    })
  
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-frequency").val("");
    $("#train-arrival").after("");
    $("#train-minutes").after("");
    $("#first-train-time").val("");
});

// update table event here
  
  //update table event
  trainDB.on("child_added", function(childSnapshot){
  
    var data = childSnapshot.val();
  
    var trainName = data.name;
    var trainDestination = data.destination;
    var trainFrequency = data.frequency;
//    var trainArrival = data.arrival;
//    var trainMinutes = data.minutes;
    var firstTrainTime = data.firstTrainTime;
    //do the math
console.log(firstTrainTime);
// First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

// Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

// Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    //Write to DOM
    var tRow = $("<tr>");
    tRow.append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),

      $("<td>").text(firstTrainTime)
//      $("<td>").text(employeeRate),
//      $("<td>").text(totalPaid),
    );
  
    $("#train-table").append(tRow);


})











//    $("#employee-monthly-pay").after("");
    // Telling Time

    // Assumptions
//    var tFrequency = 3;

    // Time is 3:30 AM
//    var firstTime = "03:30";
//---console.log(start);
// First Time (pushed back 1 year to make sure it comes before current time)
//---var firstTimeConverted = moment(start, "HH:mm").subtract(1, "years");
//---console.log(firstTimeConverted);

// Current Time
//---var currentTime = moment();
//---console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
//---var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//---console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
//---var tRemainder = diffTime % frequency;
//---console.log(tRemainder);

// Minute Until Train
//---var tMinutesTillTrain = frequency - tRemainder;
//---console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
//---var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//---console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    



