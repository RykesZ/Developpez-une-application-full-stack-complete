import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {
  @Input() username: string = '';
  @Input() content: string = '';
  public isHandset: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }
  
  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 900px)']).subscribe(result => {
      this.isHandset = result.matches;
    });
  }
}
