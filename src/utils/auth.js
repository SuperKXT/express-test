const validToken = 'Bearer SkFabTZibXE1aE14ckpQUUxHc2dnQ2RzdlFRTTM2NFE2cGI4d3RQNjZmdEFITmdBQkE=';

/** @type {(req: import('express').Request) => void} */
export const assertAuth = (req) => {
	const token = req.headers.authorization;
	if (token !== validToken) throw new Error('missing or invalid bearer token');
};
