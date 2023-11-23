import NavBar from './components/NavBar';
import Footer from './components/Footer';

type Props = {
  darkMode: boolean;
  handleThemeChange: () => void;
  children: React.ReactNode;
  //test
  showNavAndFooter: boolean; // new prop

};

const Layout = ({ darkMode, handleThemeChange, children, showNavAndFooter }: Props) => {
  return (
    <div className="layout flex flex-col min-h-screen">
      {showNavAndFooter && <NavBar darkMode={darkMode} handleThemeChange={handleThemeChange} />}
      <div className="content flex-grow">{children}</div>
      {showNavAndFooter && <Footer />}
    </div>
  );
};
export default Layout;
