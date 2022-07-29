

describe('First Test', ()=>{
  let testVariable : any;



//First Test should return true if  a is true
  it('should return true if a is true', ()=>{
    //arrenge
    testVariable = {}  //tanımlama yapıldı

    //act
    testVariable.a = true;  // test edilecek kod çalıştırıldı

    //assert
    expect(testVariable.a).toBe(true)  //test sonuçları doğrulandı mı?
  })
})


//UserService => getUser method should return the correct given user

// describe('User Service', ()=>{
//   describe('getUser() method', ()=>{
//     it('should return the correct given user',()=>{

//     })
//   })
// })
