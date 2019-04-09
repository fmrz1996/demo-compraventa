import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent, AddUserDialog } from './app.component';
import { ObjectToArrayPipe } from './pipes/object-to-array.pipe';
import { PaginatorI18n } from './classes/paginatori18n.class';
import { TitleProductPipe } from './pipes/title-product.pipe';

const httpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  entryComponents: [
    AddUserDialog
  ],
  declarations: [
    AppComponent,
    AddUserDialog,
    ObjectToArrayPipe,
    TitleProductPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [HttpClient] }
    })
  ],
  providers: [
    {
      provide: MatPaginatorIntl, deps: [TranslateService], useValue: 'es',
      useFactory: (translateService: TranslateService) => new PaginatorI18n(translateService).getPaginatorIntl()
    },
    {
      provide: LOCALE_ID, useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
