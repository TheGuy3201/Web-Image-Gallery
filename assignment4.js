"use strict";

/*

Name: Joshua Desroches
ID: 301350618
Date: April 12th 2024
assignment4.js

*/

$(document).ready(function () {
    var main_width = $(".main").width();
    var long_cont = $(".long_cont");
    var slide_number = 0;
    var intervalId;
    var data; //will store the JSON data


    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the path to the JSON file
    var url = 'photos.json';

    // Open a new GET request to fetch the JSON file
    xhr.open('GET', url, true);

    // Define what happens when the request is successful
    xhr.onload = function () {
        // Check if the request was successful
        if (xhr.status === 200) {
            // Access the response data
            data = JSON.parse(xhr.responseText);

            // Update items based on JSON data
            data.forEach(function (itemData) {
                // Create a new item element for each image
                var new_item = $('<div class="item"></div>');

                // Set background image for the item
                new_item.css('background-image', 'url("' + itemData.source + '")');

                // Append the new item to the long container
                long_cont.append(new_item);

                // Adjust the width of the item based on the number of items per screen
                new_item.css("width", main_width);
            });

            // Set width of long container and items
            long_cont.css("width", main_width * data.length);

            //calls the image cycling function
            cycleImages(data);
        } else {
            // In case an error occurs
            console.log('Failed to load the JSON. Status: ' + xhr.status);
        }
    };

    // Sends request
    xhr.send();

    // Function to cycle through images
    function cycleImages(data) {
        intervalId = setInterval(function () {
            slide_number = (slide_number + 1) % data.length; // Increment slide number
            var item_width = $(".item").width();
            var pixels_moved = item_width * slide_number;

            long_cont.animate({
                marginLeft: -pixels_moved
            });
        }, data[slide_number].visible * 1000); // Convert seconds to milliseconds
    }

    $(".see_next").click(function () {
        slide_number = (slide_number + 1) % $('.item').length; // Increment slide number

        clearInterval(intervalId); // Clear the interval
        cycleImages(data); // Restart the interval

        var item_width = $(".item").width();
        var pixels_moved = item_width * slide_number;

        long_cont.animate({
            marginLeft: -pixels_moved
        });
    });

    $(".see_prev").click(function () {
        
        slide_number = (slide_number - 1 + $('.item').length) % $('.item').length; // Decrement slide number

        clearInterval(intervalId); // Clear the interval
        cycleImages(data); // Restart the interval

        var item_width = $(".item").width();
        var pixels_moved = item_width * slide_number;

        long_cont.animate({
            marginLeft: -pixels_moved
        });
        
    });
});