import { JobGrid } from "components/grids/JobGrid";

export function Home() {
    return (
        <div>
            <h1>Home</h1>
            <JobGrid readOnly={true}></JobGrid>
        </div>
    )
}