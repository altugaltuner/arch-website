export const authorization = (token) => {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};
