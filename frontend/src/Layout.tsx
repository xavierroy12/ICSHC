import NavBar from './components/NavBar';
import Footer from './components/Footer';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="layout min-h-screen flex flex-col">
      <NavBar />
      <div className="content flex-grow">{children}</div>
      <Footer/>
    </div>
  );
};
export default Layout;
