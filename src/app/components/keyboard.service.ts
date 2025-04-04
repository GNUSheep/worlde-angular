import { Injectable } from '@angular/core';
import { Subject, fromEvent, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class KeyboardService {
    private keySubject$ = new Subject<string>();

    constructor() {
        fromEvent<KeyboardEvent>(document, 'keydown')
            .pipe(map(event => event.key))
            .subscribe(key => {
                this.keySubject$.next(key)
            })
    }

    get keyPressed$() {
        return this.keySubject$.asObservable();
    }
}
