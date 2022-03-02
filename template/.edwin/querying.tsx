// DO NOT TOUCH THIS FILE, THIS IS AUTO-GENERATED

  
import { Prisma, User, Document } from "@prisma/client";
import { ServerMessage, GetArgs, QueryObject, useTranslation, useUser } from "@edwin/client";
import axios from "axios";
import {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Params, useParams, useSearchParams } from "react-router-dom";
import Loading from "../src/components/loading";
import Error from "../src/components/error";


  
export const prismaModels = ["User", "Document"];
  

  
type Args<GivenArgs, FullArgs> = Prisma.SelectSubset<GivenArgs, FullArgs>;

type InputType<GivenArgs, FullArgs, PropsType> =
  | GetArgs<GivenArgs, FullArgs, PropsType, User>
  | Args<GivenArgs, FullArgs>;

type Result<GivenArgs, Model, Payload> = Prisma.CheckSelect<
  GivenArgs,
  Model,
  Payload
>;
type ManyResult<GivenArgs, Model, Payload> = Prisma.CheckSelect<
  GivenArgs,
  Array<Model>,
  Array<Payload>
>;

function getQueryObject<
  ResultType,
  GivenArgs extends FullArgs,
  FullArgs,
  PropsType
>(
  input: InputType<GivenArgs, FullArgs, PropsType>,
  model: Prisma.ModelName,
  action: Prisma.PrismaAction
): QueryObject<
  Prisma.ModelName,
  Prisma.PrismaAction,
  ResultType,
  GivenArgs,
  FullArgs,
  PropsType,
  User
> {
  return {
    getArgs: typeof input === "function" ? input : () => input,
    model,
    action,
    result: {} as ResultType,
  };
}

  
type EdwinObject = { [key: string]: unknown };
type EdwinStringObject = { [key: string]: string };

type PagePropsWithoutData = {
  params: Params<string>;
  searchParams: EdwinStringObject;
  user: User;
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
  return (props: EdwinObject) => {
    const params = useParams();
    const [urlSearchParams, setUrlSearchParams] = useSearchParams();
    const searchParams = Object.fromEntries(urlSearchParams.entries());
    return <Component {...props} params={params} searchParams={searchParams} />;
  };
}

export function withQuery(
  Component: FunctionComponent<any>,
  ...queries: Array<QueryObject>
) {
  return withParams((props: PageProps): ReactElement => {
    const user = useUser();
    const t = useTranslation();
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
              queries[0].getArgs({ ...props, user, data: prevData })
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
            setError({
              status: res.response.status,
              message: t(res.response.data),
            });
          });
      }
      fetchAllData(queries);
    }, []);

    if (data.length < queries.length) {
      if (!error) return <Loading />;
      else return <Error {...error} />;
    }
    return <Component {...props} data={data} />;
  });
}


  
export function userFindUnique<T extends Prisma.UserFindUniqueArgs, PropsType>(
  input: InputType<T, Prisma.UserFindUniqueArgs, PropsType>
) {
  return getQueryObject<
    Result<T, User, Prisma.UserGetPayload<T>>,
    Args<T, Prisma.UserFindUniqueArgs>,
    Prisma.UserFindUniqueArgs,
    PropsType
  >(input, "User", "findUnique");
}
  

export function userFindFirst<T extends Prisma.UserFindFirstArgs, PropsType>(
  input: InputType<T, Prisma.UserFindFirstArgs, PropsType>
) {
  return getQueryObject<
    Result<T, User, Prisma.UserGetPayload<T>>,
    Args<T, Prisma.UserFindFirstArgs>,
    Prisma.UserFindFirstArgs,
    PropsType
  >(input, "User", "findFirst");
}
  

export function userFindMany<T extends Prisma.UserFindManyArgs, PropsType>(
  input: InputType<T, Prisma.UserFindManyArgs, PropsType>
) {
  return getQueryObject<
    ManyResult<T, User, Prisma.UserGetPayload<T>>,
    Args<T, Prisma.UserFindManyArgs>,
    Prisma.UserFindManyArgs,
    PropsType
  >(input, "User", "findMany");
}
  

export function userCreate<T extends Prisma.UserCreateArgs, PropsType>(
  input: InputType<T, Prisma.UserCreateArgs, PropsType>
) {
  return getQueryObject<
    Result<T, User, Prisma.UserGetPayload<T>>,
    Args<T, Prisma.UserCreateArgs>,
    Prisma.UserCreateArgs,
    PropsType
  >(input, "User", "create");
}
  

export function userDelete<T extends Prisma.UserDeleteArgs, PropsType>(
  input: InputType<T, Prisma.UserDeleteArgs, PropsType>
) {
  return getQueryObject<
    Result<T, User, Prisma.UserGetPayload<T>>,
    Args<T, Prisma.UserDeleteArgs>,
    Prisma.UserDeleteArgs,
    PropsType
  >(input, "User", "delete");
}
  

export function userDeleteMany<T extends Prisma.UserDeleteManyArgs, PropsType>(
  input: InputType<T, Prisma.UserDeleteManyArgs, PropsType>
) {
  return getQueryObject<
    Prisma.BatchPayload,
    Args<T, Prisma.UserDeleteManyArgs>,
    Prisma.UserDeleteManyArgs,
    PropsType
  >(input, "User", "deleteMany");
}
  

export function userUpdate<T extends Prisma.UserUpdateArgs, PropsType>(
  input: InputType<T, Prisma.UserUpdateArgs, PropsType>
) {
  return getQueryObject<
    Result<T, User, Prisma.UserGetPayload<T>>,
    Args<T, Prisma.UserUpdateArgs>,
    Prisma.UserUpdateArgs,
    PropsType
  >(input, "User", "update");
}
  

export function userUpdateMany<T extends Prisma.UserUpdateManyArgs, PropsType>(
  input: InputType<T, Prisma.UserUpdateManyArgs, PropsType>
) {
  return getQueryObject<
    Prisma.BatchPayload,
    Args<T, Prisma.UserUpdateManyArgs>,
    Prisma.UserUpdateManyArgs,
    PropsType
  >(input, "User", "updateMany");
}
  

export function userUpsert<T extends Prisma.UserUpsertArgs, PropsType>(
  input: InputType<T, Prisma.UserUpsertArgs, PropsType>
) {
  return getQueryObject<
    Result<T, User, Prisma.UserGetPayload<T>>,
    Args<T, Prisma.UserUpsertArgs>,
    Prisma.UserUpsertArgs,
    PropsType
  >(input, "User", "upsert");
}
  


export function documentFindUnique<T extends Prisma.DocumentFindUniqueArgs, PropsType>(
  input: InputType<T, Prisma.DocumentFindUniqueArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Document, Prisma.DocumentGetPayload<T>>,
    Args<T, Prisma.DocumentFindUniqueArgs>,
    Prisma.DocumentFindUniqueArgs,
    PropsType
  >(input, "Document", "findUnique");
}
  

export function documentFindFirst<T extends Prisma.DocumentFindFirstArgs, PropsType>(
  input: InputType<T, Prisma.DocumentFindFirstArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Document, Prisma.DocumentGetPayload<T>>,
    Args<T, Prisma.DocumentFindFirstArgs>,
    Prisma.DocumentFindFirstArgs,
    PropsType
  >(input, "Document", "findFirst");
}
  

export function documentFindMany<T extends Prisma.DocumentFindManyArgs, PropsType>(
  input: InputType<T, Prisma.DocumentFindManyArgs, PropsType>
) {
  return getQueryObject<
    ManyResult<T, Document, Prisma.DocumentGetPayload<T>>,
    Args<T, Prisma.DocumentFindManyArgs>,
    Prisma.DocumentFindManyArgs,
    PropsType
  >(input, "Document", "findMany");
}
  

export function documentCreate<T extends Prisma.DocumentCreateArgs, PropsType>(
  input: InputType<T, Prisma.DocumentCreateArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Document, Prisma.DocumentGetPayload<T>>,
    Args<T, Prisma.DocumentCreateArgs>,
    Prisma.DocumentCreateArgs,
    PropsType
  >(input, "Document", "create");
}
  

export function documentDelete<T extends Prisma.DocumentDeleteArgs, PropsType>(
  input: InputType<T, Prisma.DocumentDeleteArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Document, Prisma.DocumentGetPayload<T>>,
    Args<T, Prisma.DocumentDeleteArgs>,
    Prisma.DocumentDeleteArgs,
    PropsType
  >(input, "Document", "delete");
}
  

export function documentDeleteMany<T extends Prisma.DocumentDeleteManyArgs, PropsType>(
  input: InputType<T, Prisma.DocumentDeleteManyArgs, PropsType>
) {
  return getQueryObject<
    Prisma.BatchPayload,
    Args<T, Prisma.DocumentDeleteManyArgs>,
    Prisma.DocumentDeleteManyArgs,
    PropsType
  >(input, "Document", "deleteMany");
}
  

export function documentUpdate<T extends Prisma.DocumentUpdateArgs, PropsType>(
  input: InputType<T, Prisma.DocumentUpdateArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Document, Prisma.DocumentGetPayload<T>>,
    Args<T, Prisma.DocumentUpdateArgs>,
    Prisma.DocumentUpdateArgs,
    PropsType
  >(input, "Document", "update");
}
  

export function documentUpdateMany<T extends Prisma.DocumentUpdateManyArgs, PropsType>(
  input: InputType<T, Prisma.DocumentUpdateManyArgs, PropsType>
) {
  return getQueryObject<
    Prisma.BatchPayload,
    Args<T, Prisma.DocumentUpdateManyArgs>,
    Prisma.DocumentUpdateManyArgs,
    PropsType
  >(input, "Document", "updateMany");
}
  

export function documentUpsert<T extends Prisma.DocumentUpsertArgs, PropsType>(
  input: InputType<T, Prisma.DocumentUpsertArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Document, Prisma.DocumentGetPayload<T>>,
    Args<T, Prisma.DocumentUpsertArgs>,
    Prisma.DocumentUpsertArgs,
    PropsType
  >(input, "Document", "upsert");
}
  
  