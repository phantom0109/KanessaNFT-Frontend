import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputNumber from "../components/InputNumber";
import PriceView from "../components/PriceView";
import Slider from "react-slideview"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {getWhiteListInfo} from "../utils/whitelist";
import useTotalCount from "../hook/useTotalCount";
import { useEtherBalance, useEthers } from "@usedapp/core";
import useNFTPrice from "../hook/useNFTPrice";
import useMintedCount from "../hook/useMintedCount";
import { useMintNormal, useMintWhitelist } from "../hook/useMint";
import useWhitelistMode from "../hook/useWhitelistMode";
import ViewInfoPanel from "../components/ViewInfoPanel";
import AnimatedNumberView from "../components/AnimatedNumberView";

const MintPage = () => {
  const [count, setCount] = useState(1);
  const {account, active} = useEthers();
  const balance = useEtherBalance(account)
  const totalCount = useTotalCount();
  const price = useNFTPrice();
  const mintedCount = useMintedCount();
  const whitelistMode = useWhitelistMode();

  const imgs = [
    "/assets/images/model0.png",
    "/assets/images/model1.png",
    "/assets/images/model2.png",
    "/assets/images/model3.png",
    "/assets/images/model4.png",
  ];

  const {state: stateForMintNormal,send: mintNormal} = useMintNormal();
  const {state: stateForMintWhitelist,send: mintWhitelist} = useMintWhitelist();

  useEffect(() => {
    if (stateForMintNormal) {
      stateForMintNormal.status === 'Exception' && toast.error(stateForMintNormal.errorMessage);
      stateForMintNormal.status === 'Success' && toast.success('Mint success!');
    }
    if (stateForMintWhitelist) {
      stateForMintWhitelist.status === 'Exception' && toast.error(stateForMintWhitelist.errorMessage);
      stateForMintWhitelist.status === 'Success' && toast.success('Mint success!');
    }

    console.log('status: ', stateForMintNormal, stateForMintWhitelist)

  }, [stateForMintNormal, stateForMintWhitelist]);

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

  const mintNow = async () => {
    try {
      if (!active || !account) {
        toast.warning("Please connect your wallet!");
        return;
      } else if (balance < price * count) {
        toast.error("Not enough ETH to mint!");
        return;
      }

      let result;
      if (whitelistMode) {
        const data = await getWhiteListInfo(account);
        if (!data.verified) {
          toast.warning("You are not Whitelist member.");
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

      setCount(1);
    } catch (err) {
      const errStr = JSON.stringify(err);
      console.log(errStr);
    }
  };

  return (
    <MintContainer>
      {/* <ViewInfoPanel /> */}
      <MintPanel>
        <Ribbon
          src="/assets/images/LTDots.png"
          top="-10%"
          left="-53px"
          minihidden
        />
        <LeftForm>
          <FromTitle>Mint Your Figura Amare NFT</FromTitle>
          {/* <CounterStr>
            <AnimatedNumberView value={mintedCount.toNumber()} fontFamily={'inherit'} fontSize={'inherit'} fontColor={'inherit'} fontWeight={'inherit'}/>
            {` / ${totalCount.toNumber()}`} NFTs Minted
          </CounterStr> */}
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
            className="slider-card"
          >
            {
              imgs.map((img, index) => (
                <SliderItem key={index} className="slider-item" src={img} />
              ))
            }
            
          </Slider>
        </RightView>
      </MintPanel>
    </MintContainer>
  );
};

const MintContainer = styled.section`
  width: 100%;
  padding-top: 120px;
  @media only screen and (max-width: 540px) {
    padding-top: 40px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const MintPanel = styled.div`
  display: flex;
  max-width: 1000px;
  min-height: calc(100vh - 154px);
  flex-wrap: wrap;
  position: relative;
  background: rgba(255, 252, 247, 0.2);
  border: 0.5px solid #a0a0a0;
  box-sizing: border-box;
  border-radius: 20px;
  color: #131218;
  border-width: 0;
  margin-bottom: 40px;
  box-shadow: 1px 1px 11px 1px #d5993b;
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
  color: var(--text-color);
  text-align: center;
  @media only screen and (max-width: 991px) {
    font-size: 30px;
  }
`;

const CounterStr = styled.p`
  font-size: 20px;
  line-height: 34px;
  color: #131218;
  margin: 0;
  text-align: center;
  @media only screen and (max-width: 991px) {
    font-size: 15px;
  }
`;

const PricePanel = styled.div`
  border-radius: 6px;
  padding: 20.11px 24.31px;
  width: 100%;
  margin: 22.99px 0;
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
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    color: #9d9d33;
    background: #000;
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
  padding: 0 5%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  @media(max-width: 991px) {
    width: 100%;
    padding: 2%;
  }
`;

const SliderItem = styled.img`
  padding: 5% 10%;
  width: 100%;
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

const Ribbon = styled.img`
  position: absolute;
  top: ${(props) => (props.top ? props.top : "")};
  left: ${(props) => (props.left ? props.left : "")};
  right: ${(props) => (props.right ? props.right : "")};
  bottom: ${(props) => (props.bottom ? props.bottom : "")};
  z-index: 0;
  @media only screen and (max-width: 567px) {
    display: ${(props) => (props.minihidden ? "none" : "block")};
    transform: scale(0.8);
  }
`;

export default MintPage;
