import { userFindMany, queryPrisma, useSetTitle } from "@edwin/client";

export default function Index() {
  const setTitle = useSetTitle("blublu");

  async function test() {
    const { data, error } = await queryPrisma(userFindMany({}));
    console.log(data);
    setTitle("blabla");
  }

  return (
    <div>
      <h2>Accueil</h2>
      <button onClick={test}>Clique</button>
    </div>
  );
}
