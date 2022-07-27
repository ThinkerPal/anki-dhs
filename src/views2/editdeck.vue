<template>
<v-data-table
    :headers="headers"
    :items="cards"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{ $route.params.name }}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.question"
                      label="Question"
                    ></v-text-field>
                    <v-textarea
                      class="text-wrap"
                      v-model="editedItem.answer"
                      label="Answer"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.answer="{ item }">
        <div class="answer">
          {{item.answer}}
        </div>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "editdeck",
  created(){
     this.deckid = this.$route.params.id;
     this.deckname = this.$route.params.name;
  },

  data: () => ({
      dialog: false,
      dialogDelete: false,
      

      headers: [
        {
          text: "Question",
          align: "start",
          sortable: false,
          value: "question",
          width: "250px",
        },
        {
          text: "Answer",
          align: "start",
          sortable: false,
          value: "answer",
        },
        { text: "Actions", value: "actions", sortable: false, align: "end", },
      ],
      cards: [],
      editedIndex: -1,
      editedItem: {
        question: "",
        answer: "",
      },
      defaultItem: {
        question: "",
        answer: "",
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? "New Question" : "Edit Question";
      },
    },

    watch: {
      dialog (val) {
        val || this.close();
      },
      dialogDelete (val) {
        val || this.closeDelete();
      },
    },

    created () {
      this.initialize();
    },

    methods: {
      initialize () {
        this.cards = [
          {
            question: "Newton's First Law",
            answer: "Newton's First Law states that a body will remain stationary or move at a constant velocity unless acted upon by a resultant force. ",
          },
          {
            question: "Conservation of energy",
            answer: "The law of conservation of energy states that energy can neither be created nor destroyed - only converted from one form of energy to another.",
          },
        ];
      },

      editItem (item) {
        this.editedIndex = this.cards.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem (item) {
        this.editedIndex = this.cards.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm () {
        this.cards.splice(this.editedIndex, 1);
        this.closeDelete();
      },

      close () {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      closeDelete () {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.cards[this.editedIndex], this.editedItem);
        } else {
          this.cards.push(this.editedItem);
        }
        this.close();
      },
    },
  });

</script>

<style>
.answer {
  width: 600px; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
}
</style>