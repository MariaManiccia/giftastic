$(document).ready(function () {
    console.log("Ready!");

    //array of animals
    var pokemons = ["squirtle", "bulbasaur", "pikachu", "charmander", "eevee"];


    //function for creating buttons
    function createButtons() {
        //delete buttons before adding a new to prevent duplicate
        $("#buttons-input").empty();
        $("#buttons-view").empty();

        //loop throught the array and create a button for each one
        for (i = 0; i < pokemons.length; i++) {

            var a = $("<button>");

            a.addClass("pokemon");
            a.attr("data-name", pokemons[i]);
            a.text(pokemons[i]);

            //push it to the html
            $("#buttons-view").append(a);
        };

    };

    //create a new button when the submit button is clicked
    $("#add-button").on("click", function (event) {
        //clean slate
        event.preventDefault();

        //grab the input
        var newPoke = $("#button-input").val().trim();

        //place it in the array
        pokemons.push(newPoke);

        //call the button function
        createButtons();

        //clear the input
        $("#button-input").val('');
    });

    createButtons();

    //create a function to get the correct GIFs
    function getGifs() {

        var pokemon = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pokemon + "&api_key=EmF2MFlKKFUnpQ8CqoVhtg9iwrDphNbB&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            // gather results
            var results = response.data;
            console.log(results);

            //push the image and rating to the html
            for (var i = 0; i < results.length; i++) {

                var resultsArea = $("<div class='col-md-4'>");
                var rating = results[i].rating;
                var defaultAni = results[i].images.fixed_height.url;
                var staticAni = results[i].images.fixed_height_still.url;
                var gifImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                gifImage.attr("src", staticAni);
                gifImage.addClass("themeGiphy");
                gifImage.attr("data-state", "still");
                gifImage.attr("data-still", staticAni);
                gifImage.attr("data-animate", defaultAni);
                resultsArea.append(p);
                resultsArea.append(gifImage);
                $("#gifArea").prepend(resultsArea);

            };

        });
    };

    $(document).on("click", ".pokemon", getGifs);



});

