const searchResult = document.querySelector('.search-result')
const searchInput = document.querySelector('.search-input')
const searchResultBlock = document.querySelector('.repos-list-block')

const warningPopUp = document.querySelector('.warning-popup')

function debounce(callback, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(callback, delay);
    }
}

function renderResponse(response) {
    const responseResult = response.items
    console.log(responseResult)
    const searchResultList = document.createElement('div')
    responseResult.forEach((item) => {
        let searchItem = document.createElement('div')
        searchItem.classList.add('search-item')
        searchItem.textContent = item.name
        searchResultList.appendChild(searchItem)
        searchResult.innerHTML = ''
        searchResult.appendChild(searchResultList)
    })
}

async function searchRepos() {
    const url = 'https://api.github.com/search/repositories?q='
    if (searchInput.value){
        return await fetch(url+searchInput.value+';per_page=5').then((result) => {
            if (result.ok) {
                result.json()
                    .then(response => {
                        console.log(response)
                        renderResponse(response)
                    })
                warningPopUp.style.display = 'none'
            } else {
                warningPopUp.style.display = 'block'
            }
        }).catch((err) => {
            warningPopUp.style.display = 'block'
            warningPopUp.textContent = "Search error: " + err
        })
    } else {
        searchResult.innerHTML = ''
    }
}

searchInput.addEventListener("keyup", debounce(searchRepos, 500))