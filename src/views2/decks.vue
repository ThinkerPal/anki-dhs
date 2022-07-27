<template>
  <v-data-table
    
    :headers="headers"
    :items="topics"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
      
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer><h1 class="font-weight-regular">The Revision App</h1></v-spacer>
        <v-dialog
          v-model="addnew"
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
              New Deck
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Topic"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
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
        <v-dialog
          v-model="gendeck"
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
              Generate deck
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Generate deck</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-text-field
                      v-model="sample.keywords"
                      label="Keywords"
                ></v-text-field>
                <v-textarea
                  v-model="sample.passage"
                  label="Sample passage"
                ></v-textarea>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="generate"
              >
                Generate
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
    <template v-slot:[`item.actions`]="{ item }">
      <router-link to="/test" style="text-decoration: none; color: inherit;">
      <v-btn
      rounded
      color = 'success'
      style = "margin: 10px;"
      >
        Test
      </v-btn>
      </router-link> 
      <router-link :to="{ name: 'EditDeck', params: { id: item.deckid, name: item.name }}" style="text-decoration: none; color: inherit;">
      <v-btn
      rounded
      color = 'primary'
      style="margin: 10px; "
      >
        EDIT
      </v-btn></router-link>
      <v-btn
      color="error"
      rounded
        style="margin: 10px; "
        @click="deleteItem(item)"
      >
        DELETE
      </v-btn>
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
  import axios from "axios";

  export default {

    data: () => ({
      addnew: false,
      gendeck: false,
      sample: [
        {
          keywords: "",
          passage: "",
        }
      ],
      dialogDelete: false,
      headers: [
        {
          text: "Topics",
          align: "start",
          sortable: false,
          value: "name",
        },

        { text: "Actions", value: "actions", sortable: false, align: "right" },
      ],
      topics: [],
      editedIndex: -1,
      editedItem: {
        name: "",

      },
      defaultItem: {
        name: "",
        
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
        // axios.get("/decks/edit").then(resp => {

        //   this.topics = resp.data;
          
        // });
        
        
        this.topics = [
          {
            name: "Trigonometry",
            deckid: 1
          },
          {
            name: "Economics",
            deckid: 2
          },
          {
            name: "Physics",
            deckid: 3
          },
          {
            name: "Computing theory",
            deckid: 4
          },
          
        ];
      },

      editItem (item) {
        this.editedIndex = this.topics.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
        console.log(item);
      },

      deleteItem (item) {

        this.editedIndex = this.topics.indexOf(item);
        this.editedItem = Object.assign({}, item);
        console.log(this.editedItem);
        this.dialogDelete = true;
      },

      deleteItemConfirm () {
        // axios.delete("/decks/edit", {data: this.editedItem}).then(() => {
        //     this.initialize();
        // });
        this.topics.splice(this.editedIndex, 1);
        this.closeDelete();
      },

      close () {
        this.addnew = false;
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
          Object.assign(this.topics[this.editedIndex], this.editedItem);
        } else {
        //   axios.post("/decks/edit", this.editedItem).then(() => {
        //     this.initialize();
        // });

          
          this.topics.push(this.editedItem);
        }
        this.close();
      },
    },
  };
</script>
<style>
</style>