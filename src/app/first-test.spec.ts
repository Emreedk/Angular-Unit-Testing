

describe('First Test', ()=>{
  let testVariable : any;

  beforeEach(()=>{
    testVariable = {};
  })

//First Test should return true if  a is true
  it('should return true if a is true', ()=>{
    //arrenge
    testVariable.a = false;

    //act
    testVariable.a = true;

    //assert
    expect(testVariable.a).toBe(true)
  })
})


//UserService => getUser method should return the correct given user

// describe('User Service', ()=>{
//   describe('getUser() method', ()=>{
//     it('should return the correct given user',()=>{

//     })
//   })
// })
