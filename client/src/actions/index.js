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

export function getReviewer(ownerId){
    const request = axios.get(`/api/user/getReviewers?id=${ownerId}`)
    .then(({data}) => data);

    return {
        type: 'GET_REVIEWER',
        payload: request
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