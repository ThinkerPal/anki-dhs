<template>
  <v-card class="card">
    <v-card-text rounded>
      <div>
        <a onclick="history.go(-1)" target = "_blank" rel = "norefferer noopener"> Go back</a>
      </div>
      <div>{{ deckname }}</div>
      <div style="margin: 5px" class="text-h4 text--primary">
        <span style="font-size: 3vh">Topic: {{ card.topic }}</span>
        <br />
        <br />
        <a v-bind:href="card.question" target="_blank" rel="norefferer noopener"> Question link</a>
        <br />
        <br />
        <span style="font-size: 2vh">Time: {{ card.time }} minutes</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-flex class="mb-5">
        <v-btn
          style="width: 130px; margin-right: 20px"
          text
          color="teal accent-4"
          @click="reveal = !reveal"
        >
          <span v-if="reveal">Close</span>
          <span v-else>See Answer</span>
        </v-btn>
        <v-btn rounded class="mr-4" id="easy" @click="setFamilarity(2)" large>easy</v-btn>
        <v-btn rounded class="mr-4" id="medium" @click="setFamilarity(1)" large>medium</v-btn>
        <v-btn rounded class="mr-4" id="hard" @click="setFamilarity(0)" large>hard</v-btn>
        <v-btn
          rounded
          class="float-right mr-4"
          @click="setFamilarity(card.familiarity)"
          id="next"
          large
          >next</v-btn
        >
      </v-flex>
    </v-card-actions>
    <v-expand-transition>
      <v-card v-if="reveal" class="v-card--reveal">
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">Answer</p>
          <div>
            <v-html>
              <h3 style="margin-bottom: 10px">
                <a v-bind:href="card.answer" target="_blank" rel="norefferer noopener"
                  >{{ card.answer }}
                </a>
              </h3>
              <h3></h3>
            </v-html>
          </div>
        </v-card-text>
        <v-card-actions class="pt-0"> </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script lang="js">
import Vue from "vue";
import axios from "axios";


export default Vue.extend({
  name: "anki-card",
  data() {
    return {
      card : {
        question: "",
        answer: "",
        time: "",
        topic: "",
      },
      reveal: false

    };
  },

  created () {
      this.deckid = this.$route.params.deckid;
      this.deckname = this.$route.params.deckname;
      this.initialize();
    },

  methods: {
    initialize() {
      console.log(this.deckid);
      axios.get("/decks/"+ this.deckid).then(resp => {
        console.log(resp.data);
        this.card = resp.data;
      });
    },

    setFamilarity(familiarity){
      this.card.familiarity = familiarity;
      axios.post("/decks/"+ this.deckid,this.card).then(resp=>{
        this.reveal =  false;
        this.initialize();
      });
    }
}});
</script>

<style scoped>
.card {
  width: 50%;
  margin: auto;
  margin-top: 10%;
}

.v-card--reveal {
  opacity: 1;
  width: 100%;
}

#easy:hover {
  background-color: lightgreen;
}

#medium:hover {
  background-color: lightyellow;
}

#hard:hover {
  background-color: lightpink;
}
</style>
