import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  listId: string;
  list: any;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.listId = params.listId;
      console.log(params.listId);
    });

    this.taskService.getListById(this.listId).subscribe((list: List) => {
      console.log('listDom: ', list);
      this.list = list[0];
    });
  }

  updateList(title: string) {
    if (title === '' || title === undefined) {
      alert('List name cannot be null!');
    } else {
      this.taskService.updateList(this.listId, title).subscribe(() => {
        this.router.navigate(['/lists', this.listId]);
      });
    }
  }
}
