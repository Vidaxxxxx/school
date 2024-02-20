import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSocket } from "../SocketIO/socket";

const AuthContext = React.createContext(null);

/**
 *  Custom hook to access the AuthContext. 
 * @returns {Object} The AuthContext object.
 */
const useAuth = () => React.useContext(AuthContext);

/**
 * AuthProvider component for handling authentication.
 *
 * @param {Object} children - The child components to be wrapped by the AuthProvider.
 * @return {JSX.Element} The wrapped child components with the AuthContext Provider.
 */
function AuthProvider({ children }) {
    const [token, setToken] = React.useState(null);
    const navigate = useNavigate();
    const socket = useSocket();

    socket.on("disconnect", (reason, details) => {
        console.log("Disconnected by the server reason: ", reason);
        console.log("details: ", details);
        handleLogout();
    });


    const handleLogin = (token) => {
        setToken(token);
        console.log("Token enregistré !");
        navigate("/");
    };

    const handleLogout = () => {
        setToken(null);
    };

    const getToken = () => {
        return jwtDecode(token);
    }

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
        setToken,
        getToken,
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider, useAuth };