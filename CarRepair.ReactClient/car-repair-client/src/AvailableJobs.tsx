import { JobGrid } from "components/grids/JobGrid";

export function AvailableJobs() {
  return (
    <div>
      <h1>Available jobs</h1>
      <JobGrid readOnly={true}></JobGrid>
    </div>
  );
}
