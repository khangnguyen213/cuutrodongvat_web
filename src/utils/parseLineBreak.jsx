export const parseLineBreak = (text) => {
  return text.split('\n').map((str, index) => <p key={index}>{str}</p>);
};
