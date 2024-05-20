import contractPhoto from "../assets/project-pics/contract-pic.jpg";
import dailyReportPhoto from "../assets/project-pics/daily-reports.jpg";
import electricalPhoto from "../assets/project-pics/electric-pic.jpg";
import financialPhoto from "../assets/project-pics/finance-doc.jpg";
import plumbingPhoto from "../assets/project-pics/plumbing-pic.png";
import staticPhoto from "../assets/project-pics/static-pic.webp";
import architecturalPhoto from "../assets/project-pics/arch-pic.webp";
import meetingPhoto from "../assets/project-pics/meeting-notes.webp";


const projectFolders = [
    { title: 'Mimari Proje Deposu', images: [architecturalPhoto] },
    { title: 'Statik Proje Deposu', images: [staticPhoto] },
    { title: 'Elektrik Tesisatı Deposu', images: [electricalPhoto] },
    { title: 'Su Tesisatı Deposu', images: [plumbingPhoto] },
    { title: 'Sözleşmeler', images: [contractPhoto] },
    { title: 'Finansal Kayıtlar', images: [financialPhoto] },
    { title: 'Toplantı Notları ve İletişim Kayıtları', images: [meetingPhoto] },
    { title: 'Günlük Raporlar ve İş Günlükleri', images: [dailyReportPhoto] }
];

export default projectFolders;