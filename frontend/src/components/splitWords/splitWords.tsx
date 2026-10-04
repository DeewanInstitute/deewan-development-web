import { Fragment } from 'react'

type SplitWordsProps = {
  text: string
  // words to colour amber, e.g. the "Digital" in the hero title
  highlight?: string[]
}

// Wraps every word in a mask so GSAP can slide it up (see useScrollReveal "words")
function SplitWords({ text, highlight = [] }: SplitWordsProps) {
  const words = text.split(' ')

  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className={`dw-word${highlight.includes(word) ? ' is-highlight' : ''}`}>
            <span>{word}</span>
          </span>
          {index < words.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  )
}

export default SplitWords
