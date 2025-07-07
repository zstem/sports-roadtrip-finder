<script setup>
import { ref } from 'vue';
import axios from 'axios';
import baseballTeamInfo from '../baseballjson/baseballTeamInfo.json';
import hockeyTeamInfo from '../hockeyjson/hockeyTeamInfo.json';
import footballTeamInfo from '../footballjson/footballTeamInfo.json';
import basketballTeamInfo from '../basketballjson/basketballTeamInfo.json';

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
      division: baseballTeamInfo.teams[i].division
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
  <h3 class="flex justify-evenly mb-5">Pick a Sport</h3>
  <div class="sports-form yycolumns-4 mb-5 gap-20 flex justify-evenly">
    <div v-for="sport in sportsList" :key="sport">
      <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-5" @click="initSport(sport)">
        {{ sport }}
      </button>
    </div>
  </div>
  <h3 v-if="selectedSport !== ''" class="flex justify-evenly mb-5">Pick a Team</h3>
  <div class="baseball-form columns-6" v-if="selectedSport === 'Baseball'">
    <div class="" v-for="team in baseballTeamsList" :key="baseballTeamsList">
      <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mt-2"
        @click="changeSelectedTeam(team.name, 'baseball')">
        {{ team.displayName }}
      </button>
    </div>
  </div>
  <div class="hockey-form columns-8 gap-20" v-if="selectedSport === 'Hockey'">
    <div v-for="team2 in hockeyTeamsList" :key="hockeyTeamsList">
      <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mt-2"
        @click="changeSelectedTeam(team2.name, 'hockey')">
        {{ team2.displayName }}
      </button>
    </div>
  </div>
  <div class="football-form columns-8 gap-20" v-if="selectedSport === 'Football'">
    <div v-for="team3 in footballTeamsList" :key="team3.name">
      <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mr-4 mt-2"
        @click="changeSelectedTeam(team3.name, 'football')">
        {{ team3.displayName }}
      </button>
    </div>
  </div>
  <div class="basketball-form columns-6 gap-20" v-if="selectedSport === 'Basketball'">
    <div v-for="team4 in basketballTeamsList" :key="team4.name">
      <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mr-4 mt-2"
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
  border-color: rgb(39, 39, 168);
  border-style: solid;
}

main {
  display: flex;

}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.main-child {
  min-height: 300px;
}
</style>
