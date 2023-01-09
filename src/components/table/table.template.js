const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
    <div class="cell" contentEditable></div>
  `
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `
}

function createRow(content, info = '') {
  return `
    <div class="row">
      <div class="row-info">${info}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

  rows.push(createRow(cols))

  for (let i = 1; i < rowsCount+1; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

    rows.push(createRow(cells, i))
  }

  return rows.join(' ')
}

// <div className="row">
//   <div className="row-info"></div>
//   <div className="row-data">
//     <div className="column">
//       A
//     </div>
//     <div className="column">
//       B
//     </div>
//     <div className="column">
//       C
//     </div>
//   </div>
// </div>
// <div className="row">
//   <div className="row-info">
//     1
//   </div>
//   <div className="row-data">
//     <div className="cell selected" contentEditable>A1</div>
//     <div className="cell" contentEditable>B1</div>
//     <div className="cell" contentEditable>C1</div>
//   </div>
// </div>
// <div className="row">
//   <div className="row-info">
//     2
//   </div>
//   <div className="row-data">
//     <div className="cell selected" contentEditable>A2</div>
//     <div className="cell" contentEditable>B2</div>
//     <div className="cell" contentEditable>C2</div>
//   </div>
// </div>
// <div className="row">
//   <div className="row-info">
//     3
//   </div>
//   <div className="row-data">
//     <div className="cell selected" contentEditable>A3</div>
//     <div className="cell" contentEditable>B3</div>
//     <div className="cell" contentEditable>C3</div>
//   </div>
// </div>