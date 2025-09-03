arizona_diamondbacks
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import baseballTeamInfo from '../baseballjson/baseballTeamInfo.json';
import hockeyTeamInfo from '../hockeyjson/hockeyTeamInfo.json';
import footballTeamInfo from '../footballjson/footballTeamInfo.json';
import basketballTeamInfo from '../basketballjson/basketballTeamInfo.json';
import logo from '../assets/srtf_logo.png';
import logo_off from '../assets/srtf_logo.svg';

import arizona_diamondbacks_pic from '../assets/mlb_logos/arizona_diamondbacks.png';
import atlanta_braves_pic from '../assets/mlb_logos/atlanta_braves.png';
import baltimore_orioles_pic from '../assets/mlb_logos/baltimore_orioles.png';
import boston_red_sox_pic from '../assets/mlb_logos/boston_red_sox.png';
import chicago_cubs_pic from '../assets/mlb_logos/chicago_cubs.png';
import chicago_white_sox_pic from '../assets/mlb_logos/chicago_white_sox.png';
import cincinnati_reds_pic from '../assets/mlb_logos/cincinatti_reds.png';
import cleveland_guardians_pic from '../assets/mlb_logos/cleveland_guardians.png';
import colorado_rockies_pic from '../assets/mlb_logos/colorado_rockies.png';
import detroit_tigers_pic from '../assets/mlb_logos/detroit_tigers.png';
import houston_astros_pic from '../assets/mlb_logos/houston_astros.png';
import kansas_city_royals_pic from '../assets/mlb_logos/kansas_city_royals.png';
import los_angeles_angels_pic from '../assets/mlb_logos/los_angeles_angels.png';
import los_angeles_dodgers_pic from '../assets/mlb_logos/los_angeles_dodgers.png';
import miami_marlins_pic from '../assets/mlb_logos/miami_marlins.png';
import milwaukee_brewers_pic from '../assets/mlb_logos/milwaukee_brewers.png';
import minnesota_twins_pic from '../assets/mlb_logos/minnesota_twins.png';
import new_york_mets_pic from '../assets/mlb_logos/new_york_mets.png';
import new_york_yankees_pic from '../assets/mlb_logos/new_york_yankees.png';
import athletics_pic from '../assets/mlb_logos/athletics.png';
import philadelphia_phillies_pic from '../assets/mlb_logos/philidelphia_phillies.png';
import pittsburgh_pirates_pic from '../assets/mlb_logos/pittsburgh_pirates.png';
import san_diego_padres_pic from '../assets/mlb_logos/san_diego_padres.png';
import san_francisco_giants_pic from '../assets/mlb_logos/san_fransisco_giants.png';
import seattle_mariners_pic from '../assets/mlb_logos/seattle_mariners.png';
import st_louis_cardinals_pic from '../assets/mlb_logos/st_louis_cardinals.png';
import tampa_bay_rays_pic from '../assets/mlb_logos/tampa_bay_rays.png';
import texas_rangers_pic from '../assets/mlb_logos/texas_rangers.png';
import toronto_blue_jays_pic from '../assets/mlb_logos/toronto_blue_jays.png';
import washington_nationals_pic from '../assets/mlb_logos/washington_nationals.png';

import anaheim_ducks_pic from '../assets/nhl_logos/anaheim_ducks.png';
import boston_bruins_pic from '../assets/nhl_logos/boston_bruins.png';
import buffalo_sabres_pic from '../assets/nhl_logos/buffalo_sabres.png';
import calgary_flames_pic from '../assets/nhl_logos/calgary_flames.png';
import carolina_hurricanes_pic from '../assets/nhl_logos/carolina_hurricanes.png';
import chicago_blackhawks_pic from '../assets/nhl_logos/chicago_blackhawks.png';
import colorado_avalanche_pic from '../assets/nhl_logos/colorado_avalanche.png';
import columbus_blue_jackets_pic from '../assets/nhl_logos/columbus_blue_jackets.png';
import dallas_stars_pic from '../assets/nhl_logos/dallas_stars.png';
import detroit_red_wings_pic from '../assets/nhl_logos/detroit_red_wings.png';
import edmonton_oilers_pic from '../assets/nhl_logos/edmonton_oilers.png';
import florida_panthers_pic from '../assets/nhl_logos/florida_panthers.png';
import los_angeles_kings_pic from '../assets/nhl_logos/los_angeles_kings.png';
import minnesota_wild_pic from '../assets/nhl_logos/minnesota_wild.png';
import montreal_canadiens_pic from '../assets/nhl_logos/montreal_canadiens.png';
import nashville_predators_pic from '../assets/nhl_logos/nashville_predators.png';
import new_jersey_devils_pic from '../assets/nhl_logos/new_jersey_devils.png';
import new_york_islanders_pic from '../assets/nhl_logos/new_york_islanders.png';
import new_york_rangers_pic from '../assets/nhl_logos/new_york_rangers.png';
import ottawa_senators_pic from '../assets/nhl_logos/ottawa_senators.png';
import philadelphia_flyers_pic from '../assets/nhl_logos/philadelphia_flyers.png';
import pittsburgh_penguins_pic from '../assets/nhl_logos/pittsburgh_penguins.png';
import san_jose_sharks_pic from '../assets/nhl_logos/san_jose_sharks.png';
import seattle_kraken_pic from '../assets/nhl_logos/seattle_kraken.png';
import st_louis_blues_pic from '../assets/nhl_logos/st_louis_blues.png';
import tampa_bay_lightning_pic from '../assets/nhl_logos/tampa_bay_lightning.png';
import toronto_maple_leafs_pic from '../assets/nhl_logos/toronto_maple_leafs.png';
import vancouver_canucks_pic from '../assets/nhl_logos/vancouver_canucks.png';
import utah_hockey_club_pic from '../assets/nhl_logos/utah_hockey_club.png';
import vegas_golden_knights_pic from '../assets/nhl_logos/vegas_golden_knights.png';
import washington_capitals_pic from '../assets/nhl_logos/washington_capitals.png';
import winnipeg_jets_pic from '../assets/nhl_logos/winnipeg_jets.png';


import arizona_cardinals_pic from '../assets/nfl_logos/arizona_cardinals.png';
import atlanta_falcons_pic from '../assets/nfl_logos/atlanta_falcons.png';
import baltimore_ravens_pic from '../assets/nfl_logos/baltimore_ravens.png';
import buffalo_bills_pic from '../assets/nfl_logos/buffalo_bills.png';
import carolina_panthers_pic from '../assets/nfl_logos/carolina_panthers.png';
import chicago_bears_pic from '../assets/nfl_logos/chicago_bears.png';
import cincinnati_bengals_pic from '../assets/nfl_logos/cincinnati_bengals.png';
import cleveland_browns_pic from '../assets/nfl_logos/cleveland_browns.png';
import dallas_cowboys_pic from '../assets/nfl_logos/dallas_cowboys.png';
import denver_broncos_pic from '../assets/nfl_logos/denver_broncos.png';
import detroit_lions_pic from '../assets/nfl_logos/detroit_lions.png';
import green_bay_packers_pic from '../assets/nfl_logos/green_bay_packers.png';
import houston_texans_pic from '../assets/nfl_logos/houston_texans.png';
import indianapolis_colts_pic from '../assets/nfl_logos/indianapolis_colts.png';
import jacksonville_jaguars_pic from '../assets/nfl_logos/jacksonville_jaguars.png';
import kansas_city_chiefs_pic from '../assets/nfl_logos/kansas_city_chiefs.png';
import las_vegas_raiders_pic from '../assets/nfl_logos/las_vegas_raiders.png';
import los_angeles_chargers_pic from '../assets/nfl_logos/los_angeles_chargers.png';
import los_angeles_rams_pic from '../assets/nfl_logos/los_angeles_rams.png';
import miami_dolphins_pic from '../assets/nfl_logos/miami_dolphins.png';
import minnesota_vikings_pic from '../assets/nfl_logos/minnesota_vikings.png';
import new_england_patriots_pic from '../assets/nfl_logos/new_england_patriots.png';
import new_orleans_saints_pic from '../assets/nfl_logos/new_orleans_saints.png';
import new_york_giants_pic from '../assets/nfl_logos/new_york_giants.png';
import new_york_jets_pic from '../assets/nfl_logos/new_york_jets.png';
import philadelphia_eagles_pic from '../assets/nfl_logos/philadelphia_eagles.png';
import pittsburgh_steelers_pic from '../assets/nfl_logos/pittsburgh_steelers.png';
import san_francisco_49ers_pic from '../assets/nfl_logos/san_francisco_49ers.png';
import seattle_seahawks_pic from '../assets/nfl_logos/seattle_seahawks.png';
import tampa_bay_buccaneers_pic from '../assets/nfl_logos/tampa_bay_buccaneers.png';
import tennessee_titans_pic from '../assets/nfl_logos/tennessee_titans.png';
import washington_commanders_pic from '../assets/nfl_logos/washington_commanders.png';

import atlanta_hawks_pic from '../assets/nba_logos/atlanta_hawks.png';
import boston_celtics_pic from '../assets/nba_logos/boston_celtics.png';
import brooklyn_nets_pic from '../assets/nba_logos/brooklyn_nets.png';
import charlotte_hornets_pic from '../assets/nba_logos/charlotte_hornets.png';
import chicago_bulls_pic from '../assets/nba_logos/chicago_bulls.png';
import cleveland_cavaliers_pic from '../assets/nba_logos/cleveland_cavaliers.png';
import dallas_mavericks_pic from '../assets/nba_logos/dallas_mavericks.png';
import denver_nuggets_pic from '../assets/nba_logos/denver_nuggets.png';
import detroit_pistons_pic from '../assets/nba_logos/detroit_pistons.png';
import golden_state_warriors_pic from '../assets/nba_logos/golden_state_warriors.png';
import houston_rockets_pic from '../assets/nba_logos/houston_rockets.png';
import indiana_pacers_pic from '../assets/nba_logos/indiana_pacers.png';
import los_angeles_clippers_pic from '../assets/nba_logos/los_angeles_clippers.png';
import los_angeles_lakers_pic from '../assets/nba_logos/los_angeles_lakers.png';
import memphis_grizzlies_pic from '../assets/nba_logos/memphis_grizzlies.png';
import miami_heat_pic from '../assets/nba_logos/miami_heat.png';
import milwaukee_bucks_pic from '../assets/nba_logos/milwaukee_bucks.png';
import minnesota_timberwolves_pic from '../assets/nba_logos/minnesota_timberwolves.png';
import new_orleans_pelicans_pic from '../assets/nba_logos/new_orleans_pelicans.png';
import new_york_knicks_pic from '../assets/nba_logos/new_york_knicks.png';
import oklahoma_city_thunder_pic from '../assets/nba_logos/oklahoma_city_thunder.png';
import orlando_magic_pic from '../assets/nba_logos/orlando_magic.png';
import philadelphia_76ers_pic from '../assets/nba_logos/philadelphia_76ers.png';
import phoenix_suns_pic from '../assets/nba_logos/phoenix_suns.png';
import portland_trail_blazers_pic from '../assets/nba_logos/portland_trail_blazers.png';
import sacramento_kings_pic from '../assets/nba_logos/sacramento_kings.png';
import san_antonio_spurs_pic from '../assets/nba_logos/san_antonio_spurs.png';
import toronto_raptors_pic from '../assets/nba_logos/toronto_raptors.png';
import utah_jazz_pic from '../assets/nba_logos/utah_jazz.png';
import washington_wizards_pic from '../assets/nba_logos/washington_wizards.png';


const awaySeries = ref([{}]);

const selectedTeam = ref([{}]);

const selectedSport = ref('');

const startingPoints = ref([{}]);

const teamsAndLocationDictionary = ref({});

const baseballTeamsList = ref([]);

const hockeyTeamsList = ref([]);

const footballTeamsList = ref([]);

const basketballTeamsList = ref([]);

const sportsList = ref(['Basketball', 'Baseball', 'Football', 'Hockey']);

var displayNameDictionary = {};

const baseballTeamsImages = {
  arizona_diamondbacks: arizona_diamondbacks_pic,
  atlanta_braves: atlanta_braves_pic,
  baltimore_orioles: baltimore_orioles_pic,
  boston_red_sox: boston_red_sox_pic,
  chicago_cubs: chicago_cubs_pic,
  chicago_white_sox: chicago_white_sox_pic,
  cincinnati_reds: cincinnati_reds_pic,
  cleveland_guardians: cleveland_guardians_pic,
  colorado_rockies: colorado_rockies_pic,
  detroit_tigers: detroit_tigers_pic,
  houston_astros: houston_astros_pic,
  kansas_city_royals: kansas_city_royals_pic,
  los_angeles_angels: los_angeles_angels_pic,
  los_angeles_dodgers: los_angeles_dodgers_pic,
  miami_marlins: miami_marlins_pic,
  milwaukee_brewers: milwaukee_brewers_pic,
  minnesota_twins: minnesota_twins_pic,
  new_york_mets: new_york_mets_pic,
  new_york_yankees: new_york_yankees_pic,
  athletics: athletics_pic,
  philadelphia_phillies: philadelphia_phillies_pic,
  pittsburgh_pirates: pittsburgh_pirates_pic,
  san_diego_padres: san_diego_padres_pic,
  san_francisco_giants: san_francisco_giants_pic,
  seattle_mariners: seattle_mariners_pic,
  st_louis_cardinals: st_louis_cardinals_pic,
  tampa_bay_rays: tampa_bay_rays_pic,
  texas_rangers: texas_rangers_pic,
  toronto_blue_jays: toronto_blue_jays_pic,
  washington_nationals: washington_nationals_pic,
};

const hockeyTeamsImages = {
  anaheim_ducks: anaheim_ducks_pic,
  boston_bruins: boston_bruins_pic,
  buffalo_sabres: buffalo_sabres_pic,
  calgary_flames: calgary_flames_pic,
  carolina_hurricanes: carolina_hurricanes_pic,
  chicago_blackhawks: chicago_blackhawks_pic,
  colorado_avalanche: colorado_avalanche_pic,
  columbus_blue_jackets: columbus_blue_jackets_pic,
  dallas_stars: dallas_stars_pic,
  detroit_red_wings: detroit_red_wings_pic,
  edmonton_oilers: edmonton_oilers_pic,
  florida_panthers: florida_panthers_pic,
  los_angeles_kings: los_angeles_kings_pic,
  minnesota_wild: minnesota_wild_pic,
  montreal_canadiens: montreal_canadiens_pic,
  nashville_predators: nashville_predators_pic,
  new_jersey_devils: new_jersey_devils_pic,
  new_york_islanders: new_york_islanders_pic,
  new_york_rangers: new_york_rangers_pic,
  ottawa_senators: ottawa_senators_pic,
  philadelphia_flyers: philadelphia_flyers_pic,
  pittsburgh_penguins: pittsburgh_penguins_pic,
  san_jose_sharks: san_jose_sharks_pic,
  seattle_kraken: seattle_kraken_pic,
  st_louis_blues: st_louis_blues_pic,
  tampa_bay_lightning: tampa_bay_lightning_pic,
  toronto_maple_leafs: toronto_maple_leafs_pic,
  utah_hockey_club: utah_hockey_club_pic,
  vancouver_canucks: vancouver_canucks_pic,
  vegas_golden_knights: vegas_golden_knights_pic,
  washington_capitals: washington_capitals_pic,
  winnipeg_jets: winnipeg_jets_pic,
};

const footballTeamsImages = {
  arizona_cardinals: arizona_cardinals_pic,
  atlanta_falcons: atlanta_falcons_pic,
  baltimore_ravens: baltimore_ravens_pic,
  buffalo_bills: buffalo_bills_pic,
  carolina_panthers: carolina_panthers_pic,
  chicago_bears: chicago_bears_pic,
  cincinnati_bengals: cincinnati_bengals_pic,
  cleveland_browns: cleveland_browns_pic,
  dallas_cowboys: dallas_cowboys_pic,
  denver_broncos: denver_broncos_pic,
  detroit_lions: detroit_lions_pic,
  green_bay_packers: green_bay_packers_pic,
  houston_texans: houston_texans_pic,
  indianapolis_colts: indianapolis_colts_pic,
  jacksonville_jaguars: jacksonville_jaguars_pic,
  kansas_city_chiefs: kansas_city_chiefs_pic,
  las_vegas_raiders: las_vegas_raiders_pic,
  los_angeles_chargers: los_angeles_chargers_pic,
  los_angeles_rams: los_angeles_rams_pic,
  miami_dolphins: miami_dolphins_pic,
  minnesota_vikings: minnesota_vikings_pic,
  new_england_patriots: new_england_patriots_pic,
  new_orleans_saints: new_orleans_saints_pic,
  new_york_giants: new_york_giants_pic,
  new_york_jets: new_york_jets_pic,
  philadelphia_eagles: philadelphia_eagles_pic,
  pittsburgh_steelers: pittsburgh_steelers_pic,
  san_francisco_49ers: san_francisco_49ers_pic,
  seattle_seahawks: seattle_seahawks_pic,
  tampa_bay_buccaneers: tampa_bay_buccaneers_pic,
  tennessee_titans: tennessee_titans_pic,
  washington_commanders: washington_commanders_pic,
};

const basketballTeamsImages = {
  atlanta_hawks: atlanta_hawks_pic,
  boston_celtics: boston_celtics_pic,
  brooklyn_nets: brooklyn_nets_pic,
  charlotte_hornets: charlotte_hornets_pic,
  chicago_bulls: chicago_bulls_pic,
  cleveland_cavaliers: cleveland_cavaliers_pic,
  dallas_mavericks: dallas_mavericks_pic,
  denver_nuggets: denver_nuggets_pic,
  detroit_pistons: detroit_pistons_pic,
  golden_state_warriors: golden_state_warriors_pic,
  houston_rockets: houston_rockets_pic,
  indiana_pacers: indiana_pacers_pic,
  los_angeles_clippers: los_angeles_clippers_pic,
  los_angeles_lakers: los_angeles_lakers_pic,
  memphis_grizzlies: memphis_grizzlies_pic,
  miami_heat: miami_heat_pic,
  milwaukee_bucks: milwaukee_bucks_pic,
  minnesota_timberwolves: minnesota_timberwolves_pic,
  new_orleans_pelicans: new_orleans_pelicans_pic,
  new_york_knicks: new_york_knicks_pic,
  oklahoma_city_thunder: oklahoma_city_thunder_pic,
  orlando_magic: orlando_magic_pic,
  philadelphia_76ers: philadelphia_76ers_pic,
  phoenix_suns: phoenix_suns_pic,
  portland_trail_blazers: portland_trail_blazers_pic,
  sacramento_kings: sacramento_kings_pic,
  san_antonio_spurs: san_antonio_spurs_pic,
  toronto_raptors: toronto_raptors_pic,
  utah_jazz: utah_jazz_pic,
  washington_wizards: washington_wizards_pic,
};


/* 
TODO:
- Make a form-like UI for user to quickly get what they want.
- Improve UI with team pictures, animations etc.
- Improve mobile UI.
*/


async function initSport(sport) {
  selectedSport.value = sport;
  switch (sport) {
    case 'Baseball':
      awaySeries.value = [{}];
      setupBaseballTeamLocationDictionary();
      if (window.localStorage.getItem('selectedBaseballTeam') !== null) {
        let res = await axios.get(
          'https://sports-roadtrip-finder.vercel.app/' + window.localStorage.getItem('selectedBaseballTeam')
        );
        selectedTeam.value = res.data;
      } else {
        let res = await axios.get('https://sports-roadtrip-finder.vercel.app/toronto_blue_jays');
        selectedTeam.value = res.data;
        window.localStorage.setItem('selectedTeamName', 'toronto_blue_jays');
      }
      saveAwayGamesOnly();
      break;

    case 'Hockey':
      awaySeries.value = [{}];
      setupHockeyTeamLocationDictionary();
      if (window.localStorage.getItem('selectedHockeyTeam') !== null) {
        let res = await axios.get(
          'https://sports-roadtrip-finder.vercel.app/' + window.localStorage.getItem('selectedHockeyTeam')
        );
        selectedTeam.value = res.data;
      } else {
        let res = await axios.get('https://sports-roadtrip-finder.vercel.app/toronto_maple_leafs');
        selectedTeam.value = res.data;
        window.localStorage.setItem('selectedTeamName', 'toronto_maple_leafs');
      }
      saveAwayGamesOnly();
      break;

    case 'Football':
      awaySeries.value = [{}];
      setupFootballTeamLocationDictionary();
      if (window.localStorage.getItem('selectedFootballTeam') !== null) {
        let res = await axios.get(
          'https://sports-roadtrip-finder.vercel.app/' + window.localStorage.getItem('selectedFootballTeam')
        );
        selectedTeam.value = res.data;
      } else {
        let res = await axios.get('https://sports-roadtrip-finder.vercel.app/arizona_cardinals');
        selectedTeam.value = res.data;
        window.localStorage.setItem('selectedTeamName', 'dallas_cowboys');
      }
      saveAwayGamesOnly();
      break;

    case 'Basketball':
      awaySeries.value = [{}];
      setupBasketballTeamLocationDictionary();
      if (window.localStorage.getItem('selectedBasketballTeam') !== null) {
        let res = await axios.get(
          'https://sports-roadtrip-finder.vercel.app/' + window.localStorage.getItem('selectedBasketballTeam')
        );
        selectedTeam.value = res.data;
      } else {
        let res = await axios.get('https://sports-roadtrip-finder.vercel.app/toronto_raptors');
        selectedTeam.value = res.data;
        window.localStorage.setItem('selectedTeamName', 'toronto_raptors');
      }
      saveAwayGamesOnly();
      break;
  }
}

function setupHockeyTeamLocationDictionary() {
  hockeyTeamsList.value = [];
  teamsAndLocationDictionary.value = {};
  for (let i = 0; i < hockeyTeamInfo.teams.length; i++) {
    teamsAndLocationDictionary.value[hockeyTeamInfo.teams[i].team.displayName] = {
      name: hockeyTeamInfo.teams[i].team.name,
      longitude: hockeyTeamInfo.teams[i].longitude,
      latitude: hockeyTeamInfo.teams[i].latitude,
      neighbourTeams: [...hockeyTeamInfo.teams[i].neighbourTeams]
    };
    hockeyTeamsList.value[i] = {
      displayName: hockeyTeamInfo.teams[i].team.displayName,
      name: hockeyTeamInfo.teams[i].team.name,
      division: hockeyTeamInfo.teams[i].division
    };
    hockeyTeamsList.value = hockeyTeamsList.value.sort((a, b) => {
      return a.division < b.division;
    });
    displayNameDictionary[hockeyTeamInfo.teams[i].team.displayName] = {
      displayName: hockeyTeamInfo.teams[i].team.name
    };
  }
}

function setupBaseballTeamLocationDictionary() {
  baseballTeamsList.value = [];
  teamsAndLocationDictionary.value = {};
  for (let i = 0; i < baseballTeamInfo.teams.length; i++) {
    teamsAndLocationDictionary.value[baseballTeamInfo.teams[i].team.displayName] = {
      name: baseballTeamInfo.teams[i].team.name,
      longitude: baseballTeamInfo.teams[i].longitude,
      latitude: baseballTeamInfo.teams[i].latitude,
      neighbourTeams: [...baseballTeamInfo.teams[i].neighbourTeams]
    };
    baseballTeamsList.value[i] = {
      displayName: baseballTeamInfo.teams[i].team.displayName,
      name: baseballTeamInfo.teams[i].team.name,
      division: baseballTeamInfo.teams[i].division,
      image: baseballTeamInfo.teams[i].image
    };
    baseballTeamsList.value = baseballTeamsList.value.sort((a, b) => {
      return a.division < b.division;
    });
    displayNameDictionary[baseballTeamInfo.teams[i].team.displayName] = {
      displayName: baseballTeamInfo.teams[i].team.name
    };
  }
}

function setupFootballTeamLocationDictionary() {
  footballTeamsList.value = [];
  teamsAndLocationDictionary.value = {};
  for (let i = 0; i < footballTeamInfo.teams.length; i++) {
    teamsAndLocationDictionary.value[footballTeamInfo.teams[i].team.displayName] = {
      name: footballTeamInfo.teams[i].team.name,
      longitude: footballTeamInfo.teams[i].longitude,
      latitude: footballTeamInfo.teams[i].latitude,
      neighbourTeams: [...footballTeamInfo.teams[i].neighbourTeams]
    };
    footballTeamsList.value[i] = {
      displayName: footballTeamInfo.teams[i].team.displayName,
      name: footballTeamInfo.teams[i].team.name,
      division: footballTeamInfo.teams[i].division
    };
    footballTeamsList.value = footballTeamsList.value.sort((a, b) => {
      return a.division < b.division;
    });
    displayNameDictionary[footballTeamInfo.teams[i].team.displayName] = {
      displayName: footballTeamInfo.teams[i].team.name
    };
  }
}

function setupBasketballTeamLocationDictionary() {
  basketballTeamsList.value = [];
  teamsAndLocationDictionary.value = {};
  for (let i = 0; i < basketballTeamInfo.teams.length; i++) {
    teamsAndLocationDictionary.value[basketballTeamInfo.teams[i].team.displayName] = {
      name: basketballTeamInfo.teams[i].team.name,
      longitude: basketballTeamInfo.teams[i].longitude,
      latitude: basketballTeamInfo.teams[i].latitude,
      neighbourTeams: [...basketballTeamInfo.teams[i].neighbourTeams]
    };
    basketballTeamsList.value[i] = {
      displayName: basketballTeamInfo.teams[i].team.displayName,
      name: basketballTeamInfo.teams[i].team.name,
      division: basketballTeamInfo.teams[i].division
    };
    basketballTeamsList.value = basketballTeamsList.value.sort((a, b) => {
      return a.division < b.division;
    });
    displayNameDictionary[basketballTeamInfo.teams[i].team.displayName] = {
      displayName: basketballTeamInfo.teams[i].team.name
    };
  }
}

async function changeSelectedTeam(team, sport) {
  startingPoints.value = [{}];
  let res = await axios.get('https://sports-roadtrip-finder.vercel.app/' + team);
  selectedTeam.value = res.data;
  saveAwayGamesOnly();
  window.localStorage.setItem('selectedTeamName', team);
  switch (sport) {
    case 'baseball':
      window.localStorage.setItem('selectedBaseballTeam', team);
      break;
    case 'hockey':
      window.localStorage.setItem('selectedHockeyTeam', team);
      break;
    case 'basketball':
      window.localStorage.setItem('selectedBasketballTeam', team);
      break;
    case 'football':
      window.localStorage.setItem('selectedFootballTeam', team);
      break;
  }

}

function saveAwayGamesOnly() {
  let index = 0;
  for (let i = 1; i < selectedTeam.value.length; i++) {
    if (
      selectedTeam.value[i].HomeTeam !== selectedTeam.value[0].team &&
      selectedTeam.value[i].Location !== selectedTeam.value[i - 1].Location
    ) {
      awaySeries.value[index] = {
        seriesId: index + 1,
        team: selectedTeam.value[i].HomeTeam,
        date: selectedTeam.value[i].DateUtc,
        location: selectedTeam.value[i].Location
      };
      index++;
    }
  }
  findStartingPoints();
}

function findStartingPoints() {
  let currentTrips = [[]];
  let currentTrip = 0;
  let i = 0;
  let buffer = 0;
  while (i < awaySeries.value.length) {
    if (awaySeries.value[i] && awaySeries.value[i + 1] && teamsAndLocationDictionary.value[awaySeries.value[i].team]) {
      if (teamsAndLocationDictionary.value[awaySeries.value[i].team].neighbourTeams.filter(
        (team) => team.team === awaySeries.value[i + 1].team,
      ).length > 0) {
        currentTrips[currentTrip] = [awaySeries.value[i], awaySeries.value[i + 1]];
        buffer++;
        if (awaySeries.value[i + 2] && teamsAndLocationDictionary.value[awaySeries.value[i + 1].team].neighbourTeams.filter(
          (team) => team.team === awaySeries.value[i + 2].team,
        ).length > 0) {
          currentTrips[currentTrip] = [...currentTrips[currentTrip], awaySeries.value[i + 2]];
          buffer++;
          if (awaySeries.value[i + 3] && teamsAndLocationDictionary.value[awaySeries.value[i + 2].team].neighbourTeams.filter(
            (team) => team.team === awaySeries.value[i + 3].team,
          ).length > 0) {
            currentTrips[currentTrip] = [...currentTrips[currentTrip], awaySeries.value[i + 3]];
            buffer++;
          }
        }
        currentTrip++;
      }
      i += buffer;
      buffer = 0;
    }
    i++;
  }
  startingPoints.value = currentTrips;
}
</script>
<template>
  <img :src="logo">
  <h3 class="flex justify-evenly mb-5">Pick a Sport</h3>
  <div class="sports-form columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4">
    <div v-for="sport in sportsList" :key="sport">
      <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-5" @click="initSport(sport)">
        {{ sport }}
      </button>
    </div>
  </div>
  <h3 v-if="selectedSport !== ''" class="flex justify-evenly mb-5">Pick a Team</h3>
  <div class="baseball-form grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 "
    v-if="selectedSport === 'Baseball'">
    <div class=" flex justify-center" v-for="team in baseballTeamsList" :key="team.name">
      <button
        class="button-standard-team button-standard-team-baseball bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 mb-2"
        @click="changeSelectedTeam(team.name, 'baseball')">
        <img :src="baseballTeamsImages[team.name]" class="image-button">
        <h4>{{ team.displayName }}</h4>
      </button>
    </div>
  </div>
  <div class="hockey-form columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-6  gap-20"
    v-if="selectedSport === 'Hockey'">
    <div v-for="team2 in hockeyTeamsList" :key="hockeyTeamsList">
      <button
        class="button-standard-team button-standard-team-hockey bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mb-2"
        @click="changeSelectedTeam(team2.name, 'hockey')">
        <img :src="hockeyTeamsImages[team2.name]" class="image-button">
        <h4>{{ team2.displayName }}</h4>
      </button>
    </div>
  </div>
  <div class="football-form columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-6 "
    v-if="selectedSport === 'Football'">
    <div v-for="team3 in footballTeamsList" :key="team3.name">
      <button
        class="button-standard-team button-standard-team-football bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mb-2"
        @click="changeSelectedTeam(team3.name, 'football')">
        <img :src="footballTeamsImages[team3.name]" class="image-button">
        <h4>{{ team3.displayName }}</h4>
      </button>
    </div>
  </div>
  <div class="basketball-form columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-6 gap-20"
    v-if="selectedSport === 'Basketball'">
    <div v-for="team4 in basketballTeamsList" :key="team4.name">
      <button
        class="button-standard-team button-standard-team-basketball bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mb-2"
        @click="changeSelectedTeam(team4.name, 'basketball')">
        <img :src="basketballTeamsImages[team4.name]" class="image-button">
        <h4>{{ team4.displayName }} </h4>
      </button>
    </div>
  </div>
  <div class="trips p-5">
    <span class="" v-for="(trip, index) in startingPoints" :key="index">
      <span v-if="trip[0]">
        <p><b class="text-blue-500">Trip {{ index + 1 }}: </b></p>
        <span class="" v-for="(game, index) in trip">
          <b>{{ game.team }}</b> - {{ game.location }} -
          {{ new Date(game.date).toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST' }}
          <b v-if="index !== trip.length - 1" class="text-blue-500"> -> </b>
          <b v-if="index === trip.length - 1" class="text-blue-500">
            <br />
            <br />
          </b>
        </span>
      </span>
    </span>
  </div>
</template>

<style scoped>
.button-standard {
  width: 150px;
  height: 70px;
  border-bottom: 0.3rem;
  border-radius: 10px;
  border: 2px solid rgb(39, 39, 168);
  background: linear-gradient(145deg, #1d1d2b, #23233a);
  /* dark gradient */
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}
.sports-form {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.button-standard-team {
  width: 190px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 0.3rem;
  border-radius: 10px;
  border: 2px solid rgb(39, 39, 168);
  background: linear-gradient(145deg, #1d1d2b, #23233a);
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.button-standard-team img {
  max-height: 45px;
  border-radius: 5px;
}

.button-standard-team h4 {
  max-width: 100px;
}

.button-standard-team-football img {
  max-width: 60px;
  max-height: 40px;
}

.button-standard-team-basketball img {
  max-width: 60px;
}

.button-standard-team-baseball img {
  max-width: 70px;
}

.button-standard-team-hockey img {
  max-height: 80px;
  max-width: 70px;
}

.button-standard:hover {
  background: linear-gradient(145deg, #2a2a40, #1d1d2b);
  transform: translateY(-2px);
}

main {
  display: flex;

}



h3 {
  font-size: 1.2rem;
  color: white;
}

.main-child {
  min-height: 300px;
  width: 1200px;
}

.image-button {

  margin-right: 0px;
}
</style>
