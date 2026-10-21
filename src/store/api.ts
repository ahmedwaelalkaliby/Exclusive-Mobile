import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { isAxiosError, type AxiosRequestConfig } from "axios";
import type {
  ApiErrorData,
  ApiResponse,
  AuthCredentials,
  AuthResponse,
  Product,
  SignupDetails,
} from "../types";

interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  body?: unknown;
  params?: AxiosRequestConfig["params"];
}

interface AxiosBaseQueryError {
  status: number | string;
  data: ApiErrorData;
}

const axiosBaseQuery: BaseQueryFn<
  AxiosBaseQueryArgs,
  unknown,
  AxiosBaseQueryError
> = async ({ url, method = "GET", body, params }) => {
  if (typeof url !== "string" || !url.trim()) {
    return {
      error: {
        status: "CUSTOM_ERROR",
        data: { message: "API request is missing a URL." },
      },
    };
  }

  try {
    const response = await axios({
      url: `https://ecommerce.routemisr.com/api/v1/${url}`,
      method,
      data: body,
      params,
    });
    return { data: response.data };
  } catch (error: unknown) {
    if (isAxiosError<ApiErrorData>(error)) {
      return {
        error: {
          status: error.response?.status ?? "FETCH_ERROR",
          data: error.response?.data ?? { message: error.message },
        },
      };
    }
    return {
      error: {
        status: "CUSTOM_ERROR",
        data: {
          message:
            error instanceof Error ? error.message : "Unknown request error",
        },
      },
    };
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({ url: "products" }),
      transformResponse: (response: ApiResponse<Product[]>) => response.data,
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => ({ url: `products/${id}` }),
      transformResponse: (response: ApiResponse<Product>) => response.data,
    }),
    login: builder.mutation<AuthResponse, AuthCredentials>({
      query: (credentials) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<{ message: string }, SignupDetails>({
      query: (details) => ({
        url: "auth/signup",
        method: "POST",
        body: details,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useLoginMutation,
  useSignupMutation,
} = api;
