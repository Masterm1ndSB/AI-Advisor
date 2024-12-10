// DOM Elements
const stockInput = document.getElementById('stockInput');
const searchButton = document.getElementById('searchButton');
const infoOutput = document.getElementById('infoOutput');

// Event listener for button click
searchButton.addEventListener('click', fetchStockInfo);

async function fetchStockInfo() {
  const stockSymbol = stockInput.value.trim();
  
  if (!stockSymbol) {
    infoOutput.innerHTML = "<p style='color:red;'>Please enter a stock name or symbol.</p>";
    return;
  }

  const url = `https://yahoo-finance97.p.rapidapi.com/stock/v2/get-summary?symbol=${stockSymbol}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "yahoo-finance97.p.rapidapi.com",
        "x-rapidapi-key": "9be01e3ceemsh63ea85766dfb7c8p14aa9djsn4ecec4db5c1c" // Replace with your actual RapidAPI Key
      }
    });

    const data = await response.json();

    if (data && data.price) {
      infoOutput.innerHTML = `
        <h3>Stock Information for ${stockSymbol.toUpperCase()}</h3>
        <p><strong>Company Name:</strong> ${data.longName || "Data not available"}</p>
        <p><strong>Current Stock Price:</strong> $${data.price.current || "Data not available"}</p>
        <p><strong>Previous Close:</strong> $${data.price.regularMarketPreviousClose || "Data not available"}</p>
        <p><strong>Market Cap:</strong> ${data.price.marketCap ? `$${data.price.marketCap / 1e9} B` : "Data not available"}</p>
      `;
    } else {
      infoOutput.innerHTML = "<p style='color:red;'>Unable to fetch stock data. Try again.</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    infoOutput.innerHTML = "<p style='color:red;'>An error occurred while fetching the data.</p>";
  }
}
