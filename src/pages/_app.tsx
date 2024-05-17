import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const colors = {
  txt: {
    blue: '#00B8C4',
    titleBlack: '#262626',
    default: '#404040',
    danger: '#E93939',
  },
  button: {
    default: '#00B8C4',
    txt: '#FFFFFF'
  },
  border: {
    default: '#CCCCCC',
  }
}

const theme = extendTheme({ colors })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
