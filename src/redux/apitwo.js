import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TAGS = {
  profile: "profile",
  login: "login",
  register: "register",
  signup: "signup",
  payment: "payment",
  apiKeys: "keys",
  usage: "usage",
  prompt: "prompt",
};

// Define a service using a base URL and expected endpoints
export const promptmuleApi = createApi({
  reducerPath: "ptml",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://demo.jobsoid.com/",
    prepareHeaders: (headers, { getState }) => {
      let token = getState().auth.token;

      if (!token) {
        token = localStorage.getItem("_pmtml");
      }

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
    timeout: 30000, // 30sec
  }),

  tagTypes: Object.values(TAGS),

  endpoints: (builder) => ({
    // --- user ---

    login: builder.mutation({
      query: (body) => ({
        url: "",
        body,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation } = promptmuleApi;

export const endpoints = promptmuleApi.endpoints;
export const apiUtils = promptmuleApi.util;
