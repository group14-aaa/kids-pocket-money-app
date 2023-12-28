const queryURL ='https://api.giphy.com/v1/gifs/random?api_key=Kz3LZ6By1ZZOjvwM38fgfFUgDljuq6hl&tag=dance&rating=pg';

fetch(queryURL)
  
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

        //get the image from the api
        var giphyUrl = data.data.images.original.url;

        // Creating a div for the gif
        var gifDiv = $("<div>");

        //create image tag
        var wellDone = $("<img>");

        // Setting the wellDone  src attribute to giphyUrl
        wellDone.attr('src', giphyUrl);
        
        gifDiv.append(wellDone);

        //append to html
         $("body").append(gifDiv);

    });