import React from 'react'
import {Link} from 'react-router-dom'
import TradeList from '../components/TradeList'
const UserProfile  = props => {
    let madeAnyTrades = () => {
        if (props.trades.length > 0)
        return <div class="ui third centered header">Your trades:</div>
        else
        return <div class="ui third centered header">You haven't made any trades. Click <Link to="/machine">here</Link> to go to the trade machine.</div>
    }
        return(
            <div>
            <br></br>
            {props.user[0].id === props.currentUser.id ? <div class="ui third centered header"> {madeAnyTrades()}</div> : <div class="ui third centered header"> {props.user[0].name}'s trades:</div>}
            <TradeList createdBy={props.user} removeTrade={props.removeTrade} currentUser={props.currentUser} votes={props.votes} all_users={props.all_users} trades={props.trades} all_players={props.all_players} all_teams={props.all_teams} userProfile={true}/>
            </div>
            
        )
}
export default UserProfile