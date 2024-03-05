//WOW Scroll Spy
var wow = new WOW({
  //disabled for mobile
  mobile: false,
});
wow.init();

// Get the modal
var modal = document.getElementById("myPopUp");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


document.addEventListener('DOMContentLoaded', function() {

  function toggleVisibility() {
    var container = document.getElementById("wordsLinksContainer");
    var yesRadio = document.getElementById("yesRadio");

    // If 'Yes' is selected, show the container, otherwise hide it
    if (yesRadio.checked) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  }

  // <p>Can this button replace one above</p>
  // Add event listeners to the radio buttons
  document.getElementById("noRadio").addEventListener("change", toggleVisibility);
  document.getElementById("yesRadio").addEventListener("change", toggleVisibility);

  // Initially call the function to set the initial visibility
  toggleVisibility();


  function submitForm() {
    var response = grecaptcha.getResponse();
    if (response.length === 0) {
      alert('Please complete the reCAPTCHA.');
    } else {
      // Proceed with enabling the button
      enableSubmit();
      // Additional actions if needed
      formChanged();
    }
  }

  // Function to enable the submit button after ReCaptcha is completed
  function customCallback() {
      document.getElementById('nextButton2').removeAttribute('disabled');
  }
// When the user clicks on the button, open the modal
// btn.onclick = function () {
//   modal.style.display = "block";
// };


function showPricingtable(){

  var cusType = document.getElementById("servicePlan").getAttribute("value");
                // Hide all pricing tables
                const ids = ['r1', 'r2', 'r3', 'r4', 'c'];

                console.log('cusType:', cusType);

                ids.forEach(id => {
                  const element = document.getElementById(id);
                  if (element) {
                    element.style.display = 'none';
                  }
                });
                document.getElementById('res-intro').style.display = 'none';
                document.getElementById('comm-intro').style.display = 'none';



                // Show the pricing table based on cusType
                switch (cusType) {
                  case 'r1':
                    document.getElementById('r1').style.display = 'block';
                    document.getElementById('res-intro').style.display = 'block';
                    break;
                  case 'r2':
                    document.getElementById('r2').style.display = 'block';
                    document.getElementById('res-intro').style.display = 'block';
                    break;
                  case 'r3':
                    document.getElementById('r3').style.display = 'block';
                    document.getElementById('res-intro').style.display = 'block';
                    break;
                  case 'r4':
                    document.getElementById('r4').style.display = 'block';
                    document.getElementById('res-intro').style.display = 'block';
                    break;
                  case 'c':
                    document.getElementById('c').style.display = 'block';
                    document.getElementById('comm-intro').style.display = 'block';
                    break;
                  default:
                    console.error('Invalid cusType:', cusType);
                }
              }
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

  });

  function r1_button() {

    var productCode = "r1";
    
    document.getElementById("servicePlan").value = productCode;
    document.getElementById("productCode").value = productCode;
    showPricingtable();
    nextPage(); // Pass the value of r1 to the nextPage function
  }

  function r2_button() {

    var productCode = "r2";
    console.log(productCode);
    document.getElementById("servicePlan").value = productCode;
    document.getElementById("productCode").value = productCode;
    showPricingtable();
    nextPage(); // Pass the value of r2 to the nextPage function
  }

  // Assuming r3_button() function exists
  function r3_button() {

    var productCode = "r3";
    console.log(productCode);
    document.getElementById("servicePlan").value = productCode;
    document.getElementById("productCode").value = productCode;
    showPricingtable();
    nextPage(); // Pass the value of r3 to the nextPage function
  }

  // Assuming r3_button() function exists
  function r4_button() {

var productCode = "r4";
console.log(productCode);
document.getElementById("servicePlan").value = productCode;
    document.getElementById("productCode").value  = productCode;
    showPricingtable();
nextPage(); // Pass the value of r4 to the nextPage function
}

// Assuming r4_button() function exists
function cbutton() {

var productCode = "c";
console.log(productCode);
document.getElementById("servicePlan").value  = productCode;
    document.getElementById("productCode").value  = productCode;
    showPricingtable();
nextPage(); // Pass the value of c1 to the nextPage function
}

  function nextPage() {
    var initialContent = document.getElementById("initialContent");
    var contentToToggle = document.getElementById("contentToToggle");

    if (contentToToggle.classList.contains("hidden")) {
      initialContent.classList.add("hidden");
      contentToToggle.classList.remove("hidden");
    } else {
      initialContent.classList.remove("hidden");
      contentToToggle.classList.add("hidden");
    }

    // Hide the button with the ID corresponding to the productCode value
    // document.getElementById(productCode).style.display = "none";
  }




  let allButton = document.getElementById("all");
  allButton.addEventListener('click', function () {
    var pricingColumns = document.querySelectorAll(".pricing-column");
    pricingColumns.forEach(function (column) {
      column.style.display = "block";
    });
  });

  let residentialButton = document.getElementById("residential");
  residentialButton.addEventListener('click', function () {
    var residentialColumns = document.querySelectorAll(".residential");
    var pricingColumns = document.querySelectorAll(".pricing-column");
    pricingColumns.forEach(function (column) {
      // Hide all pricing columns
      column.style.display = "none";
    });
    residentialColumns.forEach(function (column) {
      // Display only residential columns
      column.style.display = "block";
    });
  });

  let commercialButton = document.getElementById("commercial");
  commercialButton.addEventListener('click', function () {
    var residentialColumns = document.querySelectorAll(".commercial");
    var pricingColumns = document.querySelectorAll(".pricing-column");
    pricingColumns.forEach(function (column) {
      // Hide all pricing columns
      column.style.display = "none";
    });
    residentialColumns.forEach(function (column) {
      // Display only residential columns
      column.style.display = "block";
    });
  });
  // Manually trigger the togglePricingColumn function on page load
  //window.onload = togglePricingColumn;

  document.getElementById("nextButton2").addEventListener("click", function () {
    // Toggle the display of the content
    var initialContent = document.getElementById("contentToToggle");
    var contentToToggle = document.getElementById("contentToToggle2");
    if (contentToToggle.classList.contains("hidden")) {
      initialContent.classList.add("hidden");
      contentToToggle.classList.remove("hidden");
    } else {
      initialContent.classList.remove("hidden");
      contentToToggle.classList.add("hidden");
    }
    // document.getElementById("nextButton2").style.display = "none";
  });


  document.getElementById("backButton2").addEventListener("click", function () {
    // Toggle the display of the content
    var initialContent = document.getElementById("contentToToggle2");
    var contentToToggle = document.getElementById("contentToToggle");
    if (contentToToggle.classList.contains("hidden")) {
      initialContent.classList.add("hidden");
      contentToToggle.classList.remove("hidden");
    } else {
      initialContent.classList.remove("hidden");
      contentToToggle.classList.add("hidden");
    }
    //document.getElementById("backButton2").style.display = "none";
  });



  function initAutocomplete() {
    var input = document.getElementById('address');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();

      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }

     


    });
  }


  const scriptURL = 'https://script.google.com/macros/s/AKfycbydi8kIi5HO7vjtdV6DBt73UOLtQUGnZbWN-ssU861lQmB5dUCNwb3mj3GXu_r3Jv1C/exec'


  const form = document.forms['customerData']
  form.addEventListener('submit', e => {
    e.preventDefault();
    formChanged();

    
    document.getElementById("nextButton2").innerText = "Analyzing...";
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        // Reset button text to "Next" after successful submission
        document.getElementById("nextButton2").innerText = "Next";


      })
      .catch(error => {
        alert('Error!', error.message)
        document.getElementById("nextButton2").innerText = "Next";
      })

  })
function formChanged(productCode) {
  ///Get custom variables
  var formData = {}; // Object to store form data

    // Get the values of form fields
    formData.customerName = document.getElementById("CustomerName").value;
    formData.customerEmail = document.getElementById("CustomerEmail").value;
    formData.phone = document.getElementById("phone").value;
    //formData.address = document.getElementById("address").value;
    formData.dayOfService = document.getElementById("serviceDay").value;
    formData.servicePlan = document.getElementById("servicePlan").textContent; // Add product code data
    formData.productCode = document.getElementById("productCode").value; // Add product code data

    // Determine zip code from the address input field

    var dayOfService = ""; // Initialize service day variable

    let zipCode = "";




    initAutocomplete();


for (const component of place.address_components) {
// @ts-ignore remove once typings fixed
const componentType = component.types[0];

switch (componentType) {
case "postal_code": {
  zipCode = `${component.long_name}${zipCode}`;
  break;
}

}
}

console.log(place.formatted_address); // You can use the place object as needed

console.log(zipCode);

document.getElementById("ServiceAddress").innerHTML = place.formatted_address;
document.getElementById("ServicezipCode").innerHTML = zipCode;


    // Check if a zip code is found
    if (zipCode) {
      zipCode = zipCode[0]; // Extract the zip code from the match
      // Determine day of service based on zip code
      switch (zipCode) {
        case "23664":
          dayOfService = "Thursday";
          break;
        case "23661":
          dayOfService = "Wednesday";
          break;
        case "23607":
          dayOfService = "Out of service area";
          break;
        default:
          dayOfService = "Unknown";  // "Unknown" OR "Out of service area"
      }
    } else {
      dayOfService = "Unknown"; // If no valid zip code is found  "Unknown" OR "Out of service area"
    }

    formData.dayOfService = dayOfService;

    console.log(dayOfService);
    console.log(formData); // Optional: Log form data to console
  }


  var noRadio = document.getElementById('noRadio');
  var yesRadio = document.getElementById('yesRadio');
  var servicesPricesDiv = document.querySelector('.servicesPrices');

  function updateVisibility() {
    servicesPricesDiv.style.display = yesRadio.checked ? 'block' : 'none';
  }

  noRadio.addEventListener('change', updateVisibility);
  yesRadio.addEventListener('change', updateVisibility);

var myCheckbox = document.getElementById('switch_checkbox');
var servicesPricesDiv = document.querySelector('.servicesPrices');

myCheckbox.addEventListener('change', function() {
  servicesPricesDiv.style.display = this.checked ? 'block' : 'none';
});