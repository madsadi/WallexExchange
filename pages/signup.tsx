import styled from "styled-components";
import {color, ColorProps} from "styled-system";
import {useState} from "react";
import Link from "next/link";

const Whole = styled.div`
    display:flex;
    height:100vh;
`

const Box = styled.div`
    display:flex;
    flex:1 1 50%;
    flex-direction:column;
    border-radius:12px;
    background:white;
    padding:32px;
    width:400px;
    text-align:left;
    margin-top:auto;
    margin-bottom:auto;
    box-shadow:0px 2px 1px rgb(0 0 0 / 10%), 0px 0px 1px rgb(0 0 0 / 25%);
`

const Flex = styled.div`
    &.flex{
        background-color: rgba(11, 18, 23, 0.04);
        border-radius:8px;  
        padding:3px;
        width:200px;
        justify-content:space-between;  
        width:100%;
        margin-bottom:16px;
    }
    &.center{
        margin:auto;
    }
    &.center div{
        margin-right:16px;
    }
    &.main{
        max-width:60%;
        margin:auto;
    }
    display:flex;
    height:fit-content;
    margin:auto;
`

const LinkTo = styled.div`
    color:blue;
`

const BaseItem = styled.div<ColorProps>`
    cursor:pointer;
    border-radius:8px;
    flex:1 1 33%;
    padding:4px 4px;
    text-align:center;
    ${color}
 `

const InputSec = styled.input`
    border:1px solid #e8e8ec;
    outline:none;
    padding:8px;
    border-radius:8px;
    margin-bottom:16px;
    width:100%;
    height:40px;
`

const Label = styled.label`
    display:flex;
    margin-bottom:8px;
`

const Forgot = styled.div`
    color:blue;
    display:flex;
    margin-left:auto;
`

const RobotCheck = styled.div`
    border:1px solid #e8e8ec;
    width:80%;
    height:60px;
    margin:auto;
    margin-bottom:16px;
`

const Button = styled.button`
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
        vertical-middle;
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
        width:100%;
`

const Div = styled.div`
    flex:1 1 50%;
    display:flex;
    flex-direction:column;
    margin-left:32px;
`

const WarningBox = styled.div`
    padding:16px;
    border-radius:12px;
    background:rgb(255, 243, 224);
    margin-bottom:16px;
`
export default function Login() {
    const [base, setBase] = useState<string>('Mobile')

    return (
        <Whole>
            <Flex className={'main'}>
                <Box>
                    <h2>Create an account</h2>
                    <Label htmlFor="mobile">Mobile</Label>
                    <InputSec placeholder={'+989121235555'}/>
                    <Label htmlFor="Pass">
                        <div>
                            Password
                        </div>
                        <Forgot>
                            Forgot Password?
                        </Forgot>
                    </Label>
                    <InputSec/>
                    <RobotCheck/>
                    <Button>
                        <Link href={'/profile'}>
                            Sign up
                        </Link>
                    </Button>
                </Box>
                <Div>
                    <WarningBox>Avoid handing your personal information to someone else to earn for you.</WarningBox>
                    <WarningBox>Any offer to create an account for other people that is offered through cyberspace is
                        considered a scam and all legal and judicial consequences will be borne by you
                        personally.</WarningBox>
                    <Link href={'/help'}>Need a guide?</Link>
                    <Link href={'/login'}>Have an account already?</Link>
                </Div>
            </Flex>
        </Whole>
    )
}