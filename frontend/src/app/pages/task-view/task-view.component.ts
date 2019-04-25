import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists: List[];
  tasks: Task[];
  checked: boolean;

  selectedListId: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.checked = false;
    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        this.selectedListId = params.listId;
        this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
        });
      } else {
        this.tasks = undefined;
      }
    });

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });
  }

  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log('Completed successully!');
      task.completed = !task.completed;
    });
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    });
  }

  onDeleteTaskClick(id: string) {
    this.taskService
      .deleteTask(this.selectedListId, id)
      .subscribe((res: any) => {
        this.tasks = this.tasks.filter(val => val._id !== id);
        console.log(res);
      });
  }

  onChecked(task: Task) {
    if (this.checked === false) { this.checked = true; } else { this.checked = false; }
    if (!task.completed && this.checked === true) {
      const currTime = new Date();
      const endYear = Number(task.endTime.substring(0, 4));
      const endMon = Number(task.endTime.substring(5, 7)) - 1;
      const endDay = Number(task.endTime.substring(8, 10));
      const endHour = Number(task.endTime.substring(11, 13)) - 4;
      const endMin = Number(task.endTime.substring(14, 16));
      const endSec = Number(task.endTime.substring(17, 19));
      const diffYear = currTime.getUTCFullYear();
      const diffMon = currTime.getUTCMonth();
      const diffDay = currTime.getUTCDate();
      const diffHour = currTime.getUTCHours();
      const diffMin = currTime.getUTCMinutes();
      const diffSec = currTime.getUTCSeconds();
      // tslint:disable-next-line:max-line-length
      const diff =
        Date.UTC(endYear, endMon, endDay, endHour, endMin, endSec) -
        Date.UTC(diffYear, diffMon, diffDay, diffHour, diffMin, diffSec);
      console.log('wating time: ' + diff);
      if (diff > 0) {
        setTimeout(function() {
          alert(task.title + ' has expired!');
        }, diff);
      }
    }
  }
}
