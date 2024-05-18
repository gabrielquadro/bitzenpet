
//somente users authenticados

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        console.log("a1")

        const cookies = parseCookies(ctx);
        const token = cookies['@bitzenpet.token'];

        console.log(token)

        if (!token) {
            console.log("a2")

            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }

        try {
            console.log("a3")

            return await fn(ctx);
        } catch (err) {
            if (err instanceof AuthTokenError) {
                console.log("a3")

                destroyCookie(ctx, '@bitzenpet.token', { path: '/' })
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false
                    }
                }
            }
        }
    }
}