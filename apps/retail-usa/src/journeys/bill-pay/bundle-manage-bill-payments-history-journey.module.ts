import { NgModule } from '@angular/core';
import {
  ManageBillPaymentsJourneyModule,
  ManageBillPaymentsJourneyConfigurationToken,
  ManageBillPaymentsJourneyConfiguration,
  PaymentsFilterStatus,
} from '@backbase/manage-bill-payments-journey-ang';

@NgModule({
  imports: [ManageBillPaymentsJourneyModule.forRoot()],
  providers: [
    {
      provide: ManageBillPaymentsJourneyConfigurationToken,
      useValue: {
        pageFilter: PaymentsFilterStatus.HISTORICAL,
        pageTitle: 'History Payments',
      } as ManageBillPaymentsJourneyConfiguration,
    },
  ],
})
export class ManageBillPaymentsHistoryJourneyBundleModule {}
