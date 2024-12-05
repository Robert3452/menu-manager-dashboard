/* eslint-disable react-hooks/exhaustive-deps */
import { authApi, CreateUserDto } from "@/api/auth/auth-api";
import { GlobalUserSession } from "@/types/next-auth";
import { I } from "@/utils/generalObj";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import PropTypes from "prop-types";
import { createContext, useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
const initialState: {
  user: GlobalUserSession | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
} = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};
const handlers: I = {
  INITIALIZE: (state: any, action: any) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: any, action: any) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: any) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state: any, action: any) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state: any, action: any) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  platform: "JWT",
  login: (...args: any[]) => Promise.resolve(),
  loginGoogle: (...args: any[]) => Promise.resolve(),
  logout: (...args: any[]) => Promise.resolve(),
  register: (...args: any[]) => Promise.resolve(),
});

export const AuthProvider = (props: any) => {
  const { data: session, status } = useSession();
  const { children } = props;
  const pathname = usePathname();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errorMessage, setErrorMessage] = useState<string>();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (session?.user?.error) logout(session.user?.error);
  }, [pathname]);

  // TODO Make a state context for message toasts
  useEffect(() => {
    if (error && error !== errorMessage) setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    if (errorMessage) toast.error(errorMessage);
  }, [errorMessage]);

  const initialize = async () => {
    try {
      const user = session?.user;
      if (user?.error) {
        logout(user?.error);
      }
      if (user) {
        window.localStorage.setItem("accessToken", user.accessToken);
        // reduxDispatch(getStoreByOwner());
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: "INITIALIZE",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };
  useEffect(() => {
    if (status !== "loading") initialize();
  }, [status]);

  const loginGoogle = async () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };
  const login = async (
    email: string,
    password: string,
    keepAlive: boolean = false
  ) => {
    await signIn("credentials", {
      username: email,
      password,
      redirect: false,
      keepAlive,
    });
  };

  const logout = async (error?: string) => {
    if (error)
      await signOut({ callbackUrl: `/authentication/register?error=${error}` });
    else await signOut();
    window.localStorage.removeItem("accessToken");
    dispatch({ type: "LOGOUT" });
  };

  const register = async (email: string, name: string, password: string) => {
    const user = await authApi.register({
      email,
      firstName: name,
      password,
    } as CreateUserDto);
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "JWT",
        login,
        logout,
        register,
        loginGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
