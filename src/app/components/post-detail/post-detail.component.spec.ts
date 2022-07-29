import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/Post/post.service';
import { PostDetailComponent } from './post-detail.component';

describe('PostDetailComponent', () => {
  let fixture : ComponentFixture<PostDetailComponent>
  let mockPostService : jasmine.SpyObj<PostService>
  beforeEach(() => {
    //ActivatedRoute'u kullanırken zincirleme metodlar kullandığımız için biraz daha komplex bir yapıda.
    //şöyle ki; const id = this.route.snapshot.paramMap.get('id');
    let mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    };

     mockPostService = jasmine.createSpyObj(['postDetail', 'updatePost']); //method ve propertylere ulaşabilmek için createSpyObj aracılığıyla mockladık

    let mockLocation = jasmine.createSpyObj(['back']); //method ve propertylere ulaşabilmek için createSpyObj aracılığıyla mockladık

    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute},
      ],
    });

    fixture = TestBed.createComponent(PostDetailComponent)
  });

  it('should render the post title in h2 template', ()=>{

    mockPostService.postDetail.and.returnValue(of({
      id: 3,
      title: 'title 1',
      body: 'body 1'
    } as Post))


    fixture.detectChanges();

    // const elementDEs = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement;   //alttaki kod parçası ile aynı iş
    const elementDEs = fixture.nativeElement.querySelector('h2') as HTMLElement;
    expect(elementDEs.textContent).toEqual('Title : title 1')

  })
});
