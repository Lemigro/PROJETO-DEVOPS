import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tutor } from '../model/tutores.model';

@Injectable({
    providedIn: 'root'
})
export class TutorService {

    private basePath = "tutores"
    constructor( private db: AngularFireDatabase) { }

    createTutor(tutores: Tutor): any {
        return this.db.list<Tutor>(this.basePath).push(tutores);
    }

    getTutores() {
       return this.db.list<Tutor>(this.basePath)
       .snapshotChanges().pipe(
        map(changes => 
            changes.map(c => ({ key: c.payload, ...c.payload.val() } ))
            )
       );
    }

    getTutorId(Key: string): Observable<Tutor> {
        return this.db.object<Tutor>(`${this.basePath}/${Key}`).valueChanges();
        }
    
    updateTutor(key: string, value: any): Promise<void> {
        return this.db.object<Tutor>(`${this.basePath}/${key}`).update(value);
    }

    deteleTutor(key: string): Promise<void> {
        return this.db.object<Tutor>(`${this.basePath}/${key}`).remove();
    }
    
}