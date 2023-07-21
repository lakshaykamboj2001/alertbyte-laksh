import Link from 'next/link';
import Image from 'next/image';



function Header() {
 
  return (
    <>
      <nav className="logo-header">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <img src="/global/alert-byte-logo.png" alt="" />
          </Link>
        </div>
      </nav>
    </>
  )
}
export default Header;
