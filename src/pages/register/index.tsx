import { useState, useContext } from "react";
import Head from "next/head"
import Link from "next/link"
import { Box, Button, Checkbox, Flex, Input, Text } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { canSSRGuest } from "@/src/utils/canSSRGuest";
import { FiArrowLeft } from 'react-icons/fi';

const Register = () => {
    const { signUp } = useContext(AuthContext)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirm] = useState("");
    const [document, setDocument] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState("");

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    async function handleSignUp() {

        setError("");

        if (!name || !email || !document || !phone_number || !password || !password_confirmation) {
            setError("Por favor, preencha todos os campos.");
            return;
        }
        if (password !== password_confirmation) {
            setError("As senhas não coincidem.");
            return;
        }
        if (password.length < 8) {
            setError("A senha deve ter no mínimo 8 caracteres.");
            return;
        }
        if (phone_number.length < 12) {
            setError("O número de telefone deve ter no mínimo 12 caracteres.");
            return;
        }

        try {
            await signUp({
                name,
                email,
                document,
                phone_number,
                password,
                password_confirmation,
            });
        } catch (error: any) {
            setError("Erro ao registrar. Por favor, tente novamente.");
        }
    }

    const handleCpfChange = (e: { target: { value: any; }; }) => {
        let value = e.target.value;
        const cpfOnlyNumbers = value.replace(/\D/g, '');
        setDocument(cpfOnlyNumbers);
    };

    return (
        <>
            <Head>
                <title>Bitzen Pet - Cadastre-se</title>
            </Head>
            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Box p={8} width="800px" boxShadow="lg">
                    <Link href="/login">
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
                    <Text fontSize="40px" mb={2} fontWeight='bold' color='txt.titleBlack' >
                        Cadastre-se
                    </Text>
                    {error && (
                        <Text color="red.500" mb={2}>
                            {error}
                        </Text>
                    )}
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
                                    value={document}
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
                                    value={phone_number}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    mb={4}
                                    size="lg"
                                />
                            </Flex>

                        </Flex>

                        <Flex alignItems="center" justifyContent="space-between" mb={5}>
                            <Flex flexDirection='column' alignItems="flex-start" justifyContent="flex-start" width='45%'>

                                <Text fontSize="16px" mb={2}>Senha</Text>

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
                                    value={password_confirmation}
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

                        <Button bg="button.default" width="full" color='button.txt' onClick={handleSignUp}>Cadastrar</Button>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default Register;

//rota protegida, somente usuário não logado
export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {

        }
    }
})