// Display Generic messages on Filter Results Section
export default function (title, subtitle) {
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
