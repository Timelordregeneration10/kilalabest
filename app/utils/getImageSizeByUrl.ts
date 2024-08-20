export default function getImageSizeByUrl(
  url: string
): Promise<{ width: number; height: number }> {
  return new Promise(function (resolve, reject) {
    let image = new Image();
    image.onload = function () {
      resolve({
        width: image.width,
        height: image.height,
      });
    };
    image.onerror = function () {
      reject(new Error("error"));
    };
    image.src = url;
  });
}
