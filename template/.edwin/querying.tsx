// DO NOT TOUCH THIS FILE, THIS IS AUTO-GENERATED

  
import { Prisma, User, Wiki, Member, Folder, Document, Tag } from "@prisma/client";
import { ServerMessage, GetArgs, QueryObject, useTranslation } from "@edwin/client";
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


  
export const prismaModels = ["User", "Wiki", "Member", "Folder", "Document", "Tag"];
  

  
type Args<GivenArgs, FullArgs> = Prisma.SelectSubset<GivenArgs, FullArgs>;

type InputType<GivenArgs, FullArgs, PropsType> =
  | GetArgs<GivenArgs, FullArgs, PropsType>
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
  FullArgs
> {
  return {
    getArgs: typeof input === "function" ? input : () => input,
    model,
    action,
    result: {} as ResultType,
  };
}

  
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

export function withQuery(
  Component: FunctionComponent<any>,
  ...queries: Array<QueryObject>
) {
  return withParams((props: PageProps): ReactElement => {
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
  


export function wikiFindUnique<T extends Prisma.WikiFindUniqueArgs, PropsType>(
  input: InputType<T, Prisma.WikiFindUniqueArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Wiki, Prisma.WikiGetPayload<T>>,
    Args<T, Prisma.WikiFindUniqueArgs>,
    Prisma.WikiFindUniqueArgs,
    PropsType
  >(input, "Wiki", "findUnique");
}
  

export function wikiFindFirst<T extends Prisma.WikiFindFirstArgs, PropsType>(
  input: InputType<T, Prisma.WikiFindFirstArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Wiki, Prisma.WikiGetPayload<T>>,
    Args<T, Prisma.WikiFindFirstArgs>,
    Prisma.WikiFindFirstArgs,
    PropsType
  >(input, "Wiki", "findFirst");
}
  

export function wikiFindMany<T extends Prisma.WikiFindManyArgs, PropsType>(
  input: InputType<T, Prisma.WikiFindManyArgs, PropsType>
) {
  return getQueryObject<
    ManyResult<T, Wiki, Prisma.WikiGetPayload<T>>,
    Args<T, Prisma.WikiFindManyArgs>,
    Prisma.WikiFindManyArgs,
    PropsType
  >(input, "Wiki", "findMany");
}
  

export function wikiCreate<T extends Prisma.WikiCreateArgs, PropsType>(
  input: InputType<T, Prisma.WikiCreateArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Wiki, Prisma.WikiGetPayload<T>>,
    Args<T, Prisma.WikiCreateArgs>,
    Prisma.WikiCreateArgs,
    PropsType
  >(input, "Wiki", "create");
}
  

export function wikiDelete<T extends Prisma.WikiDeleteArgs, PropsType>(
  input: InputType<T, Prisma.WikiDeleteArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Wiki, Prisma.WikiGetPayload<T>>,
    Args<T, Prisma.WikiDeleteArgs>,
    Prisma.WikiDeleteArgs,
    PropsType
  >(input, "Wiki", "delete");
}
  

export function wikiDeleteMany<T extends Prisma.WikiDeleteManyArgs, PropsType>(
  input: InputType<T, Prisma.WikiDeleteManyArgs, PropsType>
) {
  return getQueryObject<
    Prisma.BatchPayload,
    Args<T, Prisma.WikiDeleteManyArgs>,
    Prisma.WikiDeleteManyArgs,
    PropsType
  >(input, "Wiki", "deleteMany");
}
  

export function wikiUpdate<T extends Prisma.WikiUpdateArgs, PropsType>(
  input: InputType<T, Prisma.WikiUpdateArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Wiki, Prisma.WikiGetPayload<T>>,
    Args<T, Prisma.WikiUpdateArgs>,
    Prisma.WikiUpdateArgs,
    PropsType
  >(input, "Wiki", "update");
}
  

export function wikiUpdateMany<T extends Prisma.WikiUpdateManyArgs, PropsType>(
  input: InputType<T, Prisma.WikiUpdateManyArgs, PropsType>
) {
  return getQueryObject<
    Prisma.BatchPayload,
    Args<T, Prisma.WikiUpdateManyArgs>,
    Prisma.WikiUpdateManyArgs,
    PropsType
  >(input, "Wiki", "updateMany");
}
  

export function wikiUpsert<T extends Prisma.WikiUpsertArgs, PropsType>(
  input: InputType<T, Prisma.WikiUpsertArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Wiki, Prisma.WikiGetPayload<T>>,
    Args<T, Prisma.WikiUpsertArgs>,
    Prisma.WikiUpsertArgs,
    PropsType
  >(input, "Wiki", "upsert");
}
  


export function memberFindUnique<T extends Prisma.MemberFindUniqueArgs, PropsType>(
  input: InputType<T, Prisma.MemberFindUniqueArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Member, Prisma.MemberGetPayload<T>>,
    Args<T, Prisma.MemberFindUniqueArgs>,
    Prisma.MemberFindUniqueArgs,
    PropsType
  >(input, "Member", "findUnique");
}
  

export function memberFindFirst<T extends Prisma.MemberFindFirstArgs, PropsType>(
  input: InputType<T, Prisma.MemberFindFirstArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Member, Prisma.MemberGetPayload<T>>,
    Args<T, Prisma.MemberFindFirstArgs>,
    Prisma.MemberFindFirstArgs,
    PropsType
  >(input, "Member", "findFirst");
}
  

export function memberFindMany<T extends Prisma.MemberFindManyArgs, PropsType>(
  input: InputType<T, Prisma.MemberFindManyArgs, PropsType>
) {
  return getQueryObject<
    ManyResult<T, Member, Prisma.MemberGetPayload<T>>,
    Args<T, Prisma.MemberFindManyArgs>,
    Prisma.MemberFindManyArgs,
    PropsType
  >(input, "Member", "findMany");
}
  

export function memberCreate<T extends Prisma.MemberCreateArgs, PropsType>(
  input: InputType<T, Prisma.MemberCreateArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Member, Prisma.MemberGetPayload<T>>,
    Args<T, Prisma.MemberCreateArgs>,
    Prisma.MemberCreateArgs,
    PropsType
  >(input, "Member", "create");
}
  

export function memberDelete<T extends Prisma.MemberDeleteArgs, PropsType>(
  input: InputType<T, Prisma.MemberDeleteArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Member, Prisma.MemberGetPayload<T>>,
    Args<T, Prisma.MemberDeleteArgs>,
    Prisma.MemberDeleteArgs,
    PropsType
  >(input, "Member", "delete");
}
  

export function memberDeleteMany<T extends Prisma.MemberDeleteManyArgs, PropsType>(
  input: InputType<T, Prisma.MemberDeleteManyArgs, PropsType>
) {
  return getQueryObject<
    Prisma.BatchPayload,
    Args<T, Prisma.MemberDeleteManyArgs>,
    Prisma.MemberDeleteManyArgs,
    PropsType
  >(input, "Member", "deleteMany");
}
  

export function memberUpdate<T extends Prisma.MemberUpdateArgs, PropsType>(
  input: InputType<T, Prisma.MemberUpdateArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Member, Prisma.MemberGetPayload<T>>,
    Args<T, Prisma.MemberUpdateArgs>,
    Prisma.MemberUpdateArgs,
    PropsType
  >(input, "Member", "update");
}
  

export function memberUpdateMany<T extends Prisma.MemberUpdateManyArgs, PropsType>(
  input: InputType<T, Prisma.MemberUpdateManyArgs, PropsType>
) {
  return getQueryObject<
    Prisma.BatchPayload,
    Args<T, Prisma.MemberUpdateManyArgs>,
    Prisma.MemberUpdateManyArgs,
    PropsType
  >(input, "Member", "updateMany");
}
  

export function memberUpsert<T extends Prisma.MemberUpsertArgs, PropsType>(
  input: InputType<T, Prisma.MemberUpsertArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Member, Prisma.MemberGetPayload<T>>,
    Args<T, Prisma.MemberUpsertArgs>,
    Prisma.MemberUpsertArgs,
    PropsType
  >(input, "Member", "upsert");
}
  


export function folderFindUnique<T extends Prisma.FolderFindUniqueArgs, PropsType>(
  input: InputType<T, Prisma.FolderFindUniqueArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Folder, Prisma.FolderGetPayload<T>>,
    Args<T, Prisma.FolderFindUniqueArgs>,
    Prisma.FolderFindUniqueArgs,
    PropsType
  >(input, "Folder", "findUnique");
}
  

export function folderFindFirst<T extends Prisma.FolderFindFirstArgs, PropsType>(
  input: InputType<T, Prisma.FolderFindFirstArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Folder, Prisma.FolderGetPayload<T>>,
    Args<T, Prisma.FolderFindFirstArgs>,
    Prisma.FolderFindFirstArgs,
    PropsType
  >(input, "Folder", "findFirst");
}
  

export function folderFindMany<T extends Prisma.FolderFindManyArgs, PropsType>(
  input: InputType<T, Prisma.FolderFindManyArgs, PropsType>
) {
  return getQueryObject<
    ManyResult<T, Folder, Prisma.FolderGetPayload<T>>,
    Args<T, Prisma.FolderFindManyArgs>,
    Prisma.FolderFindManyArgs,
    PropsType
  >(input, "Folder", "findMany");
}
  

export function folderCreate<T extends Prisma.FolderCreateArgs, PropsType>(
  input: InputType<T, Prisma.FolderCreateArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Folder, Prisma.FolderGetPayload<T>>,
    Args<T, Prisma.FolderCreateArgs>,
    Prisma.FolderCreateArgs,
    PropsType
  >(input, "Folder", "create");
}
  

export function folderDelete<T extends Prisma.FolderDeleteArgs, PropsType>(
  input: InputType<T, Prisma.FolderDeleteArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Folder, Prisma.FolderGetPayload<T>>,
    Args<T, Prisma.FolderDeleteArgs>,
    Prisma.FolderDeleteArgs,
    PropsType
  >(input, "Folder", "delete");
}
  

export function folderDeleteMany<T extends Prisma.FolderDeleteManyArgs, PropsType>(
  input: InputType<T, Prisma.FolderDeleteManyArgs, PropsType>
) {
  return getQueryObject<
    Prisma.BatchPayload,
    Args<T, Prisma.FolderDeleteManyArgs>,
    Prisma.FolderDeleteManyArgs,
    PropsType
  >(input, "Folder", "deleteMany");
}
  

export function folderUpdate<T extends Prisma.FolderUpdateArgs, PropsType>(
  input: InputType<T, Prisma.FolderUpdateArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Folder, Prisma.FolderGetPayload<T>>,
    Args<T, Prisma.FolderUpdateArgs>,
    Prisma.FolderUpdateArgs,
    PropsType
  >(input, "Folder", "update");
}
  

export function folderUpdateMany<T extends Prisma.FolderUpdateManyArgs, PropsType>(
  input: InputType<T, Prisma.FolderUpdateManyArgs, PropsType>
) {
  return getQueryObject<
    Prisma.BatchPayload,
    Args<T, Prisma.FolderUpdateManyArgs>,
    Prisma.FolderUpdateManyArgs,
    PropsType
  >(input, "Folder", "updateMany");
}
  

export function folderUpsert<T extends Prisma.FolderUpsertArgs, PropsType>(
  input: InputType<T, Prisma.FolderUpsertArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Folder, Prisma.FolderGetPayload<T>>,
    Args<T, Prisma.FolderUpsertArgs>,
    Prisma.FolderUpsertArgs,
    PropsType
  >(input, "Folder", "upsert");
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
  


export function tagFindUnique<T extends Prisma.TagFindUniqueArgs, PropsType>(
  input: InputType<T, Prisma.TagFindUniqueArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Tag, Prisma.TagGetPayload<T>>,
    Args<T, Prisma.TagFindUniqueArgs>,
    Prisma.TagFindUniqueArgs,
    PropsType
  >(input, "Tag", "findUnique");
}
  

export function tagFindFirst<T extends Prisma.TagFindFirstArgs, PropsType>(
  input: InputType<T, Prisma.TagFindFirstArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Tag, Prisma.TagGetPayload<T>>,
    Args<T, Prisma.TagFindFirstArgs>,
    Prisma.TagFindFirstArgs,
    PropsType
  >(input, "Tag", "findFirst");
}
  

export function tagFindMany<T extends Prisma.TagFindManyArgs, PropsType>(
  input: InputType<T, Prisma.TagFindManyArgs, PropsType>
) {
  return getQueryObject<
    ManyResult<T, Tag, Prisma.TagGetPayload<T>>,
    Args<T, Prisma.TagFindManyArgs>,
    Prisma.TagFindManyArgs,
    PropsType
  >(input, "Tag", "findMany");
}
  

export function tagCreate<T extends Prisma.TagCreateArgs, PropsType>(
  input: InputType<T, Prisma.TagCreateArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Tag, Prisma.TagGetPayload<T>>,
    Args<T, Prisma.TagCreateArgs>,
    Prisma.TagCreateArgs,
    PropsType
  >(input, "Tag", "create");
}
  

export function tagDelete<T extends Prisma.TagDeleteArgs, PropsType>(
  input: InputType<T, Prisma.TagDeleteArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Tag, Prisma.TagGetPayload<T>>,
    Args<T, Prisma.TagDeleteArgs>,
    Prisma.TagDeleteArgs,
    PropsType
  >(input, "Tag", "delete");
}
  

export function tagDeleteMany<T extends Prisma.TagDeleteManyArgs, PropsType>(
  input: InputType<T, Prisma.TagDeleteManyArgs, PropsType>
) {
  return getQueryObject<
    Prisma.BatchPayload,
    Args<T, Prisma.TagDeleteManyArgs>,
    Prisma.TagDeleteManyArgs,
    PropsType
  >(input, "Tag", "deleteMany");
}
  

export function tagUpdate<T extends Prisma.TagUpdateArgs, PropsType>(
  input: InputType<T, Prisma.TagUpdateArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Tag, Prisma.TagGetPayload<T>>,
    Args<T, Prisma.TagUpdateArgs>,
    Prisma.TagUpdateArgs,
    PropsType
  >(input, "Tag", "update");
}
  

export function tagUpdateMany<T extends Prisma.TagUpdateManyArgs, PropsType>(
  input: InputType<T, Prisma.TagUpdateManyArgs, PropsType>
) {
  return getQueryObject<
    Prisma.BatchPayload,
    Args<T, Prisma.TagUpdateManyArgs>,
    Prisma.TagUpdateManyArgs,
    PropsType
  >(input, "Tag", "updateMany");
}
  

export function tagUpsert<T extends Prisma.TagUpsertArgs, PropsType>(
  input: InputType<T, Prisma.TagUpsertArgs, PropsType>
) {
  return getQueryObject<
    Result<T, Tag, Prisma.TagGetPayload<T>>,
    Args<T, Prisma.TagUpsertArgs>,
    Prisma.TagUpsertArgs,
    PropsType
  >(input, "Tag", "upsert");
}
  
  