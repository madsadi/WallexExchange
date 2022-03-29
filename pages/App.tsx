import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {color, ColorProps} from "styled-system";

const Body = styled.div`
  display:flex;
  background:#e8e8ec;
  padding:16px;
`

const Modal =styled.div`
    background:grey;
    backdrop-filter:blur(40px);
    position:fixed;
    width:100%;
    height:100%;
    display:flex;
    z-index:1000;
    top:0;
   
`

const Content = styled.div`
    margin:auto;
    background:white;
    padding:16px;
    display:flex;
    flex-direction:column;
    width:40%;
    & input{
        margin:16px 0;
    }
`
const OrderBook = styled.div`
  display:flex;
  flex-direction:column;
  background:grey;
  color:white;
      border:1px solid black;
    width:fit-content;
`

const Flex = styled.div<ColorProps>`
    display:flex;
    &.appbar{
        padding:16px;
    }
    &.appbar div{
        cursor:pointer;
    }
    &.appbar div:not(:last-child){
        margin-right:16px;
    }
    ${color}
`
const OrderBookList = styled.ul`
    color:white;
    padding:0;
    margin:0;
    list-style-type:none;
    width:500px;
    &.ask li{
        background:green;
    }
    &.bid li{
        background:red;
    }
`

const Ul=styled.ul`
        list-style-type:none;
        padding:0 16px ;
        margin:0 0 0 auto;
        width:fit-content;
        background:black;
        color:white;
       
        & li:not(:first-child){
            cursor:pointer;
            text-align:center;
            margin-bottom:8px;
        }
        & li:not(:first-child):hover{
            color:red;
        }
        & li:first-child{
            font-size:18px;
            font-weight:bolder;
        }

`
const OrderItem = styled.li`
    display:flex;
    justify-content:space-between;
    padding:0 8px;
    & div{
        flex:1 1 25%;
        overflow:scroll;
    }
    & div::-webkit-scrollbar {
    display: none;
}
`

const Header = styled.div`
    display:flex;
    background:grey;
    justify-content:space-between;
    padding:0 8px;
    & div{
        flex:1 1 25%;
    }
`

function App() {
    const [askData, setAskData] = useState([])
    const [bidData, setBidData] = useState([])
    const [login, setModalLogin] = useState(false)
    const [currencyToShow, setCurrencyToShow] = useState('USDTTMN')
    const [mail, setMail] = useState('')

    const setter = (data: any) => {
        if (data) {
            setAskData(data.result.ask)
            setBidData(data.result.bid)
        }
    }


    const loadData = async (currency: string) => {
        const url = `https://api.wallex.ir/v1/depth?symbol=${currency}`
        await fetch(url, {
            method: "GET",
            redirect: "follow",
        })
            .then((response) => response.text())
            .then((result) => setter(JSON.parse(result)))
            .catch((error) => console.log("error", error));
    }

    useEffect(() => {
        loadData(currencyToShow)
    }, [currencyToShow])


    if (askData || bidData){
        setInterval(()=>{
            loadData(currencyToShow)
        }, 3000);
        clearInterval();
    }


    const loginFunction =()=>{
        setModalLogin(false)
    }


    return (
        <React.Fragment>
            <Flex className={'appbar'} bg={'rgb(219, 20, 61)'}>
                <div>contact</div>
                <div>menu</div>
                <div>about us</div>
                <div style={{marginLeft: 'auto'}} onClick={() => setModalLogin(true)}>login</div>
            </Flex>
            <Body>
                {/*<Chart/>*/}
                <OrderBook>
                    <div>
                        ORDER BOOK: {currencyToShow}
                    </div>
                    <Flex>
                        <OrderBookList className={'ask'}>
                            <Header>
                                <div>count</div>
                                <div>amount</div>
                                <div>total</div>
                                <div>price</div>
                            </Header>
                            {askData.map((item: any, index) => {
                                return <OrderItem key={index}>
                                    <div></div>
                                    <div>{Number(Number(item.quantity).toFixed(4))}</div>
                                    <div>{Number(Number(item.sum).toFixed(4))}</div>
                                    <div>{Number(Number(item.price).toFixed(4))}</div>
                                </OrderItem>
                            })}
                        </OrderBookList>
                        <OrderBookList className={'bid'}>
                            <Header>
                                <div>price</div>
                                <div>total</div>
                                <div>amount</div>
                                <div>count</div>
                            </Header>
                            {bidData.map((item: any, index) => {
                                return <OrderItem key={index}>
                                    <div>{Number(Number(item.price).toFixed(4))}</div>
                                    <div>{Number(Number(item.sum).toFixed(4))}</div>
                                    <div>{Number(Number(item.quantity).toFixed(4))}</div>
                                    <div></div>
                                </OrderItem>
                            })}
                        </OrderBookList>
                    </Flex>
                </OrderBook>
                <Ul>
                    <li>currency to select</li>
                    <li onClick={() => setCurrencyToShow('USDTTMN')}>USDTTMN</li>
                    <li onClick={() => setCurrencyToShow('SHIBUSDT')}>SHIBUSDT</li>
                    <li onClick={() => setCurrencyToShow('ETHUSDT')}>ETHUSDT</li>
                    <li onClick={() => setCurrencyToShow('BTCUSDT')}>BTCUSDT</li>
                    <li onClick={() => setCurrencyToShow('BTCTMN')}>BTCTMN</li>
                </Ul>
            </Body>
            {login && <Modal>
                <Content>
                    <label htmlFor="email">E-Mail:</label>
                    <input type={'email'} name={'email'} required onChange={(e)=>setMail(e.target.value)}/>
                    <label htmlFor="password">Password:</label>
                    <input type={'password'} name={'password'} required/>
                    <button onClick={loginFunction}>login</button>
                </Content>
            </Modal>
            }
        </React.Fragment>
    );
}

export default App;
