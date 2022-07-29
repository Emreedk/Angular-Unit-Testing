
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostComponent } from './post.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('Post Component', () => {
    // ------------------------with testbed-------------------------------------

  let fixture : ComponentFixture<PostComponent>;
  let comp :PostComponent;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

     fixture = TestBed.createComponent(PostComponent);

     comp = fixture.componentInstance;
   })


  it('should create post component using TestBed', () => {
    expect(comp).toBeDefined();
  });

  it('should render the post title in the anchor element using debugElement', ()=>{

    const post: Post = {
      id: 1,
      body: 'body 1',
      title: 'title 1',
    };
    comp.post = post;  //component propertylere ekleme ya da değişiklik yaptığımızda bunu belirtmemiz gerekir. Bunun için fixture.detectChanges kullanırız. Aksi takdirde html elementleri atanan değişiklikleri bilmez ve null değer alır.

    fixture.detectChanges();  // bu komut sayesinde değişiklikleri takip ettik ve bildirdik.

    const postDebugElement : DebugElement = fixture.debugElement;   // html elementlerine erişime olanak sağlandı.

    const aElement : HTMLElement = postDebugElement.query(By.css('a')).nativeElement;

    expect(aElement.textContent).toContain(post.title);
  })

  it('should render the post title in the anchor element using nativeElement', ()=>{

    const post: Post = {
      id: 1,
      body: 'body 1',
      title: 'title 1',
    };
    comp.post = post;  //component propertylere ekleme ya da değişiklik yaptığımızda bunu belirtmemiz gerekir. Bunun için fixture.detectChanges kullanırız. Aksi takdirde html elementleri atanan değişiklikleri bilmez ve null değer alır.

    fixture.detectChanges();  // bu komut sayesinde değişiklikleri takip ettik ve bildirdik.

    const postElement : HTMLElement = fixture.nativeElement;   // html elementlerine erişime olanak sağlandı.

    const a = postElement.querySelector('a');  // a elementine erişildi.

    expect(a?.textContent).toContain(post.title);
  })


  it('should raise and event when the delete post is clicked', () => {


    const post: Post = {
      id: 1,
      body: 'body 1',
      title: 'title 1',
    };

    comp.post = post;

    comp.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(post);
    });

    comp.onDeletePost(new MouseEvent('click')); //onDeletePost'a tıklandı ve comp.delete çalıştı ve expectation gerçekleşti.

    //  ---------------------------------------------without testbed--------------------------------------------
    // const comp = new PostComponent();
    // const post: Post = {
    //   id: 1,
    //   body: 'body 1',
    //   title: 'title 1',
    // };
    // comp.post = post;

    // comp.delete.pipe(first()).subscribe((selectedPost) => {
    //   expect(selectedPost).toEqual(post);
    // });

    // comp.onDeletePost(new MouseEvent('click')); //onDeletePost'a tıklandı ve comp.delete çalıştı ve expectation gerçekleşti.
  });
});
