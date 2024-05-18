import { useState, ReactNode, createContext, useEffect } from "react";
//import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

interface AuthContextData {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credencials: SignInProps) => Promise<void>
}


interface UserProps {
    id: string;
    name: string;
    email: string;
    document: string;
    phone_number: string;
    email_verified_at: string | null;
    profile_photo_url: string;
    type: UserType;
}

export interface UserType {
    id: number;
    description: string;
}

type AuthProviderProps = {
    children: ReactNode
}

interface SignInProps {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInProps) {
        console.log({
            email,
            password
        })
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}