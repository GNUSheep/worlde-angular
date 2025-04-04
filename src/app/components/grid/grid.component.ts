import { Component } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'grid',
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
    grid: CellComponent[][];
    cur_row: number = 0;
    cur_col: number = 0;

    constructor() {
        this.grid = Array.from({ length: 5 }, () => 
            Array.from({ length: 6 }, () => new CellComponent())
        );
    }

    addLetter(letter: string): Boolean {
        if (this.cur_col == 5) {
            return false;
        }
        
        this.grid[this.cur_col][this.cur_row].setValue(letter);
        this.cur_col += 1;

        return true;
    }

    removeLetter(): Boolean {
        if (this.cur_col == 0) {
            return false;
        }

        this.cur_col -= 1;
        this.grid[this.cur_col][this.cur_row].deleteValue();

        return true;
    }

    setStyle(col_pos: number, style: string) {
        this.grid[col_pos][this.cur_row].setStyle(style);
    }

    moveRowDown() {
        if (this.cur_row == 6) {
            return;
        }

        this.cur_col = 0;
        this.cur_row += 1
    }
}
