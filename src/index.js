import './normalize.scss'
import './style.scss'

import { BasicFormHandler } from './form-handler'
import { RegistrationHandler } from './reg-handler'
import { ChangePassHandler } from './change-pass-handler'
import { SubscribeHandler } from './subscribe-handler'
import { Notification } from './notification'

class LoginHandler extends BasicFormHandler{
    // constructor(element) {
    //     this.parentEl = element
    //     if (this.parentEl) {
    //         this.init()
    //     }
        
    // }
    init() {
        this.loginInput = this.parentEl.querySelector('#login')
        this.passInput = this.parentEl.querySelector('#password')
        this.form = this.parentEl.firstElementChild
        this.submitBtn = this.parentEl.querySelector('.reg-form__submit-btn')

        this.loginInputHandler = this.loginInputHandler.bind(this)
        this.passInputHandler = this.passInputHandler.bind(this)
        this.submitFormHandler = this.submitFormHandler.bind(this)
        this.inputFocusHandler = this.inputFocusHandler.bind(this)

        this.loginInput.addEventListener('blur', this.loginInputHandler)
        this.passInput.addEventListener('blur', this.passInputHandler)
        this.form.addEventListener('submit', this.submitFormHandler)

        this.inputs = this.parentEl.querySelectorAll('.reg-form__input')
        this.inputs.forEach((el) => {
            el.addEventListener('focus', this.inputFocusHandler)
        })
    }

    loginInputHandler(e) {
        this.checkInput(e.target, 'Введите логин')
    }
    passInputHandler(e) {
        this.checkInput(e.target, 'Введите пароль')
    }
    inputFocusHandler(e) {
        Notification.hideNotification(e.target)
    }

    checkInput(element, errorMessage) {
        const inputValue = element.value
        if (inputValue.length === 0) {
            Notification.showNotification(element, errorMessage)
            return false
        } else {
            return true
        }
    }
    
    async submitFormHandler(e) {
        e.preventDefault()
        const isLoginValid = this.checkInput(this.loginInput, 'Введите логин')
        const isPassValid = this.checkInput(this.passInput, 'Введите пароль')
        if (
            !isLoginValid ||
            !isPassValid
        ) {
            this.submitBtn.classList.add('reg-form__submit-btn_animated')
            setTimeout(() => this.submitBtn.classList.remove('reg-form__submit-btn_animated'), 500)
            e.preventDefault()
        } else {
            const data = new FormData(this.form)
            try {
                let response = await fetch('/login', {
                    method: 'POST',
                    // headers: {
                    //   'Content-Type': 'application/x-www-form-urlencoded'
                    // },
                    body: data
                });
                if (response.ok) {
                    let result = await response.json();
                    if (result.result === 'invalid credentials') {
                        Notification.showNotification(this.loginInput, 'Неверные данные')
                        this.shakeBtn(this.submitBtn)
                        return
                    }
                    if (result.result) {
                        alert('Успех')
                        return
                    }
                } else {
                    Notification.showNotification(this.loginInput, 'Непредвиденная ошибка, попробуйте еще раз или перезагрузите страницу')
                    this.shakeBtn(this.submitBtn)
                }
            } catch (error) {
                console.log('er', error)
                Notification.showNotification(this.loginInput, 'Непредвиденная ошибка, попробуйте еще раз или перезагрузите страницу')
                this.shakeBtn(this.submitBtn)
              }
        }
    }

    
}

class UserListHandler {
    constructor(element) {
        this.parentEl = element
        this.users = []
        this.counter = 0
        if (this.parentEl) {
            this.init()
        }
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
        try {
            let response = await fetch('/user/accounts/delete', {
                method: 'POST',
                // headers: {
                //   'Content-Type': 'application/x-www-form-urlencoded'
                // },
                body: JSON.stringify({login: data})
            });
            if (response.ok) {
                let result = await response.json();
                if (result.result) {
                    alert('Успех')
                    this.users = result.result
                    this.renderUserList()
                    return
                }
            } else {
                // Notification.showNotification(elem, 'Непредвиденная ошибка, попробуйте еще раз или перезагрузите страницу')
                // this.submitBtn.classList.add('reg-form__submit-btn_animated')
                // setTimeout(() => this.submitBtn.classList.remove('reg-form__submit-btn_animated'), 500)
            }
        } catch (error) {
            console.log('er', error)
            // Notification.showNotification(elem, 'Непредвиденная ошибка, попробуйте еще раз или перезагрузите страницу')
            // this.submitBtn.classList.add('reg-form__submit-btn_animated')
            // setTimeout(() => this.submitBtn.classList.remove('reg-form__submit-btn_animated'), 500)
          }
        this.renderUserList()
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

        this.fetchURL()
    }

    deleteUserOk(result) {
        if (result.result) {
            alert('Успех')
            this.users = result.result
            this.renderUserList()
            return
        }
    }

    async fetchURL(options) {
        const {url, method, data, func} = options
        try {
            const response = await fetch(url, {
                method: method,
                // headers: {
                //   'Content-Type': 'application/x-www-form-urlencoded'
                // },
                body: data
            });
            if (response.ok) {
                const result = await response.json();
                func(result)
            } else {
                Notification.showNotification(elem, 'Непредвиденная ошибка, попробуйте еще раз или перезагрузите страницу')
                // this.submitBtn.classList.add('reg-form__submit-btn_animated')
                // setTimeout(() => this.submitBtn.classList.remove('reg-form__submit-btn_animated'), 500)
            }
        } catch (error) {
            console.log('er', error)
            Notification.showNotification(elem, 'Непредвиденная ошибка, попробуйте еще раз или перезагрузите страницу')
            // this.submitBtn.classList.add('reg-form__submit-btn_animated')
            // setTimeout(() => this.submitBtn.classList.remove('reg-form__submit-btn_animated'), 500)
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



const regForm = document.querySelector('.reg-form__container')
const changePassForm = document.querySelector('.change-pass-form__container')
const loginForm = document.querySelector('.login-form__container')
const userList = document.querySelector('.user-list__container')
const subscribeForm = document.querySelector('.subscription__container')
const registrationHandler = new RegistrationHandler(regForm)
const changePassHandler = new ChangePassHandler(changePassForm)
const loginHandler = new LoginHandler(loginForm)
const userListHandler = new UserListHandler(userList)
const subscribeHandler = new SubscribeHandler(subscribeForm)
