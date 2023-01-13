import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {isCell, shouldResize} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'
import {matrix} from '@core/utils'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)

    this.$root.$el.addEventListener('keydown', event => {
      let selectedCellId = this.selection.current.id(true)
      let newSelectedCell
      switch(event.key) {
        case 'ArrowRight':
          event.preventDefault()
          selectedCellId.col++
          newSelectedCell = this.$root.find(`[data-id="${selectedCellId.row}:${selectedCellId.col}"]`)
          break
        case 'ArrowDown':
          event.preventDefault()
          selectedCellId.row++
          newSelectedCell = this.$root.find(`[data-id="${selectedCellId.row}:${selectedCellId.col}"]`)
          break
        case 'ArrowLeft':
          event.preventDefault()
          selectedCellId.col--
          newSelectedCell = this.$root.find(`[data-id="${selectedCellId.row}:${selectedCellId.col}"]`)
          break
        case 'ArrowUp':
          event.preventDefault()
          selectedCellId.row--
          newSelectedCell = this.$root.find(`[data-id="${selectedCellId.row}:${selectedCellId.col}"]`)
          break
        case 'Tab':
          event.preventDefault()
          selectedCellId.col++
          newSelectedCell = this.$root.find(`[data-id="${selectedCellId.row}:${selectedCellId.col}"]`)
          break
        case 'Enter':
          event.preventDefault()
          selectedCellId.row++
          newSelectedCell = this.$root.find(`[data-id="${selectedCellId.row}:${selectedCellId.col}"]`)
          break
        default:
          newSelectedCell = this.selection.current
          break
      }
      if (newSelectedCell.$el !== null) {
        this.selection.select(newSelectedCell)
        newSelectedCell.$el.focus()
      }

    })

    // console.log()
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix(this.selection.current, $target)
          .map(cellId => this.$root.find(`[data-id="${cellId}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }





}

