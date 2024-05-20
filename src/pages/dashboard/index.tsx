import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { Flex, Text, InputGroup, InputLeftElement, Input, Icon, Button, Box, Table, Thead, Tbody, Tr, Th, Td, Image, IconButton, Spinner } from '@chakra-ui/react';
import { FiSearch, FiPlusCircle, FiEye, FiTrash2 } from 'react-icons/fi';
import Router from "next/router";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from '../../services/api';

function Dashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [petData, setPetData] = useState([]);
    const [reload, setReload] = useState(false);
    const [page, setPage] = useState(1); //pagina que está
    const [totalPages, setTotalPages] = useState(1); //total de paginas da api

    async function fetchPets() {
        setLoading(true);
        try {
            const apiClient = setupAPIClient();
            const response = await apiClient.get('/pets', {
                params: {
                    page: page,
                    search: searchQuery,
                },
            });
            setPetData(response.data.data.data);
            //total de dados da api
            const total = response.data.data.total;
            //dados por pagina
            const perPage = response.data.data.per_page;
            //total de paginas que deve mostar para o usuário no fim da tabela
            const result = Math.ceil(total / perPage);

            setTotalPages(result);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPets();
    }, [reload, page]);

    //search volta pra page 1
    useEffect(() => {
        setPage(1)
        fetchPets();
    }, [searchQuery]);

    async function handleDeletePet(id) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.delete(`/pets/${id}`);
            setReload(prev => !prev);
        } catch (err) {
            console.log('Erro ao deletar.', err);
        }
    }

    //nova página
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <>
            <Head>
                <title>Bitzen Pet - Início</title>
            </Head>
            <Flex height="100vw" width='100%' flexDirection='column' alignItems="flex-start" justifyContent="flex-start">
                <Flex width='100%' alignItems="center" justifyContent="center" pt={5} pb={5}>
                    <Flex alignItems="flex-start" justifyContent="flex-start" width='80%'>
                        <Text fontSize="24px" fontWeight='bold'>Seus Pets</Text>
                    </Flex>
                </Flex>
                <Flex height="100vw" width='100%' flexDirection='column' alignItems="center" justifyContent="flex-start" bg='bg.gray'>
                    <Flex alignItems="flex-start" justifyContent="flex-start" width='80%' pt={4}>
                        <Flex width='100%' alignItems='flex-start' justifyContent='space-between'>
                            <Flex width='40%'>
                                <InputGroup bg='white'>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<Icon as={FiSearch} color="gray.300" />}
                                    />
                                    <Input
                                        placeholder="Pesquisar um pet"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
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
                    {loading ? (
                        <Flex alignItems="center" justifyContent="center">
                            <Spinner color='txt.blue' size="xl" />
                        </Flex>
                    ) : (
                        <Flex mt={6} mb={10} p={4} width='80%' flexDirection='column' alignItems="flex-start" justifyContent="flex-start" bg='white'>
                            <Text pb={6} fontSize="16px" fontWeight='bold'>Lista de pet</Text>

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
                                        {petData.map((pet, index) => (
                                            <Tr key={pet.id} height="116px" cursor='pointer' bg={index % 2 === 0 ? 'white' : '#FAFAFA'} onClick={() => Router.push(`/details/${pet.id}`)}>
                                                <Td width="25%">
                                                    <Image
                                                        boxSize="80px"
                                                        borderRadius="4"
                                                        src={pet.image_url}
                                                        alt={pet.name}
                                                    />
                                                </Td>
                                                <Td width="25%">{pet.name}</Td>
                                                <Td width="25%">-</Td>
                                                <Td width="25%">-</Td>
                                                <Td width="25%" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <IconButton
                                                        bg='transparent'
                                                        borderWidth={1}
                                                        aria-label="View Pet"
                                                        icon={<FiEye />}
                                                        mr={4}
                                                        onClick={() => Router.push(`/details/${pet.id}`)}
                                                    />
                                                    <IconButton
                                                        bg='transparent'
                                                        borderWidth={1}
                                                        aria-label="Delete Pet"
                                                        icon={<FiTrash2 />}
                                                        color='button.red'
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            handleDeletePet(pet.id);
                                                        }}
                                                    />
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                            <Flex justifyContent="flex-end" mt={4} width="100%">
                                {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                                    <Button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        bg={page === pageNumber ? '#00B8C4' : 'transparent'}
                                        color={page === pageNumber ? 'white' : 'black'}
                                        border="1px solid #00B8C4"
                                        mx={1}
                                    >
                                        {pageNumber}
                                    </Button>
                                ))}
                            </Flex>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </>
    );
}

export default Dashboard;

// rota protegida, somente usuário logado
export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {},
    };
});
