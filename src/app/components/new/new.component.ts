import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { StorageService } from 'src/app/services/storage.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  book: any = {
    imageUrl: "",
    title: "",
    author: "",
    publ: "",
    year: "",
    rev: "",
    category: ""
  }
  uid!: string;
  id!: string;
  cols: number = 2;
  isMobile: boolean = false;
  categories: string[] = ['Adventure', 'Biography', 'Classic', 'Comic', 'Fantasy', 'Historical', 'Horror', 'Romance', 'Sci-Fi',
    'Thriller', 'Other'
  ];
  nameP: string = ""; file!: File; photo: any;

  constructor(private auth: AuthService, private bookService: BookService, private router: Router,
    private route: ActivatedRoute, private dialog: MatDialog, private breakOb: BreakpointObserver,
    private storage: StorageService) {
    this.auth.users$.subscribe((user: any) => {
      this.uid = user.uid;
      this.id = this.route.snapshot.params['id'];
      if (this.id) {
        this.bookService.getBook(this.uid, this.id).subscribe(book => this.book = book);
      }
    })
    this.breakOb.observe(['(max-width: 789px)']).subscribe(result => {
      this.isMobile = result.matches;
      if (this.isMobile) this.cols = 1;
      else this.cols = 2;
    });
  }

  ngOnInit(): void {
  }

  save() {
    if (this.nameP !== "") {
      this.storage.saveImage(this.nameP, this.file).then(percent => {
        if (percent.bytesTransferred === percent.totalBytes) {
          const fileRef = this.storage.url(this.nameP);
          fileRef.getDownloadURL().subscribe((url: any) => {
            this.book.imageUrl = url;
            if (this.id)
              this.bookService.update(this.book, this.uid, this.id);
            else
              this.bookService.create(this.book, this.uid);
          })
        }
      });
    } else {
      if (this.id)
        this.bookService.update(this.book, this.uid, this.id);
      else
        this.bookService.create(this.book, this.uid);
    }
    this.router.navigate(['/list']);
  }

  delete() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.delete(this.uid, this.id);
        this.router.navigate(['/list']);
      }
    });
  }
  fileSelected(event: any) {
    this.nameP = event.target.files[0].name;
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => this.photo = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
  }

}
