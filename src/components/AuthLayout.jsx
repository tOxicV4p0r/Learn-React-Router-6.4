import { useOutlet } from "react-router-dom";

const AuthLayout = ()=>{
    const outlet = useOutlet();

    return (
        <div>Auth Layout</div>
    )
};

export default AuthLayout;