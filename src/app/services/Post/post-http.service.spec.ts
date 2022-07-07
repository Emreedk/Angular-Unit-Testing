import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';

describe('postService using with HttpClientTestingModule', () => {
  let postService: PostService;

  let httpClientTestingController: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule],
    });

    postService = TestBed.inject(PostService);
    httpClientTestingController = TestBed.inject(HttpTestingController);
  });

  describe('getPosts()', () => {
    it('should return posts when getPosts() is called', () => {
      postService.getPosts().subscribe((data) => {
        console.log(data);
        expect(data).toEqual(POSTS);
      });
      const request = httpClientTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts'
      );
      request.flush(POSTS);

      expect(request.request.method).toBe('GET');
    });
  });

  describe('postDetail()', () => {
    it('should return single post when postDetail is called with postId', () => {
      postService.postDetail(1).subscribe();
      // postService.postDetail(2).subscribe(); //normalde hata vermez ama altta tanımladığımız verify metodu bu satırı görünce hata verdirir.

      const request = httpClientTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts/1'
      );

      expect(request.request.method).toBe('GET');

      httpClientTestingController.verify(); //birden fazla postDetail çağırıldığında aralarından biri doğruysa hata vermez fakat verify metodu bize URL'deki id ile postDetail'e verilen id'lerin kesinlikle uyuşmasını bekler. uyuşmayan varsa hata verir.
    });
  });
});
