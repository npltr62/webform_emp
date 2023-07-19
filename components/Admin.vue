<template>
    <div>
      <b-container>
        <b-table
        :items="results"
        :fields="fields"
        bordered
      >
      <template #cell(check)="{value}">
        <p v-if="value"> Valide </p>
        <p v-else> En attente</p>
      </template>
              <template #cell(actions)="row">
        <b-button-group>
          <b-button type="submit" variant="danger" @click="showMsgBoxTwo(row.item,index)" size="sm">
            Supprimer
          </b-button>
          <router-link :to="{ name: 'update' }"><b-button variant="warning" size="sm" @click="editRow(row.item)" >
            Modifier
          </b-button></router-link>
          <b-button variant="success" size="sm"  @click="validateRow(row.item)" :disabled="row.item.check">
            Valider
          </b-button>

        </b-button-group>
      </template>
      </b-table>
      </b-container>
    </div>
</template>

<script>
import { EventBus } from '../plugins/EventBus';
    export default {
        data() {
        return {
            results: [],
            fields: [
                { key: 'aappma', label: 'aappma' },
                { key: 'date_creation', label: 'date de création', formatter:(value) => value ? new Date(value).toLocaleString("fr") : null},
                { key: 'date_modification', label: 'date de modification', formatter:(value) => value ? new Date(value).toLocaleString("fr") : null},
                { key: 'check', label: 'statut' },
                { key: 'actions', label: 'actions' }

            ]
        }
    },
      async fetch () {
        this.charge();
      },
      computed: {
        isDisabled() {
          return this.data 
        }
      },
      beforeDestroy() {
    EventBus.$off('data-event');
  },
       methods: {
        showMsgBoxTwo(item,index) {
        this.$bvModal.msgBoxConfirm('Etes vous sûr de vouloir supprimer cette ligne ?', {
          title: 'Confirmer SVP',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if (value){
              this.deleteRow(item,index)
            }
          })
          .catch(err => {
            // An error occurred
          })
      },
          async charge () {
        this.results = await this.$axios.get('form_results', {
        headers: {
      "Accept-Profile": "srv_tech"
      }}).then(resp => resp.data)
      },
    editRow(item) {
      // Action à effectuer lorsque le bouton "Modifier" est cliqué pour l'élément `item`
      EventBus.$emit('data-event', item);
    },
    async deleteRow(item,index) {
      // Action à effectuer lorsque le bouton "Supprimer" est cliqué pour l'élément `item`
      console.log('nine');
      await this.$axios.delete('form_results', {
        headers: {
      "Content-Profile": "srv_tech"
      },params: {
                    id: 'eq.' + item.id
                }}).then( resp => {this.charge();})
     
    },
    async validateRow(item,index) {
      // Action à effectuer lorsque le bouton "Valider" est cliqué pour l'élément `item`
      await this.$axios.patch('form_results', {check: true },{
        headers: {
      "Content-Profile": "srv_tech",
      "Content-type": "application/json; charset=utf-8",
      },params: {
                    id: 'eq.' + item.id
                }})
      this.charge();
    }
  }
        
    }
</script>

<style lang="scss" scoped>

</style>