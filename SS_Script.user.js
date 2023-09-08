// ==UserScript==
// @name         SS_Script
// @namespace    http://tampermonkey.net/
// @version      1.1.6
// @description  Adds a break and hyperlink to the SS video description
// @match        https://ship15.shipstation.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var changed = true;
    var previous_order = null;

    // Function to modify the "Preload your Video" element
    function modifyVideo(element) {
        // Get the text content of the element
        var text = element.textContent;

        if (text.includes("http") || text.includes("www")) {


            // Find the index of the first colon and split the text
            var colonIndex = text.indexOf(':');
            var firstPartText = text.slice(0, colonIndex + 1);
            var urlText = text.slice(colonIndex + 1).trim();
            console.log(urlText);

            // Create a new bold element with the first part and a break element
            var firstPart = document.createElement('b');
            firstPart.textContent = firstPartText;
            var br = document.createElement('br');

            // Create a new hyperlink element with the Vimeo URL
            var link = document.createElement('a');
            link.href = urlText;
            link.textContent = urlText;

            // Remove the original text content
            element.textContent = '';

            // Append the new text and elements to the element
            element.appendChild(firstPart);
            element.appendChild(br);
            element.appendChild(link);
        }
    }

    function modifyOrderNumber(orderNumberElement) {
        var orderNumber = orderNumberElement.textContent.match(/\d+$/)[0];
        var website = 'https://themotionbooks.com/wp-admin/post.php?post='+orderNumber+'&action=edit'// replace with your desired URL

        // Find the existing purple button
        var existingPurpleButton = document.querySelector('.purple-button-link');

        if (existingPurpleButton) {
            // If the button already exists, replace its href attribute
            existingPurpleButton.href = website; // Replace with your desired link
        } else {
            // If the button doesn't exist, create it
            var purpleButton = document.createElement('a');
            purpleButton.href = website; // Replace with your desired link
            purpleButton.target = '_blank'; // Open the link in a new tab
            purpleButton.style.backgroundColor = "#9B5C8F";
            purpleButton.style.color = 'white';
            purpleButton.style.padding = '6px 8px';
            purpleButton.style.marginLeft = '10px'; // Adjust the margin as needed
            purpleButton.textContent = 'Open in Woo';
            purpleButton.style.fontSize = '12px'; // Set the font size (adjust as needed)
            purpleButton.style.textDecoration = 'none'; // Remove text underline on hover
            purpleButton.style.display = 'flex'; // Use flexbox
            purpleButton.style.alignItems = 'center'; // Center vertically
            purpleButton.style.borderRadius = '4px'; // Round the corners
            purpleButton.classList.add('purple-button-link'); // Add a class for easy identification
            purpleButton.style.height = '24px'; // Set the height to make it shorter

            // Insert the button after the order number
            orderNumberElement.parentNode.insertBefore(purpleButton, orderNumberElement.nextSibling);
        }
    }

    // Function to modify all "Preload your Video" elements
    function checkElements() {
        // Find all elements with the "Preload your Video" text
        var videoElements = Array.from(document.querySelectorAll('[class^="description-"] > b')).filter(el => el.textContent.toLowerCase().includes('your video:')).map(el => el.parentNode);

        // Modify each element if not already modified
        videoElements.forEach(element => {
            if (!element.querySelector('a')) {
                modifyVideo(element);
            }
        });

        // Find the order number element// Use a CSS attribute selector to find elements with partial class names
        var orderElements = document.querySelectorAll('[class*="order-number-and-status"]');

        // Check if there are any matching elements
        if (orderElements.length > 0) {
            // Get the first element
            var orderElement = orderElements[0].querySelectorAll('[class*="order-number"]')[0];
            if (orderElement){
                var orderNumber = orderNumber = orderElement.textContent.match(/\d+$/)[0];;
                if (orderNumber != previous_order) {
                    console.log("Order Changed to #" + orderNumber);
                    modifyOrderNumber(orderElement);
                    previous_order = orderNumber;
                }
            }
        }

    }

    // Run the modifyAllElements function every second
    setInterval(checkElements, 500);
})();
