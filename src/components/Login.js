import React from 'react';

export default class Login extends React.Component {
    state = {
        username: '',
        password: '',
        loggedIn: false,
    }

    onSubmit(e) {
        console.log('from Login form', this.state)
        e.preventDefault();
    }
    onChange(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} >
                    <input
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.onChange}

                    />
                    <input
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    <input type='submit' />
                </form>
            </div>
        );
    }
}
