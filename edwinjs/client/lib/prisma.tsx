import axios from "axios";
import { useState, useEffect } from "react";
import i18n from "./i18n";
import { Params } from "react-router-dom";

type StringObject = { [key: string]: string };

type PagePropsWithoutData<User> = {
  user: User;
  params: Params<string>;
  searchParams: StringObject;
} & { [key: string]: unknown };

type PageProps<
  User = any,
  T = unknown,
  U = unknown,
  V = unknown
> = T extends QueryObject
  ? U extends QueryObject
    ? V extends QueryObject
      ? {
          data: [T["result"], U["result"], V["result"]];
        } & PagePropsWithoutData<User>
      : {
          data: [T["result"], U["result"]];
        } & PagePropsWithoutData<User>
    : {
        data: [T["result"]];
      } & PagePropsWithoutData<User>
  : PagePropsWithoutData<User>;

type SelectAndInclude = {
  select: any;
  include: any;
};

type SelectSubset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude
  ? "Please either choose `select` or `include`."
  : {});

export type GetArgs<GivenArgs, FullArgs, PropsType, User> = (
  props: PropsType extends PageProps<User> ? PropsType : PageProps<User>
) => SelectSubset<GivenArgs, FullArgs>;

export type QueryObject<
  PrismaModelName = string,
  PrismaAction = string,
  ResultType = unknown,
  GivenArgs extends FullArgs = any,
  FullArgs = any,
  PropsType = any,
  User = any
> = {
  model: PrismaModelName;
  action: PrismaAction;
  getArgs: GetArgs<GivenArgs, FullArgs, PropsType, User>;
  result: ResultType;
};

export type ServerMessage = { status: number; message: string | null };

type UsePrismaReturn<ResultType> = {
  data: ResultType | null;
  error: ServerMessage | null;
};

export function usePrisma<
  ResultType,
  GivenArgs extends FullArgs,
  FullArgs,
  PrismaModelName,
  PrismaAction
>(
  queryObject: QueryObject<
    PrismaModelName,
    PrismaAction,
    ResultType,
    GivenArgs,
    FullArgs
  >
): UsePrismaReturn<ResultType> {
  const { model, action, getArgs } = queryObject;
  const [data, setData] = useState<UsePrismaReturn<ResultType>["data"]>(null);
  const [error, setError] =
    useState<UsePrismaReturn<ResultType>["error"]>(null);
  useEffect(() => {
    async function fetchData() {
      await axios
        .post("/api", {
          args: JSON.stringify(getArgs({})),
          model,
          action,
        })
        .then((res) => setData(res.data))
        .catch((res) =>
          setError({
            status: res.response.status,
            message: i18n.t(res.response.data),
          })
        );
    }
    fetchData();
  }, []);
  return { data, error };
}

export function queryPrisma<
  ResultType,
  GivenArgs extends FullArgs,
  FullArgs,
  PrismaModelName,
  PrismaAction
>({
  model,
  action,
  getArgs,
}: QueryObject<
  PrismaModelName,
  PrismaAction,
  ResultType,
  GivenArgs,
  FullArgs
>): Promise<UsePrismaReturn<ResultType>> {
  return axios
    .post("/api", {
      args: JSON.stringify(getArgs({})),
      model,
      action,
    })
    .then((res) => ({ data: res.data, error: null }))
    .catch((res) => ({
      data: null,
      error: {
        status: res.response.status,
        message: i18n.t(res.response.data),
      },
    }));
}
