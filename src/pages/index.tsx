import Head from "next/head"
import { Flex, Text } from "@chakra-ui/react"
export default function Home() {
  return (
    <>
      <Head>
        <title>Bitzen Pet - Cadastre seu pet!</title>
      </Head>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Text fontSize={30}>Home page</Text>
      </Flex>
    </>
  )
}