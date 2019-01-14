var topics = ["Niagara Falls", "The Grand Canyon", "Peyto Lake", "Cliffs of Moher", "Mount Bromo", "Spencer Lake", "Salar de Uyuni", "Ha Long Bay", "The Dead Sea", "Zhangjiajie National Forest Park", "Arches National Park", "Uluru", "The Galapagos Islands", "Yellowstone National Park", "Pamukkale", "Iguazu Falls", "Verdon Gorge", "Mud volcanos", "Pulpit Rock", "Sequoia National Park", "El Yunque National Forest", "The Sahara Desert", "The Blyde River Canyon", "Marble Caves", "The Matterhorn", "Victoria Falls"]

var queryURL = "http://api.giphy.com/v1/gifs/search?q=Peyto+Lake&api_key=HyNMA79NF1M6xW9PfpzItOwkht0IrLZp&limit=5";

var queryParams = {"api-key": "HyNMA79NF1M6xW9PfpzItOwkht0IrLZp"};

// queryParams.q = $("#search-term").val().trim();

console.log(`https://api.giphy.com/gifs/search?q=Iguazu+Falls&api_key=HyNMA79NF1M6xW9PfpzItOwkht0IrLZp&limit=10`)



//Make a function call that takes each topic in the array and remakes the buttons on the page
function buttonMaker() {
    for (i=0; i < topics.length; i++) {
        $("#buttons").append(`<button>${topics[i]}</button>`);
    }
}

//Take topics in the array and create buttons
buttonMaker();

//When a button is clicked, the page grabs 10 static, non-animated gif images and places them on the page

//When the user clicks on one of the still images, it should animate

//Whent the user clicks on it again, it should stop animating

//Under every gif, display the rating

//Add a form that take the value from a user input box and adds it to the 'topics' array

$(document).ready(function () {
    $("#submit").click(function (e) {
        e.preventDefault();
            $("#buttons").empty();
            topics.push($("#searchTerm").val());
            buttonMaker(); 
            e.preventDefault();   
            $("#formReset").html("<form>Add a natural wonder: <br><input id='searchTerm' type='text' name='searchTerm'><input id='submit' type='submit' value='Submit'></form>");

    })
})

var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=Peyto+Lake&api_key=HyNMA79NF1M6xW9PfpzItOwkht0IrLZp&limit=5");
xhr.done(function(response) { console.log("success got data", response); 
console.log(response.data[0].images.fixed_height.url);
$("#gifs").append(`<img src=${response.data[0].images.fixed_height.url}>`);



});

$("#buttons").click(function() {


    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp"
    }).done(function(response) {
        console.log(response.data[0].images.fixed_height.url);
        $("#gifs").append(`<img src=${response.data[1].images.fixed_height.url}>`);
    })

})
