// get board size
const boardContainer = document.querySelector<HTMLElement>("cg-container");
// boardContainer.style.border = "5px solid red";
console.log("boardContainer", boardContainer?.style);
const boardDim = parsePx(boardContainer?.style.width ?? "");
console.log("board dimension", boardDim);
const coords = document.querySelector<HTMLElement>("coords");
console.log(coords?.className)
function parsePx(px: string): number {
  return Number(px.replace("px", ""));
}

function parseTranslate(transform: string) {
  const values = transform
    .replace("translate(", "")
    .replace(")", "")
    .replaceAll("px", "")
    .split(",");

  return {
    x: Number(values[0]?.trim()),
    y: Number(values[1]?.trim() ?? 0),
  };
}

// function getRank(coordY: number, pieceColor: string) {
//   switch (coordY) {
//     case 1:
//       return pieceColor === "black" ? "8" : "1";
//     case :
//         // statement 2
//         break;
//     case valueN:
//         // statement N
//         break;
//     default: 
//         // 
//         break;
//   }
// }

function getPieceInfo(classString: string) {
  const values = classString.split(" ");

  return {
    color: values[0]?.trim(),
    piece: values[1]?.trim(),
  };
}

const board = document.querySelector<HTMLElement>("cg-board");
console.log("board: ", board)
board?.querySelectorAll<HTMLElement>("piece").forEach((el) => {
  console.log(el);
  const piece = getPieceInfo(el.className)
  console.log("color: ", piece.color);
  console.log("piece : ", piece.piece);
  // console.log(el?.style.transform);
  const str = el?.style.transform;
  const coords = parseTranslate(str);
  const coordX = coords.x/boardDim * 8 + 1;
  const coordY = coords.y/boardDim * 8 + 1;
  console.log("coordX: ", coordX);
  console.log("coordY: ", coordY);

});
