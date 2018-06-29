$(document).ready(function() {
    var vehiclesArray = ["B52", "F-22 Raptor", "lamborghini", "mini cooper", "train", "submarine", "ford", "mazda", "bmw", "audi", "Bugatti Chiron", "Ferrari", "lexus", "honda", "toyota", "Alfa Romeo", "Bentley", "Koenigsegg", "Beechcraft", "Supermarine", "USS Enterprise", "B-2 Spirit", "tank", "The Blackbird jet", "mercedes benz", "Harley Davidson"];
    var queryUrl = '';
 
    function renderButtons() {
        $("#v-buttons").empty();
        for (var i = 0; i < vehiclesArray.length; i++) {
            var btn = $("<button>");
            btn.addClass("vehicle");
            btn.attr("data-name", vehiclesArray[i]);
            btn.text(vehiclesArray[i]);
            $("#v-buttons").append(btn);
        }
    }

    $(document).on("click", ".vehicle", function() {
        var vName = $(this).attr("data-name");
        $("#v-views").empty();

        queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + vName + "&limit=10&api_key=dvJa6mDy6IbmWvy9fumwmvCt9R2mA3py"
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            for (var j = 0; j < response.data.length; j++) {
                var newDiv = $("<div class = 'imageBlock'>");
                var rating = $("<div class = 'rating'>Rating: " + (response.data[j].rating).toUpperCase() + "</div>");
                var animated = response.data[j].images.fixed_height.url;
                var still = response.data[j].images.fixed_height_still.url;
                var newImg = $("<img src=" + still + " data-still=" + still + " data-animate=" + animated + " data-state='still'" + " class='gif'>");
                newDiv.append(newImg);
                newDiv.prepend(rating);
                $("#v-views").append(newDiv);
            }
        });
    });

    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === 'still') {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animated");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-v").on("click", function(event) {
        event.preventDefault();
        var vehicle = $("#v-name").val().trim();
        if (vehicle === '') {
            alert("Please enter some valid input.");
        } else {
            vehiclesArray.push(vehicle);
            $("form").trigger("reset");
            renderButtons();
        }
    });

    renderButtons();
})