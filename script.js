const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById("author");
const button = document.getElementById('new-quote');
const buttonLoader = document.getElementById('button-loader');
const buttonText = document.getElementById('button-text');
const quoteContainer = document.getElementById("quote_container");
const downloadBtn = document.getElementById("download-image");

const apiUrl = 'https://api.api-ninjas.com/v1/quotes';
const apiKey = 'rdq4cYMMqhsn3FJ4brG6xw==G6hdRkWt265n0GSD';

// Function to fetch a new quote
async function getQuote() {
  try {
    buttonLoader.style.display = 'inline-block';
    buttonText.style.display = 'none';
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.length > 0) {
      quoteElement.textContent = `"${data[0].quote}"`;
      authorElement.textContent = `—${data[0].author}`;
    } else {
      quoteElement.textContent = 'No quote found';
    }
  } catch (error) {
    quoteElement.textContent = 'Error fetching quote: ' + error.message;
  } finally {
    buttonLoader.style.display = 'none';
    buttonText.style.display = 'inline-block';
  }
}

button.addEventListener('click', () => {
  getQuote();

  button.classList.add("buttonClick");
  setTimeout(() => {
    button.classList.remove("buttonClick");
  }, 50);
});

// Fetch a quote when the page loads
getQuote();

function customizColor() {
  const backColor = document.getElementById("Back_Color").value;
  const textColor = document.getElementById("text_color").value;
  quoteContainer.style.backgroundColor = backColor;
  quoteContainer.style.color = textColor;
}

// Apply color customization when inputs change
document.getElementById("Back_Color").addEventListener("input", customizColor);
document.getElementById("text_color").addEventListener("input", customizColor);

// Apply default color customization on load
customizColor();

// Updated function to download quote as image
function downloadQuoteAsImage() {
  html2canvas(quoteContainer).then((canvas) => {
    const imageData = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = imageData;
    downloadLink.download = "quote.png";
    downloadLink.click();
  }).catch((error) => {
    console.error("Error generating the image:", error);
  });
}

downloadBtn.addEventListener("click", downloadQuoteAsImage);
