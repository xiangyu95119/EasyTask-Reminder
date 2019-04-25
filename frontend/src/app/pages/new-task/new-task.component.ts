import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  listId: string;
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    );
  }

  createTask(title: string) {
    console.log(title);
    const description = 'default';
    const startTime = new Date();
    const endTime = new Date();
    this.taskService.createTask(title, description, startTime, endTime, this.listId).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

}
