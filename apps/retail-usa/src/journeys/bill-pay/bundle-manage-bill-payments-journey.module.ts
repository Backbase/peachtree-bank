import { NgModule } from '@angular/core';
import {
  ManageBillPaymentsJourneyModule,
  ManageBillPaymentsJourneyConfiguration,
  ManageBillPaymentsJourneyConfigurationToken,
  ManageBillPaymentsCommunicationService,
} from '@backbase/manage-bill-payments-journey-ang';
import { BillpayCommunication } from '../../communication/billpay-communication.service';

@NgModule({
  imports: [ManageBillPaymentsJourneyModule.forRoot()],
  providers: [
    {
      provide: ManageBillPaymentsJourneyConfigurationToken,
      useValue: {
        pageTitle: 'Pending Payments',
      } as ManageBillPaymentsJourneyConfiguration,
    },
    {
      provide: ManageBillPaymentsCommunicationService,
      useExisting: BillpayCommunication,
    },
  ],
})
export class ManageBillPaymentsJourneyBundleModule {}
