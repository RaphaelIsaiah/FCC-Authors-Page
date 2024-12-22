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
    authorContainer.innerHTML = `
    <p class="error-msg">There was an error loading the authors</p>
    `;
  });

// Function for fetching more authors
const fetchMoreAuthors = () => {
  // Paginating data.
  startingIndex += 8;
  endingIndex += 8;
  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));

  // When there is no more data to load
  if (authorDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "No more data to load";
    loadMoreBtn.style.cursor = "not-allowed";
  }
};

// Function to populate the UI with the author data
const displayAuthors = (authors) => {
  authors.forEach(({ author, image, url, bio }, index) => {
    authorContainer.innerHTML += `
    <div id="${index}" class="user-card">
      <h2 class="author-name">${author}</h2>
      <img class="user-img" src="${image}" alt="${author} avatar"  />
      <div class="purple-divider"></div>
      <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + "..." : bio}</p>
      <a class="author-link" href="${url}" target="_blank">${author}'s author page</a>
    </div>
    `;
  });
};

// Event Listener
loadMoreBtn.addEventListener("click", fetchMoreAuthors);
