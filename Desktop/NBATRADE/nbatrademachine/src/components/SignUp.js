import React, {Component} from 'react';

class SignUp extends Component {
    render() { 
        return (  
            <div className="ui form container">
        <form className="ui form" onSubmit = {this.props.handleSignup} onChange ={this.props.handleOnChangeForm }> 
                <label for="name">Name:</label>
                <input className="signingUp" type = 'text' id = 'name'/><br></br>
                <label for="team"  >Favorite Team:</label>
                <select class="signingUp" className="ui selection dropdown">
                {this.props.teams.map(t => {
                    return <option id='team' value={t}>{t}</option>
                })}
                </select>
                <label for="password">Password:</label>
                <input className="signingUp" type = 'password' id ='password'/><br></br>
                <br></br>
                <button id="machineButtonGrid" className="ui button" type="submit" value="Submit">Submit</button>
        </form> 
        </div>
        );
    }
}
 
export default SignUp;