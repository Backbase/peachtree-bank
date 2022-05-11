import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedRoutableModalService } from '@backbase/shared/feature/routable-modal';

import { AccountsInitiatePaymentCommunication } from './accounts-initiate-payment-communication.service';

describe('AccountInitiatePaymentCommunicationService', () => {
  let service: AccountsInitiatePaymentCommunication;
  let injectService: SharedRoutableModalService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [SharedRoutableModalService],
    });
    service = TestBed.inject(AccountsInitiatePaymentCommunication);
    injectService = TestBed.inject(SharedRoutableModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setPaymentConfiguration', () => {
    service.init({ setupData: null });
    expect(service['initiatePaymentApi']).toEqual({ setupData: null });
  });

  it('should empty reset', () => {
    service.reset();
    expect(service['paymentPayload']).toEqual(undefined);
  });

  it('should call close modal', () => {
    const closeModalSpy = spyOn(injectService, 'closeModal');
    service.closeEvent();
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should open modal', () => {
    const openModalSpy = spyOn(injectService, 'openModal');
    service.headerNavigationAction('test');
    expect(openModalSpy).toHaveBeenCalled();
  });

  it('should open modal on repay event', () => {
    const openModalSpy = spyOn(injectService, 'openModal');
    service.repayEvent('test');
    expect(openModalSpy).toHaveBeenCalled();
  });

  it('should open modal on cashAdvanceEvent', () => {
    const openModalSpy = spyOn(injectService, 'openModal');
    service.cashAdvanceEvent('test');
    expect(openModalSpy).toHaveBeenCalled();
  });
  it('should set payment configuration', () => {
    service.init({
      setupData: function () {
        return;
      },
    });
    const initiatePaymentApiSpy = spyOn(service['initiatePaymentApi'], 'setupData');
    service['paymentPayload'] = {};
    service['setPaymentConfiguration']();
    expect(initiatePaymentApiSpy).toHaveBeenCalled();
  });
});
