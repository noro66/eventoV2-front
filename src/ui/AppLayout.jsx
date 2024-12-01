import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import styled from "styled-components";
const Main = styled.main`
  background-color: var(--color-grey-0);
  padding: 4rem 4.8rem 6.5rem;
  overflow: scroll;
`;
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Containter = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Containter>
          <Outlet />
        </Containter>
      </Main>
    </StyledAppLayout>
  );
}
export default AppLayout;
