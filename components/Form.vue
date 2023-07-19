<template>
<b-container>
  <Survey :survey="survey" />
</b-container>
</template>

<script>
import 'survey-core/defaultV2.css';
import { Model } from 'survey-core';
import "survey-core/survey.i18n";
import * as SurveyCore from "survey-core";
import { Survey } from 'survey-vue-ui';

const surveyJSON = {
  title: "Etat des lieux de l'empoissonnement",
  pages: [
    {
      name: "page1",
      elements: [
        {
        type: "dropdown",
        name: "aappma",
        title: "Quelle est ton AAPPMA",
        isRequired: true,
        colCount: 0,
        hasNone: false,
        choicesByUrl: {
          url: "https://api.fd49.synology.me:5001/v_form_emp?order=nom",
          valueName: "nom"
        }
        },
        {
          isRequired: true,
          type: "text",
          name: "an",
          inputType: "number",
          title: "Année",
          defaultValueExpression: "{survey_year}",
          startWithNewLine: false,
        },
        {
          isRequired: true,
          type: "boolean",
          name: "emp",
          title: "Avez vous effectué au moins un empoissonnement au cours de l'année {an} ?",
          labelTrue: "Oui",
          labelFalse: "Non",
          renderAs: "radio",
          startWithNewLine: false,
        },
          {
            "type": "paneldynamic",
            "name": "relatives",
            "title": "Lieu d'empoissonnement",
            "renderMode": "progressTop",
            visibleIf: "{emp}='True'",
            // "templateTitle": "#{panelIndex}. Information about: {panel.relativeType}",
            "templateElements": [
              {
                "name": "type",
                "type": "radiogroup",
                "title": "Type",
                "startWithNewLine": false,
                "isRequired": true,
                "colCount": 0,
                "choices": [
                  "Cours d'eau",
                  "Plan d'eau"
                ]
              },
              {
                "name": "toponyme",
                "type": "dropdown",
                "title": "Toponyme du {panel.type}",
                "startWithNewLine": false,
                "isRequired": true,
                choicesByUrl: {
                  url: "https://api.fd49.synology.me:5001/rpc/nest_un?a={aappma}&c={panel.type}",
                }
              },
                             {
                isRequired: true,
                "type": "dropdown",
                name: "Comm_del",
                title: "Commune",
                startWithNewLine: true,
                choicesByUrl: {
                  url: "https://api.fd49.synology.me:5001/rpc/nest_un?a={aappma}",
                }
              },
               {
                isRequired: false,
                type: "text",
                name: "Lieu_dit",
                title: "Lieu-dit",
                startWithNewLine: false,
              },
              {
                "type": "panel",
                "name": "moreInfo",
                "state": "expanded",
                "title": "Espéces déversées dans : {panel.toponyme}",
                "elements": [
                  {
                    "type": "matrixdynamic",
                    "name": "espdev",
                    // "title": "Espéces déversées",
                    "rowCount": 0,
                    "addRowText": "Ajouter une date",
                    "titleLocation": "hidden",
                    "columns": [
                      {
                        "name": "date",
                        "cellType": "text",
                        "title": "Date",
                        "inputType": "date",
                        "defaultValueExpression": "today()",
                        "isRequired": true
                      },
                      {
                        "name": "fournisseur",
                        "title": "Pisciculteur",
                        "cellType": "dropdown",
                        "isRequired": true,
                        "showOtherItem": true,
                        "choices": [ "FDP49", "Le Tran"]
                      },
                      {
                        "name": "esp",
                        "cellType": "dropdown",
                        "title": "Espèces",
                          choicesByUrl: {
                  url: "https://api.fd49.synology.me:5001/v_form",
                  valueName: "nom"
                },
                        "showOtherItem": true,
                        "isRequired": true
                      },
                      {
                        "name": "generation",
                        "cellType": "radiogroup",
                        "title": "Génération",
                        "startWithNewLine": false,
                        "isRequired": true,
                        "colCount": 0,
                        "choices": [
                          "Juvéniles",
                          "Un été",
                          "Deux étés et plus"
                        ]
                      },              
                      {
                        "cellType": "text",
                        "name": "quant",
                        "inputType": "number",
                        "title": "Quantité",
                        "isRequired": true,
                        "startWithNewLine": false,
                      },
                       {
                        "cellType": "expression",
                        name: "",
                        "expression": "displayText('generation')",
                        "showHeader": false,
                      },                     
                    ]
                  }
                ]
              }
            ],
            "panelCount": 1,
            "panelAddText": "Ajouter un lieu d'empoissonnement",
            "panelRemoveText": "Supprimer l'empoissonnement"
          }
         ]
      }
      ]
};
            SurveyCore.ChoicesRestfull.onBeforeSendRequest = function(sender, options) {
  options.request.setRequestHeader("Accept-Profile", "srv_tech");
};

    const survey = new Model(surveyJSON);

function displayText(params) {
  if (!params && params.length !== 1) return null;
var question = !!this.row
        ? this.row.getQuestionByColumnName(params[0])
        : null;
    //if we can't find a question inside the cell (by row and column name) then return
    if (!question) return " ";
    //get the selected item/choice
    var selItem = question.value;
    if (selItem =='Juvéniles'){
      return 'INDIVIDUS'
    }
    else if (selItem == 'Un été' || selItem == 'Deux étés et plus' ){
      return 'KG'
    }
    else {
      return ""
    }
}
SurveyCore.FunctionFactory.Instance.register("displayText", displayText);
    survey.locale = "fr";
    survey.setVariable("currentyear", new Date().getFullYear());
    survey.setVariable("survey_year", new Date().getFullYear()-1);

export default {
  name: 'Form',
  components: {
    Survey
  },
   data() {
    return {
      survey
    }
  },
  async mounted () {
     survey.onComplete.add((sender, options) => {
      // Display the "Saving..." message (pass a string value to display a custom message)
      console.log(new Date().toLocaleString("fr"));
      var obj = {content: null, date_creation: new Date(), aappma: sender.data.aappma}
      obj.content = sender.data
       this.$axios.post(
          "form_results",
          obj,
          {
            headers: {
              "Content-Profile": "srv_tech",
              "Content-type": "application/json; charset=utf-8",
            },
          }
        )
        .then((resp) => {
          options.showSaveSuccess();
        })
        .catch((error) => {
          options.showSaveError();
        });
    });
  },
methods: {

}
}
</script>