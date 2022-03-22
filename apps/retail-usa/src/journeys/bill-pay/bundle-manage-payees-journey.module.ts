import { NgModule } from '@angular/core';
import {
  ManagePayeesJourneyModule,
  ManagePayeesCommunicationService,
  ManagePayeesJourneyConfiguration,
  ManagePayeesJourneyConfigurationToken,
} from '@backbase/manage-payees-journey-ang';
import { BillpayCommunication } from '../../communication/billpay-communication.service';

@NgModule({
  imports: [ManagePayeesJourneyModule.forRoot()],
  providers: [
    {
      provide: ManagePayeesJourneyConfigurationToken,
      useValue: {
        notificationDismissTime: 3000,
        multipleBillsMode: true,
      } as ManagePayeesJourneyConfiguration,
    },
    {
      provide: ManagePayeesCommunicationService,
      useExisting: BillpayCommunication,
    },
  ],
})
export class ManagePayeesJourneyBundleModule {}
