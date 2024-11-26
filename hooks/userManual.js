import HomeImage from "../assets/user_manual/home.png";
import DoaListImage from "../assets/user_manual/list_doa_harian.png";
import ListZikr from "../assets/user_manual/lists_zikir.png";
import ListHadis from "../assets/user_manual/lists_hadis.png";
import ListSurah from "../assets/user_manual/lists_surah.png";
import Qibla from "../assets/user_manual/qibla_screen.png";
import Counter from "../assets/user_manual/counter.png";
import About from "../assets/user_manual/about.png";
 
export const userManualLists = [
  {
    id: 1,
    title: "Home",
    summary:
      "Scroll ke atas dari bahagian bawah skrin. Memaparkan waktu solat, petikan kata-kata Islamik, dan butang kotak untuk akses ke Doa, Zikir, Hadis, dan Al-Quran.",
    image: HomeImage,
  },
  {
    id: 2,
    title: "Lists Doa Harian",
    summary:
      "Klik butang anak panah untuk ke skrin seterusnya untuk paparan doa harian berserta terjemahan.",
    image: DoaListImage,
  },
  {
    id: 3,
    title: "Lists Zikr",
    summary:
      "Klik butang kotak Pagi untuk Zikir Pagi atau Petang untuk Zikir Petang.",
    image: ListZikr,
  },
  {
    id: 4,
    title: "Lists Hadis",
    summary:
      "Klik butang Details untuk melihat hadis dari Sahih pilihan untuk membaca hadis terpilih secara mendalam.",
    image: ListHadis,
  },
  {
    id: 5,
    title: "Lists Surah",
    summary:
      "Klik surah pilihan dan Skrin seterusnya akan memaparkan ayat Al-Quran dan boleh memainkan audio.",
    image: ListSurah,
  },
  {
    id: 6,
    title: "Qibla Screens",
    summary: "Arahkan telefon melihat arah kiblat yang tepat.",
    image: Qibla,
  },
  {
    id: 7,
    title: "Tasbih Counter Screens",
    summary: ["- Reset Count: Tetapkan semula kiraan.", "- Save Count: Simpan kiraan.", "- Click Count: Tambahkan kiraan untuk zikir.", "- List: Lihat senarai zikir.", "- Last Count: Klik untuk menyambung dari kiraan terakhir."],
    image: Counter,
  },
  {
    id: 8,
    title: "About Screens",
    summary: "Paparan tentang sumber aplikasi, panduan, atau soalan lazim.",
    image: About,
  },
];