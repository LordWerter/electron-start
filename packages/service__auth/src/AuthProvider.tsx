import React from 'react';
import { useState, useEffect } from 'react';
import { AuthContext } from './context';
import authFetch, { fetchFunc } from './authFetch';
import login from './login';
import logout from './logout';
import checkExpiry from './checkExpiry';

export interface IAuthState {
	localStorageKey?: 'REACT_TOKEN_AUTH_KEY' | string;
	status?: 'pending' | 'error' | 'success' | 'loading';
	error?: {} | null;
	accessUrl?: string | null;
	refreshUrl?: string | null;
	accessToken?: string | null;
	refreshToken?: string | null;
	setStateFunc?: (newStateProps: INewStateProps) => void;
	authFetch?: typeof authFetch;
	logout?: typeof logout;
	login?: typeof login;
}

export interface ITokensObj {
	accessToken?: string | null;
	refreshToken?: string | null;
}

export interface INewStateProps extends IAuthState {}

export const AuthProvider: React.FC<any> = (props): JSX.Element => {
	const {
		localStorageKey = 'REACT_TOKEN_AUTH_KEY',
		SignInPage,
		children,
	} = props;
	const { accessUrl, refreshUrl } = props.network;
	const localStorageVal: string | null = localStorage.getItem(localStorageKey);
	const tokensObj: {
		accessToken: string | null;
		refreshToken: string | null;
	} = localStorageVal
		? JSON.parse(localStorageVal)
		: {
			accessToken: null,
			refreshToken: null,
		};

	const [state, setState] = useState<IAuthState>({
		localStorageKey,
		status: 'loading',
		error: null,
		accessUrl,
		refreshUrl,
		accessToken:
			tokensObj && tokensObj.accessToken ? tokensObj.accessToken : null,
		refreshToken:
			tokensObj && tokensObj.refreshToken ? tokensObj.refreshToken : null,
		setStateFunc: () => {
			return;
		},
		authFetch,
		login,
		logout,
	});

	const setStateFunc: IAuthState['setStateFunc'] = (
		newStateProps: IAuthState
	) => {
		setState({ ...state, ...newStateProps });
	};

	useEffect(() => {
		checkExpiry(tokensObj).then(async (tokensStatus) => {
			let status: any;
			if (tokensStatus.refreshToken === false) {
				status = 'pending';
				setStateFunc({
					setStateFunc,
					status,
				});
			} else if (tokensStatus.accessToken === false) {
				fetchFunc( state.refreshUrl, {
					method: 'POST',
					body: {
						refreshToken: state.refreshToken,
					},
				}).then((result) => {
					setStateFunc({
						...state,
						setStateFunc,
						status: 'success',
						accessToken: result.accessToken,
						refreshToken: result.refreshToken,
					});
					return result;
				}).catch((error) => {
					setStateFunc({
						setStateFunc,
						status: 'pending',
					});
					return error;
				});
			} else {
				status = 'success';
				await setStateFunc({
					setStateFunc,
					status,
				});
			}
		});
	}, []);

	return (
		<AuthContext.Provider value={state}>
			{state.status === 'pending' ? (
				<SignInPage login={login} />
			) : state.status === 'success' ? (
				children
			) : (
				<></>
			)}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
