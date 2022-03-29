import ModalSkeleton from "../utils/ModalSkeleton";
import styled from "styled-components";
import Image from 'next/image'
import {space, SpaceProps} from "styled-system";

const Flex=styled.div<SpaceProps>`
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


export default function ModalCvrtFrom(props:{setFrom:any,from:boolean,setFromModal:any}){
    return(
        <ModalSkeleton setShow={props.setFromModal} show={props.from}>
                <Img onClick={()=>props.setFromModal(false)} className={'close'}/>
            <div>
                <h3>All Coin</h3>
                <Flex mb={'8px'} onClick={()=>props.setFrom('USDT')}>
                    <Img>
                        <Image height={'24px'} width={'24px'} src={'/color/USDT.svg'}/>
                    </Img>
                    <div>
                        USDT
                    </div>
                </Flex>
                <Flex onClick={()=>props.setFrom('TMN')}>
                    <Img>
                        <Image height={'24px'} width={'24px'} src={'/color/TMN.svg'}/>
                    </Img>
                    <div>
                        TMN
                    </div>
                </Flex>

            </div>
        </ModalSkeleton>
    )
}