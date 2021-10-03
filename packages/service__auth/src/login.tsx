const login = (state: any, body: any, callback?: any) => {

	const headers = new Headers();

	headers.append('Content-Type', 'application/json');

	const raw = JSON.stringify(body);

	return fetch(state.accessUrl, {
		method: 'POST',
		headers: headers,
		body: raw,
		redirect: 'follow',
	})
		.then((response: any) => response.json())
		.then((response: any) => {
			if (!response.hasOwnProperty('code')) {
				state.setStateFunc({
					status: 'success',
					accessToken: response.auth.accessToken,
					refreshToken: response.auth.refreshToken,
					user: response.user,
				});

				localStorage.setItem(
					state.localStorageKey,
					JSON.stringify({
						accessToken: response.auth.accessToken,
						refreshToken: response.auth.refreshToken,
					})
				);

				callback && callback(response);
				return {
					accessToken: response.auth.accessToken,
					refreshToken: response.auth.refreshToken,
				};
			} else {
				return response;
			}
		})
		.catch((error: any) => {
			callback && callback(error);
			return error;
		});
};

export default login;
