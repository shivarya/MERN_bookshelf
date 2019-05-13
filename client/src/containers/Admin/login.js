import React, { Component } from "react";
import { connect } from 'react-redux';
import { loginUser } from "../../actions";

class Login extends Component {

    state = {
        email:'',
        password:'',
        error:'',
        success:false
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
    }

    //on reciving new props
    componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){
            this.props.history.push('/user')
        }
    }

    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Log in here</h2>

                    <div className="form_elememt">
                        <input 
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInput}
                        />
                    </div>

                    <div className="form_elememt">
                        <input 
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={this.handleInput}
                        />
                    </div>

                    <button type="submit">Log in</button>
                    <div className="error">
                    {
                        user.login && !user.login.isAuth ? 
                        <div>{user.login.msg}</div>
                        :null
                    }
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Login)
