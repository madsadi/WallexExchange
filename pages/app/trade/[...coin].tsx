import Appbar from "../../../components/appbar/Appbar";
//@ts-ignore
import TradingViewWidget from 'react-tradingview-widget';
import styled from "styled-components";
import {Currency, DataLoad} from "../../../types";
import Link from "next/link";
import Image from "next/image";
import {
    color,
    ColorProps, flexBasis,
    FlexBasisProps,
    flexbox,
    FlexboxProps, flexDirection, FlexDirectionProps,
    layout,
    LayoutProps,
    space,
    SpaceProps
} from "styled-system";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Cookies from 'js-cookie'
import Head from "next/head";
import useForm from "../../../hooks/useForm";

const Body = styled.div`
    padding:8px;
`

const Section = styled.div<FlexBasisProps | SpaceProps>`
    display:flex;
    flex-direction:column;
    flex:1 1;
    ${space}
    ${flexBasis}
`
const Box = styled.div<FlexboxProps | SpaceProps>`
    box-shadow:0px 2px 1px rgb(0 0 0 / 10%), 0px 0px 1px rgb(0 0 0 / 25%);
    background:white;
    margin-bottom:8px;
    padding:16px;
    width:100%;
    &.chart{
        padding:0;
        height:500px;
    }
    &.table{
        height:624px;
        overflow-y:scroll;
        overscroll-behavior:none;
    }
    &.table>div{
        position:sticky;
        top:0;
        background:white;
        z-index:10;
        padding-top:16px;
    }
    &h2{
        margin:0;
    }
    &.order{
        height:300px;
        overflow-y:scroll;
        padding-top:0;
    }
    &.order h3{
        margin:16px 0 0 0;
    }
    ${space}
    ${flexbox}
`

const Flex = styled.div`
    display:flex;
    &.justify{
        justify-content:space-between;
    }
    & h2{
        margin:0;
    }
    
    & span {
        margin:auto;
    }
    &.alignC{
        align-items:center;
    }
`

const Item = styled.div<SpaceProps>`
    display:flex;
    align-items:Center;
    margin:auto 0;
    &:not(:first-child){
        flex-direction:column;
    }
    &.border{
        border-left:1px solid #e8e8ec;
        padding-left:8px;
    }
    &.row{
        flex-direction:row !important;
    }
    ${space}
`

const Img = styled.div<LayoutProps>`
    margin-right:8px;
    ${layout}
`

const FilterButton = styled(Flex)<SpaceProps>`
    & button:not(:last-child){
       margin-right:8px; 
    }
    & div:not(:last-child){
       margin-right:8px; 
    }
    &.border{
        border-bottom:1px solid #e8e8ec;
        margin-bottom:8px;
        padding-bottom:8px;
    }
    &.base{
      background-color: rgba(11, 18, 23, 0.04);
      padding:4px;
      border-radius:16px;
    }
    &.base button{
        flex:1 1;
        background:none;
    }
    ${space}
`

const Button = styled.button<ColorProps>`
      // background-color: rgba(11, 18, 23, 0.04);
      border-radius:16px;
      padding:8px 12px;
      border:none;
      outline:none;
      cursor:pointer;
      ${color}
`

const Div = styled.div`
    flex:1 1 50%;
    &:first-child{
            margin-right:16px;
    }
`

const Input = styled.input`
    display:flex;
    width:100%;
    margin-bottom:16px;
    background:rgb(250, 251, 252);
    color:rgb(203, 209, 218);
    outline:none;
    border:none;
    border-radius:5px;
    padding:16px;
`

const ButtonAction = styled.button`
    width:100%;
    padding:13px;
    outline:none;
    border:none;
    & a{
        color:blue;
    }
    & div{
        cursor:pointer;
        margin:auto;
    }
`

const Label = styled.label`
    display:flex;
    margin-bottom:8px;
`

const Span = styled.span`
    color:grey;
    font-size:13px;
`

const Table = styled.table<ColorProps | SpaceProps>`
    border-radius:12px;
    margin:0 !important;
    padding:0 !important;
    width:100%;
    & th{
        text-align:left;
    }    
    & tr{
        height:45px;
        position:relative;
    }
    &.order tbody tr{
        height:30px;
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
    &.order thead h3{
        width:100%;
    }
    &.order thead{
        position:sticky;
        top:0;
        background:white;
        width:100%;
        margin-top:-16px;
        z-index:10;
    }
    ${color}
    ${space}
`
const Td = styled.td<ColorProps>`
    align-items:Center;
    ${color}
`
const Tr = styled.tr<ColorProps>`
    align-items:Center;
    ${color}
`


const Change = styled.div<ColorProps>`
    ${color}
`
export default function TradeCoin() {
    const [data, setter] = useState<DataLoad>()
    const [trades, setTrades] = useState<any>()
    const [orders, setOrders] = useState<any>()
    const [base, setBase] = useState<string>('all')
    const [targetCoin, setTargetCoin] = useState<any>('')
    const {inputs, handleChange} = useForm({mobile: '', password: '', word: ''})
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
    const loadTrades = async () => {
        try {
            const url = `https://api.wallex.ir/v1/trades?symbol=${coin.query.coin?.[0]}`
            await fetch(url, {
                method: "GET",
                redirect: "follow",
            })
                .then((response) => response.text())
                .then((result) => setTrades(JSON.parse(result)))
        } catch (error) {
            console.log("error", error)
        } finally {
            setTimeout(loadTrades, 30000)
        }

    }
    const loadOrders = async () => {
        try {
            const url = `https://api.wallex.ir/v1/depth?symbol=${coin?.query?.coin?.[0]}`
            await fetch(url, {
                method: "GET",
                redirect: "follow",
            })
                .then((response) => response.text())
                .then((result) => {
                    setOrders(JSON.parse(result));
                    // setTimeout(callback,3000)
                })

        } catch (error) {
            console.log("error", error)
        } finally {
            setTimeout(loadOrders, 3000)
        }

    }

    useEffect(() => {
        loadData()
        loadTrades()
        loadOrders()
        if (coin.query.coin?.[0].includes('TMN')) {
            setTargetCoin(coin.query.coin?.[0].split('TMN')[0] + 'USDT')
        } else {
            setTargetCoin(coin.query.coin?.[0])
        }
    }, [])

    const token = Cookies.get('token')

    const coin = useRouter()
    const targetPair: Currency | any = data?.result.symbols && Object.values(data?.result.symbols).filter((item: Currency) => item.symbol === coin.query.coin?.[0])[0]

    return (
        <>
            <Head>
                <title>Wallex Exchange | Trade {coin?.query?.coin?.[0]}</title>
            </Head>
            <Appbar/>
            <Body>
                <Flex>
                    <Section flexBasis={'75%'}>
                        <Box>
                            <Flex className={'justify'}>
                                <Item>
                                    <Img height={'32px'}>
                                        <Image height={'32px'} width={'32px'}
                                               src={`/color/${targetPair?.baseAsset}.svg`}/>
                                    </Img>
                                    <Flex><h2>{targetPair?.baseAsset}</h2><Span>/ {targetPair?.quoteAsset}</Span></Flex>
                                </Item>
                                <Item>
                                    <div>{Number(Number(targetPair?.stats?.lastPrice).toFixed(2))}</div>
                                </Item>
                                <Item className={'row'}>
                                    <div>
                                        Past 24h
                                    </div>
                                    <Item ml={'8px'} className={'border'}>
                                        <Span>Change</Span>
                                        <Change
                                            color={targetPair?.stats?.['24h_ch'] > 0 ? 'green' : 'red'}>%{targetPair?.stats?.['24h_ch']}</Change>
                                    </Item>
                                </Item>
                                <Item>
                                    <Span>Highest Price</Span>
                                    <Change>{Number(Number(targetPair?.stats?.['24h_highPrice']).toFixed(2))}</Change>
                                </Item>
                                <Item>
                                    <Span>Lowest Price</Span>
                                    <Change>{Number(Number(targetPair?.stats?.['24h_lowPrice']).toFixed(2))}</Change>
                                </Item>
                                <Item>
                                    <Span>Market Price</Span>
                                    <Change>{Number(Number(targetPair?.stats?.lastPrice).toFixed(2))}</Change>
                                </Item>
                                <Item>
                                    <Span>Volume</Span>
                                    <Change>{Number(Number(targetPair?.stats?.['24h_volume']).toFixed(2))}</Change>
                                </Item>
                            </Flex>
                        </Box>
                        <Box className={'chart'}>
                            <TradingViewWidget hide_side_toolbar={false} withdateranges autosize
                                               symbol={`${targetCoin}`}/>
                        </Box>
                        <Box>
                            <FilterButton className={'border'}>
                                <Button>Last Price</Button>
                                <Button>Market Price</Button>
                                <Img></Img>
                            </FilterButton>
                            <Flex>
                                <Div>
                                    <Label>sell at price</Label>
                                    <Input disabled={!token} type={'number'}
                                           placeholder={`${targetPair?.stats?.lastPrice}`}/>
                                    <Label>amount {targetPair?.baseAsset}</Label>
                                    <Input disabled={!token} type={'number'}/>
                                    <Input disabled={!token} type={'range'}/>
                                    <ButtonAction>
                                        {!token ?
                                            <div><Link href={'/login'}>Login</Link> or <Link
                                                href={'/signup'}>Signup</Link></div> : <div>Long / Buy</div>}

                                    </ButtonAction>
                                </Div>
                                <Div>
                                    <Label>buy at price</Label>
                                    <Input disabled={!token} type={'number'}
                                           placeholder={`${targetPair?.stats?.lastPrice}`}/>
                                    <Label>amount {targetPair?.baseAsset}</Label>
                                    <Input disabled={!token} type={'number'}/>
                                    <Input disabled={!token} type={'range'}/>
                                    <ButtonAction>
                                        {!token ? <div><Link href={'/login'}>Login</Link> or <Link
                                            href={'/signup'}>Signup</Link></div> : <div>Long / Buy</div>}

                                    </ButtonAction>
                                </Div>
                            </Flex>
                        </Box>
                        <Flex>
                            <Box className={'order custom-scrollbar'} mr={'8px'}>
                                <Table cellSpacing={0} className={'order'} bg={coin.pathname !== '/' ? 'white' : ''}>
                                    <thead>
                                    <tr>
                                        <h3>Sell Orders</h3>
                                        <th/>
                                        <th/>
                                    </tr>
                                    <tr>
                                        <th>Price {targetPair?.quoteAsset}</th>
                                        <th>Amount {targetPair?.baseAsset}</th>
                                        <th>Total Price {targetPair?.quoteAsset}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders?.result &&
                                    //@ts-ignore
                                    orders?.result?.ask?.map((item: any, index) => {
                                        return <Tr bg={'rgb(255, 235, 238)'} key={index}>
                                            <Td>{Number(Number(item?.price).toFixed(2))}</Td>
                                            <Td>{item.quantity}</Td>
                                            <Td color={'red'}>{Number(Number(item?.price).toFixed(2)) * Number(item?.quantity)}</Td>
                                        </Tr>
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </Box>
                            <Box className={'order custom-scrollbar'}>
                                <Table cellSpacing={0} className={'order'} bg={coin.pathname !== '/' ? 'white' : ''}>
                                    <thead>
                                    <tr>
                                        <h3>Buy Orders</h3>
                                        <th/>
                                        <th/>
                                    </tr>
                                    <tr>
                                        <th>Price {targetPair?.quoteAsset}</th>
                                        <th>Amount {targetPair?.baseAsset}</th>
                                        <th>Total Price {targetPair?.quoteAsset}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders?.result &&
                                    //@ts-ignore
                                    orders?.result?.bid?.map((item: any, index) => {
                                        return <Tr bg={'rgb(227, 252, 239)'} key={index}>
                                            <Td>{Number(Number(item?.price).toFixed(2))}</Td>
                                            <Td>{item.quantity}</Td>
                                            <Td color={'green'}>{Number(Number(item?.price).toFixed(2)) * Number(item?.quantity)}</Td>
                                        </Tr>
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </Box>
                        </Flex>
                    </Section>
                    <Section ml={'8px'} flexBasis={'25%'}>
                        <Box pt={0} className={'table custom-scrollbar'}>
                            <div>
                                <Input type={'search'} name={'word'} value={inputs.word} onChange={handleChange}
                                       placeholder={'search market'}/>
                                <FilterButton className={'base'}>
                                    <Button onClick={() => setBase('all')}
                                            style={{boxShadow: base === 'all' ? '0px 2px 1px rgb(0 0 0 / 10%), 0px 0px 1px rgb(0 0 0 / 25%)' : ''}}
                                            bg={base === 'all' ? 'white !important' : 'none'}>All</Button>
                                    <Button onClick={() => setBase('TMN')}
                                            style={{boxShadow: base === 'TMN' ? '0px 2px 1px rgb(0 0 0 / 10%), 0px 0px 1px rgb(0 0 0 / 25%)' : ''}}
                                            bg={base === 'TMN' ? 'white !important' : 'none'}>TMN</Button>
                                    <Button onClick={() => setBase('USDT')}
                                            style={{boxShadow: base === 'USDT' ? '0px 2px 1px rgb(0 0 0 / 10%), 0px 0px 1px rgb(0 0 0 / 25%)' : ''}}
                                            bg={base === 'USDT' ? 'white !important' : ''}>USDT</Button>
                                    <Button onClick={() => setBase('BTC')}
                                            style={{boxShadow: base === 'BTC' ? '0px 2px 1px rgb(0 0 0 / 10%), 0px 0px 1px rgb(0 0 0 / 25%)' : ''}}
                                            bg={base === 'BTC' ? 'white !important' : ''}>BTC</Button>
                                </FilterButton>
                            </div>
                            <Table bg={coin.pathname !== '/' ? 'white' : ''}>
                                <thead>
                                <tr>
                                    <th>Market</th>
                                    <th>Unit Price</th>
                                    <th>Change(24h)</th>
                                </tr>
                                </thead>
                                {data?.result?.symbols &&
                                //@ts-ignore
                                Object.values(data?.result?.symbols).filter((item: Currency) => base === 'all' ? item : item.quoteAsset === base).filter(item => inputs.word ? item.baseAsset.includes(inputs.word.toUpperCase()) : item).map((item: Currency) => {
                                    return <tr key={item.symbol}>
                                        <Td>
                                            <Flex className={'alignC'}>
                                                <Img height={'32px'}>
                                                    <Image height={'32px'} width={'32px'}
                                                           src={`/color/${item.baseAsset}.svg`}/>
                                                </Img>
                                                <div>
                                                    {item.baseAsset} {coin.pathname !== '/' && `/ ${item.quoteAsset}`}
                                                </div>
                                            </Flex>
                                        </Td>
                                        <Td>{Number(Number(item.stats.lastPrice).toFixed(2))}</Td>
                                        <Td color={item.stats['24h_ch'] > 0 ? 'green' : 'red'}>% {item.stats['24h_ch']}</Td>
                                    </tr>
                                })
                                }
                            </Table>
                        </Box>
                        <Box className={'table custom-scrollbar'}>
                            <h2>Latest trades</h2>
                            <Table bg={coin.pathname !== '/' ? 'white' : ''} px={coin.pathname !== '/' ? '16px' : ''}>
                                <tr>
                                    <th>Price {targetPair?.quoteAsset}</th>
                                    <th>Amount {targetPair?.baseAsset}</th>
                                    <th>Time</th>
                                </tr>
                                {trades?.result &&
                                //@ts-ignore
                                trades?.result?.latestTrades.map((item: any, index) => {
                                    return <tr key={index}>
                                        <Td color={!item.isBuyOrder ? 'green' : 'red'}>
                                            {Number(Number(item?.price).toFixed(2))}
                                        </Td>
                                        <Td>{Number(Number(item?.quantity).toFixed(8))}</Td>
                                        <Td>{new Date(item?.timestamp).toLocaleString('en-GB', {timeZone: undefined}).split(',')[1]}</Td>
                                    </tr>
                                })
                                }
                            </Table>

                        </Box>
                    </Section>
                </Flex>
                <Box></Box>
            </Body>
        </>
    )
}