import { FC } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import CharactersPage from './pages/CharactersPage';
import { mockCharacters } from './data/mockData';
import './scss/main.scss';
const App: FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <CharactersPage characters={mockCharacters} />
      </div>
      <Footer />
    </>
  );
};

export default App;
