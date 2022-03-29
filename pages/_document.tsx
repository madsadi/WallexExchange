import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import Script from 'next/script'


class MyDocument extends Document {
    static async getInitialProps(ctx:DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    // eslint-disable-next-line react/display-name
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        }
        catch {
            return { ...initialProps }
        }
        finally {
            sheet.seal()
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta name='application-name' content='wallex' />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content='wallex' />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    <meta name='msapplication-config' content='/browserconfig.xml' />
                    <meta name='msapplication-TileColor' content='#2B5797' />
                    <meta name='msapplication-tap-highlight' content='no' />
                    <meta name='theme-color' content='#000000' />

                    <link rel='apple-touch-icon' href='/WallexLogo.svg' />
                    <link rel='apple-touch-icon' sizes='152x152' href='' />
                    <link rel='apple-touch-icon' sizes='180x180' href='' />
                    <link rel='apple-touch-icon' sizes='167x167' href='/WallexLogo.svg' />
                    <link rel='apple-touch-icon' sizes='144x144' href='/WallexLogo.svg' />
                    <link rel='apple-touch-icon' sizes='114x144' href='/WallexLogo.svg' />

                    <link rel='icon' type='image/png' sizes='32x32' href='/WallexLogo.svg' />
                    <link rel='icon' type='image/png' sizes='16x16' href='/WallexLogo.svg' />
                    <link rel='mask-icon' href='/WallexLogo.svg' color='#5bbad5' />
                    <link rel='shortcut icon' href='/WallexLogo.svg' />
                    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
                    <link rel='stylesheet' href='/fonts/font.css' />

                    <meta name="google-site-verification" content='NP-zsDm4RP_tyfxKiqwv9wNQaX7leZU7cMlws_1PMME' />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                    {/*for Map*/}
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                          crossOrigin=""/>
                    {/*Make sure you put this AFTER Leaflet's CSS*/}
                    {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                    <Script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
                            integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
                            crossOrigin=""/>


                    <Script
                        src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
                        strategy="beforeInteractive"
                    />
                    {/*Global site tag (gtag.js) - Google Analytics*/}
                    <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-162156070-1"/>
                    <Script   dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', 'UA-162156070-1');`
                    }}/>
                    <Script   dangerouslySetInnerHTML={{
                        __html: `
                              (function(c,l,a,r,i,t,y){
                                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                            })(window, document, "clarity", "Script", "9wde3bsa7e");`
                    }}/>
                </Head>

                <body className={'scroll-d-none'}>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
