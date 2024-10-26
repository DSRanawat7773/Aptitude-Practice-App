import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: {
    aptitude: [
      {
        id: 1,
        question: "What is 5 + 7?",
        options: ["10", "11", "12", "13"],
        correctAnswer: "12",
      },
      {
        id: 2,
        question: "What is 3 x 3?",
        options: ["6", "9", "12", "15"],
        correctAnswer: "9",
      },
      {
        id: 3,
        question: "What is the next number in the series: 2, 4, 8, 16, ...?",
        options: ["20", "24", "32", "36"],
        correctAnswer: "32",
      },
      {
        id: 4,
        question: "If x + y = 10 and x - y = 2, what is the value of x?",
        options: ["4", "6", "8", "10"],
        correctAnswer: "6",
      },
      {
        id: 5,
        question: "What percentage is 25 out of 200?",
        options: ["10%", "12.5%", "15%", "20%"],
        correctAnswer: "12.5%",
      },
      {
        id: 6,
        question: "If a rectangle has a length of 10 units and a width of 5 units, what is its area?",
        options: ["30 square units", "50 square units", "40 square units", "60 square units"],
        correctAnswer: "50 square units",
      },
      {
        id: 7,
        question: "Which of the following is a prime number?",
        options: ["1", "4", "6", "11"],
        correctAnswer: "11",
      },
      {
        id: 8,
        question: "What is the least common multiple (LCM) of 4 and 6?",
        options: ["12", "24", "8", "10"],
        correctAnswer: "12",
      },
      {
        id: 9,
        question: "How many sides does a hexagon have?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "6",
      },
      {
        id: 10,
        question: "If a bag contains 4 red balls and 6 blue balls, what is the probability of picking a red ball?",
        options: ["0.4", "0.5", "0.6", "0.7"],
        correctAnswer: "0.4",
      },
    ],
    technical: [
      {
        id: 1,
        question: "What is React?",
        options: ["Library", "Framework", "Language", "IDE"],
        correctAnswer: "Library",
      },
      {
        id: 2,
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        correctAnswer: "CSS",
      },
    ],
  },
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
});

export const selectQuestionsByCategory = (state, category) => state.questions.categories[category];
export default questionsSlice.reducer;
