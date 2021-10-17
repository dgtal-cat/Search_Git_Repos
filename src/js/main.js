const searchInput = document.querySelector('.search-input')
const searchResultBlock = document.querySelector('.search-result-block')

function debounce(callback, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(callback, delay);
    }
}

async function searchRepos() {
    const url = 'https://api.github.com/search/repositories?q='
    return await fetch(url+searchInput.value).then((result) => {
      if (result.ok) {
          result.json().then(response => console.log(response))
      } else {

      }
    })
}

searchInput.addEventListener("keyup", debounce(searchRepos, 1000))