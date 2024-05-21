import architect from '../assets/project-teams/architect-photo.jpg';
import civilEngineer from '../assets/project-teams/civil-engineer.webp';
import constructionGuard from '../assets/project-teams/construction-guard.jpg';
import constructionWorker from '../assets/project-teams/construction-worker.webp';
import ceoPic from "../assets/project-teams/ceo-pic.jpg";
import calcPic from '../assets/project-teams/calc-pic.jpeg';
import humanResources from '../assets/project-teams/human-resources-photo.webp';
import interiorArchitect from '../assets/project-teams/interior-arch.webp';
import mechanicalEngineer from '../assets/project-teams/mech-eng.jpeg';
import guardCons from '../assets/project-teams/guard-cons.png';
import headArch from '../assets/project-teams/head-arch.webp';

const jobTitles = [
    {
        id: 1,
        name: 'Mimarlar',
        photo: architect,
        title: 'Mimar'
    },
    {
        id: 2,
        name: 'İç Mimarlar',
        photo: interiorArchitect,
        title: 'İç mimar'
    },
    {
        id: 3,
        name: 'Baş Mimar / Baş Mühendis',
        photo: headArch,
        title: 'Baş Mimar'
    },
    {
        id: 4,
        name: 'İnşaat Mühendisleri',
        photo: civilEngineer,
        title: 'İnşaat mühendisi'
    },
    {
        id: 5,
        name: 'Mekanik Mühendisler',
        photo: mechanicalEngineer,
        title: 'Mekanik mühendisi'
    },
    {
        id: 6,
        name: 'Muhasabe Uzmanları',
        photo: calcPic,
        title: 'Muhasebe uzmanı'
    },
    {
        id: 7,
        name: 'Şantiye Sorumluları',
        photo: constructionGuard,
        title: 'Şantiye sorumlusu'
    },
    {
        id: 8,
        name: 'İnşaat İşçileri',
        photo: constructionWorker,
        title: 'İnşaat işçisi'
    },
    {
        id: 9,
        name: 'Güvenlik Görevlileri',
        photo: guardCons,
        title: 'Güvenlik görevlisi'
    },
    {
        id: 10,
        name: 'İnsan Kaynakları',
        photo: humanResources,
        title: 'İnsan Kaynakları'
    },
    {
        id: 11,
        name: 'CEO ve Yönetim Kurulu',
        photo: ceoPic,
        title: 'CEO'
    },
    {
        id: 12,
        name: 'Temizlik Görevlileri',
        photo: headArch,
        title: 'Temizlikçi'
    },
];

export default jobTitles;