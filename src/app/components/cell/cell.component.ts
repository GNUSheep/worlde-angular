import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})
export class CellComponent {
    @Input() value: string;
    @Input() style: string;

    constructor() {
        this.value = "";
        this.style = "";
    }

    setStyle(value: string) {
        this.style = value;
    }

    getStyle() {
        return this.style;
    }

    setValue(value: string) {
        this.value = value;
    }

    deleteValue() {
        this.value = "";
    }

    getValue() {
        return this.value;
    }
}
