import { useState, ReactNode, createContext, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClient";
interface AuthContextData {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credencials: SignInProps) => Promise<void>
    signUp: (credencials: SignUpProps) => Promise<void>
}


interface UserProps {
    id: number;
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

interface SignUpProps {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    document: string;
    phone_number: string;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    console.log('SignOut')
    try {
        destroyCookie(null, '@bitzenpet.token', { path: '/' }) //destroi token para todas rotas
        Router.push('/login');
    } catch (err) {
        console.log('Erro ao sair');
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/login', {
                email,
                password
            })

            const { token } = response.data.data;
            const { id, name, document, phone_number, email_verified_at, profile_photo_url, type } = response.data.data.user;

            setCookie(undefined, '@bitzen.token', token, {
                maxAge: 60 * 60 * 24 * 30, //expira em 1 mes
                patch: '/'
            })

            setUser({
                id,
                name,
                email,
                profile_photo_url,
                type,
                document,
                phone_number,
                email_verified_at
            })

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            Router.push('/dashboard');

        } catch (err) {
            console.log('Erro ao entrar', err);
        }
    }

    async function signUp({
        name,
        email,
        document,
        phone_number,
        password,
        password_confirmation
    }: SignUpProps) {
        try {
            const response = await api.post('/register', {
                name,
                email,
                document,
                phone_number,
                password,
                password_confirmation
            })

            console.log("response")
            console.log(response)

            await signIn({ email, password })

            // Router.push('/login');

        } catch (err) {
            console.log('Erro ao cadastrar', err);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn,
            signUp,
        }}>
            {children}
        </AuthContext.Provider>
    )
}