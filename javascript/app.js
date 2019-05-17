var topics = ["Niagara Falls", "The Grand Canyon", "Peyto Lake", "Cliffs of Moher", "Mount Bromo", "Spencer Lake", "Salar de Uyuni", "Ha Long Bay", "The Dead Sea", "Zhangjiajie National Forest Park", "Arches National Park", "Uluru", "The Galapagos Islands", "Yellowstone National Park", "Pamukkale", "Iguazu Falls", "Verdon Gorge", "Mud volcanos", "Pulpit Rock", "Sequoia National Park", "El Yunque National Forest", "The Sahara Desert", "The Blyde River Canyon", "Marble Caves", "The Matterhorn", "Victoria Falls"]
topics.sort();

var queryURL;
var state;

function gifGetter(e) {
    var {target} = e;
    queryURL = `https://api.giphy.com/v1/gifs/search?q=${target.value}&api_key=HyNMA79NF1M6xW9PfpzItOwkht0IrLZp&limit=10`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        $(".gifs").empty();
        //When a button is clicked, the page grabs 10 static, non-animated gif images and places them on the page
        response.data.map( function(image) { 
            var gif = document.createElement("img");
            // var rating = document.createElement("p");
            var divForGrouping  =   document.createElement("div");
            gif.src = image.images.fixed_height_still.url;
            // rating.innerHTML = `Rating: ${image.rating}`;
            gif.dataset.still = image.images.fixed_height_still.url;
            gif.dataset.animate = image.images.fixed_height.url;
            gif.dataset.state = "still";
            console.log(target);
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
            $(".gifs").append(divForGrouping);
            divForGrouping.append(gif);
            // divForGrouping.append(rating);         
        })
    })
}

//Make a function call that takes each topic in the array and remakes the buttons on the page
function buttonMaker() {
    topics.map(function (currentTopic) {
        // var btn = document.createElement("button");
        // btn.textContent = currentTopic;
        // btn.value = currentTopic;
        // btn.onclick = gifGetter;
        // $("#buttons").append(btn);

        var listItem = document.createElement("div");
        listItem.textContent = currentTopic;
        listItem.value = currentTopic;
        listItem.onclick = gifGetter;
        $(".dropdown-menu").append(listItem)
        // <a class="dropdown-item" href="#">Action</a>
    })
}

//When the user clicks on one of the still images, it should animate
$(document).ready(function() {
    buttonMaker();
    $("#submitBtn").click(function (e) {
        e.preventDefault();
        if ($("#searchTerm").val().trim() !== "") {
            $("#buttons").empty();
            topics.push($("#searchTerm").val());
            buttonMaker(); 
        }
        this.form.reset();
    }) 
})