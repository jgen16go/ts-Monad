export class Monad<T> {
  constructor(
    private v: T
  ) {}

  static unit<T>(v: T): Monad<T> {
    return new Monad(v)
  }

  bind(f: (v: T) => T): Monad<T> {
    return Monad.unit(f(this.v))
  }

  value(): T {
    return this.v
  }
}
