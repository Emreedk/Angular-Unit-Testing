import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('create an instance', () => {
    const pipe = new StrengthPipe();
    expect(pipe).toBeTruthy();
  });

  it('should display weak if 5 value is passed', ()=>{
    const pipe = new StrengthPipe();
    expect(pipe.transform(5)).toEqual(`5 is weak`)

  })

  it('should display strong if value is between 10-20', ()=>{
    const pipe = new StrengthPipe();
    expect(pipe.transform(14)).toEqual(`14 is strong`)

  })

  it('should display strongest if value is over or equal 20', ()=>{
    const pipe = new StrengthPipe();
    expect(pipe.transform(44)).toEqual(`44 is strongest`)

  })
});
