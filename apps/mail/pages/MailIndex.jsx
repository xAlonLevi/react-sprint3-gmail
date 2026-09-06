const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

// import { MailList } from '../cmps/MailList.jsx'
// import { MailFilter } from '../cmps/MailFilter.jsx'
import { mailService } from '../../../services/mail.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
// import { useEffectUpdate } from '../custom-hooks/useEffectUpdate.js'

export function MailIndex() {
    // return <section className="container">Mail app</section>

    const [mails, setMails] = useState(null)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter(searchParams))

    useEffect(() => {
        loadMails(filterBy)
    }, [])

    // useEffectUpdate(() => {
    //     loadMails(filterBy)
    //     setSearchParams(utilService.trimObj(filterBy))
    // }, [filterBy])

    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }

    function onRemoveMail(mailId) {
        mailService
            .remove(mailId)
            .then(() => {
                setMails(prev => prev.filter(mail => mail.id !== mailId))
                onClearFilter()
                showSuccessMsg(`mail ${mailId} removed`)
            })
            .catch(err => showErrorMsg(`Couldn't remove ${mailId}`))
    }

    function onClearFilter() {
        setFilterBy(mailService.getDefaultFilter())
    }
console.log(mails);


}

