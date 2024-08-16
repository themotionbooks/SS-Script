// ==UserScript==
// @name         SS_Script
// @namespace    http://tampermonkey.net/
// @version      1.1.9
// @description  Adds a break and hyperlink to the SS video description
// @match        https://ship15.shipstation.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var changed = true;
    var previous_order = null;

    // Function to modify the "Preload your Video" element
    function modifyVideo(element, newLine = true) {
        // Get the text content of the element
        var text = element.textContent;

        if (text.includes("http") || text.includes("www")) {
            // Find the index of the first colon and split the text
            var colonIndex = text.indexOf(':');
            var firstPartText = text.slice(0, colonIndex + 1);
            var urlText = text.slice(colonIndex + 1).trim();

            // Split the URLs by " | "
            var urls = urlText.split(" | ");

            // Create a new bold element with the first part
            var firstPart = document.createElement('b');
            firstPart.textContent = firstPartText;

            // Remove the original text content
            element.textContent = '';

            // Append the first part to the element
            element.appendChild(firstPart);

            // Iterate over each URL and create a link
            urls.forEach(function(url, index) {
                // Create a new hyperlink element
                var link = document.createElement('a');
                link.href = url.trim();
                link.textContent = url.trim();

                // Append the link to the element
                element.appendChild(link);

                // Add a line break or space after each link if it's not the last one
                if (newLine) {
                    var br = document.createElement('br');
                    element.appendChild(br);
                } else if (index < urls.length - 1) {
                    element.appendChild(document.createTextNode(' | '));
                }
            });
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
            purpleButton.style.width = '84px';
            purpleButton.style.gridArea = 'open-woo';

            // Insert the button after the order number
            orderNumberElement.parentNode.insertBefore(purpleButton, orderNumberElement.nextSibling);
            orderNumberElement.parentNode.style.gridTemplateAreas = '"store-logo store-name order-number open-woo"';
            orderNumberElement.parentNode.style.gridTemplateColumns = '40px auto auto 1fr';
        }
    }

    // Function to modify all "Preload your Video" elements
    function checkElements() {
        // Find all elements with the "Preload your Video" text
        var videoElements = Array.from(document.querySelectorAll('[class^="description-"] > b'))
        .filter(el => {
            const text = el.textContent.toLowerCase();
            return text.includes('your video:') || text.includes('added video:');
        })
        .map(el => el.parentNode);

        // Modify each element if not already modified
        videoElements.forEach(element => {
            if (!element.querySelector('a')) {
                modifyVideo(element);
            }
        });

        // Find all labels with the "Your Video:" text and get their parent nodes
        var videoElements1 = Array.from(document.querySelectorAll('label')).filter(el => {
            const text = el.textContent.toLowerCase();
            return text.includes('your video:') || text.includes('added video:');
        }).map(el => el.parentNode);

        // Modify each element if not already modified
        videoElements1.forEach(element => {
            if (!element.querySelector('a')) {
                modifyVideo(element, false);
            }
        });

        // Find the order number element// Use a CSS attribute selector to find elements with partial class names
        var orderElements = document.querySelectorAll('[class*="order-details-order-info-section"]');

        // Check if there are any matching elements
        if (orderElements.length > 0) {
            // Get the first element
            var orderElement = orderElements[0].querySelectorAll('[class*="order-info-order-number"]')[0];
            if (orderElement){
                var orderNumber = orderElement.textContent.match(/\d+$/)[0];
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
