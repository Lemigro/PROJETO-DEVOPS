import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudTutoresComponent } from './crud-tutores.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CrudTutoresComponent }
	])],
	exports: [RouterModule]
})
export class CrudRoutingModule { }
