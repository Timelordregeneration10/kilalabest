// check aiyiRemjson
const aiyiRemjson = {
  jpg: 124,
  png: 20,
  jpeg: 10,
};

const aiyiRems: Array<string> = [];
function addAiyiRems(type: "jpg" | "png" | "jpeg") {
  for (let i = 0; i < aiyiRemjson[type]; i++) {
    aiyiRems.push("/aiyiRem/" + String(i) + "." + type);
  }
}

addAiyiRems("jpg");
addAiyiRems("png");
addAiyiRems("jpeg");

const tempArray: Array<string> = [];
for (let i = 0; i < 60; i++) {
  tempArray.push("/three/gfd/" + String((i % 3) + 1) + ".webp");
}

export default aiyiRems;
// export default tempArray;
