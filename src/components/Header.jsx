import ConnectButton from "./ConnectButton";
import styled from 'styled-components';
import { OPENSEA_LINK } from "../config/config";

const Header = () => {
    return (
        <Wrapper>
            <Logo src="/assets/images/logo.png"/>
            <Button href={OPENSEA_LINK} target="_blank">View Collection</Button>
            <ConnectButton />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 20px 10% 10px 10%;
    @media(max-width: 567px) {
        gap: 0 10px;
        position: relative;
    }
    position: fixed;
    justify-content: space-between;
    align-items: end;
    z-index: 10;
    flex-wrap: wrap;
    backdrop-filter: blur(100px);
    border-radius: 0 0 16px 16px;
`;
const Logo = styled.img`
  font-family: "Oswald";
  font-style: normal;
  font-weight: 400;
  font-size: 22.28px;
  display    : flex;
  align-items: center;
  height: 55px;
  @media(max-width: 567px) {
      width: 100%;
      height: auto;
  }
  /* Kanessa Black */
  color: #131218;
`;

const Button = styled.a`
width: fit-content;
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
@media(max-width: 567px) {
    margin-left: 0;
    margin-right: 0;
    flex:1;
}
text-decoration: none;
@media(max-width: 991px) {
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