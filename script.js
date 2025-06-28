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

// 野菜交流サイトのデータ管理
class VegetableCommunity {
    constructor() {
        this.posts = JSON.parse(localStorage.getItem('vegetableCommunityPosts')) || [];
        this.currentSort = 'date';
        this.categories = {
            tomato: { name: 'トマト', emoji: '🍅', color: '#FF6347' },
            carrot: { name: 'にんじん', emoji: '🥕', color: '#FF8C00' },
            lettuce: { name: 'レタス', emoji: '🥬', color: '#90EE90' },
            cucumber: { name: 'きゅうり', emoji: '🥒', color: '#32CD32' },
            broccoli: { name: 'ブロッコリー', emoji: '🥦', color: '#228B22' },
            pepper: { name: 'ピーマン', emoji: '🫑', color: '#FF4500' },
            onion: { name: 'たまねぎ', emoji: '🧅', color: '#FFD700' },
            potato: { name: 'じゃがいも', emoji: '🥔', color: '#DEB887' },
            other: { name: 'その他', emoji: '🌱', color: '#98FB98' }
        };
        this.init();
    }

    init() {
        this.renderPosts();
        this.renderStats();
        this.setupEventListeners();
    }

    // 投稿を追加
    addPost(name, title, category, message) {
        const post = {
            id: Date.now(),
            name: name.trim(),
            title: title.trim(),
            category: category,
            message: message.trim(),
            date: new Date().toISOString(),
            timestamp: Date.now()
        };

        this.posts.unshift(post); // 最新の投稿を先頭に追加
        this.saveToLocalStorage();
        this.renderPosts();
        this.renderStats();
        this.showNotification(`🥕 ${this.categories[category].name}の投稿が追加されました！`, 'success');
    }

    // 投稿を削除
    deletePost(id) {
        const post = this.posts.find(p => p.id === id);
        this.posts = this.posts.filter(post => post.id !== id);
        this.saveToLocalStorage();
        this.renderPosts();
        this.renderStats();
        this.showNotification(`🗑️ ${post.title}を削除しました`, 'info');
    }

    // すべての投稿を削除
    clearAllPosts() {
        this.posts = [];
        this.saveToLocalStorage();
        this.renderPosts();
        this.renderStats();
        this.showNotification('🧹 すべての投稿を削除しました', 'info');
    }

    // 投稿をソート
    sortPosts(type) {
        this.currentSort = type;
        
        switch (type) {
            case 'date':
                this.posts.sort((a, b) => b.timestamp - a.timestamp);
                break;
            case 'name':
                this.posts.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
                break;
            case 'category':
                this.posts.sort((a, b) => this.categories[a.category].name.localeCompare(this.categories[b.category].name, 'ja'));
                break;
        }
        
        this.renderPosts();
        this.showNotification(`📊 ${type === 'date' ? '日時' : type === 'name' ? '名前' : 'カテゴリー'}順でソートしました`, 'info');
    }

    // 統計を表示
    renderStats() {
        const statsGrid = document.getElementById('statsGrid');
        
        // 総投稿数
        const totalPosts = this.posts.length;
        
        // カテゴリー別投稿数
        const categoryStats = {};
        Object.keys(this.categories).forEach(category => {
            categoryStats[category] = this.posts.filter(post => post.category === category).length;
        });
        
        // 最も人気のカテゴリー
        const popularCategory = Object.keys(categoryStats).reduce((a, b) => 
            categoryStats[a] > categoryStats[b] ? a : b
        );
        
        // 今日の投稿数
        const today = new Date().toDateString();
        const todayPosts = this.posts.filter(post => 
            new Date(post.date).toDateString() === today
        ).length;

        const statsHTML = `
            <div class="stat-card">
                <div class="stat-icon">📝</div>
                <div class="stat-number">${totalPosts}</div>
                <div class="stat-label">総投稿数</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">${this.categories[popularCategory].emoji}</div>
                <div class="stat-number">${categoryStats[popularCategory]}</div>
                <div class="stat-label">${this.categories[popularCategory].name}の投稿</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📅</div>
                <div class="stat-number">${todayPosts}</div>
                <div class="stat-label">今日の投稿</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-number">${new Set(this.posts.map(post => post.name)).size}</div>
                <div class="stat-label">参加者数</div>
            </div>
        `;
        
        statsGrid.innerHTML = statsHTML;
    }

    // 投稿を表示
    renderPosts() {
        const container = document.getElementById('postsContainer');
        const noPosts = document.getElementById('noPosts');

        if (this.posts.length === 0) {
            container.innerHTML = '';
            noPosts.style.display = 'block';
            return;
        }

        noPosts.style.display = 'none';
        container.innerHTML = this.posts.map(post => this.createPostHTML(post)).join('');
    }

    // 投稿のHTMLを生成
    createPostHTML(post) {
        const date = new Date(post.date);
        const formattedDate = date.toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        const category = this.categories[post.category];

        return `
            <div class="post-card" data-id="${post.id}">
                <div class="post-header">
                    <div class="post-info">
                        <h3>${this.escapeHtml(post.title)}</h3>
                        <div class="post-meta">
                            <span><i class="fas fa-user"></i> ${this.escapeHtml(post.name)}</span>
                            <span><i class="fas fa-clock"></i> ${formattedDate}</span>
                            <span class="post-category">${category.emoji} ${category.name}</span>
                        </div>
                    </div>
                </div>
                <div class="post-content">
                    ${this.escapeHtml(post.message).replace(/\n/g, '<br>')}
                </div>
                <div class="post-actions">
                    <button class="btn btn-danger btn-small" onclick="vegetableCommunity.confirmDelete(${post.id})">
                        <i class="fas fa-trash"></i> 削除
                    </button>
                </div>
            </div>
        `;
    }

    // 削除確認
    confirmDelete(id) {
        this.pendingDeleteId = id;
        const post = this.posts.find(p => p.id === id);
        const message = `「${post.title}」を削除しますか？`;
        
        document.getElementById('confirmMessage').textContent = message;
        document.getElementById('confirmModal').style.display = 'block';
    }

    // 削除実行
    executeDelete() {
        if (this.pendingDeleteId) {
            this.deletePost(this.pendingDeleteId);
            this.pendingDeleteId = null;
        }
        this.closeModal();
    }

    // モーダルを閉じる
    closeModal() {
        document.getElementById('confirmModal').style.display = 'none';
    }

    // ローカルストレージに保存
    saveToLocalStorage() {
        localStorage.setItem('vegetableCommunityPosts', JSON.stringify(this.posts));
    }

    // HTMLエスケープ
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // イベントリスナーを設定
    setupEventListeners() {
        // フォーム送信
        document.getElementById('postForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // モーダルの外側をクリックして閉じる
        document.getElementById('confirmModal').addEventListener('click', (e) => {
            if (e.target.id === 'confirmModal') {
                this.closeModal();
            }
        });

        // ESCキーでモーダルを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // フォーム送信処理
    handleFormSubmit() {
        const form = document.getElementById('postForm');
        const formData = new FormData(form);
        
        const name = formData.get('name');
        const title = formData.get('title');
        const category = formData.get('category');
        const message = formData.get('message');

        if (!name || !title || !category || !message) {
            this.showNotification('🌱 すべての項目を入力してください', 'error');
            return;
        }

        // 投稿ボタンをローディング状態にする
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="loading"></div> 投稿中...';
        submitBtn.disabled = true;

        // 投稿処理（シミュレーション）
        setTimeout(() => {
            this.addPost(name, title, category, message);
            form.reset();
            
            // ボタンを元に戻す
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1000);
    }

    // 通知を表示
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // 通知のスタイルを設定
        const bgColor = type === 'success' ? 'linear-gradient(45deg, #4CAF50, #8BC34A)' : 
                       type === 'error' ? 'linear-gradient(45deg, #f44336, #e91e63)' :
                       'linear-gradient(45deg, #2196F3, #03A9F4)';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 3000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// グローバル関数
function clearForm() {
    document.getElementById('postForm').reset();
    vegetableCommunity.showNotification('🧹 フォームをクリアしました', 'info');
}

function sortPosts(type) {
    vegetableCommunity.sortPosts(type);
}

function clearAllPosts() {
    if (vegetableCommunity.posts.length === 0) {
        vegetableCommunity.showNotification('🌱 削除する投稿がありません', 'info');
        return;
    }
    
    vegetableCommunity.pendingDeleteId = 'all';
    document.getElementById('confirmMessage').textContent = 'すべての投稿を削除しますか？この操作は取り消せません。';
    document.getElementById('confirmModal').style.display = 'block';
}

function confirmDelete() {
    if (vegetableCommunity.pendingDeleteId === 'all') {
        vegetableCommunity.clearAllPosts();
        vegetableCommunity.pendingDeleteId = null;
    } else {
        vegetableCommunity.executeDelete();
    }
}

function closeModal() {
    vegetableCommunity.closeModal();
}

// 初期化
let vegetableCommunity;

document.addEventListener('DOMContentLoaded', () => {
    vegetableCommunity = new VegetableCommunity();
    
    // 初期通知
    setTimeout(() => {
        vegetableCommunity.showNotification('🥕 野菜交流サイトへようこそ！', 'success');
    }, 1000);
});

// 家庭菜園ガイドのタブ機能
function showTab(tabName) {
    // すべてのタブパネルを非表示
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // すべてのタブボタンからアクティブクラスを削除
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // 選択されたタブパネルを表示
    const selectedPanel = document.getElementById(tabName);
    if (selectedPanel) {
        selectedPanel.classList.add('active');
    }
    
    // 選択されたタブボタンにアクティブクラスを追加
    const selectedButton = event.target;
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
} 