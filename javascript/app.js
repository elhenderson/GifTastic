var topics = ["Niagara Falls", "The Grand Canyon", "Peyto Lake", "Cliffs of Moher", "Mount Bromo", "Spencer Lake", "Salar de Uyuni", "Ha Long Bay", "The Dead Sea", "Zhangjiajie National Forest Park", "Arches National Park", "Uluru", "The Galapagos Islands", "Yellowstone National Park", "Pamukkale", "Iguazu Falls", "Verdon Gorge", "Mud volcanos", "Pulpit Rock", "Sequoia National Park", "El Yunque National Forest", "The Sahara Desert", "The Blyde River Canyon", "Marble Caves", "The Matterhorn", "Victoria Falls"]

var queryURL = "http://api.giphy.com/v1/gifs/search?q=Peyto+Lake&api_key=HyNMA79NF1M6xW9PfpzItOwkht0IrLZp&limit=5";

var queryParams = {"api-key": "HyNMA79NF1M6xW9PfpzItOwkht0IrLZp"};

// queryParams.q = $("#search-term").val().trim();

console.log(`https://api.giphy.com/gifs/search?q=Iguazu+Falls&api_key=HyNMA79NF1M6xW9PfpzItOwkht0IrLZp&limit=10`)

function gifGetter(e) {
    var {target} = e;
    queryURL = `http://api.giphy.com/v1/gifs/search?q=${target.value}&api_key=HyNMA79NF1M6xW9PfpzItOwkht0IrLZp&limit=10`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        //When a button is clicked, the page grabs 10 static, non-animated gif images and places them on the page
        response.data.map( function(image) { 
            var gif = document.createElement("img");
            gif.src = image.images.fixed_height_still.url;
            gif.dataset.still = image.images.fixed_height_still.url;
            gif.dataset.animate = image.images.fixed_height.url;
            gif.dataset.state = "still"
            gif.onclick = function(event) {
                
                const {target} = event;
                const datasets = target.dataset;
                if (datasets.state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }    
            };
            $("#gifs").append(gif);         

        })
    })
}


//Make a function call that takes each topic in the array and remakes the buttons on the page
function buttonMaker() {
    topics.map(function (currentTopic) {
        var btn = document.createElement("button");
        btn.textContent = currentTopic;
        btn.value = currentTopic;
        btn.onclick = gifGetter;
        $("#buttons").append(btn);
    })
}

//Take topics in the array and create buttons



var state;
//When the user clicks on one of the still images, it should animate
$(document).ready(function() {
    buttonMaker();
    console.log("ready");
    
    
    // $(".gif").click(function() {   
    //     console.log("wow"); 
    //     state = $(this).attr("data-state");
    //     if (state === "still") {
    //         $(this).attr("src", $(this).attr("data-animate"));
    //         $(this).attr("data-state", "animate");
    //       } else {
    //         $(this).attr("src", $(this).attr("data-still"));
    //         $(this).attr("data-state", "still");
    //       }    
    // })
    $("#submitBtn").click(function (e) {
        e.preventDefault();
        $("#buttons").empty();
        topics.push($("#searchTerm").val());
        buttonMaker(); 
        this.form.reset();
    })
    
})
//Whent the user clicks on it again, it should stop animating

//Under every gif, display the rating

//Add a form that take the value from a user input box and adds it to the 'topics' array

// $(document).ready(function () {
//     $("#submitBtn").click(function (e) {
//             e.preventDefault();
//             $("#buttons").empty();
//             topics.push($("#searchTerm").val());
//             buttonMaker(); 
//             this.form.reset();
//     })
// })

// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=Peyto+Lake&api_key=HyNMA79NF1M6xW9PfpzItOwkht0IrLZp&limit=5");
// xhr.done(function(response) { console.log("success got data", response); 
// console.log(response.data[0].images.fixed_height.url);
// $("#gifs").append(`<img src=${response.data[0].images.fixed_height.url}>`);



// });

// $(document).ready(function () {
//     $("button").click(function(e) {
//         e.preventDefault();
//         queryURL = `http://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=HyNMA79NF1M6xW9PfpzItOwkht0IrLZp&limit=10`
//         console.log(this);
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).done(function(response) {
//             //When a button is clicked, the page grabs 10 static, non-animated gif images and places them on the page
//             for (i=0; i < 10; i++) {
//                 $("#gifs").append(`<img src=${response.data[i].images.fixed_height_still.url} data-still=${response.data[i].images.fixed_height_still.url} data-animate=${response.data[i].images.fixed_height.url} data-state="still" class="gif">`);
//             }
//         })
//     })
// })
