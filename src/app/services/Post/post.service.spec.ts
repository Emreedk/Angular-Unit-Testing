import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { PostService } from "./post.service"

describe('Post Service', ()=>{
let postService : PostService;
let httpClientSpy : jasmine.SpyObj<HttpClient>
let POSTS = [
  {
    id: 1,
    body: 'body 1',
    title: 'title 1',
  },
  {
    id: 2,
    body: 'body 2',
    title: 'title 2',
  },
  {
    id: 3,
    body: 'body 3',
    title: 'title 3',
  },
  {
    id: 4,
    body: 'body 4',
    title: 'title 4',
  },
];
  beforeEach(()=>{
    httpClientSpy = jasmine.createSpyObj('HttpClient',['get','post'])
    postService = new PostService(httpClientSpy)

  })

describe('getPosts()',()=>{
 it('should return expected posts when getPosts() is called',()=>{
httpClientSpy.get.and.returnValue(of(POSTS))
postService.getPosts().subscribe({
  next: (posts) => {
    expect(posts).toEqual(POSTS)
  },
  error:()=>{}
});
expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  })
})

})
