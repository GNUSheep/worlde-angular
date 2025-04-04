import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { Subscription } from 'rxjs';
import { KeyboardService } from '../keyboard.service';
import { words } from '../words';

const ALLOWED_KEYS = "qwertyuiopasdfghjklzxcvbnm"

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit, OnDestroy {
    keySub: Subscription;
    cur_word: string = "";
    guessedWord: string = "";

    constructor(keyboard: KeyboardService) {
        this.keySub = keyboard.keyPressed$.subscribe(key => {
            if (key == "Backspace") {
                this.removeLetterFromWord();
            } else if (key == "Enter") {
                this.sumbitWord();
            } else if (ALLOWED_KEYS.includes(key)) {
                this.addLetterToWord(key.toUpperCase());
            }
        })
    }

    ngOnInit(): void {
        let guessedWordIndex = Math.floor(Math.random() * words.length);
        console.log(words[guessedWordIndex]);
        this.guessedWord = words[guessedWordIndex].toUpperCase();
        this.cur_word = "";
    }

    ngOnDestroy(): void {
        this.keySub.unsubscribe();
    }

    @ViewChild(GridComponent) gridComponent!: GridComponent;

    addLetterToWord(char: string) {
        if (!this.gridComponent) {
            return;
        }

        if (this.gridComponent.addLetter(char)) {
            this.cur_word += char;
        }
    }

    removeLetterFromWord() {
        if (!this.gridComponent) {
            return;
        }

        if (this.gridComponent.removeLetter()) {
            this.cur_word = this.cur_word.slice(0, this.cur_word.length - 1);
        }
    }

    sumbitWord() {
        if (!this.gridComponent) {
            return;
        }

        if (this.cur_word.length != 5) {
            return;
        }

        if (!words.includes(this.cur_word.toLowerCase())) {
            return;
        }

        console.log(this.cur_word);

        for(let i = 0; i < this.cur_word.length; i++) {
            if (this.cur_word[i] == this.guessedWord[i]) {
                this.gridComponent.setStyle(i, "#538d4e");
            } else if (this.guessedWord.includes(this.cur_word[i])) {
                this.gridComponent.setStyle(i, "#b59f3b");
            } else {
                this.gridComponent.setStyle(i, "#3a3a3c");
            }
        }

        if (this.cur_word == this.guessedWord) {
            console.log("U WON");
            return
        }

        this.gridComponent.moveRowDown();
        this.cur_word = "";
    }
}
