import { BasicFormHandler } from './form-handler'
import { Notification } from './notification'

class SubscribeHandler extends BasicFormHandler {
    // constructor(element) {
    //     this.parentEl = element
    //     if (this.parentEl) {
    //         this.init()
    //     }
    // }

    init() {
        this.innEl = this.parentEl.querySelector('.subscription__input_inn')
        this.kppEl = this.parentEl.querySelector('.subscription__input_kpp')
        this.nameEl = this.parentEl.querySelector('.subscription__input_name')
        this.phoneEl = this.parentEl.querySelector('.subscription__input_phone')
        this.submitBtn = this.parentEl.querySelector('.subscription__btn')
        this.inputs = this.parentEl.querySelectorAll('.subscription__input')
        this.opfRadio1 = this.parentEl.querySelector('[value="ip"]')
        console.log(this.opfRadio1)
        this.form = this.parentEl.querySelector('.subscription__form')

        this.nameElHandler = this.nameElHandler.bind(this)
        this.innElHandler = this.innElHandler.bind(this)
        this.kppElHandler = this.kppElHandler.bind(this)
        // this.phoneElHandler = this.phoneElHandler.bind(this)
        this.formHandler = this.formHandler.bind(this)
        this.radioHandler = this.radioHandler.bind(this)

        this.nameEl.addEventListener('blur', this.nameElHandler)
        this.innEl.addEventListener('blur', this.innElHandler)
        this.kppEl.addEventListener('blur', this.kppElHandler)
        this.phoneEl.addEventListener('blur', this.phoneElHandler)
        this.inputs.forEach((input) => input.addEventListener('focus', this.inputFocusHandler))
        this.form.addEventListener('submit', this.formHandler)
        this.opfRadio1.addEventListener('click', this.radioHandler)
    }

    formHandler(e) {
        e.preventDefault()
        this.checkName(this.nameEl)
        this.checkInn(this.innEl)
        this.checkKpp(this.kppEl)
        const isDataUsable = this.isNameUsable && this.isInnUsable && this.isKppUsable
        if (!isDataUsable) {
            this.shakeBtn(this.submitBtn)
        } else {
            const options = {
                url: 'user/accounts/',
                method: 'POST',
                data: new FormData(this.form),
                func: this.addUserOK
            }
            this.fetchURL(options)
        }
    }

    addUserOK(result) {
        console.log(result)
    }

    radioHandler(e) {
        if (this.kppEl.hasAttribute('disabled')) {
            this.kppEl.removeAttribute('disabled')
        } else {
            this.kppEl.setAttribute('disabled', '')
        }
    }

    nameElHandler(e) {
        this.trimSpace(e)
        this.checkName(e.target)
    }

    checkName(element) {
        this.isNameUsable = this.checkLength(element, 1, 'Введите название организации')
    }

    innElHandler(e) {
        this.trimSpace(e)
        this.checkInn(e.target)
    }

    checkInn(element) {
        this.isInnUsable = this.checkLength(element, 10, 'Введите корректный ИНН')
        if (this.hasLetters(element.value)) {
            Notification.showNotification(element, 'Введите корректный ИНН')
            this.isInnUsable = false
        }
    }

    kppElHandler(e) {
        this.trimSpace(e)
        this.checkKpp(e.target)
    }

    checkKpp(element) {
        this.isKppUsable = this.checkLength(element, 9, 'Введите корректный КПП')
        if (this.hasLetters(element.value)) {
            Notification.showNotification(element, 'Введите корректный КПП')
            this.isKppUsable = false
        }
    }

    checkLength(element, len, errMessage) {
        if (element.value.length < len) {
            Notification.showNotification(element, errMessage)
            return false
        }
        return true
    }

    inputFocusHandler(e) {
        Notification.hideNotification(e.target)
    }

}

export { SubscribeHandler }