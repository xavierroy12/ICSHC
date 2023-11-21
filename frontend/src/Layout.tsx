import NavBar from './components/NavBar';

type Props = {
  darkMode: boolean;
  handleThemeChange: () => void;
  children: React.ReactNode;
};

const Layout = ({ darkMode, handleThemeChange, children }: Props) => {
    
  return (
    <div className="layout">
      <NavBar darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <div className="content">{children}</div>
    </div>
  );
};
export default Layout;
