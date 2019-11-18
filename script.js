// Write your JavaScript code here!
window.addEventListener("load", function(){
   let form = this.document.getElementById("launchForm");
   let pilot = document.querySelector("input[name=pilotName]");
   let coPilot = document.querySelector("input[name=copilotName]");
   let fuel = document.querySelector("input[name=fuelLevel]");
   let mass = document.querySelector("input[name=cargoMass]");
   let formSubmit = document.getElementById("formSubmit");
   let faultyItems = document.getElementById("faultyItems");
   let pilotName = document.getElementById("pilotStatus");
   let copilotName = document.getElementById("copilotStatus");
   let updatedFuel = document.getElementById("fuelStatus");
   let launch = document.getElementById("launchStatus");
   let updatedCargo = document.getElementById("cargoStatus");
   
   form.addEventListener("submit", function(){
    
      if (pilot.value === "" || coPilot.value === "" || fuel.value === "" || mass.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      }
      if (isNaN(pilot.value) === false || isNaN(coPilot.value) === false) {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      }
      if (isNaN(fuel.value) || isNaN(mass.value)) {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      }
   });

   formSubmit.addEventListener("click", function() {
      faultyItems.style.visibility = 'visible';
      pilotName.innerHTML = `Pilot ${pilot.value} Ready`;
      copilotName.innerHTML = `Co-pilot ${coPilot.value} Ready`;
      event.preventDefault();
      
      if (fuel.value < 10000){
         faultyItems.style.visibility = 'visible';
         updatedFuel.innerHTML = "Fuel level too low for launch";
         launch.innerHTML = "Shuttle not ready for launch";
         launch.style.color = "red";
         event.preventDefault();
      }

      if (mass.value > 10000) {
         faultyItems.style.visibility = 'visible';
         updatedCargo.innerHTML = "Cargo mass too high for launch";
         launch.innerHTML = "Shuttle not ready for launch";
         launch.style.color = "red";
         event.preventDefault();
      }

      if (fuel.value > 10000 && mass.value < 10000) {
         faultyItems.style.visibility = 'visible';
         launch.innerHTML = "Shuttle is ready for launch";
         launch.style.color = "green";
         updatedFuel.innerHTML = "Fuel level high enough for launch";
         updatedCargo.innerHTML = "Cargo mass low enough for launch";
         event.preventDefault();
      }
   });

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json) {
         const destination = document.getElementById("missionTarget");
            destination.innerHTML = `<h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[5].name}</li>
               <li>Diameter: ${json[5].diameter}</li>
               <li>Star: ${json[5].star}</li>
               <li>Distance from Earth: ${json[5].distance}</li>
               <li>Number of Moons: ${json[5].moons}</li>
            </ol>
               <img src="${json[5].image}">
            `;
      });
   });
});

