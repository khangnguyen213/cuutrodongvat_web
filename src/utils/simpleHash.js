const hash = (data) => {
  const dataString = JSON.stringify(data);
  let hashedString = '';
  for (let i = 0; i < dataString.length; i++) {
    hashedString += dataString.charCodeAt(i).toString(16);
  }
  return hashedString;
};

const decode = (hash) => {
  let dataString = '';
  for (let i = 0; i < hash.length; i += 2) {
    dataString += String.fromCharCode(parseInt(hash.substr(i, 2), 16));
  }
  return JSON.parse(dataString);
};

export { hash, decode };
