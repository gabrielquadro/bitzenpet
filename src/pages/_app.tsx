import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { AuthProvider } from '../context/AuthContext'

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
}

const theme = extendTheme({ colors })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}
