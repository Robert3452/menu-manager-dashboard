import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { I } from '@/utils/generalObj';
import { authApi } from '@/__fake-api__/auth-api';

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null
};

const handlers: I
    = {
    INITIALIZE: (state: any, action: any) => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user
        };
    },
    LOGIN: (state: any, action: any) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
    LOGOUT: (state: any) => ({
        ...state,
        isAuthenticated: false,
        user: null
    }),
    REGISTER: (state: any, action: any) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    }
};

const reducer = (state: any, action: any) => (handlers[action.type]
    ? handlers[action.type](state, action)
    : state);

export const AuthContext = createContext({
    ...initialState,
    platform: 'JWT',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve()
});

export const AuthProvider = (props: any) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const initialize = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');

                if (accessToken) {
                    const user = await authApi.me(accessToken);

                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        };

        initialize();
    }, []);

    const login = async (email: string, password: string) => {
        const accessToken = await authApi.login({ email, password });
        const user = await authApi.me(accessToken);

        localStorage.setItem('accessToken', `${accessToken}`);

        dispatch({
            type: 'LOGIN',
            payload: {
                user
            }
        });
    };

    const logout = async () => {
        localStorage.removeItem('accessToken');
        dispatch({ type: 'LOGOUT' });
    };

    const register = async (email: string, name: string, password: string) => {
        const accessToken = await authApi.register({ email, name, password });
        const user = await authApi.me(accessToken);

        localStorage.setItem('accessToken', `${accessToken}`);

        dispatch({
            type: 'REGISTER',
            payload: {
                user
            }
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                platform: 'JWT',
                login,
                logout,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
