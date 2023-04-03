import { v4 as uuidv4 } from "uuid";

export const randomizeAnswers = (answers) => {
  for (let i = answers.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[randomIndex]] = [answers[randomIndex], answers[i]];
  }
  return answers;
};

export const setQuestions = (data) => {
  return data.map((quest) => {
    const { question, correct_answer, incorrect_answers } = quest;
    const answers = randomizeAnswers([...incorrect_answers, correct_answer]);
    return {
      id: uuidv4(),
      question,
      correct_answer,
      answers: answers.map((item) => {
        return {
          id: uuidv4(),
          item,
          selected: false,
        };
      }),
    };
  });
};
