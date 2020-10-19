import React, { Component } from 'react'
import TradeCard from '../containers/TradeCard'
import { Dropdown } from 'semantic-ui-react'

class TradeList extends Component {
    state = {
        trades: this.props.trades,
        players: this.props.all_players,
        teams: this.props.all_teams,
        value: [],
        sort: 'none'
    }

    removeTrade =(id)=>{
    let arra = this.state.trades.filter(t => t.id !== id)
    this.setState({
      trades: arra
    })
    this.props.removeTrade(id)
  }

    findTeam = (id) => {
        let teamid = parseInt(id)
        this.props.all_teams.filter(team => team.id === teamid)
    }

    findPlayer = (id) => {
        let playerid = parseInt(id)
        this.props.all_players.filter(player => player.id === playerid)
    }

    findUser = (userid) => {
        this.props.all_users.filter(u => u.id === userid)
    }

    findTeamByName  = (name) => {
        let team = this.state.teams.filter(t => t.name === name)
        return team[0]
    }

    filterTradesByTeams = (array) => {
        //refactor
        let a1 = array.length > 0 ? this.props.trades.map(t=>t.swaps.map(s=> s.team_id).includes(this.findTeamByName(array[0]).id) ?  t : null).filter(t=>t != null).filter(t=>t != null) : null
        let a2 = array.length > 1 ? a1.map(t=>t.swaps.map(s=> s.team_id).includes(this.findTeamByName(array[1]).id) ?  t : null).filter(t=>t != null).filter(t=>t != null) : null
        let a3 = array.length > 2 ? a2.map(t=>t.swaps.map(s=> s.team_id).includes(this.findTeamByName(array[2]).id) ?  t : null).filter(t=>t != null).filter(t=>t != null) : null
        let a4 = array.length > 3 ? a3.map(t=>t.swaps.map(s=> s.team_id).includes(this.findTeamByName(array[3]).id) ?  t : null).filter(t=>t != null).filter(t=>t != null) : null
        if (array.length === 1)
        return a1
        else if (array.length === 2)
        return a2
        else if (array.length === 3)
        return a3
        else if (array.length === 4)
        return a4
        else
        return this.props.trades
    }

    deleteFilter = (event) => {
        let arr2 = this.state.value.filter(t => t !== event.target.parentElement.innerText)
        let teamNames = arr2.length > 0 ? arr2 : []
        this.setState({
            value: arr2,
            trades: this.filterTradesByTeams(teamNames)

        })
    }

    onFilterChange = (event) => {
        let teamName = event.target.innerText
        let arr = teamName !== "" && event.target.className !== "delete icon" ? this.state.value.push(teamName) : this.state.value
        event.target.className === "delete icon"
        ?
        this.deleteFilter(event)
        :
        this.setState({
            value: this.state.value,
            trades: this.filterTradesByTeams(this.state.value)
        })
    }

    handleSort(sort){
        this.setState({
            sort
        })
    }


    getVotes(trade){
       let arr = this.props.votes.filter(v=>v.trade_id === trade.id)
       return arr.length
    }

    getSorted(){
        let value = this.state.sort
        if (value === 'none')
        return this.state.trades
        else if (value === 'new')
        return this.state.trades.sort((trade1, trade2) => trade1.created_at > trade2.created_at ? -1 : 1)
        else
        return this.state.trades.sort((trade1, trade2) => this.getVotes(trade1) > this.getVotes(trade2) ? -1 : 1)
    }

    render(){
        const options= this.state.teams.map(t => {
          const teams ={}
          teams.value = t.name
          teams.text = t.name
          return teams })
        const sortedTrades = this.getSorted()
        const swapped = sortedTrades.map(t => t.swaps)
        const tradeUsers = this.state.trades.map(t => t.user_id)
        const tradeIds = this.state.trades.map(t => t) 
        const groupToPlayers = swapped.map(swap => swap.reduce(function (obj, item) {
        obj[item.team_id] = obj[item.team_id] || [];
        obj[item.team_id].push(item.player_id);
        return obj;
            }, {}))
            return(
                this.props.userProfile
                ?
                <div>
                 <div id="tradeLists" className="ui cards">
                {groupToPlayers.map((t, i) => Object.keys(t).length === 2 ?
                <TradeCard teams={this.props.all_teams} dontrade1={this.selectPlayer} dontrade2={this.selectPlayer} dontrade3={this.selectPlayer} dontrade4={this.selectPlayer} deleteThisTrade={this.removeTrade} all_teams={this.props.all_teams} addVote={this.props.addVote} votes={this.props.votes} currentUser={this.props.currentUser} trade={tradeIds[i]} all_users={this.props.all_users} createdBy={this.props.all_users.filter(u => u.id === tradeUsers[i])} team1={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[0]))[0]} player1={t[Object.keys(t)[0]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)}
                team2={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[1]))[0]} player2={t[Object.keys(t)[1]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)} team3={null} player3={[]} team4={null} player4={[]}/>
                :
                Object.keys(t).length === 3 ? 
                <TradeCard teams={this.props.all_teams} dontrade1={this.selectPlayer} dontrade2={this.selectPlayer} dontrade3={this.selectPlayer} dontrade4={this.selectPlayer} deleteThisTrade={this.removeTrade} all_teams={this.props.all_teams} addVote={this.props.addVote} votes={this.props.votes} currentUser={this.props.currentUser}  trade={tradeIds[i]} all_users={this.props.all_users} createdBy={this.props.all_users.filter(u => u.id === tradeUsers[i])} team1={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[0]))[0]} player1={t[Object.keys(t)[0]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)}
                team2={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[1]))[0]} player2={t[Object.keys(t)[1]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)} team3={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[2]))[0]} player3={t[Object.keys(t)[2]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)} team4={null} player4={[]}/>
                :
                <TradeCard teams={this.props.all_teams} dontrade1={this.selectPlayer} dontrade2={this.selectPlayer} dontrade3={this.selectPlayer} dontrade4={this.selectPlayer} deleteThisTrade={this.removeTrade} all_teams={this.props.all_teams} addVote={this.props.addVote} votes={this.props.votes} currentUser={this.props.currentUser} trade={tradeIds[i]} all_users={this.props.all_users} createdBy={this.props.all_users.filter(u => u.id === tradeUsers[i])} team1={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[0]))[0]} player1={t[Object.keys(t)[0]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)}
                team2={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[1]))[0]} player2={t[Object.keys(t)[1]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)}
                team3={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[2]))[0]} player3={t[Object.keys(t)[2]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)}
                team4={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[3]))[0]} player4={t[Object.keys(t)[3]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)}/>
                )}
                </div>
                </div>
                :
                <div>
                <div id="searchAndSort">
                <div id="trade-dropdown">
              <Dropdown
                    placeholder='search by teams'
                    fluid
                    multiple
                    search
                    selection
                    options={options}
                    onChange={this.onFilterChange.bind(this)}
                    onEnter={this.onFilterChange.bind(this)}
                />
                <br/>
                </div>
                <div id="sortGrid">
                Sort by:
                <button className="sortButton" onClick={()=>this.handleSort('hot')}>Hot</button>
                <button className="sortButton" onClick={()=>this.handleSort('new')}>New</button>
                </div>
                </div>
            <div id="tradeLists" className="ui cards">
        {groupToPlayers.map((t, i) => Object.keys(t).length === 2 ?
        <TradeCard teams={this.props.all_teams} dontrade1={this.selectPlayer} dontrade2={this.selectPlayer} dontrade3={this.selectPlayer} dontrade4={this.selectPlayer} deleteThisTrade={this.removeTrade} all_teams={this.props.all_teams} addVote={this.props.addVote} votes={this.props.votes} currentUser={this.props.currentUser} trade={tradeIds[i]} all_users={this.props.all_users} createdBy={this.props.all_users.filter(u => u.id === tradeUsers[i])} team1={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[0]))[0]} player1={t[Object.keys(t)[0]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)}
        team2={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[1]))[0]} player2={t[Object.keys(t)[1]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)} team3={null} player3={[]} team4={null} player4={[]}/>
        :
        Object.keys(t).length === 3 ? 
        <TradeCard teams={this.props.all_teams} dontrade1={this.selectPlayer} dontrade2={this.selectPlayer} dontrade3={this.selectPlayer} dontrade4={this.selectPlayer} deleteThisTrade={this.removeTrade} all_teams={this.props.all_teams} addVote={this.props.addVote} votes={this.props.votes} currentUser={this.props.currentUser}  trade={tradeIds[i]} all_users={this.props.all_users} createdBy={this.props.all_users.filter(u => u.id === tradeUsers[i])} team1={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[0]))[0]} player1={t[Object.keys(t)[0]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)}
        team2={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[1]))[0]} player2={t[Object.keys(t)[1]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)} team3={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[2]))[0]} player3={t[Object.keys(t)[2]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)} team4={null} player4={[]}/>
        :
        <TradeCard teams={this.props.all_teams} dontrade1={this.selectPlayer} dontrade2={this.selectPlayer} dontrade3={this.selectPlayer} dontrade4={this.selectPlayer} deleteThisTrade={this.removeTrade} all_teams={this.props.all_teams} addVote={this.props.addVote} votes={this.props.votes} currentUser={this.props.currentUser} trade={tradeIds[i]} all_users={this.props.all_users} createdBy={this.props.all_users.filter(u => u.id === tradeUsers[i])} team1={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[0]))[0]} player1={t[Object.keys(t)[0]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)}
        team2={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[1]))[0]} player2={t[Object.keys(t)[1]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)}
        team3={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[2]))[0]} player3={t[Object.keys(t)[2]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)}
        team4={this.props.all_teams.filter(team => team.id === parseInt(Object.keys(t)[3]))[0]} player4={t[Object.keys(t)[3]].map(p=> this.props.all_players.filter(player => player.id === p)).flat(1)}/>
        )}
        </div>
        </div>

        )
    }
}
export default TradeList