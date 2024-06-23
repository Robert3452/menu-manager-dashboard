import { authApi, CreateUserDto } from "@/api/auth/auth-api";
import { I } from "@/utils/generalObj";
import { signIn, signOut, useSession } from "next-auth/react";
import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
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
  loginGoogle: (...args: any[]) => Promise.resolve(),
  logout: (...args: any[]) => Promise.resolve(),
  register: (...args: any[]) => Promise.resolve(),
  // registerGoogle: (...args: any[]) => Promise.resolve(),
});

export const AuthProvider = (props: any) => {
  const { data: session } = useSession();
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialize = async () => {
    try {
      const user = session?.user;
      if (user) {
        window.localStorage.setItem("accessToken", user.accessToken);
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
    initialize();
  }, []);
  useEffect(() => {
    initialize();
  }, [session]);

  const loginGoogle = async () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };
  const login = async (email: string, password: string) => {
    await signIn("credentials", {
      username: email,
      password,
      redirect: false,
    });
  };

  const logout = async () => {
    await signOut();
    window.localStorage.removeItem("accessToken");
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
