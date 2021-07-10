import { BasicFormHandler } from './form-handler'
import { RegistrationHandler } from './reg-handler'
import { Notification } from './notification'

class ChangePassHandler extends RegistrationHandler {
    init() {
        this.isValid = false
        this.passInput = this.parentEl.querySelector('#password')
        this.newPassInput = this.parentEl.querySelector('.reg-form__new-pass')
        this.repeatPassInput = this.parentEl.querySelector('.reg-form__new-pass-repeat')
        this.form = this.parentEl.firstElementChild
        this.submitBtn = this.parentEl.querySelector('.reg-form__submit-btn')
        
        this.passInputHandler = this.passInputHandler.bind(this)
        // this.newPassInput = this.passInputHandler.bind(this)
        this.submitFormHandler = this.submitFormHandler.bind(this)
        this.inputFocusHandler = this.inputFocusHandler.bind(this)
        this.repeatPassHandler = this.repeatPassHandler.bind(this)
        this.changePassIsOK = this.changePassIsOK.bind(this)

        this.newPassInput.addEventListener('blur', this.passInputHandler)
        this.repeatPassInput.addEventListener('blur', this.repeatPassHandler)
        this.form.addEventListener('submit', this.submitFormHandler)

        this.inputs = this.parentEl.querySelectorAll('.reg-form__input')
        this.inputs.forEach((el) => {
            el.addEventListener('focus', this.inputFocusHandler)
        })
    }

    repeatPassHandler(e) {
        this.comparePasswords(this.newPassInput, e.target)
    }

    async submitFormHandler(e) {
        e.preventDefault()
        
        this.checkOldPassword(this.passInput)
        this.checkPassword(this.newPassInput)
        this.comparePasswords(this.newPassInput, this.repeatPassInput)
        if (!this.isValid || !this.isOldPassValid) {
            this.shakeBtn(this.submitBtn)
        } else {
            const data = new FormData(this.form)
            const options = {
                url: '/user/edit',
                method: 'POST',
                data,
                func: this.changePassIsOK,
            }
            this.fetchURL(options)
        }
        
    }

    changePassIsOK(response) {
        const result = response.result
        if (result === 'invalid password') {
            Notification.showNotification(this.loginInput, 'Неверный пароль')
            this.shakeBtn(this.submitBtn)
            return
        }
        if (result === 'success') {
            this.modal.showModal('Вы успешно сменили пароль')
            return
        }
    }

    checkOldPassword() {
        if (this.isOldPassEmpty(this.passInput)) {
            Notification.showNotification(this.passInput, 'Введите пароль')
            this.isOldPassValid = false;
        } else {
            this.isOldPassValid = true;
        }
    }

    isOldPassEmpty(value) {
        if (value) {
            return value.length === 0
        }
    }

    comparePasswords(newPassInput, repeatPassInput) {
        if (newPassInput.value.length === 0) {
            Notification.showNotification(newPassInput, 'Пароль должен быть не менее 8 символов')
            this.isValid = false
        } else if (!this.arePasswordsTheSame(newPassInput.value, repeatPassInput.value)) {
            Notification.showNotification(repeatPassInput, 'Пароли не совпадают')
            this.isValid = false
        } else {
            this.isValid = true
        }
    }

    arePasswordsTheSame(value1, value2) {
        return value1 === value2
    }
}

export { ChangePassHandler }