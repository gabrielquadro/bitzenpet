import { useState, useContext, useEffect } from "react";
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Box, Button, Checkbox, Flex, Input, Text } from "@chakra-ui/react";
import iconImg from "../../../../public/images/icon.png"
import Router from "next/router";
import { canSSRGuest } from "@/src/utils/canSSRGuest";
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { setupAPIClient } from '../../../services/api'


const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirm] = useState("");
    const router = useRouter();
    const { id } = router.query; //pega parâmetro passado de outra tela
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    async function handleSendEmail() {

        try {

            const apiClient = setupAPIClient();
            await apiClient.post('/reset-password', {
                token: token,
                email: email,
                password: password,
                password_confirmation: password_confirmation
            })
            Router.push(`/login`)

        } catch (err) {
            console.log('Erro ao salvar.', err);
        }
    }

    useEffect(() => {
        if (typeof id === 'string') {
            const [extractedId, extractedToken] = id.split('-');
            setEmail(extractedId);
            setToken(extractedToken);
        }
    }, [id]);

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

                        <Link href="/forgotPassword">
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
                            Crie uma nova senha
                        </Text>

                        <Flex alignItems="center" justifyContent="flex-start" mt={5} mb={5}>
                            <Text fontSize="16px">Crie uma nova senha de acesso à sua conta.</Text>
                        </Flex>


                        <Text fontSize="16px" mb={2}>Nova senha</Text>

                        <Input
                            type="password"
                            placeholder="Crie uma nova senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            mb={4}
                            size="lg"
                        />
                        <Text fontSize="16px" mb={2}>Confirmar nova senha</Text>

                        <Input
                            type="password"
                            placeholder="Repita a nova senha"
                            value={password_confirmation}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            mb={4}
                            size="lg"
                        />

                        <Button bg="button.default" width="full" color='button.txt' onClick={handleSendEmail}>Próximo</Button>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default NewPassword;

//rota protegida, somente usuário não logado
export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {

        }
    }
})