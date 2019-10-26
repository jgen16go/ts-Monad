import { Monad } from '.'

describe('Maybe', () => {
  describe('モナド則', () => {
    test('`return x >>= f` should be equal `f a`', () => {
      // モナドから取り出した値に関数を適用するのと関数を値に適用することは等しい
      const f = (x: number) => x + 1
      const left = Monad.unit(1).bind(f)
      const right = Monad.unit(f(1))
      expect(left).toEqual(right)
    })

    test('`m >>= return` should be equal `m`', () => {
      // モナドから取り出した値をモナドに格納したものは元のモナドと等しい
      const m = Monad.unit(1)
      const left = Monad.unit(m.value())
      const right = m
      expect(left).toEqual(right)
    })

    test('`(m >>= f) >>= g` should be equal `m >>= (x -> f x >>= g)`', () => {
      // (m * f) * g == m * (f * g)
      // mf >>= g == m >>= fgのように見立てます。どちらもmがf→gの順に渡されます。処理される順番が同じなので、fやgがどのような関数であっても結果は同じです。
      const f = (x: number) => x + 1
      const g = (x: number) => x * 2
      const left = Monad.unit(Monad.unit(1).bind(f).value()).bind(g)
      const right = Monad.unit(Monad.unit(f(1)).bind(g)).value()
      expect(left).toEqual(right)
    })

    test(`chaining`, () => {
      const f = (x: number) => x + 1
      const g = (x: number) => x * 2
      const left = Monad.unit(1).bind(f).bind(g).value()
      expect(left).toEqual(4)
    })
  })
})
