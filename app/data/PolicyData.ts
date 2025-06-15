import { COMPANY_INFO } from "./constants"

export interface PolicySection {
    id: string
    title: string
    content: string[]
    subsections?: PolicySubsection[]
}

export interface PolicySubsection {
    id: string
    title: string
    content: string[]
}

export interface PolicyData {
    title: string
    lastUpdated: string
    effectiveDate: string
    introduction: string
    sections: PolicySection[]
}

// Privacy Policy Data
export const PRIVACY_POLICY: PolicyData = {
    title: "Kebijakan Privasi",
    lastUpdated: "15 Juni 2025",
    effectiveDate: "1 Januari 2025",
    introduction: `Di ${COMPANY_INFO.name}, kami berkomitmen untuk melindungi privasi dan keamanan informasi pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi Anda ketika menggunakan layanan kami.`,
    sections: [
        {
            id: "information-collection",
            title: "Informasi yang Kami Kumpulkan",
            content: [
                "Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, informasi yang dikumpulkan secara otomatis ketika Anda menggunakan layanan kami, dan informasi dari sumber pihak ketiga."
            ],
            subsections: [
                {
                    id: "personal-information",
                    title: "Informasi Pribadi",
                    content: [
                        "Nama lengkap, alamat email, nomor telepon",
                        "Informasi akun seperti username dan password",
                        "Informasi pembayaran dan billing",
                        "Foto profil dan informasi profil lainnya"
                    ]
                },
                {
                    id: "usage-information",
                    title: "Informasi Penggunaan",
                    content: [
                        "Log aktivitas dan interaksi dengan platform",
                        "Alamat IP, browser, dan informasi perangkat",
                        "Cookies dan teknologi pelacakan serupa",
                        "Data analytics dan performa aplikasi"
                    ]
                }
            ]
        },
        {
            id: "information-usage",
            title: "Bagaimana Kami Menggunakan Informasi",
            content: [
                "Informasi yang kami kumpulkan digunakan untuk menyediakan, memelihara, dan meningkatkan layanan kami."
            ],
            subsections: [
                {
                    id: "service-provision",
                    title: "Penyediaan Layanan",
                    content: [
                        "Memproses dan mengelola akun Anda",
                        "Menyediakan fitur dan fungsionalitas platform",
                        "Memproses pembayaran dan transaksi",
                        "Memberikan dukungan pelanggan"
                    ]
                },
                {
                    id: "communication",
                    title: "Komunikasi",
                    content: [
                        "Mengirim notifikasi penting tentang layanan",
                        "Memberikan update produk dan fitur baru",
                        "Merespons pertanyaan dan permintaan dukungan",
                        "Mengirim newsletter dan konten marketing (dengan persetujuan)"
                    ]
                }
            ]
        },
        {
            id: "information-sharing",
            title: "Pembagian Informasi",
            content: [
                "Kami tidak menjual, menyewakan, atau membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali dalam situasi tertentu yang dijelaskan di bawah ini."
            ],
            subsections: [
                {
                    id: "service-providers",
                    title: "Penyedia Layanan",
                    content: [
                        "Partner pembayaran untuk memproses transaksi",
                        "Penyedia cloud hosting untuk penyimpanan data",
                        "Layanan analytics untuk meningkatkan performa",
                        "Penyedia email untuk komunikasi"
                    ]
                },
                {
                    id: "legal-requirements",
                    title: "Persyaratan Hukum",
                    content: [
                        "Mematuhi perintah pengadilan atau proses hukum",
                        "Melindungi hak, properti, atau keselamatan",
                        "Mencegah penipuan atau aktivitas ilegal",
                        "Mematuhi peraturan dan undang-undang yang berlaku"
                    ]
                }
            ]
        },
        {
            id: "data-security",
            title: "Keamanan Data",
            content: [
                "Kami menerapkan langkah-langkah keamanan teknis, administratif, dan fisik yang sesuai untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah."
            ],
            subsections: [
                {
                    id: "technical-measures",
                    title: "Langkah Teknis",
                    content: [
                        "Enkripsi data in-transit dan at-rest",
                        "Firewall dan sistem deteksi intrusi",
                        "Autentikasi multi-faktor",
                        "Pemantauan keamanan 24/7"
                    ]
                },
                {
                    id: "administrative-measures",
                    title: "Langkah Administratif",
                    content: [
                        "Pelatihan keamanan untuk karyawan",
                        "Kontrol akses berdasarkan prinsip least privilege",
                        "Audit keamanan berkala",
                        "Kebijakan keamanan informasi yang ketat"
                    ]
                }
            ]
        },
        {
            id: "user-rights",
            title: "Hak Pengguna",
            content: [
                "Anda memiliki hak-hak tertentu terkait informasi pribadi Anda yang kami proses."
            ],
            subsections: [
                {
                    id: "access-rights",
                    title: "Hak Akses dan Kontrol",
                    content: [
                        "Mengakses dan meninjau informasi pribadi Anda",
                        "Memperbarui atau mengoreksi informasi yang tidak akurat",
                        "Menghapus akun dan data pribadi Anda",
                        "Membatasi atau menolak pemrosesan data tertentu"
                    ]
                },
                {
                    id: "data-portability",
                    title: "Portabilitas Data",
                    content: [
                        "Mengekspor data Anda dalam format yang dapat dibaca mesin",
                        "Mentransfer data ke penyedia layanan lain",
                        "Menerima salinan data pribadi Anda",
                        "Meminta penghapusan data setelah penutupan akun"
                    ]
                }
            ]
        },
        {
            id: "cookies-tracking",
            title: "Cookies dan Teknologi Pelacakan",
            content: [
                "Kami menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman Anda, menganalisis penggunaan, dan menyediakan konten yang dipersonalisasi."
            ],
            subsections: [
                {
                    id: "cookie-types",
                    title: "Jenis Cookies",
                    content: [
                        "Essential cookies: Diperlukan untuk fungsi dasar website",
                        "Performance cookies: Membantu kami memahami cara penggunaan website",
                        "Functional cookies: Mengingat preferensi dan pengaturan Anda",
                        "Marketing cookies: Digunakan untuk menampilkan iklan yang relevan"
                    ]
                },
                {
                    id: "cookie-control",
                    title: "Kontrol Cookies",
                    content: [
                        "Anda dapat mengelola preferensi cookies melalui pengaturan browser",
                        "Menonaktifkan cookies tertentu melalui panel preferensi kami",
                        "Menggunakan mode incognito/private browsing",
                        "Menghapus cookies yang sudah tersimpan"
                    ]
                }
            ]
        },
        {
            id: "international-transfers",
            title: "Transfer Data Internasional",
            content: [
                "Data Anda mungkin diproses dan disimpan di server yang berlokasi di luar negara Anda. Kami memastikan transfer ini dilakukan dengan perlindungan yang memadai."
            ],
            subsections: [
                {
                    id: "transfer-safeguards",
                    title: "Perlindungan Transfer",
                    content: [
                        "Standard Contractual Clauses (SCCs) yang disetujui",
                        "Adequacy decisions dari otoritas perlindungan data",
                        "Binding Corporate Rules untuk transfer internal",
                        "Sertifikasi dan kode etik yang diakui"
                    ]
                }
            ]
        },
        {
            id: "data-retention",
            title: "Retensi Data",
            content: [
                "Kami menyimpan informasi pribadi Anda hanya selama diperlukan untuk tujuan yang dijelaskan dalam kebijakan ini atau sebagaimana diwajibkan oleh hukum."
            ],
            subsections: [
                {
                    id: "retention-periods",
                    title: "Periode Retensi",
                    content: [
                        "Data akun: Selama akun aktif plus 3 tahun setelah penutupan",
                        "Data transaksi: 7 tahun untuk keperluan audit dan pajak",
                        "Log sistem: 1 tahun untuk tujuan keamanan dan troubleshooting",
                        "Data marketing: Hingga Anda menarik persetujuan"
                    ]
                }
            ]
        },
        {
            id: "children-privacy",
            title: "Privasi Anak-anak",
            content: [
                "Layanan kami tidak ditujukan untuk anak-anak di bawah usia 13 tahun. Kami tidak secara sengaja mengumpulkan informasi pribadi dari anak-anak di bawah usia 13 tahun."
            ]
        },
        {
            id: "policy-changes",
            title: "Perubahan Kebijakan",
            content: [
                "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan material akan diberitahukan melalui email atau notifikasi di platform kami."
            ]
        },
        {
            id: "contact-information",
            title: "Informasi Kontak",
            content: [
                `Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di ${COMPANY_INFO.email} atau melalui halaman kontak kami.`
            ]
        }
    ]
}

// Terms of Service Data
export const TERMS_OF_SERVICE: PolicyData = {
    title: "Syarat dan Ketentuan Layanan",
    lastUpdated: "15 Juni 2025",
    effectiveDate: "1 Januari 2025",
    introduction: `Selamat datang di ${COMPANY_INFO.name}. Syarat dan Ketentuan ini mengatur penggunaan Anda atas layanan kami. Dengan mengakses atau menggunakan layanan kami, Anda setuju untuk terikat dengan syarat dan ketentuan ini.`,
    sections: [
        {
            id: "acceptance-terms",
            title: "Penerimaan Syarat",
            content: [
                "Dengan mengakses dan menggunakan layanan kami, Anda menyatakan bahwa Anda telah membaca, memahami, dan setuju untuk terikat dengan Syarat dan Ketentuan ini serta Kebijakan Privasi kami."
            ]
        },
        {
            id: "service-description",
            title: "Deskripsi Layanan",
            content: [
                `${COMPANY_INFO.name} menyediakan platform SaaS yang memungkinkan pengguna untuk mengelola bisnis mereka dengan lebih efisien melalui berbagai fitur dan integrasi.`
            ],
            subsections: [
                {
                    id: "included-services",
                    title: "Layanan yang Disediakan",
                    content: [
                        "Dashboard analytics dan reporting",
                        "Manajemen pengguna dan tim",
                        "Integrasi dengan aplikasi pihak ketiga",
                        "API access untuk pengembangan custom",
                        "Dukungan pelanggan dan dokumentasi"
                    ]
                },
                {
                    id: "service-availability",
                    title: "Ketersediaan Layanan",
                    content: [
                        "Kami berusaha menyediakan layanan 24/7 dengan uptime 99.9%",
                        "Maintenance terjadwal akan diberitahukan sebelumnya",
                        "Layanan dapat tidak tersedia karena force majeure",
                        "Kami berhak memodifikasi atau menghentikan layanan dengan pemberitahuan"
                    ]
                }
            ]
        },
        {
            id: "user-accounts",
            title: "Akun Pengguna",
            content: [
                "Untuk menggunakan layanan kami, Anda harus membuat akun dan memberikan informasi yang akurat dan lengkap."
            ],
            subsections: [
                {
                    id: "account-registration",
                    title: "Pendaftaran Akun",
                    content: [
                        "Anda harus berusia minimal 18 tahun atau memiliki izin dari wali",
                        "Informasi yang diberikan harus akurat dan terkini",
                        "Satu orang hanya boleh memiliki satu akun",
                        "Kami berhak menolak pendaftaran tanpa memberikan alasan"
                    ]
                },
                {
                    id: "account-security",
                    title: "Keamanan Akun",
                    content: [
                        "Anda bertanggung jawab menjaga kerahasiaan password",
                        "Segera laporkan jika akun Anda dikompromikan",
                        "Gunakan autentikasi dua faktor jika tersedia",
                        "Anda bertanggung jawab atas semua aktivitas di akun Anda"
                    ]
                }
            ]
        },
        {
            id: "acceptable-use",
            title: "Penggunaan yang Dapat Diterima",
            content: [
                "Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah dan sesuai dengan syarat dan ketentuan ini."
            ],
            subsections: [
                {
                    id: "prohibited-activities",
                    title: "Aktivitas yang Dilarang",
                    content: [
                        "Melanggar hukum atau peraturan yang berlaku",
                        "Mengirim spam, malware, atau konten berbahaya",
                        "Melakukan reverse engineering atau hacking",
                        "Menggunakan layanan untuk aktivitas ilegal atau penipuan",
                        "Mengganggu atau merusak infrastruktur layanan"
                    ]
                },
                {
                    id: "content-guidelines",
                    title: "Pedoman Konten",
                    content: [
                        "Konten tidak boleh melanggar hak cipta atau kekayaan intelektual",
                        "Tidak mengandung materi yang menyinggung atau diskriminatif",
                        "Tidak mempromosikan kekerasan atau aktivitas ilegal",
                        "Menghormati privasi dan hak orang lain"
                    ]
                }
            ]
        },
        {
            id: "subscription-billing",
            title: "Langganan dan Penagihan",
            content: [
                "Layanan kami tersedia dalam berbagai paket langganan dengan fitur dan harga yang berbeda."
            ],
            subsections: [
                {
                    id: "subscription-plans",
                    title: "Paket Langganan",
                    content: [
                        "Paket Basic: Fitur dasar untuk individu",
                        "Paket Pro: Fitur lengkap untuk tim kecil",
                        "Paket Enterprise: Solusi kustomisasi untuk organisasi besar",
                        "Upgrade atau downgrade dapat dilakukan kapan saja"
                    ]
                },
                {
                    id: "billing-terms",
                    title: "Ketentuan Penagihan",
                    content: [
                        "Pembayaran ditagih di muka untuk periode langganan",
                        "Harga dapat berubah dengan pemberitahuan 30 hari",
                        "Pembayaran yang terlambat dapat mengakibatkan penangguhan layanan",
                        "Semua harga sudah termasuk pajak yang berlaku"
                    ]
                }
            ]
        },
        {
            id: "intellectual-property",
            title: "Kekayaan Intelektual",
            content: [
                "Layanan kami dan semua konten yang terkait dilindungi oleh hak cipta, merek dagang, dan hak kekayaan intelektual lainnya."
            ],
            subsections: [
                {
                    id: "our-rights",
                    title: "Hak Kami",
                    content: [
                        "Kami memiliki semua hak atas platform dan teknologi",
                        "Logo, merek dagang, dan desain adalah milik kami",
                        "Dokumentasi dan konten edukasi dilindungi hak cipta",
                        "Anda tidak boleh menyalin atau mendistribusikan tanpa izin"
                    ]
                },
                {
                    id: "user-content",
                    title: "Konten Pengguna",
                    content: [
                        "Anda mempertahankan hak atas konten yang Anda upload",
                        "Anda memberikan lisensi kepada kami untuk mengoperasikan layanan",
                        "Kami tidak mengklaim kepemilikan atas data Anda",
                        "Anda bertanggung jawab atas konten yang Anda bagikan"
                    ]
                }
            ]
        },
        {
            id: "privacy-data",
            title: "Privasi dan Data",
            content: [
                "Pengumpulan, penggunaan, dan perlindungan data pribadi Anda diatur dalam Kebijakan Privasi kami yang terpisah."
            ]
        },
        {
            id: "disclaimers",
            title: "Penafian",
            content: [
                "Layanan disediakan 'sebagaimana adanya' tanpa jaminan tersurat atau tersirat."
            ],
            subsections: [
                {
                    id: "service-disclaimers",
                    title: "Penafian Layanan",
                    content: [
                        "Kami tidak menjamin layanan akan bebas dari kesalahan",
                        "Tidak ada jaminan bahwa layanan akan memenuhi kebutuhan spesifik",
                        "Kami tidak bertanggung jawab atas kerugian data",
                        "Penggunaan layanan adalah risiko Anda sendiri"
                    ]
                }
            ]
        },
        {
            id: "limitation-liability",
            title: "Pembatasan Tanggung Jawab",
            content: [
                "Dalam batas maksimum yang diizinkan hukum, kami membatasi tanggung jawab kami atas kerugian yang timbul dari penggunaan layanan."
            ],
            subsections: [
                {
                    id: "liability-limits",
                    title: "Batas Tanggung Jawab",
                    content: [
                        "Tanggung jawab maksimal sebesar biaya langganan 12 bulan",
                        "Tidak bertanggung jawab atas kerugian tidak langsung",
                        "Tidak bertanggung jawab atas kehilangan keuntungan",
                        "Pembatasan ini berlaku sejauh diizinkan hukum"
                    ]
                }
            ]
        },
        {
            id: "termination",
            title: "Penghentian",
            content: [
                "Anda atau kami dapat menghentikan akun kapan saja dengan atau tanpa alasan."
            ],
            subsections: [
                {
                    id: "termination-by-user",
                    title: "Penghentian oleh Pengguna",
                    content: [
                        "Anda dapat menghentikan akun melalui pengaturan akun",
                        "Data akan dihapus sesuai kebijakan retensi",
                        "Tidak ada refund untuk periode yang belum digunakan",
                        "Kewajiban pembayaran tetap berlaku hingga penghentian"
                    ]
                },
                {
                    id: "termination-by-us",
                    title: "Penghentian oleh Kami",
                    content: [
                        "Kami dapat menghentikan akun karena pelanggaran syarat",
                        "Pemberitahuan akan diberikan kecuali dalam kasus serius",
                        "Akses akan dihentikan segera setelah terminasi",
                        "Data dapat dipertahankan sesuai kewajiban hukum"
                    ]
                }
            ]
        },
        {
            id: "governing-law",
            title: "Hukum yang Berlaku",
            content: [
                "Syarat dan Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa akan diselesaikan melalui pengadilan yang berwenang di Jakarta."
            ]
        },
        {
            id: "changes-terms",
            title: "Perubahan Syarat",
            content: [
                "Kami dapat mengubah Syarat dan Ketentuan ini kapan saja. Perubahan akan diberitahukan melalui email atau notifikasi di platform."
            ]
        },
        {
            id: "contact-information",
            title: "Informasi Kontak",
            content: [
                `Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami di ${COMPANY_INFO.email}.`
            ]
        }
    ]
}

// Cookie Policy Data
export const COOKIE_POLICY: PolicyData = {
    title: "Kebijakan Cookie",
    lastUpdated: "15 Juni 2025",
    effectiveDate: "1 Januari 2025",
    introduction: `Kebijakan Cookie ini menjelaskan bagaimana ${COMPANY_INFO.name} menggunakan cookies dan teknologi serupa ketika Anda mengunjungi website kami. Ini menjelaskan apa itu cookies, bagaimana kami menggunakannya, dan pilihan yang Anda miliki.`,
    sections: [
        {
            id: "what-are-cookies",
            title: "Apa itu Cookies?",
            content: [
                "Cookies adalah file teks kecil yang ditempatkan di perangkat Anda ketika Anda mengunjungi website. Cookies banyak digunakan untuk membuat website berfungsi dengan lebih efisien dan memberikan informasi kepada pemilik website."
            ]
        },
        {
            id: "how-we-use-cookies",
            title: "Bagaimana Kami Menggunakan Cookies",
            content: [
                "Kami menggunakan cookies untuk berbagai tujuan yang dijelaskan di bawah ini."
            ],
            subsections: [
                {
                    id: "essential-cookies",
                    title: "Essential Cookies",
                    content: [
                        "Cookies yang diperlukan untuk fungsi dasar website",
                        "Memungkinkan navigasi dan penggunaan fitur website",
                        "Menyimpan preferensi keamanan dan autentikasi",
                        "Tidak dapat dinonaktifkan tanpa mempengaruhi fungsionalitas"
                    ]
                },
                {
                    id: "performance-cookies",
                    title: "Performance Cookies",
                    content: [
                        "Mengumpulkan informasi tentang cara penggunaan website",
                        "Membantu kami memahami halaman mana yang paling populer",
                        "Mengidentifikasi masalah performa dan area perbaikan",
                        "Data dikumpulkan secara anonim dan agregat"
                    ]
                },
                {
                    id: "functional-cookies",
                    title: "Functional Cookies",
                    content: [
                        "Mengingat pilihan dan preferensi Anda",
                        "Menyimpan pengaturan bahasa dan region",
                        "Mengingat informasi login untuk kemudahan akses",
                        "Menyediakan fitur yang dipersonalisasi"
                    ]
                },
                {
                    id: "marketing-cookies",
                    title: "Marketing Cookies",
                    content: [
                        "Digunakan untuk menampilkan iklan yang relevan",
                        "Melacak efektivitas kampanye marketing",
                        "Membatasi jumlah iklan yang ditampilkan",
                        "Mengukur dan meningkatkan relevansi iklan"
                    ]
                }
            ]
        },
        {
            id: "third-party-cookies",
            title: "Third-Party Cookies",
            content: [
                "Kami juga menggunakan cookies dari pihak ketiga untuk layanan analytics, advertising, dan integrasi media sosial."
            ],
            subsections: [
                {
                    id: "analytics-providers",
                    title: "Penyedia Analytics",
                    content: [
                        "Google Analytics: Untuk menganalisis traffic dan perilaku pengguna",
                        "Hotjar: Untuk heatmaps dan session recordings",
                        "Mixpanel: Untuk event tracking dan user analytics",
                        "Data digunakan untuk meningkatkan pengalaman pengguna"
                    ]
                },
                {
                    id: "advertising-partners",
                    title: "Partner Advertising",
                    content: [
                        "Google Ads: Untuk retargeting dan conversion tracking",
                        "Facebook Pixel: Untuk social media advertising",
                        "LinkedIn Insight Tag: Untuk B2B marketing analytics",
                        "Cookies membantu menampilkan iklan yang relevan"
                    ]
                }
            ]
        },
        {
            id: "managing-cookies",
            title: "Mengelola Cookies",
            content: [
                "Anda memiliki kontrol penuh atas cookies yang diterima browser Anda."
            ],
            subsections: [
                {
                    id: "browser-settings",
                    title: "Pengaturan Browser",
                    content: [
                        "Chrome: Settings > Privacy and Security > Cookies",
                        "Firefox: Options > Privacy & Security > Cookies",
                        "Safari: Preferences > Privacy > Cookies",
                        "Edge: Settings > Cookies and site permissions"
                    ]
                },
                {
                    id: "cookie-preferences",
                    title: "Preferensi Cookie",
                    content: [
                        "Gunakan banner cookie kami untuk mengatur preferensi",
                        "Pilih kategori cookies yang ingin Anda terima",
                        "Ubah preferensi kapan saja melalui footer website",
                        "Essential cookies tidak dapat dinonaktifkan"
                    ]
                }
            ]
        },
        {
            id: "cookie-retention",
            title: "Retensi Cookie",
            content: [
                "Cookies memiliki periode retensi yang berbeda tergantung pada jenisnya."
            ],
            subsections: [
                {
                    id: "session-cookies",
                    title: "Session Cookies",
                    content: [
                        "Dihapus ketika Anda menutup browser",
                        "Digunakan untuk menjaga sesi login",
                        "Menyimpan data sementara selama browsing",
                        "Tidak disimpan di perangkat secara permanen"
                    ]
                },
                {
                    id: "persistent-cookies",
                    title: "Persistent Cookies",
                    content: [
                        "Disimpan untuk periode waktu tertentu",
                        "Authentication cookies: 30 hari",
                        "Preference cookies: 1 tahun",
                        "Analytics cookies: 2 tahun"
                    ]
                }
            ]
        },
        {
            id: "updates-policy",
            title: "Pembaruan Kebijakan",
            content: [
                "Kami dapat memperbarui Kebijakan Cookie ini dari waktu ke waktu untuk mencerminkan perubahan dalam praktik kami atau untuk alasan operasional, hukum, atau peraturan lainnya."
            ]
        },
        {
            id: "contact-information",
            title: "Informasi Kontak",
            content: [
                `Jika Anda memiliki pertanyaan tentang penggunaan cookies kami, silakan hubungi kami di ${COMPANY_INFO.email}.`
            ]
        }
    ]
}

// Refund Policy Data
export const REFUND_POLICY: PolicyData = {
    title: "Kebijakan Pengembalian Dana",
    lastUpdated: "15 Juni 2025",
    effectiveDate: "1 Januari 2025",
    introduction: `Kebijakan Pengembalian Dana ini menjelaskan syarat dan ketentuan untuk permintaan refund atas layanan ${COMPANY_INFO.name}. Kami berkomitmen untuk memberikan layanan terbaik dan kepuasan pelanggan.`,
    sections: [
        {
            id: "refund-eligibility",
            title: "Kelayakan Pengembalian Dana",
            content: [
                "Pengembalian dana dapat diajukan dalam kondisi tertentu yang dijelaskan di bawah ini."
            ],
            subsections: [
                {
                    id: "eligible-conditions",
                    title: "Kondisi yang Memenuhi Syarat",
                    content: [
                        "Layanan tidak berfungsi sebagaimana mestinya selama 7 hari berturut-turut",
                        "Fitur utama yang dijanjikan tidak tersedia atau tidak berfungsi",
                        "Masalah teknis yang tidak dapat diselesaikan dalam 14 hari",
                        "Pembatalan dalam 14 hari pertama untuk pelanggan baru"
                    ]
                },
                {
                    id: "ineligible-conditions",
                    title: "Kondisi yang Tidak Memenuhi Syarat",
                    content: [
                        "Perubahan kebutuhan bisnis atau preferensi pribadi",
                        "Ketidakpuasan dengan fitur yang sudah dijelaskan sebelumnya",
                        "Penggunaan layanan lebih dari 30 hari",
                        "Pelanggaran syarat dan ketentuan layanan"
                    ]
                }
            ]
        },
        {
            id: "refund-timeframes",
            title: "Jangka Waktu Pengembalian",
            content: [
                "Permintaan pengembalian dana harus diajukan dalam jangka waktu tertentu."
            ],
            subsections: [
                {
                    id: "request-period",
                    title: "Periode Permintaan",
                    content: [
                        "Pelanggan baru: 14 hari sejak pendaftaran",
                        "Masalah teknis: 30 hari sejak masalah pertama dilaporkan",
                        "Upgrade plan: 7 hari sejak upgrade",
                        "Setelah periode ini, permintaan tidak dapat diproses"
                    ]
                },
                {
                    id: "processing-time",
                    title: "Waktu Pemrosesan",
                    content: [
                        "Review permintaan: 3-5 hari kerja",
                        "Persetujuan refund: 1-2 hari kerja",
                        "Pemrosesan pembayaran: 5-10 hari kerja",
                        "Total waktu: maksimal 15 hari kerja"
                    ]
                }
            ]
        },
        {
            id: "refund-process",
            title: "Proses Pengembalian Dana",
            content: [
                "Ikuti langkah-langkah berikut untuk mengajukan permintaan pengembalian dana."
            ],
            subsections: [
                {
                    id: "how-to-request",
                    title: "Cara Mengajukan",
                    content: [
                        "Kirim email ke billing@saaspro.com dengan subjek 'Refund Request'",
                        "Sertakan nomor invoice dan alasan permintaan refund",
                        "Lampirkan screenshot atau dokumentasi masalah (jika ada)",
                        "Tunggu konfirmasi dari tim customer service kami"
                    ]
                },
                {
                    id: "required-information",
                    title: "Informasi yang Diperlukan",
                    content: [
                        "Nama lengkap dan email akun",
                        "Nomor invoice atau transaction ID",
                        "Tanggal pembayaran dan jumlah yang dibayar",
                        "Alasan detail permintaan refund",
                        "Dokumentasi pendukung (jika diperlukan)"
                    ]
                }
            ]
        },
        {
            id: "refund-amounts",
            title: "Jumlah Pengembalian",
            content: [
                "Jumlah yang dikembalikan tergantung pada kondisi dan timing permintaan."
            ],
            subsections: [
                {
                    id: "full-refund",
                    title: "Pengembalian Penuh (100%)",
                    content: [
                        "Pembatalan dalam 14 hari pertama tanpa penggunaan signifikan",
                        "Masalah teknis yang tidak dapat diselesaikan",
                        "Layanan tidak tersedia lebih dari 7 hari berturut-turut",
                        "Kesalahan penagihan dari pihak kami"
                    ]
                },
                {
                    id: "partial-refund",
                    title: "Pengembalian Sebagian",
                    content: [
                        "Prorated refund berdasarkan sisa periode langganan",
                        "Downgrade plan dengan penyesuaian harga",
                        "Pembatalan di tengah periode billing cycle",
                        "Dikurangi biaya administrasi jika berlaku"
                    ]
                },
                {
                    id: "no-refund",
                    title: "Tidak Ada Pengembalian",
                    content: [
                        "Penggunaan layanan lebih dari 30 hari",
                        "Pelanggaran syarat dan ketentuan",
                        "Permintaan di luar jangka waktu yang ditentukan",
                        "Alasan yang tidak memenuhi kriteria refund"
                    ]
                }
            ]
        },
        {
            id: "payment-methods",
            title: "Metode Pengembalian",
            content: [
                "Pengembalian dana akan diproses menggunakan metode pembayaran yang sama dengan pembayaran asli."
            ],
            subsections: [
                {
                    id: "credit-card",
                    title: "Kartu Kredit/Debit",
                    content: [
                        "Refund akan dikembalikan ke kartu yang sama",
                        "Waktu pemrosesan: 5-10 hari kerja",
                        "Muncul sebagai credit di statement kartu",
                        "Hubungi bank jika tidak muncul setelah 10 hari"
                    ]
                },
                {
                    id: "bank-transfer",
                    title: "Transfer Bank",
                    content: [
                        "Refund ke rekening bank yang sama",
                        "Waktu pemrosesan: 3-7 hari kerja",
                        "Biaya transfer ditanggung oleh kami",
                        "Konfirmasi akan dikirim via email"
                    ]
                },
                {
                    id: "digital-wallet",
                    title: "Digital Wallet",
                    content: [
                        "Refund ke wallet yang sama (GoPay, OVO, Dana)",
                        "Waktu pemrosesan: 1-3 hari kerja",
                        "Notifikasi langsung di aplikasi wallet",
                        "Hubungi customer service jika ada masalah"
                    ]
                }
            ]
        },
        {
            id: "special-circumstances",
            title: "Keadaan Khusus",
            content: [
                "Dalam situasi tertentu, kami dapat memberikan pertimbangan khusus untuk permintaan refund."
            ],
            subsections: [
                {
                    id: "force-majeure",
                    title: "Force Majeure",
                    content: [
                        "Bencana alam yang mempengaruhi layanan",
                        "Gangguan internet atau infrastruktur besar",
                        "Perubahan regulasi yang mempengaruhi layanan",
                        "Situasi darurat yang di luar kendali kami"
                    ]
                },
                {
                    id: "business-closure",
                    title: "Penutupan Bisnis",
                    content: [
                        "Jika kami menghentikan layanan secara permanen",
                        "Refund prorated untuk sisa periode langganan",
                        "Pemberitahuan minimal 30 hari sebelumnya",
                        "Bantuan migrasi data jika memungkinkan"
                    ]
                }
            ]
        },
        {
            id: "dispute-resolution",
            title: "Penyelesaian Sengketa",
            content: [
                "Jika Anda tidak puas dengan keputusan refund kami, tersedia proses banding."
            ],
            subsections: [
                {
                    id: "appeal-process",
                    title: "Proses Banding",
                    content: [
                        "Ajukan banding dalam 7 hari setelah keputusan",
                        "Sertakan informasi tambahan atau bukti baru",
                        "Review oleh supervisor customer service",
                        "Keputusan final dalam 10 hari kerja"
                    ]
                },
                {
                    id: "external-mediation",
                    title: "Mediasi Eksternal",
                    content: [
                        "Jika banding internal tidak memuaskan",
                        "Dapat menggunakan layanan mediasi pihak ketiga",
                        "Biaya mediasi dibagi antara kedua pihak",
                        "Keputusan mediator bersifat final dan mengikat"
                    ]
                }
            ]
        },
        {
            id: "policy-updates",
            title: "Pembaruan Kebijakan",
            content: [
                "Kebijakan ini dapat diperbarui dari waktu ke waktu. Perubahan akan diberitahukan melalui email dan website kami."
            ]
        },
        {
            id: "contact-information",
            title: "Informasi Kontak",
            content: [
                `Untuk pertanyaan tentang refund atau kebijakan ini, hubungi kami di billing@saaspro.com atau ${COMPANY_INFO.email}.`
            ]
        }
    ]
}
