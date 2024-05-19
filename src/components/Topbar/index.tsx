import React, { useState, useContext, useEffect } from 'react';
import { Flex, Box, Text, Avatar, Image } from '@chakra-ui/react';
import dogImg from "../../../public/images/dog.png";
import defaultUserImg from "../../../public/images/defaultUser.jpg";
import iconImg from "../../../public/images/icon.png";
import { Tabs, TabList, Tab } from '@chakra-ui/react';
import Link from 'next/link';
import { GoTriangleDown } from "react-icons/go";
import Router from "next/router";
import { AuthContext } from "../../context/AuthContext";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from '../../services/api'

interface UserProfileprops {
    id: string,
    name: string,
    email: string,
    profile_photo_url: string,
}

interface Profileprops {
    userData: UserProfileprops,
}

export default function TopBar() {
    return (
        <>
            <Flex alignItems="center" justifyContent="center" width='100%' borderBottom="1px solid #E6E6E6" mb={4} mt={4}>
                <Flex alignItems="flex-start" justifyContent="space-between" width='80%' >
                    <Flex flexDirection='row'>
                        <Box textAlign="center" mr={4} pb={1}>
                            <Flex alignItems="center" justifyContent="flex-start">
                                <Box borderRadius="full" overflow="hidden" p={2} bg='button.default'>
                                    <Image
                                        src={iconImg.src}
                                        objectFit="fill"
                                        alt="Logo Bitzen Pet"
                                    />
                                </Box>
                                <Text ml={4} fontSize="24px" color='txt.blue'>Bitzen Pet</Text>
                            </Flex>
                        </Box>

                        <Tabs>
                            <TabList>
                                <Tab _selected={{ borderBottom: "2px solid #00B8C4" }} >
                                    <Link href="/dashboard">
                                        <Text>Início</Text>
                                    </Link>
                                </Tab>
                            </TabList>
                        </Tabs>
                    </Flex>
                    <Box cursor='pointer' display='flex' flexDirection='row' alignItems='center' justifyContent='center' onClick={() => Router.push('/profile')}>
                        <Avatar size="sm" name="Not user" src={defaultUserImg.src} />
                        <GoTriangleDown color='#8C8C8C' />
                    </Box>
                </Flex>

            </Flex>
        </>
    );
}

//rota protegida, somente usuário logado
export const getServerSideProps = canSSRAuth(async (ctx) => {
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