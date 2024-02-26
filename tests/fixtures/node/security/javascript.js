// eslint-disable-next-line no-unused-vars
const validateEmailFormat = (string) => {
  const emailExpression = /^([\w.-])+@(([\dA-Za-z-])+\.)+([\dA-Za-z]{2,4})+$/;

  return emailExpression.test(string);
};
