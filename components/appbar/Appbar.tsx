import styled from "styled-components";
import {layout, LayoutProps, space, SpaceProps} from "styled-system";
import Image from 'next/image'
import Link from 'next/Link'
import Cookies from "js-cookie";
import {useRouter} from "next/router";

const Flex = styled.div<SpaceProps>`
    display:flex;
    align-items:center;
    &>button:not(:last-child){
        margin-right:16px;
    }
    &>div:not(:last-child){
        margin-right:16px;
    }
    ${space}
`

const Menu = styled(Flex)<SpaceProps>`
    &>div{
        padding:8px;
        border-radius:8px;
    }
    &>button{
        padding:8px;
        border-radius:8px;
    }
    &>div:hover{
        background-color: rgba(11, 18, 23, 0.04);
    }
    &>button:hover{
        background-color: rgba(11, 18, 23, 0.04);
    }
    ${space}
`

const Bar = styled(Flex)`
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border: none;
    width: 100%;
    flex-shrink: 0;
    padding:0 20px;
    position: sticky;
    z-index: 1100;
    top: 0px;
    right: auto;
    left: 0px;
    background-color: rgb(255, 255, 255);
    color: rgb(11, 18, 23);
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 0px;
    height: 56px;
`

const Img = styled.a<LayoutProps | SpaceProps>`
    ${layout}
    ${space}
`
const FlexA = styled.a<LayoutProps>`
display:flex;
    ${layout}
`

const Button = styled.button`
    border:none;
    outline:none;
    cursor:pointer;
    &.register{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        outline: 0px;
        border: 0px;
        margin: 0px 16px 0px 0px;
        cursor: pointer;
        user-select: none;
        vertical-amiddle;
        appearance: none;
        text-decoration: none;
        text-transform: uppercase;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        color: rgba(0, 0, 0, 0.87);
        background-color: rgb(253, 216, 53);
        box-shadow: none;
        border-radius: 8px;
        min-width: initial;
        font-size: 0.875rem;
        font-weight: 700;
        line-height: 1.75;
        padding: 4px 16px;
    }
    &.login{
        background:transparent;
    }
`
export default function Appbar() {
    const token = Cookies.get('token')
    const router = useRouter()

    return (
        <Bar>
            <Flex>
                <Link href={'/'} passHref>
                    <Img mr={'16px'}>
                        <Image height={'30px'} width={'80px'} src={'/WallexLogo.svg'}/>
                    </Img>
                </Link>
                <Menu>
                    <div className="dropdown">
                        <button className="dropbtn">
                            Markets
                        </button>
                        <div className="dropdown-content">
                            <Link href={'/market/BTC'} passHref>
                                <FlexA>
                                    <Img height={'24px'}>
                                        <Image height={'24px'} width={'24px'} src={`/color/BTC.svg`}/>
                                    </Img>
                                    <div>
                                        BTC
                                    </div>
                                </FlexA>
                            </Link>
                            <Link href={'/market/ETH'} passHref><
                                FlexA>
                                <Img height={'24px'}>
                                    <Image height={'24px'} width={'24px'} src={`/color/ETH.svg`}/>
                                </Img>
                                <div>
                                    ETH
                                </div>
                            </FlexA>
                            </Link>
                            <Link href={'/market/USDT'} passHref>
                                <FlexA>
                                    <Img height={'24px'}>
                                        <Image height={'24px'} width={'24px'} src={`/color/USDT.svg`}/>
                                    </Img>
                                    <div>
                                        USDT
                                    </div>
                                </FlexA>
                            </Link>
                            <Link href={'/market/DOGE'} passHref>
                                <FlexA>
                                    <Img height={'24px'}>
                                        <Image height={'24px'} width={'24px'} src={`/color/DOGE.svg`}/>
                                    </Img>
                                    <div>
                                        DOGE
                                    </div>
                                </FlexA>
                            </Link>
                            <Link href={'/market'} passHref>
                                <FlexA>
                                    <Img height={'24px'}>
                                        {/*<Image height={'24px'} width={'24px'} src={`/color/BTC.svg`}/>*/}
                                    </Img>
                                    <div>
                                        All Coins
                                    </div>
                                </FlexA>
                            </Link>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">
                            Trades
                        </button>
                        <div className="dropdown-content">
                            <Link href={'/app/trade/BTCUSDT'} passHref>
                                <FlexA>
                                    <Img height={'24px'}>
                                        {/*<Image height={'24px'} width={'24px'} src={`/color/BTC.svg`}/>*/}
                                    </Img>
                                    <div>
                                        Classical Trade
                                    </div>
                                </FlexA>
                            </Link>
                            <Link href={'/app/trade/BTCUSDT'} passHref>
                                <FlexA>
                                    <Img height={'24px'}>
                                        {/*<Image height={'24px'} width={'24px'} src={`/color/BTC.svg`}/>*/}
                                    </Img>
                                    <div>
                                        Pro Trade
                                    </div>
                                </FlexA>
                            </Link>
                        </div>
                    </div>
                    <div>
                        Usage Guidance
                    </div>
                    <div>
                        Commission
                    </div>
                    <div>
                        Blog
                    </div>
                </Menu>
            </Flex>
            <Menu ml={'auto'}>
                <Button className={'login'}>
                    {!token ? <Link href={'/login'} passHref>
                        Log-In
                    </Link>:<div onClick={()=> {
                        Cookies.remove('token');
                        router.reload()
                    }}>sign out</div>}
                </Button>
                <Button className={'register'}>
                    <Link href={'/signup'} passHref>
                        Register
                    </Link>
                </Button>
                {/*<Img>*/}
                {/*    /!*<Image height={'30px'} width={'80px'} src={}/>*!/*/}
                {/*</Img>*/}
            </Menu>
        </Bar>
    )
}