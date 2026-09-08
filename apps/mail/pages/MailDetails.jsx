import { mailService } from "../../../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailDetails() {
    const [mails, setMails] = useState(null)
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
        loadMails()
    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => {
                mail.isRead = true
                return mailService.save(mail)
            })
            .then(setMail)
            .catch(err => {
                console.log(`err: ${err}`)
                navigate('/mail')
            })
    }

    function loadMails() {
        mailService.query()
            .then(mails => {
                console.log('all mails: ', mails)
                setMails(mails)
            })
            .catch(err => {
                console.log(`err: ${err}`)
            })
    }

    function onBack() {
        navigate('/mail')
    }

    function onRemoveMail() {
        mailService.remove(params.mailId)
            .then(() => {
                navigate('/mail')
            })

            .catch(err => {
                console.log(`err: ${err}`)
            })

    }

    function onPrevMail() {
        if (!prevMail) return
        navigate(`/mail/${prevMail.id}`)
    }

    function onNextMail() {
        if (!nextMail) return
        navigate(`/mail/${nextMail.id}`)
    }

    if (!mail || !mails) return <div>Loading...</div>

    const mailIdx = mails.findIndex(mail => mail.id === params.mailId)

    const prevMail = mails[mailIdx - 1]
    const nextMail = mails[mailIdx + 1]

    return (
        <section className="mail-details">
            <h1>Sent from: {mail.from}</h1>
            <h1>Subject: {mail.subject}</h1>
            <p>{mail.body || 'No data'}</p>
            <button onClick={onRemoveMail}>Delete</button>
            <button onClick={onBack}>Back</button>

            <button onClick={onPrevMail} disabled={!prevMail}>
                Previous mail
            </button>

            <button onClick={onNextMail} disabled={!nextMail}>
                Next mail
            </button>

        </section>
    )
}