import Header from '../components/Header';
import Footer from '../components/Footer';
import SnackBar from '../components/SnackBar';
import { ToastContainer } from 'react-toastify';
import styled from 'react-slideview/node_modules/styled-components';

const AppLayout = ({children}) => {
    return (
        <Wrapper>
            <Header />
            {children}
            <Footer />
            <SnackBar />
            <ToastContainer toastClassName={'custom-toast-container'}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  background: #dfb77a;
  width: 100%;
`
export default AppLayout