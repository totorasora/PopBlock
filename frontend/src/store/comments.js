import jwtFetch from "./jwt";


export const RECEIVE_REVIEWS = "comments/receive"
export const RECEIVE_REVIEW = "comment/receive"
export const REMOVE_REVIEW = "comment/remove"
// export const CLEAR_REVIEWS = "reviews/clear"

const receiveComments = (comments) => (
    {
        type: RECEIVE_COMMENTS,
        comments
    }
);

const receiveComment = (Comment) => (
    {
        type: RECEIVE_Comment,
        Comment
    }
);

const removeComment = (payload) => (
    {
        type: REMOVE_Comment,
        payload
    }
);

// const clearComments = () => (
//     {
//         type: CLEAR_COMMENTS
//     }
// );

export const getComments = (state) => (
    state.comments ? Object.values(state.comments) : []
)

export const getComment = (commentId) => (state) => (
    state.comments ? state.comments[commentId] : null
)


export const fetchComments = id => async dispatch => {
    try {
        const res = await jwtFetch(`/api/${id}`);
        const comments = await res.json();
        dispatch(receiveComments(comments));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors))
        }
    }
}

export const createComment = (commentData) => async dispatch => {
    try {
        const res = await jwtFetch('/api/tweets/', {
            method: 'POST',
            body: JSON.stringify(commentData)
        });
        const comment = await res.json();
        dispatch(receiveComment(comment));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const updateComment = (commentData) => async dispatch => {
    try {
        const res = await jwtFetch('/api/tweets/', {
            method: 'PATCH',
            body: JSON.stringify(commentData)
        });
        const comment = await res.json();
        dispatch(receiveComment(comment));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const deleteComment = (commentId) => async dispatch => {
    const response = await jwtFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(removeComment(commentId))
    }
}

export default function commentsReducer(oldState = {}, action) {
    switch (action.type) {
        case RECEIVE_POST:
            return action.comments
        case RECEIVE_CURRENT_USER_REVIEWS:
            return action.payload.comments
        case RECEIVE_COMMENT:
            return {...oldState, [action.comment.id] : action.comment}
        case REMOVE_COMMENT:
            let newState = {...oldState}
            delete newState[action.payload]
            return newState
        // case CLEAR_COMMENTS:
        //     return {};
        default:
            return oldState;
    }
}