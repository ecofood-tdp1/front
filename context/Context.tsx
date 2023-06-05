import { createContext, useState, useEffect, ReactNode } from "react";
import { buyerDefault, shopDefault } from "./users";

interface UserDataContextType {
    user: User;
    switchUser: (user: User) => void;
}

const UserDataContextDefaultValues: UserDataContextType = {
    user: buyerDefault,
    switchUser: () => { }
};

export const UserDataContext = createContext<UserDataContextType>(UserDataContextDefaultValues);

interface ContextProps {
    children: ReactNode;
}

export function Context({ children }: ContextProps) {
    const [currentUser, setCurrentUser] = useState<User>(buyerDefault);

    const switchUser = () => {
        const future_user = currentUser.type === "buyer" ? shopDefault : buyerDefault;
        setCurrentUser(future_user);
        console.log("Switched mode to " + future_user.type)
    };

    const value = {
        user: currentUser,
        switchUser
    };

    useEffect(() => {
        // Retrieve user data from localStorage on component mount
        const storedUserData = localStorage.getItem("UserDataContext");
        if (storedUserData) {
            setCurrentUser(JSON.parse(storedUserData) as User);
        }
    }, []);

    useEffect(() => {
        // Save user data to localStorage whenever it changes
        localStorage.setItem("UserDataContext", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
}

export default Context;
