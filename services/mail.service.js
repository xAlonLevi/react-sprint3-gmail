import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.from) {
                const regExp = new RegExp(filterBy.from, 'i')
                mails = mails.filter(mail => regExp.test(mail.from))
            }

            if (filterBy.subject) {
                const regExp = new RegExp(filterBy.subject, 'i')
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

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(
    from = 'momo@momo.com',
    to = 'user@appsus.com',
    subject = 'Cool-project',
    body = 'muscular',
    createdAt = Date.now(), //when was written
    sentAt = null,
    isRead = false,
    removedAt = null,
) {
    return {
        from,
        to,
        subject,
        body,
        createdAt,
        sentAt,
        isRead,
        removedAt
    }
}

function getDefaultFilter() {
    return {
        from: '',
        subject: ''
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)

    if (!mails || !mails.length) {
        mails = []

        mails.push(_createMail(
            'dodo@momo.com',
            'user@appsus.com',
            'Cool-project',
            'muscular',
            Date.now(), //when was written
            null,
            false,
            null,
        ))

        mails.push(_createMail(
            'momo@momo.com',
            'user@appsus.com',
            'Cool-project',
            'muscular',
            Date.now(), //when was written
            null,
            false,
            null,
        ))

        mails.push(_createMail(
            'lolo@momo.com',
            'user@appsus.com',
            'Cool-project',
            'muscular',
            Date.now(), //when was written
            null,
            false,
            null,
        ))

        mails.push(_createMail(
            'koko@momo.com',
            'user@appsus.com',
            'Cool-project',
            'muscular',
            Date.now(), //when was written
            null,
            false,
            null,
        ))

        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(
    from = '',
    to = '',
    subject = '',
    body = '',
    createdAt = Date.now(),
    sentAt = null,
    isRead = false,
    removedAt = null
) {
    const mail = getEmptyMail(
        from,
        to,
        subject,
        body,
        createdAt,
        sentAt,
        isRead,
        removedAt
    )
    mail.id = utilService.makeId()

    return mail
}


//  from = 'momo@momo.com',
//     to = 'user@appsus.com',
//     subject = 'Cool-project',
//     body = 'muscular',
//     createdAt = '', //when was written
//     sentAt = '',
//     isRead = false,
//     removedAt = null,