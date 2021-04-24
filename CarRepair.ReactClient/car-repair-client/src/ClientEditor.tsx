import { useEffect } from "react";
import { Container } from "@material-ui/core";
import ClientGrid from "./components/grids/ClientGrid";

function ClientEditor() {
  //initialization
  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <Container>
      <h1>Client Editor</h1>
      <ClientGrid></ClientGrid>
    </Container>
  );
}

export default ClientEditor;
