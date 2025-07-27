// import React, { useState } from "react";
// function Question({ question, onAnswered }) {
//   const [timeRemaining, setTimeRemaining] = useState(10);
//   function handleAnswer(isCorrect) {
//     setTimeRemaining(10);
//     onAnswered(isCorrect);
//   }
//   const { id, prompt, answers, correctIndex } = question;
//   return (
//     <>
//       <h1>Question {id}</h1>
//       <h3>{prompt}</h3>
//       {answers.map((answer, index) => {
//         const isCorrect = index === correctIndex;
//         return (
//           <button key={answer} onClick={() => handleAnswer(isCorrect)}>
//             {answer}
//           </button>
//         );
//       })}
//       <h5>{timeRemaining} seconds remaining</h5>
//     </>
//   );
// }
// export default Question;

import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
    const [timeRemaining, setTimeRemaining] = useState(10);

    useEffect(() => {
        let timerID; // Declare variable in the effect scope
        
        // Function to handle the countdown logic
        const countdown = () => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    onAnswered(false);
                    return 10;
                }
                return prevTime - 1;
            });
            
            // Set up the next timeout
            timerID = setTimeout(countdown, 1000);
        };

        // Start the initial timeout
        timerID = setTimeout(countdown, 1000);

        // Cleanup function to clear any pending timeout
        return () => {
            clearTimeout(timerID);
        };
    }, [onAnswered]); // Only depend on onAnswered

    function handleAnswer(isCorrect) {
        setTimeRemaining(10);
        onAnswered(isCorrect);
    }

    const { id, prompt, answers, correctIndex } = question;

    return (
        <>
            <h1>Question {id}</h1>
            <h3>{prompt}</h3>
            {answers.map((answer, index) => {
                const isCorrect = index === correctIndex;
                return (
                    <button key={answer} onClick={() => handleAnswer(isCorrect)}>
                        {answer}
                    </button>
                );
            })}
            <h5>{timeRemaining} seconds remaining</h5>
        </>
    );
}

export default Question;