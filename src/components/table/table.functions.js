import {range} from "@core/utils";

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($current, $target) {
  const currentId = $current.id(true)
  const targetId = $target.id(true)

  const rowsId = range(currentId.row, targetId.row)
  const colsId = range(currentId.col, targetId.col)

  return rowsId.reduce((acc, rowId) => {
    colsId.forEach(colId => {
      acc.push(`${rowId}:${colId}`)
    })
    return acc
  }, [])
}

export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
  }
  return `[data-id="${row}:${col}"]`
}
