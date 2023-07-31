export default interface HttpServer {
  // eslint-disable-next-line @typescript-eslint/ban-types
  on(method: string, url: string, callback: Function): void
  listen(port: number): void
}
