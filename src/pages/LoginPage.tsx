import { Navigate } from "react-router-dom";
import { styled } from "styled-components";
import LoginForm from "../page-components/LoginForm";

export default function LoginPage() {
 
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Banner>
        <img src="/banner-login.png" width={"100%"} alt="" />
      </Banner>
      <Content>
        <LoginForm/>
      </Content>
    </div>
  );
}

const Banner = styled.div`
  position: fixed;
  width: 55%;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  border-top-right-radius: 2.8rem;
  border-bottom-right-radius: 2.8rem;
  img {
    height: 100%;
    object-fit: cover;
  }
`;
const Content = styled.div`
  padding-left: 55%;
`;
