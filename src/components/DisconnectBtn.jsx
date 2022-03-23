import React from "react";
import styled from "styled-components";

const DCBtn = styled.div`
  display: flex;
  justify-content: space-between;
  border: 0.5px solid #dce0e2;
  border-radius: 12px;
  align-items: center;
  color: white;
  position: absolute;
  height: 62.97px;
  right: 180.36px;
  top: 23.74px;
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
    cursor: pointer;
    opacity: 0.9;
  }
`;

const EtherIcon = styled.img`
  width: 30px;
  height: 30px;
  padding: 5px;
  box-sizing: content-box;
  border-radius: 10px;
  background: #f7f7f7;
`;

const HeaderAmount = styled.div`
  background-color: transparent;
  padding: 0 6px;
  border-radius: 10px;
`;

const HeaderAmountText = styled.div`
  font-family: "Bai Jamjuree", sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: black;
  text-align: center;
  font-weight: bold;
  margin-top: 4px;
`;

const HeaderAddressText = styled.div`
  font-family: "Bai Jamjuree", sans-serif;
  font-size: 10px;
  font-weight: 600;
  color: #bb4141;
  text-align: center;
  margin: 5px 8px 0 8px;
`;

export default function DisconnectBtn(props) {
  return (
    <DCBtn onClick={props.handleClick}>
      <EtherIcon src="/assets/images/Dot.png" alt="eth-icon" />
      <div className="account-information-wrapper">
        <HeaderAmount>
          <HeaderAmountText>{props.amount.toFixed(4)} ETH</HeaderAmountText>
        </HeaderAmount>
        <HeaderAddressText>
          {props.address.substr(0, 4)} ...{" "}
          {props.address.substr(props.address.length - 3)}
        </HeaderAddressText>
      </div>
    </DCBtn>
  );
}
