export const formatDateTime = timestamp => {
  if (timestamp) {
    const timeString = new Date(timestamp);
    const [date, month, time] = [
      timeString.toLocaleString("en-us", { month: "long" }),
      timeString.getMonth() + 1,
      timeString.getHours() + ":" + timeString.getMinutes()
    ];
    const finalTime = `${month} ${date} • ${time}`;
    return finalTime;
  }
};

export const resizeImage = async (img, file) => {
  const canvas = document.createElement("canvas");
  const MAX_WIDTH = 300;
  const MAX_HEIGHT = 250;
  let { width, height } = img;
  if (width > MAX_WIDTH) {
    height = Math.round((height * MAX_HEIGHT) / height);
    width = MAX_WIDTH;
  }
  if (height > MAX_HEIGHT) {
    width = Math.round(width * MAX_HEIGHT) / width;
    height = MAX_HEIGHT;
  }
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  const { type, name } = file;
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      blob.name = name;
      resolve(blob);
    }, type);
  });
  return blob;
};
