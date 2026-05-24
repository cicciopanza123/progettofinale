import { Routes } from '@angular/router';
import { ClassiList } from './classi-list/classi-list';
import { ClasseDashboard } from './classe-dashboard/classe-dashboard';
export const routes: Routes = [
  { path: '', redirectTo: 'classi', pathMatch: 'full' },
  { path: 'classi', component: ClassiList },
  { path: 'classi/:id_classe', component: ClasseDashboard }
];