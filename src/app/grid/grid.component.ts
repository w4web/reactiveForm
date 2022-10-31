import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { ICellRendererParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { CellWithButtonComponent, MyCellParams } from './custom-cells/cell-with-button/cell-with-button.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public rowHeight = 50;

  public columnDefs: ColDef[] = [
    { 
      field: 'make', 
      headerName: 'Brand', 
      cellRenderer: CellWithButtonComponent,
      cellRendererParams: {
        buttonText: 'Brand info'
      } as MyCellParams
    },
    { 
      field: 'model', 
      cellRenderer: CellWithButtonComponent,
      cellRendererParams: {
        buttonText: 'Model info'
      }
    },
    { 
      field: 'price', 
      cellRenderer: (params: ICellRendererParams) => {
        return `Rs. <b>${params.value}</b>/-`;
      },
      width: 300
    }
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public rowData$!: Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('Cell clicked', e);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

}
