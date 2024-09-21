import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null); // Set initial state to null for better handling
    const [isLoading, setIsLoading] = useState(true); 
    const [services, setServices] = useState([]); 
    const authorizationToken = `Bearer ${token}`;

    // Function to store the token in local storage
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken); // Update state to reflect new token
        localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;
    console.log("isLoggedIn", isLoggedIn);

    const LogoutUser = () => {
        setToken(null);
        localStorage.removeItem("token");
        setUser(null); // Clear user data on logout
    };

    // Function to check user authentication and fetch user data
    const userAuthentication = async () => {
        setIsLoading(true);
        try {
            if (!token) {
                console.warn("No token found");
                return;
            }

            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    "Authorization": authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("User Data", data.userData); // Check the structure of response data
                setUser(data.userData); // Correctly set user data
                setIsLoading(false);
            } else {
                setIsLoading(false);
                console.error("Error fetching user data");
                setUser(null); // Handle non-OK responses
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setUser(null); // Handle fetch errors
        }
    };

    const getServiceData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/data/service", {
                method: "GET",
            });

            if (response.ok) {
                const service = await response.json();
                console.log(service.msg);
                setServices(service.msg);
            }
            console.log("service", response);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getServiceData();
        userAuthentication();
    }, [token]); // Depend on token to re-run authentication on token changes

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};
