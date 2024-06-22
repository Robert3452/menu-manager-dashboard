"use client";
import { SettingsButton } from "@/components/settings-button";
import { AuthConsumer, AuthProvider } from "@/contexts/jwt-context";
import {
  SettingsConsumer,
  SettingsProvider,
} from "@/contexts/settings-context";
import { store } from "@/store";
import { createTheme } from "@/theme";
import { createEmotionCache } from "@/utils/create-emotion-cache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Inter } from "next/font/google";
import Head from "next/head";
import "@/theme/reset.css";
// import Router from "next/router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// import nProgress from 'nprogress';
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import { Page } from "../../types/page";
import "../i18n";
import { SplashScreen } from "@/components/splash-screen";
import { SessionProvider } from "next-auth/react";
type Props = AppProps & {
  Component: Page;
  emotionCache: EmotionCache;
};

const inter = Inter({ subsets: ["latin"] });

const clientSideEmotionCache = createEmotionCache();
// const MyApp:
// React.FC<AppProps &
//  { getLayout?: (page: React.ReactNode) => React.ReactNode }> = ({ Component, pageProps }) => {

export default function RootLayout(props: Props) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component?.getLayout ?? ((page) => page);

  // useEffect(() => {
  // // gtm.initialize(gtmConfig);
  // }, []);
  // set the function
  // const getLayout = Component.getLayout || ((page: any) => page);
  // const getLayout = (page: any) => {
  //   if (Component.getLayout) {
  //     return Component.getLayout;
  //   } return ((page: any) => page)
  // }
  // const getLayout = Component.getLayout ??((page: any) => page) ;
  // const getLayout = ((page: any) => page);

  return (
    // <CacheProvider value={emotionCache}>
    <>
      <Head>
        <title>Cloud Order web application</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SessionProvider>
            <AuthProvider>
              <SettingsProvider>
                <SettingsConsumer>
                  {({ settings }) => (
                    <ThemeProvider
                      theme={createTheme({
                        direction: settings.direction,
                        responsiveFontSizes: settings.responsiveFontSizes,
                        mode: settings.theme,
                      })}
                    >
                      {/* <RTL direction={settings.direction}> */}
                      <CssBaseline />
                      <Toaster position="top-center" />
                      <SettingsButton />
                      <AuthConsumer>
                        {(auth) => {
                          return !auth.isInitialized ? (
                            <SplashScreen />
                          ) : (
                            getLayout(
                              <Component {...pageProps} />
                            )
                          );
                        }}
                      </AuthConsumer>
                      {/* </RTL> */}
                    </ThemeProvider>
                  )}
                </SettingsConsumer>
              </SettingsProvider>
            </AuthProvider>
          </SessionProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </>

    // </CacheProvider>
  );
}
