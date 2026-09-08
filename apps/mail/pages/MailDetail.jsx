import { mailService } from "../../../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => {
                console.log(params.mailId, mail)
                return mail
            })
            .then(setMail)
            .catch(err => {
                console.log(`err: ${err}`)
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/mail')
    }

    console.log('render')
    if (!mail) return <div>Loading...</div>
    return (
        <section className="mail-details">
            <h1>Sent from: {mail.from}</h1>
            <h1>Subject: {mail.subject}</h1>
            <button onClick={onBack}>Back</button>
        </section>
    )
}