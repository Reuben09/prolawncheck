document.getElementById('routeForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  const routeTable = document.getElementById("routesTable");
  // Get form values
  const startAddr = document.getElementById('start_addr').value;
  const endAddr = document.getElementById('end_addr').value;
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
     address: startAddr
    },
    destination: {
      address: endAddr
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
    routeTable.style.display = "block";
    console.log('Response:', data);

    function populateTable(data) {
      const tableBody = document.querySelector('#routesTable tbody');
      tableBody.innerHTML = ''; // Clear existing data
  
      let totalDistance = 0;
      let totalDuration = 0;
  
      data.legs.forEach((leg, index) => {
        totalDistance += leg.distanceMeters;
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


const plusButton = document.getElementById("plus");
const stopPointsContainer = document.getElementById("stopPoints");
let stopPointCount = 1;

plusButton.addEventListener("click", function() {
  stopPointCount++;
  const newStopPointLabel = document.createElement("label");
  newStopPointLabel.setAttribute("for", "s" + stopPointCount + "_lat");
  newStopPointLabel.textContent = "Stop Point " + stopPointCount + ":";
  stopPointsContainer.appendChild(newStopPointLabel);
  stopPointsContainer.appendChild(document.createElement("br"));

  const newStopPointInput = document.createElement("input");
  newStopPointInput.setAttribute("type", "text");
  newStopPointInput.setAttribute("class", "stop_addr");
  newStopPointInput.setAttribute("name", "s" + stopPointCount + "_addr");
  newStopPointInput.setAttribute("value", "");
  newStopPointInput.setAttribute("required", "");
  stopPointsContainer.appendChild(newStopPointInput);
  stopPointsContainer.appendChild(document.createElement("br"));
});