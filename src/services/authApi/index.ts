import { LoginResponse } from "../../types";
import { api } from "../api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      {
        token: string;
        is_verified: boolean;
        expiration_subscription_date?: Date;
      },
      { email: string; password: string }
    >({
      query: ({ email, password }) => {
        return {
          url: "/auth/",
          method: "POST",
          body: {
            email,
            password,
          },
        };
      },
      transformResponse: (response: { data: LoginResponse }): LoginResponse => {
        return response.data;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
