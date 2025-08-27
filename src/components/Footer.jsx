const Footer = () => {
  return (
    <footer className="bg-ieee-blue text-white py-6">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center space-x-4 py-4 ">
          <span>Connect with us -</span>
          <div className="flex space-x-3">
            <a
              href="https://www.linkedin.com/school/p-a-college-of-engineering-mangalore/?originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                alt="LinkedIn"
                className="h-8 w-8 opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
            <a
              href="https://www.instagram.com/pacemangalore_official/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                className="h-8 w-8 opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
        <p>
          &copy; {new Date().getFullYear()} PACE IEEE Student Branch. All Rights
          Reserved.
        </p>
        <p className="mt-2">P A College of Engineering, Mangaluru</p>
      </div>
    </footer>
  );
};

export default Footer;
