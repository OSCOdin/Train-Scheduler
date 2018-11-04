$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyACFRgnx3lRS_zB0J-jUnBJQIbO0ND-jrw",
    authDomain: "hw7-train-scheduler.firebaseapp.com",
    databaseURL: "https://hw7-train-scheduler.firebaseio.com",
    projectId: "hw7-train-scheduler",
    storageBucket: "hw7-train-scheduler.appspot.com",
    messagingSenderId: "17956980781"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  function showTrains() {
    database.ref().on("child_added", function (snapshot) {
      console.log(snapshot.val());
      var tFrequency = snapshot.val().FrequencyOfTrain;
      var tFirst = snapshot.val().FirstArrivalOfTrain;
      var firstTimeConverted = moment(tFirst, "HH:mm").subtract(1, "years");
      var currentTime = moment();
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % tFrequency;
      var tMinutesTillTrain = tFrequency - tRemainder;
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var rowHolder = $("<tr>");
      var nameDisplay = $("<th>").text(snapshot.val().NameOfTrain);
      var destinationDisplay = $("<td>").text(snapshot.val().DestinationOfTrain);
      var frequencyDisplay = $("<td>").text(tFrequency);
      var nextTrainDisplay = $("<td>").text(nextTrain);
      var minutesAwayDisplay = $("<td>").text(tMinutesTillTrain);
      rowHolder.append(nameDisplay, destinationDisplay, frequencyDisplay, nextTrainDisplay, minutesAwayDisplay);
      $("#TrainTable").append(rowHolder);
    })
  }
  showTrains()


  $("#submit").on("click", function (event) {
   
    var trainName = "";
    var destination = "";
    var firstTrain = "";
    var frequency = "";

    console.log("hoi");
    trainName = $("#nameInput").val();
    destination = $("#destinationInput").val();
    firstTrain = $("#firstInput").val();
    frequency = $("#frequencyInput").val();

    database.ref().push({
      NameOfTrain: trainName,
      DestinationOfTrain: destination,
      FirstArrivalOfTrain: firstTrain,
      FrequencyOfTrain: frequency,
    })

    $("#nameInput").val("");
    $("#destinationInput").val("");
    $("#firstInput").val("");
    $("#frequencyInput").val("");

    
    console.log(trainName, destination, firstTrain, frequency);
  })

})