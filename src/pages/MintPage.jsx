import React, { useState } from "react";
import styled from "styled-components";
import InputNumber from "../components/InputNumber";
import PriceView from "../components/PriceView";
import Slider from "react-slideview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";

import contractAbi from "../abi/KanessaNFT.json";
import getWhiteListInfo from "../utils/whitelist";
import { contractAddress } from "../config/config";
import useContract from "../hook/useContract";
import useTotalCount from "../hook/useTotalCount";
import { useEtherBalance, useEthers } from "@usedapp/core";
import useNFTPrice from "../hook/useNFTPrice";
import useMintedCount from "../hook/useMintedCount";
import { useMintNormal, useMintWhitelist } from "../hook/useMint";
import useWhitelistMode from "../hook/useWhitelistMode";
import { ethers } from "ethers";


const MintContainer = styled.section`
  width: 100%;
  @media only screen and (max-width: 540px) {
    padding-top: 25px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Prata";
  font-style: normal;
  font-weight: 400;
  background: #f1e4cb;
`;

const MintPanel = styled.div`
  display: flex;
  max-width: 900px;
  height: calc(100vh - 154px);
  flex-wrap: wrap;
  position: relative;
  background: rgba(255, 252, 247, 0.2);
  border: 0.5px solid #a0a0a0;
  box-sizing: border-box;
  border-radius: 20px;
  color: #131218;
  border-width: 0;
  margin-bottom: 40px;
  @media only screen and (max-width: 991px) {
    flex-direction: column-reverse;
    max-width: 365px;
    height: fit-content;
  }
  @media(max-width: 567px) {
    max-width: 320px;
  }
`;

const LeftForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0;
  color: inherit;
  font-family: "Prata";
  font-style: normal;
  font-weight: 400;
  box-sizing: border-box;
  padding: 2%;
  @media(max-width: 991px) {
    width: 100%;
    padding-top: 40px;
    padding: 5%;
  }
  @media only screen and (max-width: 567px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

const FromTitle = styled.h1`
  margin: 0px;
  font: inherit;
  font-size: 40px;
  font-weight: 700;
  @media only screen and (max-width: 991px) {
    font-size: 30px;
  }
`;

const CounterStr = styled.p`
  font-size: 20px;
  line-height: 34px;
  color: #131218;
  margin: 0;
  @media only screen and (max-width: 991px) {
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
  background: #131218;
  color: #fffcf8;
  padding: 15px;
  font-family: "Nunito";
  font-weight: 700;
  font-style: normal;
  font-size: 25px;
  margin-top: auto;
  text-align: center;
  &:hover {
    cursor: pointer;
    color: #9d9d33;
  }
  @media only screen and (max-width: 567px) {
    font-size: 20px;
  }
`;

const RightView = styled.div`
  position: relative;
  background: #fffcf8;
  box-sizing: border-box;
  width: 50%;
  padding: 2%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  @media(max-width: 991px) {
    width: 100%;
  }
`;

const SliderItem = styled.img`
  width: 100%;
  padding: 5% 10%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #000;
  background-size: contain;
  background-repeat: no-repeat;
  @media only screen and (max-width: 400px) {
    width: 100%;
  }
`;

const QueryFormPanel = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  padding: 5% 10%;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
`;

const QueryLabel = styled.div`
  width: 100%;
`;
const QueryLabelTitle = styled.h1`
  margin: 0px;
  font: inherit;
  font-size: 40px;
  @media only screen and (max-width: 567px) {
    font-size: 30px;
  }
`;

const QueryForm = styled.form`
  width: 100%;
  font-family: "Raleway";
  font-style: normal;
  font-size: 13px;
  font-stretch: 100%;
  text-align: center;
`;

const QueryInput = styled.input`
  width: calc(50% - 2px);
  float: ${(props) => props.float};
  background: white;
  outline-width: 0;
  box-sizing: border-box;
  padding: 10px;
  border: 0px;
  @media only screen and (max-width: 567px) {
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
  padding: 12px 20px;
  border: 0px;
  margin-top: 10px;
  outline-width: 0;
  color: white;
  @media only screen and (max-width: 567px) {
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
  @media only screen and (max-width: 567px) {
    display: ${(props) => (props.minihidden ? "none" : "block")};
    transform: scale(0.8);
  }
`;

const FooterMarkPanel = styled.div`
  width: 100%;
  background-color: #131218;
  padding: 20px 0px;
  border-bottom: #262626 solid 1px;
  @media only screen and (max-width: 567px) {
    img {
      width: 50%;
    }
  }
`;

const FooterLinksPanel = styled.div`
  width: 100%;
  background-color: #131218;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  @media(max-width: 567px) {
    padding: 10px 0;
  }
  border-bottom: #262626 solid 1px;
`;

const FooterLinks = styled.div`
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 500px;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  
  @media(max-width: 567px) {
    font-size: 14px;
  }
`;

const FooterLink = styled.a`
  color: white;
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

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [qmessage, setQMessage] = useState("");

  const {account, active} = useEthers();
  const balance = useEtherBalance(account)
  const totalCount = useTotalCount();
  const price = useNFTPrice();
  const mintedCount = useMintedCount();
  const whitelistMode = useWhitelistMode();

  const {error: errorForMintNormal,send: mintNormal} = useMintNormal();
  const {error: errorForMintWhitelist,send: mintWhitelist} = useMintWhitelist();

  const addCount = () => {
    if (count < 5) {
      setCount(count + 1);
    }
  };

  const reduceCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const sendMsg = (e) => {
    e.preventDefault();
    if (!email || !fullName || !qmessage) {
      toast.warning('Please Input Necessary Fields.');
      return ;
    }
    setEmail("");
    setFullName("");
    setQMessage("");
    toast("Successfully sended!");
  };

  const mintNow = async () => {
    try {
      if (!active || !account) {
        toast("Please connect your wallet!");
        return;
      } else if (balance < price * count) {
        toast.error("Not enough ether to mint!");
        return;
      }

      let result;
      if (whitelistMode) {
        const data = await getWhiteListInfo(account);
        if (!data.verified) {
          toast.warn("You are not Whitelist member.");
          return;
        }
        result = await mintWhitelist(account, data.proof, count, {
          value: price.mul(count),
        });
      } else {
        result = await mintNormal(account, count, {
          value: price.mul(count),
        });
      }

      await result.wait();

      setCount(1);
      toast("Minting successed!");

    } catch (err) {
      const errStr = JSON.stringify(err);
      console.log(errStr);
      toast.error(err.error.message);
    }
  };

  return (
    <MintContainer>
      <MintPanel>
        <Ribbon
          src="/assets/images/LTDots.png"
          top="-10%"
          left="-53px"
          minihidden
        />
        <LeftForm>
          <FromTitle>Mint your Plus size ladies</FromTitle>
          <CounterStr>
            {`${mintedCount.toNumber()} / ${totalCount.toNumber()}`} kanessa Minted
          </CounterStr>
          <InputNumber
            count={count}
            addCount={addCount}
            reduceCount={reduceCount}
          />
          <PricePanel>
            <PriceView price={price} rightText="Mint Price" />
            <Spliter />
            <PriceView price={price.mul(count)} rightText="Total Price" />
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
          <Ribbon src="/assets/images/LTRibbon.png" left="40px" top="-45px" />
          <Ribbon src="/assets/images/Dot.png" left="-26px" bottom="168px" />
          <Ribbon src="/assets/images/RB.png" right="-18px" bottom="-27px" />
          <Ribbon src="/assets/images/Circle.png"/>
          <Slider
            navigation={true}
            style={{ width: "80%", zIndex: "2" }}
          >
            <SliderItem src="/assets/images/model1.png" />
            <SliderItem src="/assets/images/model2.png" />
            <SliderItem src="/assets/images/model3.png" />
            <SliderItem src="/assets/images/model4.png" />
            <SliderItem src="/assets/images/model5.png" />
          </Slider>
        </RightView>
      </MintPanel>
      <Footer>
        <QueryFormPanel>
          <QueryLabel>
            <QueryLabelTitle>Have Any Queries?</QueryLabelTitle>
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
      <ToastContainer />
    </MintContainer>
  );
};

export default MintPage;
