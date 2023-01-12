import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()

  const type = $resizer.data.resize

  const colNum = $parent.data.col
  const cellsInCurrentCol = $root.findAll(
    `.row:not(:nth-child(1)) [data-col="${colNum}"]`
  )
  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.clientX - coords.right
      const value = coords.width + delta
      $parent.css({width: value + 'px'})
      cellsInCurrentCol.forEach(cell => {
        cell.style.width = value + 'px'
      })
    } else {
      const delta = e.clientY - coords.bottom
      const value = coords.height + delta
      $parent.css({height: value + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
  }
}