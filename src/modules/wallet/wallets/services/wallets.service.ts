import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletsService {
  constructor(

  ) {}

  /**
   * Fetch all pending disputes
   * Generate a csv file
   * And upload in s3 bucket
   */
  public async createTransactions() {
   console.log('INSIDE THE SERVICE')
  }
}
