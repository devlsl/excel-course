import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')

      const startPositionX = event.clientX
      const startPositionY = event.clientY
      const type = $resizer.data.resize

      const colNum = $parent.data.col
      const cellsInCurrentCol = this.$root.findAll(
        `[data-col="${colNum}"]`
      )

      document.onmousemove = e => {
        if (type === 'col') {
          const finishPositionX = e.clientX
          const delta = finishPositionX - startPositionX
          $resizer.css({'right': -delta + 'px', 'z-index': '99', 'opacity': '1', 'bottom': '-5000px'})
        } else {
          const finishPositionY = e.clientY
          const delta = finishPositionY - startPositionY
          $resizer.css({'bottom': -delta + 'px', 'z-index': '99', 'opacity': '1', 'right': '-5000px'})
        }
      }

      document.onmouseup = () => {
        if (type === 'col') {
          const value = $resizer.getCoords().right - $parent.getCoords().left
          $parent.css({width: value + 'px'})
          cellsInCurrentCol.forEach(cell => {
            cell.style.width = value + 'px'
          })
          $resizer.css({'right': '', 'z-index': '', 'opacity': '', 'bottom': ''})
        } else {
          const value = $resizer.getCoords().bottom - $parent.getCoords().top
          $parent.css({height: value + 'px'})
          $resizer.css({'bottom': '', 'z-index': '', 'opacity': '', 'right': ''})
        }
        document.onmousemove = null
        document.onmouseup = null
      }

    }
  }


}

