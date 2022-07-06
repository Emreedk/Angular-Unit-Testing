import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/Post/post.service';
import { PostsComponent } from './posts.component';

//making a fake component for child component   (bu hata çıkmasın diye: NG0304: 'app-post' is not a known element:)
@Component({
  selector: 'app-post',
  template: '<div></div>',
})
class FakePostComponent {
  //Child componentin burada tanınması için bir fake component oluşturduk ve içerisine fake input ataması yaptık
  @Input() post!: Post;
}

describe('Posts Component', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockPostService: any;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(() => {
    POSTS = [
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
    ];

    mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost']); //service'deki methodları aldık ve componentte kullandık.

    TestBed.configureTestingModule({
      declarations: [PostsComponent, FakePostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    });

    // component = TestBed.inject(PostsComponent); //inject will create an instance for this one as a service
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;

    // ***********************************Before Testbed and inject method***********************************
    //     //component = new PostsComponent();   //Error because PostsComponent has dependencia with PostService we should create mock Service
    //     mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost']);  //service'deki methodları aldık ve componentte kullandık.
    //     component = new PostsComponent(mockPostService);  //use mockService for dependencia with PostService
    // ***********************************Before Testbed and inject method***********************************
  });

  it('should set posts from the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS)); //bu test case getPost metodunu çağırdığında POSTS observable dönecek
    fixture.detectChanges();

    expect(component.posts.length).toBe(3);
  });

  it('should create one post child Element for each post', ()=>{
    mockPostService.getPosts.and.returnValue(of(POSTS)); //bu test case getPost metodunu çağırdığında POSTS observable dönecek

    fixture.detectChanges();

    const debugElement = fixture.debugElement;
    const postElement = debugElement.queryAll(By.css('.posts'))

    expect(postElement.length).toBe(POSTS.length)
  })

  describe('delete', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true)); //Made subscribable with of method
      component.posts = POSTS;
    });

    it('should delete the selected Post from the posts', () => {
      component.delete(POSTS[1]);
      expect(component.posts.length).toBe(2);
    });

    it('should delete the actual selected Post in Posts', () => {
      component.delete(POSTS[1]);

      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });

    it('should call the delete method in Post Service only once', () => {
      component.delete(POSTS[1]);
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});
