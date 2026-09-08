const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../../../services/mail.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
// import { useEffectUpdate } from '../custom-hooks/useEffectUpdate.js'

export function MailIndex() {
    const [mails, setMails] = useState(null)

    // const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        loadMails()
    }, [filterBy])

    // useEffectUpdate(() => {
    //     loadMails(filterBy)
    //     setSearchParams(utilService.trimObj(filterBy))
    // }, [filterBy])
    //react 4 car
    function loadMails() {
        mailService.query(filterBy)
            .then(mails => setMails(mails))
            .catch(err => console.log('err', err)
            )
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                console.log('mailId:', mailId)

                setMails(prev => prev.filter(mail => mail.id !== mailId))
                showSuccessMsg(`mail ${mailId} removed`)
            })
            .catch(err => {
                console.log('err', err)

                showErrorMsg('Problem removing ' + mailId)
            })
    }


    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    console.log(mails);

    //DOM
    if (!mails) return <div>Loading...</div>

    return (
        <section className="mail-index">
            <MailFilter
                filterBy={filterBy}
                onSetFilterBy={onSetFilterBy}
            />
            <MailList
                mails={mails}
                onRemoveMail={onRemoveMail}
            />
        </section>
    )
}

