document.getElementById('routeForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  const routeTable = document.getElementById("routesTable");
  routeTable.style.display = "block";
  // Get form values
  const startAddr = document.getElementById('start_addr').value;
  const endAddr = document.getElementById('end_addr').value;
  const s1Addr = document.getElementById('s1_addr').value;
  const s2Addr = document.getElementById('s2_addr').value;
  const s3Addr = document.getElementById('s3_addr').value;
  const travelMode = document.getElementById('travelMode').value;
  const dept_time = document.getElementById('dept_datetime').value;

  var formattedDateTime = dept_time + ":00.000Z";
  console.log(formattedDateTime)

  // Construct data object
  const data = {
    origin: {
     address: startAddr
    },
    destination: {
      address: endAddr
    },
    intermediates: [
        {
        address: s1Addr
        },
        {
          address: s2Addr
        },
        {
          address: s3Addr
        },
    ],
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

  // Make API request
  fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': 'AIzaSyAazqreSmRAw3skYhVIjJYZO9kW8WCV7Ms',
      'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs,routes.optimizedIntermediateWaypointIndex'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Response:', data);

    function populateTable(data) {
      const tableBody = document.querySelector('#routesTable tbody');
      let totalDistance = 0;
      let totalDuration = 0;
  
      data.legs.forEach((leg, index) => {
        totalDistance += leg.distanceMeters;
        totalDuration += parseInt(leg.duration);
  
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${leg.distanceMeters}</td>
          <td>${leg.duration}</td>
          <td>${data.optimizedIntermediateWaypointIndex[index] !== undefined ? data.optimizedIntermediateWaypointIndex[index] : 'N/A'}</td>
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
