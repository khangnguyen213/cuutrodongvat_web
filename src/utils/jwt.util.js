export const jwt = {
  createToken: async (data) => {
    const simpleToken = JSON.stringify(data).split('').reverse().join('');
    return simpleToken;
  },

  verifyToken: (token) => {
    if (token === 'null') return null;
    const payload = JSON.parse(token.split('').reverse().join(''));
    return payload;
  },
};
