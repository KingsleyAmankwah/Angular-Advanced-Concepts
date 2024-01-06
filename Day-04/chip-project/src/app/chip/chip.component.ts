import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css',
})
export class ChipComponent {
  @Input() items: string[] = [];
  @Input() placeholder: string = 'Typing...';
  @Input() removable = true;

  @ViewChild('inputField') inputField: any;

  handleClick() {
    this.inputField.nativeElement.focus();
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  removeAll() {
    this.items = [];
  }

  addItem(event: KeyboardEvent): void {
    const input = this.inputField.nativeElement;
    const value = input.value;
    if ((event.key === 'Enter' || event.key === ',') && value.trim()) {
      if (!this.items.includes(value.trim())) {
        this.items.push(value.trim());
      }
      input.value = '';
      event.preventDefault();
    } else if (event.key === 'Backspace' && !value) {
      this.items.pop();
    }
  }
}
