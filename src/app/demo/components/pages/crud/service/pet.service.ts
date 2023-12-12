import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pet } from '../model/pet.model';

@Injectable({
    providedIn: 'root'
})
export class PetService {

    private basePath = "pets"
    constructor( private db: AngularFireDatabase) { }

    getAll() {
        return this.db.list<Pet>(this.basePath).snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }
    
    createPet(pet: Pet): any {
        return this.db.list<Pet>(this.basePath).push(pet);
    }

    getPets() {
       return this.db.list<Pet>(this.basePath)
       .snapshotChanges().pipe(
        map(changes => 
            changes.map(c => ({ key: c.payload, ...c.payload.val() } ))
            )
       );
    }

    getPetId(Key: string): Observable<Pet> {
        return this.db.object<Pet>(`${this.basePath}/${Key}`).valueChanges();
        }
    
    updatePet(key: string, value: any): Promise<void> {
        return this.db.object<Pet>(`${this.basePath}/${key}`).update(value);
    }

    deletePet(key: string): Promise<void> {
        return this.db.object<Pet>(`${this.basePath}/${key}`).remove();
    }
    
}