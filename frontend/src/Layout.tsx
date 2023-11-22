import NavBar from './components/NavBar';
import Footer from './components/Footer';

type Props = {
  darkMode: boolean;
  handleThemeChange: () => void;
  children: React.ReactNode;
};

const Layout = ({ darkMode, handleThemeChange, children }: Props) => {
    return (
      <div className="layout flex flex-col min-h-screen">
        <NavBar darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <div className="content flex-grow">{children}</div>
        <Footer/>
      </div>
    );
  };
  export default Layout;
