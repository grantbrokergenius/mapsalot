
const authWithUser = (func) => ({ session }, ...args) => session && session.user && func(session.user, ...args);

const auth = (func) => authWithUser((_, ...args) => func(...args));


export { auth, authWithUser };
