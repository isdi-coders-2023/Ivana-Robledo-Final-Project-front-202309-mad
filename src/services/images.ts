export const makeImageURL = (publicId: number, width: number, height: 120) => {
  const urlBase = 'https://res.cloudinary.com/dzvjhusmj/image/upload';
  const url = `${urlBase}/h_${height},w_${width}/${publicId}`;
  return url;
};
