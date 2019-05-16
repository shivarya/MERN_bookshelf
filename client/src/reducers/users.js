export default function(state = {}, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        login:action.payload
      };
    case "USER_AUTH":
      return {
        ...state,
        login:action.payload
      };
    case "GET_REVIEWER":
      return {
        ...state,
        reviewer: action.payload
      };
    case "GET_REVIEW":
      return {
        ...state,
        reviews: action.payload
      };

    default:
      return state;
  }
}