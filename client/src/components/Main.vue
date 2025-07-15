<script setup>
import { ref } from 'vue';
import axios from 'axios';
import baseballTeamInfo from '../baseballjson/baseballTeamInfo.json';
import hockeyTeamInfo from '../hockeyjson/hockeyTeamInfo.json';
import footballTeamInfo from '../footballjson/footballTeamInfo.json';
import basketballTeamInfo from '../basketballjson/basketballTeamInfo.json';
import logo from '../assets/srtf_logo.png';
import logo_off from '../assets/srtf_logo.svg';

import arizona_diamondbacks_pic from '../assets/arizona_diamondbacks.png';
import atlanta_braves_pic from '../assets/atlanta_braves.png';
import baltimore_orioles_pic from '../assets/baltimore_orioles.png';
import boston_red_sox_pic from '../assets/boston_red_sox.png';
import chicago_cubs_pic from '../assets/chicago_cubs.png';
import chicago_white_sox_pic from '../assets/chicago_white_sox.png';
import cincinnati_reds_pic from '../assets/cincinatti_reds.png';
import cleveland_guardians_pic from '../assets/cleveland_guardians.png';
import colorado_rockies_pic from '../assets/colorado_rockies.png';
import detroit_tigers_pic from '../assets/detroit_tigers.png';
import houston_astros_pic from '../assets/houston_astros.png';
import kansas_city_royals_pic from '../assets/kansas_city_royals.png';
import los_angeles_angels_pic from '../assets/los_angeles_angels.png';
import los_angeles_dodgers_pic from '../assets/los_angeles_dodgers.png';
import miami_marlins_pic from '../assets/miami_marlins.png';
import milwaukee_brewers_pic from '../assets/milwaukee_brewers.png';
import minnesota_twins_pic from '../assets/minnesota_twins.png';
import new_york_mets_pic from '../assets/new_york_mets.png';
import new_york_yankees_pic from '../assets/new_york_yankees.png';
import athletics_pic from '../assets/athletics.png';
import philadelphia_phillies_pic from '../assets/philidelphia_phillies.png';
import pittsburgh_pirates_pic from '../assets/pittsburgh_pirates.png';
import san_diego_padres_pic from '../assets/san_diego_padres.png';
import san_francisco_giants_pic from '../assets/san_fransisco_giants.png';
import seattle_mariners_pic from '../assets/seattle_mariners.png';
import st_louis_cardinals_pic from '../assets/st_louis_cardinals.png';
import tampa_bay_rays_pic from '../assets/tampa_bay_rays.png';
import texas_rangers_pic from '../assets/texas_rangers.png';
import toronto_blue_jays_pic from '../assets/toronto_blue_jays.png';
import washington_nationals_pic from '../assets/washington_nationals.png';

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


/* 
TODO:
- Make a form-like UI for user to quickly get what they want.
- Improve UI with team pictures, animations etc.
*/


async function initSport(sport) {
  selectedSport.value = sport;
  switch (sport) {
    case 'Baseball':
      awaySeries.value = [{}];
      setupBaseballTeamLocationDictionary();
      if (window.localStorage.getItem('selectedBaseballTeam') !== null) {
        let res = await axios.get(
          'http://localhost:8888/' + window.localStorage.getItem('selectedBaseballTeam')
        );
        selectedTeam.value = res.data;
      } else {
        let res = await axios.get('http://localhost:8888/toronto_blue_jays');
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
          'http://localhost:8888/' + window.localStorage.getItem('selectedHockeyTeam')
        );
        selectedTeam.value = res.data;
      } else {
        let res = await axios.get('http://localhost:8888/toronto_maple_leafs');
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
          'http://localhost:8888/' + window.localStorage.getItem('selectedFootballTeam')
        );
        selectedTeam.value = res.data;
      } else {
        let res = await axios.get('http://localhost:8888/arizona_cardinals');
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
          'http://localhost:8888/' + window.localStorage.getItem('selectedBasketballTeam')
        );
        selectedTeam.value = res.data;
      } else {
        let res = await axios.get('http://localhost:8888/toronto_raptors');
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
  let res = await axios.get('http://localhost:8888/' + team);
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
  <div class="sports-form columns-4 mb-5 gap-20 flex justify-evenly">
    <div v-for="sport in sportsList" :key="sport">
      <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-5" @click="initSport(sport)">
        {{ sport }}
      </button>
    </div>
  </div>
  <h3 v-if="selectedSport !== ''" class="flex justify-evenly mb-5">Pick a Team</h3>
  <div class="baseball-form columns-6" v-if="selectedSport === 'Baseball'">
    <div class="" v-for="team in baseballTeamsList" :key="team.name">
      <button class="button-standard-team bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 mb-2"
        @click="changeSelectedTeam(team.name, 'baseball')">
        <img :src="baseballTeamsImages[team.name]" class="image-button">
        {{ team.displayName }}
      </button>
    </div>
  </div>
  <div class="hockey-form columns-6 gap-20" v-if="selectedSport === 'Hockey'">
    <div v-for="team2 in hockeyTeamsList" :key="hockeyTeamsList">
      <button class="button-standard-team bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mb-2"
        @click="changeSelectedTeam(team2.name, 'hockey')">
        {{ team2.displayName }}
      </button>
    </div>
  </div>
  <div class="football-form columns-6" v-if="selectedSport === 'Football'">
    <div v-for="team3 in footballTeamsList" :key="team3.name">
      <button class="button-standard-team bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mb-2"
        @click="changeSelectedTeam(team3.name, 'football')">
        {{ team3.displayName }}
      </button>
    </div>
  </div>
  <div class="basketball-form columns-6 gap-20" v-if="selectedSport === 'Basketball'">
    <div v-for="team4 in basketballTeamsList" :key="team4.name">
      <button class="button-standard-team bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mb-2"
        @click="changeSelectedTeam(team4.name, 'basketball')">
        {{ team4.displayName }}
      </button>
    </div>
  </div>
  <div class="main-child p-5">
    <span v-for="(trip, index) in startingPoints" :key="index">
      <span v-if="trip[0]">
        <p><b class="text-blue-500">Trip {{ index + 1 }}: </b></p>
        <span v-for="(game, index) in trip">
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
  background: linear-gradient(145deg, #1d1d2b, #23233a); /* dark gradient */
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.button-standard-team {
  width: 190px;
  height: 60px;
  gap: 0px;  
  display: flex;
  justify-content: center; 
  align-items: center;
  border-bottom: 0.3rem;
  border-radius: 10px;
  border: 2px solid rgb(39, 39, 168);
  background: linear-gradient(145deg, #1d1d2b, #23233a); /* dark gradient */
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.button-standard-team img {
  width: 75px;
  min-width: 75px;
  height: auto;
  
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
