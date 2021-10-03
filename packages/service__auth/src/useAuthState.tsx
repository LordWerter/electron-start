import { useContext, Dispatch, SetStateAction } from 'react';
import { IAuthState } from './AuthProvider';
import {AuthContext} from './context';

export type ISetStateFunc = Dispatch<SetStateAction<boolean>>;

export interface IFullAuthState extends IAuthState {
	isPending: boolean;
	isError: boolean;
	isSuccess: boolean;
	isLogged: boolean;
	setIsPending: ISetStateFunc;
	setIsError: ISetStateFunc;
	setIsSuccess: ISetStateFunc;
	setIsLogged: ISetStateFunc;
}

const useAuthState = (): IFullAuthState => {
	const state: any = useContext(AuthContext);
	const isPending = state.status === 'pending';
	const isError = state.status === 'error';
	const isSuccess = state.status === 'success';

	return {
		...state,
		isPending,
		isError,
		isSuccess,
	};
};

export default useAuthState;
