const encodeBoard = (board) => board.reduce(
  (result, row, i) => 
  result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '');

const encodeParams = (params) => 
  Object.keys(params).map((key) => key + '=' + `%5B${encodeBoard(params[key])}%5D`).join('&');

export const setBoard = (difficulty) => {
  let paramLevel;
  switch (difficulty) {
    case "medium":
      paramLevel = "medium"
      break;
    case "hard":
      paramLevel = "hard"
      break;
    default:
      paramLevel = "easy";
  }
  return (dispatch) => {
    dispatch({ type: "DISPLAY_LOADING", payload: true });
    fetch(`http://sugoku.pinokio.xyz/board?difficulty=${paramLevel}`)
    .then((resp) => resp.json())
    .then((data) => {
      dispatch({
        type: "SET_BOARD",
        payload: data.board
      });
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(()=> { dispatch({ type: "HIDE_LOADING", payload: false }) })
  };
};

export const updateValue = (boards) => {
  return (dispatch) => {
    dispatch({ type: "UPDATE_BOARD", payload: boards });
  };
}

export const levelDifficulty = (newLevel) => {
  return (dispatch) => {
    dispatch({ type: "SET_LEVEL", payload: newLevel });
  };
}

export const validateGame = (result) => {
  return (dispatch) => {
    fetch(`http://sugoku.pinokio.xyz/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeParams({ board: result.boards }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({
          type: "SET_STATUS",
          payload: data.status
        });
      });
  };
}

export const solvedBoard = (solved) => { 
  return (dispatch) => {
    dispatch({ type: "DISPLAY_LOADING", payload: true });
    fetch(`https://sugoku.herokuapp.com/solve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeParams({ board: solved.boardTemplate }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({
          type: "SOLVED_BOARD",
          payload: {
            board: data.solution,
            status: data.status
          }
        });
      })
      .catch((err) => { console.log(err) })
      .finally(()=> { dispatch({ type: "HIDE_LOADING", payload: false }) })
  };
}