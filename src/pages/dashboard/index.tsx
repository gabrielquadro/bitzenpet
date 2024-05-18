import React from 'react';
import Head from "next/head"
import TopBar from '@/src/components/Topbar';
import { Flex, Text, InputGroup, InputLeftElement, Input, Icon, Button, List, ListItem, ListIcon, Box, Table, Thead, Tbody, Tr, Th, Td, Image, IconButton } from '@chakra-ui/react';
import { FiSearch, FiPlusCircle, FiEye, FiTrash2 } from 'react-icons/fi';
import iconImg from "../../../public/images/icon.png";
import dogimg from "../../../public/images/dog.png";
import Router from "next/router";

function Dashboard() {
    const pets = [
        { name: 'Leona', age: '8 meses', color: 'Rajado' },
        { name: 'Tony', age: '4 anos', color: 'Caramelo' },
        { name: 'Leona', age: '8 meses', color: 'Rajado' },
        { name: 'Tony', age: '4 anos', color: 'Caramelo' },
    ];
    return (
        <>
            <Head>
                <title>Bitzen Pet - Início</title>
            </Head>
            <TopBar></TopBar>
            <Flex height='100vh' width='100%' flexDirection='column' alignItems="flex-start" justifyContent="flex-start">
                <Flex width='100%' alignItems="center" justifyContent="center" pt={5} pb={5}>
                    <Flex alignItems="flex-start" justifyContent="flex-start" width='80%'>
                        <Text fontSize="24px" fontWeight='bold'>Seus Pets</Text>
                    </Flex>
                </Flex>
                <Flex height="100vh" width='100%' flexDirection='column' alignItems="center" justifyContent="flex-start" bg='bg.gray'>

                    <Flex alignItems="flex-start" justifyContent="flex-start" width='80%' pt={4}>
                        <Flex width='100%' alignItems='flex-start' justifyContent='space-between'>
                            <Flex width='40%'>
                                <InputGroup bg='white'>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<Icon as={FiSearch} color="gray.300" />}
                                    />
                                    <Input placeholder="Pesquisar um pet" />
                                </InputGroup>
                                <Button ml={1} bg="button.default" width="400" color='button.txt'>Buscar</Button>
                            </Flex>
                            <Flex>
                                <Button p={4} pr={8} pl={8} bg="button.default" color='button.txt' leftIcon={<Icon as={FiPlusCircle} />} onClick={() => Router.push('/new')}>
                                    <Text>Cadastrar pet</Text>
                                </Button>
                            </Flex>
                        </Flex>

                    </Flex>
                    <Flex mt={6} p={4} width='80%' flexDirection='column' alignItems="flex-start" justifyContent="flex-start" bg='white'>
                        <Text fontSize="16px" fontWeight='bold'>Lista de pet</Text>
                        <Box width='100%'>
                            <Table variant="simple">
                                <Thead bg='bg.gray' borderWidth={1}>
                                    <Tr>
                                        <Th>Pet</Th>
                                        <Th>Nome</Th>
                                        <Th>Idade</Th>
                                        <Th>Cor</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {pets.map((pet, index) => (
                                        <Tr key={index} height="116px" cursor='pointer' bg={index % 2 === 0 ? 'white' : '#FAFAFA'} onClick={() => Router.push('/details')}>
                                            <Td width="25%">
                                                <Image
                                                    boxSize="80px"
                                                    borderRadius="4"
                                                    src={dogimg.src}
                                                    alt={pet.name}
                                                />
                                            </Td>
                                            <Td width="25%">{pet.name}</Td>
                                            <Td width="25%">{pet.age}</Td>
                                            <Td width="25%">{pet.color}</Td>
                                            <Td width="25%" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <IconButton
                                                    bg='transparent'
                                                    borderWidth={1}
                                                    aria-label="View Pet"
                                                    icon={<FiEye />}
                                                    mr={4}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        Router.push('/details');
                                                    }}
                                                />
                                                <IconButton
                                                    bg='transparent'
                                                    borderWidth={1}
                                                    aria-label="Delete Pet"
                                                    icon={<FiTrash2 />}
                                                    color='button.red'
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        console.log('clique lixeira');
                                                    }}
                                                />
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    </Flex>
                </Flex>

            </Flex >

        </>
    );
}

export default Dashboard;
