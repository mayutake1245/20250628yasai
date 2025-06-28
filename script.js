// パーティクルシステム
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.getElementById('particles');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.init();
    }

    init() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
}

// スムーススクロール
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// アニメーション開始関数
function startAnimation() {
    const elements = document.querySelectorAll('.floating-element');
    const colors = ['#00d4ff', '#0099cc', '#4ecdc4', '#667eea'];
    
    elements.forEach((element, index) => {
        element.style.animation = 'none';
        element.offsetHeight; // リフロー
        element.style.animation = `float 2s ease-in-out infinite`;
        element.style.color = colors[index % colors.length];
        element.style.transform = 'scale(1.5)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 2000);
    });
    
    showNotification('❄️ 寒色のマジックが開始されました！', 'success');
}

// 通知表示関数
function showNotification(message = '🔔 通知が表示されました！', type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// モーダル機能
function openModal(element) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    
    const title = element.querySelector('h3').textContent;
    const descriptions = {
        '美しい画像 1': 'この美しい画像は、寒色系のデザイントレンドを取り入れた作品です。',
        '美しい画像 2': '洗練された寒色の色彩と構図で、視覚的な魅力を最大限に引き出しています。',
        '美しい画像 3': 'モダンな寒色系アートワークで、創造性と技術の融合を表現しています。',
        '美しい画像 4': '革新的な寒色系デザインアプローチで、新しい視覚体験を提供します。'
    };
    
    modalTitle.textContent = title;
    modalDescription.textContent = descriptions[title] || '素晴らしい寒色系作品の詳細情報です。';
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// フォーム送信処理
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // ローディング状態
    submitBtn.innerHTML = '<div class="loading"></div> 送信中...';
    submitBtn.disabled = true;
    
    // フォームデータの取得
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // シミュレーション（実際の送信処理）
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> 送信完了！';
        submitBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
        
        showNotification('📧 メッセージが正常に送信されました！', 'success');
        
        // フォームをリセット
        form.reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 2000);
    }, 2000);
}

// スクロールアニメーション
function initScrollAnimations() {
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
    
    const animatedElements = document.querySelectorAll('.feature-card, .gallery-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ヘッダーのスクロール効果
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(30, 60, 114, 0.2)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(30, 60, 114, 0.1)';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// フローティング要素のマウス追従
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        floatingElements.forEach((element, index) => {
            const speed = parseFloat(element.dataset.speed) || 1;
            const x = (mouseX - window.innerWidth / 2) * speed * 0.01;
            const y = (mouseY - window.innerHeight / 2) * speed * 0.01;
            
            element.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
        });
    });
}

// キーボードショートカット
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // ESCキーでモーダルを閉じる
        if (e.key === 'Escape') {
            const modal = document.getElementById('modal');
            if (modal.style.display === 'block') {
                closeModal();
            }
        }
        
        // スペースキーでアニメーション開始
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            startAnimation();
        }
    });
}

// パフォーマンス最適化
function initPerformanceOptimizations() {
    // 画像の遅延読み込み
    const images = document.querySelectorAll('img');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// 初期化関数
function init() {
    // パーティクルシステムの初期化
    const particleSystem = new ParticleSystem();
    
    // 各種機能の初期化
    smoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initFloatingElements();
    initKeyboardShortcuts();
    initPerformanceOptimizations();
    
    // ウィンドウリサイズ対応
    window.addEventListener('resize', () => {
        particleSystem.resize();
    });
    
    // ページ読み込み完了時のアニメーション
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        showNotification('❄️ 寒色系の華やかなサイトへようこそ！', 'success');
    });
    
    // 初期スタイル設定
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
}

// DOM読み込み完了後に初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// グローバル関数として公開
window.startAnimation = startAnimation;
window.showNotification = showNotification;
window.openModal = openModal;
window.closeModal = closeModal;
window.handleSubmit = handleSubmit; 