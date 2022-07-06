import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';


const routes : Routes = [
  {
    path: 'post',
    component: PostComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  }
];


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
