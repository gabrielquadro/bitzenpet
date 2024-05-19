// import type { AppProps } from "next/app";
// import { ChakraProvider } from '@chakra-ui/react'
// import { extendTheme } from '@chakra-ui/react'
// import { AuthProvider } from '../context/AuthContext'

// const colors = {
//   txt: {
//     blue: '#00B8C4',
//     titleBlack: '#262626',
//     default: '#404040',
//     danger: '#E93939',
//     neutral: '#595959',
//     light: '#8C8C8C'
//   },
//   button: {
//     default: '#00B8C4',
//     txt: '#FFFFFF',
//     gray: '#E6E6E6',
//     red: '#E93939'
//   },
//   border: {
//     default: '#CCCCCC',
//     line: '#E6E6E6'
//   },
//   bg: {
//     gray: '#f4f4f4',
//     default: '#E6E6E6'
//   }
// }

// const theme = extendTheme({ colors })

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <ChakraProvider theme={theme}>
//       <AuthProvider>
//         <Component {...pageProps} />
//       </AuthProvider>
//     </ChakraProvider>
//   )
// }


import type { AppProps } from "next/app";
import App from "next/app";
import { ChakraProvider, Flex, Box, Tabs, TabList, Tab, Text, Avatar } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { AuthProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { GoTriangleDown } from 'react-icons/go';
import iconImg from "../../public/images/icon.png";
import { destroyCookie, parseCookies } from "nookies";

const colors = {
  txt: {
    blue: '#00B8C4',
    titleBlack: '#262626',
    default: '#404040',
    danger: '#E93939',
    neutral: '#595959',
    light: '#8C8C8C'
  },
  button: {
    default: '#00B8C4',
    txt: '#FFFFFF',
    gray: '#E6E6E6',
    red: '#E93939'
  },
  border: {
    default: '#CCCCCC',
    line: '#E6E6E6'
  },
  bg: {
    gray: '#f4f4f4',
    default: '#E6E6E6'
  }
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps, photo }: AppProps & { photo: string }) {
  const router = useRouter();

  const handleTabChange = (index: number) => {
    switch (index) {
      case 0:
        router.push('/dashboard');
        break;
      // Adicione mais casos conforme necessário para outras abas
      default:
        break;
    }
  };

  const getTabIndex = () => {
    switch (router.pathname) {
      case '/dashboard':
      case '/new':
      case '/profile':
      case `/details/`:
      case `/edit/`:
        return 0;
      // Adicione mais casos conforme necessário
      default:
        return -1; // Nenhuma aba ativa
    }
  };

  const isAuthRoute = () => {
    return ['/login', '/register'].includes(router.pathname);
  };

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {!isAuthRoute() && (
          <Flex alignItems="center" justifyContent="center" width='100%' borderBottom="1px solid #E6E6E6" pb={1} pt={4}>
            <Flex alignItems="flex-start" justifyContent="space-between" width='80%' >
              <Flex flexDirection='row'>
                <Box textAlign="center" mr={8} pb={1}>
                  <Flex alignItems="center" justifyContent="flex-start">
                    <Box borderRadius="full" overflow="hidden" p={2} bg='button.default'>
                      <Image
                        src={iconImg}
                        width={30}
                        height={30}
                        alt="Logo Bitzen Pet"
                      />
                    </Box>
                    <Text ml={4} fontSize="24px" color='txt.blue'>Bitzen Pet</Text>
                  </Flex>
                </Box>

                <Tabs index={getTabIndex()} onChange={handleTabChange}>
                  <TabList>
                    <Tab _selected={{ borderBottom: "2px solid #00B8C4" }}>
                      <Link href="/dashboard">
                        <Text>Início</Text>
                      </Link>
                    </Tab>
                    {/* Adicione mais abas conforme necessário */}
                  </TabList>
                </Tabs>
              </Flex>
              <Box cursor='pointer' display='flex' flexDirection='row' alignItems='center' justifyContent='center' onClick={() => router.push('/profile')}>
                <Avatar size="md" name="Not USer" src={photo || ""} /> {/* Atualize com o caminho correto da imagem */}
                <GoTriangleDown color='#8C8C8C' />
              </Box>
            </Flex>
          </Flex>
        )}
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  const cookies = parseCookies(appContext.ctx);
  const photo = cookies['@bitzenpet.photo'];
  return { ...appProps, photo };
};

export default MyApp;
