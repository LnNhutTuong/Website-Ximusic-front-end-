export const toSelectOptions = (data, valueKey = "id", labelKey = "name") => {
  return data.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));
};

export const toArtistOptions = (artists) => {
  return artists.map((artist) => ({
    value: artist.id,
    label: artist.artistProfile?.stageName || artist.displayName,
  }));
};
