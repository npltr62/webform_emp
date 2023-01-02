<template>
    <div>
        <survey :survey="survey"></survey>
    </div>
</template>

<script>
import * as surveyVue from "survey-vue";

const surveyJSON = {
  title: "Etat des lieux de l'empoissonnement",
  pages: [
    {
      name: "page1",
      questions: [
        {
        type: "dropdown",
        name: "AAPPMA",
        title: "Quelle est ton AAPPMA",
        isRequired: true,
        colCount: 0,
        hasNone: true,
        choicesByUrl: {
        url: "https://api.fd49.synology.me:5001/aappma",
        valueName: "topooh"
      }
        },
        {
          type: "checkbox",
          choices: ["Bootstrap", "Foundation"],
          hasOther: true,
          isRequired: true,
          name: "framework",
          title: "What front-end framework do you use?",
          visibleIf: "{frameworkUsing} = 'Yes'"
        }
      ]
    },
    {
      name: "page2",
      questions: [
        {
          type: "radiogroup",
          choices: ["Yes", "No"],
          isRequired: true,
          name: "mvvmUsing",
          title: "Do you use any MVVM framework?"
        },
        {
          type: "checkbox",
          choices: ["AngularJS", "KnockoutJS", "React"],
          hasOther: true,
          isRequired: true,
          name: "mvvm",
          title: "What MVVM framework do you use?",
          visibleIf: "{mvvmUsing} = 'Yes'"
        }
      ]
    },
    {
      name: "page3",
      questions: [
        {
          type: "comment",
          name: "about",
          title:
            "Please tell us about your main requirements for Survey library"
        }
      ]
    }
  ]
};

const survey = new surveyVue.Model(surveyJSON);
survey.ChoicesRestfull.onBeforeSendRequest = function(sender, options) {
  options.request.setRequestHeader("Accept-Profile", "data_int");
};
export default {
  asyncData() {
    return {
      survey: survey,
    };
  }
};
</script>

<style scoped>
</style>
