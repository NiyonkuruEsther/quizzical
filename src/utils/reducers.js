export const reducer = (state, action) => {
  switch (action.type) {
    case "choose_options":
      return {
        ...state,
        isChoosingOptions: true,
        quizStarted: false,
        answersChecked: false,
      };

    case "replay":
      return {
        ...state,
        answersChecked: false,
        quizStarted: true,
        score: 0,
        isChoosingOptions: false,
      };

    case "start_quiz":
      return {
        ...state,
        quizStarted: true,
        isChoosingOptions: false,
        answersChecked: false,
      };

    case "restart_quiz":
      return {
        ...state,
        isChoosingOptions: true,
        answersChecked: false,
        quizStarted: false,
        score: 0,
      };

    case "display_questions":
      return { ...state, data: action.payload, loading: false };

    case "load":
      return { ...state, loading: true };

    case "set_category":
      return {
        ...state,
        category: action.payload.value,
        categoryText: action.payload.type,
        categoryOpen: false,
      };

    case "set_type":
      return {
        ...state,
        type: action.payload,
        typeText: action.payload,
        typeOpen: false,
      };

    case "set_difficulty":
      return {
        ...state,
        difficulty: action.payload,
        difficultyText: action.payload,
        difficultyOpen: false,
      };

    case "set_amount":
      return { ...state, amount: action.payload };

    case "open_category":
      return {
        ...state,
        categoryOpen: !state.categoryOpen,
        difficultyOpen: false,
        typeOpen: false,
      };

    case "open_difficulty":
      return {
        ...state,
        difficultyOpen: !state.difficultyOpen,
        categoryOpen: false,
        typeOpen: false,
      };

    case "open_type":
      return {
        ...state,
        typeOpen: !state.typeOpen,
        categoryOpen: false,
        difficultyOpen: false,
      };

    case "hide_dropdown":
      return {
        ...state,
        categoryOpen: false,
        difficultyOpen: false,
        typeOpen: false,
        isChoosingOptions: true,
      };
    case "check_answers":
      let score = 0;
      state.data.forEach((questionsData) => {
        questionsData.answers.forEach((answer) => {
          if (answer.selected && answer.item === questionsData.correct_answer) {
            score++;
          }
        });
      });
      return {
        ...state,
        answersChecked: true,
        score,
        isChoosingOptions: false,
      };
    case "show_alert_message":
      return { ...state, allAnswersSelected: false };
    case "hide_alert_message":
      return { ...state, allAnswersSelected: true };
    case "select_answer":
      let tempData = state.data?.map((questionsData) => {
        if (questionsData.id === action.payload?.questionsID) {
          let tempAnswers = questionsData?.answers?.map((answer) => {
            if (answer.id === action.payload?.answerID) {
              return { ...answer, selected: !answer.selected };
            }
            return { ...answer, selected: false };
          });
          return { ...questionsData, answers: tempAnswers };
        }
        return questionsData;
      });
      return { ...state, data: tempData };

    default:
      throw new Error("no matching action type");
  }
};
