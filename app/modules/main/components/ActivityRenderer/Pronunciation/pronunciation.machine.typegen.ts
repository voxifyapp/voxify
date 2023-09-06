
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.after(500)#(machine).STARTED": { type: "xstate.after(500)#(machine).STARTED" };
"xstate.init": { type: "xstate.init" };
"xstate.stop": { type: "xstate.stop" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: "startListening" | "stopListening";
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "startListening": "xstate.after(500)#(machine).STARTED";
"stopListening": "NOT_WORKING" | "PROCESS" | "xstate.stop";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          
        };
        matchesStates: "INITIAL" | "LISTENING" | "PROCESSED" | "STARTED";
        tags: never;
      }
  