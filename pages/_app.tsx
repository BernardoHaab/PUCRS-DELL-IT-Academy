import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../styles/theme";

import ContextWrapper from "../src/components/ContextWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      {/* Carrega os dados salvos do ContextWrapper as páginas da aplicação e os componentes chamados apartir delas */}
      <ContextWrapper>
        <Component {...pageProps} />
      </ContextWrapper>
    </ThemeProvider>
  );
}
export default MyApp;
