class BasicFormHandler {
    constructor(element) {
        this.parentEl = element
        
        if (this.parentEl) {
            this.init()
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
    }

    trimSpace(e) {
        const str = e.target.value.trim()
        e.target.value = str
    }

    shakeBtn(btn) {
        btn.classList.add('reg-form__submit-btn_animated')
        setTimeout(() => btn.classList.remove('reg-form__submit-btn_animated'), 500)
    }

    isMailUsable(value) {
        const regExp = /^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/
        const isMailUsable = regExp.test(value)
        return isMailUsable
    }
    
    hasCyrillic(text) {
        const regExp = /[а-я ]/i
        return regExp.test(text)
    }

    hasSpecSymbols(text) {
        const regExp = /^[a-zA-Z0-9_]+$/
        return !text.match(regExp)
    }

    hasUppercase(text) {
        const regExp = /[A-Z]/
        return text.match(regExp)
    }
    hasLetters(text) {
        const regExp = /[a-z]/i
        return text.match(regExp)
    }
    hasSimpleSequence(text) {
        const regExp = /1234567/
        return text.match(regExp)
    }
}

export { BasicFormHandler }