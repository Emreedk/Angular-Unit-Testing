import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../Logger/logger.service';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let mockLoggerService: any;
  let calculator: CalculatorService;
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;

  //Bu scope'taki tüm test case'lerden önce bunu çalıştır.

  beforeEach(() => {
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']); // Mocking the LoggerService
    TestBed.configureTestingModule({   //TestBed ile gerekli importları burada yapıyoruz. ngModule gibi düşünebiliriz.
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    });

    // console.log('calling before each')
    // spyOn(mockLoggerServive, 'log');      //alt satır aynı işlevi yapıyor.
    // calculator = new CalculatorService(mockLoggerService); //instance from CalculatorService ( alttaki kodla birlikte testbed kullanmaya başladık.)

    calculator = TestBed.inject(CalculatorService);


    // loggerServiceSpy = TestBed.inject(
    //   LoggerService
    // ) as jasmine.SpyObj<LoggerService>;
  });

  it('should add two numbers', () => {
    console.log('calling before add');

    //arrenge
    // ** working on beforeEach method **
    //act
    let result = calculator.add(2, 2);

    //assert
    expect(result).toBe(4);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    console.log('calling before subtract');

    //arrenge
    // ** working on beforeEach method **

    //act
    let result = calculator.subtract(2, 2);

    // assert
    expect(result).toBe(0);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
});
