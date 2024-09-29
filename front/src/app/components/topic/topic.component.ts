import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() subscribe = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubscribe(): void {
    this.subscribe.emit(this.id);
  }

}
