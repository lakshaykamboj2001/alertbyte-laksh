
import Footer from './components/footer';
import Header from './components/header';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
