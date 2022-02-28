import {
  Formik,
  Form as FormikForm,
  FormikProps,
  FormikConfig,
  FormikValues,
} from "formik";
import { QueryObject, queryPrisma } from "../lib/prisma";
import { useSetMessage } from "../contexts/message";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Optional<T extends object, K extends keyof T = keyof T> = Omit<
  T,
  K
> &
  Partial<Pick<T, K>>;

type Props<ModelName, Action, T, U extends V, V, W extends FormikValues> = {
  onSubmitQuery?: (values: W) => QueryObject<ModelName, Action, T, U, V>;
  onSuccess?: (data: any) => void; // TO DO : en réalité data est de type T, mais bug unknown
  children:
    | ((
        formik: FormikProps<W>,
        loading: boolean,
        success: boolean
      ) => React.ReactNode)
    | React.ReactNode;
} & Optional<Omit<FormikConfig<W>, "children">, "onSubmit">;

export default function PrismaForm<
  ModelName,
  Action,
  T,
  U extends V,
  V,
  W extends FormikValues
>({
  onSubmitQuery,
  onSuccess,
  children,
  ...props
}: Props<ModelName, Action, T, U, V, W>) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();
  const setMessage = useSetMessage();
  return (
    <Formik
      onSubmit={async (values, helpers) => {
        if (onSubmitQuery) {
          setLoading(true);
          const { data, error } = await queryPrisma(onSubmitQuery(values));
          if (error) {
            setLoading(false);
            setMessage(error);
          } else if (data) {
            setLoading(false);
            setSuccess(true);
            setMessage(t("formSuccess"));
            if (onSuccess) return onSuccess(data);
          }
        } else if (props.onSubmit) {
          return props.onSubmit(values, helpers);
        }
      }}
      {...props}
    >
      {(formikProps) => (
        <FormikForm>
          {typeof children === "function"
            ? children(formikProps, loading, success)
            : children}
        </FormikForm>
      )}
    </Formik>
  );
}
