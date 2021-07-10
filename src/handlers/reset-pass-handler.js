import { BasicFormHandler } from './form-handler'
import { Notification } from './notification'
import { Modal } from './modal'

class ResetPassHandler extends BasicFormHandler {
    init() {
        this.loginInput = this.parentEl.querySelector('#login')
        this.form = this.parentEl.firstElementChild
        this.submitBtn = this.parentEl.querySelector('.reg-form__submit-btn')

        this.loginInputHandler = this.loginInputHandler.bind(this)
        this.submitFormHandler = this.submitFormHandler.bind(this)
        this.inputFocusHandler = this.inputFocusHandler.bind(this)
		this.ResetPasswordOk = this.ResetPasswordOk.bind(this)
		
        this.loginInput.addEventListener('blur', this.loginInputHandler)
        this.form.addEventListener('submit', this.submitFormHandler)

        this.inputs = this.parentEl.querySelectorAll('.reg-form__input')
        this.inputs.forEach((el) => {
            el.addEventListener('focus', this.inputFocusHandler)
        })
    }

    loginInputHandler(e) {
        this.checkInput(e.target, 'Введите логин')
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
        if (!isLoginValid) {
            this.submitBtn.classList.add('reg-form__submit-btn_animated')
            setTimeout(() => this.submitBtn.classList.remove('reg-form__submit-btn_animated'), 500)
            e.preventDefault()
        } else {
            // const data = new FormData(this.form)
            // const hash = await this.convertToSHA515(this.passInput.value)
            // data.set('password', hash)
            const options = {
                url: '/user/reset-password',
                method: 'POST',
                data: new FormData(this.form),
                func: this.ResetPasswordOk
            }
            this.fetchURL(options)
        }
    }

    ResetPasswordOk(response) {
        const result = response.result
        if (result === 'invalid login') {
            Notification.showNotification(this.loginInput, 'Логин не найден')
            this.shakeBtn(this.submitBtn)
            return
        }
        if (result === 'success') {
			this.modal.showModal('Ссылка для смены пароля была направлена на вашу почту!')
        } else {
            this.modal.showModal('Что-то пошло не так...')
        }
    }
}

export { ResetPassHandler }