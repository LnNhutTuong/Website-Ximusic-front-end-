export const shuffleArray = (array) => {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

export const buildQueue = (song, songs, shuffle) => {
  if (!shuffle) {
    return {
      queue: songs,
      currentIndex: songs.findIndex((item) => item.id === song.id),
    };
  }

  const remainSongs = songs.filter((item) => item.id !== song.id);

  const randomSongs = shuffleArray(remainSongs);

  return {
    queue: [song, ...randomSongs],
    currentIndex: 0,
  };
  // còn shuffle làm sau
};
