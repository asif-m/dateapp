export default class RandomGeneratorUtil {
    public static generate(min = 0, max = 1): number {
        const width = max - min + 1;
        return Math.floor(Math.random() * width + min);
    }
  }
