export class FloatTransformerResolver {
  /**
   * @param {number} data
   * @return number
   */
  to(data: number): number {
    return data;
  }

  /**
   *
   * @param {string} data
   * @return number
   */
  from(data: string): number {
    return parseFloat(data);
  }
}
