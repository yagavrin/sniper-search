import { BasicFormHandler } from './form-handler'
import { Notification } from './notification'
import { Modal } from './modal'

class UserListHandler extends BasicFormHandler {
    constructor(element) {
        super(element)
        this.users = []
        this.counter = 0

    }
    init() {
        this.deleteBtnsArray = this.parentEl.querySelectorAll('.user-list__button_delete')
        this.userElArray = this.parentEl.querySelectorAll('.user-list__user-name')
        this.users = Array.from(this.userElArray).map(element => element.textContent)
        this.input = this.parentEl.querySelector('.user-list__input')
        this.addUserForm = this.parentEl.querySelector('.user-list__form')
        this.addBtn = this.addUserForm.querySelector('.user-list__button')
        this.list = this.parentEl.querySelector('.user-list__ul')

        this.submitFormHandler = this.submitFormHandler.bind(this)
        this.deleteBtnHandler = this.deleteBtnHandler.bind(this)
        
        this.addUserForm.addEventListener('submit', this.submitFormHandler)
        this.deleteBtnsArray.forEach((btn) => {
            btn.addEventListener('click', this.deleteBtnHandler)
        })
    }
    deleteBtnHandler(e) {
        const li = e.target.closest('li')
        const login = li.querySelector('.user-list__user-name').textContent
        const options = {
            url: '/accounts/delete',
            method: 'POST',
            data: JSON.stringify({login: login}),
            func: this.deleteUserIsOk,
        }
        this.fetchURL(options)
       
    }
    fetchUSerIsOK(response) {
        const result = response.result
        if (result = 'error') {
            return
        }
        if (result = 'login not found') {
            return
        }
        if (result = 'no permissions') {
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
    submitFormHandler(e) {
        e.preventDefault()
        const data = new FormData(this.addUserForm)
        if (data.length === 0) return
        const options = {
            url: '/accounts/add/',
            method: 'POST',
            data: JSON.stringify({login: data}),
            func: this.fetchUSerIsOK
        }
        this.fetchURL(options)
        this.renderUserList()
    }

    deleteUserIsOk(result) {
        if (result.result) {
            alert('Успех')
            this.users = result.result
            this.renderUserList()
            return
        } else {
            this.modal.showModal('Что-то пошло не так...')
        }
    }

    fetchUserList() {
        return ['user1', 'user2', 'user3']
    }
    renderUserList() {
        let html = ''
        this.users.forEach((user) => {
            const template = `
            <li class="user-list__list-el">
                <div class="user-list__user-name">${user}</div>
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