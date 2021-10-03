const logout = async (state) => {
	state.localStorageKey && localStorage.removeItem(state.localStorageKey);
	await state.setStateFunc && state.setStateFunc({
		status: 'pending',
		accessToken: null,
		refreshToken: null,
	});
	return Promise.resolve({});
};

export default logout;
