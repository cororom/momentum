const quote = document.querySelector(".quote");
const quoteText = document.querySelector(".quote .quote__text");
const quoteAuthor = document.querySelector(".quote .quote__author");
const quoteImages = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];

const chosenImage = quoteImages[Math.floor(Math.random() * quoteImages.length)];

quote.style.backgroundImage = `url(image/${chosenImage})`;

const quotes = [
    {
        quote: "Happiness is a warm puppy.",
        author: "Charles M. Schulz"
    },
    {
        quote: "Life is a journey.",
        author: "Ralph Waldo Emerson"
    },
    {
        quote: "Don't dream, Be it.",
        author: "Tim curry"
    },
    {
        quote: "No pain, No gain.",
        author: "Benjamin Franklin"
    },
    {
        quote: "The die is cast.",
        author: "Julius Caesar"
    },
    {
        quote: "When they go low, we go high.",
        author: "Michelle Obama"
    },
    {
        quote: "A friend is a second myself.",
        author: "Aristotle"
    },
    {
        quote: "When in doubt, choose change.",
        author: "Lily Leung"
    },
    {
        quote: "Time is flying never to return.",
        author: "Virgil"
    },
    {
        quote: "Life is unfair, get used to it.",
        author: "Bill Gates"
    },
];

function setQuote() {
  const todayQuote = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = quotes[todayQuote].quote;
  quoteAuthor.innerText = quotes[todayQuote].author;
}

setQuote();