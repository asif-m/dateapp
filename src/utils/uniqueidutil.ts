export default class UniqueIDUtil {
  public static generate(): string {
    UniqueIDUtil.currentUID++;
    return UniqueIDUtil.currentUID.toString();
  }
  private static currentUID = 0;
}
