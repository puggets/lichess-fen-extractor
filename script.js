"use strict";
const boardContainer = document.querySelector("cg-container");
const boardDim = parsePx(boardContainer?.style.width ?? "");
const coords = document.querySelector("coords");
const isFlip = getFlipState(coords?.className ?? "");
const squares = [
    ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
    ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
    ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
    ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
    ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
    ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
    ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
    ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
];
function parsePx(px) {
    return Number(px.replace("px", ""));
}
function parseTranslate(transform) {
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
function getFlipState(coords) {
    const rank = coords.split(" ")[1]?.trim();
    return rank === "rank1" ? false : true;
}
function getFile(coordX) {
    switch (coordX) {
        case 1:
            return isFlip ? "h" : "a";
        case 2:
            return isFlip ? "g" : "b";
        case 3:
            return isFlip ? "f" : "c";
        case 4:
            return isFlip ? "e" : "d";
        case 5:
            return isFlip ? "d" : "e";
        case 6:
            return isFlip ? "c" : "f";
        case 7:
            return isFlip ? "b" : "g";
        case 8:
            return isFlip ? "a" : "h";
        default:
            return "";
    }
}
function getRank(coordY) {
    switch (coordY) {
        case 1:
            return isFlip ? "1" : "8";
        case 2:
            return isFlip ? "2" : "7";
        case 3:
            return isFlip ? "3" : "6";
        case 4:
            return isFlip ? "4" : "5";
        case 5:
            return isFlip ? "5" : "4";
        case 6:
            return isFlip ? "6" : "3";
        case 7:
            return isFlip ? "7" : "2";
        case 8:
            return isFlip ? "8" : "1";
        default:
            return "";
    }
}
function getSquare(transform) {
    const coords = parseTranslate(transform);
    const coordX = coords.x / boardDim * 8 + 1;
    const coordY = coords.y / boardDim * 8 + 1;
    return getFile(coordX) + getRank(coordY);
}
function getColor(classString) {
    const values = classString.split(" ");
    return values[0]?.trim();
}
function getPiece(classString) {
    const values = classString.split(" ");
    return values[1]?.trim();
}
function getFenPiece(classString) {
    const color = getColor(classString);
    const piece = getPiece(classString);
    // WHITE UPPERCASE
    // black lowercase
    switch (piece) {
        case "pawn":
            return color === "white" ? "P" : "p";
        case "knight":
            return color === "white" ? "N" : "n";
        case "bishop":
            return color === "white" ? "B" : "b";
        case "rook":
            return color === "white" ? "R" : "r";
        case "queen":
            return color === "white" ? "Q" : "q";
        case "king":
            return color === "white" ? "K" : "k";
        default:
            return "";
    }
}
function getFen() {
    let fen = "";
    const boardState = {};
    const board = document.querySelector("cg-board");
    board?.querySelectorAll("piece").forEach((el) => {
        const fenPiece = getFenPiece(el.className);
        const square = getSquare(el.style.transform);
        boardState[square] = fenPiece;
    });
    squares.forEach((rank, i) => {
        let countEmpty = 0;
        rank.forEach((square, j) => {
            const piece = boardState[square];
            const nextPiece = boardState[squares[i]?.[j + 1] ?? ""] ?? "";
            if (piece) {
                fen += piece;
            }
            else if (!piece && !nextPiece) {
                countEmpty++;
            }
            else if (!piece && nextPiece) {
                countEmpty++;
                fen += countEmpty.toString();
                countEmpty = 0;
            }
        });
        if (countEmpty)
            fen += countEmpty.toString();
        if (i !== 7)
            fen += "/";
    });
    return fen;
}
console.log("fen:", getFen());
//# sourceMappingURL=script.js.map