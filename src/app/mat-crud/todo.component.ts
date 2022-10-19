import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from '../shared/models/todo.model';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource!: Todo[];

  theme = '';

  constructor(public dialog: MatDialog, public todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.allTodo().subscribe({
      next: (res: any) => {
        this.dataSource = res;
        console.log("Responce..", res);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  editDialog(element?: Todo): void {
    const dialogRef = this.dialog.open(TodoEditComponent, {
      width: '250px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Refrash the page here...
    });
  }

  // Change theme

  changeTheme(val:string) {
    this.theme = val;
  }

}
