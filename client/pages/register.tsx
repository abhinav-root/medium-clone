import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import FormInput from "../components/FormInput";
import Link from "next/link";
import { useRouter } from "next/router";

const CREATE_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
    }
  }
`;

const Register: NextPage = () => {
  const router = useRouter();
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const formik = useFormik({
    initialValues: { username: "", email: "", password: "" },
    initialErrors: { username: "", email: "", password: "" },
    onSubmit: async (values) => {
      try {
        const { data } = await createUser({ variables: values });
        if (data.createUser.username) {
          router.replace("/");
        }
      } catch (error: any) {
        console.log(error.graphQLErrors[0]);
        const formErrors: { [key: string]: string } = {};
        for (const err of error.graphQLErrors[0].extensions?.exception
          ?.validationErrors) {
          const errKey: string = err.property;
          const errVal: string[] = Object.values(err.constraints);
          if (errKey !== undefined || null) {
            formErrors[errKey] = errVal[0];
          }
        }
        formik.setErrors(formErrors);
        console.log(formErrors);
      }
    },
  });
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-8">
        <form
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          className="bg-white max-w-md mx-auto p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-center text-2xl text-gray-500 mb-6">
            Create your account
          </h1>
          <FormInput
            name="username"
            type="text"
            onChange={formik.handleChange}
            placeholder="Username"
            value={formik.values.username}
            error={formik.errors.username}
          />
          <FormInput
            name="email"
            type="text"
            onChange={formik.handleChange}
            placeholder="Email"
            value={formik.values.email}
            error={formik.errors.email}
          />
          <FormInput
            name="password"
            type="password"
            onChange={formik.handleChange}
            placeholder="Password"
            value={formik.values.password}
            error={formik.errors.password}
          />
          <button
            type="submit"
            className="uppercase py-4 w-full bg-yellow-500 text-white text-lg rounded-lg hover:bg-yellow-400 mb-8"
          >
            Signup for free
          </button>
          <h3 className="text-gray-500 text-center">
            Already have an account?
            <span className="text-blue-600 font-medium hover:text-blue-500">
              <Link href="/login">
                <a> Login</a>
              </Link>
            </span>
          </h3>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
