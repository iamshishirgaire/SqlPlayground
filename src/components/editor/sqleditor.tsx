import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

function SqlEditor() {
  return (
    <div className="grid gap-2 rounded-md ">
      <Label className="sr-only" htmlFor="sql">
        Enter SQL
      </Label>
      <Textarea
        className="min-h-[200px] "
        id="sql"
        placeholder="Enter your SQL statement here..."
      ></Textarea>
      <div className="grid gap-2"></div>
    </div>
  );
}

export default SqlEditor;
