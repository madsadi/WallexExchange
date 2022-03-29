import styled from "styled-components";
import {color, ColorProps} from "styled-system";
import {useState} from "react";
import Link from "next/link";
import useForm from "../hooks/useForm";
import Cookies from "js-cookie";
import {stringify} from "querystring";

const Whole = styled.div`
    display:flex;
    flex-direction:column;
    height:100vh;
    
`

const Box = styled.div`
    display:flex;
    flex-direction:column;
    border-radius:12px;
    background:white;
    padding:32px;
    width:400px;
    text-align:center;
    margin:auto;
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
    display:flex;
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
export default function Login() {
    const [base, setBase] = useState<string>('Mobile')
    const {inputs, handleChange} = useForm({mobile:'',password: '',word:''})

    return (
        <Whole>
            <Box>
                <h2>Log into your account</h2>
                <Flex className={'flex'}>
                    <BaseItem bg={base === 'Mobile' ? 'white' : ''} onClick={() => setBase('Mobile')}>Mobile</BaseItem>
                    <BaseItem bg={base === 'E-Mail' ? 'white' : ''} onClick={() => setBase('E-Mail')}>E-Mail</BaseItem>
                </Flex>
                <Label htmlFor="mobile">Mobile</Label>
                <InputSec type={"number"} name={'mobile'} onChange={handleChange} value={inputs.mobile} placeholder={'+989121235555'}/>
                <Label htmlFor="Pass">
                    <div>
                        Password
                    </div>
                    <Forgot>
                        Forgot Password?
                    </Forgot>
                </Label>
                <InputSec type={'password'} name={'password'} onChange={handleChange} value={inputs.password}/>
                <RobotCheck/>
                <Button onClick={()=>Cookies.set('token',`${inputs.mobile}`)}>
                    <Link href={'/app/trade/BTCUSDT'}>
                        Log in
                    </Link>
                </Button>
            </Box>
            <Flex className={'center'}>
                <div>
                    Create an account
                </div>
                <LinkTo>
                    <Link href={'/signup'}>
                        sign up
                    </Link>
                </LinkTo>
            </Flex>
        </Whole>
    )
}