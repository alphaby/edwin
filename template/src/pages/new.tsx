import { PrismaForm, documentCreate, useUser } from "@edwin/client";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Field } from "formik";

export default function Page() {
  // On récupère l'utilisateur en cours
  const user = useUser();

  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required(),
  });

  // Création d'un formulaire pour créer un nouveau document
  return (
    <div>
      <h1>Nouveau document</h1>
      <PrismaForm
        validationSchema={schema}
        initialValues={{ title: "" }}
        onSubmitQuery={(values) =>
          documentCreate({
            data: {
              title: values.title,
              users: {
                connect: { id: user.id },
              },
            },
          })
        }
        onSuccess={(data) => navigate("/document/" + data.id)}
      >
        {(formikProps, loading, success) => (
          <>
            <Field name="title" placeholder="Titre" />
            <input type="submit" value="Créer" disabled={loading} />
          </>
        )}
      </PrismaForm>
    </div>
  );
}
