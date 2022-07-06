import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../Logger/logger.service';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let mockLoggerService: any;
  let calculator: CalculatorService;
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;

  //Bu scope'taki tüm test case'lerden önce bunu çalıştır.
  beforeEach(() => {
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']); //Mocking the injected service

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    });

    // console.log('calling before each')
    // spyOn(mockLoggerServive, 'log');      //we don't need this line because the above action does this
    // calculator = new CalculatorService(mockLoggerService); //instance from CalculatorService ( alttaki kodla birlikte testbed kullanmaya başladık.)

    calculator = TestBed.inject(CalculatorService);


    loggerServiceSpy = TestBed.inject(
      LoggerService
    ) as jasmine.SpyObj<LoggerService>; //Yukarıda yaptığımız provide işleminde useValue olarak tanımladığımız mockLoggerService işlemini burada da bu şekilde kullanabiliriz.
  });

  it('should add two numbers', () => {
    console.log('calling before add');

    //arrenge
    // ** working on beforeEach method **

    //act
    let result = calculator.add(2, 2);

    //assert
    expect(result).toBe(4);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    console.log('calling before subtract');

    //arrenge
    // ** working on beforeEach method **

    //act
    let result = calculator.subtract(2, 2);

    // assert
    expect(result).toBe(0);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });
});
