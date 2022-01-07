import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ms=3; ss=97;
  isMobile: boolean=false;
  search: string="title";
  books$: any;
  filterBook: any;
  uid!: string;
  displayedColumns: string[] = ['number', 'title', 'author', 'publ', 'open'];

  constructor(private auth: AuthService, private bookService: BookService, private breakOb: BreakpointObserver) {
    this.auth.users$.subscribe((user: any)=>{
      this.uid=user.uid;
      this.bookService.getBooks(this.uid).subscribe((book: any)=>{
        this.books$=this.filterBook=book;
        this.filterBook.slice(0,10);
      })
    })
    this.breakOb.observe(['(max-width: 789px)']).subscribe(result => {
      this.isMobile = result.matches;
      if(this.isMobile){
        this.ms=10;
        this.ss=90;
      }
      else{
        this.ms=3;
        this.ss=97;
      }
    });
   }

  ngOnInit(): void {
  }

  applyFilter(query: any){
    if(this.search==="publishing house"){
      this.filterBook = (query) 
      ? this.books$?.filter((p: any) => p && p.payload.val().publ ? p.payload.val().publ.toLowerCase().includes(query.toLowerCase()) : null)
      : this.books$;
    }
    else if(this.search==="author"){
      this.filterBook = (query) 
      ? this.books$?.filter((p: any) => p && p.payload.val().author ? p.payload.val().author.toLowerCase().includes(query.toLowerCase()) : null)
      : this.books$;
    }
    else{
      this.filterBook = (query) 
      ? this.books$?.filter((p: any) => p && p.payload.val().title ? p.payload.val().title.toLowerCase().includes(query.toLowerCase()) : null)
      : this.books$;
    }
  }

  number(filter: any){
    let index=this.books$.indexOf(filter);
    return index+1;
  }

  paginatorE(event: any){
    const starIndex = event.pageIndex * event.pageSize;
    let endIndex = starIndex + event.pageSize;
    if(endIndex > this.books$.length)
      endIndex=this.books$.length;
    this.filterBook=this.books$.slice(starIndex, endIndex);
  }

}
