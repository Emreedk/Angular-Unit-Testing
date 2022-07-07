import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing';

//Angular ekibinin yapmış olduğu httpClientTestingModule ile httpClient testini gerçekleştireceğiz.
//Burada direkt olarak bir service'i test etmiyoruz, HttpClientService'i test ediyoruz.

let testUrl = '/data';
interface Data {
  name: string;
}

describe('Http Client Testing Module', () => {
  let httpClient: HttpClient;
  let httpTestingController : HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController)

  });
  it('should call the testUrl with get Request', () => {
    const testData : Data = { name: 'Emre Demirkazık'}


    httpClient.get<Data>(testUrl).subscribe( data =>{
      console.log(data)
      expect(data).toEqual(testData)
    });   //httpClient.get metodunu çağırdık içine testUrl'i verdik


    // httpClient.get<Data>(testUrl).subscribe();   //Bu satır aktif olursa error verir çünkü alt satırda bir kere çağırılmalı dedik.


    const request = httpTestingController.expectOne(testUrl)   // httpClient.get metodunun sadece bir kere çağırılmasını test ettik.

    request.flush(testData)  //request'in içindeki url'in body'sine mock data yolladık.

    expect(request.request.method).toEqual('GET')  //yukarıdaki verilerle yaptığımız işlemi method çalışıyor mu şeklinde yapmak
  });

  it('should test multiple Request', ()=>{
    const testData  :Data[] =[{name: 'Emre'}, {name: 'Onur'}];

    httpClient.get<Data[]>(testUrl).subscribe(data =>{
      expect(data.length).toEqual(0)
    });

     httpClient.get<Data[]>(testUrl).subscribe(data =>{
      expect(data).toEqual([testData[0]])
    });

    httpClient.get<Data[]>(testUrl).subscribe(data =>{
      expect(data).toEqual(testData)
    });

    const request = httpTestingController.match(testUrl);

    expect(request.length).toEqual(3)
    request[0].flush([])
    request[1].flush([testData[0]])
    request[2].flush(testData)
  })
});
