import styled from "styled-components";
import {color, ColorProps, layout, LayoutProps, space, SpaceProps} from "styled-system";
import {useEffect, useState} from "react";
import {Currency, DataLoad} from "../../types";
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from "next/router";

const Flex = styled.div`
    display:flex;
    align-items:center;
    &.base{
        background-color: rgba(11, 18, 23, 0.04);
        border-radius:16px;  
        padding:6px 12px;
        width:200px;
        justify-content:space-between;  
    }
`

const Table = styled.table<ColorProps | SpaceProps>`
    margin-top:16px;
    border-radius:12px;
    & th{
        text-align:left;
    }    
    & tr{
        height:45px;
        position:relative;
    }
    & tr:not(:last-child)::after{
        content:"";
        position:absolute;
        bottom:0;
        right:0;
        width:100%;
        background:#e8e8ec;
        height:1px;
    }
    ${color}
    ${space}
`


const FilterButton = styled(Flex)<SpaceProps>`
    & button:not(:last-child){
       margin-right:8px; 
    }
    & div:not(:last-child){
       margin-right:8px; 
    }
    ${space}
`

const Button = styled.button<ColorProps>`
      background-color: rgba(11, 18, 23, 0.04);
      border-radius:16px;
      padding:8px 12px;
      border:none;
      outline:none;
      ${color}
`
const BaseItem = styled.div<ColorProps>`
    cursor:pointer;
    border-radius:12px;
    flex:1 1 33%;
    padding:4px 8px;
    text-align:center;
    ${color}
 `
const TradeButton = styled.button`
    background-color: rgb(12, 104, 244);
    color: rgb(255, 255, 255);
    height: 32px;
    padding:8px 12px;
    border-radius: 40px;
    display: inline-flex;
    align-items: center;
    border: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transition: all 0.2s ease 0s;
    text-decoration: none;
    white-space: nowrap;
`

const Td = styled.td<ColorProps>`
    align-items:Center;
    ${color}
`

const Img = styled.div<LayoutProps>`
    margin-right:16px;
    ${layout}
`
export default function CurrencyStatus(props: { data: any }) {
    const [base, setBase] = useState<string>('USDT')

    const coin = useRouter()
    return (
        <>
            {coin.pathname === '/' && <Flex>
                <FilterButton>
                    <Button>All</Button>
                    <Button>Trend</Button>
                    <Button>Gainers</Button>
                    <Button>Losers</Button>
                </FilterButton>
                <FilterButton ml={'auto'}>
                    <div>
                        Based on
                    </div>
                    <Flex className={'base'}>
                        <BaseItem bg={base === 'USDT' ? 'white' : ''} onClick={() => setBase('USDT')}>USDT</BaseItem>
                        <BaseItem bg={base === 'BTC' ? 'white' : ''} onClick={() => setBase('BTC')}>BTC</BaseItem>
                        <BaseItem bg={base === 'TMN' ? 'white' : ''} onClick={() => setBase('TMN')}>Toman</BaseItem>
                    </Flex>
                </FilterButton>
            </Flex>}
            <Table bg={coin.pathname !== '/' ? 'white' : ''} px={coin.pathname !== '/' ? '16px' : ''}>
                <tr>
                    <th>Market</th>
                    <th>Last Price</th>
                    <th>Change(24h)</th>
                    <th>Volume(24h)</th>
                    <th>Weekly Change</th>
                    <th/>
                </tr>
                {props.data?.result?.symbols &&
                //@ts-ignore
                Object.values(props.data?.result?.symbols).filter((item: Currency) => coin.pathname !== '/' ? item.baseAsset === coin.query.coin[0] : item.quoteAsset === base).map((item: Currency) => {
                    return <tr key={item.symbol}>
                        <Link href={`/market/${item.baseAsset}`}>
                            <a>
                                <Td>
                                    <Flex>
                                        <Img>
                                            <Image height={'32px'} width={'32px'} src={`/color/${item.baseAsset}.svg`}/>
                                        </Img>
                                        <div>
                                            {item.baseAsset} {coin.pathname !== '/' && `/ ${item.quoteAsset}`}
                                        </div>
                                    </Flex>
                                </Td>
                            </a>
                        </Link>
                        <Td>{Number(Number(item.stats.lastPrice).toFixed(2))}</Td>
                        <Td color={item.stats['24h_ch'] > 0 ? 'green' : 'red'}>% {item.stats['24h_ch']}</Td>
                        <Td>{Number(Number(item.stats['24h_volume']).toFixed(2))}</Td>
                        <Td color={item.stats['7d_ch'] > 0 ? 'green' : 'red'}>% {item.stats['7d_ch']}</Td>
                        <Td>
                            <TradeButton>
                                <Link href={`/app/trade/${item.symbol}`}>
                                    Trade
                                </Link>
                            </TradeButton>
                        </Td>
                    </tr>
                })
                }
            </Table>
        </>
    )
}