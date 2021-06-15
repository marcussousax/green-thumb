import renderMessage from './renderMessage'
import { createFilterResultsWithTemplate } from './templates'

export default function (filterState) {
    if (Object.values(filterState).some(x => x === '')) {
        return
    }

    const {sun, water, pets} = filterState

    const placeholder = document.querySelector('.filter-results-section')
    placeholder.innerHTML = `
        <div class="loading-results">
            <div class="sk-folding-cube">
              <div class="sk-cube1 sk-cube"></div>
              <div class="sk-cube2 sk-cube"></div>
              <div class="sk-cube4 sk-cube"></div>
              <div class="sk-cube3 sk-cube"></div>
            </div>
        </div>
    `

    return fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 404) {
                renderMessage('No plants found', 'No plant was found with selected criteria.')
            } else {
                createFilterResultsWithTemplate(data)
            }
        })
        .catch(error => {
            console.log('There was an error trying to fetch data', error)
        })
}
