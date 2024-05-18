import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Box, Button, Checkbox, Flex, Input, Text } from "@chakra-ui/react";
import iconImg from "../../../public/images/icon.png"
import { useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [cpf, setCpf] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    const handleCpfChange = (e: { target: { value: any; }; }) => {
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        setCpf(value);
    };

    return (
        <>
            <Head>
                <title>Bitzen Pet - Cadastre-se</title>
            </Head>
            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Box p={8} width="800px" boxShadow="lg">

                    <Text fontSize="40px" mb={2} fontWeight='bold' color='txt.titleBlack' >
                        Cadastre-se
                    </Text>
                    <Box mt={4} textAlign="left">
                        <Flex alignItems="center" justifyContent="flex-start" mt={5} mb={5}>
                            <Text fontSize="16px" color='txt.light'>Já possui uma conta?</Text>
                            <Link href="/login">
                                <Text ml={1} fontSize="16px" fontWeight='bold' color='txt.blue' cursor='pointer'>
                                    Entre na plataforma
                                </Text>
                            </Link>
                        </Flex>


                        <Text fontSize="16px" mb={2}>Nome</Text>

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

                        <Flex alignItems="center" justifyContent="space-between" mb={5}>
                            <Flex flexDirection='column' alignItems="flex-start" justifyContent="flex-start" width='45%'>

                                <Text fontSize="16px" mb={2}>CPF</Text>

                                <Input
                                    type="text"
                                    placeholder="Insira o seu CPF"
                                    value={cpf}
                                    onChange={handleCpfChange}
                                    maxLength={14}
                                    mb={4}
                                    size="lg"
                                />
                            </Flex>

                            <Flex flexDirection='column' alignItems="flex-start" justifyContent="flex-start" width='45%'>

                                <Text fontSize="16px" mb={2}>Telefone</Text>

                                <Input
                                    type="number"
                                    placeholder="Seu telefone"
                                    value={cellphone}
                                    onChange={(e) => setCellphone(e.target.value)}
                                    mb={4}
                                    size="lg"
                                />
                            </Flex>

                        </Flex>

                        <Flex alignItems="center" justifyContent="space-between" mb={5}>
                            <Flex flexDirection='column' alignItems="flex-start" justifyContent="flex-start" width='45%'>

                                <Text fontSize="16px" mb={2}>CPF</Text>

                                <Input
                                    type="password"
                                    placeholder="Crie uma senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    mb={4}
                                    size="lg"
                                />
                            </Flex>

                            <Flex flexDirection='column' alignItems="flex-start" justifyContent="flex-start" width='45%'>

                                <Text fontSize="16px" mb={2}>Confirmar senha</Text>

                                <Input
                                    type="password"
                                    placeholder="Repita a senha"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    mb={4}
                                    size="lg"
                                />
                            </Flex>

                        </Flex>

                        <Flex flexDirection='row' alignItems="center" justifyContent="flex-start" mb={4}>
                            <Checkbox colorScheme="teal" size="lg"></Checkbox>
                            <Text ml={2} fontSize="16px" color='txt.light'>Li e concordo com os</Text>
                            <Text fontSize="16px" color='txt.light'>Li e concordo com os</Text>
                            <Link href="/login">
                                <Text ml={1} textDecoration="underline" fontSize="16px" color='txt.blue' cursor='pointer'>
                                    Termos de uso
                                </Text>
                            </Link>
                            <Text ml={1} fontSize="16px" color='txt.light'> e a</Text>
                            <Link href="/login">
                                <Text ml={1} textDecoration="underline" fontSize="16px" color='txt.blue' cursor='pointer'>
                                    Política de privacidade
                                </Text>
                            </Link>
                            <Text ml={1} fontSize="16px" color='txt.light'> do sistema.</Text>

                        </Flex>

                        <Button bg="button.default" width="full" color='button.txt'>Cadastrar</Button>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default Register;