import styled, {CSSObject} from "styled-components";
import {useState} from "react";
import Image from 'next/image'
import {color, ColorProps, layout, LayoutProps} from "styled-system";
import ModalCvrtFrom from "./ModalCvrtFrom";
import ModalCvrtTo from "./ModalCvrtTo";
import {useRouter} from "next/router";

const Calculator = styled.div<ColorProps>`
    min-height: 386px;
    width: 340px;
    border-radius: 20px;
    padding:16px;
    display:flex;
    flex-direction:column;
    position:relative;
    color:white;
    & h4{
        margin-top:0;
        margin-bottom:8px;
    }
    ${color}
`

const Flex = styled.div<ColorProps>`
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
    ${color}
`

const Input = styled.input<ColorProps>`
    width:100%;
    border-radius:8px;
    outline:none;
    border:none;
    height:100%;
    position:absolute;
    padding-left:10px;
    ${color}
`

const Button = styled.button`
    background-color: #FBC02D;
    border-radius:8px;
    border:none;
    outline:none;
    width:100%;
    padding:8px;
    margin-top:auto;
`

const ButtonCrvt = styled.button`
    position:absolute;
    right:0;
    height:30px;
    margin:5px;
    border-radius:8px;
    border:none;
    outline:none;
    display:flex;
    cursor:pointer;
    align-items:Center;
    background:#dddddd57;
`
const InputSec = styled.div`
    position:relative;
    width:100%;
    height:40px;
`
//@ts-ignore
const ContainerCalc = styled.div<HTMLElement | LayoutProps | { shadow: boolean }>((props: { shadow: boolean }): CSSObject => {
    return {
        position: 'relative',
        "&::before": {
            content: "''",
            display: props.shadow ? 'block':'none',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#FBC02D',
            width: '100%',
            borderRadius: '20px',
            transform: 'rotate(5deg)'
        }
    }
}, layout)

const Img = styled.div<LayoutProps>`
    margin-right:8px;
    &.exchange{
        cursor:pointer;
        transform:rotate(90deg);
        margin:16px 0;
        border-radius:8px;
        background:rgba(255,255,255,0.5);
        padding:8px;
        margin-left:auto;
    }
    ${layout}
`

const H4 = styled.h4<ColorProps>`
    ${color}
`
export default function Converter(props: { data: any }) {
    const [convertFrom, setCvrtFrom] = useState('USDT')
    const [convertTo, setCvrtTo] = useState('BTC')
    const [convertFromModal, setCvrtFromModal] = useState(false)
    const [convertToModal, setCvrtToModal] = useState(false)

    const coin = useRouter()

    return (
        <Flex>
            <div>
                {//@ts-ignore
                    <ContainerCalc shadow={coin.pathname === '/'}>
                    <Calculator bg={coin.pathname === '/' ? 'rgb(12, 104, 244)':'white'} style={{boxShadow:coin.pathname === '/' ?'':'0px 2px 1px rgb(0 0 0 / 10%), 0px 0px 1px rgb(0 0 0 / 25%)'}}>
                        <H4 color={coin.pathname === '/' ? 'white':'black'}>Pay</H4>
                        <InputSec>
                            <Input bg={coin.pathname === '/' ? 'white':'#F4F5F7'} placeholder={'insert the amount'}/>
                            <ButtonCrvt onClick={() => setCvrtFromModal(true)}>
                                <Img>
                                    <Image src={`/color/${convertFrom}.svg`} height={'16px'} width={'16px'}/>
                                </Img>
                                {convertFrom}
                            </ButtonCrvt>
                        </InputSec>
                        <Img width={'32px'} className={'exchange'}>
                            <Image height={'24px'} width={'24px'} src={'/icons/right-left-solid.svg'}/>
                        </Img>
                        <H4 color={coin.pathname === '/' ? 'white':'black'}>Receive</H4>
                        <InputSec>
                            <Input bg={coin.pathname === '/' ? 'white':'#F4F5F7'} placeholder={'insert the amount'}/>
                            <ButtonCrvt onClick={() => setCvrtToModal(true)}>
                                <Img>
                                    <Image src={`/color/${convertTo}.svg`} height={'16px'} width={'16px'}/>
                                </Img>
                                {convertTo}
                            </ButtonCrvt>
                        </InputSec>
                        <Flex color={coin.pathname === '/' ? 'white':'black'} className={'border'}>
                            <div>
                                Price Of One {convertTo}
                            </div>
                            <div>
                                {//@ts-ignore
                                    Number(Number(props.data?.result?.symbols[`${convertTo}${convertFrom}`]?.stats?.lastPrice).toFixed(2))} {convertFrom}
                            </div>
                        </Flex>
                        <Button>
                            Start Trading
                        </Button>
                    </Calculator>
                </ContainerCalc>
                }            </div>
            {convertFromModal &&
            <ModalCvrtFrom setFromModal={setCvrtFromModal} setFrom={setCvrtFrom} from={convertFromModal}/>}
            {convertToModal &&
            <ModalCvrtTo data={props.data} base={convertFrom} setToModal={setCvrtToModal} setTo={setCvrtTo}
                         to={convertToModal}/>}
        </Flex>
    )
}