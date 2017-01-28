import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component ({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [`
    .author {
      display: inline-block;
      font-style: italic;
      font-size: 12px;
      width: 80%;
    }

    .config {
      display: inline-block;
      text-align: right;
      font-size: 12px;
      width: 19%;
    }
  `]
})

export class MessageComponent {
  @Input() message: Message;
  @Output() editClicked = new EventEmitter<string>();

  color = "#fec733";

  constructor(private messageService: MessageService) {}

  onEdit() {
    this.editClicked.emit('THEMELESS HARDCODORE VALUE!');
  }

  onDelete() {
    this.messageService.deleteMessage(this.message);
  }

}
