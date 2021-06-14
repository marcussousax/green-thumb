import fetchPlants from './fetchPlants'

export function createFilterWithTemplate(filters) {
    const filterSection = document.querySelector('.filter-section')

    const container = document.createElement('div')
    container.classList.add('container', 'filter-selects-container')

    const template = document.getElementById('filter-template')

    const filterState = {
        sun: '',
        water: '',
        pets: ''
    }

    filters.forEach((filter, index) => {
        const filterBlock = document.importNode(template.content, true)
        const select = filterBlock.querySelector('select')
        const filterOptions = filter.options

        const {inverted} = filter.meta

        const img = filterBlock.querySelector('img')
        img.src = filter.iconPath
        inverted && img.classList.add('is-inverted')
        filterBlock.querySelector('.label').innerHTML = `<strong>${index + 1}.</strong> ${filter.label}`

        for (const options of filterOptions) {
            let option = document.createElement('option')
            if (filter.key === 'pets') {
                option.value = (options === 'yes').toString()
            } else {
                option.value = options
            }
            option.text = options
            select.appendChild(option)
        }

        select.addEventListener('change', event => {
            filterState[filter.key] = event.target.value
            fetchPlants(filterState)
        })

        container.appendChild(filterBlock)
    })

    filterSection.appendChild(container)
}

export function createFilterResultsWithTemplate(data) {

    const filterResultsPlaceholder = document.querySelector('.filter-results-section')

    const container = document.createElement('section')
    container.classList.add('filter-results-section')

    const ul = document.createElement('ul')
    ul.classList.add('filter-results-list')
    container.appendChild(ul)
    const template = document.getElementById('filter-results-template')

    data.forEach(plant => {
        const plantCard = document.importNode(template.content, true)
        plantCard.querySelector('li').textContent = plant.name
        ul.appendChild(plantCard)
    })
    filterResultsPlaceholder.replaceWith(container)
}
