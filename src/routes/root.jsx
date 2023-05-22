import { Form, Link, Outlet, useActionData, useLoaderData } from "react-router-dom";

export default function Root() {
    const contacts = useLoaderData();
    const dataAction = useActionData();
    console.log('Root');
    console.log(contacts);
    console.log(dataAction);

    return (
        <div style={{ display: "flex" }}>
            <div id="sidebar">
                <h1>React Router Contacts </h1>
                <h2>contact : {contacts.first}</h2>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <form method="post">
                        <button type="submit">New</button>
                    </form>
                    <Form method="post"><button type="submit">New Form Router</button></Form>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href={`/contacts/1`}>Your Name</a>
                        </li>
                        <li>
                            <a href={`/contacts/2`}>Your Friend</a>
                        </li>
                        <li>
                            <Link to={"/contacts/1"}>Link contact 1</Link>
                        </li>
                        <li>
                            <Link to={"/contacts/2"}>Link contact 2</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"><Outlet /></div>
        </div>
    );
}

export async function loader({ params }) {
    console.log(params)
    const contacts = await getContacts(params.contactId);
    console.log(contacts)
    return contacts;
}

export async function actionContact() {
    const contacts = await getContacts(5);
    console.log('actionContact')
    console.log(contacts)
    return contacts;
}

export function getContacts(id = 0) {
    return new Promise((resolve, reject) => {
        setTimeout((id) => {
            console.log(id)
            resolve({
                first: `Your ${id}`,
                last: `Name ${id}`,
                avatar: `https://placekitten.com/g/200/${id*100}`,
                twitter: `your_handle_${id}`,
                notes: "Some notes",
                favorite: true,
            });
        }, 0, id);
    });
}