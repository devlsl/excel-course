import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'



function numOfColByLetter(letter) {
  return letter.charCodeAt() - 64
}


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mousemove', 'mouseup']
    })
    this.resizing = false
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      console.log('start resizing', event.target.dataset.resizing)
      this.resizing = true
      this.startX = event.clientX
      event.target.dataset.resizing = true
    }
  }

  onMouseup(event) {
    if (this.resizing) {
      console.log('end resizing')
      this.resizing = false
      const resizingEl = document.querySelector('[data-resizing]');
      resizingEl.removeAttribute('style')

      const position = event.clientX - this.startX
      resizingEl.parentElement.style = `width: ${resizingEl.parentElement.offsetWidth + position}px`

      const letter = resizingEl.parentElement.firstChild.textContent.replace(/\s/g, '')

      const resizingColNum = numOfColByLetter(letter)

      document.querySelectorAll('.excel__table .row:not(:first-of-type)').forEach(row => {
        const cell = row.querySelector(`.row-data .cell:nth-child(${resizingColNum})`)
        console.log(position)

        cell.style = `width: ${cell.clientWidth+position+1}px`
      })

      // resizingEl.parentElement.nextElementSibling.style = `width: ${resizingEl.parentElement.nextElementSibling.offsetWidth - position}px`

      delete resizingEl.dataset.resizing
    }
  }

  onMousemove(event) {
    if (this.resizing) {
      const resizingEl = document.querySelector('[data-resizing]');
      const position = event.clientX - this.startX
      resizingEl.style = `right: ${-position}px; opacity: 1; z-index: 99`
    }
  }


}
