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
    <div class="column">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, info = '') {
  const resize = (info === '') ? '' : '<div class="row-resize" data-resize="row"></div>'
  return `
    <div class="row">
      <div class="row-info">
        ${info}
        ${resize}
      </div>
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
