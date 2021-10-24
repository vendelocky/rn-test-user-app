import pageName from "../constants/pageName";
import type from "../constants/type";

const Reducer = (state = {
  status: type.ISNOTLOGGEDIN,
  initialPage: pageName.authenticator,
}, action) => {
  switch (action.type) {
    case type.ISLOGGEDIN:
      return Object.assign({}, state, {
        status: type.ISLOGGEDIN,
        initialPage: pageName.userList,
      });
    case type.ISNOTLOGGEDIN:
      return Object.assign({}, state, {
        status: type.ISNOTLOGGEDIN,
        initialPage: pageName.authenticator,
      });
    default:
      return state;
  }
};

export default Reducer;
