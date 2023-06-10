<script setup>
import schedule from '../schedule.json'

let awayGames = [];
let coordinates = [];
let uniqueAwayGames = [];
let awayTeams = [];
let count = 0;


for (let i = 0; i < schedule.length; i++) {
  coordinates[i] = schedule[i].Coordinates.split(", ");
  coordinates[i][0] = coordinates[i][0].replace(/[^\d.-]/g, '');
  coordinates[i][1] = coordinates[i][1].replace(/[^\d.-]/g, '');
  awayGames[i] = { team: schedule[i].HomeTeam, date: schedule[i].DateUtc, location: coordinates[i] };
  awayTeams[i] = schedule[i].HomeTeam;
}

console.log(awayGames);

uniqueAwayGames = awayGames.filter((game, i) => { return awayTeams.indexOf(game.team) === i; });

console.log(uniqueAwayGames);


</script>

<template>
  <div v-for="game in uniqueAwayGames">
    <p>{{ game.team }} - {{ new Date(game.date) }}</p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}
</style>
