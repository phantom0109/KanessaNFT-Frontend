import ConnectButton from "./ConnectButton";
import styled from 'styled-components';
import { OPENSEA_LINK } from "../config/config";

const Header = () => {
    return (
        <Wrapper>
            <TLTitle>Kanessa NFTs</TLTitle>
            <Button href={OPENSEA_LINK} target="_blank">View Collection</Button>
            <ConnectButton />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 20px 10% 10px 10%;
    position: fixed;
    justify-content: space-between;
    align-items: end;
    z-index: 10;
    backdrop-filter: blur(100px);
    border-radius: 0 0 16px 16px;
`;
const TLTitle = styled.h1`
  font-family: "Oswald";
  font-style: normal;
  font-weight: 400;
  font-size: 22.28px;
  display    : flex;
  align-items: center;
  height: 100%;
  /* Kanessa Black */
  color: #131218;
`;

const Button = styled.a`
width: 160px;
display: flex;
justify-content: center;
align-items: center;
background: transparent;
padding: 20px;
// color: #131218;
color: #323011;
font-size: 18px;
font-family: 'Nunito';
position: relative;
border: 1px solid #dfb77a;
border-radius: 16px;
background-clip: padding-box;
padding: 10px;
cursor: pointer;
transition: all 0.3s;
margin-left: auto;
margin-right: 20px;
text-decoration: none;
@media(max-width: 991px) {
    padding: 5px;
    width: 100px;
    font-size: 16px;
    border-radius: 12px;
}
&: hover {
    background: #9f783e55;
    color: #323011;
}
&:after {
    position: absolute;
    top: -2px; bottom: -2px;
    left: -2px; right: -2px;
    background: linear-gradient(#dfb77a, #d3922e);
    content: '';
    z-index: -1;
    border-radius: 16px;
    @media(max-width: 991px) {
        border-radius: 12px;
    }
}
`


export default Header;