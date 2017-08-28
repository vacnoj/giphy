var topics = ["dog", "moose", "cow", "elephant", "horse"];

function displayGif() {

	var topic = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=39e7a345963b47eaa46f52828d246ef1&q=" + topic + "&limit=25&offset=0&rating=G&lang=en";

}

function makeButtons() {

	for(var i = 0; i < topics.length; i++) {
		var newButton = $('<button>').data('animal-name', topics[i]);
		$("#animal-row").append(newButton.text(topics[i]));

		newButton.on('click', function() {
			console.log(this);
			$("#animals-view").empty();
			var animal = ($(this).data('animal-name'));
			queryURL = "https://api.giphy.com/v1/gifs/search?api_key=39e7a345963b47eaa46f52828d246ef1&q=" + animal + "&limit=25&offset=0&rating=G&lang=en";

		$.ajax({
			url: queryURL,
			method: 'GET'
			}).done(function(response) {
				console.log(response);
				
				for (var k = 0; k < 25; k++) {
					var newDiv = $('<div class="gifs">');
					$("#animals-view").append(newDiv.append($('<iframe>', {src: response.data[k].embed_url})));
				}
      		});
        });
	}
}

$("#add-animal").on("click", function(event) {
	$("#animal-row").empty();
	event.preventDefault();
	topics.push($("#animal-input").val());
	makeButtons();
	$("#animal-input").val('');
});

makeButtons();
