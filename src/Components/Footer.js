import React from 'react';

function Footer(){
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="mx-auto text-left">
          <h4 className="text-lg font-bold mb-2">Contact Us</h4>
          <ul className="space-y-2">
            <li>Email: anshikachamoli2004@gmail.com</li>
            <li>LinkedIn: <a href="https://www.linkedin.com/in/anshika-chamoli-5b9b4a1b2" target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-400">Anshika Chamoli</a></li>
            <li>Twitter: <a href="https://twitter.com/Anshika1804" target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-400">@Anshika1804</a></li>
            <li>Mobile Number: 9837902661</li>
          </ul>
        </div>
        <div className="text-left mx-auto">
          <h4 className="text-lg font-bold mb-2">Follow Us</h4>
          <ul className="space-y-2">
            <li>Facebook : <a href="//" target="_blank" rel="noreferrer"  className="text-blue-300 hover:text-blue-400">Anshika Chamoli</a></li>
            <li>Instagram : <a href="https://www.instagram.com/anshika_chamoli_18" target="_blank" rel="noreferrer"  className="text-blue-300 hover:text-blue-400">anshika_chamoli_18</a></li>
            <li>YouTube : <a href="//" target="_blank" rel="noreferrer"  className="text-blue-300 hover:text-blue-400">Anshika Chamoli</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-4 text-center">
        <p>&copy; {new Date().getFullYear()} BidMaster. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
