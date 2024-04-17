import ToggleButtonGroup from "./btngroup";
import { ResultTable } from "./result-table";

function Result() {
  return (
    <div className="flex w-full flex-col">
      <div className="mr-5 flex justify-end">
        <ToggleButtonGroup></ToggleButtonGroup>
      </div>
      <hr className="my-2" />
      <ResultTable></ResultTable>
    </div>
  );
}

export default Result;
