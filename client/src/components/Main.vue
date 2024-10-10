<script setup>
import { ref } from 'vue';
import axios from 'axios';
import baseballTeamInfo from '../baseballjson/baseballTeamInfo.json';
import hockeyTeamInfo from '../hockeyjson/hockeyTeamInfo.json';

const awaySeries = ref([{}]);

const selectedTeam = ref([{}]);

const selectedSport = ref('');

const startingPoints = ref([{}]);

const teamsAndLocationDictionary = ref({});

const baseballTeamsList = ref([]);

const hockeyTeamsList = ref([]);

const sportsList = ref(['Hockey', 'Baseball', 'Basketball', 'Football']);

var displayNameDictionary = {};


/* 
TODO:
- Make a form-like UI for user to quickly get what they want.
- Improve UI with team pictures, animations etc.
- Finish importing all teams for a more complete experience regardless the state of the regular seasons.
*/


async function initSport(sport) {
  selectedSport.value = sport;
  switch (sport) {
    case 'Baseball':
      awaySeries.value = [{}];
      setupBaseballTeamLocationDictionary();
      if (window.localStorage.getItem('selectedBaseballTeam') !== null) {
        let res = await axios.get(
          'http://localhost:8888/' + window.localStorage.getItem('selectedTeamName')
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
          'http://localhost:8888/' + window.localStorage.getItem('selectedTeamName')
        );
        selectedTeam.value = res.data;
      } else {
        let res = await axios.get('http://localhost:8888/toronto_maple_leafs');
        selectedTeam.value = res.data;
        window.localStorage.setItem('selectedTeamName', 'toronto_maple_leafs');
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

async function changeSelectedTeam(team) {
  startingPoints.value = [{}];
  let res = await axios.get('http://localhost:8888/' + team);
  selectedTeam.value = res.data;
  saveAwayGamesOnly();
  window.localStorage.setItem('selectedTeamName', team);
}

function saveAwayGamesOnly() {
  let seriesId = 1;
  let index = 0;
  for (let i = 1; i < selectedTeam.value.length; i++) {
    if (
      selectedTeam.value[i].HomeTeam !== selectedTeam.value[0].team &&
      selectedTeam.value[i].Location !== selectedTeam.value[i - 1].Location
    ) {
      awaySeries.value[index] = {
        seriesId: seriesId++,
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
  console.log(teamsAndLocationDictionary.value);
  let currentTrips = [[]];
  let currentTrip = 0;
  for (let i = 0; i < awaySeries.value.length; i++) {
    if (
      teamsAndLocationDictionary.value[awaySeries.value[i].team] &&
      awaySeries.value[i + 1] &&
      teamsAndLocationDictionary.value[awaySeries.value[i].team].neighbourTeams.filter(
        (team) => team.team === awaySeries.value[i + 1].team
      ).length > 0
    ) {
      currentTrips[currentTrip] = currentTrips[currentTrip]
        ? [...currentTrips[currentTrip], awaySeries.value[i]]
        : [awaySeries.value[i]];

      if (
        awaySeries.value[i + 2] &&
        teamsAndLocationDictionary.value[awaySeries.value[i].team].neighbourTeams.filter(
          (team) => team.team === awaySeries.value[i + 1].team
        ).length > 0 &&
        teamsAndLocationDictionary.value[awaySeries.value[i + 1].team].neighbourTeams.filter(
          (team) => team.team === awaySeries.value[i + 2].team
        ).length === 0
      ) {
        currentTrips[currentTrip] = [...currentTrips[currentTrip], awaySeries.value[i + 1]];
        currentTrip++;
      }
    }
  }
  startingPoints.value = currentTrips;
}
</script>

<template>
  <div class="sportList">
    <div class="form columns-6 gap-20">
      <div class="" v-for="sport in sportsList" :ref="sportsList">
        <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-5 ms-2"
          @click="initSport(sport)">
          {{ sport }}
        </button>
      </div>
    </div>
  </div>
  <div class="baseball-form columns-6 gap-20" v-if="selectedSport === 'Baseball'">
    <div class="" v-for="team in baseballTeamsList" :ref="baseballTeamsList">
      <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-5 ms-2"
        @click="changeSelectedTeam(team.name)">
        {{ team.displayName }}
      </button>
    </div>
  </div>
  <div class="hockey-form columns-4" v-if="selectedSport === 'Hockey'">
    <div v-for="team2 in hockeyTeamsList" :ref="hockeyTeamsList">
      <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mr-2 mt-2"
        @click="changeSelectedTeam(team2.name)">
        {{ team2.displayName }}
      </button>
    </div>
  </div>
  <div class="main-child p-5">
    <span v-for="(trip, index) in startingPoints" :ref="startingPoints">
      <span v-if="trip[0]">
        <h><b class="text-blue-500">Trip {{ index + 1 }}: </b></h>
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
  width: 210px;
  height: 70px;
  border-bottom: 0.3rem;
  border-radius: 10px;
  border-color: rgb(39, 39, 168);
  border-style: solid;
}

main {
  display: flexbox;
  align-content: center;
  align-items: center;
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
