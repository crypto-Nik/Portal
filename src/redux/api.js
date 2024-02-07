import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config/app";

const TAGS = {
  allJobs: "jobs",
  departments: "departments",
  locations: "locations",
  functions: "functions",
};

export const teknorixApi = createApi({
  reducerPath: "teknorixApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "Application/json");

      return headers;
    },
    timeout: 30000, // 30sec
  }),
  tagTypes: Object.values(TAGS),
  endpoints: (builder) => ({
    getallDepartments: builder.query({
      query: () => ({
        url: "/api/v1/departments",
      }),
      providesTags: [TAGS.departments],
    }),

    getallLocations: builder.query({
      query: () => ({
        url: "/api/v1/locations",
      }),
      providesTags: [TAGS.locations],
    }),

    getallFunctions: builder.query({
      query: () => ({
        url: "/api/v1/functions",
      }),
      providesTags: [TAGS.functions],
    }),

    jobOpenings: builder.query({
      query: () => ({
        url: "/api/v1/jobs",
      }),
      providesTags: [TAGS.allJobs],
      transformResponse: (data) => {
        const jobs = data;
        const jobsByDepartment = {};

        jobs.forEach((job) => {
          const department = job.department?.title || "Other";
          if (!jobsByDepartment[department]) {
            jobsByDepartment[department] = [];
          }
          jobsByDepartment[department].push(job);
        });
        return jobsByDepartment;
      },
    }),

    getJobDetails: builder.query({
      query: (jobId) => ({
        url: `/api/v1/jobs/${jobId}`,
      }),
    }),
  }),
});

export const {
  useJobOpeningsQuery,
  useGetallDepartmentsQuery,
  useGetallLocationsQuery,
  useGetallFunctionsQuery,
  useGetJobDetailsQuery,
} = teknorixApi;

export const endpoints = teknorixApi.endpoints;
export const apiUtils = teknorixApi.util;
