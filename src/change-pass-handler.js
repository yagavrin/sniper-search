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


        this.newPassInput.addEventListener('blur', this.passInputHandler)
        this.repeatPassInput.addEventListener('blur', this.repeatPassHandler)
        this.form.addEventListener('submit', this.submitFormHandler)

        this.inputs = this.parentEl.querySelectorAll('.reg-form__input')
        this.inputs.forEach((el) => {
            el.addEventListener('focus', this.inputFocusHandler)
        })
    }

    repeatPassHandler(e) {
        this.comparePasswords(e.target)
    }

    async submitFormHandler(e) {
        e.preventDefault()
        
        this.checkOldPassword()
        this.checkPassword(this.newPassInput)
        this.comparePasswords(this.repeatPassInput)
        if (!this.isValid || !this.isOldPassValid) {
            this.shakeBtn(this.submitBtn)
        } else {
            const data = new FormData(this.form)
            try {
                let response = await fetch('/user/accounts', {
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

    checkOldPassword() {
        if (this.isOldPassEmpty()) {
            Notification.showNotification(this.passInput, 'Введите пароль')
            this.isOldPassValid = false;
        } else {
            this.isOldPassValid = true;
        }
    }

    isOldPassEmpty() {
        return this.passInput.value.length === 0
    }

    comparePasswords(element) {
        if (this.repeatPassInput.value.length === 0) {
            Notification.showNotification(element, 'Пароль должен быть не менее 8 символов')
            this.isValid = false
        } else if (!this.arePasswordsTheSame()) {
            Notification.showNotification(element, 'Пароли не совпадают')
            this.isValid = false
        }else {
            this.isValid = true
        }
    }

    arePasswordsTheSame() {
        return this.newPassInput.value === this.repeatPassInput.value
    }
}

export { ChangePassHandler }