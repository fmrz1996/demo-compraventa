import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

export class PaginatorI18n {

    constructor(private readonly translate: TranslateService) {}

    getPaginatorIntl(): MatPaginatorIntl {
        const paginatorIntl = new MatPaginatorIntl();
        paginatorIntl.itemsPerPageLabel = this.translate.instant('Items por página');
        paginatorIntl.nextPageLabel = this.translate.instant('Página siguiente');
        paginatorIntl.previousPageLabel = this.translate.instant('Página anterior');
        paginatorIntl.firstPageLabel = this.translate.instant('Primera página');
        paginatorIntl.lastPageLabel = this.translate.instant('Última página');
        paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
        return paginatorIntl;
    }

    private getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0 || pageSize === 0) {
            return this.translate.instant(`${length} de ${length}`, { length });
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return this.translate.instant(`${startIndex} - ${endIndex} de ${length}`, { startIndex: startIndex + 1, endIndex, length });
    }
}
