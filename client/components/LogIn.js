import axios from 'axios';
import React, {Component} from 'react';

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

    const newUser = await axios.post('/api/login', this.state)
    console.log(newUser);
    this.setState({
    userName: '',
    password: ''
    })
  }

  render(){
    const {handleChange, handleSubmit} = this;
    return (
      <>
        <h2>
          Log In Page
        </h2>
        <form onSubmit = {handleSubmit}>
          <label>User Name:</label>
          <input name ="userName" onChange = {handleChange} value = {this.state.userName} />

          <label>Password:</label>
          <input name ="password" onChange = {handleChange} value = {this.state.password} />

          <button type ="submit">Log In</button>

        </form>
      </>

    )
  }

}

export default LogIn