import { useContext, createContext, useReducer } from "react";
import { reducer } from "../utils/reducers";
import { setQuestions } from "./GeneratingFunctions";
import { initialState } from "./InitialState";

const URL = "https://opentdb.com/api.php?";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchQuestions = async () => {
    dispatch({ type: "load" });
    try {
      const res = await fetch(
        `${URL}amount=${state.amount}${
          state.category === "any" ? "" : `&category=${state.category}`
        }${state.type === "any" ? "" : `&type=${state.type}`}${
          state.difficulty === "any" ? "" : `&difficulty=${state.difficulty}`
        }`
      );
      const data = await res.json();

      dispatch({
        type: "display_questions",
        payload: setQuestions(data.results),
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* Fisher-Yates shuffle algorithm to randomize the placement of answers */

  const getStarted = () => dispatch({ type: "choose_options" });

  const startQuiz = (e) => {
    e.preventDefault();
    fetchQuestions();
    dispatch({ type: "start_quiz" });
  };

  const playAgain = () => {
    fetchQuestions();
    dispatch({ type: "replay" });
  };

  const restartQuiz = () => {
    dispatch({ type: "restart_quiz" });
  };

  const removeUnicode = (text) => {
    const pattern = /&(#[0-9]+|[a-zA-Z]+);/g;
    return text.replace(pattern, "");
  };

  const hideDropDownMenu = () => {
    const atLeastOneOpen =
      !!state.categoryOpen || !!state.difficultyOpen || !!state.typeOpen;
    if (!atLeastOneOpen) return;
    dispatch({ type: "hide_dropdown" });
  };

  const handleClassNames = (answer, questionsData, answersChecked) => {
    let classNames;
    let correctClassNames = "";
    switch (true) {
      case answer.selected && !answersChecked:
        classNames = "bg-blue100 border-none";
        break;
      case !answer.selected && !answersChecked:
        classNames = "bg-transparent border hover:bg-blue100";
        break;
      case !answer.selected && answersChecked:
        classNames = "bg-transparent border hover:bg-none opacity-50";
        break;
      case answer.selected &&
        answersChecked &&
        answer.item === questionsData.correct_answer:
        classNames = "bg-correct border-none hover:bg-none";
        correctClassNames = "bg-correct";
        break;
      case answer.selected &&
        answersChecked &&
        answer.item !== questionsData.correct_answer:
        classNames = "bg-incorrect border-none hover:bg-none opacity-50";
        correctClassNames = questionsData.correct_answer ? "bg-correct" : "";
        console.log(questionsData.correct_answer);
        break;
      default:
        classNames = "bg-transparent border hover:bg-blue100";
        break;
    }
    return `${classNames} ${correctClassNames}`;
  };

  const selectAnswer = (answerID, questionsID) => {
    dispatch({ type: "select_answer", payload: { answerID, questionsID } });
  };

  const checkAnswers = () => {
    const answersSelected = allAnswersSelected(state.data);
    if (answersSelected < state.amount) {
      dispatch({ type: "show_alert_message" });
      return;
    }

    dispatch({ type: "check_answers" });
    dispatch({ type: "hide_alert_message" });
  };

  const allAnswersSelected = (data) => {
    let answersHeld = [];
    data.map((questionsData) => {
      return questionsData.answers.map((answer) => {
        if (answer.selected) {
          answersHeld.push(answer);
        }
      });
    });
    return answersHeld.length;
  };

  const handleNumberChange = (e) => {
    if (!isNaN(e.target.value)) {
      dispatch({ type: "set_amount", payload: e.target.value });
    }
  };

  const openDifficulty = () => {
    dispatch({ type: "open_difficulty" });
  };

  const openType = () => {
    dispatch({ type: "open_type" });
  };

  const openCategory = () => {
    dispatch({ type: "open_category" });
  };

  const handleCategory = (value, type) => {
    dispatch({ type: "set_category", payload: { value, type } });
  };

  const handleDifficulty = (value) => {
    dispatch({ type: "set_difficulty", payload: value });
  };

  const handleType = (value) => {
    dispatch({ type: "set_type", payload: value });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        getStarted,
        startQuiz,
        playAgain,
        restartQuiz,
        removeUnicode,
        handleClassNames,
        hideDropDownMenu,
        selectAnswer,
        checkAnswers,
        handleNumberChange,
        openDifficulty,
        openType,
        openCategory,
        handleCategory,
        handleDifficulty,
        handleType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
