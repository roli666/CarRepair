import { useEffect } from "react";
import { Container } from "@material-ui/core";
import JobGrid from "./components/grids/JobGrid";

function JobEditor() {
  //initialization
  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <Container>
      <h1>Job Editor</h1>
      <JobGrid></JobGrid>
    </Container>
  );
}

export default JobEditor;
