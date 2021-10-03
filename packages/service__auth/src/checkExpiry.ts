export const jwtExp = (token?: any): number | null => {
	if (!(typeof token === 'string')) {
		return null;
	}

	const split = token.split('.');

	if (split.length < 2) {
		return null;
	}

	try {
		const jwt = JSON.parse(atob(split[1]));
		if (jwt && jwt.exp && Number.isFinite(jwt.exp)) {
			return jwt.exp;
		} else {
			return null;
		}
	} catch (e) {
		return null;
	}
};

export const getExpire = (token: string | null) => {
	if (!token) {
		return null;
	}

	const exp = jwtExp(token);
	if (exp) {
		return exp;
	}

	return null;
};

export const isExpired = (exp?: any): boolean => {
	if (!exp) {
		return false;
    }

	return Date.now() / 1000 < exp ? true : false;
};

export const checkExpiry = async (tokens: {
	accessToken: string | null;
	refreshToken: string | null;
}) => {
	return {
		accessToken: isExpired(getExpire(tokens.accessToken)),
		refreshToken: isExpired(getExpire(tokens.refreshToken)),
	};
};

export default checkExpiry;
