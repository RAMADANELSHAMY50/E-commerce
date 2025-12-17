import "../footer/Footer.css"

function Footer() {
  return (
    <footer className='flex'>
      <ul className='flex  '>
        <li><a href="#home">Home</a></li>
        <li><a href="#collect">Collection</a></li>
        <li><a href="#prod">Products</a></li>
      </ul>

      <p className=' '> © {new Date().getFullYear()} Ramadan Elshamy — All Rights Reserved.</p>
    </footer>
  )
}

export default Footer