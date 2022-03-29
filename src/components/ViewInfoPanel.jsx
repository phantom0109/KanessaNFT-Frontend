import { useState } from "react";
import styled from "styled-components";
import { WHITELIST_LIMIT } from "../config/config";
import useWhitelistCount from "../hook/useWhitelistCount";
import AnimatedNumberView from "./AnimatedNumberView";
import CountDownTimer from "./CountDownTimer/CountDownTimer";

const ViewInfoPanel = () => {
    const whitelistCount = useWhitelistCount();
    const [visible, setVisible] = useState(true);

    return (
        visible && <Wrapper>
            <CounterView>
                <AnimatedNumberView value={whitelistCount} fontFamily={'Nunito'} fontSize={'30px'} fontColor={'#623506'} fontWeight={'inherit'}/>
                <Span className="divider">/</Span>    
                <Span className="whitelist-limit">{WHITELIST_LIMIT}</Span>
                <Span>whitelisted</Span>
            </CounterView>            
            {/* <CountDownTimer /> */}
            <Span className="alert">Mint date to be announced</Span>
            <img src="/assets/images/xmark.png" onClick={() => setVisible(false)}/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 70%;
    position: fixed;
    z-index: 20;
    top: +250px;
    max-width: 700px;
    @media(max-width: 567px) {
        width: 300px;
        padding: 10px;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    background: transparent;
    box-shadow: 0 0 20px 3px #895e13;
    backdrop-filter: blur(100px);
    gap: 20px;
    img {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 20px;
        cursor: pointer;
        filter: invert(1);
    }
`;

const CounterView = styled.div`
    display: flex;
    gap: 10px;
    font-family: 'Nunito';
    font-size: 30px;
`;

const Span = styled.span`
    color: #623506;
    &.alert {
        font-size: 30px;
    }
`
export default ViewInfoPanel;