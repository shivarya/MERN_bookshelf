import axios from "axios";


export function getBooks(limit=10,start=0,order='asc', list = []){
    const request = axios.get(`/api/book/books?limit=${limit}&skip=${start}&order=${order}`)
    .then(res => {
        return [...list,...res.data]
    })

    return {
        type: 'GET_BOOKS',
        payload: request
    }
}

export function getBookWithReviewer(id){
    const request = axios.get(`/api/book?id=${id}`)
    
    //redux thunk
    return (dispatch) => {
        request.then( ({data}) => {
            let book = data;
            const reviewer_request = getReviewer(book.ownerId).payload;
            reviewer_request.then(reviewer => {
                let response = {
                    book,
                    reviewer:reviewer
                }
                dispatch({
                    type:'GET_BOOK_W_REVIEWER',
                    payload:response
                })
            })
        })
    }
}

export function clearBookWithReviewer(){
    return {
        type:'CLEAR_BOOK_W_REVIEWER',
        payload:{
            book : {},
            reviewer:{}
        }
    }
}

export function addBook(book_data){
    const req = axios.post(`/api/book`, book_data)
                .then(res => res.data)
    return {
        type: 'ADD_BOOK',
        payload: req
    }
}

export function editBook(book_data) {
    const req = axios.put(`/api/book`, book_data)
        .then(res => res.data)
    return {
        type: 'EDIT_BOOK',
        payload: req
    }
}

export function deleteBook(bookId) {
    const req = axios.delete(`/api/book?id=${bookId}`)
        .then(res => res.data)
    return {
        type: 'DELETE_BOOK',
        payload: req
    }
}

export function clearNewBook(){
    return {
        type: 'CLEAR_NEW_BOOK',
        payload: null
    }
}

/*=========================USER=======================*/

export function loginUser({email,password}){

    let req = axios.post(`/api/user/login`,{email,password})
                .then(res => res.data)
    return {
        type: 'USER_LOGIN',
        payload:req
    }
}

export function auth(){
    let req = axios.get(`/api/auth`)
                .then(res => res.data)
    return {
        type: 'USER_AUTH',
        payload:req
    }
}

export function getReviewer(ownerId) {
    const request = axios.get(`/api/user/getReviewers?id=${ownerId}`)
        .then(({ data }) => data);

    return {
        type: 'GET_REVIEWER',
        payload: request
    }
}

export function getUserBooks(userId){
    const request = axios.get(`/api/book/reviewer?user=${userId}`)
        .then(({ data }) => data);

    return {
        type: 'GET_REVIEW',
        payload: request
    }
}

export function getUsers(){
    const request = axios.get(`/api/user/users`)
        .then(({ data }) => data);

    return {
        type: 'GET_USERS',
        payload: request
    }
}

export function addUser(user,userList){
    const req = axios.post(`/api/user/register`,user)

    return (dispatch) => {
        req.then(({data}) => {
            let res = {
                success: data.success,
                users:data.success ? [...userList,data.user] : [...userList]
            }

            dispatch({
                type: 'ADD_USER',
                payload: res
            })
        })
    }
}