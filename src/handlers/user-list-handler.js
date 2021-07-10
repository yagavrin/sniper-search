import { BasicFormHandler } from './form-handler'
import { Notification } from './notification'
import { Modal } from './modal'

class UserListHandler extends BasicFormHandler {
    constructor(element) {
        super(element)
        this.users = []
    }
    init() {
        this.deleteBtnsArray = this.parentEl.querySelectorAll('.user-list__button_delete')
        this.userElArray = this.parentEl.querySelectorAll('.user-list__user-name')
        // this.users = Array.from(this.userElArray).map(element => element.textContent)
        this.input = this.parentEl.querySelector('.user-list__input')
        this.addUserForm = this.parentEl.querySelector('.user-list__form')
        this.addBtn = this.addUserForm.querySelector('.user-list__button')
        this.list = this.parentEl.querySelector('.user-list__ul')

        this.submitFormHandler = this.submitFormHandler.bind(this)
        this.deleteBtnHandler = this.deleteBtnHandler.bind(this)
        this.fetchUSerIsOK = this.fetchUSerIsOK.bind(this)
        this.deleteUserIsOk = this.deleteUserIsOk.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
        
        this.addUserForm.addEventListener('submit', this.submitFormHandler)
        this.deleteBtnsArray.forEach((btn) => {
            btn.addEventListener('click', this.deleteBtnHandler)
        })
        this.input.addEventListener('focus', this.inputFocusHandler)
        this.input.addEventListener('blur', this.inputHandler)
    }

    inputFocusHandler(e) {
        Notification.hideNotification(e.target)
    }

    inputHandler(e) {
        this.checkLength(e.target, 1, 'Введите логин')
    }

    deleteBtnHandler(e) {
        const li = e.target.closest('li')
        const login = li.querySelector('.user-list__user-name').textContent
        const options = {
            url: '/group/delete',
            method: 'POST',
            data: JSON.stringify({login: login}),
            // data: login,
            func: this.deleteUserIsOk,
        }
        this.fetchURL(options)
       
    }
    fetchUSerIsOK(response) {
        const result = response.result
        if (result === 'error') {
            this.modal.showModal('Что-то пошло не так...')
            return
        }
        if (result === 'login not found') {
            this.modal.showModal('Пользователь не найден')
            return
        }
        if (result === 'add another user') {
            this.modal.showModal('Добавьте другого пользователя')
            return
        }
        if (result === 'no permissions') {
            this.modal.showModal('нет доступа')
            return
        }
        if (result === 'success') {
            this.modal.showModal('Запрос на вступление в группу отправлен пользователю на почту')
            this.renderUserList()
            return
        } else {
            this.modal.showModal('Что-то пошло не так...')
        }
    }
    submitFormHandler(e) {
        e.preventDefault()
        this.checkLength(this.input, 1, 'Введите логин')
        const data = new FormData(this.addUserForm)
        if (!this.checkLength(this.input, 1, 'Введите логин')) {
            this.shakeBtn(this.addBtn)
            return
        }
        const options = {
            url: '/group/add/',
            method: 'POST',
            data,
            func: this.fetchUSerIsOK
        }
        this.fetchURL(options)
        this.renderUserList()
    }

    deleteUserIsOk(response) {
        const result = response.result
        if (result === 'error') {
            alert('ошибка')
            return
        }
        if (result === 'login not found') {
            alert('login not found')
            return
        }
        if (result === 'no permissions') {
            alert('нет доступа')
            return
        }
        if (Array.isArray(result)) {
            this.users = result
            this.renderUserList()
            return
        } else {
            this.modal.showModal('Что-то пошло не так...')
        }
    }

    checkLength(element, len, errMessage) {
        
        if (element.value.length < len) {
            Notification.showNotification(element, errMessage)
            return false
        }
        return true
    }
    renderUserList() {
        let html = ''
        if (this.users.length === 0) {
            const title = document.createElement('h4')
            title.textContent = 'Ваша рабочая группа пуста. Добавьте пользователей в группу чтобы иметь общий доступ к рассылкам'
            this.list.innerHTML = ''
            this.list.prepend(title)
            return
        }
        this.users.forEach((user) => {
            const template = `
            <li class="user-list__list-el">
                <div data-login='${user}' class="user-list__user-name">${user}</div>
                <button class="user-list__button user-list__button_delete">Удалить</button>
                <div class="reg-form__notification" hidden></div>
            </li>`
            html += template
        })
        this.list.innerHTML = html
        this.deleteBtnsArray = this.parentEl.querySelectorAll('.user-list__button_delete')
        this.deleteBtnsArray.forEach((btn) => {
            btn.addEventListener('click', this.deleteBtnHandler)
        })
    }
}


export { UserListHandler }