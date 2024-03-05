document.getElementById('routeForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Get form values
  const startLat = document.getElementById('start_lat').value;
  const startLong = document.getElementById('start_long').value;
  const endLat = document.getElementById('end_lat').value;
  const endLong = document.getElementById('end_long').value;
  const s1Lat = document.getElementById('s1_lat').value;
  const s1Long = document.getElementById('s1_long').value;
  const s2Lat = document.getElementById('s2_lat').value;
  const s2Long = document.getElementById('s2_long').value;
  const s3Lat = document.getElementById('s3_lat').value;
  const s3Long = document.getElementById('s3_long').value;

  // Construct data object
  const data = {
    origin: {
      location: {
        latLng: {
          latitude: startLat,
          longitude: startLong
        }
      }
    },
    destination: {
      location: {
        latLng: {
          latitude: endLat,
          longitude: endLong
        }
      }
    },
    intermediates: [
      {
        location: {
          latLng: {
            latitude: s1Lat,
            longitude: s1Long
          }
        }
      },
      {
        location: {
          latLng: {
            latitude: s2Lat,
            longitude: s2Long
          }
        }
      },
      {
        location: {
          latLng: {
            latitude: s3Lat,
            longitude: s3Long
          }
        }
      }
    ],
    travelMode: "DRIVE",
    routingPreference: "TRAFFIC_AWARE",
    departureTime: "2024-10-15T15:01:23.045123456Z",
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
      'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs,routes.routeLabels'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Response:', data);
    
    let routesInfoHTML = '<h2>Routes Information(Stop point 4 is the endpoint)</h2>';
    
    // Loop through each route
    data?.routes?.forEach((route, index) => {
      let routeHTML = `<div></div>`;
      
      // Display initial distance
      routeHTML += `<p>Total Distance and duration: ${route.distanceMeters} meters and ${route.duration} seconds</p>`;
      
      // Loop through each intermediate point
      route.legs.forEach((intermediate, intermediateIndex) => {
        // Calculate distance from starting point to intermediate point
        const distanceToIntermediate = route.legs[intermediateIndex].distanceMeters;
        const durationToIntermediate = route.legs[intermediateIndex].duration;
        // Display distance to intermediate point
        routeHTML += `<p>Distance to Stop Point ${intermediateIndex + 1}: ${distanceToIntermediate} meters and ${durationToIntermediate} seconds</p>`;
      });
      
      routeHTML += '</div>';
      
      // Append route HTML to overall routesInfoHTML
      routesInfoHTML += routeHTML;
    });
    
    // Display routes information in HTML
    document.getElementById('routesInfo').innerHTML = routesInfoHTML;
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
