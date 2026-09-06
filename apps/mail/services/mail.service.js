// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}



function getEmptyMail(
    createdAt = Date.now(),
    subject = '',
    body = '',
    isRead = false,
    sentAt = '',
    removedAt = null,
    from = 'momo@momo.com',
    to = 'user@appsus.com'
) {
    return { createdAt, subject, body, isRead, sentAt, removedAt, from, to }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        const vendors = ['audu', 'fiak', 'subali', 'mitsu']
        for (let i = 0; i < 6; i++) {
            const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
            mails.push(_createMail(vendor, utilService.getRandomIntInclusive(80, 300)))
        }
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(sub) {
    const mail = getEmptyMail()
    mail.id = utilService.makeId()
    return mail
}