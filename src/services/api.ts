import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from '../context/AuthContext'
export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);

    //conexão com o banco e adição do token de verificação para as requisição
    const api = axios.create({
        baseURL: 'https://api.bitzen-pet.homologacao.bitzenwebsites.net/api',
        headers: {
            Authorization: `Bearer ${cookies['@bitzenpet.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response.status === 401) {
            if (typeof window !== undefined) {
                //deslogar user
                signOut();
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error);
    })

    return api;
}