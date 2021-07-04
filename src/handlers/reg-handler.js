import { BasicFormHandler } from './form-handler'
import { Notification } from './notification'

class RegistrationHandler extends BasicFormHandler {
    constructor(element) {
        super(element)
        this.isMailValid = false
        this.isLoginValid = false
        this.isPassValid = false
    }

    init() {
        this.emailInput = this.parentEl.querySelector('#email')
        this.loginInput = this.parentEl.querySelector('#login')
        this.passInput = this.parentEl.querySelector('#password')
        this.form = this.parentEl.firstElementChild
        this.submitBtn = this.parentEl.querySelector('.reg-form__submit-btn')

        this.emailInputHandler = this.emailInputHandler.bind(this)
        this.loginInputHandler = this.loginInputHandler.bind(this)
        this.passInputHandler = this.passInputHandler.bind(this)
        this.submitFormHandler = this.submitFormHandler.bind(this)
        this.inputFocusHandler = this.inputFocusHandler.bind(this)
        this.fetchOK = this.fetchOK.bind(this)

        this.emailInput.addEventListener('blur', this.emailInputHandler)    
        this.loginInput.addEventListener('blur', this.loginInputHandler)
        this.passInput.addEventListener('blur', this.passInputHandler)
        this.form.addEventListener('submit', this.submitFormHandler)

        this.inputs = this.parentEl.querySelectorAll('.reg-form__input')
        this.inputs.forEach((el) => {
            el.addEventListener('focus', this.inputFocusHandler)
        })
    }

    submitFormHandler(e) {
        e.preventDefault()
        this.checkMail(this.emailInput)
        this.checkLogin(this.loginInput)
        this.checkPassword(this.passInput)
        const isDataUsable = this.isMailValid && this.isLoginValid && this.isPassValid
        if (!isDataUsable) {
            this.shakeBtn(this.submitBtn)
        } else {
            this.fetchRegistration()
        }
        
    }

    async fetchRegistration() {
        const data = new FormData(this.form)
        const options = {
            url: '/user/registration',
            method: 'POST',
            data,
            func: this.fetchOK
        }
        this.fetchURL(options)
    }

    fetchOK(result) {
        if (result.result === 'login is already in use') {
            Notification.showNotification(this.loginInput, 'Пользователь с таким аккаунтом уже зарегистрирован')
            this.shakeBtn(this.submitBtn)
            return
        }
        if (result.result === 'success') {
            alert('Код подтверждения был направлен вам на почту')
            return
        } else {
            this.modal.showModal('Что-то пошло не так...')
        }
    }

    inputFocusHandler(e) {
        Notification.hideNotification(e.target)
    }

    emailInputHandler(e) {
        this.checkMail(e.target)
    }

    loginInputHandler(e) {
        this.checkLogin(e.target)
    }

    passInputHandler(e) {
        this.checkPassword(e.target)
    }

    checkMail(element) {
        const inputValue = element.value
        let message;
        if (
            !this.isMailUsable(inputValue) ||
            inputValue.length < 6 ||
            this.hasCyrillic(inputValue)
            ) {
            message = 'Введите корректный e-mail'
            Notification.showNotification(element, message)
            this.isMailValid = false
        } else {
            this.isMailValid = true
        }
    }

    checkLogin(element) {
        const inputValue = element.value
        let message;
        if (inputValue.length < 4) {
            message = 'Логин должен быть не менее 4 символов'
            Notification.showNotification(element, message)
            this.isLoginValid = false
        } else if (this.hasSpecSymbols(inputValue)) {
            message = 'Имя пользователя может включать латинские буквы и цифры'
            Notification.showNotification(element, message)
            this.isLoginValid = false
        } else {
            this.isLoginValid = true
        }
    }
    
    checkPassword(element) {
        const inputValue = element.value
        const message = this.checkPasswordStrength(inputValue)
        if (message.length > 0) {
            Notification.showNotification(element, message)
            this.isPassValid = false
        } else {
            this.isPassValid = true
        }
    }

    checkPasswordStrength(value) {
        let message;
        if (value.length < 4) {
            message = 'Пароль должен быть не менее 8 символов'
        } else if (this.hasCyrillic(value)) {
            message = 'Пароль может включать латинские буквы, цифры и символы'
        } else if (!this.hasUppercase(value)) {
            message = 'Пароль должен содержать как минимум одну заглавную букву'
        } else if (this.hasSimpleSequence(value)) {
            message = 'Ваш пароль слишком простой'
        } else {
            message = ''
        }
        return message
    }

}

export { RegistrationHandler }