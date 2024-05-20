import React, { useState, useEffect, useRef } from 'react';
import Head from "next/head"
import TopBar from '@/src/components/Topbar';
import { Flex, Text, Input, Button, Image, Textarea, Alert, AlertIcon, useDisclosure, Slide, Box, Icon } from '@chakra-ui/react';
import { BsCamera } from "react-icons/bs";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { useRouter } from 'next/router';
import { setupAPIClient } from '../../services/api'
import Router from "next/router";


interface Pet {
    name: string;
    color: string;
    birthdate: string;
    image_url: string;
    observation: string;
}

function Edit() {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(false);
    const [pet, setPet] = useState<Pet | undefined>();
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [birthday, setBirthday] = useState("");
    const [about, setAbout] = useState("");
    const [image, setImage] = useState(null);
    const [imageShow, setImageShow] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertErr, setShowAlertErr] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const inputRef = useRef(null);
    const [imageBlob, setImageBlob] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPet() {
            setLoading(true);
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/pets/${id}`);
                setPet(response.data.data);
                setImageShow(response.data.data.image_url);
                setName(response.data.data.name)
                setColor(response.data.data.color)
                setBirthday(response.data.data.birthdate)
                setAbout(response.data.data.observation)
                // setImage(response.data.data.image_url)


                fetchImageAndConvertToBlob(response.data.data.image_url)
                    .then((imageFile) => {
                        setImage(imageFile);

                        console.log('Converted image file:', imageFile);
                        // Agora você pode usar o arquivo da imagem conforme necessário
                    })
                    .catch((error) => {
                        console.error('Failed to fetch and convert image:', error);
                    });

                // setImage(imageFile);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchPet();
    }, []);

    async function fetchImageAndConvertToBlob(imageUrl) {
        try {
            const response = await fetch(imageUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }

            const imageBlob = await response.blob();

            const imageFile = new File([imageBlob], 'image_file.jpg', { type: 'image/jpeg' });

            return imageFile;
        } catch (error) {
            console.error('Error fetching and converting image:', error);
            throw error;
        }
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (validImageTypes.includes(file.type)) {
                setImage(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    console.log(reader.result)
                    setImageShow(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                // Lidar com o erro de tipo de arquivo inválido aqui
                console.error('Tipo de arquivo inválido. A imagem deve ser do tipo: jpg, jpeg, png.');
            }
        }
    };

    async function handleUpdatePet() {

        if (name === '' || color === '' || birthday === '' || about === '') {
            setError("por favor, informe todos os dados.");
            return;
        }

        try {
            const data = new FormData();

            data.append('_method', 'PUT');
            data.append('name', name);
            data.append('color', color);
            data.append('birthdate', birthday);
            data.append('description', about);
            data.append('image', image);

            const apiClient = setupAPIClient();

            await apiClient.post(`/pets/${id}`, data);

            setShowAlert(true);
            onOpen();
            // Oculta o alerta após 3 segundos
            setTimeout(() => {
                setShowAlert(false);
                onClose();
                Router.push(`/details/${id}`);
            }, 3000);

        } catch (err) {
            console.log('Erro ao salvar.', err);
            setError("Erro ao salvar. Por favor, tente novamente. Tamanho da imagem pode estar acima do limite.");
            onOpen();
            // Oculta o alerta após 3 segundos
            setTimeout(() => {
                setShowAlertErr(false);
                onClose();
            }, 3000);
        }

    }

    return (
        <>
            <Head>
                <title>Bitzen Pet - Editar pet</title>
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
                        <Text fontSize="24px" fontWeight='bold'>Editar pet</Text>
                    </Flex>
                </Flex>
                <Flex height="100vw" width='100%' flexDirection='column' alignItems="center" justifyContent="flex-start" bg='bg.gray'>
                    {error && (
                        <Text mt={2} color="red.500" mb={2}>
                            {error}
                        </Text>
                    )}
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
                                {!imageShow ? (
                                    <Flex direction="column" align="center">
                                        <Icon as={BsCamera} boxSize={12} color="gray.500" />
                                        <Text color="gray.500" mt={2}>
                                            Clique para adicionar uma imagem
                                        </Text>
                                    </Flex>
                                ) : (
                                    <Image src={imageShow} alt="Uploaded image" objectFit="cover" width="100%" height="100%" />
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

                            <Button mt={6} bg="button.default" width="full" color='button.txt' onClick={handleUpdatePet}>Salvar</Button>

                        </Flex>

                    </Flex>
                </Flex>



            </Flex >
        </>
    );
}

export default Edit;

//rota protegida, somente usuário logado
export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {

        }
    }
})
