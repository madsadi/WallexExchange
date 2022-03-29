import styled from "styled-components";
import {space, SpaceProps} from "styled-system";


const Contains=styled.div<SpaceProps>`
    width:80%;
    display:flex;
    flex-direction:column;
    flex:1 1;
    height:100%;
    margin:auto;
    ${space}
`

export default function Container({ children,className,py }:{children:any,className:string,py:string}){
    return(
        <Contains className={className} py={py}>
            {children}
        </Contains>
    )
}

Container.defaultProps={
    className:'container',
    py:'0px'
}