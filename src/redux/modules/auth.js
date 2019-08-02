// Actions
const ADD_POST = 'post/ADD_POST';

// Action Creators
export const addPost = post => ({ type: ADD_POST, post });

const initialState = {
  user_id: '',
  token: '',
  posts: []
};

export default function post(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.push(action.post),
      };

    default:
      return state;
  }
}
