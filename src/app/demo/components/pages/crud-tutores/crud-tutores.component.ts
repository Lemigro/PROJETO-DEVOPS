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

    selectedTutores: Tutor[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    sexo: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private tutorService: TutorService, private messageService: MessageService) { }

    ngOnInit() {
        this.tutorService.getAll().subscribe(
            data => this.sexo = data,
            error => console.error('Erro ao obter dados dos tutores:', error)
          );

        this.cols = [
            { field: 'nome', header: 'nome' },
            { field: 'rua', header: 'rua' },
            { field: 'bairro', header: 'bairro' },
            { field: 'numero', header: 'numero' },
            { field: 'cidade', header: 'cidade' },
            { field: 'cep', header: 'cep' },
            { field: 'estado', header: 'estado' },
            { field: 'telefone', header: 'telefone' },
            { field: 'cpf', header: 'cpf' },
            { field: 'sexo', header: 'sexo' },
        ];

        this.sexo = [
            { label: 'MASCULINO', value: 'masculino' },
            { label: 'FEMININO', value: 'feminino' },
            { label: 'OUTRO', value: 'outro' }
        ];

        this.tutores = [
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
        this.tutorService.deleteTutor(this.tutor.key);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutor Deleted', life: 3000 });
        this.selectedTutores = [];
    }

    confirmDelete() {
        this.deleteTutorDialog = false;
        // this.tutores = this.tutores.filter(val => val.id !== this.tutor.id);
        this.tutorService.deleteTutor(this.tutor.key);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutor Deleted', life: 3000 });
        this.tutor = {};
    }

    hideDialog() {
        this.tutorDialog = false;
        this.submitted = false;
    }

    saveTutor() {
        this.submitted = true;

        if (this.tutor.nome?.trim()) {
            if (this.tutor.key) {
                // @ts-ignore
                this.tutor.sexo = this.tutor.sexo.value ? this.tutor.sexo.value : this.tutor.sexo;
                // this.tutores[this.findIndexById(this.tutor.id)] = this.tutor;
                this.tutorService.updateTutor(this.tutor.key, this.tutor);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutor Updated', life: 3000 });
            } else {
                this.tutor.id = this.createId();
                this.tutor.code = this.createId();
                this.tutorService.createTutor(this.tutor);
                // this.product.id = this.createId();
                // this.product.code = this.createId();
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
        for (let i = 0; i < this.sexo.length; i++) {
            if (this.sexo[i].id === id) {
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
