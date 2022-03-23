import React from "react";
import styled from "styled-components";

const ViewPanel = styled.div`
  position: relative;
  margin: 0px;
  text-align: left;
  font-family: "Nunito";
  font-weight: 800;
  font-size: 25px;
  line-height: 34px;
  color: inherit;
  width: 100%;
`;

const RightText = styled.div`
  position: absolute;
  font: inherit;
  font-weight: 300;
  font-size: 20px;
  line-height: 27.28px;
  vertical-align: bottom;
  right: 0px;
  bottom: 0px;
  @media only screen and (max-width: 560px) {
    display: none;
  }
`;

const PriceView = (props) => {
  return (
    <ViewPanel>
      {props.price.toFixed(2)} ETH
      <RightText>{props.rightText}</RightText>
    </ViewPanel>
  );
};

export default PriceView;
