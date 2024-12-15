// DOM ELEMENT SELECTION
const authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.getElementById("load-more-btn");

// Control index variables
let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

// Using fetch() to receive data from the API by sending a GET request
fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")
  .then((res) => res.json()) // Parsing into JSON
  .then((data) => {
    // Working with the parsed data
    authorDataArr = data;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
  })
  .catch((err) => {
    // In case of an error
    console.error(`There was an error: ${err}`);
  });

// Function to populate the UI with the author data
const displayAuthors = (authors) => {
  authors.forEach(({ author, image, url, bio }, index) => {
    console.log(`Author: ${author}, Image URL: ${image}`); // Log author and image URL
    authorContainer.innerHTML += `
    <div id="${index}" class="user-card">
      <h2 class="author-name">${author}</h2>
      <img class="user-img" src="${image}" alt="${author} avatar" />
    </div>
    `;
  });
};
