export const generateRandomNumber = () => {
  return Math.floor(Math.random() * 123) + 1;
};

export const generateRandomID = () => {
  return Math.random().toString(36).substring(2, 9);
};
