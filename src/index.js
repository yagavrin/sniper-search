import './normalize.scss'
import './style.scss'

import { BasicFormHandler } from './handlers/form-handler'
import { RegistrationHandler } from './handlers/reg-handler'
import { ChangePassHandler } from './handlers/change-pass-handler'
import { SubscribeHandler } from './handlers/subscribe-handler'
import { LoginHandler } from './handlers/login-handler'
import { UserListHandler } from './handlers/user-list-handler'
import { ResetPassHandler } from './handlers/reset-pass-handler'
import { SetNewPassHandler } from './handlers/set-new-pass-handler'
import { Notification } from './handlers/notification'

const header = document.querySelector('header')
const toggleHeader = (e) => {
    console.log(e)
    e.target.closest('header').classList.toggle('header_disabled')
}
if (header) {
    header.addEventListener('click', toggleHeader)
}



const regForm = document.querySelector('.reg-form__container')
const changePassForm = document.querySelector('.change-pass-form__container')
const loginForm = document.querySelector('.login-form__container')
const userList = document.querySelector('.user-list__container')
const subscribeForm = document.querySelector('.subscription__container')
const resetPasswordForm = document.querySelector('.reset-password-form__container')
const setNewPasswordForm = document.querySelector('.set-new-pass-form__container')

const registrationHandler = new RegistrationHandler(regForm)
const resetPasswordHandler = new ResetPassHandler(resetPasswordForm)
const setNewPassHandler = new SetNewPassHandler(setNewPasswordForm)
const changePassHandler = new ChangePassHandler(changePassForm)
const loginHandler = new LoginHandler(loginForm)
const userListHandler = new UserListHandler(userList)
const subscribeHandler = new SubscribeHandler(subscribeForm)
