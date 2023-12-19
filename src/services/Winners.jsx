const Winners = (score) => {
  let winningUsers = [];
  let topScore = -1;

  for (const user in score) {
    const scoreData = score[user];

    if (scoreData > topScore) {
      topScore = scoreData;
      winningUsers = [user];
    } else if (scoreData === topScore) {
      winningUsers.push(user);
    }
  }

  return winningUsers;
};

export default Winners;
