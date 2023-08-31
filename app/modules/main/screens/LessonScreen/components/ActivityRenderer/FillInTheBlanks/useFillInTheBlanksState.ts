// /* eslint-disable @typescript-eslint/no-unused-vars */
// import {
//   FillInTheBlanksActivityAnswer,
//   FillInTheBlanksAnswerErrorsType,
// } from '@voxify/common/activities/fill-in-the-blanks-activity';

// export enum States {
//   UNFOCUSED = 'UNFOCUSED',
//   FOCUSED = 'FOCUSED',
// }

// type FillInTheBlanksState = {
//   state: States;
//   userAnswer: FillInTheBlanksActivityAnswer;
//   answerErrors: FillInTheBlanksAnswerErrorsType | null;
// };

// export enum ActionTypes {
//   FOCUS = 'FOCUS',
// }

// type Action = { type: ActionTypes.FOCUS; payload: { blank: string } };

// export const useFillInTheBlanksState = () => {
//   const initialState: FillInTheBlanksState = {
//     state: States.UNFOCUSED,
//     userAnswer: {},
//     answerErrors: null,
//   };

//   const reducer = (state: FillInTheBlanksState, action) => {};

//   const [state, dispatch] = React.useReducer(reducer, initialState);
// };
