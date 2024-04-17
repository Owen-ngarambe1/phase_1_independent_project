document.addEventListener("DOMContentLoaded", function () {
    // A reference to the gallery container
    const gallery = document.getElementById("gallery");
  
    // Defining the API URL for cat's images
    const apiUrl = "http://localhost:3000/cats";
  
    let catData; // To store the cat data
  
    // Function to display cat's images
    function displayCatImages(cats) {
      gallery.innerHTML = ""; // Clear the gallery
  
      cats.forEach((cat) => {
        const catContainer = document.createElement("div");
        catContainer.className = "cat-container";
  
        const catImage = document.createElement("img");
        catImage.className = "cat-image";
        catImage.src = cat.url;
        catImage.alt = `Cat Image ID: ${cat.id}`;
  
        // Creating and initializing a "likes" counter
        const likeCounter = document.createElement("p");
        likeCounter.textContent = `Likes: ${cat.likes}`;
        likeCounter.className = "cat-likes";
  
        // Creating a "like" button with a transparent heart symbol
        const likeButton = document.createElement("button");
        likeButton.innerHTML = "&hearts;"; // Inserting a heart symbol entity
        likeButton.className = "like-button";
        likeButton.addEventListener("click", () => {
          // Increasing the likes count when the button is clicked
          cat.likes++;
          likeCounter.textContent = `Likes: ${cat.likes}`;
        });
  
        // Appending the cat's elements to the container
        catContainer.appendChild(catImage);
        catContainer.appendChild(likeButton);
        catContainer.appendChild(likeCounter);
  
        // Appending the cat's container to the gallery
        gallery.appendChild(catContainer);
      });
    }
  
    // Fetching cat's images from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        catData = data; // Storing the cat's data for filtering
  
        // Displaying all cat's images
        displayCatImages(catData);
      })
      .catch((error) => {
        console.error("Error fetching cat images:", error);
      });
  
    // Getting references to filter elements
    const filterWidthInput = document.getElementById("filter-width");
    const filterHeightInput = document.getElementById("filter-height");
    const applyFiltersButton = document.getElementById("apply-filters");
  
    // Adding an event listener to the "Apply Filters" button
    applyFiltersButton.addEventListener("click", () => {
      // Getting filter values from inputs
      const minWidth = parseInt(filterWidthInput.value, 10);
      const minHeight = parseInt(filterHeightInput.value, 10);
  
      // Filtering cat's images based on width and height
      const filteredCats = catData.filter((cat) => {
        return cat.width >= minWidth && cat.height >= minHeight;
      });
  
      // Displaying filtered cat images
      displayCatImages(filteredCats);
    });
  });
  