import React, { Component } from 'react';
import {connect} from 'react-redux'
import { getUserBooks } from '../../actions';
import { Link } from 'react-router-dom'
import moment from 'moment-js'

class userPosts extends Component {

    componentWillMount(){
        this.props.dispatch(getUserBooks(this.props.user.login.id))
    }

    showUserPosts = (user) => {
        return user.reviews ?
            user.reviews.map((item,i) => (
                <tr key={i}>
                    <td>
                        <Link to={`/user/edit-post/${item._id}`}>
                        {item.name}
                        </Link>
                    </td>
                    <td>{item.author}</td>
                    <td>{moment(item.createdAt).format('DD/MM/YY')}</td>
                </tr>
            ))
            : null
    }

    render() {
        let user = this.props.user;
        return (
            <div className='user_posts'>
                <h4>Your Reviews</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserPosts(user)}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(userPosts)