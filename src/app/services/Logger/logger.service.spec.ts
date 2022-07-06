import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  beforeEach(() => {
    //arrange
    // service = new LoggerService();  // Testbed kullanmadan önce yaptığımız ilkel yöntem.
    TestBed.configureTestingModule({
      providers: [LoggerService],
    });

    service = TestBed.inject(LoggerService); //herhangi bir dependencia yok ise inject kullanabiliriz. herhangi bir dependencia varsa mock service yapmalıyız (jasmine.createSpyObj(['metodIsmi']))
  });

  it('should not have any messages at starting', () => {
    //act
    let count = service.messages.length;

    //assert
    expect(count).toBe(0);
  });

  it('should add the message when log is called', () => {
    //act
    service.log('message');

    //assert
    expect(service.messages.length).toBeGreaterThan(0);
  });

  it('should clear all messages when clear is called', () => {
    //arrenge
    service.log('message');

    //act
    service.clear();

    //assert
    expect(service.messages.length).toBe(0);
  });
});
