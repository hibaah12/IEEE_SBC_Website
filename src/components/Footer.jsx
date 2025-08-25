const Footer = () => {
    return (
        <footer className="bg-ieee-blue text-white py-6">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} PACE IEEE Student Branch. All Rights Reserved.</p>
                <p className="mt-2">P.A. College of Engineering, Mangaluru</p>
            </div>
        </footer>
    );
}

export default Footer;