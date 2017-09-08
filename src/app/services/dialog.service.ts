import { Observable } from 'rxjs/Rx';
import { ModalComponent } from '../components/modal/modal.component';
// import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {


    constructor(private modalService: NgbModal) { }

    public confirm(title: string, message: string): Promise<any> { // Observable<boolean> {

        // let dialogRef: MdDialogRef<ConfirmDialog>;

        // dialogRef = this.dialog.open(ModalComponent);
        // dialogRef.componentInstance.title = title;
        // dialogRef.componentInstance.message = message;

        // return dialogRef.afterClosed();


        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.title = title;
        return modalRef.result;

    }
}