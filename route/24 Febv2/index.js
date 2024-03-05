

const startAddr = document.getElementById('start_addr');
const endAddr = document.getElementById('end_addr');
const totalStopPoints = document.getElementById('total-stopPoints');
let data;

async function load() {
  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbwcc3BEgy0GZygaEKQae2CkZhWGpJFewSFuxRtLjIh7KBGgbbzehCw6KaeumIBuAPbuQA/exec"
  );
  //   console.log(response);
  data = await response.json();
  console.log(data)
  const firstStartingPoint = data[0]["starting-point"];
  const firstStopPoint = data[0]["Stop-Points"];
  const numStopPoints  = data[0]["Num-Stop-Points"];
  startAddr.value = firstStartingPoint;
  endAddr.value = firstStopPoint;
  totalStopPoints.innerHTML = numStopPoints;

  const stopPointsContainer = document.getElementById("stopPoints");

for (const key in data) {
  if (key !== '0') {
  const stopPoint = data[key];

  const label = document.createElement('label');
  label.textContent = 'Stop Point ' + key + ':';
  stopPointsContainer.appendChild(label);
  stopPointsContainer.appendChild(document.createElement('br'));

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('class', 'stop_addr');
  input.setAttribute('name', 'stop_addr_' + key);
  input.value = stopPoint['Stop-Points']; // Set the value from the data
  stopPointsContainer.appendChild(input);
  stopPointsContainer.appendChild(document.createElement('br'));
  }
}
}

load();


document.getElementById('routeForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  const routeTable = document.getElementById("routesTable");
  // Get form values
  const travelMode = document.getElementById('travelMode').value;
  const dept_time = document.getElementById('dept_datetime').value;

  var formattedDateTime = dept_time + ":00.000Z";
  console.log(formattedDateTime)

  const dataIntermediates = []; // Array to store intermediate stop points

  // Get all input elements with class "stop_addr"
  const stopInputs = document.querySelectorAll(".stop_addr");
  stopInputs.forEach(function(input) {
    // Get the value of each input and add it to intermediates array
    dataIntermediates.push({
      address: input.value
    });
  });

  console.log(dataIntermediates);

  // Construct data object
  const dataAddress = {
    origin: {
     address: startAddr.value
    },
    destination: {
      address: endAddr.value
    },
    intermediates: dataIntermediates,
    travelMode: travelMode,
    routingPreference: "TRAFFIC_AWARE",
    optimizeWaypointOrder: "true",
    departureTime: formattedDateTime,
    computeAlternativeRoutes: false,
    routeModifiers: {
      avoidTolls: false,
      avoidHighways: false,
      avoidFerries: false
    },
    languageCode: "en-US",
    units: "IMPERIAL"
  };
  
  
  function getAddress(index, dataAddress) {
    if (index >= 0 && index < dataAddress.intermediates.length) {
        return dataAddress.intermediates[index].address;
    } else {
        return 'N/A';
    }
}


  // Make API request
  fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': 'AIzaSyAazqreSmRAw3skYhVIjJYZO9kW8WCV7Ms',
      'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs,routes.optimizedIntermediateWaypointIndex'
    },
    body: JSON.stringify(dataAddress)
  })
  .then(response => response.json())
  .then(data => {
    routeTable.style.display = "flex";
    console.log('Response:', data);

    function populateTable(data) {
      const tableBody = document.querySelector('#routesTable tbody');
      tableBody.innerHTML = ''; // Clear existing data
  
      let totalDistance = 0;
      let totalDuration = 0;
  
      data.legs.forEach((leg, index) => {
        totalDistance += parseInt(leg.distanceMeters);
        totalDuration += parseInt(leg.duration);
        let optimizedIndex = data.optimizedIntermediateWaypointIndex[index];
  
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${getAddress(index, dataAddress)}</td>
          <td>${leg.localizedValues.distance.text}</td>
          <td>${leg.localizedValues.duration.text}</td>
          <td>${optimizedIndex !== undefined ? optimizedIndex : 'N/A'}</td>
          `;
        tableBody.appendChild(row);
      });
  
      // Populate total distance and duration
      document.getElementById('totalDistance').textContent = totalDistance;
      document.getElementById('totalDuration').textContent = totalDuration + 's';
    }
  
    // Call the function to populate the table
    populateTable(data.routes[0]);
    
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
