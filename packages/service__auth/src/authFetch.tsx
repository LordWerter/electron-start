import logout from './logout';
import checkExpiry from './checkExpiry';

export const fetchFunc = (
	input: RequestInfo | null | undefined,
	init?: any,
	state?,
	authDispatch?: any
): Promise<any> => {

	if (!input) return Promise.resolve(new Error('Request URL is invalid'));
	init = init || {};

	let customHeaders: any = {};

	if (state) {
		customHeaders = {
			...init.headers,
			Authorization: `JWT ${state.accessToken}`,
		};
	}

	const headers = new Headers();
	if (state && init.method !== 'POST') {
		const headerNames = Object.keys(customHeaders);
		headerNames.length &&
			headerNames.forEach((headerName) =>
				headers.append(headerName, customHeaders[headerName])
			);
	} else {
		headers.append('Content-Type', 'application/json');
	}

	const body = init.body ? JSON.stringify(init.body) : undefined;

	const cunstructedBody = {
		method: init.method ? init.method : 'GET',
		headers: headers,
	}

	if (body) cunstructedBody['body'] = body;

	return fetch(input, cunstructedBody)
		.then((response: any) => response.json())
		.catch((error: any) => {
			return error;
	});
};

const authFetch = (input: RequestInfo, init?: RequestInit, state?: any ) => {
	return checkExpiry({
		accessToken: state.accessToken,
		refreshToken: state.refreshToken,
	}).then((expStatus) => {
		if (!expStatus.refreshToken) {
			return logout(state).then(() => {
				return Promise.resolve({});
			});
		}

		if (!expStatus.accessToken) {
			return fetchFunc(
				state.refreshUrl,
				{
					method: 'POST',
					body: {
						refreshToken: state.refreshToken && state.refreshToken,
					},
				},
				state
			).then((response) => {
				state.setStateFunc({
					status: 'success',
					accessToken: response.accessToken,
					refreshToken: response.refreshToken,
				});
				return fetchFunc(
					input,
					init,
					{
						...state,
						status: 'success',
						accessToken: response.accessToken,
						refreshToken: response.refreshToken,
					},
				);
			});
		}

		return fetchFunc( input, init, state );
	});
};

export default authFetch;
