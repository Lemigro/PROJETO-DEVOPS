import { Component, OnInit } from '@angular/core';
import { Tutor } from './model/tutores.model';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TutorService } from './service/tutores.service';


@Component({
    templateUrl: './crud-tutores.component.html',
    providers: [MessageService]
})
export class CrudTutoresComponent implements OnInit {

    tutorDialog: boolean = false;

    deleteTutorDialog: boolean = false;

    deleteTutoresDialog: boolean = false;

    tutores: any[] = [];

    tutor: Tutor = {};

    tutores2: any[] = [];

    selectedTutores: Tutor[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private tutorService: TutorService, private messageService: MessageService) { }

    ngOnInit() {
        this.tutorService.getTutores().subscribe(
            data => this.tutores = data,
            error => console.error('Erro ao obter dados dos tutores:', error)
          );

        this.cols = [
            { field: 'tutor', header: 'Pet' },
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

        this.tutores2 = [
            { label: 'Tutor 1', value: 'Tutor 1' },
            { label: 'Tutor 2', value: 'Tutor 2' },
            { label: 'Tutor 3', value: 'Tutor 3' }
        ];


    }

    openNew() {
        this.tutor = {};
        this.submitted = false;
        this.tutorDialog = true;
    }

    deleteSelectedTutores() {
        this.deleteTutoresDialog = true;
    }

    editTutor(tutor: Tutor) {
        this.tutor = { ...tutor };
        this.tutorDialog = true;
    }

    deleteTutor(tutor: Tutor) {
        this.deleteTutorDialog = true;
        this.tutor = { ...tutor };
        
    }

    confirmDeleteSelected() {
        this.deleteTutoresDialog = false;
        // this.tutores = this.tutores.filter(val => !this.selectedPets.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedTutores = [];
    }

    confirmDelete() {
        this.deleteTutorDialog = false;
        // this.tutores = this.tutores.filter(val => val.id !== this.tutor.id);
        this.tutorService.deteleTutor(this.tutor.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Deleted', life: 3000 });
        this.tutor = {};
    }

    hideDialog() {
        this.tutorDialog = false;
        this.submitted = false;
    }

    saveTutor() {
        this.submitted = true;

        if (this.tutor.name?.trim()) {
            if (this.tutor.key) {
                // @ts-ignore
                this.tutor.inventoryStatus = this.tutor.inventoryStatus.value ? this.tutor.inventoryStatus.value : this.tutor.inventoryStatus;
                // this.tutores[this.findIndexById(this.tutor.id)] = this.tutor;
                this.tutorService.updateTutor(this.tutor.id, this.tutor);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutor Updated', life: 3000 });
            } else {
                this.tutor.id = this.createId();
                this.tutorService.createTutor(this.tutor);
                // this.product.id = this.createId();
                // this.product.code = this.createId();
                // this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.tutor.inventoryStatus = this.tutor.inventoryStatus ? this.tutor.inventoryStatus.value : 'INSTOCK';
                // this.tutores.push(this.tutor);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutor Created', life: 3000 });
            }

            this.tutores = [...this.tutores];
            this.tutorDialog = false;
            this.tutor = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.tutores.length; i++) {
            if (this.tutores[i].id === id) {
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
