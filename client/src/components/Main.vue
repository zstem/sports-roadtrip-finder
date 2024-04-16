<script setup>
import { ref } from 'vue';
import axios from "axios"
import baseballTeamInfo from '../baseballjson/baseballTeamInfo.json';
import hockeyTeamInfo from '../hockeyjson/hockeyTeamInfo.json';

const awaySeries = ref([{}]);

const selectedTeam = ref([{}]);

const selectedSport = ref("");

const filteredTeamsWithMaxDistance = ref([{}]);

const selectedMaxDistance = ref(10);

const userStep = ref(1);

const currentAwaySeries = ref([{}]);

const startingPoints = ref([{}]);

const areThereStartingPoints = ref(true);

const teamsAndLocationDictionary = ref({});

const hockeyTeamsAndLocationDictionary = ref({});

const baseballTeamsList = ref([]);

const hockeyTeamsList = ref([]);

const sportsList = ref(["Hockey", "Baseball", "Basketball", "Football"]);

var displayNameDictionary = {};

async function initSport(sport) {
  selectedSport.value = sport
  switch (sport) {
    case "Baseball":
      awaySeries.value = [{}]
      setupBaseballTeamLocationDictionary();
      if (window.localStorage.getItem('selectedBaseballTeam') !== null) {
        let res = await axios.get("http://localhost:8888/" + window.localStorage.getItem('selectedTeamName'));
        selectedTeam.value = res.data;
      }
      else {
        let res = await axios.get("http://localhost:8888/toronto_blue_jays");
        selectedTeam.value = res.data;
        window.localStorage.setItem('selectedTeamName', 'toronto_blue_jays');
      }
      saveAwayGamesOnly();
      break;
    case "Hockey":
      awaySeries.value = [{}]
      setupHockeyTeamLocationDictionary();
      if (window.localStorage.getItem('selectedHockeyTeam') !== null) {
        let res = await axios.get("http://localhost:8888/" + window.localStorage.getItem('selectedTeamName'));
        selectedTeam.value = res.data;
      }
      else {
        let res = await axios.get("http://localhost:8888/toronto_maple_leafs");
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
    teamsAndLocationDictionary.value[hockeyTeamInfo.teams[i].team.displayName] = { name: hockeyTeamInfo.teams[i].team.name, longitude: hockeyTeamInfo.teams[i].longitude, latitude: hockeyTeamInfo.teams[i].latitude, neighbourTeams: [...hockeyTeamInfo.teams[i].neighbourTeams] }
    hockeyTeamsList.value[i] = { displayName: hockeyTeamInfo.teams[i].team.displayName, name: hockeyTeamInfo.teams[i].team.name, division: hockeyTeamInfo.teams[i].division };
    hockeyTeamsList.value = hockeyTeamsList.value.sort((a, b) => { return a.division < b.division });
    displayNameDictionary[hockeyTeamInfo.teams[i].team.displayName] = { displayName: hockeyTeamInfo.teams[i].team.name };
  }
}

function setupBaseballTeamLocationDictionary() {
  baseballTeamsList.value = [];
  teamsAndLocationDictionary.value = {};
  for (let i = 0; i < baseballTeamInfo.teams.length; i++) {
    teamsAndLocationDictionary.value[baseballTeamInfo.teams[i].team.displayName] = { name: baseballTeamInfo.teams[i].team.name, longitude: baseballTeamInfo.teams[i].longitude, latitude: baseballTeamInfo.teams[i].latitude, neighbourTeams: [...baseballTeamInfo.teams[i].neighbourTeams] }
    baseballTeamsList.value[i] = { displayName: baseballTeamInfo.teams[i].team.displayName, name: baseballTeamInfo.teams[i].team.name, division: baseballTeamInfo.teams[i].division };
    baseballTeamsList.value = baseballTeamsList.value.sort((a, b) => { return a.division < b.division });
    displayNameDictionary[baseballTeamInfo.teams[i].team.displayName] = { displayName: baseballTeamInfo.teams[i].team.name };
  }
}

async function changeSelectedTeam(team) {
  startingPoints.value = [{}];
  let res = await axios.get("http://localhost:8888/" + team);
  selectedTeam.value = res.data;
  saveAwayGamesOnly();
  window.localStorage.setItem('selectedTeamName', team);
}

function saveAwayGamesOnly() {
  let seriesId = 1;
  let index = 0;
  for (let i = 1; i < selectedTeam.value.length; i++) {
    if (selectedTeam.value[i].HomeTeam !== selectedTeam.value[0].team && selectedTeam.value[i].Location !== selectedTeam.value[i - 1].Location) {
      awaySeries.value[index] = { seriesId: seriesId++, team: selectedTeam.value[i].HomeTeam, date: selectedTeam.value[i].DateUtc, location: selectedTeam.value[i].Location };
      index++;
    }
  }
  findStartingPoints();
}

function findStartingPoints() {
  let index = 0;
  let buffer = 0;
  areThereStartingPoints.value = true;
  for (let i = 0; i < awaySeries.value.length - 1; i++) {
    if (buffer + i < awaySeries.value.length - 1 && teamsAndLocationDictionary.value[awaySeries.value[buffer + i ].team]) {
      if (teamsAndLocationDictionary.value[awaySeries.value[buffer + i ].team].neighbourTeams.filter(team => team.team === awaySeries.value[buffer + i  + 1].team).length > 0) {
        startingPoints.value[index] = { team: awaySeries.value[buffer + i ].team, location: awaySeries.value[buffer + i ].location, date: awaySeries.value[buffer + i ].date, nextSeries: [{ team: awaySeries.value[buffer + i  + 1].team, date: awaySeries.value[buffer + i  + 1].date, location: awaySeries.value[buffer + i  + 1].location }] };
        currentAwaySeries.value = awaySeries.value[buffer + i  + 1];
        if (buffer + i  < awaySeries.value.length - 2) {
          if (teamsAndLocationDictionary.value[currentAwaySeries.value.team].neighbourTeams.filter(team => team.team === awaySeries.value[buffer + i  + 2].team).length > 0) {
            startingPoints.value[index] = { team: awaySeries.value[buffer + i ].team, location: awaySeries.value[buffer + i ].location, date: awaySeries.value[buffer + i ].date, nextSeries: [{ team: awaySeries.value[buffer + i  + 1].team, date: awaySeries.value[buffer + i  + 1].date, location: awaySeries.value[buffer + i  + 1].location }, { team: awaySeries.value[buffer + i  + 2].team, date: awaySeries.value[buffer + i  + 2].date, location: awaySeries.value[buffer + i  + 2].location }] };
            currentAwaySeries.value = awaySeries.value[buffer + i  + 2];
          }
        }
        index++;
      }
    }
  }
  if (Object.keys(startingPoints.value[0]).length === 0) {
    areThereStartingPoints.value = false;
  }
}

// function toStepTwo(sport) {
//   userStep.value = 2;
// }

// function getDistance(team, opponent) {
//   var result;
//   console.log(selectedTeam.value);
//   result = teamsAndLocationDictionary.value[team].neighbourTeams;
//   result = result.filter(team => team.team === opponent);
//   console.log(result)
//   return result[0].distance;
// }

// function filterResults(maxDistance, team){
//   console.log(startingPoints.value);
//   console.log(getDistance(team, startingPoints.value[0].team));
//   startingPoints.value = startingPoints.value.filter(s => getDistance(team, s.team) <= maxDistance);
//   console.log(startingPoints.value);
// };
</script>

<template>
  <div class="sportList">
    <div class="form columns-6 gap-20">
      <div class="" v-for="sport in sportsList" :ref="sportsList">
        <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-5 ms-2"
          @click="initSport(sport)">{{ sport }}</button>
      </div>
    </div>
  </div>
  <div class="baseball-form columns-6 gap-20" v-if="selectedSport === 'Baseball'">
    <div class="" v-for="team in baseballTeamsList" :ref="baseballTeamsList">
      <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-5 ms-2"
        @click="changeSelectedTeam(team.name)">{{ team.displayName }}</button>
    </div>
  </div>
  <div class="hockey-form columns-4" v-if="selectedSport === 'Hockey'">
    <div v-for="team2 in hockeyTeamsList" :ref="hockeyTeamsList">
      <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mr-2 mt-2"
        @click="changeSelectedTeam(team2.name)">{{ team2.displayName }}</button>
    </div>
  </div>
  <div class="main-child p-5">
    <div v-for="startingPoint in startingPoints" :ref="startingPoints">
      <p v-if="!areThereStartingPoints">
        No potential road trips. Please select another team.
      </p>
      <p v-if="areThereStartingPoints && startingPoint.date">
        <b>{{ startingPoint.team }}</b> - {{
          startingPoint.location }} - {{ (new Date(startingPoint.date).toLocaleString("en-US", {
          timeZone:
            "America/New_York"
        }) + ' EST') }} <b class="text-blue-500"> -> </b>
        <span v-for="nextSeries, index in startingPoint.nextSeries"><b>{{ nextSeries.team }}</b> - {{
          nextSeries.location }}
          - {{ new Date(nextSeries.date).toLocaleString("en-US", { timeZone: "America/New_York" }) + ' EST' }}<span
            v-if="index !== startingPoint.nextSeries.length - 1"><b class="text-blue-500"> -> </b></span>
        </span>
      </p>
    </div>
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
