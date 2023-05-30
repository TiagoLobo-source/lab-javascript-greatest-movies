function getAllDirectors(moviesArray) {
    return moviesArray.map(movie => movie.director);
  }
  
  const onlyDrama = moviesArray => moviesArray.filter(movie => movie.genre.includes("Drama"));
  
  function howManyMovies(moviesArray) {
    const stevenDramaMovies = moviesArray.filter(movie =>
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
    );
    return stevenDramaMovies.length;
  }
  
  function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) {
      return 0;
    }
  
    const sum = moviesArray.reduce((total, current) => {
      if (typeof current.score === "number") {
        return total + current.score;
      }
      return total;
    }, 0);
  
    const average = sum / moviesArray.length;
    const decimals = Math.round(average * 100) / 100;
    return decimals;
  }
  
  function dramaMoviesScore(moviesArray) {
    const filteredByDrama = moviesArray.filter(movie =>
      movie.genre.includes("Drama")
    );
    return scoresAverage(filteredByDrama);
  }
  
  function orderByYear(moviesArray) {
    const copy = [...moviesArray];
  
    copy.sort((a, b) => {
      if (a.year === b.year) {
        return a.title.localeCompare(b.title);
      } else {
        return a.year - b.year;
      }
    });
    return copy;
  }
  
  function orderAlphabetically(moviesArray) {
    const sortedTitles = moviesArray.map(movie => movie.title)
      .sort((a, b) => a.localeCompare(b));
  
    return sortedTitles.slice(0, 20);
  }
  
  function turnHoursToMinutes(moviesArray) {
    return moviesArray.map(movie => {
      const duration = movie.duration.split(" ");
      let totalMinutes = 0;
  
      for (let timeFragment of duration) {
        if (timeFragment.includes("h")) {
          totalMinutes += parseInt(timeFragment) * 60;
        } else if (timeFragment.includes("min")) {
          totalMinutes += parseInt(timeFragment);
        }
      }
  
      return { ...movie, duration: totalMinutes };
    });
  }
  
  function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) {
      return null;
    }
  
    const scoresByYear = {};
    for (let movie of moviesArray) {
      if (!(movie.year in scoresByYear)) {
        scoresByYear[movie.year] = [];
      }
      scoresByYear[movie.year].push(movie.score);
    }
  
    let bestYear = null;
    let bestAverage = 0;
  
    for (let year in scoresByYear) {
      const average = scoresByYear[year].reduce((total, score) => total + score, 0) / scoresByYear[year].length;
  
      if (average > bestAverage || (average === bestAverage && year < bestYear)) {
        bestYear = year;
        bestAverage = average;
      }
    }
  
    return `The best year was ${bestYear} with an average score of ${bestAverage.toFixed(2)}`;
  }