export const getPlayer = (playerName) => {
  return {
    type: "GET_PLAYER",
    payload: playerName
  }
}