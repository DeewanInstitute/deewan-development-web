import Scribble from '../scribble/scribble'
import SplitWords from '../splitWords/splitWords'
import './sectionHeading.scss'

type SectionHeadingProps = {
  label: string
  title: string
  description?: string
  id?: string
}

// Circled label + big title. Each part carries data-reveal so it animates in one after the other.
function SectionHeading({ label, title, description, id }: SectionHeadingProps) {
  return (
    <header className="dw-heading">
      <p className="dw-heading-label">
        <Scribble className="dw-heading-scribble" data-reveal="draw" />
        <span data-reveal="fade">{label}</span>
      </p>
      <h2 id={id} className="dw-heading-title" data-reveal="words">
        <SplitWords text={title} />
      </h2>
      {description && (
        <p className="dw-heading-description" data-reveal="up">
          {description}
        </p>
      )}
    </header>
  )
}

export default SectionHeading
