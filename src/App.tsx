import { FC } from 'react';
import './scss/main.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes';
const App: FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <AppRoutes/>
      </div>
      <Footer />
    </>
  );
};

export default App;
