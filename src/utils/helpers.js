export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const generateShortcode = () =>
  Math.random().toString(36).substring(2, 7);

export const getGeoLocation = async () => {
  return 'India'; // dummy for this project
};