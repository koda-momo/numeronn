export class Result {
  constructor(
    private _answer1: number,
    private _answer2: number,
    private _answer3: number,
    private _result: string
  ) {}

  public get answer1(): number {
    return this._answer1;
  }

  public set answer1(answer1: number) {
    this._answer1 = answer1;
  }

  public get answer2(): number {
    return this._answer2;
  }

  public set answer2(answer2: number) {
    this._answer2 = answer2;
  }

  public get answer3(): number {
    return this._answer3;
  }

  public set answer3(answer3: number) {
    this._answer3 = answer3;
  }

  public get result(): string {
    return this._result;
  }

  public set result(result: string) {
    this._result = result;
  }
}
