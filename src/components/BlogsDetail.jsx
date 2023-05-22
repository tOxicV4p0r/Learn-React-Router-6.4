import { useLoaderData, useParams } from "react-router-dom";

export const Home = () => {
    const param = useParams();

    return (
        <div>Home page {param.id}</div>
    )
};

export const BlogDetail = () => {
    const data = useLoaderData();
    const param = useParams();
    const id = param.id;

    return (
        <div>
            <div>show blog data {data.name}</div>
            <div>param : {id}</div>
        </div>
    )
};

export const BlogDetailLoading = ({ param = { id: 0 } }) => {
    console.log(param);
    return getData(param.id);
}

function getData(id) {
    return new Promise((resolve, reject) => {
        setTimeout((blogId) => {
            resolve({ name: `Blog ${blogId}` });
        }, 1000, id);
    });
}