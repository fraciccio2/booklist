import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SeeComponent implements OnInit {
  uid!: string;
  id!: string;
  book: any={
    imageUrl: "",
    title: "",
    author: "",
    publ: "",
    year: "",
    rev: "",
    category: ""
  };

  constructor(private auth: AuthService, private route: ActivatedRoute, private bookService: BookService) {
    this.auth.users$.subscribe((user: any)=>{
      this.uid=user.uid;
      this.id=this.route.snapshot.params['id'];
      if(this.id){
        this.bookService.getBook(this.uid, this.id).pipe(take(1)).subscribe(book=>{
          this.book=book;
        })
      }
    })
   }

  ngOnInit(): void {
  }

}
