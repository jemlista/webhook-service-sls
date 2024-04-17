import { utcToZonedTime } from 'date-fns-tz';

export class BaseTransformer {
  /**
   * Converts a date to a specific timezone
   *
   * @param {Date} parsedDate
   * @param {string} timezone
   * @returns {number}
   */
  protected _convertToZonedMillis(
    parsedDate: Date,
    timezone = 'Asia/Manila',
  ): number {
    const dateInTimezone = utcToZonedTime(parsedDate, timezone);
    return dateInTimezone.getTime();
  }
}
