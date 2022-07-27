
<template>
    <v-card
      class="card"
    >
      <v-card-text rounded >
        
        <p>Physics</p>
        <p class="text-h4 text--primary">
          {{question}}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-flex class= 'mb-5'>
        <v-btn
          style = 'width:130px; margin-right:20px;'
          text
          color="teal accent-4"
          @click="reveal = !reveal"
          
        >
          <span v-if = "reveal">Close</span>
          <span v-else>See Answer</span>
        </v-btn>
        <v-btn rounded  class = 'mr-4' id="easy" @click="difficulty = 'easy'" large>easy</v-btn>
        <v-btn rounded  class = 'mr-4' id="medium" @click="difficulty = 'medium'" large>medium</v-btn>
        <v-btn rounded  class = 'mr-4' id="hard" @click="difficulty = 'hard'" large>hard</v-btn>
        <v-btn rounded class="float-right mr-4" id="next" large >next</v-btn>
        </v-flex>
      </v-card-actions>
      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="v-card--reveal"
        >
          <v-card-text class="pb-0">
            <p class="text-h4 text--primary">
              Answer
            </p>
            <div>
              <h3 style = 'margin-bottom:10px;'>{{answer}}</h3>
              <h3></h3>
            </div>
          </v-card-text>
          <v-card-actions class="pt-0">
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
    
  
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "anki-card",
  data() {
    return {
      question:"Newton's First Law",
      answer:"Newton's First Law states that a body will remain stationary or move at a constant velocity unless acted upon by a resultant force. ",
      difficulty: "difficult",
      reveal: false,
    };
  },
});

</script>

<style scoped>
.card {
  width: 50%;
  margin: auto;
  margin-top:10%;
}

.v-card--reveal {
  opacity: 1;
  width: 100%;
}


#easy:hover {
  background-color:lightgreen;
}

#medium:hover {
  background-color: lightyellow;
}

#hard:hover {
  background-color:lightpink;
}




</style>