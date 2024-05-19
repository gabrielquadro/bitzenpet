import React, { useState, useRef } from 'react';
import Head from "next/head"
import TopBar from '@/src/components/Topbar';
import { Flex, Text, Input, Button, Image, Textarea, Box, Icon, Alert, AlertIcon, useDisclosure, Slide } from '@chakra-ui/react';
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { FaCamera } from 'react-icons/fa';
import { BsCamera } from "react-icons/bs";
import { setupAPIClient } from '../../services/api'

function New() {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [birthday, setBirthday] = useState("");
    const [about, setAbout] = useState("");
    const [image, setImage] = useState(null);
    const inputRef = useRef(null);
    const [showAlert, setShowAlert] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    // const handleImageUpload = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setImage(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    // const handleImageUpload = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setImage(file);
    //     }
    // };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (validImageTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                // Lidar com o erro de tipo de arquivo inválido aqui
                console.error('Tipo de arquivo inválido. A imagem deve ser do tipo: jpg, jpeg, png.');
            }
        }
    };


    async function handleCreatePet() {

        if (name === '' || color === '' || birthday === '' || about === '' || image === '') {
            return;
        }

        try {
            const data = new FormData();
            console.log({
                name: name,
                color: color,
                birthdate: birthday,
                description: about,
                image: image
            })

            data.append('name', name);
            data.append('color', color);
            data.append('birthdate', birthday);
            data.append('description', about);
            data.append('image', image);

            const apiClient = setupAPIClient();
            await apiClient.post('/pets', data)

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
                <title>Bitzen Pet - Novo pet</title>
            </Head>
            {/* <TopBar></TopBar> */}
            {showAlert && (
                <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
                    <Alert status='success' mb={4} alignItems='center' justifyContent='center'>
                        <AlertIcon />
                        Dados alterados com sucesso!
                    </Alert>
                </Slide>
            )}
            <Flex height='100vh' width='100%' flexDirection='column' alignItems="flex-start" justifyContent="flex-start">
                <Flex width='100%' alignItems="center" justifyContent="center" pt={5} pb={5}>
                    <Flex alignItems="flex-start" justifyContent="flex-start" width='80%'>
                        <Text fontSize="24px" fontWeight='bold'>Novo pet</Text>
                    </Flex>
                </Flex>
                <Flex height='100vh' width='100%' flexDirection='column' alignItems="center" justifyContent="flex-start" bg='bg.gray'>
                    <Flex mt={6} width='80%' flexDirection='row' alignItems="flex-start" justifyContent="flex-start">
                        <Flex height='280px' mr={6}>
                            <Box
                                width="300px"
                                height="300px"
                                border="2px dashed"
                                borderColor="gray.300"
                                borderRadius="md"
                                position="relative"
                                cursor="pointer"
                                onClick={() => inputRef.current.click()}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                bg='#ededed'
                            >
                                <Input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    ref={inputRef}
                                    onChange={handleImageUpload}
                                />
                                {!image ? (
                                    <Flex direction="column" align="center">
                                        <Icon as={BsCamera} boxSize={12} color="gray.500" />
                                        <Text color="gray.500" mt={2}>
                                            Clique para adicionar uma imagem
                                        </Text>
                                    </Flex>
                                ) : (
                                    <Image src={image} alt="Uploaded image" objectFit="cover" width="100%" height="100%" />
                                )}
                            </Box>
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

                            <Button mt={6} bg="button.default" width="full" color='button.txt' onClick={handleCreatePet}>Salvar</Button>

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