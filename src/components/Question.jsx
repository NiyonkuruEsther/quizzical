import { useGlobalContext } from "../context/AppContext";

const Question = ({ questionsData }) => {
  const { removeUnicode, handleClassNames, selectAnswer, state } =
    useGlobalContext();

  return (
    <div className="animate-fadeIn only:w-full flex flex-col gap-3 pb-5 border-b border-blue100">
      <p className="text-blue300   font-bold text-base sm:text-lg">
        {removeUnicode(questionsData.question)}
      </p>
      <ul role="listbox" className="flex gap-3 w-full flex-wrap">
        {questionsData.answers.map((answer) => (
          <button
            key={answer.id}
            type="button"
            role="option"
            aria-selected={answer.selected ? "true" : "false"}
            onClick={() => {
              selectAnswer(answer.id, questionsData.id);
            }}
            aria-disabled={state.answersChecked ? "true" : "false"}
            className={`${handleClassNames(
              answer,
              questionsData,
              state.answersChecked
            )} ${
              state.answersChecked && "pointer-events-none"
            } border-blue200 rounded-xl text-blue300   text-sm font-medium min-w-[5rem] px-4 py-1 bg-blue100 transition-colors text-justify sm:text-base`}
          >
            {removeUnicode(answer.item)}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Question;
