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
