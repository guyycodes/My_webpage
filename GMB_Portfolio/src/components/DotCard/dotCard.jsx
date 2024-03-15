import React from 'react';
import cardStyles from './dotCard.module.css'
import { Morph } from '../TextMorph/textMorph';


export function DotsCard({content, content2}) {
  
  
  return (
  <>
      <div className={cardStyles.card}>
  <div className={cardStyles.card__img} >
      {content}
      <div className={cardStyles.card_text}>
       {content2}
      </div>
    <div className={cardStyles.card__gridEffect}>
      {/* Loop through numbers 1 to 100 */}
      {Array.from({ length: 100 }, (_, index) => (
        <a key={index} className={cardStyles.card__gridEffectTile} href='#'></a>
        ))}
    </div>
  </div>
</div>

</>

  )
}
