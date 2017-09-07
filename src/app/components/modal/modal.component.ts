import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-header bg-danger text-white">
      <h4 class="modal-title">{{title}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('false')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{message}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('dummy1')">dummy1</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close(false)">Cancel</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close(true)">Ok</button>
    </div>
  `
})
export class ModalComponent {
  @Input() title;
  @Input() message;

  constructor(public activeModal: NgbActiveModal) {}
}
