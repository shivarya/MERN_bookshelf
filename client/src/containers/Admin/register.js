import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Register extends Component {

    state = {
        name:'',
        lastname:'',
        email:'',
        password:'',
        error:''
    }

    handleInput = (e, name) => {
        this.setState({
            [name]: e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div className="rl_container">
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
                </form>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Register);