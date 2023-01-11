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
      const coords = $parent.getCoords()

      const type = $resizer.data.resize

      const colNum = $parent.data.col
      const cellsInCurrentCol = this.$root.findAll(
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
  }


}

// import {ExcelComponent} from '@core/ExcelComponent'
// import {createTable} from '@/components/table/table.template'
// import {$} from '@core/dom'
//
// export class Table extends ExcelComponent {
//   static className = 'excel__table'
//
//   constructor($root) {
//     super($root, {
//       listeners: ['mousedown']
//     })
//   }
//
//   toHTML() {
//     return createTable(20)
//   }
//
//   onMousedown(event) {
//     if (event.target.dataset.resize) {
//       const $resizer = $(event.target)
//       const $parent = $resizer.closest('[data-type="resizable"]')
//       const coords = $parent.getCoords()
//
//       const colNum = $parent.data.col
//       const cellsInCurrentCol = document.querySelectorAll(
//         `.excel__table .row:not(:nth-child(1)) [data-col="${colNum}"]`
//       )
//       // console.log(cellsInCurrentCol)
//
//       document.onmousemove = e => {
//         const delta = e.pageX - coords.right
//         const value = coords.width + delta
//         $parent.$el.style.width = value + 'px'
//         cellsInCurrentCol.forEach(cell => {
//           cell.style.width = value + 'px'
//           console.log('1')
//         })
//       }
//
//       document.onmouseup = () => {
//         document.onmousemove = null
//       }
//
//     }
//   }
//
//
// }
