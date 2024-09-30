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
export class CommentService {
  private apiUrl = 'api/comments';

  constructor(private http: HttpClient) {}

  getCommentsByArticleId(articleId: number): Observable<Comment[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${articleId}`);
  }

  addComment(comment: sendCommentRequest): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}`, comment);
  }

}