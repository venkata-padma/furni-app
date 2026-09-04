import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './LegalPage.css';

function LegalPage({ title, intro, sections }) {
  return (
    <main className="legal-page container">
      <Link className="legal-page__back" to="/"><ArrowLeft size={17} /> Back to home</Link>
      <article className="legal-page__article">
        <p className="legal-page__eyebrow">Furni policies</p>
        <h1>{title}</h1>
        <p className="legal-page__intro">{intro}</p>
        <p className="legal-page__updated">Last updated: September 4, 2026</p>
        <div className="legal-page__sections">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}

export default LegalPage;
