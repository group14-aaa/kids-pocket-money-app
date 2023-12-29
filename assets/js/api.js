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

var category = "happiness";
const quote = $("#quote");
fetch("https://api.api-ninjas.com/v1/quotes?category=" + category, {
  method: "GET",

  headers: {
    "X-Api-Key": "EC0o9cnmZIQGcKf8z5gASw==KslFKIUVEaIlMYLP",

    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    return response.json();
  })

  .then((result) => {
    console.log(result[0].quote);
    quote.append(result[0].quote);
  })

  .catch((error) => {
    console.error("Error:", error.message);
  });
