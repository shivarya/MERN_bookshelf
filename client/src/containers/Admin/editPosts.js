import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { clearNewBook, getBookWithReviewer, editBook, deleteBook } from '../../actions';

class EditBook extends Component {

    state = {
        formdata: {
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: '',
            price: ''
        }
    }

    handleInput = (e, name) => {
        let newFormdata = { ...this.state.formdata };
        newFormdata[name] = e.target.value;
        this.setState({
            formdata: newFormdata
        })
    }

    showNewBooks = (book) => (
        book.success ?
        <div className='edit_confirm'>
            Updated!! <Link to={`/books/${book.book._id}`}>
                See edited Book
            </Link>
        </div>
        : null
    )


    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(editBook({
            ...this.state.formdata,
            ownerId: this.props.user.login.id,
            _id: this.props.match.params.bookId
        }))
    }

    componentWillMount(){
        const bookId = this.props.match.params.bookId;
        this.props.dispatch(getBookWithReviewer(bookId))
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.books.delete){
            console.log(nextProps.books.delete)
            this.props.history.push('/user/user-reviews')
        }else if (nextProps.books.book && !nextProps.books.newbook){
            let bookData = {...nextProps.books.book};
            this.setState({
                formdata:bookData
            })
        }        
    }

    componentWillUnmount() {
        this.props.dispatch(clearNewBook())
    }

    deleteBook = (e,bookId) => {
        this.props.dispatch(deleteBook(bookId))
    }

    render() {
        return (
            <div className="rl_container article">
                {
                    this.props.books.newbook ?
                    this.showNewBooks(this.props.books.newbook)
                    : null
                }
                <form onSubmit={this.submitForm}>
                    <h2>Edit a Book</h2>
                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="Enter Name"
                            value={this.state.formdata.name}
                            onChange={e => this.handleInput(e, 'name')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="Enter Author"
                            value={this.state.formdata.author}
                            onChange={e => this.handleInput(e, 'author')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="Enter Review"
                            value={this.state.formdata.review}
                            onChange={e => this.handleInput(e, 'review')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="Enter Pages"
                            value={this.state.formdata.pages}
                            onChange={e => this.handleInput(e, 'pages')}
                        />
                    </div>

                    <div className="form_element">
                        <select value={this.state.formdata.rating}
                            onChange={e => this.handleInput(e, 'rating')}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="Enter Price"
                            value={this.state.formdata.price}
                            onChange={e => this.handleInput(e, 'price')}
                        />
                    </div>

                    <button type="submit">Edit Review</button>
                    <div onClick={(e) => this.deleteBook(e, this.props.match.params.bookId)} className="delete_post">
                        <div className='button' >
                            Delete Book
                        </div>
                    </div>                    
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}


export default connect(mapStateToProps)(EditBook);