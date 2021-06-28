class Notification {
    static showNotification(element, message) {
        const notificationEl = element.nextElementSibling
        notificationEl.removeAttribute('hidden')
        const leftCoords = element.offsetWidth + 10
        notificationEl.style.left = `${leftCoords}px`
        notificationEl.textContent = message
    }

    static hideNotification(element) {
        const notificationEl = element.nextElementSibling
        notificationEl.setAttribute('hidden', '')
        notificationEl.textContent = ''
    }
}

export { Notification }