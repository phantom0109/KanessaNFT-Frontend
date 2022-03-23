import MintPage from "./pages/MintPage";
import "./fonts/font.css";
import Header from "./components/Header";
import styled from "styled-components";

function App() {
  return (
    <Wrapper>
      <Header />
      <MintPage />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #dfb77a;
  width: 100%;
`
export default App;
