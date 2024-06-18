import moment from 'moment';

export const SET_FOO_SENDABLE = 'foo/SET_SENDABLE';
export const UPDATE_FOO = 'foo/UPDATE';
export const CREATE_FOO = 'foo/CREATE';
export const SUBMIT_FOO = 'foo/SUBMIT';
export const TOGGLE_COMPLETE_FOO = 'foo/TOGGLE_COMPLETE';

const initialState = {
  byId: {},
  allIds: [],
};

export const createFoo = (id, colour, size, speed) => {
  const createdAt = moment().utc().format();
  return {
    type: CREATE_FOO,
    payload: {
      id,
      colour,
      size,
      speed,
      createdAt,
    },
  };
};

export const toggleCompleteFoo = (id) => ({
  type: TOGGLE_COMPLETE_FOO,
  payload: {
    id,
  },
});

export const updateFooSendable = (id, sendable) => ({
  type: SET_FOO_SENDABLE,
  payload: {
    id,
    sendable,
  },
});

export const submitFoo = (id) => ({
  type: SUBMIT_FOO,
  payload: {
    id,
  },
})

export const markFooAsSubmitted = (id, sentAt) => ({
  type: UPDATE_FOO,
  payload: {
    sentAt,
  },
});


export const setError = (id, errorMessage) => ({
  type: UPDATE_FOO,
  payload: {
    id,
    errorMessage,
  },
});

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_FOO: {
      const { payload } = action;
      const { id, colour, size, speed, createdAt} = payload;
      return ({
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            id,
            colour,
            size,
            speed,
            createdAt,
            sendable: false,
            completedAt: null,
            submittedAt: null,
          }
        },
        allIds: Array.from(new Set([...state.allIds, id]))
      });
    }
    case TOGGLE_COMPLETE_FOO: {
      const { payload } = action;
      const { id } = payload;

      const foo = state.byId[id];
      const completedAt = moment().utc().format();

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...foo,
            completedAt: foo.completedAt ? null : completedAt,
          },
        },
      };
    }

    case SET_FOO_SENDABLE: {
      const { id, sendable } = action.payload;
      return {
        ...state,
        byId: {
          ...state,
          [id]: {
            sendable,
          },
        },
      };
    }

    case UPDATE_FOO: {
      const { id, payload } = action;

      return {
        byId: {
          ...state.byId,
          [id]: {
            ...payload,
          },
        },
      };
    }
    default: return state;
  }
}

// Selectors
export const getAllFoos = (state) => state.foo.allIds.map((id) => (
  state.foo.byId[id]
));
export const getFooById = (state, id) => state.foo.byId[id];
export const getSendableFooIds = (state) => state.foo.allIds.filter((id) => (
  state.byId[id].sendable
));