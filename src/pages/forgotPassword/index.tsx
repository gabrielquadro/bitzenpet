import { useState, useContext } from "react";
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Box, Button, Checkbox, Flex, Input, Text } from "@chakra-ui/react";
import iconImg from "../../../public/images/icon.png"
import Router from "next/router";
import { canSSRGuest } from "@/src/utils/canSSRGuest";
import { FiArrowLeft } from 'react-icons/fi';
import { setupAPIClient } from '../../services/api'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    async function handleSendEmail() {
        if (email === '') {
            return;
        }

        try {
            const apiClient = setupAPIClient();
            await apiClient.post('/forgot-password', {
                email: email
            })

            Router.push(`/forgotPassword/token/${email}`)

        } catch (err) {
            console.log('Erro ao salvar.', err);
        }
    }

    return (
        <>
            <Head>
                <title>Bitzen Pet - Esqueceu sua senha?</title>
            </Head>
            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Box p={8} width="600px" boxShadow="lg">

                    <Box textAlign="center" >
                        <Flex alignItems="center" justifyContent="flex-start">
                            <Box borderRadius="full" overflow="hidden" p={2} bg='button.default'>
                                <Image
                                    src={iconImg}
                                    quality={100}
                                    objectFit="fill"
                                    alt="Logo Bitzen Pet"
                                />
                            </Box>
                            <Text ml={4} fontSize="24px" color='txt.blue'>Bitzen Pet</Text>
                        </Flex>
                    </Box>
                    <Box mt={10} textAlign="left">

                        <Link href="/login">
                            <Button
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                bgColor='transparent'
                                color='txt.blue'
                                p={0}
                                mb={2}
                            >
                                <FiArrowLeft size={24} color="txt.blue" />
                                Voltar
                            </Button>
                        </Link>

                        <Text fontSize="24px" mb={2} fontWeight='bold' color='txt.titleBlack' >
                            Esqueceu sua senha?
                        </Text>

                        <Flex alignItems="center" justifyContent="flex-start" mt={5} mb={5}>
                            <Text fontSize="16px">Vamos te ajudar nisso! Primeiro, digite seu e-mail cadastrado ao criar a sua conta.</Text>
                        </Flex>


                        <Text fontSize="16px" mb={2}>Email</Text>

                        <Input
                            type="email"
                            placeholder="Seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            mb={6}
                            size="lg"
                        />

                        <Button bg="button.default" width="full" color='button.txt' onClick={handleSendEmail}>Próximo</Button>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default ForgotPassword;

//rota protegida, somente usuário não logado
export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {

        }
    }
})