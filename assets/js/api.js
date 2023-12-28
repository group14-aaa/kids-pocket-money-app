
function callApi() {
    const queryURL =
      "https://api.giphy.com/v1/gifs/random?api_key=Kz3LZ6By1ZZOjvwM38fgfFUgDljuq6hl&tag=dance&rating=pg";
    
      const gifDisplay = $("#gifDisplay");

    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("button works");

        //get the image from the api
        let giphyUrl = data.data.images.original.url;

        // Creating a div for the gif
        let gifDiv = $("<div>");

        //create image tag
        let wellDone = $("<img>");

        // Setting the wellDone  src attribute to giphyUrl
        wellDone.attr("src", giphyUrl);

        //append image to div
        gifDiv.append(wellDone);

        //append to html
        gifDisplay.append(gifDiv);
      });
  }

