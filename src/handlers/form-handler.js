import { Modal } from './modal'

class BasicFormHandler {
    constructor(element) {
        this.parentEl = element
        if (this.parentEl) {
            this.init()
            this.modal = new Modal()
            this.showPassBtnsArray = this.parentEl.querySelectorAll('.btn_show-pass')
            this.showPassBtnHandler = this.showPassBtnHandler.bind(this)
            this.showPassBtnsArray.forEach((btn) => {
                btn.addEventListener('click', this.showPassBtnHandler)
            })
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
                this.modal.showModal('Что-то пошло не так...')
            }
        } catch (error) {
            console.log('er', error)
            this.modal.showModal('Что-то пошло не так...')
        }
    }

    showPassBtnHandler(e) {
        const btn = e.target
        const parentEl = btn.parentElement
        const input = parentEl.querySelector('.reg-form__input')
        if (input.type === 'password') {
            btn.textContent = 'Скрыть'
            input.type = 'text'
        } else {
            btn.textContent = 'Показать'
            input.type = 'password'
        }
    }

    async convertToSHA515(data) {
        // encode as UTF-8
        const msgBuffer = new TextEncoder('utf-8').encode(data);
      
        // hash the message
        const hashBuffer = await window.Crypto.subtle.digest('SHA-512', msgBuffer);
      
        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));
      
        // convert bytes to hex string
        const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
        // console.log(hashHex);
        return hashHex;
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