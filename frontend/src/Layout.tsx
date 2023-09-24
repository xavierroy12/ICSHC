import NavBar from "./components/NavBar"

type Props ={
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="layout">
            <NavBar />
            <div className="content">{children}</div>
        </div>
    )
}
export default Layout