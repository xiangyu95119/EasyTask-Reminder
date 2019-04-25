import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import {Task} from '../../models/task.model';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})

export class EditTaskComponent implements OnInit {

  taskId: string;
  listId: string;
  task: Task;
  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) {}



  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.taskId = params.taskId;
        this.listId = params.listId;
      }
    );

    this.taskService.getTask(this.listId, this.taskId).subscribe((task: Task) => {
      console.log('taskDom: ', task);
      // task.startTime = moment(task.startTime).format('YYYY-MM-DDTkk:mm');
      // const st = new Date(task.startTime);
      // task.startTime = new ISODate(st.toISOString().substring(0, 19));
      task.startTime = task.startTime.substring(0, 19);
      task.endTime = task.endTime.substring(0, 19);
      this.task = task;

    });

}
  updateTask(title: string, description: string, startTime: Date, endTime: Date) {
    if (endTime <= startTime) {
      alert('The end time should be later then the start time!');
    } else {
      this.taskService.updateTask(this.listId, this.taskId, title, description, startTime, endTime).subscribe(() => {
        this.router.navigate(['/lists', this.listId]);
      });
    }
  }

}
