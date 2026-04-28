export function buildUserProfile(games) {
  const formatted = games.map(game => {
    const hours = (game.playtime_forever || 0) / 60;
    const recentHours = (game.playtime_2weeks || 0) / 60;

    return {
      name: game.name,
      appid: game.appid,
      hours,
      recentHours,
    };
  });

  // ALL-TIME TOP GAMES
  const topGames = [...formatted]
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 5);

  //  RECENT GAMES (past 2 weeks)
  const recentGames = [...formatted]
    .filter(g => g.recentHours > 0) // only games actually played recently
    .sort((a, b) => b.recentHours - a.recentHours)
    .slice(0, 5);

  // summary stats
  const totalHours = formatted.reduce((sum, g) => sum + g.hours, 0);
  const avgPlaytime = formatted.length ? totalHours / formatted.length : 0;
  const recentTotal = formatted.reduce((sum, g) => sum + g.recentHours, 0);

  return {
    topGames,
    recentGames,
    totalHours: Number(totalHours.toFixed(1)),
    avgPlaytime: Number(avgPlaytime.toFixed(1)),
    recentActivity: Number(recentTotal.toFixed(1)),
    dominantPlaystyle: getPlaystyle(formatted)
  };
}


function getPlaystyle(games) {
  const totalHours = games.reduce((sum, g) => sum + g.hours, 0);

  const longGames = games.filter(g => g.hours > 50).length;
  const recentHeavy = games.filter(g => g.recentHours > 5).length;

  if (longGames >= 3) {
    return "grinder (long-session focused player)";
  }

  if (recentHeavy >= 3) {
    return "active explorer (frequent changer)";
  }

  if (totalHours < 50) {
    return "casual player";
  }

  return "balanced gamer";
}