document.addEventListener('DOMContentLoaded', () => {
    // Force page to load from the very top
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.scrollTop = 0;
    }
    window.scrollTo(0, 0);

    // 1. NAVIGATION & SIDEBAR SYSTEM
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    function switchSection(targetId) {
        // Remove active class from all nav items
        navItems.forEach(item => {
            if (item.getAttribute('data-target') === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Hide all sections and show target section
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active-section');
            } else {
                section.classList.remove('active-section');
            }
        });

        // Reset scroll position of main content container to the very top
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            switchSection(targetId);
        });
    });

    // Overview flowchart nodes click navigation
    const flowNodes = document.querySelectorAll('.flow-node');
    flowNodes.forEach(node => {
        node.addEventListener('click', () => {
            const stepId = node.getAttribute('data-step');
            
            // If it has a branch, switch to the specific tab
            const branch = node.getAttribute('data-branch');
            if (branch) {
                switchTab(branch === 'template' ? 'tab-template' : 'tab-scratch');
            }
            
            switchSection(stepId);
        });
    });

    // 2. TAB CONTROL SYSTEM (Step 2: Template vs Scratch)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        tabButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        tabContents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active-tab');
            } else {
                content.classList.remove('active-tab');
            }
        });
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.getAttribute('data-tab'));
        });
    });


    // 3. INTERACTIVE ACCORDION (Step 1 Requirements)
    const reqHeaders = document.querySelectorAll('.req-header');
    
    reqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const reqItem = header.parentElement;
            
            // Check if active, toggle it
            const isActive = reqItem.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.req-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                reqItem.classList.add('active');
                reqItem.classList.add('checked'); // Mark as read/checked
            }
        });
    });


    // 4. RESPONSIVE TABLE SIMULATOR
    const btnDesktop = document.getElementById('btn-view-desktop');
    const btnMobile = document.getElementById('btn-view-mobile');
    const previewContainer = document.getElementById('responsive-preview');

    const dummyData = [
        { id: "EQ-001", name: "Excavator CAT 320", rate: "Rp 3.5jt/hari", status: "Tersedia" },
        { id: "EQ-002", name: "Bulldozer D6R", rate: "Rp 4.2jt/hari", status: "Disewa" }
    ];

    function renderResponsiveView(viewType) {
        if (viewType === 'desktop') {
            previewContainer.className = "responsive-view-container desktop-view";
            previewContainer.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Kode</th>
                            <th>Nama Unit</th>
                            <th>Tarif Sewa</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${dummyData.map(item => `
                            <tr>
                                <td><strong>${item.id}</strong></td>
                                <td>${item.name}</td>
                                <td>${item.rate}</td>
                                <td><span class="badge" style="background: ${item.status === 'Tersedia' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)'}; color: ${item.status === 'Tersedia' ? 'var(--success)' : 'var(--warning)'}">${item.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            previewContainer.className = "responsive-view-container mobile-view";
            previewContainer.innerHTML = `
                <div class="mobile-card-list">
                    ${dummyData.map(item => `
                        <div class="mobile-card">
                            <div class="mobile-card-row">
                                <span>ID Unit</span>
                                <strong>${item.id}</strong>
                            </div>
                            <div class="mobile-card-row">
                                <span>Nama Unit</span>
                                <span>${item.name}</span>
                            </div>
                            <div class="mobile-card-row">
                                <span>Tarif</span>
                                <span style="color: var(--success); font-weight:600;">${item.rate}</span>
                            </div>
                            <div class="mobile-card-row">
                                <span>Status</span>
                                <span class="badge" style="background: ${item.status === 'Tersedia' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)'}; color: ${item.status === 'Tersedia' ? 'var(--success)' : 'var(--warning)'}">${item.status}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    // Initialize with Desktop view
    if (previewContainer) {
        renderResponsiveView('desktop');
    }

    btnDesktop?.addEventListener('click', () => {
        btnDesktop.classList.add('active');
        btnMobile.classList.remove('active');
        renderResponsiveView('desktop');
    });

    btnMobile?.addEventListener('click', () => {
        btnMobile.classList.add('active');
        btnDesktop.classList.remove('active');
        renderResponsiveView('mobile');
    });


    // 5. GIT WORKFLOW SIMULATOR (Step 3)
    const gitNodes = {
        'g-node-v0': {
            title: "1. v0.dev Workspace",
            desc: "Hasil codingan aplikasi dummy digenerate disini. Setelah itu Anda mempublish project, yang akan otomatis membuat Repo baru di GitHub.",
            cmd: "v0.dev -> klik 'Deploy to Vercel'"
        },
        'g-node-github': {
            title: "2. GitHub Repository (Public)",
            desc: "Repositori akan terbuat di GitHub. v0 membuat branch baru (biasanya main/v0-changes). Jika template sudah ada, lakukan Pull Request.",
            cmd: "Kunjungi URL repositori Anda dan klik 'Merge Pull Request' ke branch utama."
        },
        'g-node-local': {
            title: "3. Local Environment (PC/Cursor)",
            desc: "Clone repositori ke laptop Anda menggunakan git command, lalu jalankan development server lokal secara interaktif.",
            cmd: "git clone https://github.com/[username]/[repo-name].git"
        }
    };

    const gitLine1 = document.getElementById('git-line-1');
    const gitLine2 = document.getElementById('git-line-2');
    const gitActionText = document.getElementById('git-action-text');
    const gitCmdText = document.getElementById('git-command-text');

    Object.keys(gitNodes).forEach(nodeId => {
        const nodeEl = document.getElementById(nodeId);
        if (nodeEl) {
            nodeEl.addEventListener('click', () => {
                // Remove active classes
                Object.keys(gitNodes).forEach(id => {
                    document.getElementById(id).classList.remove('active');
                });
                gitLine1.classList.remove('active');
                gitLine2.classList.remove('active');

                // Set active current node & previous lines
                nodeEl.classList.add('active');
                if (nodeId === 'g-node-github') {
                    gitLine1.classList.add('active');
                } else if (nodeId === 'g-node-local') {
                    gitLine1.classList.add('active');
                    gitLine2.classList.add('active');
                }

                // Update text display
                const nodeInfo = gitNodes[nodeId];
                gitActionText.innerHTML = `<strong>${nodeInfo.title}</strong><br>${nodeInfo.desc}`;
                gitCmdText.innerText = nodeInfo.cmd;
            });
        }
    });

    // Command copy to clipboard
    const btnCopyCmd = document.getElementById('btn-copy-cmd');
    btnCopyCmd?.addEventListener('click', () => {
        navigator.clipboard.writeText(gitCmdText.innerText).then(() => {
            const originalText = btnCopyCmd.innerHTML;
            btnCopyCmd.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
            setTimeout(() => {
                btnCopyCmd.innerHTML = originalText;
            }, 1500);
        });
    });


    // 6. PROMPT GENERATOR SYSTEM (Seven Gym Specific & Custom Presets)
    const appNameInput = document.getElementById('p-app-name');
    const colorThemeInput = document.getElementById('p-color-theme');
    const rbacInput = document.getElementById('p-rbac');
    const uiPrinciplesInput = document.getElementById('p-ui-principles');
    
    const optSearchCheckbox = document.getElementById('p-opt-search');
    const optResponsiveCheckbox = document.getElementById('p-opt-responsive');
    const optTemplateCheckbox = document.getElementById('p-opt-template');
    const promptTextarea = document.getElementById('prompt-output-textarea');

    const btnPresetGym = document.getElementById('btn-preset-gym');
    const btnPresetCustom = document.getElementById('btn-preset-custom');

    const presets = {
      gym: {
        appName: "Seven Gym Management System",
        colorTheme: `Gaya "Modern Premium Gym / Urban Fitness".
- Base UI tetap bersih seperti TailAdmin.
- Light-first, dark mode tetap support.
- Primary: emerald/green untuk aktif, sukses, check-in.
- Secondary: cyan/blue untuk jadwal, booking, info.
- Accent: amber untuk revenue, POS, point/reward.
- Red untuk expired, stok rendah, gagal bayar.
- Jangan terlalu banyak gradient.`,
        rbac: "Admin / Owner, Member, Personal Trainer",
        uiPrinciples: `- Dashboard memakai card statistik, chart, activity feed, dan list ringkas.
- Tabel hanya dipakai untuk histori/detail data, bukan semua halaman.
- POS wajib berbentuk visual kasir (Katalog kiri, Cart tengah, Checkout/bayar kanan).
- Booking menggunakan schedule/calendar/cards.
- Member detail menggunakan profile layout.
- Check-in menggunakan QR scanner station mockup.
- Progress latihan memakai weight/BMI chart dan before-after area.
- Inventory memakai cards dan stock movement.
- WhatsApp automation memakai cards ON/OFF.
- Report memakai charts + summary di atas, detail di bawah.`
      },
      custom: {
        appName: "Sistem Sewa Alat Berat",
        colorTheme: `Sleek dark theme premium dengan aksen neon indigo dan neon violet.
- Menggunakan glassmorphism cards.
- Desain minimalis, bersih, dan berorientasi data.`,
        rbac: "Admin, Operator Lapangan, Customer",
        uiPrinciples: `- Dashboard operasional dengan peta sebaran alat berat.
- Tabel inventory alat berat dengan filter kategori & status sewa.
- Form order sewa interaktif dengan rincian biaya real-time.
- Laporan grafik pendapatan bulanan & utilitas alat.`
      }
    };

    btnPresetGym?.addEventListener('click', () => {
      btnPresetGym.classList.add('active');
      btnPresetCustom.classList.remove('active');
      loadPreset('gym');
    });

    btnPresetCustom?.addEventListener('click', () => {
      btnPresetCustom.classList.add('active');
      btnPresetGym.classList.remove('active');
      loadPreset('custom');
    });

    function loadPreset(key) {
      const data = presets[key];
      if (appNameInput) appNameInput.value = data.appName;
      if (colorThemeInput) colorThemeInput.value = data.colorTheme;
      if (rbacInput) rbacInput.value = data.rbac;
      if (uiPrinciplesInput) uiPrinciplesInput.value = data.uiPrinciples;
      updatePrompt();
    }

    function updatePrompt() {
        if (!promptTextarea) return;

        const appName = appNameInput.value.trim() || "[Nama Aplikasi]";
        const colorTheme = colorThemeInput.value.trim() || "[Deskripsi Tema Warna & Gaya Visual]";
        const rbacVal = rbacInput.value.trim();
        const uiPrinciples = uiPrinciplesInput.value.trim();
        
        const hasSearch = optSearchCheckbox.checked;
        const hasResponsive = optResponsiveCheckbox.checked;
        const hasTemplate = optTemplateCheckbox.checked;

        // Construct roles list
        const rolesList = rbacVal ? rbacVal.split(',').map(r => r.trim()).filter(r => r) : [];
        const rolesText = rolesList.length > 0 ? rolesList.join(', ') : "Admin, Member, Staff";

        let prompt = `Tolong buatkan prototype aplikasi "${appName}" menggunakan template admin. Jangan buat landing page. Fokus ke aplikasi dashboard yang siap dipakai untuk demo.

Tujuan:
Membangun prototype "${appName}" dengan interaksi dinamis menggunakan mock data lokal (tanpa backend / menggunakan state React/localStorage).

Spesifikasi & Fitur Wajib:

1. Tema Warna & Gaya Visual:
${colorTheme}
- Jangan terlalu banyak menggunakan gradient.
- Desain harus terlihat modern, premium, dan bersih.

2. Menu & Role-Based Access Control (RBAC):
- Aplikasi harus mendukung role: ${rolesText}.
- Wajib menyediakan panel switcher role / dummy login interaktif agar user bisa mengganti role secara real-time.
- Menu sidebar dan tampilan dashboard harus berubah menyesuaikan hak akses role yang aktif.`;

        if (hasSearch) {
            prompt += `\n\n3. Dropdown Searchable:
- Semua dropdown input yang memiliki pilihan relasi data (misalnya pilihan member, produk, atau kategori) wajib menggunakan komponen searchable dropdown agar memudahkan pencarian data.`;
        }

        if (hasResponsive) {
            prompt += `\n\n4. Tabel Responsive (Table to Card):
- Semua tabel data harus responsif secara penuh. Jika dibuka di perangkat mobile (HP), layout baris tabel horizontal harus berubah otomatis menjadi grid cards yang rapi dan informatif.`;
        }

        if (uiPrinciples) {
            prompt += `\n\nPrinsip UI & Layout Khusus:
${uiPrinciples}`;
        }

        prompt += `\n\nDummy Data & Interaksi Prototype:
- Siapkan dummy data dinamis lengkap yang realistis.
- Simulasi CRUD dasar: tombol tambah/edit data disimulasikan menggunakan modal dialog interaktif.
- Fitur pencarian/filter di dalam tabel atau list data harus berfungsi secara real-time.`;

        if (hasTemplate) {
            prompt += `\n\nOutput:
Buat struktur component yang rapi, reusable, dan modular (Sidebar, Header, Metric Cards, Charts, dll) menggunakan TypeScript, Tailwind CSS, dan React/Next.js yang konsisten dengan template admin TailAdmin.`;
        } else {
            prompt += `\n\nOutput:
Buat struktur component yang rapi, reusable, dan modular menggunakan React/TypeScript, Tailwind CSS, dan responsive layout.`;
        }

        promptTextarea.value = prompt;
    }

    // Add listeners to all generator form elements
    [appNameInput, colorThemeInput, rbacInput, uiPrinciplesInput, optSearchCheckbox, optResponsiveCheckbox, optTemplateCheckbox].forEach(el => {
        el?.addEventListener('input', updatePrompt);
        el?.addEventListener('change', updatePrompt);
    });

    // Copy Prompt Button
    const btnCopyPrompt = document.getElementById('btn-copy-prompt');
    btnCopyPrompt?.addEventListener('click', () => {
        navigator.clipboard.writeText(promptTextarea.value).then(() => {
            const originalText = btnCopyPrompt.innerHTML;
            btnCopyPrompt.innerHTML = `<i class="fa-solid fa-check"></i> Prompt Copied!`;
            btnCopyPrompt.classList.add('btn-success');
            setTimeout(() => {
                btnCopyPrompt.innerHTML = originalText;
                btnCopyPrompt.classList.remove('btn-success');
            }, 1500);
        });
    });

    // Run first prompt update on load
    updatePrompt();


    // 7. INTERACTIVE TOUR SYSTEM
    const btnTour = document.getElementById('btn-start-tour');
    const tourOverlay = document.getElementById('tour-overlay');
    const tourTitle = document.getElementById('tour-title');
    const tourDesc = document.getElementById('tour-desc');
    const tourNext = document.getElementById('tour-next');
    const tourPrev = document.getElementById('tour-prev');
    const tourProgress = document.getElementById('tour-progress');
    const tourClose = document.getElementById('tour-close');

    const tourSteps = [
        {
            title: "Selamat Datang di Panduan v0!",
            desc: "Panduan interaktif ini dirancang khusus untuk programmer dalam membuat prototype dummy aplikasi dengan efisien. Mari ikuti tur singkatnya.",
            targetSection: "overview-section",
            highlight: "node-ai"
        },
        {
            title: "Langkah 1: AI Discussion & Prompt",
            desc: "Sebelum mulai meng-code, buat blueprint aplikasi bersama AI. Wajib gunakan 4 komponen dasar: Theme Warna, RBAC Role-Switcher, Searchable Dropdown, dan Responsive Table-to-Card.",
            targetSection: "step1-section",
            highlight: "step1-section"
        },
        {
            title: "Langkah 2: Pilih Alur Kerja v0",
            desc: "Anda bisa mengimport template GitHub Publik Anda ke v0, atau meng-generate langsung dari nol. Sesuaikan opsi ini di tab menu.",
            targetSection: "step2-section",
            highlight: "step2-section"
        },
        {
            title: "Langkah 3: Deploy Vercel & Clone Lokal",
            desc: "Deploy hasil prototype v0 ke Vercel, lalu hubungkan repo ke komputer Anda untuk melanjutkan modifikasi coding di local compiler (VS Code, Cursor, dll).",
            targetSection: "step3-section",
            highlight: "step3-section"
        },
        {
            title: "Tools: Interactive Prompt Generator",
            desc: "Gunakan generator instan ini untuk menyusun prompt v0 berkualitas tinggi. Gunakan Preset 'Seven Gym' untuk acuan prompt berstandar premium!",
            targetSection: "playground-section",
            highlight: "playground-section"
        }
    ];

    let currentTourStep = 0;

    function showTourStep(index) {
        const step = tourSteps[index];
        tourTitle.innerText = step.title;
        tourDesc.innerText = step.desc;
        tourProgress.innerText = `${index + 1} / ${tourSteps.length}`;

        // Switch to the target section in background
        switchSection(step.targetSection);

        // Control buttons state
        if (index === 0) {
            tourPrev.style.display = 'none';
        } else {
            tourPrev.style.display = 'inline-block';
        }

        if (index === tourSteps.length - 1) {
            tourNext.innerText = "Selesai";
        } else {
            tourNext.innerText = "Lanjut";
        }
    }

    btnTour?.addEventListener('click', () => {
        currentTourStep = 0;
        tourOverlay.style.display = 'flex';
        showTourStep(currentTourStep);
    });

    tourNext?.addEventListener('click', () => {
        if (currentTourStep < tourSteps.length - 1) {
            currentTourStep++;
            showTourStep(currentTourStep);
        } else {
            tourOverlay.style.display = 'none';
        }
    });

    tourPrev?.addEventListener('click', () => {
        if (currentTourStep > 0) {
            currentTourStep--;
            showTourStep(currentTourStep);
        }
    });

    tourClose?.addEventListener('click', () => {
        tourOverlay.style.display = 'none';
    });

    // Close when clicking overlay background (outside tour card)
    tourOverlay?.addEventListener('click', (e) => {
        if (e.target === tourOverlay) {
            tourOverlay.style.display = 'none';
        }
    });
});
