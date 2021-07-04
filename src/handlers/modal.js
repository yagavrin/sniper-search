class Modal {
    constructor() {
        this.init()
    }

    init() {
        this.parentEl = document.createElement('div')
        this.parentEl.classList.add('modal__container')
        this.parentEl.setAttribute('hidden', '')
        document.body.prepend(this.parentEl)

        this.modal = document.createElement('div')
        this.modal.classList.add('modal')
        this.parentEl.prepend(this.modal)

        this.closeBtn = document.createElement('button')
        this.closeBtn.classList.add('modal__close-btn')
        this.closeBtn.textContent = 'Закрыть'
        this.modal.prepend(this.closeBtn)

        this.modalTextEl = document.createElement('div')
        this.modalTextEl.classList.add('modal__text')
        this.modal.append(this.modalTextEl)

        this.closeModal = this.closeModal.bind(this)
        this.closeModalHandler = this.closeModalHandler.bind(this)

        this.closeBtn.addEventListener('click', this.closeModal)
        this.parentEl.addEventListener('click', this.closeModalHandler)
    }

    closeModalHandler(e) {
        const modal = e.target.closest('.modal')
        if (!modal) {
            this.closeModal()
        }
    }

    showModal(text) {
        this.parentEl.removeAttribute('hidden')
        this.modal.classList.add('modal_active')
        this.modalTextEl.textContent = text
    }

    closeModal() {
        this.parentEl.classList.remove('modal_active')
        this.parentEl.setAttribute('hidden', '')
        this.modalTextEl.textContent = ''
    }
}

export { Modal }