import { Component, Inject, Input, ViewChild } from '@angular/core';
import { ResourcesService } from './services/resources.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { User } from './classes/user.class';
import { Sale } from './models/sale.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  formNewSale: FormGroup;
  @Input() selectedIndex: number | null
  @Input() codeCountry: any | null;
  @ViewChild( FormGroupDirective ) myForm: any;
  @ViewChild( MatPaginator ) paginator: MatPaginator;
  @ViewChild( MatSort ) sort: MatSort;
  search(filterValue: string) {
    this.tableSalesContent.filter = filterValue.trim().toLowerCase();
  }

  users: User[] = [];
  sales: Sale[] = [];
  countries: any[] = [];
  products: any[] = [];

  tableSalesContent = new MatTableDataSource<Sale>(this.sales);
  tableSalesColumns: string[] = ['client', 'country', 'product', 'price', 'quantity', 'subtotal'];

  constructor( private resources: ResourcesService,
               private dialog: MatDialog,
               private snackBar: MatSnackBar,
               public formBuilder: FormBuilder ){
    this.getUsers();
    this.getSales();
    this.resources.getCountries()
    .subscribe((data:any) => {
      this.countries = data;
    });
    this.resources.getProducts()
    .subscribe((data:any) => {
      this.products = data;
    });

    this.formNewSale = formBuilder.group({
      'client': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'product': new FormControl('', Validators.required),
      'price': new FormControl(null, Validators.required),
      'quantity': new FormControl(1, Validators.required),
      'subtotal': new FormControl({value: null, disabled: true})
    });
  }

  addUserDialog(){
    const dialogRef = this.dialog.open(AddUserDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if(!data){
        return;
      }
      this.resources.createUser(data).subscribe(_data => {
        this.getUsers();
        this.snackBar.open('Usuario agregado', 'Cerrar', { duration: 5000 });
      }, _error => (this.snackBar.open('Error al agregar usuario', 'Cerrar', { duration: 5000 })));
    });
  }

  getUsers(){
    this.resources.getUsers()
    .subscribe((data:any) => {
      this.users = data;
    });
  }

  getSales(){
    this.resources.getSales()
    .subscribe((data:any) => {
      this.sales = data;
      this.tableSalesContent.data = Object.values(this.sales).reverse();
      this.tableSalesContent.sort = this.sort;
      this.tableSalesContent.paginator = this.paginator;
    });
  }

  saveSale(){
    this.selectedIndex = 0;
    if(this.formNewSale.invalid === false){
      this.resources.saveSale(this.formNewSale.value)
        .subscribe( _data => {
          this.getSales();
          this.myForm.resetForm({ quantity: 1});
          this.snackBar.open('Venta realizada exitosamente', 'Cerrar', { duration: 5000 });
          this.selectedIndex = 1;
        }, _error => (this.snackBar.open('Error al agregar usuario', 'Cerrar', { duration: 5000 })))
      }
  }

  subtotal(){
    if(this.formNewSale.value['price'] >= 0 && this.formNewSale.value['quantity'] >= 0){
      this.formNewSale.controls['subtotal'].setValue(this.formNewSale.value['price'] * this.formNewSale.value['quantity']);
    }
  }
}

@Component({
  selector: 'app-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserDialog {

  formAddUser: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    formBuilder: FormBuilder) {
      this.formAddUser = formBuilder.group({
        'name': new FormControl('', Validators.required),
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addUser(){
    this.dialogRef.close(this.formAddUser.value);
  }

}
