import { Component, Input } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { Produtos } from '../../models/Produtos';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CarouselAnimation, fadeIn, fadeOut} from './carousel.animation';
import {trigger ,transition, useAnimation} from '@angular/animations';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule,
            MatCardModule,
            MatButtonModule,
            MatIconModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('slideAnimation', [
      transition('void => fade', [
        useAnimation(fadeIn, { params: { time: '0.5s' } })  
      ]),
      transition('fade => void', [
        useAnimation(fadeOut,{params:{time: '0.5s'}})
      ])
    ])
  ]
})
export class CarouselComponent {
  @Input() animationType = CarouselAnimation.Fade;
  imagem:Produtos[] = [];
  currentMovie = 0;
  constructor(private imagensService:ImagesService)
  {}

  ngOnInit():void{
    this.obterImagens();
  }



  onPeviousClick(){
      const previous = this.currentMovie -1;
      this.currentMovie = previous < 0 ? this.imagem.length -1 : previous;
      //esta linha esta determinando que em caso de que se o index chegar a -1, em vez de travar o carousel ele apenas pegar o ultimo item do array,
      //e os : se não for ele apenas roda o previous 
  }

  onNextClick(){
    const next = this.currentMovie + 1;
    this.currentMovie = next == this.imagem.length ? 0 : next
  }

  obterImagens() {
    this.imagensService.getImages()
    .subscribe(
      produtos => {this.imagem = produtos,
        console.log(produtos)
      }
    )
  }
}
