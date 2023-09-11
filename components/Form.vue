<template>
  <div>
    <!-- Button to trigger the modal -->
    <b-container fluid>
      <b-card class="mx-auto my-3" style="max-width: 25rem;">
    <b-form>
    <label class="mr-sm-2" for="item-aappma">AAPPMA</label>
         <b-form-select required :state="Boolean(emp.aappma)" id="item-aappma" v-model="emp.aappma" :options="aappma_list" @input="getData(emp.aappma)"></b-form-select>
        <label class="mr-sm-2" for="item-an">Année</label>
          <b-form-input
            id="item-an"
            v-model="emp.an"
            :state="Boolean(emp.an)"
            required
          ></b-form-input>
          <b-form-group label="Empoissonnement">
          <b-form-radio-group
            v-model="emp.emp"
            :state="Boolean(emp.emp)"
            :options="options_emp"
            name="radio-inline"
            required
          ></b-form-radio-group>
        </b-form-group>
      </b-form>
      </b-card>
      <transition  name="fade">
      <div v-if="emp.emp">
    <b-card no-body >
      <b-tabs pills card vertical nav-wrapper-class="col-3" active-nav-item-class="bg-secondary text-dark" >
        <!-- Render Tabs, supply a unique `key` to each tab -->
        <b-tab v-for="(a,i) in emp.lieux" :key="i" title-item-class="bg-light text-dark">
          <template #title>
          <b-avatar v-if="a.type === 'Plan d\'eau'" class="mr-3" variant="primary" src="../static/pla.svg"></b-avatar>
        <b-avatar v-else class="mr-3" variant="primary" src="../static/cdo.svg"></b-avatar>
        <span class="mr-auto">{{ a.toponyme }}</span>
        </template>
         <b-tabs card>
      <b-tab title="Lieu" active>
        <b-card-text>
          <b-form inline>
        <b-form-group label="Type">
          <b-form-radio-group
            v-model="a.type"
            :options="options"
            name="radio-inline"
          ></b-form-radio-group>
              <label class="mr-sm-2" for="item-toponyme">Toponyme</label>
         <b-form-select required id="item-toponyme" v-model="a.toponyme" :options="getType(a.type)"></b-form-select>
             <label class="mr-sm-2" for="item-comm">Commune</label>
         <b-form-select required id="item-comm" v-model="a.commune" :options="comm_list"></b-form-select>
         <b-form-input v-model="a.ldit" placeholder="Entrer un lieu dit"></b-form-input>
        </b-form-group>
      </b-form>
        </b-card-text>
      </b-tab>
      <b-tab title="Dates">
        <b-card-text>
          <b-container fluid>
  <b-form-row class="mb-4" align-v="center" v-for="(e, index) in emp.lieux[i].espemp" :key="index">
  <b-col class="text-center"><label class="mb-2" v-if="index == 0">Dates</label><b-form-input size="sm" type="date" v-model="emp.lieux[i].espemp[index].date" ></b-form-input></b-col>
  <b-col class="text-center"><label class="mb-2" v-if="index == 0">Pisciculteur</label>
  <b-form-select size="sm" v-model="emp.lieux[i].espemp[index].pisci.input" :options="options_pisci" @change="emp.lieux[i].espemp[index].pisci.other_input = ''" @input="(v) => {v === 'Autre' || v === 'Autoproduction' ? emp.lieux[i].espemp[index].pisci.other = true : null}">
      </b-form-select>
      <b-form-text size="sm" class="text-center">{{emp.lieux[i].espemp[index].pisci.other_input}}</b-form-text>
      <b-overlay :show="emp.lieux[i].espemp[index].pisci.other" no-wrap >
        <template #overlay>
          <div>
            <b-form class="d-inline-flex">
          <b-form-input size="sm" v-model="emp.lieux[i].espemp[index].pisci.other_input">
            </b-form-input>
            <b-button size="sm" variant="outline-dark" @click="emp.lieux[i].espemp[index].pisci.other = false"><b-icon icon="check-square-fill"></b-icon></b-button>
            </b-form>
          </div>
        </template>
      </b-overlay></b-col>
   <b-col class="text-center"><label class="mb-2" v-if="index == 0">Espèces</label>
   <b-form-select size="sm" v-model="emp.lieux[i].espemp[index].esp.input" :options="esp_list"  @change="emp.lieux[i].espemp[index].esp.other_input = '';emp.lieux[i].espemp[index].gene = ''" @input="(v) => {v === 'Autre' ? emp.lieux[i].espemp[index].esp.other = true : null}">
      </b-form-select>
      <b-form-text size="sm" class="text-center">{{emp.lieux[i].espemp[index].esp.other_input}}</b-form-text>
      <b-overlay :show="emp.lieux[i].espemp[index].esp.other" no-wrap >
        <template #overlay>
          <div>
            <b-form class="d-inline-flex">
          <b-form-input  size="sm" v-model="emp.lieux[i].espemp[index].esp.other_input">
            </b-form-input>
            <b-button size="sm" variant="outline-dark" @click="emp.lieux[i].espemp[index].esp.other = false"><b-icon icon="check-square-fill"></b-icon></b-button>
            </b-form>
          </div>
        </template>
      </b-overlay>
   </b-col>
   <b-col class="text-center"><b-form><b-form-group><label class="mb-2" v-if="index == 0">Générations</label>
   <b-form-radio-group
            size="sm"            
            v-model="emp.lieux[i].espemp[index].gene">
            <b-form-radio
        v-for="radioOption in options_gene"
        :key="radioOption.value"
        :value="radioOption.value"
        :disabled="isRadioDisabled(i,index,radioOption.value)"
      >{{radioOption.text}}</b-form-radio>
  </b-form-radio-group></b-form-group></b-form></b-col>
   <b-col class="text-center"><label v-if="index == 0">Quantité</label><b-form-input size="sm" v-model="e.qté" type="number" :placeholder="changeUnit(e.gene)"></b-form-input></b-col>
  <b-col class="text-center" cols=1 ><b-button :class="var_haut(index)" variant="outline-none" @click="removeFormItem(a.espemp,index)"><b-icon icon="x-lg" variant="danger" font-scale="1.2"></b-icon></b-button></b-col>
</b-form-row>
</b-container>
<b-button class="text-center" variant="primary" @click="addFormItem(i)">Ajouter empoissonnement</b-button>
        </b-card-text>
      </b-tab>
      <template #tabs-end>
          <b-button class="ml-auto" variant="outline-none" @click="removeFormItem(emp.lieux,i)"><b-icon icon="trash-fill" variant="danger"></b-icon></b-button>
      </template>
    </b-tabs>
        </b-tab>

        <!-- New Tab Button (Using tabs-end slot) -->
        <template #tabs-end>
          <b-nav-item class="text-center" role="presentation" @click.prevent="showModal" href="#"><h2><b>+</b></h2></b-nav-item>
        </template>

        <!-- Render this if no tabs -->
        <template #empty>
          <div class="text-center text-muted">
           Il n'y a pas de lieux d'empoissonnements <br>
            Pour en ajouter un, utiliser le <b>+</b> sur le panneau de gauche.
          </div>
        </template>
      </b-tabs>
    </b-card>
    <b-card-group deck class="my-4">
          <b-card
        border-variant="secondary"
        header="Factures"
        header-border-variant="secondary"
        align="center"
        style="max-width: 25rem;"
        class="m-auto"
      >
        <b-card-text> <b-form-file
        ref="filesInputs" 
      v-model="selectedFiles" 
      accept=".pdf,.png,.jpg,.jpeg"
      multiple
      :state="Boolean(selectedFiles)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <!-- <div class="mt-3">Selected file: {{ selectedFile ? selectedFile.name : '' }}</div> -->
    </b-card-text>
    <!-- <b-button type="submit" @click="uploadFile">Upload</b-button> -->
      </b-card>
                <b-card
        border-variant="secondary"
        align="center"
        style="max-width: 25rem;"
        class="m-auto">
        <b-card-text> <b-button type="submit" @click="submit" variant="primary">Submit</b-button></b-card-text>
      </b-card>
    </b-card-group>
</div>
<div v-else-if="emp.emp == false">
  <b-button type="submit" @click="submit" variant="primary">Submit</b-button>
</div>
</transition>
    </b-container>
    <!-- <b-img :src="r"/> -->
  </div>
  
</template>

<script>
const mime = require('mime-types')
export default {
  data() {
    return {
      selectedFiles:[],
      piciOption:'',
      show: false,
      formItems: [],
      aappma_list: [],
      toponyme_list: {
        cdo:[],
        pdo:[]
      },
      comm_list: [],
      esp_list: [],
      aappma:'',
      unit:'',
      r:null,
      show:false,
      an:'',
      emp:{
        aappma:'',
        an:'',
        emp: null,
        lieux:[],
        files:[]
      },
      item: {
        type: '',
        toponyme: '',
        commune:'',
        ldit:'',
        espemp:[]
      },
      d: {
        date:'',
        pisci: {
          input:'',
          other:false,
          other_input:''
        },
        esp:'',
        gene:'',
        qté:''
      },
      av: [],
      options: [
        { text: "Cours d'eau", value: "Cours d'eau" },
        { text: "Plan d'eau", value: "Plan d'eau" },
      ],
        options_emp: [
        { text: "Oui", value: true },
        { text: "Non", value: false },
      ],
        options_pisci: [
        { text: "FDP49", value: "FDP49" },
        { text: "Le Tran", value: "Le Tran" },
        { text: "Autre pisciculteur (à préciser)", value: "Autre" },
        { text: "Autoproduction (à préciser)", value: "Autoproduction" },
      ],
        options_gene: [
        { text: "Juvénile", value: "Juvénile" },
        { text: "Un été", value: "Un été" },
        { text: "Deux étés et plus", value: "Deux étés et plus" },
        { text: "Adulte", value: "Adulte" },
      ]
    };
  },
  computed: {
    maxyear() {
      return this.emp.an + '-' + '12-31'
    },
    minyear() {
      return this.emp.an + '-' + '01-01'
    }
  },
  async mounted () {
    this.aappma_list= await this.$axios.get(process.env.PGREST+'v_form_emp', {
      params: {order : "nom"},
      headers: {
    "Accept-Profile": "srv_tech"
    }}).then(resp => resp.data.map(e => e.nom))
    this.esp_list = await this.$axios.get(process.env.PGREST+'v_form', {
      headers: {
    "Accept-Profile": "srv_tech"
    }}).then(resp => resp.data.map(e => {
      return {text: e.nom, value: e.nom}}))
      this.esp_list.push({ text: "Autre (à préciser)", value: "Autre" })
    //  const response = await this.$axios.get ('rpc/file', {
    //     params: {
    //       id:"39"
    //     },  responseType: 'arraybuffer',
    //     headers: {
    //       "Accept": "application/octet-stream"
    // }})
    //   const blob = new Blob([response.data], { type: 'image/png' });
    //   let v = URL.createObjectURL(blob);
    //   this.r = v
  },
  methods: {
    isRadioDisabled(i,index, ov){
      const arrmult = ['Brochet', 'Perche', 'Sandre','Black bass à grande bouche']
      const arrad = ['Gardon', 'Carpe commune', 'Tanche','Truite Fario','Truite arc-en-ciel']
      const v = this.emp.lieux[i].espemp[index].esp.input
      if (arrad.includes(v) && (ov == 'Juvénile' || ov == 'Un été' || ov == 'Deux étés et plus')) {
        this.emp.lieux[i].espemp[index].gene = 'Adulte'
        return true
      }
      else if (arrmult.includes(v) && ov == 'Adulte') {
        return true
      }
      else {return false}
    },
    var_haut(index){
      if (index == 0){
        return 'pt-4'
      }
    },
    getType(t) {
      if (t == "Cours d'eau"){
        return this.toponyme_list.cdo
      }
      else { return this.toponyme_list.pdo }
    },
    setInput(p) {
      p = this.piciOption
    },
        showOverlay(v,e) {
      // Gérer l'événement de saisie de l'option personnalisée
      const n = v == 'Autre' ? true : false
      this.show = n
    },
    changeUnit(e) {
      if (e == 'Juvénile') {
        return 'Indiv.'
      }
      else if (e == 'Un été' || e == 'Deux étés et plus' ) {
        return 'Kg'
      }
      else return ''
    },
    async getData(aappma) {

      try {
        const list_cdo= await this.$axios.get(process.env.PGREST+'rpc/nest_un', {
        params: {
          a:aappma,
          c:"Cours d'eau"
        },
        headers: {
      "Accept-Profile": "srv_tech"
      }})
        const list_pdo = await this.$axios.get(process.env.PGREST+'rpc/nest_un', {
        params: {
          a:aappma,
          c:"Plan d'eau"
        },
        headers: {
      "Accept-Profile": "srv_tech"
      }})
        const list_comm = await this.$axios.get(process.env.PGREST+'rpc/nest_un', {
        params: {
          a:aappma,
        },
        headers: {
      "Accept-Profile": "srv_tech"
      }})
        this.toponyme_list.cdo = list_cdo.data
        list_pdo.data[0] == null ? list_pdo.data[0]="Plan d'eau privé" : list_pdo.data.push("Plan d'eau privé")
        this.toponyme_list.pdo = list_pdo.data
        this.comm_list = list_comm.data.sort()
      }
      catch (error) {
        console.error("Error loading additional content:", error);
      }
    // },
    //     async getfile() {
    //     const f = await this.$axios.get('form_results', {
    //     params: {
    //       id:"eq.35",
    //       select:"file"
    //     },
    //     headers: {
    //   "Accept-Profile": "srv_tech",
    //   "Content-Type": "application/pdf"
    //   }})
    //   this.r = f[0]
    },
    async submit() {
      const filesInputs = this.$refs.filesInputs
      const files = filesInputs.files;
      try {
        const removeAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const aappma = this.emp.aappma.replace(/\s/g, '').toLowerCase()
        const arr = files.map((el,index)=> {
          const fileExtension = mime.extension(el.type);
          const i = index + 1
          const filename = removeAccents(aappma) + '_' + this.emp.an + '_' + i + '.' + fileExtension
          return {'name': el.name, 'type': el.type, 'finename': filename }
        })
        const formData = new FormData();
        formData.append('aappma', this.emp.aappma);
        formData.append('an', this.emp.an);
        files.forEach((element,index) => {
          formData.append('index', index + 1);
          formData.append('files', element);
        });
        if (files.length = 0) {
          await this.sendData(arr)
        }
        else {
          await this.sendData(arr)
          await this.uploadFiles(formData)
        }
        alert('Le formulaire a été envoyé avec succés !!! ');
      }
      catch (error) {
        console.log('File upload failed:', error);
        // Handle error here
      }
    },
    async sendData(arr){
      try {
        const obj = {content: null, date_creation: new Date().toLocaleString("fr"), aappma: this.emp.aappma}
        const data = {...this.emp, files:arr}
        obj.content = data
        const headers = {
            "Content-Profile": "srv_tech",
            "Content-type": "application/json; charset=utf-8",
          };
        const resp = await this.$axios.post(process.env.PGREST+'form_results', obj, { headers });
        return resp
      } catch (error) {
        console.log(error);
      }

    },
     async uploadFiles(data) {
      try {
        console.log(data);
        const resp = await this.$axios.post(process.env.FILESAPI + 'upload', data)
        return resp
      } catch (error) {
        console.log(error);
      }
    },
    showModal() {
      const o = { 
        type: '',
        toponyme: '',
        commune:'',
        ldit:'',
        espemp:[]
       };
      this.emp.lieux.push(o);
    },
    addFormItem(i) {
      const r = {
        date:'',
        pisci: {
          input:'',
          other:false,
          other_input:''
        },
        esp: {
          input:'',
          other:false,
          other_input:''
        },
        gene:'',
        qté:''
      }
      if (this.emp.lieux[i].espemp.length > 0){
        const id = this.emp.lieux[i].espemp.length - 1
        let d = this.emp.lieux[i].espemp[id].date
        let p = this.emp.lieux[i].espemp[id].pisci
        let h = {...r, date:d, pisci:{...p}}
        this.emp.lieux[i].espemp.push(h);
      }
      else {
        this.emp.lieux[i].espemp.push(r);
      }
    },
    removeFormItem(a,i) {
      a.splice(i, 1);
    },
    removeItem(a,i) {
      a.splice(i, 1);
    },

  },
};
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
