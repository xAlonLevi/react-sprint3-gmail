export function MailPreview({ mail }) {
    console.log(mail.createdAt, typeof mail.createdAt)
    return (
        <article className="mail-preview">
            <h2>{mail.from}</h2>
            <p>{mail.subject}</p>
            <p>{mail.body}</p>
            <p>{new Date(mail.createdAt).toLocaleString()}</p>
        </article>
    )
}


//  from = 'momo@momo.com',
//     to = 'user@appsus.com',
//     subject = 'Cool-project',
//     body = 'muscular',
//     createdAt = '', //when was written
//     sentAt = '',
//     isRead = false,
//     removedAt = null,