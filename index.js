import renderMessage from './src/js/renderMessage'
import renderFilterSelects from './src/js/filterSelects'

const FILTERS = [
    {
        key: 'sun',
        iconPath: require('./src/images/illustrations/sun.png'),
        label: `Set the amount of <strong>sunlight</strong> your plant will get.`,
        options: [
            {key: 'no', value: 'No sunlight'},
            {key: 'low', value: 'Low sunlight'},
            {key: 'high', value: 'High sunlight'}
        ],
        meta: {
            inverted: false
        }
    },
    {
        key: 'water',
        iconPath: require('./src/images/illustrations/wateringcan.png'),
        label: `How often do you want to <strong>water</strong> your plant?`,
        options: [
            {key: 'rarely', value: 'Rarely'},
            {key: 'regularly', value: 'Regularly'},
            {key: 'daily', value: 'Daily'}
        ],
        meta: {
            inverted: true
        }
    },
    {
        key: 'pets',
        iconPath: require('./src/images/illustrations/dog.png'),
        label: `Do you have pets? Do they <strong>chew</strong> plants?`,
        options: [
            {key: 'yes', value: 'Yes'},
            {key: 'no', value: 'No/They don’t care'}
        ],
        meta: {
            inverted: false
        }
    },
]

function app() {
    // Initial Render needs to display an empty message
    renderMessage('No results yet...', 'Use the filters above to find the plant that best fits your environment :)')

    // Creates the group of selects using the HTML template tag
    renderFilterSelects(FILTERS)
}

document.addEventListener('DOMContentLoaded', () => {
    app()
})
