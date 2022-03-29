import Appbar from "../../components/appbar/Appbar";
import Converter from "../../components/HomePage/Converter";
import Container from "../../components/utils/Container";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {Currency, DataLoad} from "../../types";
import CurrencyStatus from "../../components/HomePage/CurrencyStatus";
import Head from "next/head";
import Image from "next/image";
import {useRouter} from "next/router";
import Link from "next/link";
import {space, SpaceProps} from "styled-system";
import Footer from "../../components/appbar/Footer";
//@ts-ignore
import TradingViewWidget from 'react-tradingview-widget';
import MarketOverview from "../../components/overview/MarketOverview";

const Flex = styled.div<SpaceProps>`
    display:flex;
    align-items:center;
    & h3{
        margin:0;
    }
    ${space}
`
const Img = styled.div`
    margin-right:8px;
`

const ChartContainer= styled.div`
    flex:1 1;
    margin-right:32px;
    height:386px;
`
export default function Single() {
    const [data, setter] = useState<DataLoad>()
    const [a,setS] = useState('')

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
        setS('bi')
    }, [])

    const coin = useRouter()
    const coinOfPage: Currency | undefined = data && Object.values(data?.result?.symbols).find(item => item.baseAsset === coin.query.coin?.[0])

    return (
        <>
            <Head>
                <title>Wallex Exchange | Trade {coin?.query?.coin?.[0]}</title>
            </Head>
            <Appbar/>
            <Container py={'32px'}>
                <div>
                    <Flex mb={'16px'}>
                        <Link href={'/market'}><a><h3>Market List</h3></a></Link>
                        <div>/ {coin.query.coin?.[0]}</div>
                    </Flex>
                    <Flex mb={'16px'}>
                        <Img>
                            <Image height={'32px'} width={'32px'} src={`/color/${coin.query.coin?.[0]}.svg`}/>
                        </Img>
                        <div>
                            {coinOfPage?.baseAsset}
                        </div>
                    </Flex>
                </div>
                <Flex>
                    <ChartContainer>
                        <TradingViewWidget hide_top_toolbar={true} withdateranges style={3} autosize symbol={`${coin.query.coin?.[0]}USDT`} />
                    </ChartContainer>
                    <Converter data={data}/>
                </Flex>
                <CurrencyStatus data={data}/>
                <MarketOverview data={data}/>
            </Container>
            <Footer/>
        </>
    )
}