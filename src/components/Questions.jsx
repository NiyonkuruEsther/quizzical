import { useGlobalContext } from "../context/AppContext";
import Loader from "./Loader";
import Question from "./Question";

const Questions = () => {
  const { playAgain, restartQuiz, checkAnswers, state } = useGlobalContext();

  return (
    <div className="w-full flex flex-col gap-4 max-w-xl min-h-[40rem] mx-auto pt-10 pb-9 md:px-0">
      <div
        className={`w-full flex flex-col ${
          state.loading ? "items-center justify-center" : ""
        } gap-4 min-h-[30rem]`}
      >
        {state.loading ? (
          <Loader />
        ) : (
          state.data.length &&
          state.data.map((questionsData) => {
            return (
              <Question key={questionsData.id} questionsData={questionsData} />
            );
          })
        )}
      </div>

      {!state.answersChecked ? (
        <button
          type="button"
          aria-label="Check answers"
          onClick={checkAnswers}
          aria-disabled={state.loading ? "true" : "false"}
          className={`${
            state.loading && "pointer-events-none"
          } animate-fadeIn self-center justify-self-end bg-blue200 text-center rounded-xl text-white100 w-full max-w-[10rem] py-4   text-sm font-semibold tracking-wide mt-5 transition-transform active:scale-95 sm:text-base sm:max-w-[12rem]`}
        >
          Check answers
        </button>
      ) : (
        <div className="animate-fadeIn justify-self-end w-full flex flex-col gap-6 justify-center items-center mt-5">
          <p className="  text-blue300 font-bold text-sm">
            You scored {`${state.score}/${state.amount}`} correct answers
          </p>
          <div className="flex items-center justify-center flex-wrap gap-5 w-full">
            <button
              type="button"
              aria-label="Play again"
              onClick={playAgain}
              className="self-center basis-[8.5rem] bg-blue200 text-center rounded-xl text-white100 w-full py-3   text-sm font-semibold tracking-wide transition-transform active:scale-95 sm:text-base"
            >
              Play again
            </button>
            <button
              type="button"
              aria-label="Restart quiz"
              onClick={restartQuiz}
              className="self-center basis-[8.5rem] bg-blue200 text-center rounded-xl text-white100 w-full py-3   text-sm font-semibold tracking-wide transition-transform active:scale-95 sm:text-base"
            >
              Restart quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
