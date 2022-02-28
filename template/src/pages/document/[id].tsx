import Error from "../../components/error";
import Loading from "../../components/loading";
import {
  withQuery,
  PageProps,
  documentFindUnique,
  memberFindMany,
  wikiFindUnique,
  usePrisma,
} from "@edwin/client";

const query = documentFindUnique((props) => ({
  where: { id: props.params.id },
}));

const query2 = wikiFindUnique((props: PageProps<typeof query>) => ({
  where: {
    id: props.data[0].wikiId,
  },
}));

const query3 = memberFindMany(
  (props: PageProps<typeof query, typeof query2>) => {
    console.log(props);
    return {
      where: {
        wikiId: props.data[0].content,
      },
    };
  }
);

function Index(props: PageProps<typeof query, typeof query2, typeof query3>) {
  // const { data, error } = usePrisma(
  //   documentFindUnique({
  //     where: { id: props.params.id },
  //   })
  // );
  // if (!data) {
  //   if (!error) return <Loading />;
  //   else return <Error {...error} />;
  // }
  // return <div>{JSON.stringify(data)}</div>;
  return <div>{JSON.stringify(props)}</div>;
}

export default withQuery(Index, query, query2, query3);
