  // Initialize the Google Places Autocomplete service
  function initAutocomplete() {
    var input = document.getElementById("address");
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", function () {
      var place = autocomplete.getPlace();

      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }

      console.log(place); // You can use the place object as needed
    });
  }