import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
class RegisterForm extends Form {
    state = {
        data: { username: '', password: '', name: '' },
        errors: {}
    }
    schema = {
        username: Joi.string().email().required().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('name')
    };
    doSubmit = () => {
        // call the server for further data
        console.log('Submitted');
    };
    render() {
        return (
        <div>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('username','Username')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderInput('name','Name')}    
                {this.renderButton('Register')}
            </form>
        </div> );
    }
}
export default RegisterForm;