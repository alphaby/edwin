import { withQuery, PageProps, documentFindUnique } from "@edwin/client";

// Requête pour récupérer un document en fonction des paramètres passés en URL
const query = documentFindUnique(({ params }) => ({
  where: { id: params.id },
}));

function Page({ data: [document] }: PageProps<typeof query>) {
  return <div>{JSON.stringify(document)}</div>;
}

export default withQuery(Page, query);
