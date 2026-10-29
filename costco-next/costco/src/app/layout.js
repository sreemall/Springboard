import NavBar from "@/components/NavBar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body">
        <div className="root-layout">
          <header className="header">
            <div className="header-title">
              <h1>Costco Products Price Tracking</h1>
              <img className="logo" src="/costco_logo.png" alt="Costco Logo" />  
            </div>
            <NavBar />
        </header>
        <main className="main">
          {children}
        </main>
        <footer className="footer">
          {/* <button className="go-back" onClick={goBack}>Go Back</button> */}
        </footer>
        </div>
     </body>
    </html>   
  );
}
