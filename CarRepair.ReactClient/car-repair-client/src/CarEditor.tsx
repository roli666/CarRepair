import { Container } from "@material-ui/core";
import { useEffect } from "react";
import CarGrid from "./components/grids/CarGrid";

function CarEditor() {
  //initialization
  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <Container>
      <h1>Car Editor</h1>
      <CarGrid></CarGrid>
    </Container>
  );
}

export default CarEditor;
