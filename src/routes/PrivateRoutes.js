import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

function PrivateRoutes(props) {
    const navigate = useNavigate();

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            navigate('/login');
        }
    }, []);

    return (
        <Routes>
            <Route path={props.path} Component={props.component} />
        </Routes>
    );
}

export default PrivateRoutes;