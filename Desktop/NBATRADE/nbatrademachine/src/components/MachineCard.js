import React, { Component } from 'react'
import TeamList from '../containers/TeamList'
import TradeCard from '../containers/TradeCard'
import RosterCard from '../containers/RosterCard'

class MachineCard extends Component {
    state = {
        team1: null,
        team2: null,
        team3: null,
        team4: null,
        all_teams: [],
        team1Players: [],
        team2Players: [],
        team3Players: [],
        team4Players: [],
        tradedto1: [],
        tradedto2: [],
        tradedto3: [],
        tradedto4: [],
        whereTo: null,
        beingTraded: null,
        beingTradedFrom: null,
        submitted: false,
        saved: false,
        notValid: false,
        notValidReason: null,
        numberToCut: 0
    }

    componentDidMount(){
        this.setState({
        team1: "selecting",
        team2: "selecting",
        all_teams: this.props.teams
        }
        )
    }
    dontAddNewTeam = () => {
        let newState = this.state.team4 === "selecting" ? "selecting" : null
        this.setState({
            team3: newState,
            team4: null
        })
    }

    chooseTeam1 = (team) => {
        let teams_array = this.state.all_teams.filter(checkedteam=> checkedteam !== team)
        let teamPlayers = this.props.players.filter(player =>
        player.team_id === team.id)
        this.setState({
        team1: team,
        all_teams: teams_array,
        team1Players: teamPlayers
    })
    }
    chooseTeam2 = (team) => {
        let teams_array = this.state.all_teams.filter(checkedteam=> checkedteam !== team)
        let teamPlayers = this.props.players.filter(player =>
        player.team_id === team.id)
        this.setState({
        team2: team,
        all_teams: teams_array,
        team2Players: teamPlayers
    })
    }
    chooseTeam3 = (team) => {
        let teams_array = this.state.all_teams.filter(checkedteam=> checkedteam !== team)
        let teamPlayers = this.props.players.filter(player =>
        player.team_id === team.id)
        this.setState({
        team3: team,
        all_teams: teams_array,
        team3Players: teamPlayers
    })
    }
    chooseTeam4 = (team) => {
        let teams_array = this.state.all_teams.filter(checkedteam=> checkedteam !== team)
        let teamPlayers = this.props.players.filter(player =>
        player.team_id === team.id) 
        this.setState({
        team4: team,
        all_teams: teams_array,
        team4Players: teamPlayers
    })
    }
    changeTeam1 = (team) => {
        let old_team = this.state.team1
        let teams_array = this.state.all_teams.push(old_team)
        this.setState({
            team1: "selecting",
            teams: teams_array
        })
    }
    
    changeTeam2 = (team) => {
        let old_team = this.state.team2
        let teams_array = this.state.all_teams.push(old_team)
        this.setState({
            team1: "selecting",
            teams: teams_array
        })
    }
    
    changeTeam3 = (team) => {
        let old_team = this.state.team3
        let teams_array = this.state.all_teams.push(old_team)
        this.setState({
            team1: "selecting",
            teams: teams_array
        })
    }
    
    changeTeam1 = (team) => {
        let old_team = this.state.team4
        let teams_array = this.state.all_teams.push(old_team)
        this.setState({
            team1: "selecting",
            teams: teams_array
        })
    }
    
    removeTeam1 = (team) => {
        //refactor
        this.state.all_teams.push(team)
        let new_team1 = this.state.team2
        let new_team2 = this.state.team3 === null ? "selecting" : this.state.team3
        let new_team3 = this.state.team4
        let new_roster1 = this.state.team2Players.length > 0 ? this.state.team2Players : []
        let new_roster2 = this.state.team3Players.length > 0 ? this.state.team3Players : []
        let new_roster3 = this.state.team4Players.length > 0 ? this.state.team4Players : []
        let new_traded1 = this.state.tradedto2.length > 0 ? this.state.tradedto2.filter(player => player.team_id !== this.state.team1.id) : []
        let new_traded2 = this.state.tradedto3.length > 0 ? this.state.tradedto3.filter(player => player.team_id !== this.state.team1.id) : []
        let new_traded3 = this.state.tradedto4.length > 0 ? this.state.tradedto4.filter(player => player.team_id !== this.state.team1.id) : []
        this.setState({
            team1: new_team1,
            team2: new_team2,
            team3: new_team3,
            team1Players: new_roster1,
            team2Players: new_roster2,
            team3Players: new_roster3,
            team4: null,
            tradedto1: new_traded1,
            tradedto2: new_traded2,
            tradedto3: new_traded3,
            tradedto4: [],
            all_teams: this.state.all_teams.sort(),
            beingTraded: null

        })
        }
    removeTeam2 = (team) => {
        this.state.all_teams.push(team)
        let new_team2 = this.state.team3 === null ? "selecting" : this.state.team3
        let new_team3 = this.state.team4
        let new_traded1 = this.state.tradedto1.length > 0 ? this.state.tradedto1.filter(player => player.team_id !== this.state.team2.id) : []
        let new_traded2 = this.state.tradedto3.length > 0 ? this.state.tradedto3.filter(player => player.team_id !== this.state.team2.id) : []
        let new_traded3 = this.state.tradedto4.length > 0 ? this.state.tradedto4.filter(player => player.team_id !== this.state.team2.id) : []
        let new_roster2 = this.state.team3Players.length > 0 ? this.state.team3Players : []
        let new_roster3 = this.state.team4Players.length > 0 ? this.state.team4Players : []
        this.setState({
            team2: new_team2,
            team3: new_team3,
            team2Players: new_roster2,
            team3Players: new_roster3,
            team4Players: [],
            team4: null,
            tradedto1: new_traded1,
            tradedto2: new_traded2,
            tradedto3: new_traded3,
            tradedto4: [],
            beingTraded: null,
            all_teams: this.state.all_teams.sort()
        })
        }
    removeTeam3 = (team) => {
        this.state.all_teams.push(team)
        let new_team3 = this.state.team4
        let new_traded1 = this.state.tradedto1.length > 0 ? this.state.tradedto1.filter(player => player.team_id !== this.state.team3.id) : []
        let new_traded2 = this.state.tradedto2.length > 0 ? this.state.tradedto2.filter(player => player.team_id !== this.state.team3.id) : []
        let new_traded3 = this.state.tradedto4.length > 0 ? this.state.tradedto4.filter(player => player.team_id !== this.state.team3.id) : []
        let new_roster3 = this.state.team4Players.length > 0 ? this.state.team4Players : []
        this.setState({
            team3: new_team3,
            team4: null,
            team3Players: new_roster3,
            tradedto1: new_traded1,
            tradedto2: new_traded2,
            tradedto3: new_traded3,
            tradedto4: [],
            beingTraded: null,
            all_teams: this.state.all_teams.sort()
        })
    }
    removeTeam4 = (team) => {
        this.state.all_teams.push(team)
        let new_traded1 = this.state.tradedto1.length > 0 ? this.state.tradedto1.filter(player => player.team_id !== this.state.team4.id) : []
        let new_traded2 = this.state.tradedto2.length > 0 ? this.state.tradedto2.filter(player => player.team_id !== this.state.team4.id) : []
        let new_traded3 = this.state.tradedto3.length > 0 ? this.state.tradedto3.filter(player => player.team_id !== this.state.team4.id) : []
        this.setState({
            team4: null,
            team4Players: [],
            tradedto1: new_traded1,
            tradedto2: new_traded2,
            tradedto3: new_traded3,
            tradedto4: [],
            beingTraded: null,
            all_teams: this.state.all_teams.sort()
        })
    }

    noTradeClause = (player) => {
        if (player.trade_clause)
        alert("This player has a no trade clause that they must waive for any trade to go through") 
        else
        return true
    }

    addPlayerToTrade = (player) => {
        let beingTradedFrom = this.state.all_teams.map(team => team.name === player.team)
        this.setState({
            beingTraded: player,
            whereTo: true,
            beingTradedFrom
        })
        this.noTradeClause(player)
    }

    tradetonewTeam = (team) => {
        if (team === this.state.team1.name)
        this.tradetoTeam1()
        else if (team === this.state.team2.name)
        this.tradetoTeam2()
        else if (team === this.state.team3.name)
        this.tradetoTeam3()
        else
        this.tradetoTeam4()

    }

    tradetoTeam1 = () => {
        let oldArray = this.state.tradedto1
        let playerObj = this.state.beingTraded
        oldArray.push(playerObj)
        this.setState({
            tradedto1: oldArray,
            beingTraded: null
        })
    }

    tradetoTeam2 = () => {
        let oldArray = this.state.tradedto2
        let playerObj = this.state.beingTraded
        oldArray.push(playerObj)
        this.setState({
            tradedto2: oldArray,
            beingTraded: null
        })
    }

    tradetoTeam3 = () => {
        let oldArray = this.state.tradedto3
        let playerObj = this.state.beingTraded
        oldArray.push(playerObj)
        this.setState({
            tradedto3: oldArray,
            beingTraded: null
        })
    }

    tradetoTeam4 = () => {
        let playerObj = this.state.beingTraded
        let oldArray = this.state.tradedto4
        oldArray.push(playerObj)
        this.setState({
            tradedto4: oldArray,
            beingTraded: null
        })
    }

    donttradetoTeam1 = (playerObj, team, event) => {
        let oldArray = this.state.tradedto1
        let newArray = oldArray.filter(player => player !== playerObj)
        this.setState({
            tradedto1: newArray
        })
    }

    donttradetoTeam2 = (playerObj, team, event) => {
        let oldArray = this.state.tradedto2
        let newArray = oldArray.filter(player => player !== playerObj)
        this.setState({
            tradedto2: newArray
        })
    }


    donttradetoTeam3 = (playerObj, team, event) => {
        let oldArray = this.state.tradedto3
        let newArray = oldArray.filter(player => player !== playerObj)
        this.setState({
            tradedto3: newArray
        })
    }

    donttradetoTeam4 = (playerObj, team, event) => {
        let oldArray = this.state.tradedto4
        let newArray = oldArray.filter(player => player !== playerObj)
        this.setState({
            tradedto4: newArray
        })
    }

    addAThird = () => {
        this.setState({
            team3: "selecting"
        })
    }

    addAFourth = () => {
        this.setState({
            team4: "selecting"
        })
    }


    tradedAway = (team) => { 
        let arr = []
        let arr1 = team !== null ? arr.concat(this.state.tradedto1.filter(player => player.team_id === team.id)) : []
        let arr2 = team !== null ? arr1.concat(this.state.tradedto2.filter(player => player.team_id === team.id)) : []
        let arr3 = team !== null ? arr2.concat(this.state.tradedto3.filter(player => player.team_id === team.id)) : []
        let arr4 = team !== null ? arr3.concat(this.state.tradedto4.filter(player => player.team_id === team.id)) : []
        return arr4
    }


    postTrade = (trade) => {
        let user = this.props.currentUser
        fetch("https://nbatrademachine-app.herokuapp.com/trades", {
            method: "POST",
            headers: {
                "Content-Type" :"application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user: user,
                swap_attributes: trade
            })
        }).then(r=>r.json())
            .then(r=>this.props.addedNewTrade(r)
            )
    }

    handleSave = () => {
        let team1Trade = [this.state.team1, this.state.tradedto1]
        let team2Trade = [this.state.team2, this.state.tradedto2]
        let team3Trade = this.state.tradedto3.length > 0 ? [this.state.team3, this.state.tradedto3] : null
        let team4Trade = this.state.tradedto4.length > 0 ? [this.state.team4, this.state.tradedto4] : null
        this.postTrade([team1Trade, team2Trade, team3Trade ? team3Trade : null, team4Trade ? team4Trade : null])
        this.setState({
            saved: true
        })
        alert("Trade saved")
    }

    editTrade = () => {
        this.setState({
            submitted: false,
            saved: false
        })
    }

    resetMachine = () => {
        this.setState({
            team1: "selecting",
            team2: "selecting",
            team3: null,
            team4: null,
            all_teams: this.props.teams,
            team1Players: [],
            team2Players: [],
            team3Players: [],
            team4Players: [],
            tradedto1: [],
            tradedto2: [],
            tradedto3: [],
            tradedto4: [],
            whereTo: null,
            beingTraded: null,
            beingTradedFrom: null,
            submitted: false,
            saved: false,
            notValid: false,
            notValidReason: null,
            numberToCut: 0
        })
    }

    oldCap = (team) => {
        team !== null
        ?
        parseInt(team.cap_spent.replace(/\D/g,''))
        :
        parseInt(0)
    }

    validateTrade = (team, acquired) => {  
        // 1. Any team under the cap can take any amount in up to the cap level + $100,000
        // 2. Teams under tax but over cap. It's 150%???????
        // 3. Under 9.8M in incoming: 150+100 else : 125 + 100000
        // 4. Any team can take back up to 125% of their outgoing salaries + $100,000
        let incomingSalary = acquired.map(player => parseInt(player.salary.replace(/\D/g,''))).reduce((a, b) => a + b, 0);
        let outgoingSalary = this.tradedAway(team).map(player => parseInt(player.salary.replace(/\D/g,''))).reduce((a, b) => a + b, 0)
        let salaryCap = 116000000
        let luxuryTax = 139000000
        let potentialSalary = this.oldCap(team) + incomingSalary;
        let underTax = (potentialSalary < luxuryTax);

        // let checkedTeam = (`${team !== null ? team.name : null} taking in too much salary`);

        if(potentialSalary < (salaryCap + 100000)) {
            console.log('Potential salary is less than salary cap + 100,000');
        }
        else if(underTax && incomingSalary < 98000000) {
            if(incomingSalary > (outgoingSalary * 1.5) + 100000) {
            console.log('under tax and incoming more than 150% + 100,000 of outgoing');

            if(incomingSalary > (outgoingSalary * 1.25) + 100000) {

                return false,
                this.setState({
                        notValid: team,
                        notValidReason: 'Incoming salary is more than 150% + 100,000 of outgoing',
                        numberToCut: Math.round(incomingSalary - (outgoingSalary * 1.5 - 100000))
                    })
            
            }
            }
        }
        else if(incomingSalary > (outgoingSalary * 1.25) + 100000) {
            console.log('incoming is greater than 125% + 100,000 of outgoing');

            return false,
            this.setState({
                notValid: team,
                notValidReason: 'Incoming salary is greater than 125% + 100,000 of outgoing',
                numberToCut: Math.round(incomingSalary - (outgoingSalary * 1.25 - 100000))
            })
        }

        return true
        }

    handleSubmit = () => {
        let team1 = this.state.team1
        let team2 = this.state.team2
        let team3 = this.state.team3 === "selecting" ? null : this.state.team3
        let team4 = this.state.team4 === "selecting" ? null : this.state.team4
        this.validateTrade(team1, this.state.tradedto1) &&
        this.validateTrade(team2, this.state.tradedto2) &&
        this.validateTrade(team3, this.state.tradedto3) &&
        this.validateTrade(team4, this.state.tradedto4) ?
        this.setState({
            submitted: true,
            notValid: false,
            notValidReason: null,
            team3: this.state.team3 === "selecting" ? null : this.state.team3,
            team4: this.state.team4 === "selecting" ? null : this.state.team4
        }) :
        alert("Your trade was not successful")
    }

    render(){
        let tradeTo = this.state.beingTraded
        let team1 = this.state.team1
        let team2 = this.state.team2
        let team3 = this.state.team3
        let team4 = this.state.team4
        let all_teams = this.state.all_teams
        let tp = []
        let tradedPlayers = tp.concat(this.state.tradedto1, this.state.tradedto2, this.state.tradedto3, this.state.tradedto4)
        return(
            <div>
            <TradeCard submitted={this.state.submitted} teams={this.props.all_teams} numberToCut={this.state.numberToCut} notValidReason={this.state.notValidReason} user={this.props.currentUser} tooMuchSalary={this.state.notValid} team1={team1} team2={team2} team3={team3} team4={team4} player1={this.state.tradedto1} player2={this.state.tradedto2} player3={this.state.tradedto3} player4={this.state.tradedto4} dontrade1={this.donttradetoTeam1} dontrade2={this.donttradetoTeam2} dontrade3={this.donttradetoTeam3} dontrade4={this.donttradetoTeam4}/>
            <br/>
            <br/>
            <div class="ui centered grid">
            <div class="ui buttons">
            <div class="buttonSpace">
            {!this.state.submitted && team3 === null && this.state.team2 !== "selecting" ? <button id="machineButtonGrid" class="small ui button" onClick={this.addAThird}>Add third team</button> : null}
            {!this.state.submitted && team4 === null && this.state.team3 && this.state.team3 !== "selecting" ? <button id="machineButtonGrid" class="small ui button" onClick={this.addAFourth}>Add fourth team</button> : null}
            {!this.state.submitted && !this.state.saved && this.state.tradedto1.length > 0 && this.state.tradedto2.length > 0 ? <button id="machineButtonGrid" class="small ui button" onClick={this.handleSubmit}>Submit Trade</button> : null}
            {this.state.submitted && !this.state.saved ? <button id="machineButtonGrid" class="small ui button" onClick={this.handleSave}>Save Trade</button> : false}
            {this.state.submitted ? <button id="machineButtonGrid" class="small ui button" onClick={this.editTrade}>Edit Trade</button> : null}
            {this.state.tradedto1.length || this.state.tradedto2.length || this.state.tradedto3.length || this.state.tradedto4.length > 0 ? <button id="machineButtonGrid" class="small ui button" onClick={this.resetMachine}>Reset Trade Machine</button> : null}
            <br/>
            </div>
            </div>
            </div>
            <br/>
            <br/>
            <div class="ui four column left floated center aligned grid">
            <br/>
            <br/>
            {team1 !== "selecting" && team1 !== null && this.state.submitted !== true ? <RosterCard tradedPlayers={tradedPlayers} removeTeam={this.removeTeam1} team={team1} players={this.state.team1Players} selectPlayer={this.addPlayerToTrade} tradeTo={tradeTo} team1={this.state.team1} team2={this.state.team2} team3={this.state.team3} team4={this.state.team4} tradePlayer={this.tradetonewTeam}/>: null}
            {team2 !== "selecting" && team2 !== null && this.state.submitted !== true ? <RosterCard tradedPlayers={tradedPlayers} removeTeam={this.removeTeam2} team={team2} players={this.state.team2Players} selectPlayer={this.addPlayerToTrade} tradeTo={tradeTo} team1={this.state.team1} team2={this.state.team2} team3={this.state.team3} team4={this.state.team4} tradePlayer={this.tradetonewTeam}/>: null}
            {team3 !== "selecting" && team3 !== null && this.state.submitted !== true ? <RosterCard tradedPlayers={tradedPlayers} removeTeam={this.removeTeam3} team={team3} players={this.state.team3Players} selectPlayer={this.addPlayerToTrade} tradeTo={tradeTo} team1={this.state.team1} team2={this.state.team2} team3={this.state.team3} team4={this.state.team4} tradePlayer={this.tradetonewTeam}/>: null}
            {team4 !== "selecting" && team4 !== null && this.state.submitted !== true ? <RosterCard tradedPlayers={tradedPlayers} removeTeam={this.removeTeam4} team={team4} players={this.state.team4Players} selectPlayer={this.addPlayerToTrade} tradeTo={tradeTo} team1={this.state.team1} team2={this.state.team2} team3={this.state.team3} team4={this.state.team4} tradePlayer={this.tradetonewTeam}/>: null}
            {team1 === "selecting" ? <TeamList team={"team1"} teams={all_teams} chooseTeam={this.chooseTeam1} changeTeam={this.changeTeam1} removeTeam={this.removeTeam1}/>: null}
            {team2 === "selecting" ? <TeamList team={"team1"} teams={all_teams} chooseTeam={this.chooseTeam2} changeTeam={this.changeTeam2} removeTeam={this.removeTeam2}/>: null}
            {team3 === "selecting" ? <TeamList team={"team3"} dontaddteam={this.dontAddNewTeam} teams={all_teams} chooseTeam={this.chooseTeam3} changeTeam={this.changeTeam3} removeTeam={this.removeTeam3}/>: null}
            {team4 === "selecting" ? <TeamList team={"team4"} dontaddteam={this.dontAddNewTeam} teams={all_teams} chooseTeam={this.chooseTeam4} changeTeam={this.changeTeam4} removeTeam={this.removeTeam4}/>: null}
            <div class="ui buttons">
            </div>
            </div>
            <br/>
            <br/>
            <div id="bottomButtons" class="ui centered grid">
            </div>
            </div>
        )
    }
}
export default MachineCard