import { BasicFormHandler } from './form-handler'
import { Notification } from './notification'

class LoginHandler extends BasicFormHandler{

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
            const options = {
                url: '/login',
                method: 'POST',
                data,
                func: this.loginOK
            }
            this.fetchURL(options)
        }
    }

    loginOK(result) {
        if (result.result === 'invalid credentials') {
            Notification.showNotification(this.loginInput, 'Неверные данные')
            this.shakeBtn(this.submitBtn)
            return
        }
        if (result.result) {
            alert('Успех')
            return
        }
    }

}

export { LoginHandler }