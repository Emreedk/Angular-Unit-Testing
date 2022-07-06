import { LoggerService } from '../Logger/logger.service';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let mockLoggerService: any;
  let calculator: CalculatorService;

  //Bu scope'taki tüm test case'lerden önce bunu çalıştır.
  beforeEach(() => {
    console.log('calling before each')
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']); //Mocking the injected service
    // spyOn(mockLoggerServive, 'log');      //we don't need this line because the above action does this
    calculator = new CalculatorService(mockLoggerService);   //instance from CalculatorService
  });

  it('should add two numbers', () => {
    console.log('calling before add')

    //arrenge
    // ** working on beforeEach method **

    //act
    let result = calculator.add(2, 2);

    //assert
    expect(result).toBe(4);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    console.log('calling before subtract')

    //arrenge
    // ** working on beforeEach method **

    //act
    let result = calculator.subtract(2, 2);

    // assert
    expect(result).toBe(0);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
});
