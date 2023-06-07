// ==UserScript==
// @name         SS_Script_dev
// @namespace    http://tampermonkey.net/
// @version      1.1.0
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

    function modifyOrderNumber(orderNumberElement) {
        // Get the order number text
        var orderNumberText = orderNumberElement.textContent;
        // Extract the last number from the order number text
        var orderNumber = orderNumberText.match(/\d+$/)[0];
        console.log(orderNumber)

        // Get the image element
        var imageElement = document.querySelector('.store-logo-2B7Xj-2 img');

        // Create a new anchor tag
        var linkElement = document.createElement('a');

        // Set the href attribute to your desired URL
        linkElement.href = 'https://themotionbooks.com/wp-admin/post.php?post='+orderNumber+'&action=edit'// replace with your desired URL

        // Get the parent element of the image
        var parentElement = imageElement.parentNode;
        parentElement.style.display = 'block';

        // Insert the anchor tag before the image
        parentElement.insertBefore(linkElement, imageElement);

        // Move the image inside the anchor tag
        linkElement.appendChild(imageElement);
    }

    // Function to modify all "Preload your Video" elements
    function checkElements() {
        // Find all elements with the "Preload your Video" text
        var elements = Array.from(document.querySelectorAll('.description-UQyKl6Q > b')).filter(el => el.textContent.toLowerCase().includes('your video:')).map(el => el.parentNode);

        // Modify each element if not already modified
        elements.forEach(element => {
            if (!element.querySelector('a')) {
                modifyVideo(element);
            }
        });

        // Find the order number element
        var orderNumberElement = document.querySelector('.order-number-3qZxPCk');

        // Check if the order number element exists
        if (orderNumberElement && orderNumberElement.textContent !== previous_order) {
            console.log("changed");
            modifyOrderNumber(orderNumberElement)
            previous_order = orderNumberElement.textContent;
        }
    }

    // Run the modifyAllElements function every second
    setInterval(checkElements, 500);
})();
