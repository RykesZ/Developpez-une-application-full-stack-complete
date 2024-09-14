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

const routes: Routes = [
  {
    path: 'article-detail',
    component: ArticleDetailComponent,
  },
  {
    path: 'articles',
    component: ArticlesComponent,
  },
  {
    path: 'create-article',
    component: CreateArticleComponent,
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
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'topics',
    component: TopicsComponent,
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
