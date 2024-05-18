import React from 'react';
import Head from "next/head"
import TopBar from '@/src/components/Topbar';
import { Flex, Text, Link, Button, Icon, Image } from '@chakra-ui/react';
import { FiEdit, FiArrowLeft } from 'react-icons/fi';
import dogimg from "../../../public/images/dog.png";
import Router from "next/router";
import { canSSRAuth } from "@/src/utils/canSSRAuth";

function Details() {
    return (
        <>
            <Head>
                <title>Bitzen Pet - Pet</title>
            </Head>
            <TopBar></TopBar>
            <Flex height='100vh' width='100%' flexDirection='column' alignItems="flex-start" justifyContent="flex-start">
                <Flex width='100%' alignItems="center" justifyContent="center" pt={5} pb={5}>
                    <Flex alignItems="flex-start" justifyContent="flex-start" width='80%'>
                        <Text fontSize="24px" fontWeight='bold'>Detalhes</Text>
                    </Flex>
                </Flex>
                <Flex height='100vh' width='100%' flexDirection='column' alignItems="center" justifyContent="flex-start" bg='bg.gray'>
                    <Flex flexDirection='row' alignItems='center' justifyContent='space-between' width='80%' pt={4} mb={6}>
                        <Link href="/dashboard">
                            <Button
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                bgColor='transparent'
                                color='txt.blue'
                            >
                                <FiArrowLeft size={24} color="txt.blue" />
                                Voltar
                            </Button>
                        </Link>
                        <Link href="/edit">
                            <Button p={4} pr={8} pl={8} bg="button.default" color='button.txt' leftIcon={<Icon as={FiEdit} />}>
                                <Text>Editar</Text>
                            </Button>
                        </Link>
                    </Flex>

                    <Flex width='80%' flexDirection='row' alignItems="flex-start" justifyContent="flex-start">
                        <Flex  height='280px' mr={6}>
                            <Image
                                // boxSize="280px"
                                borderRadius="6"
                                src={dogimg.src}
                                alt={'Pet image'}
                            />
                        </Flex>

                        <Flex p={10} width='100%' height='280px' bg='white' flexDirection='column' >
                            <Flex flexDirection='row' alignItems="flex-start" justifyContent="flex-start" >
                                <Flex flexDirection='column' alignItems="flex-start" justifyContent="flex-start" mr={10}>
                                    <Text>Nome</Text>
                                    <Text>Leona</Text>
                                </Flex>

                                <Flex flexDirection='column' alignItems="flex-start" justifyContent="flex-start" mr={10}>
                                    <Text>Cor</Text>
                                    <Text>Rajado</Text>
                                </Flex>

                                <Flex flexDirection='column' alignItems="flex-start" justifyContent="flex-start">
                                    <Text>idade</Text>
                                    <Text>8 meses</Text>
                                </Flex>
                            </Flex>
                            <Flex flexDirection='column' alignItems="flex-start" justifyContent="flex-start" mt={20}>
                                <Text>Sobre o pet</Text>
                                <Text>Leona é uma gata companheira e carinhosa. Está sempre pronta para brincar e adora ursinhos de pelúcia.</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>



            </Flex >
        </>
    );
}

export default Details;

//rota protegida, somente usuário logado
export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {

        }
    }
})
