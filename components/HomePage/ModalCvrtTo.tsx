import ModalSkeleton from "../utils/ModalSkeleton";
import styled from "styled-components";
import Image from 'next/image'
import {space, SpaceProps} from "styled-system";
import {useState} from "react";
import {Currency, DataLoad} from "../../types";

const Flex = styled.div<SpaceProps>`
    display:flex;
    align-items:center;
    cursor:pointer;
    ${space}
`

const Img = styled.div`
    height:24px;
    margin-right:8px;
    &.close{
        margin-left:auto;
        background:#E8E8EC; 
        border-radius:8px;
        cursor:pointer;
        margin-right:0;
    }
    &.close::after{
        content:"X";
        color:black;
    }
`


export default function ModalCvrtTo(props: { data: any, base: string, setTo: any, to: boolean, setToModal: any }) {

    return (
        <ModalSkeleton overflow={true} setShow={props.setToModal} show={props.to}>
            <Img onClick={() => props.setToModal(false)} className={'close'}/>
            <div>
                <h3>All Coin</h3>
                {props.data?.result?.symbols &&
                //@ts-ignore
                Object.values(props.data?.result?.symbols).filter((item: Currency) => item.quoteAsset === props.base).map((item: Currency) => {
                    return (
                        <Flex key={item.baseAsset} mb={'8px'} onClick={() => props.setTo(item.baseAsset)}>
                            <Img>
                                <Image height={'24px'} width={'24px'} src={`/color/${item.baseAsset}.svg`}/>
                            </Img>
                            <div>
                                {item.baseAsset}
                            </div>
                        </Flex>
                    )
                })
                }
            </div>
        </ModalSkeleton>
    )
}