// ========================================
// FAQ ACCORDION FUNCTIONALITY
// ========================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('active');
        });
        
        // Toggle current FAQ
        if (!isActive) {
            question.classList.add('active');
            answer.classList.add('active');
        }
    });
});

// ========================================
// FAQ SEARCH FUNCTIONALITY
// ========================================
const searchInput = document.getElementById('searchFaq');
const faqItems = document.querySelectorAll('.faq-item');
const noResults = document.querySelector('.no-results');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let hasResults = false;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        const keywords = item.getAttribute('data-keywords').toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm) || keywords.includes(searchTerm)) {
            item.style.display = 'block';
            hasResults = true;
        } else {
            item.style.display = 'none';
        }
    });

    if (hasResults || searchTerm === '') {
        noResults.classList.remove('show');
    } else {
        noResults.classList.add('show');
    }
});

// ========================================
// CHARACTER COUNTER FOR TEXTAREA
// ========================================
const pesanTextarea = document.getElementById('pesan');
const charCount = document.getElementById('charCount');

pesanTextarea.addEventListener('input', () => {
    const length = pesanTextarea.value.length;
    charCount.textContent = length;
    
    if (length > 500) {
        charCount.style.color = '#dc3545';
    } else {
        charCount.style.color = '#6c757d';
    }
});

// ========================================
// FORM VALIDATION FUNCTIONS
// ========================================
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('modal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnReset = document.getElementById('btnReset');

function validateField(field, errorElement, validationFn, errorMsg) {
    const value = field.value.trim();
    
    if (!validationFn(value)) {
        field.classList.add('error');
        errorElement.textContent = errorMsg;
        errorElement.classList.add('show');
        return false;
    } else {
        field.classList.remove('error');
        errorElement.classList.remove('show');
        return true;
    }
}

function validateForm() {
    let isValid = true;

    // Validate Nama
    isValid = validateField(
        document.getElementById('nama'),
        document.getElementById('errorNama'),
        (val) => val.length >= 3,
        'Nama lengkap wajib diisi (minimal 3 karakter)'
    ) && isValid;

    // Validate NIM
    isValid = validateField(
        document.getElementById('nim'),
        document.getElementById('errorNim'),
        (val) => /^\d{10}$/.test(val),
        'NIM wajib diisi (10 digit angka)'
    ) && isValid;

    // Validate Email
    isValid = validateField(
        document.getElementById('email'),
        document.getElementById('errorEmail'),
        (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        'Format email tidak valid'
    ) && isValid;

    // Validate Kategori
    isValid = validateField(
        document.getElementById('kategori'),
        document.getElementById('errorKategori'),
        (val) => val !== '',
        'Kategori wajib dipilih'
    ) && isValid;

    // Validate Subjek
    isValid = validateField(
        document.getElementById('subjek'),
        document.getElementById('errorSubjek'),
        (val) => val.length >= 5,
        'Subjek wajib diisi (minimal 5 karakter)'
    ) && isValid;

    // Validate Pesan
    isValid = validateField(
        document.getElementById('pesan'),
        document.getElementById('errorPesan'),
        (val) => val.length >= 20 && val.length <= 500,
        'Pesan wajib diisi (20-500 karakter)'
    ) && isValid;

    return isValid;
}

// ========================================
// FORM SUBMIT HANDLER
// ========================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        // Simulate form submission - collect form data
        const formData = {
            nama: document.getElementById('nama').value,
            nim: document.getElementById('nim').value,
            email: document.getElementById('email').value,
            kategori: document.getElementById('kategori').value,
            subjek: document.getElementById('subjek').value,
            pesan: document.getElementById('pesan').value,
            timestamp: new Date().toLocaleString('id-ID')
        };

        // Log data to console (for demo purposes)
        console.log('Form Data Submitted:', formData);

        // Show success modal
        modalIcon.textContent = '✓';
        modalIcon.className = 'modal-icon success';
        modalTitle.textContent = 'Pesan Berhasil Dikirim!';
        modalMessage.textContent = `Terima kasih ${formData.nama}. Pesan Anda dengan subjek "${formData.subjek}" telah kami terima. Tim kami akan merespons melalui email (${formData.email}) dalam waktu 1x24 jam kerja.`;
        modal.classList.add('show');

        // Reset form after success
        setTimeout(() => {
            contactForm.reset();
            charCount.textContent = '0';
        }, 1000);
    } else {
        // Show error modal
        modalIcon.textContent = '✕';
        modalIcon.className = 'modal-icon error';
        modalTitle.textContent = 'Gagal Mengirim Pesan';
        modalMessage.textContent = 'Mohon periksa kembali form Anda. Pastikan semua field yang wajib diisi sudah terisi dengan benar.';
        modal.classList.add('show');
    }
});

// ========================================
// REAL-TIME VALIDATION
// ========================================
const fields = [
    { input: 'nama', error: 'errorNama', fn: (val) => val.length >= 3, msg: 'Nama minimal 3 karakter' },
    { input: 'nim', error: 'errorNim', fn: (val) => /^\d{10}$/.test(val), msg: 'NIM harus 10 digit angka' },
    { input: 'email', error: 'errorEmail', fn: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), msg: 'Email tidak valid' },
    { input: 'subjek', error: 'errorSubjek', fn: (val) => val.length >= 5, msg: 'Subjek minimal 5 karakter' },
    { input: 'pesan', error: 'errorPesan', fn: (val) => val.length >= 20 && val.length <= 500, msg: 'Pesan 20-500 karakter' }
];

fields.forEach(field => {
    const inputEl = document.getElementById(field.input);
    const errorEl = document.getElementById(field.error);

    inputEl.addEventListener('blur', () => {
        if (inputEl.value.trim() !== '') {
            validateField(inputEl, errorEl, field.fn, field.msg);
        }
    });

    inputEl.addEventListener('input', () => {
        if (inputEl.classList.contains('error')) {
            validateField(inputEl, errorEl, field.fn, field.msg);
        }
    });
});

// Kategori validation on change
document.getElementById('kategori').addEventListener('change', function() {
    if (this.classList.contains('error')) {
        validateField(
            this,
            document.getElementById('errorKategori'),
            (val) => val !== '',
            'Kategori wajib dipilih'
        );
    }
});

// ========================================
// RESET BUTTON HANDLER
// ========================================
btnReset.addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin mereset form? Semua data yang telah diisi akan dihapus.')) {
        contactForm.reset();
        charCount.textContent = '0';
        
        // Remove all error states
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
    }
});

// ========================================
// MODAL CLOSE HANDLERS
// ========================================
btnCloseModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
    }
});

// ========================================
// NAVIGATION LINKS HANDLER
// ========================================
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        console.log('Navigasi ke:', targetId);
        alert('Fitur navigasi ke halaman ' + targetId + ' akan tersedia di versi lengkap portal.');
    });
});