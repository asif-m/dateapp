export interface TimerSubscriptionCallbackData {
  method: any;
  scope: any;
}

export default class TimerUtil {
  public static beginTimer() {
    setInterval(TimerUtil.timerCallback, 1000);
  }
  public static subscribe(data: TimerSubscriptionCallbackData) {
    if (!TimerUtil.handlers) {
      TimerUtil.handlers = [];
    }
    TimerUtil.handlers.push(data);
  }
  public static unsubscribe(data: TimerSubscriptionCallbackData) {
    if (!TimerUtil.handlers) {
      TimerUtil.handlers = [];
    }
    TimerUtil.handlers = TimerUtil.handlers.filter(
      (item: any) => item.method !== data.method,
    );
  }
  private static handlers: TimerSubscriptionCallbackData[];
  private static fire(data: any) {
    if (!TimerUtil.handlers) {
      TimerUtil.handlers = [];
    }
    TimerUtil.handlers.forEach((item: any) => {
      item.method.call(item.scope, data);
    });
  }
  private static timerCallback() {
    TimerUtil.fire(new Date());
  }
}
