import Container from "../utils/Container";
import styled from "styled-components";
import Image from "next/image";
import {layout, LayoutProps} from "styled-system";

const Whole = styled.div`
    background:#F4F5F7;
    padding:32px 0;
`

const Table=styled.table`
    width:100%;
    & th{
        text-align:left;
    }
    & tr{
        height:45px;
    }
`
const Flex = styled.div`
    display:flex;
`

const Img = styled.a<LayoutProps>`
    margin-right:100px;
    padding-top:10px;
    ${layout}
`

export default function Footer(){
    return(
        <Whole>
            <Container>
                <Flex>
                    <Img>
                        <Image height={'30px'} width={'80px'} src={'/WallexLogo.svg'}/>
                    </Img>
                    <Table>
                        <tr>
                            <th>Usage Guidance</th>
                            <th>Wallex</th>
                            <th>Clients Service</th>
                            <th>Contact Us</th>
                        </tr>
                        <tr>
                            <td>Home</td>
                            <td>About Wallex</td>
                            <td>F&Q</td>
                            <td>Icons</td>
                        </tr>
                        <tr>
                            <td>How To Sign Up</td>
                            <td>Rules</td>
                            <td>Usage Guidance</td>
                            <td>support@wallex.ir</td>
                        </tr>
                        <tr>
                            <td>How To Place a Order</td>
                            <td>Commission</td>
                            <td>API Documents</td>
                            <td>+9821-91006555</td>
                        </tr>
                        <tr>
                            <td>Payment</td>
                            <td>Markets</td>
                            <td>Change Log</td>
                            <td>7 Days a Week, 24h</td>
                        </tr>
                    </Table>
                </Flex>
            </Container>
        </Whole>
    )
}