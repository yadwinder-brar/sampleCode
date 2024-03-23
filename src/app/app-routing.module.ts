import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { UnauthGuard } from './core/guards/unauth.guard';
import { UserGuard } from './core/guards/user.guard';
import { User_Role } from './share/enums/userRoles';
import { SubAdminGuard } from './core/guards/sub-admin.guard';


const routes: Routes = [
 {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),canActivate:[UnauthGuard]
  },
 {
    path: 'client',
    loadChildren: () =>
      import('./features/client/client.module').then((m) => m.ClientModule),canActivate:[UserGuard],data: { ROLE:User_Role.USER }
  },
 {
    path: 'subAdmin',
    loadChildren: () =>
      import('./features/sub-admin/sub-admin.module').then((m) => m.SubAdminModule),canActivate:[SubAdminGuard],data: { ROLE:User_Role.SUB_ADMIN }
  },
 {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('./features/admin/admin.module').then((m) => m.AdminModule),canActivate:[AuthGuard],data: { ROLE:User_Role.ADMIN }
  // },
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule)
      ,canActivate:[AuthGuard],data: { ROLE:User_Role.ADMIN }
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
