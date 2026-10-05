import os

base_html_template = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rajtilak Chamlagain | {title}</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23FF9A9E'/%3E%3Cstop offset='100%25' stop-color='%23FECFEF'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='16' fill='url(%23g)'/%3E%3Ctext x='32' y='42' font-family='sans-serif' font-size='26' font-weight='bold' fill='%23ffffff' text-anchor='middle'%3ERTC%3C/text%3E%3C/svg%3E">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <style>
        .page-hero { padding: 120px 2rem 40px; text-align: center; max-width: 800px; margin: 0 auto; }
        .page-hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .page-hero p { color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; }
        .back-btn { display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--text-main); background: rgba(255,255,255,0.1); padding: 0.75rem 1.5rem; border-radius: 30px; border: 1px solid rgba(255,255,255,0.2); transition: all 0.3s ease; }
        .back-btn:hover { background: rgba(255,255,255,0.3); transform: translateX(-5px); }
        .timeline { max-width: 800px; margin: 0 auto; padding: 2rem; position: relative; }
        .timeline::before { content: ''; position: absolute; left: 40px; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,0.2); }
        .timeline-item { position: relative; padding-left: 60px; margin-bottom: 3rem; }
        .timeline-dot { position: absolute; left: 33px; top: 5px; width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, #FF9A9E, #FECFEF); border: 4px solid #fff; box-shadow: 0 0 0 4px rgba(255,255,255,0.2); }
        .cert-card-large { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; border-radius: 16px; margin-top: 1rem; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); }
        .cert-card-large:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); background: rgba(255,255,255,0.2); }
        .cert-card-large img { width: 80px; height: 80px; object-fit: cover; border-radius: 12px; }
        .cert-card-large h4 { font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.25rem; }
        @media(max-width: 768px) { .timeline::before { left: 20px; } .timeline-item { padding-left: 40px; } .timeline-dot { left: 13px; } .cert-card-large { flex-direction: column; text-align: center; } }
    </style>
</head>
<body>
    <div class="aurora-bg"></div>
    <div class="mouse-glow"></div>
    <div class="noise-overlay"></div>

    <nav class="navbar glass">
        <div class="nav-container">
            <a href="index.html" class="logo gradient-text">RTC.</a>
            <a href="index.html" class="back-btn">← Back to Portfolio</a>
        </div>
    </nav>

    <main>
        <section class="page-hero">
            <h1 class="gradient-text">{title}</h1>
            <p>{description}</p>
        </section>

        <section class="timeline">
            {timeline_content}
        </section>
    </main>

    <!-- Modal for viewing certificates -->
    <div id="premium-modal" class="modal-overlay">
        <div class="modal-container glass-panel">
            <button id="modal-close" class="modal-close-btn">&times;</button>
            <div id="modal-content" class="modal-content-area"></div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>'''

pages = {
    'chess.html': {
        'title': 'Chess Career',
        'description': 'From playing with my father and uncle to becoming the Interdistrict U19 Champion in Kamrup Rural. FIDE Rated Player (ID: 88176894) with a rapid chess.com rating of ~1500.',
        'content': '''
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem;">Early Beginnings</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Started playing chess at a young age with my father and uncle. My uncle, a strong player rated 1900 on chess.com, was a massive inspiration. I started winning local school tournaments soon after.</p>
            </div>
            
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem;">State & Interdistrict Glory</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Secured 1st place in the Interdistrict Tournament in Maligaon (U19 category from Kamrup Rural). This victory earned me a selection for the State championship where I proudly participated.</p>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/chess_debendra_46th_2023.jpeg', '46th All Assam Inter District (U-19) FIDE Chess', 'Debendra Nath Sarma Memorial 46th All Assam Inter District U-19 FIDE Rating Chess Championship at South Point School, Guwahati.')">
                    <img src="assets/certs/chess_debendra_46th_2023.jpeg" alt="Interdistrict Chess">
                    <div>
                        <h4>46th All Assam U-19 FIDE Chess</h4>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">State Selection - Aug 2023</p>
                    </div>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem;">FIDE Rated Tournaments (Drop Year)</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Dedicated my drop year to playing multiple professional local and international FIDE-rated tournaments.</p>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/chess_fide_school_2023.jpeg', 'All India Open FIDE Rating School Chess', 'Scored 5 out of 9 rounds.')">
                    <img src="assets/certs/chess_fide_school_2023.jpeg" alt="FIDE">
                    <div><h4>All India Open FIDE School Chess</h4><p style="color: var(--text-muted); font-size: 0.9rem;">Nov 2023 · 5/9 Points</p></div>
                </div>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/chess_ayodhana_intl_2023.jpeg', '5th Ayodhana International FIDE Rating Chess', 'Certificate of Merit')">
                    <img src="assets/certs/chess_ayodhana_intl_2023.jpeg" alt="FIDE">
                    <div><h4>5th Ayodhana International FIDE Chess</h4><p style="color: var(--text-muted); font-size: 0.9rem;">July 2023</p></div>
                </div>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/chess_downtown_rapid_2023.jpeg', 'Down Town School Rapid Chess', 'Scored 5.0/6 rounds')">
                    <img src="assets/certs/chess_downtown_rapid_2023.jpeg" alt="FIDE">
                    <div><h4>Down Town School Rapid Chess</h4><p style="color: var(--text-muted); font-size: 0.9rem;">Nov 2023 · 5.0/6 Points</p></div>
                </div>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/chess_guwahati_smart_city_2024.jpeg', '1st Guwahati Smart City International Open', 'Merit Certificate')">
                    <img src="assets/certs/chess_guwahati_smart_city_2024.jpeg" alt="FIDE">
                    <div><h4>1st Guwahati Smart City Intl Open FIDE</h4><p style="color: var(--text-muted); font-size: 0.9rem;">July 2024</p></div>
                </div>

                <div class="cert-card-large" onclick="openCert('assets/certs/chess_tezpur_rapid_2026.jpeg', 'Tezpur All Assam Open Rapid Chess', 'Scored 4.5 points')">
                    <img src="assets/certs/chess_tezpur_rapid_2026.jpeg" alt="FIDE">
                    <div><h4>Tezpur All Assam Open Rapid Chess</h4><p style="color: var(--text-muted); font-size: 0.9rem;">Feb 2026 · 4.5 Points</p></div>
                </div>
            </div>
            
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem;">Live Profile</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Follow my live games and ratings on chess.com.</p>
                
                <!-- Live Stats Card -->
                <div id="chess-stats-card" class="cert-card-large" style="cursor: default; flex-direction: column; align-items: flex-start; gap: 0.5rem; margin-top: 1rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; width: 100%;">
                        <img src="" id="chess-avatar" alt="Avatar" style="width: 60px; height: 60px; border-radius: 50%; display: none;">
                        <div>
                            <h4 id="chess-username">Loading Live Stats...</h4>
                            <p style="color: var(--text-muted); font-size: 0.9rem;" id="chess-status">Fetching from chess.com API...</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 1rem; width: 100%; margin-top: 0.5rem;">
                        <div style="background: rgba(255,255,255,0.05); padding: 0.8rem; border-radius: 12px; flex: 1; text-align: center;">
                            <div style="font-size: 0.8rem; color: var(--text-muted);">Rapid Rating</div>
                            <div id="chess-rapid" style="font-size: 1.5rem; font-weight: bold; font-family: var(--font-heading); color: #FF9A9E;">--</div>
                        </div>
                        <div style="background: rgba(255,255,255,0.05); padding: 0.8rem; border-radius: 12px; flex: 1; text-align: center;">
                            <div style="font-size: 0.8rem; color: var(--text-muted);">Blitz Rating</div>
                            <div id="chess-blitz" style="font-size: 1.5rem; font-weight: bold; font-family: var(--font-heading); color: #FECFEF;">--</div>
                        </div>
                    </div>
                </div>

                <a href="https://www.chess.com/member/RajTilakChamlagain123" target="_blank" class="back-btn" style="margin-top: 1rem;">View RajTilakChamlagain123 on Chess.com ↗</a>
            </div>
        '''
    },
    'ncc.html': {
        'title': 'NCC Journey',
        'description': 'My journey with the National Cadet Corps, building discipline, leadership, and a sense of duty towards the nation.',
        'content': '''
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem;">NCC Training & Development</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Joined the NCC to cultivate leadership and discipline. Participated in various activities, drills, and national awareness programs.</p>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/ncc_a_certificate.jpg', 'NCC A Certificate', 'Successfully completed the NCC A Certificate.')">
                    <img src="assets/certs/ncc_a_certificate.jpg" alt="NCC">
                    <div><h4>NCC A Certificate</h4><p style="color: var(--text-muted); font-size: 0.9rem;">National Cadet Corps</p></div>
                </div>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/ncc_2019.jpg', 'NCC Camp 2019', 'Participated in NCC Camp in 2019.')">
                    <img src="assets/certs/ncc_2019.jpg" alt="NCC">
                    <div><h4>NCC Camp 2019</h4><p style="color: var(--text-muted); font-size: 0.9rem;">National Cadet Corps</p></div>
                </div>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/ncc_2015_certificate.jpg', 'NCC 2015 Participation', 'Early NCC Participation.')">
                    <img src="assets/certs/ncc_2015_certificate.jpg" alt="NCC">
                    <div><h4>NCC 2015 Participation</h4><p style="color: var(--text-muted); font-size: 0.9rem;">National Cadet Corps</p></div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem;">National Level Quizzes</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Represented the unit and scored perfectly in national level awareness and defense quizzes.</p>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/ncc_equiz_2020.jpeg', 'NCC E-Quiz 2020 (100% Score)', 'National Level')">
                    <img src="assets/certs/ncc_equiz_2020.jpeg" alt="NCC">
                    <div><h4>NCC E-Quiz 2020</h4><p style="color: var(--text-muted); font-size: 0.9rem;">National Level · 100% Score</p></div>
                </div>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/ncc_covid_quiz_2020.jpeg', 'NCC Covid-19 Online Quiz', 'National Level')">
                    <img src="assets/certs/ncc_covid_quiz_2020.jpeg" alt="NCC">
                    <div><h4>NCC Covid-19 Online Quiz</h4><p style="color: var(--text-muted); font-size: 0.9rem;">National Level · 100% Score</p></div>
                </div>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/aatmanirbhar_bharat_quiz.jpeg', 'Aatmanirbhar Bharat Quiz', 'Ministry of Defence')">
                    <img src="assets/certs/aatmanirbhar_bharat_quiz.jpeg" alt="NCC">
                    <div><h4>Aatmanirbhar Bharat Quiz</h4><p style="color: var(--text-muted); font-size: 0.9rem;">Ministry of Defence & MyGov</p></div>
                </div>
            </div>
        '''
    },
    'art.html': {
        'title': 'Art & Fine Arts',
        'description': 'Exploring creativity through fine arts and drawing.',
        'content': '''
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem;">Fine Arts Diploma</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Dedicated practice and training in fine arts and drawing, culminating in a diploma.</p>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/diploma.jpg', 'Fine Arts Diploma', 'Diploma in Art/Drawing.')">
                    <img src="assets/certs/diploma.jpg" alt="Art">
                    <div><h4>Fine Arts Diploma</h4><p style="color: var(--text-muted); font-size: 0.9rem;">Art & Drawing</p></div>
                </div>
            </div>
        '''
    },
    'music.html': {
        'title': 'Classical Music',
        'description': 'My journey in classical singing, achieving the prestigious Vocal Visharad.',
        'content': '''
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem;">Classical Training</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Dedicated years to mastering classical vocal music, undergoing rigorous riyaz and theoretical study of ragas and talas.</p>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem;">Vocal Visharad</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Successfully achieved the Vocal Visharad qualification, marking a significant milestone in Indian classical music education.</p>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/visharad_cert.jpg', 'Visharad Certificate', 'Classical Singing')">
                    <img src="assets/certs/visharad_cert.jpg" alt="Music">
                    <div><h4>Visharad Certificate</h4><p style="color: var(--text-muted); font-size: 0.9rem;">Classical Vocal</p></div>
                </div>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/vocal_visharad_cert.jpg', 'Vocal Visharad Final Year', 'Classical Singing')">
                    <img src="assets/certs/vocal_visharad_cert.jpg" alt="Music">
                    <div><h4>Vocal Visharad Final Year</h4><p style="color: var(--text-muted); font-size: 0.9rem;">Classical Vocal</p></div>
                </div>
            </div>
        '''
    },
    'academics.html': {
        'title': 'Academics',
        'description': 'My educational background, from school marksheets to engineering semesters.',
        'content': '''
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem;">High School (Class 10)</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Foundation of my academic journey with strong fundamentals in Science and Mathematics.</p>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/class_10_cert.jpg', 'Class 10 Marksheet & Certificate', 'CBSE Class 10th Academic Records')">
                    <img src="assets/certs/class_10_cert.jpg" alt="10th">
                    <div><h4>Class 10 Marksheet & Cert</h4><p style="color: var(--text-muted); font-size: 0.9rem;">CBSE - 2021</p></div>
                </div>
            </div>
            
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem;">Higher Secondary (Class 12)</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Specialized in the Science stream, paving the way for my B.Tech in Computer Science & Engineering.</p>
                
                <div class="cert-card-large" onclick="openCert('assets/certs/class_12_cert.jpg', 'Class 12 Marksheet & Certificate', 'CBSE Class 12th Academic Records')">
                    <img src="assets/certs/class_12_cert.jpg" alt="12th">
                    <div><h4>Class 12 Marksheet & Cert</h4><p style="color: var(--text-muted); font-size: 0.9rem;">CBSE - 2023</p></div>
                </div>
            </div>
            
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem;">B.Tech Computer Science (2024-2028)</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Currently pursuing B.Tech in CSE at Barak Valley Engineering College. Semester results will be updated here.</p>
            </div>
        '''
    }
}

for filename, data in pages.items():
    html_content = base_html_template.replace('{title}', data['title']).replace('{description}', data['description']).replace('{timeline_content}', data['content'])
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"Created {filename}")
