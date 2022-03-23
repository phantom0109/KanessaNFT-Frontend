import ConnectButton from "./ConnectButton";
import styled from 'styled-components';

const Header = () => {
    return (
        <Wrapper>
            <TLTitle>Kanessa NFTs</TLTitle>
            <ConnectButton />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 30px 10%;
    justify-content: space-between;
    align-items: end;
`;
const TLTitle = styled.h1`
  font-family: "Prata";
  font-style: normal;
  font-weight: 400;
  font-size: 22.28px;
display    : flex;
align-items: center;
height: 100%;
  /* Kanessa Black */
  color: #131218;
`;


export default Header;