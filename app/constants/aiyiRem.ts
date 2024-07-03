// check aiyiRemjson
const aiyiRemjson = {
  jpg: 57,
  png: 3,
  jpeg: 7,
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

export default aiyiRems;
