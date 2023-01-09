import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  toHTML() {
    return createTable()
  }
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