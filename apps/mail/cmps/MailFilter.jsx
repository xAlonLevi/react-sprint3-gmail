const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        // ADD THIS SWITCHCASE WHEN DATE AND SO ON
        //CHECK BOXES ARE INTEGRATED

        //  switch (target.type) {
        //     case 'number':
        //     case 'range':
        //         value = +value || ''
        //         break;

        //     case 'checkbox':
        //         value = target.checked
        //         break

        //     default:
        //         break;
        // }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { from, subject } = filterByToEdit
    return (
        <section className="mail-filter">
            <h2>Filter Your Emails</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="from">Sent from: </label>
                <input
                    value={from}
                    onChange={handleChange}
                    type="text"
                    placeholder="By sender"
                    id="from"
                    name="from"
                />
               
                <label htmlFor="from">Subject: </label>
                <input
                    value={subject}
                    onChange={handleChange}
                    type="text"
                    placeholder="By subject"
                    id="subject"
                    name="subject"
                />
            </form>
        </section>
    )
}