// ==UserScript==
// @name         SS_Script
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Adds a break and hyperlink to the SS video description
// @match        https://ship15.shipstation.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to modify the "Preload your Video" element
    function modifyElement(element) {
        // Get the text content of the element
        var text = element.textContent;

        // Find the index of the first colon and split the text
        var colonIndex = text.indexOf(':');
        var firstPartText = text.slice(0, colonIndex + 1);
        var urlText = text.slice(colonIndex + 1).trim();

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

    // Function to modify all "Preload your Video" elements
    function modifyAllElements() {
        // Find all elements with the "Preload your Video" text
        var elements = Array.from(document.querySelectorAll('.description-UQyKl6Q > b')).filter(el => el.textContent.toLowerCase().includes(' your video:')).map(el => el.parentNode);

        // Modify each element if not already modified
        elements.forEach(element => {
            if (!element.querySelector('a')) {
                modifyElement(element);
            }
        });
    }

    // Run the modifyAllElements function every second
    setInterval(modifyAllElements, 100);
})();
