import {
  useSetTitle,
  withQuery,
  PageProps,
  documentFindMany,
} from "@edwin/client";
import { Link } from "react-router-dom";

// Requête pour récupérer les documents liés à l'utilisateur en cours
const query = documentFindMany(({ user }) => ({
  where: { users: { some: { id: user.id } } },
}));

// Composant pour la page d'accueil avec les data dans les props grâce à withQuery (cf. plus bas)
function Index({ data: [documents] }: PageProps<typeof query>) {
  // On définit le <title> de la page
  useSetTitle("Home");

  return (
    <div>
      <h1>Hello world</h1>
      {documents.length > 0 && (
        <div>Mes documents : {documents.map((doc) => doc.title)}</div>
      )}
      <Link to="/new">Créer un document</Link>
    </div>
  );
}

// Exportation du composant avec la requête qui sera exécutée en amont du chargement du composant
export default withQuery(Index, query);
