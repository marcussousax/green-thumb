const FILTERS = [
    {
        key: 'sun',
        iconPath: require('./src/images/illustrations/sun.png'),
        label: 'Set the amount of sunlight your plant will get.',
        options: ['no', 'low', 'high'],
        meta: {
            inverted: false
        }
    },
    {
        key: 'water',
        iconPath: require('./src/images/illustrations/wateringcan.png'),
        label: 'How often do you want to water your plant?',
        options: ['rarely', 'daily', 'regularly'],
        meta: {
            inverted: true
        }
    },
    {
        key: 'pets',
        iconPath: require('./src/images/illustrations/dog.png'),
        label: 'Do you have pets? Do they chew plants? ',
        options: ['yes', 'no'],
        meta: {
            inverted: false
        }
    },
]


function app() {
    createFilterWithTemplate(FILTERS)
}

function createFilterWithTemplate(filters) {
    const filterPlaceholder = document.querySelector('.filter-select-group')

    const container = document.createElement('section')
    container.classList.add('filter-container')
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
        filterBlock.querySelector('.label').textContent = `${index + 1}. ${filter.label}`

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
            tryFetchPlants(filterState)
        })

        container.appendChild(filterBlock)
    })

    filterPlaceholder.replaceWith(container)
}

function createFilterResultsWithTemplate(data) {

    const filterResultsPlaceholder = document.querySelector('.filter-results-list')

    const ul = document.createElement('ul')
    ul.classList.add('filter-results-list')
    const template = document.getElementById('filter-results-template')
    data.forEach(plant => {
        const plantCard = document.importNode(template.content, true)
        plantCard.querySelector('li').textContent = plant.name

        ul.appendChild(plantCard)
    })
    filterResultsPlaceholder.replaceWith(ul)
}

function tryFetchPlants(filterState) {
    if (Object.values(filterState).some(x => x === '')) {
        return
    }

    const {sun, water, pets} = filterState

    let placeholder = document.querySelector('.filter-results-list')
    placeholder.innerHTML = '<h1>Loading...</h1>'

    return fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 404) {
                placeholder.innerHTML = `<h1>${data.error}</h1>`
            } else {
                createFilterResultsWithTemplate(data)
            }
        })
        .catch(error => {
            console.log('There was an error trying to fetch data', error)
        })
}

app()
