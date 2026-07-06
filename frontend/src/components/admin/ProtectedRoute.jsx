import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        // ❌ Only check login, NOT role
        if (!user) {
            navigate("/login"); // better than "/"
        }
    }, [user, navigate]);

    return <>{children}</>;
};

export default ProtectedRoute;
