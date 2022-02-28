import axios from "axios";
import {
  FunctionComponent,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Params, useParams, useSearchParams } from "react-router-dom";
import { ServerMessage, QueryObject } from "./prisma";
import i18n from "./i18n";
import runtimeConfig from "../config";

type Object = { [key: string]: unknown };
type StringObject = { [key: string]: string };

type PagePropsWithoutData = {
  params: Params<string>;
  searchParams: StringObject;
} & { [key: string]: unknown };

export type PageProps<
  T = unknown,
  U = unknown,
  V = unknown
> = T extends QueryObject
  ? U extends QueryObject
    ? V extends QueryObject
      ? {
          data: [T["result"], U["result"], V["result"]];
        } & PagePropsWithoutData
      : {
          data: [T["result"], U["result"]];
        } & PagePropsWithoutData
    : {
        data: [T["result"]];
      } & PagePropsWithoutData
  : PagePropsWithoutData;

export function withParams(Component: FunctionComponent<any>) {
  return (props: Object) => {
    const params = useParams();
    const [urlSearchParams, setUrlSearchParams] = useSearchParams();
    const searchParams = Object.fromEntries(urlSearchParams.entries());
    return <Component {...props} params={params} searchParams={searchParams} />;
  };
}

// export function withQuery<ResultType>(
//   queryObject: QueryObject<ResultType>,
//   Component: FunctionComponent<PageProps<QueryObject<ResultType>>>
// ) {
//   return withParams((props: PageProps) => {
//     const { data, error } = usePrisma({
//       ...queryObject,
//       args: queryObject.getArgs(props),
//     });
//     if (!data) {
//       if (!error) return <Loading />;
//       else return <Error {...error} />;
//     }
//     return <Component {...props} data={data} />;
//   });
// }

export function withQuery(
  Component: FunctionComponent<any>,
  ...queries: Array<QueryObject>
) {
  return withParams((props: PageProps): ReactElement => {
    const [data, setData] = useState<Array<any>>([]);
    const [error, setError] = useState<ServerMessage | null>(null);

    useEffect(() => {
      async function fetchAllData(
        queries: Array<QueryObject>,
        prevData: any = []
      ) {
        await axios
          .post("/api", {
            ...queries[0],
            args: JSON.stringify(
              queries[0].getArgs({ ...props, data: prevData })
            ),
          })
          .then(async (res) => {
            if (queries.length === 1) {
              setData([...prevData, res.data]);
            } else {
              await fetchAllData(queries.slice(1), [...prevData, res.data]);
            }
          })
          .catch((res) => {
            console.log(
              `Error on query ${queries[0].model}/${queries[0].action}`
            );
            setError({
              status: res.response.status,
              message: i18n.t(res.response.data),
            });
          });
      }
      fetchAllData(queries);
    }, []);

    if (data.length < queries.length) {
      if (!error) return runtimeConfig().loadingComponent();
      else return runtimeConfig().errorComponent({ ...error });
    }
    return <Component {...props} data={data} />;
  });
}
