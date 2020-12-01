import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {}
    }
    schema = {
        username: Joi.string().required().min(5).label('Username'),
        password: Joi.string().required().label('Password')
    };
    doSubmit = () => {
        // call the server for further data
        console.log('Submitted');
    };
    render() {

        return (
        <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('username','Username')}
                {this.renderInput('password','Password','password')}
                {this.renderButton('Login')}
            </form>
        </div> );
    }
}
export default LoginForm;