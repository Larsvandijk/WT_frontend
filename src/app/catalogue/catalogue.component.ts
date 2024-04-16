import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { ReadBookDto } from '../../dto/ReadBookDto';
import { BookFormComponent } from '../book-form/book-form.component';
import { BookService } from '../book.service';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [NgFor, CommonModule, BookComponent, BookFormComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {
  books = new Array<ReadBookDto>();

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((response) => {
      this.books = response.data;
    });
  }

}
