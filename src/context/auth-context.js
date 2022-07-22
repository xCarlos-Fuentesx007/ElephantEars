import React, { useEffect, useState } from 'react';

const url = process.env.REACT_APP_BACKEND_USERS_URL;

const ANSWER_DATA = [
  {
    name: 'Intervals',
    answers: [
      'Minor 2nd',
      'Major 2nd',
      'Minor 3rd',
      'Major 3rd',
      'Perfect 4th',
      'Tritone',
      'Perfect 5th',
      'Minor 6th',
      'Major 6th',
      'Minor 7th',
      'Major 7th',
      'Octave',
    ],
  },
  {
    name: 'Perfect Pitch',
    answers: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
  },

  {
    name: 'Chords',
    answers: [
      'Major',
      'Minor',
      'Diminished',
      'Augmented',
      'Dominant Seventh',
      'Major Seventh',
      'Minor Seventh',
    ],
  },

  {
    name: 'Scales',
    answers: [
      'Major (Ionian)',
      'Natural Minor (Aeolian)',
      'Harmonic Minor',
      'Dorian',
      'Phygian',
      'Lydian',
      'Mixolydian',
      'Locrian',
    ],
  },

  {
    name: 'Scale Degrees',
    answers: [
      '1 (do)',
      'Raised 1 (di)',
      '2 (re)',
      'Raised 2 (ri)',
      '3 (mi)',
      '4 (fa)',
      'Raised 4 (fi)',
      '5 (so)',
      'Raised 5 (si)',
      '6 (la)',
      'Raised 6 (li)',
      '7 (ti)',
    ],
  },

  {
    name: 'Chord Progressions',
    answers: ['I', 'ii', 'iii', 'IV', 'V', 'vi'],
  },

  {
    name: 'Intervals In Context',
    answers: [
      '1 (do)',
      'Raised 1 (di)',
      '2 (re)',
      'Raised 2 (ri)',
      '3 (mi)',
      '4 (fa)',
      'Raised 4 (fi)',
      '5 (so)',
      'Raised 5 (si)',
      '6 (la)',
      'Raised 6 (li)',
      '7 (ti)',
    ],
    answers2: [
      'Unison',
      'Minor 2nd',
      'Major 2nd',
      'Minor 3rd',
      'Major 3rd',
      'Perfect 4th',
      'Tritone',
      'Perfect 5th',
      'Minor 6th',
      'Major 6th',
      'Minor 7th',
      'Major 7th',
      'Octave',
    ]
  },

  {
    name: 'Melodic Dictation',
    answers: [
      '1 (do)',
      'Raised 1 (di)',
      '2 (re)',
      'Raised 2 (ri)',
      '3 (mi)',
      '4 (fa)',
      'Raised 4 (fi)',
      '5 (so)',
      'Raised 5 (si)',
      '6 (la)',
      'Raised 6 (li)',
      '7 (ti)',
    ],
  }
];

export const AuthContext = React.createContext({
  userData: [],
  isLoggedIn: false,
  token: null,
  isLoading: false,
  error: undefined,
  exercise: '',
  percentage: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  answerData: undefined,
  startedDate: undefined,
  exerciseHandler: (exerciseValue) => {},
  percentageHandler: (percentageValue) => {},
  answersHandler: (correctAnswersValue, incorrectAnswersValue) => {},
  login: (userData) => {},
  updateUser: (userData) => {},
  signup: (userData) => {},
  verifyEmail: (token) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [userData, setUserData] = useState([]);
  const [answerData, setAnswerData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [exercise, setExercise] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [startedDate, setStartedDate] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiresIn) > new Date()
    ) {
      setUserData(storedData.userData);
      setToken(storedData.token);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('userData');
    }
  }, []);

  const login = async (userData) => {
    setIsLoading(true);
    setError(undefined);
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    setIsLoading(false);
    if (responseData.message) {
      setError(responseData.message);
      return;
    }
    setIsLoggedIn(true);
    setUserData(responseData);
    setToken(responseData.token);
    const expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        token: responseData.token,
        expiresIn: expirationDate,
        userData: responseData,
      })
    );
  };

  const updateUser = async (userData) => {
    setIsLoading(true);
    setError(undefined);
    const response = await fetch(`${url}/update`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    setIsLoading(false);
    const storedData = JSON.parse(localStorage.getItem('userData'));
    storedData.userData = {
      id: userData.id,
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      email: userData.email,
      token: userData.token,
    };
    localStorage.setItem('userData', JSON.stringify(storedData));
    setUserData(storedData.userData);
  };

  const signup = async (userData) => {
    setIsLoading(true);
    setError(undefined);
    const response = await fetch(`${url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    setIsLoading(false);
    if (responseData.message) {
      setError(responseData.message);
      return;
    }
  };

  const verifyEmail = async (token) => {
    setIsLoading(true);
    setError(undefined);
    const response = await fetch(`${url}/verify-email?token=${token}`);
    const responseData = await response.json();
    setIsLoading(false);
    if (responseData.error) {
      setError(responseData.error);
      return;
    }
    setIsLoggedIn(true);
    setUserData(responseData);
    setToken(responseData.token);
    const expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        token: responseData.token,
        expiresIn: expirationDate,
        userData: responseData,
      })
    );
  };

  const exerciseHandler = (exerciseValue) => {
    const date = new Date();
    setStartedDate(date);
    setPercentage(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setExercise(exerciseValue);
    ANSWER_DATA.map((item) => {
      if (item.name === exerciseValue) {
        setAnswerData(item);
      }
    });
  };

  const percentageHandler = (percentageValue) => {
    setPercentage(percentageValue);
  };

  const answersHandler = (correctAnswersValue, incorrectAnswersValue) => {
    setCorrectAnswers(correctAnswersValue);
    setIncorrectAnswers(incorrectAnswersValue);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(undefined);
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider
      value={{
        userData: userData,
        isLoggedIn: isLoggedIn,
        token: token,
        percentage: percentage,
        exercise: exercise,
        answerData: answerData,
        correctAnswers: correctAnswers,
        incorrectAnswers: incorrectAnswers,
        startedDate: startedDate,
        answersHandler: answersHandler,
        percentageHandler: percentageHandler,
        exerciseHandler: exerciseHandler,
        login: login,
        updateUser: updateUser,
        signup: signup,
        logout: logout,
        verifyEmail: verifyEmail,
        error: error,
        isLoading: isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
