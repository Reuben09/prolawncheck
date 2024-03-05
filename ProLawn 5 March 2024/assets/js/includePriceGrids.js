  // Function to load content using AJAX
  function loadContent(url, containerId) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Insert the loaded content into the container
            document.getElementById(containerId).innerHTML = xhr.responseText;
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

// Load content
loadContent('pricegrid1.html', 'pricegrid1');
loadContent('pricegrid2.html', 'pricegrid2');
loadContent('pricegrid3.html', 'pricegrid3');
loadContent('pricegrid4.html', 'pricegrid4');
loadContent('pricegridcomm.html', 'pricegridc');