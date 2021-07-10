import { BasicFormHandler } from './form-handler'
import { Notification } from './notification'
import { Modal } from './modal'
import { ChangePassHandler } from './change-pass-handler'

class SetNewPassHandler extends ChangePassHandler {

    async submitFormHandler(e) {
        e.preventDefault()
        const href = window.location.href
        const code = href.split('/user/reset-password-confirm/')[1]
        console.log(code)
        this.checkPassword(this.newPassInput)
        this.comparePasswords(this.newPassInput, this.repeatPassInput)
        if (!this.isValid) {
            this.shakeBtn(this.submitBtn)
        } else {
            const data = new FormData(this.form)
            const options = {
                url: '/user/reset-password-confirm/' + code,
                method: 'POST',
                data,
                func: this.changePassIsOK,
            }
            this.fetchURL(options)
        }
        
    }

    changePassIsOK(response) {
        const result = response.result
        if (result === 'link was expired') {
            this.modal.showModal('Ссылка для сброса пароля устарела. Попробуйте еще раз')
            return
        }
        if (result === 'success') {
            this.modal.showModal('Вы успешно установили новый пароль')
            return
        }
    }
}

export { SetNewPassHandler }