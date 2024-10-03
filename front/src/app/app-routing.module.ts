import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'article-detail/:id',
    component: ArticleDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'articles',
    component: ArticlesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-article',
    component: CreateArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'topics',
    component: TopicsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
