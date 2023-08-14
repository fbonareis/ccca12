/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import HttpClient from "./HttpClient";
import { injectable } from 'inversify';

@injectable()
export default class AxiosAdapter implements HttpClient {
  async get(url: string): Promise<any> {
    const response = await axios.get(url)
    return response.data
  }

  async post(url: string, body: any): Promise<any> {
    const response = await axios.post(url, body)
    return response.data
  }
}