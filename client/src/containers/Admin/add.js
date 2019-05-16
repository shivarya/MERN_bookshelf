import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { addBook, clearNewBook } from '../../actions';

class AddBook extends Component {

    state= {
        formdata : {
            name:'',
            author:'',
            review:'',
            pages:'',
            rating:'',
            price:''
        }
    }

    handleInput = (e,name) => {
        let newFormdata = {...this.state.formdata};
        newFormdata[name] = e.target.value;
        this.setState({
            formdata: newFormdata
        })
    }

    showNewBooks = (book) => (
        book.post ?
            <div className='cnf_link'>
                Cool!! <Link to={`/books/${book.bookId}`}>
                    See new Book
                </Link>
            </div>
            : null
    )
    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(addBook({
            ...this.state.formdata,
            ownerId: this.props.user.login.id
        }))
    }

    componentWillUnmount(){
        this.props.dispatch(clearNewBook())
    }

    render() {
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add a Book</h2>
                    <div className="form_element">
                        <input 
                            type='text'
                            placeholder= "Enter Name"
                            value={this.state.formdata.name}
                            onChange={e => this.handleInput(e,'name')}
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

                    <button type="submit">Add Review</button>

                    {
                        this.props.books.newbook ?
                        this.showNewBooks(this.props.books.newbook)
                        : null
                    }
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


export default connect(mapStateToProps)(AddBook);