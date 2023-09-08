
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"xstate.init": { type: "xstate.init" };
"xstate.stop": { type: "xstate.stop" };
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
          "pauseTimer": "UNFOCUSED" | "finish" | "xstate.stop";
"restart": "RESTART";
"restoreData": "RESTORE_DATA";
"setResult": "set_result";
"setUserAnswer": "finish";
"startTimer": "" | "FOCUSED";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "Focused": "";
        };
        eventsCausingServices: {
          
        };
        matchesStates: "FOCUSED_STATE" | "FOCUSED_STATE.FOCUSED" | "FOCUSED_STATE.UNFOCUSED" | "WORKING_STATE" | "WORKING_STATE.FINISHED" | "WORKING_STATE.NOT_STARTED" | "WORKING_STATE.PAUSED" | "WORKING_STATE.RESTARTING" | "WORKING_STATE.RESULT" | "WORKING_STATE.WORKING" | { "FOCUSED_STATE"?: "FOCUSED" | "UNFOCUSED";
"WORKING_STATE"?: "FINISHED" | "NOT_STARTED" | "PAUSED" | "RESTARTING" | "RESULT" | "WORKING"; };
        tags: never;
      }
  