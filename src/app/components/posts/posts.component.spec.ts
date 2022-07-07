import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/Post/post.service';
import { PostComponent } from '../post/post.component';
import { PostsComponent } from './posts.component';

//making a fake component for child component   (bu hata çıkmasın diye: NG0303: Can't bind to 'routerLink' since it isn't a known property of 'a'.)
// @Component({
//   selector: 'app-post',
//   template: '<div></div>',
// })
// class FakePostComponent {
//   //Child componentin burada tanınması için bir fake component oluşturduk ve içerisine fake input ataması yaptık
//   @Input() post!: Post;
// }

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
      {
        id: 4,
        body: 'body 4',
        title: 'title 4',
      },
    ];

    mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost']); //service'deki methodları aldık ve componentte kullandık.

    TestBed.configureTestingModule({
      declarations: [PostsComponent, PostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    });

    // component = TestBed.inject(PostsComponent); //inject will create an instance for this one as a service
    fixture = TestBed.createComponent(PostsComponent); //fixture'u PostsComponentin bu test componentindeki yansıması haline getirdik.

    component = fixture.componentInstance; //Yukarıdaki yansımanın içindeki tüm temel öğeleri taşıdık.
    // console.log(component);

    // ***********************************Before Testbed and inject method***********************************
    //     //component = new PostsComponent();   //Error because PostsComponent has dependencia with PostService we should create mock Service
    //     mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost']);  //service'deki methodları aldık ve componentte kullandık.
    //     component = new PostsComponent(mockPostService);  //use mockService for dependencia with PostService
    // ***********************************Before Testbed and inject method***********************************
  });

  it('should create exact same number of Post Component with Posts', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS)); //bu test case getPost metodunu çağırdığında POSTS observable dönecek çünkü component içerisinde getPost metodunun subscriptionu var

    //ngOnInit her çalıştığında içerisindeki getPost çalışacağı için yukarıdaki kod parçasını yazdık, aşağıda ise çalıştığındaki olayları takip edicez.
    fixture.detectChanges();
    // console.log(fixture);

    const postComponentDEs = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    ); //posts.html içerisindeki <app-post>'u yakalamak için directive komutunu kullandık. Componentleri bulmak için directive kullanılır.

    expect(postComponentDEs.length).toEqual(POSTS.length);
  });

  it('should check whether exact post is sending to PostComponent', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS)); //gelen veriyi observable olarak döndü.

    fixture.detectChanges(); //değişiklikleri yakaladık ve bildirdik.

    const postComponentDEs = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );

    // console.log(postComponentDEs);
    for (let i = 0; i < POSTS.length; i++) {
      const postComponentInstance = postComponentDEs[i]
        .componentInstance as PostComponent;

      // console.log(postComponentInstance);

      expect(postComponentInstance.post.title).toEqual(POSTS[i].title);
    }
  });

  it('should set posts from the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS)); //bu test case getPost metodunu çağırdığında POSTS observable dönecek çünkü component içerisinde getPost metodunun subscriptionu var
    fixture.detectChanges();

    expect(component.posts.length).toBe(4);
  });

  it('should create one post child Element for each post', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS)); //bu test case getPost metodunu çağırdığında POSTS observable dönecek

    fixture.detectChanges();

    const debugElement = fixture.debugElement;
    const postElement = debugElement.queryAll(By.css('.posts'));

    expect(postElement.length).toBe(POSTS.length);
  });

  describe('delete', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true)); //Made subscribable with of method
      component.posts = POSTS;
    });

    it('should delete the selected Post from the posts', () => {
      component.delete(POSTS[1]);
      expect(component.posts.length).toBe(3);
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

    it('should call delete method when post component button is clicked',()=>{

      spyOn(component, 'delete')

      mockPostService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();

      let postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent))

      for (let i = 0; i < postComponentDEs.length; i++) {

        postComponentDEs[i].query(By.css('button')).triggerEventHandler('click',{preventDefault: ()=>{}});

      expect(component.delete).toHaveBeenCalledWith(POSTS[i])
      }


    })
  });
});
