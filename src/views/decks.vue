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
                      v-model="editedItem.deckname"
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
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <router-link :to="{ name: 'Test', params: { deckid: item.deckid, deckname: item.deckname }}" style="text-decoration: none; color: inherit;">
      <v-btn
      rounded
      color = 'success'
      style = "margin: 10px;"
      >
        Test
      </v-btn>
      </router-link> 
      <router-link :to="{ name: 'EditDeck', params: { deckid: item.deckid, deckname: item.deckname }}" style="text-decoration: none; color: inherit;">
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
        @click="deleteItemConfirm(item)"
      >
        DELETE
      </v-btn>
    </template>
    <template v-slot:no-data>
      No data
    </template>
  </v-data-table>
</template>

<script>
  import axios from "axios";

  export default {

    data: () => ({
      addnew: false,
      dialogDelete: false,
      headers: [
        {
          text: "Topics",
          align: "start",
          sortable: false,
          value: "deckname",
        },

        { text: "Actions",
         value: "actions", 
         sortable: false, 
         align: "right" },
      ],
      topics: [],
      editedIndex: -1,
      editedItem: {
        deckname: "",
        deckid: -1,

      },
      defaultItem: {
        deckname: "",
        deckid:-1
        
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
        axios.get("/decks/edit").then(resp => {
          console.log(resp.data);
          this.topics = resp.data;
          //console.log(resp.data);
        });
        
        
        // this.topics = [
        //   {
        //     name: "YangChuannomretry",
        //     deckid: 1
        //   },
        //   {
        //     name: "Jansonomics",
        //     deckid: 2
        //   },
        //   {
        //     name: "Aiden Hypothesis",
        //     deckid: 3
        //   },
        //   {
        //     name: "Jerryl Theroem",
        //     deckid: 4
        //   },
          
        // ];
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

      deleteItemConfirm (item) {
        this.editedIndex = this.topics.indexOf(item);
        this.editedItem = Object.assign({}, item);
        console.log(this.editedItem);
        axios.delete("/decks/edit",  {data: this.editedItem}).then(() => {
            this.initialize();
        });
        //this.topics.splice(this.editedIndex, 1);
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
          console.log(this.editedItem);
          axios.post("/decks/edit", this.editedItem).then(() => {
            this.initialize();
        });

          
          //this.topics.push(this.editedItem);
        }
        this.close();
      },
    },
  };
</script>