// Quotes API
const categories = ["happiness", "money", "future", "success"]
randomCategory = categories[Math.floor(Math.random() * categories.length)];
const quote = $("#quote");
fetch("https://api.api-ninjas.com/v1/quotes?category=" + randomCategory, {
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
    const quoteText = result[0].quote;
    // Add speech marks
    const quotedText = `"${quoteText}"`;

    quote.append(quotedText);
  })

  .catch((error) => {
    console.error("Error:", error.message);
  });

// Gihpy API
async function callGiphyApi() {
  const queryURL =
    "https://api.giphy.com/v1/gifs/random?api_key=Kz3LZ6By1ZZOjvwM38fgfFUgDljuq6hl&tag=dance&rating=pg";

  try {
    const response = await fetch(queryURL);
    const data = await response.json();

    // Get the image from the API
    let giphyUrl = data.data.images.fixed_height.url;
    return giphyUrl;

  } catch (error) {

    console.error("Error fetching data from Giphy API:", error);
    throw error;
  }
}
