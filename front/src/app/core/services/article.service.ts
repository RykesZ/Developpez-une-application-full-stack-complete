import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Comment } from '../interfaces/comment.interface';
import { sendCommentRequest } from '../interfaces/sendCommentRequest.interface';
import { sendArticleRequest } from '../interfaces/sendArticleRequest.interface';
import { Article } from '../interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'api/articles';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getArticleById(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  createArticle(article: sendArticleRequest): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}`, article);
  }
}