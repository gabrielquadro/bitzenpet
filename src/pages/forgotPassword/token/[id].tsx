import { useState, useContext } from "react";
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Box, Button, Flex, Input, Text, PinInput, PinInputField, HStack } from "@chakra-ui/react";
import iconImg from "../../../../public/images/icon.png"
import Router from "next/router";
import { canSSRGuest } from "@/src/utils/canSSRGuest";
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { setupAPIClient } from '../../../services/api'

const Token = () => {
    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');
    const [pin5, setPin5] = useState('');
    const [pin6, setPin6] = useState('');
    const router = useRouter();
    const { id } = router.query;

    async function handleVerify() {
        if (pin1 === '' || pin2 === '' || pin3 === '' || pin4 === '' || pin5 === '' || pin6 === '') {
            return;
        }


        try {
            const token = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
            const query = { id, token };
            const apiClient = setupAPIClient();
            await apiClient.post('/reset-password/token/validate', {
                token: token,
                email: id,
            })
            Router.push(`/forgotPassword/newPassword/${id}-${token}`)
            // Router.push({
            //     pathname: '/forgotPassword/token',
            //     query: { id , token }
            // });

        } catch (err) {
            console.log('Erro ao salvar.', err);
        }
    }

    return (
        <>
            <Head>
                <title>Bitzen Pet - Confirmar email</title>
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
                            Confira o seu email
                        </Text>

                        <Flex alignItems="center" justifyContent="flex-start" mt={5} mb={5}>
                            <Text fontSize="16px">Insira nos campos abaixo o código que enviamos para você no seu endereço de e-mail.</Text>
                        </Flex>

                        <Flex alignItems="center" justifyContent="center" mt={10} mb={10}>
                            <HStack spacing={4}>
                                <PinInput size='lg'>
                                    <PinInputField
                                        value={pin1}
                                        onChange={(e) => setPin1(e.target.value)}
                                        fontSize="xl"
                                        maxWidth="100%"
                                        borderColor="#B3B3B3"
                                        _focus={{ borderColor: '#00B8C4', boxShadow: '0 0 0 1px #00B8C4' }}
                                    />
                                    <PinInputField
                                        value={pin2}
                                        onChange={(e) => setPin2(e.target.value)}
                                        fontSize="xl"
                                        maxWidth="100%"
                                        borderColor="#B3B3B3"
                                        _focus={{ borderColor: '#00B8C4', boxShadow: '0 0 0 1px #00B8C4' }}
                                    />
                                    <PinInputField
                                        value={pin3}
                                        onChange={(e) => setPin3(e.target.value)}
                                        fontSize="xl"
                                        maxWidth="100%"
                                        borderColor="#B3B3B3"
                                        _focus={{ borderColor: '#00B8C4', boxShadow: '0 0 0 1px #00B8C4' }}
                                    />
                                    <PinInputField
                                        value={pin4}
                                        onChange={(e) => setPin4(e.target.value)}
                                        fontSize="xl"
                                        maxWidth="100%"
                                        borderColor="#B3B3B3"
                                        _focus={{ borderColor: '#00B8C4', boxShadow: '0 0 0 1px #00B8C4' }}
                                    />
                                    <PinInputField
                                        value={pin5}
                                        onChange={(e) => setPin5(e.target.value)}
                                        fontSize="xl"
                                        maxWidth="100%"
                                        borderColor="#B3B3B3"
                                        _focus={{ borderColor: '#00B8C4', boxShadow: '0 0 0 1px #00B8C4' }}
                                    />
                                    <PinInputField
                                        value={pin6}
                                        onChange={(e) => setPin6(e.target.value)}
                                        fontSize="xl"
                                        maxWidth="100%"
                                        borderColor="#B3B3B3"
                                        _focus={{ borderColor: '#00B8C4', boxShadow: '0 0 0 1px #00B8C4' }}
                                    />
                                </PinInput>
                            </HStack>
                        </Flex>

                        <Button bg="button.default" width="full" color='button.txt' onClick={handleVerify}>Próximo</Button>

                        <Flex alignItems="center" justifyContent="center" mt={5} mb={5}>
                            <Text fontSize="16px" color='txt.light'>Não recebeu o código?</Text>

                            <Text
                                ml={1}
                                fontSize="16px"
                                fontWeight='bold'
                                color='txt.blue'
                                cursor='pointer'
                                onClick={() => console.log('reenviar')}
                            >
                                Reenviar
                            </Text>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default Token;

//rota protegida, somente usuário não logado
export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {

        }
    }
})
