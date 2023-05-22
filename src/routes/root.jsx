import { useEffect } from "react";
import { Form, Link, Outlet, redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom";

export default function Root() {
    const { contacts, q } = useLoaderData();
    const dataAction = useActionData();
    const navigation = useNavigation();
    console.log('Root');
    console.log(navigation);

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
        <div style={{ display: "flex" }}>
            <div id="sidebar">
                <h1>React Router Contacts </h1>
                <h2>contact : {contacts.first}</h2>
                <h2>Navigation : {navigation.state}</h2>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                        />
                        <div id="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite"></div>
                    </Form>
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


export async function rootLoader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const contacts = await getContacts(q);
    return { contacts, q };
}

export async function conLoader({ params }) {
    const contacts = await getContacts(params.contactId);
    return contacts;
}

export async function contactLoader({ params }) {
    const contacts = await getContacts(params.contactId);
    return contacts;
}

export async function actionRoot() {
    console.log('actionRoot')
    const contacts = await getContacts(0);
    console.log('return actionRoot')
    console.log(contacts)
    return redirect(`/contacts/${0}`);
}

export async function actionContact({ params = { contactId: 0 } }) {
    console.log('actionContact')
    const { contactId } = params
    const id = contactId ? contactId : 0;
    const contacts = await getContacts(id + 1);
    console.log('return actionContact')
    console.log(contacts)
    return redirect(`/contacts/${id + 1}`);
}

export function getContacts(id = 0) {
    return new Promise((resolve, reject) => {
        setTimeout((id) => {
            resolve({
                first: `Your ${id}`,
                last: `Name ${id}`,
                avatar: `https://placekitten.com/g/200/${id * 100}`,
                twitter: `your_handle_${id}`,
                notes: "Some notes",
                favorite: true,
            });
        }, 1000, id);
    });
}