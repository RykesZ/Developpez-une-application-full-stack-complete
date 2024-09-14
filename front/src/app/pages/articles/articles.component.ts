import { Component } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  articles = [
    { title: "Titre de l'article", date: '2023-09-14', author: 'Auteur', content: 'Content: lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled...' },
    { title: "Titre de l'article", date: '2023-09-14', author: 'Auteur', content: 'Content: lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled...' },
    { title: "Titre de l'article", date: '2023-09-14', author: 'Auteur', content: 'Content: lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled...' },
    { title: "Titre de l'article", date: '2023-09-14', author: 'Auteur', content: 'Content: lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled...' },
  ];
}