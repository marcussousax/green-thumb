import fetchPlants from './fetchPlants'

export default function renderFilterSelects(filters) {
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

        for (const filterOption of filterOptions) {
            let option = document.createElement('option')
            if (filter.key === 'pets') {
                option.value = (filterOption.key === 'yes').toString()
            } else {
                option.value = filterOption.key
            }
            option.text = filterOption.value
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
