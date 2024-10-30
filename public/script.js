document.addEventListener("DOMContentLoaded", (event) => {
  getRandomWord();
  
  document.querySelector('.new-word-button').addEventListener('click', function() {
    getRandomWord();
  });
});

export const getRandomWord = async () => {
  const result = await fetch('/word')
  .then(async response => {
    if (!response.ok) {
      throw new Error('Network response failed');
    }

    const word = await response.text();
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);

    return capitalized;
  })
  .then(data => {
    document.querySelector('.word-container').textContent = data;
  })
  .catch(error => {
    document.querySelector('.word-container').textContent = 'There was an error getting your word.';
  });
};
