
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
        matchesStates: "FOCUSED" | "FOCUSED.CHECK_ANSWER" | "FOCUSED.CORRECT_ANSWER" | "FOCUSED.WORKING" | "FOCUSED.WRONG_ANSWER" | "UNFOCUSED" | { "FOCUSED"?: "CHECK_ANSWER" | "CORRECT_ANSWER" | "WORKING" | "WRONG_ANSWER"; };
        tags: never;
      }
  