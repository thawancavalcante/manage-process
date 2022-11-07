export const parseJwt = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    if (Date.now() >= decoded.exp * 1000) {
      return null;
    }
    return decoded;
  } catch (e) {
    return null;
  }
};
