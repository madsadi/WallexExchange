import {Currency, DataLoad} from "../../types";
import styled from "styled-components";
import Link from 'next/link'
import SmallCurrencyBox from "./SmallCurrencyBox";

const Box = styled.div`
    background:white;
    padding:16px;
    margin:16px 0;
    border-radius:12px;
`

const Header = styled.div`
    display:flex;
    justify-content:space-between;
    & h2{
        margin:0;
    }
`

const ScrollView = styled.div`
    display:flex;
    overflow-x:scroll;
    margin-top:8px;
`
export default function MarketOverview(props:{data:any}){
    return(
        <Box>
            <Header>
                <h2>
                    Market Overview
                </h2>
                <Link href={'/market'}>
                    <a>
                        Show All
                    </a>
                </Link>
            </Header>
            <ScrollView className={'custom-hor-scrollbar'}>
                {props.data?.result?.symbols &&
                //@ts-ignore
                    Object.values(props.data?.result?.symbols).filter((item:Currency)=>item.quoteAsset === 'USDT').map((item:Currency)=>{
                        return <SmallCurrencyBox currency={item}/>
                    })
                }
            </ScrollView>
        </Box>
    )
}