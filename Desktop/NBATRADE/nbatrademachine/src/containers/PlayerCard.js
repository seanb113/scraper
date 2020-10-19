import React from 'react'

const PlayerCard  = props => {
    console.log("playercard", props.tradedPlayers)
    let disableCard = (player) => {
        if (props.tradedPlayers.includes(player))
        return true
        else
        return false
    }

    let getInitials = (string) => {
        let initials = string.match(/\b\w/g) || []
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    }

    return(
    <div id={props.tradedPlayers !== undefined && disableCard(props.player) === true ? "ui-item-disabled" : "ui-item"} class="item" onClick={(event)=> props.selectPlayer(props.player)}>
        <img alt="" class="ui avatar image" src={props.player.player_image}/>
        <div class="content">
    <div class="header">{props.player.name} {getInitials(props.player.position)}</div>
    <div class="description">{props.player.salary === "-" ? "Two Way Contract" : "Salary: " + props.player.salary}</div>
    <div class="description">{parseInt(props.player.final_year_of_contract) - 2020} years</div>
    <div class="extra content"> 
    <div class="meta">{props.player.trade_clause ? "No Trade Clause" : null }</div>
    </div>
    </div>
    </div>
        )
}
export default PlayerCard