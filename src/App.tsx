import { useRef, useState } from "react";
import {
  Container,
  Col,
  Row,
  Navbar,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import "./custom.scss";
import "./App.css";
import DesignNav from "./components/DesignNav";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Editor from "./components/Editor";
import designs from "./designs/designs";
import Konva from "konva";
import InfoModal from "./components/InfoModal";

let imageScale = 1;
const onScaleChange = (scale: number) => {
  imageScale = scale;
};

function App() {
  const stageRef = useRef<Konva.Stage>(null);

  const [pageState, setPageState] = useState(0);

  const downloadImage = (showLines:boolean) => {
    if (stageRef?.current) {
      //console.log("test1", stageRef.current.find(".divider"))
      stageRef.current.find("Transformer, .divider").forEach((tf) => {
        tf.hide();
      });
      var link = document.createElement("a");
      link.download = "ppic.png";
      link.href = stageRef.current.toDataURL({ pixelRatio: imageScale });
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (showLines) {
             stageRef.current.find("Transformer, .divider").forEach((tf) => {
        tf.show();
             
      }); 
    }
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/:design(" + Object.keys(designs).join("|") + ")"}>
          <Container fluid className="vh-100 p-0">
            <Col md={12} className="h-100 flex-column d-flex">
              <Row className="flex-row d-flex">
                <Navbar className="w-100" bg="dark" variant="dark">
                  <Container fluid>
                    <Navbar.Brand>
                      <strong>ppic:</strong>ng
                    </Navbar.Brand>
                    <DesignNav designs={designs} />
                    <InfoModal />
                    <Button variant="primary" onClick={() => downloadImage(false)} className="ml-1 d-md-block d-none">
                      Download
                    </Button>
                  </Container>
                </Navbar>
              </Row>
              <Row className="flex-row d-md-none d-flex">
                <Navbar bg="light" variant="light" className="w-100">
                  <Container fluid className="justify-content-center">
                    {" "}
                    <ButtonGroup>
                      <Button
                        variant={pageState === 0 ? "primary" : "outline-primary"}
                        onClick={() => {
                          setPageState(0);
                        }}
                      >
                        Editor
                      </Button>
                      <Button
                        variant={pageState === 1 ? "primary" : "outline-primary"}
                        onClick={() => {
                          setPageState(1);
                        }}
                      >
                        Vorschau
                      </Button>
                    </ButtonGroup>
                    <Button
                      variant="primary"
                      onClick={() => downloadImage(true)}
                      className="ml-5 d-md-none d-block"
                    >
                      Download
                    </Button>
                  </Container>
                </Navbar>
              </Row>
              <Row className="flex-grow-1 flex-row d-md-flex d-block tab-content overflow-auto">
                <Editor
                  designs={designs}
                  onScaleChange={onScaleChange}
                  stageRef={stageRef}
                  pageState={pageState}
                />
              </Row>
            </Col>
          </Container>
        </Route>
        <Route>
          <Redirect to={"/" + Object.keys(designs)[0]} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
