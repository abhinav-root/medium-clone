import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import FormInput from "../components/FormInput";
import Link from "next/link";
import { useRouter } from "next/router";

const LOGIN_USER = gql`
  mutation LoginUserMutation($password: String!, $usernameOrEmail: String!) {
    loginUser(password: $password, usernameOrEmail: $usernameOrEmail) {
      id
      username
    }
  }
`;

const Login: NextPage = () => {
  const router = useRouter();
  const [login, { error, loading }] = useMutation(LOGIN_USER);
  const formik = useFormik({
    initialErrors: { usernameOrEmail: "" },
    initialValues: { usernameOrEmail: "", password: "" },
    onSubmit: async (values) => {
      try {
        const { data } = await login({ variables: values });
        if (data?.loginUser?.username) {
          router.replace("/");
        }
      } catch (error: any) {
        console.log(error.message);
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
            Login to your account
          </h1>
          <FormInput
            name="usernameOrEmail"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.usernameOrEmail}
            placeholder="Username or Email"
            error={error?.message}
          />

          <FormInput
            name="password"
            type="password"
            onChange={formik.handleChange}
            placeholder="Password"
            value={formik.values.password}
          />
          <button
            type="submit"
            className="uppercase py-4 w-full bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-500 mb-8"
          >
            Login
          </button>
          <h3 className="text-gray-500 text-center">
            Not a member?
            <span className="text-blue-600 font-medium hover:text-blue-500">
              <Link href="/register">
                <a> Signup</a>
              </Link>
            </span>
          </h3>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
