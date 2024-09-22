import "rsuite/dist/rsuite.min.css";
import ZomatoSignUp from "./components/ZomatoSignUp";
import { Container, Content, Navbar } from "rsuite";
import { Grid, Row, HStack, Col } from "rsuite";
import CustomNavbar from "./components/Navbar";
import "./Netflix-theme.css";

function App() {
  return (
    <Container>
      <CustomNavbar />
      <Content>
        <HStack
          alignItems="center"
          justifyContent="center"
        >
          <Row className="show-grid">
            <Col>
              <ZomatoSignUp />
            </Col>
          </Row>
        </HStack>
      </Content>
    </Container>
  );
}

export default App;
