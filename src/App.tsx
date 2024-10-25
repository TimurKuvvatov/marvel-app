import { FC } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import './scss/main.scss';

const App: FC = () => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default App;
