import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule, provideClientHydration, } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopicComponent } from './components/topic/topic.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { ArticleComponent } from './components/article/article.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import * as fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ArticleService } from './core/services/article.service';
import { MatOption } from '@angular/material/core';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        TopicComponent,
        RegisterComponent,
        LoginComponent,
        ArticlesComponent,
        TopicsComponent,
        ArticleComponent,
        CreateArticleComponent,
        ArticleDetailComponent,
        ProfileComponent,
        HeaderComponent,
        NotFoundComponent,
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatMenuModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        FormsModule,
        MatOption,
        MatSelectModule,
      ], 
      providers: [
        provideClientHydration(),
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        ArticleService
    ] })
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
