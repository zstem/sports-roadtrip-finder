<script setup>
import { ref } from 'vue';
import axios from "axios"
import coordinatesJson from '../coordinates.json';

const awaySeries = ref([{}]);

const selectedTeam = ref([{}]);

const filteredTeamsWithMaxDistance = ref([{}]);

const selectedMaxDistance = ref(10);

const userStep = ref(1);

const currentAwaySeries = ref([{}]);

const startingPoints = ref([{}]);

const areThereStartingPoints = ref(true);

var teamsAndLocationDictionary = {};

var teamsList = [];

var displayNameDictionary = {};

async function init() {
   
  setupTeamLocationDictionary();
  if (window.localStorage.getItem('selectedTeamName') !== null) {
    let res = await axios.get("http://localhost:8888/" + window.localStorage.getItem('selectedTeamName'));
    selectedTeam.value = res.data;
  }
  else {
    let res = await axios.get("http://localhost:8888/toronto_blue_jays");
    selectedTeam.value = res.data;
    window.localStorage.setItem('selectedTeamName', 'toronto_blue_jays');
  }
  saveAwayGamesOnly();
}

function setupTeamLocationDictionary() {
  teamsList = [];
  for (let i = 0; i < coordinatesJson.teams.length; i++) {
    teamsAndLocationDictionary[coordinatesJson.teams[i].team.displayName] = { name: coordinatesJson.teams[i].team.name, longitude: coordinatesJson.teams[i].longitude, latitude: coordinatesJson.teams[i].latitude, neighbourTeams: [...coordinatesJson.teams[i].neighbourTeams] }
    teamsList[i] = { displayName: coordinatesJson.teams[i].team.displayName, name: coordinatesJson.teams[i].team.name };
    displayNameDictionary[coordinatesJson.teams[i].team.displayName] = { displayName: coordinatesJson.teams[i].team.name };
  }
}

async function changeSelectedTeam(team) {
  
  let res = await axios.get("http://localhost:8888/" + team);
  selectedTeam.value = res.data;
  saveAwayGamesOnly();
  console.log(team)
  window.localStorage.setItem('selectedTeamName', team);
}

function saveAwayGamesOnly() {
  let seriesId = 1;
  let index = 0;
  for (let i = 1; i < selectedTeam.value.length - 1; i++) {
    if (selectedTeam.value[i].HomeTeam !== selectedTeam.value[0].team && selectedTeam.value[i].Location !== selectedTeam.value[i - 1].Location) {
      awaySeries.value[index] = { seriesId: seriesId++, team: selectedTeam.value[i].HomeTeam, date: selectedTeam.value[i].DateUtc, location: selectedTeam.value[i].Location };
      index++;
    }
  }
  findStartingPoints();
  console.log(getDistance("New York Yankees", "New York Mets"));
  console.log(selectedTeam.value[0].team)
  filterResults(5, selectedTeam.value[0].team);
}

function findStartingPoints() {
  let index = 0;
  let buffer = 0;
  areThereStartingPoints.value = true;

  for (let i = 0; i < awaySeries.value.length - 1; i++) {
    if (i + buffer < awaySeries.value.length - 1) {
      if (teamsAndLocationDictionary[awaySeries.value[i + buffer].team].neighbourTeams.filter(team => team.team === awaySeries.value[i + buffer + 1].team).length > 0) {
        startingPoints.value[index] = { team: awaySeries.value[i + buffer].team, location: awaySeries.value[i + buffer].location, date: awaySeries.value[i + buffer].date, nextSeries: [{ team: awaySeries.value[i + buffer + 1].team, date: awaySeries.value[i + 1].date, location: awaySeries.value[i + buffer + 1].location }] };
        currentAwaySeries.value = awaySeries.value[i + buffer + 1];
        if (i + buffer < awaySeries.value.length - 2) {

          if (teamsAndLocationDictionary[currentAwaySeries.value.team].neighbourTeams.filter(team => team.team === awaySeries.value[i + buffer + 2].team).length > 0) {
            startingPoints.value[index] = { team: awaySeries.value[i + buffer].team, location: awaySeries.value[i + buffer].location, date: awaySeries.value[i + buffer].date, nextSeries: [{ team: awaySeries.value[i + buffer + 1].team, date: awaySeries.value[i + buffer + 1].date, location: awaySeries.value[i + buffer + 1].location }, { team: awaySeries.value[i + buffer + 2].team, date: awaySeries.value[i + buffer + 2].date, location: awaySeries.value[i + buffer + 2].location }] };
            currentAwaySeries.value = awaySeries.value[i + buffer + 2];
            buffer++;
          }
        }
        index++;
      }
    }
    else {
      buffer = 0;
    }
  }
  if (Object.keys(startingPoints.value[0]).length === 0) {
    areThereStartingPoints.value = false;
  }
}

function getDistance(team, opponent) {
  var result;
  console.log(selectedTeam.value);
  result = teamsAndLocationDictionary[team].neighbourTeams;
  result = result.filter(team => team.team === opponent);
  console.log(result)
  return result[0].distance;
}

function filterResults(maxDistance, team){
  console.log(startingPoints.value);
  console.log(getDistance(team, startingPoints.value[0].team));
  startingPoints.value = startingPoints.value.filter(s => getDistance(team, s.team) <= maxDistance);
  console.log(startingPoints.value);
};

init();

</script>

<template>
  <div class="columns-6 gap-20">
    <div class="" v-for="team in teamsList">
      <button class="button-standard bg-blue-500 hover:bg-blue-700 text-white font-bold p-5 ms-2"
        @click="changeSelectedTeam(team.name)">{{ team.displayName }}</button>
    </div>

  </div>
  <!-- <div class=" columns-5">
    <div class="main-child" v-for="series in awaySeries" :ref="awaySeries">
      <p class="">{{ series.team }} - Series: {{ series.seriesId }} - {{ new Date(series.date) }}</p>
    </div> -->
  <!-- </div> -->
  <div class="main-child">
    <div v-for="startingPoint in startingPoints" :ref="startingPoints">
      <p v-if="areThereStartingPoints === false">
        No potential road trips. Please select another team.
      </p>
      <p v-if="startingPoint.nextSeries && startingPoint.nextSeries.length === 1"><b>{{ startingPoint.team }}</b> - {{
        startingPoint.location }} - {{ new Date(startingPoint.date) }} <b class="text-blue-500">-></b> Next Series: <b>{{
    startingPoint.nextSeries[0].team }}</b> - {{ startingPoint.nextSeries[0].location }}
        - {{ new Date(startingPoint.nextSeries[0].date) }}
      </p>
      <p v-if="startingPoint.nextSeries && startingPoint.nextSeries.length === 2"><b>{{ startingPoint.team }}</b> - {{
        startingPoint.location }} - {{ new Date(startingPoint.date) }} <b class="text-blue-500">-></b> Next Series: <b>{{
    startingPoint.nextSeries[0].team }}</b> - {{ startingPoint.nextSeries[0].location }}
        - {{ new Date(startingPoint.nextSeries[0].date) }}, <b>{{ startingPoint.nextSeries[1].team }}</b> - {{
          startingPoint.nextSeries[1].location }}
        - {{ new Date(startingPoint.nextSeries[1].date) }}
      </p>
      <p v-if="startingPoint.nextSeries && startingPoint.nextSeries.length === 3"><b>{{ startingPoint.team }}</b> - {{
        startingPoint.location }} - {{ new Date(startingPoint.date) }} <b class="text-blue-500">-></b> Next Series: <b>{{
    startingPoint.nextSeries[0].team }}</b> - {{ startingPoint.nextSeries[0].location }}
        - {{ new Date(startingPoint.nextSeries[0].date) }}, <b>{{ startingPoint.nextSeries[2].team }}</b> - {{
          startingPoint.nextSeries[1].location }}
        - {{ new Date(startingPoint.nextSeries[1].date) }}, <b>{{ startingPoint.nextSeries[2].team }}</b> - {{
          startingPoint.nextSeries[2].location }}
        - {{ new Date(startingPoint.nextSeries[2].date) }}
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
}</style>
