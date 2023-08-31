
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "onActivityCompleted": "done.invoke.(machine).RESULTS:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "onActivityCompleted";
        };
        eventsCausingActions: {
          "addWord": "ADD_WORD";
"checkAnswer": "CHECK_ANSWER";
"pauseTimer": "CHECK_ANSWER" | "UNFOCUSED";
"removeWord": "REMOVE_WORD";
"startTimer": "FOCUSED";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "canAddWords": "ADD_WORD";
"correctAnswer": "";
        };
        eventsCausingServices: {
          "onActivityCompleted": "";
        };
        matchesStates: "CHECK_ANSWER" | "NOT_STARTED" | "PAUSED" | "RESULTS" | "RESULTS.CORRECT_ANSWER" | "RESULTS.WRONG_ANSWER" | "WORKING" | { "RESULTS"?: "CORRECT_ANSWER" | "WRONG_ANSWER"; };
        tags: never;
      }
  