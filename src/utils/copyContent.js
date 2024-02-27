export const copyContent = async (content) => {
  try {
    await navigator.clipboard.writeText(content);
    console.log('Copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
