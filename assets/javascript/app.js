$(document).ready(function () {
    console.log("Ready!");

    //array of animals
    var topics = ["the good dinosaur", "a bug's life", "cars 2", "brave", "cars 3", "coco", "monster's university", "finding dory", "bao",];


    //function for creating buttons
    function createButtons() {
        //delete buttons before adding a new to prevent duplicate
        $("#buttons-input").empty();
        $("#buttons-view").empty();

        //loop throught the array and create a button for each one
        for (i = 0; i < topics.length; i++) {

            var a = $("<button class='btn btn-danger'>");

            a.addClass("pixar");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);

            //push it to the html
            $("#buttons-view").append(a);
        };

    };

    //create a new button when the submit button is clicked
    $("#add-button").on("click", function (event) {
        //clean slate
        event.preventDefault();

        //grab the input
        var newPix = $("#button-input").val().trim();

        //place it in the array
        topics.push(newPix);

        //call the button function
        createButtons();

        //clear the input
        $("#button-input").val('');
    });

    createButtons();

    //create a function to get the correct GIFs
    function getGifs() {

        var pixar = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pixar + "&api_key=EmF2MFlKKFUnpQ8CqoVhtg9iwrDphNbB&limit=10&rating=pg";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {

            // clear the area
            $("#gifArea").html(" ");

            // gather results
            var results = response.data;
            console.log(results);

            //push the image and rating to the html
            for (var i = 0; i < results.length; i++) {

                var resultsArea = $("<div class='col-md-6'>");
                var rating = results[i].rating;
                var defaultAni = results[i].images.fixed_height.url;
                var staticAni = results[i].images.fixed_height_still.url;
                var gifImage = $("<img class='rounded mx-auto d-block'>");
                var p = $("<p class='lead'>").text("Rating: " + rating);
                
                gifImage.attr("src", staticAni);
                gifImage.addClass("giphy");
                gifImage.attr("data-state", "still");
                gifImage.attr("data-still", staticAni);
                gifImage.attr("data-animate", defaultAni);
                resultsArea.append(p);
                resultsArea.append(gifImage);
                $("#gifArea").prepend(resultsArea);

            };

        });
    };

    $(document).on("click", ".pixar", getGifs,);

    function animateGifs() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
    };
    
    $(document).on("click", ".giphy", animateGifs,);



});

