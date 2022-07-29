import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/Post/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post!: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location : Location
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');

    id &&
      this.postService.postDetail(+id).subscribe((data) => {
        console.log(data)
        this.post = data;
      });
  }

  goBack(){
    this.location.back();
  }

  save(){
    this.postService.updatePost(this.post).subscribe(()=>{
      this.goBack();
    });
  }
}
