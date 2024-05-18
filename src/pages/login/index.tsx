import { useState, useContext } from "react";
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Box, Button, Checkbox, Flex, Input, Text } from "@chakra-ui/react";
import iconImg from "../../../public/images/icon.png"
import Router from "next/router";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const { signIn } = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    async function handleSignIn() {
        await signIn({ email, password })
    }

    return (
        <>
            <Head>
                <title>Bitzen Pet - Login</title>
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
                        <Text fontSize="24px" mb={2} fontWeight='bold' color='txt.titleBlack' >
                            Entrar na plataforma
                        </Text>

                        <Flex alignItems="center" justifyContent="flex-start" mt={5} mb={5}>
                            <Text fontSize="16px">Não tem uma conta?</Text>
                            <Link href="/register">
                                <Text ml={1} fontSize="16px" fontWeight='bold' color='txt.blue' cursor='pointer'>
                                    Cadastre-se gratuitamente
                                </Text>
                            </Link>
                        </Flex>


                        <Text fontSize="16px" mb={2}>Email</Text>

                        <Input
                            type="email"
                            placeholder="Seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            mb={4}
                            size="lg"
                        />

                        <Text fontSize="16px" mb={2}>Senha</Text>

                        <Input
                            type="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            mb={4}
                            size="lg"
                        />
                        <Flex alignItems="center" justifyContent="space-between" mb={5}>
                            <Checkbox colorScheme="teal" >Mantenha-me conectado</Checkbox>

                            <Text fontSize="16px" fontWeight='bold' color='txt.blue' cursor='pointer'>
                                Esqueçeu sua senha?
                            </Text>
                        </Flex>

                        <Button bg="button.default" width="full" color='button.txt' onClick={handleSignIn}>Entrar na plataforma</Button>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default Login;