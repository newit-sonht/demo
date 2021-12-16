declare module 'thunder-girl' {
  export function load<T>(destinationArr: T[], sourceArr: T[], slice: number, msec: number): () => Promise<void>;
  export function accLoad<T>(destinationArr: T[], sourceArr: T[], slice: number, msec: number): () => Promise<void>;
}
