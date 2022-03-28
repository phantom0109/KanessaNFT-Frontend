import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [qmessage, setQMessage] = useState("");

    const sendMsg = (e) => {
        e.preventDefault();
        if (!email || !fullName || !qmessage) {
          toast.warning('Please input necessary fields.');
          return ;
        }
        setEmail("");
        setFullName("");
        setQMessage("");
        toast("Successfully sent!");
    };

    return (
        <FooterWrapper>
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
            <a href="https://www.kanessa.io/" target="_blank">
                <img
                src="/assets/images/logo.png"
                style={{ display: "block", margin: "auto", width: '40%', minWidth: '200px' }}
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
      </FooterWrapper>
    );
}

const QueryFormPanel = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  padding: 5% 10%;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
`;

const QueryLabel = styled.div`
  @media(max-width: 567px) {
    width: 100%;
  }
  width: 50%;
`;
const QueryLabelTitle = styled.h1`
  margin: 0px;
  font: inherit;
  font-size: 60px;
  @media(max-width: 991px) {
    font-size: 50px;
  }
  @media only screen and (max-width: 567px) {
    font-size: 30px;
  }
`;

const QueryForm = styled.form`
  @media(max-width: 567px) {
    width: 100%;
  }
  width: 0;
  flex: 1;
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


const FooterWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Prata";
  font-style: normal;
  font-weight: 400;
  background: #f1e4cb;
`;
export default Footer;