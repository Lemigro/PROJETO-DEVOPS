import { Component, OnInit } from '@angular/core';
import { Pet } from './model/pet.model';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PetService } from './service/pet.service';


@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    petDialog: boolean = false;

    deletePetDialog: boolean = false;

    deletePetsDialog: boolean = false;

    pets: any[] = [];

    pet: Pet = {};

    tutores: any[] = [];

    selectedPets: Pet[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private petService: PetService, private messageService: MessageService) { }

    ngOnInit() {
        this.petService.getPets().subscribe(
            data => this.pets = data,
            error => console.error('Erro ao obter dados dos pets:', error)
          );

        this.cols = [
            { field: 'pet', header: 'Pet' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'Tutor 1', value: 'Tutor 1' },
            { label: 'Tutor 2', value: 'Tutor 2' },
            { label: 'Tutor 3', value: 'Tutor 3' }
        ];

        this.tutores = [
            { label: 'Tutor 1', value: 'Tutor 1' },
            { label: 'Tutor 2', value: 'Tutor 2' },
            { label: 'Tutor 3', value: 'Tutor 3' }
        ];


    }

    openNew() {
        this.pet = {};
        this.submitted = false;
        this.petDialog = true;
    }

    deleteSelectedPets() {
        this.deletePetsDialog = true;
    }

    editPet(pet: Pet) {
        this.pet = { ...pet };
        this.petDialog = true;
    }

    deletePet(pet: Pet) {
        this.deletePetDialog = true;
        this.pet = { ...pet };
        
    }

    confirmDeleteSelected() {
        this.deletePetsDialog = false;
        // this.pets = this.pets.filter(val => !this.selectedPets.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedPets = [];
    }

    confirmDelete() {
        this.deletePetDialog = false;
        // this.pets = this.pets.filter(val => val.id !== this.pet.id);
        this.petService.deletePet(this.pet.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Deleted', life: 3000 });
        this.pet = {};
    }

    hideDialog() {
        this.petDialog = false;
        this.submitted = false;
    }

    savePet() {
        this.submitted = true;

        if (this.pet.name?.trim()) {
            if (this.pet.key) {
                // @ts-ignore
                this.pet.inventoryStatus = this.pet.inventoryStatus.value ? this.pet.inventoryStatus.value : this.pet.inventoryStatus;
                // this.pets[this.findIndexById(this.pet.id)] = this.pet;
                this.petService.updatePet(this.pet.key, this.pet);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Updated', life: 3000 });
            } else {
                this.pet.id = this.createId();
                this.petService.createPet(this.pet);
                // this.product.id = this.createId();
                // this.product.code = this.createId();
                // this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.pet.inventoryStatus = this.pet.inventoryStatus ? this.pet.inventoryStatus.value : 'INSTOCK';
                // this.pets.push(this.pet);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Created', life: 3000 });
            }

            this.pets = [...this.pets];
            this.petDialog = false;
            this.pet = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.pets.length; i++) {
            if (this.pets[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
