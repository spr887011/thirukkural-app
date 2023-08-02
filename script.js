async function fetchData(number) {
  const response = await fetch(`https://api-thirukkural.vercel.app/api?num=${number}`);
  return response.json();
}

function displayResult(data) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!data || data.error) {
    resultDiv.innerHTML = "<p>No results found for the entered Thirukkural number.</p>";
    return;
  }

  const kuralNumber = data.number;
  const kuralSection = data.sect_tam;
  const kuralLine1 = data.line1;
  const kuralLine2 = data.line2;
  const kuralExplanation = data.tam_exp;

  const card = document.createElement("div");
  card.className = "card my-3";

  const cardContent = `
    <div class="card-body">
      <h4 class="card-title">திருக்குறள் ${kuralNumber}</h4>
      <p class="card-text"><b>அதிகாரம்</b> : ${kuralSection}</p>
      <p class="card-text">${kuralLine1}</p>
      <p class="card-text">${kuralLine2}</p>
      <p class="card-text"><b>விளக்கம்</b> : ${kuralExplanation}</p>
    </div>
  `;

  card.innerHTML = cardContent;
  resultDiv.appendChild(card);
}

async function searchKural() {
  const kuralNumberInput = document.getElementById("kuralNumberInput");
  const kuralNumber = kuralNumberInput.value;

  if (!kuralNumber || isNaN(kuralNumber)) {
    return;
  }
  if(kuralNumber<0 || kuralNumber > 1330){
    alert("1 முதல் 1330 வரை உள்ளிடவும்")
    return;
  }
  try {
    const data = await fetchData(kuralNumber);
    displayResult(data);
  } catch (error) {
    console.log("Error fetching data:", error);
    displayResult(null);
  }
}
