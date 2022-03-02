import ReactDOM from "react-dom";
import { EdwinApp, EdwinRouting } from "@edwin/client";
import translation from "./translation.json";

// Coquille de l'application, chargée avec un fichier de traduction pour i18n
// Possibilité de rajouter des composants qui englobent EdwinRouting (Provider par exemple...)
ReactDOM.render(
  <EdwinApp translation={translation}>
    <EdwinRouting />
  </EdwinApp>,
  document.getElementById("root")
);
