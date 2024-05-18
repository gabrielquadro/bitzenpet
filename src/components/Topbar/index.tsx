import React from 'react';
import { Flex, Box, Text, Avatar, Image } from '@chakra-ui/react';
import iconImg from "../../../public/images/icon.png";
import { Tabs, TabList, Tab } from '@chakra-ui/react';
import Link from 'next/link';
import { GoTriangleDown } from "react-icons/go";
import Router from "next/router";

function TopBar() {
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
                        <Avatar size="sm" name="Nome do Usuário" src="../../../public/images/icon.png" />
                        <GoTriangleDown color='#8C8C8C' />
                    </Box>
                </Flex>

            </Flex>
        </>
    );
}

export default TopBar;