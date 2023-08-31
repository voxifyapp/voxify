
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "addWord": "ADD_WORD";
"checkAnswer": "CHECK_ANSWER";
"removeWord": "REMOVE_WORD";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "canAddWords": "ADD_WORD";
"correctAnswer": "";
        };
        eventsCausingServices: {
          
        };
        matchesStates: "CHECK_ANSWER" | "RESULTS" | "RESULTS.CORRECT_ANSWER" | "RESULTS.WRONG_ANSWER" | "WORKING" | { "RESULTS"?: "CORRECT_ANSWER" | "WRONG_ANSWER"; };
        tags: never;
      }
  