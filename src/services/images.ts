export const makeImageURL = (
  publicId: number,
  width: number,
  height: number
) => {
  const urlBase = `http://....../h_${height},w_${width}/${publicId},`;
  const url = `${urlBase}/h_${height},w_${width}/${publicId}`;
  return url;
};
