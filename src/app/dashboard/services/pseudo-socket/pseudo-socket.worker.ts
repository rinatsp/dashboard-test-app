import { PseudoSocketAction, PseudoSocketActionType } from "./models/pseudo-socket-action.model";
import { map, Subscription, tap, timer } from "rxjs";
import { generateData } from "./utilities/generators";


let currentIntervalId: Subscription | undefined = undefined;
addEventListener('message', ({data}: { data: PseudoSocketAction }) => {
  switch (data.action) {
    case PseudoSocketActionType.START:
      const {timeInterval, arraySize} = data.options;

      clearIntervalSubscription();

      currentIntervalId = timer(0, timeInterval).pipe(
        map(() => generateData(arraySize)),
        tap((items) => postMessage(items))
      ).subscribe();
      break;
    case PseudoSocketActionType.STOP:
      clearIntervalSubscription();
      break;
    default:
      break;
  }
});

export function clearIntervalSubscription() {
  currentIntervalId?.unsubscribe();
  currentIntervalId = undefined;
}
