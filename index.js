import renderMessage from './src/js/renderMessage'
import { createFilterWithTemplate } from './src/js/templates'

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
    // Initial Render needs to display an empty message
    renderMessage('No results yet...', 'Use the filters above to find the plant that best fits your environment :)')

    // Creates the group of selects using the HTML template tag
    createFilterWithTemplate(FILTERS)
}

document.addEventListener('DOMContentLoaded', () => {
    app()
})
