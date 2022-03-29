import Appbar from "../components/appbar/Appbar";
import Container from "../components/utils/Container";
import CurrencyStatus from "../components/HomePage/CurrencyStatus";
import Presentation from "../components/HomePage/Presentation";
import Footer from "../components/appbar/Footer";
import Converter from "../components/HomePage/Converter";
import Head from "next/head";
import {useEffect, useState} from "react";
import {DataLoad} from "../types";
import styled from "styled-components";

const Flex = styled.div`
    display:flex;
    align-items:center;
    &.separate{
        justify-content:space-between;
        margin-bottom:32px;
    }
    &.border{
        border-bottom:3px dashed white;
        flex: 1 1;
        margin-bottom: 16px;
        justify-content:space-between;
    }
`

export default function Home(){
    const [data, setter] = useState<DataLoad>()

    const loadData = async () => {
        const url = `https://api.wallex.ir/v1/markets`
        await fetch(url, {
            method: "GET",
            redirect: "follow",
        })
            .then((response) => response.text())
            .then((result) => setter(JSON.parse(result)))
            .catch((error) => console.log("error", error));
    }

    useEffect(() => {
        loadData()
    }, [])

    return(
        <>
            <Head>
                <title>Wallex Exchange</title>
            </Head>
            <Appbar/>
            <Container py={'32px'}>
                <Flex className={'separate'}>
                    <div>
                        <h1>Wallex</h1>
                        <h2>Digital Currency Trading Market</h2>
                    </div>
                    <Converter data={data}/>
                </Flex>
                <CurrencyStatus data={data}/>
                <Presentation/>
            </Container>
            <Footer/>
        </>
    )
}