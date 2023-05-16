import React from "react";

const MiniContext = () => {
    v
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default MiniContext;
