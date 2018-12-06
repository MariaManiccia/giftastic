$(document).ready(function () {
    console.log("Ready!");

    //array of animals
    var pokemon = ["squirtle", "bulbasaur", "pikachu", "charmander", "eevee"];


    //function for creating buttons
    function createButtons() {
        //delete buttons before adding a new to prevent duplicate
        $("#buttons-input").empty();
        $("#buttons-view").empty();

        //loop throught the array and create a button for each one
        for (i = 0; i < pokemon.length; i++) {

            var a = $("<button>");

            a.addClass("pokemon");
            //a.attr("",pokemon[i]);
            a.text(pokemon[i]);

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
        pokemon.push(newPoke);

        //call the button function
        createButtons();
    });

    createButtons();

});

