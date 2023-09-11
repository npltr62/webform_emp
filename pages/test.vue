<template>
  <div>
    <!-- Button to trigger the modal -->
    <b-container fluid>
    <b-form inline>
    <label class="mr-sm-2" for="item-aappma">AAPPMA</label>
         <b-form-select id="item-aappma" v-model="emp.aappma" :options="aappma_list"></b-form-select>
        <label class="mr-sm-2" for="item-an">Année</label>
          <b-form-input
            id="item-an"
            v-model="emp.an"
            required
          ></b-form-input>
          <b-form-group label="Empoissonnement">
          <b-form-radio-group
            v-model="emp.emp"
            :options="options_emp"
            name="radio-inline"
          ></b-form-radio-group>
        </b-form-group>
      </b-form>
      <div>
    <b-card no-body>
      <b-tabs pills card vertical nav-wrapper-class="w-25" >
        <!-- Render Tabs, supply a unique `key` to each tab -->
        <b-tab v-for="(a,i) in emp.lieux" :key="i">
          <template #title>
          <b-avatar v-if="a.type === 'Plan d\'eau'" class="mr-3" variant="light" src="https://www.svgrepo.com/show/493923/lake.svg"></b-avatar>
        <b-avatar v-else class="mr-3" variant="light" src="https://www.svgrepo.com/show/480983/river-6.svg"></b-avatar>
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
            @input="getToponyme(a.type)"
          ></b-form-radio-group>
              <label class="mr-sm-2" for="item-toponyme">Toponyme</label>
         <b-form-select required id="item-toponyme" v-model="a.toponyme" :options="toponyme_list"></b-form-select>
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
  <b-row align-v="center" v-for="(e, index) in a.espemp" :key="index">
  <b-col><label>Dates</label><b-form-datepicker v-model="e.date" ></b-form-datepicker></b-col>
  <b-col><label>Pisciculteur</label><b-form-select v-model="selected" :options="options_pisci"></b-form-select></b-col>
   <b-col><label>Espéces</label><b-form-select v-model="selected" :options="options_esp"></b-form-select></b-col>
   <b-col><b-form-group label="Génération" v-slot="{ ariaDescribedby }">
      <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A">Juvéniles</b-form-radio>
      <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B">1 été</b-form-radio>
      <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B">2 étés et +</b-form-radio>
  </b-form-group></b-col>
   <b-col><label>Quantité</label><b-form-input type="number"></b-form-input></b-col>
  <b-col class="pt-4"><b-button variant="outline-none" @click="removeFormItem(a.espemp,index)"><b-icon icon="x-lg" variant="danger" font-scale="1.5"></b-icon></b-button></b-col>
</b-row>
          </b-container>
<b-button class="text-center" variant="primary" @click="addFormItem(a.espemp)">Ajouter empoissonnement</b-button>
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
            There are no open tabs<br>
            Open a new tab using the <b>+</b> button above.
          </div>
        </template>
      </b-tabs>
    </b-card>
</div>
    <b-form @submit.prevent="uploadFile">
      <b-form-file plain ref="fileInput" multiple v-model="selectedFile" accept=".pdf,.png,.jpg,.jpeg"></b-form-file>
      <b-button type="submit" variant="warning">Upload</b-button>
    </b-form>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-container>
    <!-- <b-img :src="r"/> -->
    {{selectedFile}}
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      selectedFile:[],
      modalShow: false,
      formItems: [],
      aappma_list: [],
      toponyme_list: [],
      comm_list: [],
      aappma:'',
      r:null,
      an:'',
      emp:{
        aappma:'',
        an:'',
        emp: null,
        lieux:[]
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
        surname:''
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
        options_pisc: [
        { text: "Oui", value: true },
        { text: "Non", value: false },
      ],
    };
  },
  async mounted () {
    this.aappma_list= await this.$axios.get('v_form_emp', {
      params: {order : "nom"},
      headers: {
    "Accept-Profile": "srv_tech"
    }}).then(resp => resp.data.map(e => e.nom))
     const response = await this.$axios.get('rpc/file', {
        params: {
          id:"67"
        },  responseType: 'arraybuffer',
        headers: {
          "Accept": "application/octet-stream"
    }})
      const blob = new Blob([response.data], { type: 'image/png' });
      let v = URL.createObjectURL(blob);
      console.log(v);
      this.r = v
  },
  methods: {
    async send (files) {
        const blob = new Blob([files[0]], { type: files[0].type });
        try {
          const headers = {
            'Content-Profile': 'srv_tech',
            'Content-Type': 'application/octet-stream',
          };
          const response = await this.$axios.post('rpc/upload_b', files, { headers });
          console.log('File uploaded successfully:', response.data);
        }
        catch (error) {
          console.log('File upload failed:', error);
          // Handle error here
        }
      // else {
      //   console.log('ok');
      // try {
      //    const headers = {
      //     'Content-Profile': 'srv_tech',
      //     'Content-Type': 'application/octet-stream',
      //   };
      //   const response = await this.$axios.post('rpc/upload_binary', files[0], { headers });
      //   console.log('File uploaded successfully:', response.data);
      // }
      // catch (error) {
      //   console.log('File upload failed:', error);
      //   // Handle error here
      // }
      // }
    },
    async getToponyme(type) {
      try {
        const list_topo = await this.$axios.get('rpc/nest_un', {
        params: {
          a:this.emp.aappma,
          c:type
        },
        headers: {
      "Accept-Profile": "srv_tech"
      }})
        const list_comm = await this.$axios.get('rpc/nest_un', {
        params: {
          a:this.emp.aappma,
        },
        headers: {
      "Accept-Profile": "srv_tech"
      }})
        this.toponyme_list = list_topo.data
        this.comm_list = list_comm.data
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
     uploadFile() {
        const fileInput = this.$refs.fileInput;
        const files = fileInput.files;
        const files_type = files.map(el => el.type)
        const files_name = fileInput.names
        console.log(files_type, fileInput);
       
const upload = multer({ dest: 'uploads/' }); // Specify the folder where uploaded files will be stored

    },
    showModal() {
      this.modalShow = true;
            const o = { 
        type: '',
        nom: '',
        espemp:[]
       };
      this.emp.lieux.push(o);
    },
    addFormItem(a) {
      const b = { ...this.d };
      a.push(b);
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
