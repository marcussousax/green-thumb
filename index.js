const FILTERS = [
    {
        key: 'sun',
        iconPath: require('./src/images/illustrations/sun.png'),
        label: `Set the amount of <strong>sunlight</strong> your plant will get.`,
        options: ['no', 'low', 'high'],
        meta: {
            inverted: false
        }
    },
    {
        key: 'water',
        iconPath: require('./src/images/illustrations/wateringcan.png'),
        label: `How often do you want to <strong>water</strong> your plant?`,
        options: ['rarely', 'daily', 'regularly'],
        meta: {
            inverted: true
        }
    },
    {
        key: 'pets',
        iconPath: require('./src/images/illustrations/dog.png'),
        label: `Do you have pets? Do they <strong>chew</strong> plants?`,
        options: ['yes', 'no'],
        meta: {
            inverted: false
        }
    },
]


function app() {
    renderEmptyMessage('No results yet...', 'Use the filters above to find the plant that best fits your environment :)')
    createFilterWithTemplate(FILTERS)
}


// Display Generic messages on Filter Results Section
function renderEmptyMessage(title, subtitle) {
    const filterSection = document.querySelector('.filter-results-section')
    const emptyTemplate = document.getElementById('filter-results-empty-template')
    const emptyTemplateContent = document.importNode(emptyTemplate.content, true)
    emptyTemplateContent.querySelector('.section-title').textContent = title
    emptyTemplateContent.querySelector('.section-subtitle').textContent = subtitle

    const container = document.createElement('section')
    container.classList.add('filter-results-section')
    container.appendChild(emptyTemplateContent)

    filterSection.replaceWith(container)
}

function createFilterWithTemplate(filters) {
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
            tryFetchPlants(filterState)
        })

        container.appendChild(filterBlock)
    })

    filterSection.appendChild(container)
}

function createFilterResultsWithTemplate(data) {

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

function tryFetchPlants(filterState) {
    if (Object.values(filterState).some(x => x === '')) {
        return
    }

    const {sun, water, pets} = filterState

    return fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 404) {
                renderEmptyMessage('No plants found', 'No plant was found with selected criteria.')
            } else {
                createFilterResultsWithTemplate(data)
            }
        })
        .catch(error => {
            console.log('There was an error trying to fetch data', error)
        })
}

app()
