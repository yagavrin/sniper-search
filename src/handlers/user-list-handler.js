import { BasicFormHandler } from './form-handler'
import { Notification } from './notification'

class UserListHandler extends BasicFormHandler {
    constructor(element) {
        super(element)
        this.users = []
        this.counter = 0

    }
    init() {
        this.deleteBtnsArray = this.parentEl.querySelectorAll('.user-list__button_delete')
        this.deleteBtnHandler = this.deleteBtnHandler.bind(this)
        this.addUserHandler = this.addUserHandler.bind(this)
        this.deleteBtnsArray.forEach((btn) => {
            btn.addEventListener('click', this.deleteBtnHandler)
        })
        this.userElArray = this.parentEl.querySelectorAll('.user-list__user-name')
        this.users = Array.from(this.userElArray).map(element => element.textContent)
        this.input = this.parentEl.querySelector('.user-list__input')
        this.addForm = this.parentEl.querySelector('.user-list__form')
        this.addBtn = this.addForm.querySelector('.user-list__button')
        this.list = this.parentEl.querySelector('.user-list__ul')
        
        this.addForm.addEventListener('submit', this.submitHandler)
        this.addBtn.addEventListener('click', this.addUserHandler)
    }
    deleteBtnHandler(e) {
        const li = e.target.closest('li')
        const login = li.querySelector('.user-list__user-name').textContent
        this.deleteUser(login, e.target)
       
    }
    async addUserHandler(e) {
        const data = this.input.value
        if (data.length === 0) return
        const options = {
            url: '/user/accounts/delete',
            method: 'POST',
            data: JSON.stringify({login: data}),
            func: this.fetchOK
        }
        this.fetchURL(options)
        this.renderUserList()
    }
    fetchOK(result) {
        if (result.result) {
            alert('Успех')
            this.users = result.result
            this.renderUserList()
            return
        }
    }
    submitHandler(e) {
        e.preventDefault()
    }
    async deleteUser(login, elem) {
        const options = {
            url: '/user/accounts/delete',
            method: 'POST',
            data: JSON.stringify({login: login}),
            func: this.deleteUserOk,
        }

        this.fetchURL(options)
    }

    deleteUserOk(result) {
        if (result.result) {
            alert('Успех')
            this.users = result.result
            this.renderUserList()
            return
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