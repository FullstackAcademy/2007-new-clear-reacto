import React, {Component} from 'react';
import {loginUser} from '../redux/user'
// import {getCartItems}
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

class LogIn extends Component{
  constructor() {
    super()
    this.state = {
      userName: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  async handleSubmit(ev){
    ev.preventDefault()
    await this.props.loginUser(this.state)
    await this.setState({
    userName: '',
    password: ''
    })
    this.props.history.push('/books')
  }

  render(){
    const {handleChange, handleSubmit} = this;
    return (
      <>
        <h2>
          Log In Page
        </h2>
        <form onSubmit = {handleSubmit} id = "logInForm">
          <label>User Name:</label>
          <input name ="userName" className = "logInInput" onChange = {handleChange} value = {this.state.userName} />

          <label>Password:</label>
          <input name ="password" type="password" className = "logInInput" onChange = {handleChange} value = {this.state.password} />

          <button type ="submit" id = "logInButton" >Log In</button>

        </form>
      </>

    )
  }

}

export default connect(
  ({user}) => {return {
      user: user.user
    }
  },
  (dispatch) => {
    return {
    loginUser: (credentials) => dispatch(loginUser(credentials))
    // getCartItems: (id) => dispatch(getCartItems(id))
  }
}
)(LogIn)
