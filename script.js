const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsDiv = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchTerm}`)
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => console.log(error));
});

function displayResults(data) {
  resultsDiv.innerHTML = '';

  const word = data[0].word;
  const phonetics = data[0].phonetics[0].text;
  const audio = data[0].phonetics[0].audio;

  const wordHeader = document.createElement('h2');
  wordHeader.textContent = word;

  const phoneticsDiv = document.createElement('div');
  const phoneticsText = document.createElement('p');
  phoneticsText.textContent = `Pronunciation: ${phonetics}`;
  
  const audioButton = document.createElement('button');
  audioButton.textContent = 'Play Audio';
  audioButton.addEventListener('click', () => {
    const audioElement = new Audio(audio);
    audioElement.play();
  });

  phoneticsDiv.appendChild(phoneticsText);
  phoneticsDiv.appendChild(audioButton);

  resultsDiv.appendChild(wordHeader);
  resultsDiv.appendChild(phoneticsDiv);

  data[0].meanings.forEach(meaning => {
    const partOfSpeech = meaning.partOfSpeech;
    const definitions = meaning.definitions;

    const partOfSpeechHeader = document.createElement('h3');
    partOfSpeechHeader.textContent = partOfSpeech;

    resultsDiv.appendChild(partOfSpeechHeader);

    definitions.forEach(definition => {
      const definitionText = definition.definition;
      const exampleText = definition.example;

      const definitionP = document.createElement('p');
      definitionP.textContent = definitionText;

      if (exampleText) {
        const exampleP = document.createElement('p');
        exampleP.textContent = `Example: ${exampleText}`;
        resultsDiv.appendChild(exampleP);
      }

      resultsDiv.appendChild(definitionP);
    });
  });
}