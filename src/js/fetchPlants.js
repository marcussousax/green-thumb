import renderMessage from './renderMessage'
import { createFilterResultsWithTemplate } from './templates'

export default function (filterState) {
    if (Object.values(filterState).some(x => x === '')) {
        return
    }

    const {sun, water, pets} = filterState

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
