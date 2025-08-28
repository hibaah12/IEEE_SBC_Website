import { FaLinkedin } from 'react-icons/fa';

const ExeComPage = () => {
    const members = [
        { title: "Branch Counselor", name: "Dr. Mohammed Zakir Bellary", img: "/images/zakir.png" },
        { title: "Chair", name: "Abdul Kader Suhair Afran", img: "/images/afran.png" },
        { title: "Vice Chair", name: "Rihan Muhammed Nellikar", img: "/images/rihan.jpg" },
        { title: "Secretary", name: "Swati Mahesh Kuravattimath", img: "/images/swathi.jpg" },
    ];

    // Updated societyChapters array with LinkedIn URLs
    const societyChapters = [
        { id: 1, acronym: "IEEE CEDA", fullName: "Council on Electronic Design Automation", chair: { name: "Nihal Ahmed Shet", img: "/images/nihal.png", linkedinUrl: "https://www.linkedin.com/in/placeholder-nihal" } },
        { id: 2, acronym: "IEEE AESS", fullName: "Aerospace and Electronic Systems Society", chair: { name: "Aamir Habeeb", img: "/images/aamir.png", linkedinUrl: "https://www.linkedin.com/in/placeholder-aamir" } },
        { id: 3, acronym: "IEEE EMBS", fullName: "Engineering in Medicine and Biology Society", chair: { name: "Mohammed Zohan", img: "/images/zohan.png", linkedinUrl: "https://www.linkedin.com/in/placeholder-zohan" } },
        { id: 4, acronym: "IEEE TEMS", fullName: "Technology and Engineering Management Society", chair: { name: "Mohammed Zaid", img: "/images/zaid.png", linkedinUrl: "https://www.linkedin.com/in/placeholder-zaid" } },
        { id: 5, acronym: "IEEE WIE", fullName: "Women in Engineering", chair: { name: "Swati Mahesh Kuravattimath", img: "/images/swathi.jpg", linkedinUrl: "https://www.linkedin.com/in/placeholder-swati" } },
        { id: 6, acronym: "IEEE RAS", fullName: "Robotics and Automation Society", chair: { name: "Rihan Muhammed Nellikar", img: "/images/rihan.jpg", linkedinUrl: "https://www.linkedin.com/in/placeholder-rihan" } },
        { id: 7, acronym: "IEEE ProComm", fullName: "Professional Communication Society", chair: { name: "Sayeda Mariya Nishat Munshi", img: "/images/sayeda.png", linkedinUrl: "https://www.linkedin.com/in/placeholder-sayeda" } },
        { id: 8, acronym: "IEEE CIS", fullName: "Computational Intelligence Society", chair: { name: "Hiba A H", img: "/images/hiba.png", linkedinUrl: "https://www.linkedin.com/in/placeholder-hiba" } },
        { id: 9, acronym: "IEEE CS", fullName: "Computer Society", chair: { name: "Swati Mahesh Kuravattimath", img: "/images/swathi.jpg", linkedinUrl: "https://www.linkedin.com/in/placeholder-swati" } },
        { id: 10, acronym: "IEEE MTT-S", fullName: "Microwave Theory and Techniques Society", chair: { name: "Mohammed Zohan", img: "/images/zohan.png", linkedinUrl: "https://www.linkedin.com/in/placeholder-zohan" } },
        { id: 11, acronym: "IEEE GRSS", fullName: "Geoscience and Remote Sensing Society", chair: { name: "Farseen Ahras", img: "/images/ahras.png", linkedinUrl: "https://www.linkedin.com/in/placeholder-ahras" } },
        { id: 12, acronym: "IEEE SPS", fullName: "Signal Processing Society", chair: { name: "Farseen Ahras", img: "/images/ahras.png", linkedinUrl: "https://www.linkedin.com/in/placeholder-ahras" } },
        { id: 13, acronym: "IEEE SIGHT", fullName: "Special Interest Group on Humanitarian Technology", chair: { name: "Deepushree H P", img: "/images/deepushree.png", linkedinUrl: "https://www.linkedin.com/in/placeholder-deepushree" } },
    ];

    return (
        <div className="pt-24 pb-16 min-h-screen container mx-auto px-4">