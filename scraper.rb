require 'mechanize'
require 'json'



begin
    agent = Mechanize.new
    all_response_code = ['403', '404', '502']
    page = agent.get("https://www.spotrac.com/search/results/brooklyn-nets/")
    team_pages = page.links_with(:dom_class => "team-name")
    teams = team_pages.map do |link|
        puts "Team done"
        team = link.text
        team_page = link.click
    
    other_players = team_page.links_with(:dom_class => ".tag.player-tag")
    all_players = team_page.links_with(:href => %r{/redirect/player/})
    players = all_players.reject{|link| other_players.include? link}
    player_names = players.map do |link| 
        player = link.text.strip
    end
    
    salaries = players.map do |link| 
        salary = link.click.search(".center.salaryAmt.result.current-year").text.gsub(/\s+/, "")
    end
    final_year_of_current = players.map do |link|
        final_year = link.click.search('.salaryTable.salaryInfo.hidden-xs .notop .contract-item[5] .playerValue').text
        final_year_of_current = final_year.gsub(/[^\d]/, '')
        final_year_of_current.slice(0, 4)
    end

    position = players.map do |link|
        position = link.click.search(".player .player-details .player-info .player-item.position").text
    end
    player_pic = players.map do |link|
        player_pic = link.click.search('.player .player-logo img').attr('src')
    end
    signed_current_using = players.map do |link|
        puts "signed"
        signed_using = link.click.search('.salaryTable.salaryInfo.hidden-xs .notop .contract-item[4] .playerValue').first
        if signed_using == nil
        ""
        else
        signed_using.text
        end
    end

    trade_clause = players.map do |link|
        trade_clause = link.click.search('.center.small.current-year .info i')
        puts trade_clause
        if trade_clause.to_s == '<i class="fa fa-unlock"></i>'
            true
        else
            false
        end
    end

    players_details = player_names.each_with_index.map do |w, index|
        {team: team, name: player_names[index], salary: salaries[index], position: position[index], player_image: player_pic[index], signed_using: signed_current_using[index], final_year_of_contract: final_year_of_current[index], trade_clause: trade_clause[index]}
    end
        
        {players: players_details.inject({}) do |r, h| 
            (r[h[:name]] ||= {}).merge!(h){ |key, old, new| old || new }
            r
          end.values
        }

    {players: players_details}

    rescue Mechanize::ResponseCodeError => e
    if all_response_code.include? e.response_code 
    e.skip
    else
    retry
    end
    end
end

puts JSON.pretty_generate(Array.new(teams[0][:players]).uniq { |t| t[:name] })