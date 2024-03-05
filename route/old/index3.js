let map; // Declare map in the global scope

const data = {
  origins: [
    {
      waypoint: {
        location: {
          latLng: {
            latitude: 37.040753,
            longitude: -76.29769
          }
        }
      },
      routeModifiers: { avoid_ferries: true }
    }
  ],
  destinations: [
    {
        location: {
          latLng: {
            latitude: 37.040753,
            longitude: -76.29769
          }
        }
      
    },
    {
      waypoint: {
        location: {
          latLng: {
            latitude: 37.040019,
            longitude: -76.3187965
          }
        }
      }
    },



    {
      waypoint: {
        location: {
          latLng: {
            latitude: 37.048459,
            longitude: -76.2998775
          }
        }
      }
    },
    {
      waypoint: {
        location: {
          latLng: {
            latitude: 36.9864,
            longitude: -76.4165
          }
        }
      }
    }
  ],
  travelMode: "DRIVE",
  routingPreference: "TRAFFIC_AWARE"
};

function initMap() {
  console.log("initMap called");
  var options = {
    zoom: 13,
    center: { lat: 37.040753, lng: -76.29769 }
  };

  // New map
  map = new google.maps.Map(document.getElementById('map'), options);

  // Add markers
  addMarker({ lat: 37.048459, lng: -76.2998775 });
  addMarker({ lat: 37.040019, lng: -76.3187965 });
  addMarker({ lat: 36.9864, lng: -76.4165 });

  function addMarker(coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: map
    });
  }

  fetch('https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': 'AIzaSyAazqreSmRAw3skYhVIjJYZO9kW8WCV7Ms', // Replace with your API key
      'X-Goog-FieldMask': 'originIndex,destinationIndex,duration,distanceMeters,status,condition'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(responseData => {
    console.log('Response:', responseData);

    const dataRows = document.getElementById('dataRows');

    // Function to add a row to the table
    function addRow(data) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${data.originIndex}</td>
        <td>${data.destinationIndex}</td>
        <td>${data.status ? JSON.stringify(data.status) : data.condition}</td>
        <td>${data.distanceMeters}</td>
        <td>${data.duration}</td>
      `;
      dataRows.appendChild(row);
    }

    // Add rows for each data item
    responseData.forEach(addRow);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
