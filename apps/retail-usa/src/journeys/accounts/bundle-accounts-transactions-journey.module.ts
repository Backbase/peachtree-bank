import { NgModule, Provider } from '@angular/core';
import { PUBSUB, PubSubService } from '@backbase/foundation-ang/web-sdk';
import {
  AccountsPaymentsCommunication,
  AccountsTransactionsJourneyConfiguration,
  AccountsTransactionsJourneyConfigurationToken,
  AccountsTransactionsJourneyModule,
} from '@backbase/accounts-transactions-journey-ang';
import { AccountsInitiatePaymentCommunication } from '../../communication/accounts-initiate-payment-communication.service';

const AccountsTransactionsConfigProvider: Provider = {
  provide: AccountsTransactionsJourneyConfigurationToken,
  useValue: {
    showCheckImages: true,
    disputeTopicId: '',
    inquireTopicId: '',
  } as Partial<AccountsTransactionsJourneyConfiguration>,
};

@NgModule({
  imports: [AccountsTransactionsJourneyModule.forRoot()],
  providers: [
    AccountsTransactionsConfigProvider,
    { provide: AccountsPaymentsCommunication, useExisting: AccountsInitiatePaymentCommunication },
    { provide: PUBSUB, useExisting: PubSubService },
  ],
})
export class AccountsTransactionsJourneyBundleModule {}
