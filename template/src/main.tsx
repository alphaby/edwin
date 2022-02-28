import ReactDOM from "react-dom";
import { EdwinApp, EdwinRouting } from "@edwin/client";
import translation from "./translation.json";

ReactDOM.render(
  <EdwinApp translation={translation}>
    <EdwinRouting />
  </EdwinApp>,
  document.getElementById("root")
);
