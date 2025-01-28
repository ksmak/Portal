import wretch, { Wretch, WretchError } from "wretch";
import { AuthActions } from "@/app/components/lib/utils";
import { API_HOST } from "./components/lib/definitions";

// Extract necessary functions from the AuthActions utility.
const { handleJWTRefresh, storeToken, getToken, removeTokens } = AuthActions();

const api = () => {
  return (
    wretch(API_HOST)
      // Initialize authentication with the access token.
      .auth(`Bearer ${getToken("access")}`)
      // Catch 401 errors to refresh the token and retry the request.
      .catcher(401, async (error: WretchError, request: Wretch) => {
        try {
          // Attempt to refresh the JWT token.
          const { access } = (await handleJWTRefresh().json()) as {
            access: string;
          };

          // Store the new access token.
          storeToken(access, "access");

          // Replay the original request with the new access token.
          return request
            .auth(`Bearer ${access}`)
            .fetch()
            .unauthorized(() => {
              // window.location.replace("/");
              removeTokens();
            })
            .json();
        } catch {
          // window.location.replace("/");
          removeTokens();
        }
      })
  );
};

export const fetcher = (url: string): Promise<any> => {
  return api().get(url).json();
};

export const fetcher_no_auth = (url: string): Promise<any> => {
  return wretch(API_HOST).get(url).json();
};
