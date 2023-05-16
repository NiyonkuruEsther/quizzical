import { useGlobalContext } from "../context/AppContext";

const Alert = () => {
  const { state } = useGlobalContext();

  return (
    <div
      className={`${
        state.quizStarted && !state.allAnswersSelected
          ? "translate-y-0 opacity-100"
          : "-translate-y-24 opacity-0"
      } p-4 max-w-[17rem] absolute top-0 right-0 left-0 mx-auto transition-all duration-300`}
    >
      <div className="w-full  bg-[#ff6666] py-2 px-6 rounded-lg text-white100  ">
        <p className="font-semibold">Please select all answers</p>
      </div>
    </div>
  );
};

export default Alert;
