const CODES = {
  A: 65,
  Z: 90
}

function toCell(rowIndex) {
  return function(_, colIndex) {
    return `
      <div 
        class="cell" 
        contentEditable 
        data-type="cell"
        data-row="${rowIndex-1}" 
        data-col="${colIndex}"
        data-id="${rowIndex-1}:${colIndex}"
      ></div>
    `
  }
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, info = '') {
  const resize = (info === '') ? '' : '<div class="row-resize" data-resize="row"></div>'
  return `
    <div class="row" ${(info === '') ? '' : 'data-type="resizable"'}>
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

  for (let rowIndex = 1; rowIndex < rowsCount+1; rowIndex++) {

    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(rowIndex))
      .join('')

    rows.push(createRow(cells, rowIndex))


  }

  return rows.join(' ')
}