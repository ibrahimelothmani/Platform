import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClipService } from './services/clip.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileService } from './services/file.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about', // example.com/about
    component: AboutComponent
  },
  {
    path: 'clip/:id',
    component: ClipComponent,
    resolve: {
      clip: ClipService
    }
  },
  {
    path: 'fileupload',
    component: FileUploadComponent
  },
  {
    path: '', // dashboard/manage, dashboard/upload
    loadChildren: async () => (await import('./video/video.module')).VideoModule
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
