// eslint-disable-next-line import/no-anonymous-default-export
export default (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        userToken: action.token,
        user:action.user
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        userToken: null
      };
    default:
      return { ...prevState };
  }
};
