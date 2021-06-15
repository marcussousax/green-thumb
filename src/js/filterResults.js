const ICONS = {
    HEADER: {
        pick: require('../images/illustrations/pick.png')
    },
    ARROW: {
        up: require('../images/icons/arrow-up.svg')
    },
    SUN: {
        no: require('../images/icons/no-sun.svg'),
        low: require('../images/icons/low-sun.svg'),
        high: require('../images/icons/high-sun.svg'),
    },
    TOXICITY: {
        true: require('../images/icons/toxic.svg'),
        false: require('../images/icons/pet.svg')
    },
    DROP: {
        rarely: require('../images/icons/1-drop.svg'),
        regularly: require('../images/icons/2-drops.svg'),
        daily: require('../images/icons/3-drops.svg')
    }
}

export default function renderFilterResults(data) {

    const filterResultsPlaceholder = document.querySelector('.filter-results-section')

    const container = document.createElement('section')
    container.classList.add('filter-results-section')

    const div = document.createElement('div')
    div.classList.add('container')

    const resultsHeader = document.createElement('header')
    resultsHeader.classList.add('filter-results-header')
    resultsHeader.innerHTML = `
        <img class="filter-results-header-icon" src=${ICONS.HEADER.pick} alt="Illustration of the Sun">
        <h3 class="filter-results-header-title">Our picks for you</h3>
    `

    const ul = document.createElement('ul')
    ul.classList.add('filter-results-list')

    div.appendChild(resultsHeader)
    div.appendChild(ul)
    container.appendChild(div)

    const plantCardTemplate = document.getElementById('plant-card-template')

    data.forEach(plant => {
        const plantCard = document.importNode(plantCardTemplate.content, true)
        plantCard.querySelector('.card-thumbnail img').src = plant.url
        plantCard.querySelector('.card-thumbnail img').alt = plant.url
        plantCard.querySelector('.card-title').innerHTML = `<h3>${plant.name}</h3>`
        plantCard.querySelector('.card-price').innerHTML = `<h4>$${plant.price}</h4>`

        plantCard.querySelector('.card-icons').innerHTML = `
            <img src=${ICONS.TOXICITY[plant.toxicity]} alt="" />
            <img src=${ICONS.SUN[plant.sun]} alt=""/>
            <img src=${ICONS.DROP[plant.water]} alt=""/>
       `
        ul.appendChild(plantCard)
    })
    filterResultsPlaceholder.replaceWith(container)
    renderScrollToTop()
}


function renderScrollToTop() {

    const filterResultsPlaceholder = document.querySelector('.filter-results-section')

    const button = document.createElement('button')
    button.classList.add('container', 'btn-scroll-to-top')
    button.innerHTML = `
        <img src=${ICONS.ARROW.up} alt="Scroll to top" /> 
        back to the top
    `
    button.addEventListener('click', () => {
        window.scroll({top: 0})
    })

    filterResultsPlaceholder.appendChild(button)
}
