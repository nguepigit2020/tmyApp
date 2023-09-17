import { TmyconfComponent } from './modules/tmyconf/tmyconf.component';
import { DefaultComponent } from './layout/default/default.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component: DefaultComponent},
 {path: '',redirectTo : '', pathMatch: 'full'},
 
 { path: '', component: DefaultComponent,
  children:[
    //{path: '',component: DashadminComponent},
    {path: 'tmyconf',component: TmyconfComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
