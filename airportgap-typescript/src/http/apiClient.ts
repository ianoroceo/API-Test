import axios, { AxiosInstance } from 'axios'
import { Env } from '../config/env.js'
import * as dotenv from 'dotenv'
dotenv.config()

export class ApiClient {
  readonly base: AxiosInstance
  readonly auth: AxiosInstance

  constructor() {
    this.base = axios.create({
      baseURL: Env.baseUrl,
      headers: { Accept: 'application/json' },
      timeout: 15000
    })

    this.auth = axios.create({
      baseURL: Env.baseUrl,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer token=${Env.token}`
      },
      timeout: 15000
    })

    const retry = async (error: any) => {
      const res = error.response
      if (res && res.status === 429 && !error.config.__retryCount) {
        error.config.__retryCount = 1
        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
        await sleep(300)
        return (res.config.headers.Authorization ? this.auth : this.base).request(error.config)
      }
      return Promise.reject(error)
    }

    this.base.interceptors.response.use(r => r, retry)
    this.auth.interceptors.response.use(r => r, retry)
  }
}
