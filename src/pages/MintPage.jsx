import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputNumber from "../components/InputNumber";
import PriceView from "../components/PriceView";
import Slider from "react-slideview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import Web3Modal from "web3modal";
import providerOptions from "../utils/WalletConnectProviderOption";
import { ethers } from "ethers";

import contractAbi from "../artifacts/contracts/Kanessa.sol/Kanessa.json";
import getWhiteListInfo from "../utils/whitelist";
import DisconnectBtn from "../components/DisconnectBtn";

const contractAddress = "0xe7e1E461EE15A76B651E4ff3fAe1041c941ce298";

const MintContainer = styled.section`
  background: #dfb77a;
  width: 100%;
  padding-top: 167px;
  @media only screen and (max-width: 540px) {
    padding-top: 270px;
  }
`;

const Footer = styled.section`
  width: 100%;
  font-family: "Prata";
  font-style: normal;
  font-weight: 400;
`;

const TLTitle = styled.h1`
  position: absolute;
  width: 152px;
  height: 30px;
  left: 144.37px;
  top: 40.22px;

  font-family: "Prata";
  font-style: normal;
  font-weight: 400;
  font-size: 22.28px;
  line-height: 30px;

  /* Kanessa Black */
  color: #131218;
  @media only screen and (max-width: 750px) {
    left: 50px;
  }
`;

const ConnectBtn = styled.button`
  color: white;
  position: absolute;
  height: 62.97px;
  right: 180.36px;
  top: 23.74px;
  border: transparent solid 1px;
  border-radius: 12px;
  background: #c96ae4;
  padding-left: 30px;
  padding-right: 30px;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24.55px;
  text-transform: uppercase;
  &:hover {
    background: #ce79e6;
  }
  @media only screen and (max-width: 750px) {
    right: 50px;
  }
  @media only screen and (max-width: 540px) {
    left: 50px;
    top: 100px;
  }
`;

const MintPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 0px 173.47px 213px 109.32px;
  background: rgba(255, 252, 247, 0.2);
  border: 0.5px solid #a0a0a0;
  box-sizing: border-box;
  border-radius: 20px;
  width: calc(100% - 282.79px);
  color: #131218;
  border-width: 0;
  @media only screen and (max-width: 1310px) {
    flex-direction: column-reverse;
  }
  @media only screen and (max-width: 750px) {
    margin-left: 50px;
    margin-right: 50px;
    width: calc(100% - 100px);
  }
  @media only screen and (max-width: 430px) {
    margin-left: 10px;
    margin-right: 10px;
    width: calc(100% - 20px);
    margin-bottom: 100px;
  }
`;

const LeftForm = styled.form`
  display: inline-block;
  width: 50%;
  margin: 0;
  color: inherit;
  padding: 78.78px 146.62px 69.22px 72.06px;
  font-family: "Prata";
  font-style: normal;
  font-weight: 400;
  box-sizing: border-box;
  @media only screen and (max-width: 1310px) {
    width: 100%;
    padding-right: 70px;
  }
  @media only screen and (max-width: 420px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

const FromTitle = styled.h1`
  margin: 0px;
  font: inherit;
  font-size: 60px;
  line-height: 126.8%;
  @media only screen and (max-width: 560px) {
    font-weight: 700;
    font-size: 30px;
  }
`;

const CounterStr = styled.p`
  font-size: 25px;
  line-height: 34px;
  color: #131218;
  margin: 0;
  @media only screen and (max-width: 560px) {
    font-size: 15px;
  }
`;

const PricePanel = styled.div`
  border-radius: 6px;
  padding: 20.11px 24.31px;
  width: 100%;
  margin-top: 22.99px;
  border: #131218 solid 0.5px;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Spliter = styled.div`
  width: 100%;
  margin: 17px 0px;
  height: 0.5px;
  background: #131218;
`;

const MintBtn = styled.div`
  margin-top: 40.03px;
  background: #131218;
  color: #fffcf8;
  font-family: "Nunito";
  font-weight: 700;
  font-style: normal;
  font-size: 30px;
  line-height: 41px;
  text-align: center;
  padding-top: 19.32px;
  padding-bottom: 17.32px;
  &:hover {
    cursor: pointer;
  }
  @media only screen and (max-width: 560px) {
    font-size: 20px;
  }
`;

const RightView = styled.div`
  position: relative;
  background: #fffcf8;
  border: 0.5px solid #a0a0a0;
  box-sizing: border-box;
  border-radius: 20px;
  width: 50%;
  padding: 93.26px 0px 66.74px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  @media only screen and (max-width: 1310px) {
    width: 100%;
  }
`;

const SliderItem = styled.div`
  width: 345px;
  height: 575px;
  text-align: center;
  color: #000;
  background: url(${(props) => props.url});
  background-size: contain;
  background-repeat: no-repeat;
  @media only screen and (max-width: 400px) {
    width: 100%;
    height: 455px;
  }
`;

const QueryFormPanel = styled.div`
  display: flex;
  width: 100%;
  padding: 98px 30px 78px;
  box-sizing: border-box;
  background: #f1e4cb;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  @media only screen and (max-width: 420px) {
    padding: 40px 0px;
  }
`;

const QueryLabel = styled.div`
  width: 30%;
  @media only screen and (max-width: 1100px) {
    width: 70%;
  }
`;
const QueryLabelTitle = styled.h1`
  margin: 0px;
  font: inherit;
  font-size: 60px;
  line-height: 126.8%;
  @media only screen and (max-width: 420px) {
    font-size: 40px;
  }
`;

const QueryLabelSub = styled.h1`
  margin: 0px;
  font: inherit;
  font-size: 30px;
  font-weight: 600;
  line-height: 126.8%;
  color: #deae74;
  @media only screen and (max-width: 420px) {
    font-size: 25px;
  }
`;

const QueryForm = styled.form`
  width: 30%;
  font-family: "Raleway";
  font-style: normal;
  font-size: 13px;
  font-stretch: 100%;
  @media only screen and (max-width: 1100px) {
    width: 70%;
  }
`;

const QueryInput = styled.input`
  width: calc(50% - 2px);
  float: ${(props) => props.float};
  background: white;
  outline-width: 0;
  box-sizing: border-box;
  padding: 10px;
  border: 0px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    margin-top: 4px;
  }
`;

const QueryText = styled.textarea`
  width: 100%;
  margin-top: 4px;
  background: white;
  box-sizing: border-box;
  padding: 10px;
  height: 150px;
  border: 0px;
  outline-width: 0;
`;

const SendMsgBtn = styled.button`
  font-family: "Roboto";
  font-style: normal;
  font-size: 13px;
  font-weight: 400;
  background: #ff5130;
  text-transform: uppercase;
  padding: 20px;
  border: 0px;
  outline-width: 0;
  color: white;
  @media only screen and (max-width: 420px) {
    width: 100%;
    margin-top: 4px;
  }
`;

const Ribbon = styled.img`
  position: absolute;
  top: ${(props) => (props.top ? props.top : "")};
  left: ${(props) => (props.left ? props.left : "")};
  right: ${(props) => (props.right ? props.right : "")};
  bottom: ${(props) => (props.bottom ? props.bottom : "")};
  z-index: 2;
  @media only screen and (max-width: 450px) {
    display: ${(props) => (props.minihidden ? "none" : "block")};
    transform: scale(0.8);
  }
`;

const FooterMarkPanel = styled.div`
  width: 100%;
  background-color: #131218;
  padding: 20px 0px;
  border-bottom: #262626 solid 1px;
  @media only screen and (max-width: 450px) {
    img {
      width: 70%;
    }
  }
`;

const FooterLinksPanel = styled.div`
  width: 100%;
  background-color: #131218;
  padding-bottom: 20px;
  border-bottom: #262626 solid 1px;
`;

const FooterLinks = styled.div`
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const FooterLink = styled.a`
  color: white;
  margin: 10px 20px;
  text-decoration: unset;
  &:hover {
    color: #dfb77a;
  }
`;

const SiteLinks = styled.div`
  background: #dfb77a;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SiteLink = styled.a`
  text-decoration: unset;
  width: 32px;
  height: 30px;
  text-align: center;
  background: transparent;
  border-radius: 50%;
  font-size: 18px;
  margin: 10px;
  color: white;
  padding-top: 5px;
  &:hover {
    background: white;
    color: black;
  }
`;

const MintPage = () => {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [qmessage, setQMessage] = useState("");
  const [provider, setProvider] = useState(null);
  const [web3modal, setWeb3modal] = useState(null);
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [mintedCount, setMintedCount] = useState(0);
  const [proof, setProof] = useState("");
  const [verified, setVerified] = useState(false);
  const [address, setAddress] = useState("");

  const addCount = () => {
    setCount(count + 1);
  };

  const reduceCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const sendMsg = () => {
    setEmail("");
    setFullName("");
    setQMessage("");
    toast("Successfully sended!");
  };

  const handleWalletConnect = async () => {
    try {
      if (provider) {
        web3modal.clearCachedProvider(provider);
        setProvider(null);
        return;
      }

      const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
      });

      setWeb3modal(web3Modal);

      const newProvider = new ethers.providers.Web3Provider(
        await web3Modal.connect()
      );

      setProvider(newProvider);

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi.abi,
        newProvider.getSigner()
      );

      const address = window.ethereum.selectedAddress;
      setAddress(address);

      const data = await getWhiteListInfo(address);
      console.log(address);

      if (data.verified) {
        setProof(data.proof);
      }
      setVerified(data.verified);

      setContract(contract);

      const totalCount = await contract.totalCount();
      setTotalCount(totalCount.toNumber());

      const mintedCount = await contract.count();
      setMintedCount(mintedCount.toNumber());

      setBalance(
        parseFloat(
          ethers.utils.formatEther(await newProvider.getBalance(address))
        )
      );

      setPrice(parseFloat(ethers.utils.formatEther(await contract.price())));
    } catch (err) {
      const errStr = JSON.stringify(err);
      console.log(errStr);
      toast(err.message);
    }
  };

  const mintNow = async () => {
    try {
      if (!provider) {
        toast("Please connect your wallet!");
        return;
      } else if (balance < price * count) {
        toast("Not enough ether to mint!");
        return;
      }

      let result;
      if (verified) {
        result = await contract.payToWhiteMint(address, proof, count, {
          value: ethers.utils.parseEther(price.toString()).mul(count),
        });
      } else {
        result = await contract.payToMint(address, count, {
          value: ethers.utils.parseEther(price.toString()).mul(count),
        });
      }

      await result.wait();

      setMintedCount((await contract.count()).toNumber());

      setBalance(
        parseFloat(ethers.utils.formatEther(await provider.getBalance(address)))
      );

      setCount(1);

      toast("Minting successed!");
    } catch (err) {
      const errStr = JSON.stringify(err);
      console.log(errStr);
      toast(err.error.message);
    }
  };

  return (
    <MintContainer>
      <MintPanel>
        <Ribbon
          src="/assets/images/LTDots.png"
          top="-53px"
          left="-53px"
          minihidden
        />
        <LeftForm>
          <FromTitle>Mint your Plus size ladies NFT</FromTitle>
          <CounterStr>
            {mintedCount} / {totalCount} kanessa Minted
          </CounterStr>
          <InputNumber
            count={count}
            addCount={addCount}
            reduceCount={reduceCount}
          />
          <PricePanel>
            <PriceView price={price} rightText="Single NFT Price" />
            <Spliter />
            <PriceView price={count * price} rightText="Total Price" />
          </PricePanel>
          <MintBtn onClick={mintNow}>Mint now</MintBtn>
        </LeftForm>
        <RightView>
          <Ribbon
            src="/assets/images/RTGrid.png"
            top="-35px"
            right="-35px"
            minihidden
          />
          <Ribbon src="/assets/images/LTRibbon.png" left="60px" top="-45px" />
          <Ribbon src="/assets/images/Dot.png" left="-26px" bottom="168px" />
          <Ribbon src="/assets/images/RB.png" right="-18px" bottom="-27px" />
          <Ribbon src="/assets/images/Circle.png" top="67px" />
          <Slider
            navigation={true}
            style={{ width: "345px", height: "575px", zIndex: "2" }}
          >
            <SliderItem url="/assets/images/model0.png" />
            <SliderItem url="/assets/images/model0.png" />
            <SliderItem url="/assets/images/model0.png" />
          </Slider>
        </RightView>
      </MintPanel>
      <Footer>
        <QueryFormPanel>
          <QueryLabel>
            <QueryLabelTitle>Have Any Queries?</QueryLabelTitle>
            <QueryLabelSub>Get in touch!</QueryLabelSub>
          </QueryLabel>
          <QueryForm>
            <QueryInput
              placeholder="Full name"
              value={fullName}
              float="left"
              onChange={(e) => setFullName(e.target.value)}
            />
            <QueryInput
              placeholder="E-Mail address"
              value={email}
              float="right"
              onChange={(e) => setEmail(e.target.value)}
            />
            <QueryText
              placeholder="Write a message"
              value={qmessage}
              onChange={(e) => setQMessage(e.target.value)}
            />
            <SendMsgBtn onClick={sendMsg}>send message</SendMsgBtn>
          </QueryForm>
        </QueryFormPanel>
        <FooterMarkPanel>
          <a href="https://demo.templately.com/press24-home/">
            <img
              src="/assets/images/kanessa_nft_png.png"
              style={{ display: "block", margin: "auto" }}
            />
          </a>
        </FooterMarkPanel>
        <FooterLinksPanel>
          <FooterLinks>
            <FooterLink href="https://www.kanessa.io/homepage">HOME</FooterLink>
            <FooterLink href="https://opensea.io/KanessaBrand">
              OPENSEA
            </FooterLink>
            <FooterLink href="https://www.kanessa.io/homepage/about">
              ABOUT US
            </FooterLink>
            <FooterLink href="http://www.kanessa.net/">WEBSHOP</FooterLink>
          </FooterLinks>
        </FooterLinksPanel>
        <SiteLinks>
          <SiteLink href="https://www.facebook.com/kanessanft-102224302360656">
            <FontAwesomeIcon icon={brands("facebook-f")} />
          </SiteLink>
          <SiteLink href="https://www.instagram.com/kanessa.nft/">
            <FontAwesomeIcon icon={brands("instagram")} />
          </SiteLink>
          <SiteLink href="https://opensea.io/KanessaBrand">
            <FontAwesomeIcon icon={solid("globe")} />
          </SiteLink>
          <SiteLink href="https://discord.gg/Ruuwe5Bvhh">
            <FontAwesomeIcon icon={brands("discord")} />
          </SiteLink>
        </SiteLinks>
      </Footer>
      <TLTitle>Kanessa NFTs</TLTitle>
      {!provider ? (
        <ConnectBtn onClick={handleWalletConnect}>Connect</ConnectBtn>
      ) : (
        <DisconnectBtn
          amount={balance}
          address={address}
          handleClick={handleWalletConnect}
        />
      )}
      <ToastContainer />
    </MintContainer>
  );
};

export default MintPage;
