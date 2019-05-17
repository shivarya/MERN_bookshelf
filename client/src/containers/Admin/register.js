import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, addUser } from '../../actions';

class Register extends Component {

    state = {
        name:'',
        lastname:'',
        email:'',
        password:'',
        error:''
    }

    componentWillMount(){
        this.props.dispatch(getUsers());
    }

    handleInput = (e, name) => {
        this.setState({
            [name]: e.target.value
        })
    }

    showUsers = (users) => {
        return users.map((item,i) => (
            <tr key={i}>
                <td>{item.name}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
            </tr>
        ))
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({error:''})
        this.props.dispatch(addUser(this.state,this.props.user.users))
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.success === false){
            this.setState({error:'Error'})
        }else{
            this.setState({
                name: '',
                lastname: '',
                email: '',
                password: '',
                error: '' 
            })
        }
    }

    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                {this.state.error}
                <form onSubmit={this.submitForm}>
                    <h2>Add User</h2>
                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="Enter Name"
                            value={this.state.name}
                            onChange={e => this.handleInput(e, 'name')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="Enter Last Name"
                            value={this.state.lastname}
                            onChange={e => this.handleInput(e, 'lastname')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={e => this.handleInput(e, 'email')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={e => this.handleInput(e, 'password')}
                        />
                    </div>

                    <button type="submit">Add Admin</button>
                </form>

                <div className="current_users">
                    <h4>Current Users:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.users ?
                                    this.showUsers(user.users)
                                    : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(
    mapStateToProps,
)(Register);