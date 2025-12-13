import type { Subscription } from 'rxjs';

export type TSubscriptionsData = {
  totalSubscriptions: number;
  completedSubscriptions: number;
  subscriptionStacks: Map<Subscription, string>;
};
