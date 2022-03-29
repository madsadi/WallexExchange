import {Currency} from "../../types";
import styled from "styled-components";
import Image from 'next/image'
import Link from 'next/link'
import {color, ColorProps} from "styled-system";

const Box = styled.div`
    background:white;
    border:1px solid #F4F5F7;
    padding:8px;
    min-width:150px;
    border-radius:8px;
    &:not(:last-child){
        margin-right:16px;
    }
`

const Flex = styled.div`
    display:flex;
    align-items:center;
    &:not(:last-child){
        margin-bottom:8px;
    }
    &.justify{
        justify-content:space-between;
    }
`

const Img = styled.div`
    height:24px;
`

const Changes = styled.div<ColorProps>`
    padding:5px;
    font-size:13px;
    border-radius:5px;
    ${color}
`
export default function SmallCurrencyBox(props:{currency:Currency}){
    return(
        <Box>
            <Flex className={'justify'}>
                <Img>
                    <Image src={`/color/${props.currency.baseAsset}.svg`} height={'24px'} width={'24px'}/>
                </Img>
                <Changes bg={props.currency.stats["24h_ch"]>0 ? '#E3FCEF':'#FFEBEE'} color={props.currency.stats["24h_ch"]>0 ? 'green':'red'}>% {props.currency.stats["24h_ch"]}</Changes>
            </Flex>
            <Flex>{props.currency.baseAsset}</Flex>
            <Flex>{Number(Number(props.currency.stats.lastPrice).toFixed(2))} {props.currency.quoteAsset}</Flex>
        </Box>
    )
}