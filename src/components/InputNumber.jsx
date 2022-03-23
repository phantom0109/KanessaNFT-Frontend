import React, { useState } from "react";
import styled from "styled-components";

const DispCount = styled.div`
  display: inline-block;
  text-align: center;
  font-family: "Nunito";
  font-weight: 700;
  font-style: normal;
  font-size: 30px;
  line-height: 41px;
  width: 100%;
  position: relative;
  background: rgba(255, 255, 255, 0.3);
  padding: 20.82px 35.08px 19.82px 28.47px;
  margin-top: 33.49px;
  mix-blend-mode: normal;
  border-radius: 6px;
  box-sizing: border-box;
  @media only screen and (max-width: 560px) {
    font-size: 20px;
  }
`;

const ChangeBtn = styled.a`
  position: absolute;
  font: inherit;
  font-weight: 400;
  font-size: 27px;
  line-height: 37px;
  margin: 0 28.47px;
  top: 20.82px;
  left: ${(props) => (props.left ? "0px;" : "")};
  right: ${(props) => (props.right ? "0px;" : "")};
  border: transparent solid 1px;
  text-decoration: unset;
  color: black;
  &:hover {
    border-color: transparent;
    cursor: pointer;
    border-color: #a0a0a0;
  }
  @media only screen and (max-width: 560px) {
    font-size: 15px;
  }
`;

const InputNumber = (props) => {
  return (
    <DispCount>
      <ChangeBtn left onClick={props.reduceCount}>
        -
      </ChangeBtn>
      {props.count}
      <ChangeBtn right onClick={props.addCount}>
        +
      </ChangeBtn>
    </DispCount>
  );
};

export default InputNumber;
