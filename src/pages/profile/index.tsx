import React, { useState, useContext, useEffect } from 'react';
import Head from "next/head"
import TopBar from '@/src/components/Topbar';
import { Flex, Text, Link, Button, Icon, Input } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { CgLogOut } from "react-icons/cg";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
    const { user } = useContext(AuthContext)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        console.log(user)
    });

    return (
        <>
            <Head>
                <title>Bitzen Pet - Meu perfil</title>
            </Head>
            <TopBar></TopBar>
            <Flex height='100vh' width='100%' flexDirection='column' alignItems="flex-start" justifyContent="flex-start">
                <Flex width='100%' alignItems="center" justifyContent="center" pt={5} pb={5}>
                    <Flex alignItems="flex-start" justifyContent="flex-start" width='80%'>
                        <Text fontSize="24px" fontWeight='bold'>Meu perfil</Text>
                    </Flex>
                </Flex>
                <Flex height='100vh' width='100%' flexDirection='column' alignItems="center" justifyContent="flex-start" bg='bg.gray'>
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

                        <Button mt={6} bg="button.default" width="full" color='button.txt'>Salvar</Button>
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
                        <Link href="/edit">
                            <Flex flexDirection='row' alignItems='center'>
                                <Icon size={24} color='txt.danger' as={CgLogOut} />
                                <Text color='txt.danger' ml={2}>Sair da minha conta</Text>
                            </Flex>
                        </Link>
                    </Flex>

                </Flex>



            </Flex >
        </>
    );
}

export default Profile;
