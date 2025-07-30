// 전역 변수
let currentStep = 1;
const totalSteps = 5;
let formData = {};

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    initializeFAQ();
    initializeScrollEffects();
    initializeContactForm();
    initializeQuickContact();
});

// 폼 초기화
function initializeForm() {
    updateFormNavigation();
    
    // 라디오 버튼 이벤트 리스너
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            formData[this.name] = this.value;
            updateProgress();
        });
    });
    
    // 숫자 입력 이벤트 리스너
    const employeeInput = document.getElementById('employeeCount');
    if (employeeInput) {
        employeeInput.addEventListener('input', function() {
            formData.employeeCount = this.value;
            updateProgress();
        });
    }
    
    // 개인정보 입력 이벤트 리스너
    const contactInputs = ['name', 'company', 'phone', 'email', 'additional_info'];
    contactInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', function() {
                formData[id] = this.value;
            });
        }
    });
    
    // 개인정보 동의 체크박스
    const privacyAgree = document.getElementById('privacy_agree');
    if (privacyAgree) {
        privacyAgree.addEventListener('change', function() {
            formData.privacy_agree = this.checked;
            updateFormNavigation();
        });
    }
    
    // 폼 제출 이벤트
    const checkForm = document.getElementById('checkForm');
    if (checkForm) {
        checkForm.addEventListener('submit', handleFormSubmit);
    }
}

// 다음 단계로 이동
function nextStep() {
    if (!validateCurrentStep()) {
        return;
    }
    
    if (currentStep < totalSteps) {
        // 현재 단계 숨기기
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        currentStepElement.classList.remove('active');
        
        // 다음 단계로 이동
        currentStep++;
        
        // 다음 단계 보이기
        const nextStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        nextStepElement.classList.add('active');
        
        updateFormNavigation();
        
        // 스크롤을 폼 상단으로 이동
        const checkSection = document.getElementById('check');
        checkSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 이전 단계로 이동
function prevStep() {
    if (currentStep > 1) {
        // 현재 단계 숨기기
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        currentStepElement.classList.remove('active');
        
        // 이전 단계로 이동
        currentStep--;
        
        // 이전 단계 보이기
        const prevStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        prevStepElement.classList.add('active');
        
        updateFormNavigation();
    }
}

// 현재 단계 유효성 검사
function validateCurrentStep() {
    switch(currentStep) {
        case 1:
            if (!formData.industry) {
                showAlert('사업장 유형을 선택해주세요.');
                return false;
            }
            break;
        case 2:
            const employeeCount = document.getElementById('employeeCount').value;
            if (!employeeCount || employeeCount < 1) {
                showAlert('근로자 수를 입력해주세요.');
                return false;
            }
            formData.employeeCount = employeeCount;
            break;
        case 3:
            if (!formData.insurance_payment) {
                showAlert('4대보험료 납부 여부를 선택해주세요.');
                return false;
            }
            break;
        case 4:
            if (!formData.refund_experience) {
                showAlert('환급 신청 경험 여부를 선택해주세요.');
                return false;
            }
            break;
        case 5:
            // 필수 개인정보 검증
            const requiredFields = ['name', 'company', 'phone', 'email'];
            for (let field of requiredFields) {
                const element = document.getElementById(field);
                if (!element.value.trim()) {
                    showAlert(`${getFieldName(field)}을(를) 입력해주세요.`);
                    element.focus();
                    return false;
                }
            }
            
            // 이메일 형식 검증
            const email = document.getElementById('email').value;
            if (!isValidEmail(email)) {
                showAlert('올바른 이메일 주소를 입력해주세요.');
                document.getElementById('email').focus();
                return false;
            }
            
            // 전화번호 형식 검증
            const phone = document.getElementById('phone').value;
            if (!isValidPhone(phone)) {
                showAlert('올바른 전화번호를 입력해주세요. (예: 010-0000-0000)');
                document.getElementById('phone').focus();
                return false;
            }
            
            // 개인정보 동의 검증
            if (!formData.privacy_agree) {
                showAlert('개인정보 수집 및 이용에 동의해주세요.');
                return false;
            }
            break;
    }
    return true;
}

// 폼 네비게이션 업데이트
function updateFormNavigation() {
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const submitBtn = document.querySelector('.btn-submit');
    
    // 이전 버튼 표시/숨김
    if (currentStep === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    
    // 다음/제출 버튼 표시/숨김
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        
        // 개인정보 동의 상태에 따라 버튼 활성화
        const privacyAgree = document.getElementById('privacy_agree');
        if (privacyAgree && privacyAgree.checked) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        } else {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
        }
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

// 진행률 업데이트
function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// 폼 제출 처리
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    // 로딩 시작
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> 처리 중...';
    submitBtn.disabled = true;
    
    try {
        // 최종 폼 데이터 수집
        const finalData = {
            ...formData,
            name: document.getElementById('name').value,
            company: document.getElementById('company').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            additional_info: document.getElementById('additional_info').value,
            submitted_at: new Date().toISOString(),
            user_agent: navigator.userAgent,
            referrer: document.referrer
        };
        
        // 데이터 저장 (실제 환경에서는 서버로 전송)
        const success = await saveFormData(finalData);
        
        if (success) {
            // 성공 페이지 표시 또는 감사 메시지
            showSuccessMessage();
            
            // Google Analytics 이벤트 추적
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'engagement',
                    event_label: 'insurance_refund_application'
                });
            }
            
            // Meta Pixel 이벤트 추적
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: '4대보험 환급 신청',
                    value: 1
                });
            }
            
        } else {
            throw new Error('데이터 저장 실패');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showAlert('신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        // 로딩 종료
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// 데이터 저장 (로컬스토리지 및 서버 전송)
async function saveFormData(data) {
    try {
        // 로컬스토리지에 임시 저장
        const savedData = JSON.parse(localStorage.getItem('insurance_applications') || '[]');
        savedData.push(data);
        localStorage.setItem('insurance_applications', JSON.stringify(savedData));
        
        // 실제 환경에서는 서버 API 호출
        // const response = await fetch('/api/submit-application', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // });
        // return response.ok;
        
        // 임시로 성공 반환
        return true;
        
    } catch (error) {
        console.error('Data save error:', error);
        return false;
    }
}

// 성공 메시지 표시
function showSuccessMessage() {
    const checkSection = document.getElementById('check');
    checkSection.innerHTML = `
        <div class="container">
            <div class="success-message">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>신청이 완료되었습니다!</h2>
                <p>입력해주신 정보를 바탕으로 전문가가 환급 가능성을 검토한 후<br>
                1-2일 내에 연락드리겠습니다.</p>
                <div class="next-steps">
                    <h3>다음 단계</h3>
                    <ol>
                        <li>전문가 검토 (1-2일)</li>
                        <li>환급 가능성 진단 결과 안내</li>
                        <li>상담 및 진행 방향 결정</li>
                        <li>환급 절차 시작</li>
                    </ol>
                </div>
                                 <button class="cta-button" onclick="scrollToSection('contact')">
                     <i class="fas fa-phone"></i>
                     상담신청
                 </button>
            </div>
        </div>
    `;
    
    // 성공 메시지 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            text-align: center;
            padding: 3rem;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        .success-message .success-icon i {
            font-size: 4rem;
            color: #28a745;
            margin-bottom: 1rem;
        }
        .success-message h2 {
            color: #2c5aa0;
            margin-bottom: 1rem;
        }
        .next-steps {
            margin: 2rem 0;
            text-align: left;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        }
        .next-steps h3 {
            color: #2c5aa0;
            margin-bottom: 1rem;
        }
        .next-steps ol {
            padding-left: 1.5rem;
        }
        .next-steps li {
            margin-bottom: 0.5rem;
            color: #666;
        }
    `;
    document.head.appendChild(style);
}

// FAQ 초기화
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFaq(this);
        });
    });
}

// FAQ 토글
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // 모든 FAQ 아이템 비활성화
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 클릭된 아이템만 활성화 (이미 활성화된 경우 비활성화)
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// 스크롤 효과 초기화
function initializeScrollEffects() {
    // 헤더 스크롤 효과
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Intersection Observer로 요소 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animatedElements = document.querySelectorAll('.process-step, .success-item, .cert-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 섹션으로 스크롤
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// 개인정보 모달 표시
function showPrivacyModal() {
    const modal = document.getElementById('privacyModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 개인정보 모달 닫기
function closePrivacyModal() {
    const modal = document.getElementById('privacyModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 모달 외부 클릭 시 닫기
window.addEventListener('click', function(e) {
    const modal = document.getElementById('privacyModal');
    if (e.target === modal) {
        closePrivacyModal();
    }
});

// 연락처 폼 초기화
function initializeContactForm() {
    // 전화번호 자동 포맷팅
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length >= 3 && value.length <= 7) {
                value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
            } else if (value.length >= 8) {
                value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
            }
            e.target.value = value;
        });
    });
}

// 빠른 상담 신청 초기화
function initializeQuickContact() {
    const quickContactForm = document.getElementById('quickContact');
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name') || this.querySelector('input[type="text"]').value,
                phone: formData.get('phone') || this.querySelector('input[type="tel"]').value,
                message: formData.get('message') || this.querySelector('textarea').value,
                type: 'quick_contact',
                submitted_at: new Date().toISOString()
            };
            
            // 로딩 상태
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> 전송 중...';
            submitBtn.disabled = true;
            
            try {
                // 데이터 저장
                const savedContacts = JSON.parse(localStorage.getItem('quick_contacts') || '[]');
                savedContacts.push(data);
                localStorage.setItem('quick_contacts', JSON.stringify(savedContacts));
                
                // 성공 메시지
                showAlert('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
                this.reset();
                
                // 이벤트 추적
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'quick_contact', {
                        event_category: 'engagement',
                        event_label: 'quick_consultation'
                    });
                }
                
            } catch (error) {
                console.error('Quick contact error:', error);
                showAlert('상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// 유틸리티 함수들
function getFieldName(field) {
    const names = {
        'name': '성명',
        'company': '회사명',
        'phone': '연락처',
        'email': '이메일'
    };
    return names[field] || field;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^01[0-9]-\d{4}-\d{4}$/;
    return phoneRegex.test(phone);
}

function showAlert(message, type = 'error') {
    // 기존 알림 제거
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // 새 알림 생성
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // 스타일 추가
    if (!document.querySelector('#alert-styles')) {
        const style = document.createElement('style');
        style.id = 'alert-styles';
        style.textContent = `
            .custom-alert {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10001;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                animation: slideIn 0.3s ease;
                max-width: 400px;
            }
            .custom-alert.error {
                background: #dc3545;
            }
            .custom-alert.success {
                background: #28a745;
            }
            .alert-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .alert-content button {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                margin-left: auto;
                opacity: 0.8;
            }
            .alert-content button:hover {
                opacity: 1;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(alert);
    
    // 5초 후 자동 제거
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

// 관리자용 데이터 조회 함수 (개발/테스트용)
function getStoredData() {
    const applications = JSON.parse(localStorage.getItem('insurance_applications') || '[]');
    const contacts = JSON.parse(localStorage.getItem('quick_contacts') || '[]');
    
    console.log('저장된 환급 신청:', applications);
    console.log('저장된 빠른 상담:', contacts);
    
    return { applications, contacts };
}

// 데이터 내보내기 (CSV 형식)
function exportData() {
    const data = getStoredData();
    
    if (data.applications.length === 0 && data.contacts.length === 0) {
        showAlert('내보낼 데이터가 없습니다.');
        return;
    }
    
    let csv = '';
    
    // 환급 신청 데이터
    if (data.applications.length > 0) {
        csv += '=== 환급 신청 데이터 ===\n';
        csv += '신청일시,성명,회사명,연락처,이메일,업종,근로자수,보험료납부,환급경험,추가정보\n';
        
        data.applications.forEach(app => {
            csv += `${app.submitted_at},${app.name},${app.company},${app.phone},${app.email},${app.industry},${app.employeeCount},${app.insurance_payment},${app.refund_experience},"${app.additional_info || ''}"\n`;
        });
        csv += '\n';
    }
    
    // 빠른 상담 데이터
    if (data.contacts.length > 0) {
        csv += '=== 빠른 상담 신청 데이터 ===\n';
        csv += '신청일시,성명,연락처,문의내용\n';
        
        data.contacts.forEach(contact => {
            csv += `${contact.submitted_at},${contact.name},${contact.phone},"${contact.message || ''}"\n`;
        });
    }
    
    // 파일 다운로드
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `insurance_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 키보드 단축키 (개발/관리용)
document.addEventListener('keydown', function(e) {
    // Ctrl+Shift+D로 데이터 조회
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        getStoredData();
    }
    
    // Ctrl+Shift+E로 데이터 내보내기
    if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        exportData();
    }
}); 