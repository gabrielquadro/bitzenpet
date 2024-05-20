import React, { useState, useContext, useEffect } from 'react';
import Head from "next/head"
import { Flex, Text, Link, Button, Icon, Input, Alert, AlertIcon, useDisclosure, Slide } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { CgLogOut } from "react-icons/cg";
import { AuthContext } from "../../context/AuthContext";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from '../../services/api'
import { motion } from 'framer-motion';

interface UserProfileprops {
    id: string,
    name: string,
    email: string,
    profile_photo_url: string,
}

interface Profileprops {
    userData: UserProfileprops,
}

export default function Profile({ userData }: Profileprops) {
    const { logoutUser, user } = useContext(AuthContext)
    const [name, setName] = useState(userData.name ? userData.name : "");
    const [email, setEmail] = useState(userData.email ? userData.email : "");
    const [showAlert, setShowAlert] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        
    });

    async function handleLogout() {
        await logoutUser();
    }

    async function handleUpdateUser() {
        if (name === '' || email === '') {
            return;
        }

        try {
            const apiClient = setupAPIClient();
            await apiClient.put('/user', {
                name: name,
                email: email
            })

            setShowAlert(true);
            onOpen();
            // Oculta o alerta após 3 segundos
            setTimeout(() => {
                setShowAlert(false);
                onClose();
            }, 3000);

        } catch (err) {
            console.log('Erro ao salvar.', err);
        }

    }

    return (
        <>

            <Head>
                <title>Bitzen Pet - Meu perfil</title>
            </Head>
            {showAlert && (
                <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
                    <Alert status='success' mb={4} alignItems='center' justifyContent='center'>
                        <AlertIcon />
                        Dados alterados com sucesso!
                    </Alert>
                </Slide>
            )}
            <Flex height="100vw" width='100%' flexDirection='column' alignItems="flex-start" justifyContent="flex-start">
                <Flex width='100%' alignItems="center" justifyContent="center" pt={5} pb={5}>
                    <Flex alignItems="flex-start" justifyContent="flex-start" width='80%'>
                        <Text fontSize="24px" fontWeight='bold'>Meu perfil</Text>
                    </Flex>
                </Flex>
                <Flex height="100vw" width='100%' flexDirection='column' alignItems="center" justifyContent="flex-start" bg='bg.gray'>
                    <Flex p={6} mt={6} width='40%' flexDirection='column' alignItems="flex-start" justifyContent="flex-start" bg='white'>
                        <Text fontWeight='bold' width='100%' fontSize="16px" mb={2} >Meus dados</Text>
                        <Text mt={3} width='100%' fontSize="16px" mb={2} borderBottom="1px solid #CCCCCC"></Text>

                        <Text mt={6} fontSize="16px" mb={2}>Nome</Text>

                        <Input
                            type="text"
                            placeholder="Seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            mb={4}
                            size="lg"
                        />

                        <Text fontSize="16px" mb={2}>Email</Text>

                        <Input
                            type="email"
                            placeholder="Seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            mb={4}
                            size="lg"
                        />

                        <Button mt={6} bg="button.default" width="full" color='button.txt' onClick={handleUpdateUser}>Salvar</Button>
                    </Flex>

                    <Flex p={6} mt={6} width='40%' flexDirection='row' alignItems="center" justifyContent="space-between" bg='white'>
                        <Text fontSize="16px" mb={2}>Senha</Text>
                        <Link href="/edit">
                            <Flex flexDirection='row' alignItems='center'>
                                <Icon color='txt.blue' as={FiEdit} />
                                <Text color='txt.blue' ml={2}>Alterar</Text>
                            </Flex>
                        </Link>
                    </Flex>

                    <Flex p={6} mt={6} width='40%' flexDirection='row' alignItems="flex-start" justifyContent="flex-start" bg='white'>
                        <Button
                            variant="unstyled"
                            onClick={handleLogout}
                            display="flex"
                            alignItems="center"
                            color="txt.danger"
                        >
                            <Icon size={24} as={CgLogOut} />
                            <Text ml={2}>Sair da minha conta</Text>
                        </Button>
                    </Flex>

                </Flex>



            </Flex >
        </>
    );
}

//rota protegida, somente usuário logado
export const getServerSideProps = canSSRAuth(async (ctx) => {
    //renderização a partir do servidor
    try {
        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/user')

        if (response.data.data && response.data.data.id) {
            const userData = {
                id: response.data.data.id,
                name: response.data.data.name,
                email: response.data.data.email,
                profile_photo_url: response.data.data.profile_photo_url,
            }

            return {
                props: {
                    userData: userData,
                }
            }
        } else {
            console.log('Dados de usuário incompletos ou ausentes.')
            return {
                props: {
                    userData: null,
                }
            }
        }
    } catch (err) {
        console.log('Erro ao carregar informações do usuário:', err)
        return {
            props: {
                userData: null,
            }
        }
    }
})
