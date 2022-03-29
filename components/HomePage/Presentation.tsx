import styled from "styled-components";


const Top = styled.div`
    text-align:center;
`
const Flex = styled.div`
    display:flex;
`

const Section = styled.div`
    flex:1 1 25%;
    padding:16px;
    & p {
        text-align:justify;
    }
`

const Img = styled.div``


const Button = styled.button`
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    text-transform: uppercase;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: rgb(255, 255, 255);
    background-color: rgb(12, 104, 244);
    box-shadow: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.75;
    padding: 10px 24px;
    width:fit-content;
    margin:auto;
`
export default function Presentation() {
    return (
        <>
            <Top>
                <h4>
                    Features and characteristics
                </h4>
                <p>Advanced features and unique features have created a different experience in buying and selling
                    bitcoins and other digital currencies.</p>
            </Top>
            <Flex>
                <Section>
                    <Flex>
                        <Img></Img>
                        <h4>Secure storage of assets</h4>
                    </Flex>
                    <p>The advanced features of Wallex Exchange and its unique features have made it safe and easy to
                        buy and sell bitcoins and other digital currencies.</p>
                </Section>
                <Section>
                    <Flex>
                        <Img></Img>
                        <h4>Analysis tools and price charts</h4>
                    </Flex>
                    <p>Valks has made it possible for professionals to use online candlestick and line charts to analyze
                        and analyze the market to buy and sell bitcoins and other digital currencies.</p>
                </Section>
                <Section>
                    <Flex>
                        <Img></Img>
                        <h4>Fast support</h4>
                    </Flex>
                    <p>One of the hallmarks of a secure and reliable trading market for buying and selling bitcoins and
                        other digital currencies is the constant and fast support that we at Vallex strive to provide
                        the best.</p>
                </Section>
                <Section>
                    <Flex>
                        <Img></Img>
                        <h4>Coin Variety</h4>
                    </Flex>
                    <p>At the beginning of the journey, Valks covered major currencies such as Bitcoin, Atrium, Tetra,
                        etc. Valks has the ability to support more currencies in its trading market in the future.</p>
                </Section>
            </Flex>
            <Button>
                Start Now!
            </Button>
        </>
    )
}