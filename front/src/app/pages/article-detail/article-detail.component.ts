import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../core/services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: any = {};
  comments: any[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Le '+' convertit la chaîne en nombre
      this.loadArticle(id);
    });
  }

  loadArticle(id: number) {
    this.articleService.getArticleById(id).subscribe(
      (article) => {
        this.article = article;
        this.loadComments(id);
      },
      (error) => {
        console.error('Erreur lors du chargement de l\'article', error);
      }
    );
  }

  loadComments(articleId: number) {
    this.articleService.getCommentsByArticleId(articleId).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Erreur lors du chargement des commentaires', error);
      }
    );
  }

  submitComment() {
    if (this.newComment.trim()) {
      const comment = {
        articleId: this.article.id,
        content: this.newComment,
        username: 'Utilisateur actuel' // À remplacer par le nom d'utilisateur réel
      };
      this.articleService.addComment(comment).subscribe(
        (newComment) => {
          this.comments.push(newComment);
          this.newComment = '';
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du commentaire', error);
        }
      );
    }
  }
}