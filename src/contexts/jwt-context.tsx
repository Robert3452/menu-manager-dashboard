import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { I } from "@/utils/generalObj";
// import { authApi } from "@/__fake-api__/auth-api";

import { SessionProvider, signIn, useSession, signOut } from "next-auth/react";
import { authApi, CreateUserDto } from "@/api/auth/auth-api";
const initialState = {
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
  logout: (...args: any[]) => Promise.resolve(),
  register: (...args: any[]) => Promise.resolve(),
});

export const AuthProvider = (props: any) => {
  const { data: session } = useSession();
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "INITIALIZE",
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  }, []);
  useEffect(() => {
    const initialize = async () => {
      try {
        console.log(session);
        const user = session?.user;
        if (user) {
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
    if (session) initialize();
  }, [session]);

  const login = async (email: string, password: string) => {
    const signinResponse = await signIn("credentials", {
      username: email,
      password,
      redirect: false,
    });
  };

  const logout = async () => {
    await signOut();
    dispatch({ type: "LOGOUT" });
  };

  const register = async (email: string, name: string, password: string) => {
    const user = await authApi.register({
      email,
      firstName: name,
      password,
    } as CreateUserDto);
    // const user = await authApi.me(accessToken);

    // localStorage.setItem("accessToken", `${accessToken}`);

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
