import React, { Component } from 'react'
import NavBar from './components/NavBar'
import TradeList from './components/TradeList'
import UserProfile from './containers/UserProfile'
import MachineCard from './components/MachineCard'
import LoginForm from './components/LoginForm'
import FireUpMachine from './containers/FireUpMachine'
import SignUp from './components/SignUp'
import {Route, Switch, Redirect} from 'react-router-dom'
import {Sidebar} from 'semantic-ui-react'

class App extends Component {
  state = {
    players: [],
    teams: [],
    trades: [],
    users: [],
    added: [],
    votes: [],
    trading: true,
    look_at_trades: false,
    currentUser: null,
    team: "Atlanta Hawks",
    password: null,
    notValid: false,
    visibleMenu: false
  }

  componentDidMount(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    let lastMonth = yyyy + '-' + parseInt(mm) - 1 + '-' + dd
    // let lastMonth = parseInt(mm) > 1 ? yyyy + '-' + parseInt(mm) - 1 + '-' + dd : parseInt(yyyy) - 1 + '-' + "12" + '-' + dd
    fetch("https://nbatrademachine-app.herokuapp.com/players")
    .then(r=>r.json())
    .then(players=>this.setState({
      players
    }))
    fetch("https://nbatrademachine-app.herokuapp.com/teams")
    .then(r=>r.json())
    .then(teams=>this.setState({
      teams
    }))
    fetch("https://nbatrademachine-app.herokuapp.com/trades")
    .then(r=>r.json())
    .then(trades=>this.setState({
      trades
    }))
    fetch("https://nbatrademachine-app.herokuapp.com/users")
    .then(r=>r.json())
    .then(users=>this.setState({
      users
    }))
    fetch("https://nbatrademachine-app.herokuapp.com/votes")
    .then(r=>r.json())
    .then(votes=>this.setState({
      votes
    }))
    .catch((error) => {
    alert(error)
    })
  }

     handleOnChangeForm = (event)=>{
      
      let stateKey = event.target.id.length > 0 ? event.target.id : 'team'
      let formValue = event.target.value
      this.setState({
          [stateKey]: formValue
      })

     }

    handleSignupForm = (e)=>{
      e.preventDefault()
      let newUser = {name: this.state.name, team: this.state.team, password: this.state.password}
      fetch('https://nbatrademachine-app.herokuapp.com/users',{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      })
      .then(resp => resp.json())
      .then(r =>{
        this.state.users.push(r)
          this.setState({
            users: this.state.users,
            currentUser: r,
            password: null
          })
      })
    }

  loginSubmit = (user) =>{
    this.setState({
      currentUser: user
    })
  }

  fireUpTradeMachine = ()=>{
    this.setState({
      trading: true}
    )
  }

  addedNewTrade = (trade)=>{
    this.state.trades.push(trade)
    this.setState({
      trades: this.state.trades
    })
  }

  currentUserTrades = ()=>{
    this.state.trades.filter(t => t.user_id === this.state.currentUser.id)
  }

  addVote = (vote)=>{
    this.state.votes.push(vote)
    this.setState({
      votes: this.state.votes
    })
  }

  removeTrade =(id)=>{
    
    this.setState({
      trades: this.state.trades.filter(t => t.id !== id)
    })
  }

  showMenu = ()=>{
    
    if (this.state.visbileMenu === true)
    return this.setState({visibleMenu: false})
    else 
    return this.setState({visibleMenu: true})
  }


  render(){
    let currentUserArray = new Array(this.state.currentUser)
    let teamNames = this.state.teams.map(t=> t.name)
  return (
    <div className="App" style={{height: '100%'}}>
    {this.state.currentUser ? <NavBar visibleMenu={this.state.visibleMenu}/> : null}
    <Sidebar.Pusher>
    <Switch>
    <Route path="/user/:id" render={(props) => {
      
           let id = parseInt(props.match.params.id)
              return this.state.currentUser.id === id ? <Redirect to="/profile"/> : <UserProfile
              currentUser={this.state.currentUser} addVote={this.addVote} votes={this.state.votes} user={this.state.users.filter(u=> u.id === id)} trades={this.state.trades.filter(t => t.user_id === id)} all_users={this.state.users} all_teams={this.state.teams} all_players={this.state.players}/>
            }} />
    <Route exact path="/profile" render={() => {
      return this.state.currentUser ? <UserProfile removeTrade={this.removeTrade} votes={this.state.votes} currentUser={this.state.currentUser} trades={this.state.trades.filter(t => t.user_id === this.state.currentUser.id)} all_users={this.state.users} user={currentUserArray} all_teams={this.state.teams} all_players={this.state.players}/> : <Redirect to="/login"/>}}/>
    <Route exact path="/" render={() => {
    return this.state.currentUser ? <Redirect to="/wannatrade"/> : <LoginForm loginSubmit={this.loginSubmit}/>}}/>
    <Route exact path="/wannatrade" render={() => <FireUpMachine lookAtTrades={this.lookAtTrades} all_users={this.state.users} trades={this.state.trades} all_players={this.state.players} all_teams={this.state.teams}/>}/>
    <Route exact path="/machine" render={()=> 
    <MachineCard addedNewTrade ={this.addedNewTrade} players={this.state.players} teams={this.state.teams} notValid={this.state.notValid} currentUser={this.state.currentUser}/>}/>
    <Route exact path="/trades" render={()=>
    <TradeList removeTrade={this.removeTrade} addVote={this.addVote} votes={this.state.votes} all_users={this.state.users} trades={this.state.trades} all_players={this.state.players} all_teams={this.state.teams} currentUser={this.state.currentUser}/>}/>
    <Route exact path="/login" render={() => {
    return this.state.currentUser ? <Redirect to="/wannatrade"/> : <LoginForm loginSubmit={this.loginSubmit}/>}}/>
    <Route exact path="/signup" render={() => {
      return this.state.currentUser? <Redirect to="/wannatrade"/> : <SignUp teams={teamNames} handleSignup={this.handleSignupForm} handleOnChangeForm={this.handleOnChangeForm}/>}}/>
    </Switch>
    </Sidebar.Pusher>
    </div>
  )
  }
}

export default App;
