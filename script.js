//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Failed to load image: ${url}`));
  });
}

// Main function to download all images
function downloadImages() {
  // Clear previous content
  output.innerHTML = "";
  errorDiv.textContent = "";

  // Show loading spinner
  loadingDiv.style.display = "block";

  const promises = images.map((img) => downloadImage(img.url));

  Promise.all(promises)
    .then((loadedImages) => {
      // Hide loading spinner
      loadingDiv.style.display = "none";

      // Display images
      loadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      // Hide loading spinner
      loadingDiv.style.display = "none";

      // Show error message
      errorDiv.textContent = err.message;
    });
}

// Attach event listener to button
btn.addEventListener("click", downloadImages);
