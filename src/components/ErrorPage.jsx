import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const err = useRouteError();
    console.error(err);

    return (
        <div>
            <h1>Opps!</h1>
            <i>{err.statusText || err.message}</i>
        </div>
    )
}