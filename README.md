# SS_Script for Tampermonkey

## Description
This script, "SS_Script", is designed for use with Tampermonkey and aims to enhance the functionality of ShipStation.

## Features
- Modifies the "Preload your Video" elements by splitting the text into a bold label, a break, and makes the url a hyperlink.
- Adjusts order number elements to include a custom purple button that our WooCommerce backend.

## Installation
There are two ways to install this script:

1. **Using the SS_Script.url File:**
   - If you have the `SS_Script.url` file on your computer, open it.
   - This will open the URL to the raw script file hosted on GitHub.
   - This will redirect you to the Tampermonkey installation screen, where you can click 'Install'.

2. **Using the GitHub Raw File URL:**
   - Navigate to the GitHub page where the raw version of the SS_Script is hosted.
   - Open the raw file URL, which should automatically redirect you to the Tampermonkey installation screen.
   - Click on 'Install' to add the script to Tampermonkey.

## Usage
- The script automatically runs on pages matching `https://ship15.shipstation.com/*`.
- It checks for video descriptions and order numbers, modifies them accordingly.
- The script runs at an interval of 500ms to continuously update the page elements.

## Compatibility
- This script is intended for use with ShipStation pages (specifically `https://ship15.shipstation.com/*`).
- It should be compatible with any modern browser that supports Tampermonkey.
