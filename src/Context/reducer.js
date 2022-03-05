let user = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).userDetails
  : '';
let token = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).token
  : '';

export const initialState = {
  userDetails: '' || user,
  token: '' || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      };
    case 'REQUEST_REGISTER':
      return {
        ...initialState,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        userDetails: {
          user: action.payload.user,
          email: action.payload.email,
          role: action.payload.role,
          myRestaurant: parseInt(action.payload.restaurantId) || 0,
        },
        token: action.payload.token,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        userDetails: '',
        token: '',
      };

    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error.message,
      };
    case 'REGISTER_ERROR':
      return {
        ...initialState,
        loading: false,
        // errorMessage: action.error,
        errorMessage: 'action.error',
      };
    case 'ADD_DETAILS':
      return {
        ...initialState,
        userDetails: {
          ...initialState.userDetails,
          myRestaurant: action.payload,
        },
        loading: false,
      };
    case 'REMOVE_DETAILS':
      return {
        ...initialState,
        userDetails: {
          ...initialState.userDetails,
          myRestaurant: 0,
        },
        loading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
