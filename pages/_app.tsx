import type { AppProps,NextWebVitalsMetric } from 'next/app'
import React, {useEffect, useState} from "react";
import Head from 'next/head'
import '../styles/App.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <React.Fragment>
                        <Head>
                            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                        </Head>
                        <Component {...pageProps} />
        </React.Fragment>



    )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
    console.log(metric)
}
export default MyApp
