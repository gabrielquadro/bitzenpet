import React, { useState } from 'react';
import Head from "next/head"
import TopBar from '@/src/components/Topbar';
import { Flex, Text, Input, Button, Image ,Textarea } from '@chakra-ui/react';
import dogimg from "../../../public/images/dog.png";
import { canSSRAuth } from "@/src/utils/canSSRAuth";

function New() {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [birthday, setBirthday] = useState("");
    const [about, setAbout] = useState("");
    return (
        <>
            <Head>
                <title>Bitzen Pet - Novo pet</title>
            </Head>
            <TopBar></TopBar>
            <Flex height='100vh' width='100%' flexDirection='column' alignItems="flex-start" justifyContent="flex-start">
                <Flex width='100%' alignItems="center" justifyContent="center" pt={5} pb={5}>
                    <Flex alignItems="flex-start" justifyContent="flex-start" width='80%'>
                        <Text fontSize="24px" fontWeight='bold'>Novo pet</Text>
                    </Flex>
                </Flex>
                <Flex height='100vh' width='100%' flexDirection='column' alignItems="center" justifyContent="flex-start" bg='bg.gray'>
                    <Flex mt={6} width='80%' flexDirection='row' alignItems="flex-start" justifyContent="flex-start">
                        <Flex height='280px' mr={6}>
                            <Image
                                // boxSize="280px"
                                borderRadius="6"
                                src={dogimg.src}
                                alt={'Pet image'}
                            />
                        </Flex>

                        <Flex width='100%' flexDirection='column' >
                            <Flex flexDirection='column' p={10} width='100%' height='579px' bg='white'>
                                <Text fontSize="16px" mb={2}>Nome</Text>

                                <Input
                                    type="text"
                                    placeholder="Nome do pet"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    mb={4}
                                    size="lg"
                                />

                                <Text fontSize="16px" mb={2}>Cor</Text>

                                <Input
                                    type="text"
                                    placeholder="Cor do pet"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    mb={4}
                                    size="lg"
                                />

                                <Text fontSize="16px" mb={2}>Data de nascimento</Text>

                                <Input
                                    type="date"
                                    placeholder="Selecione"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                    mb={4}
                                    size="lg"
                                />

                                <Text fontSize="16px" mb={2}>Sobre o pet</Text>

                                <Textarea
                                    placeholder="Escreva um pequeno texto sobre o pet"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    mb={4}
                                    size="lg"
                                />

                            </Flex>

                            <Button mt={6} bg="button.default" width="full" color='button.txt'>Salvar</Button>

                        </Flex>

                    </Flex>
                </Flex>



            </Flex >
        </>
    );
}

export default New;

//rota protegida, somente usuário logado
export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {

        }
    }
})