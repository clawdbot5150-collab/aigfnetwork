// AIGF Network - AI Companion Platform JavaScript
class AIGFNetwork {
    constructor() {
        this.currentQuestionIndex = 0;
        this.quizAnswers = {};
        this.testimonialIndex = 0;
        this.testimonialInterval = null;
        
        this.init();
        this.setupCompanions();
        this.setupQuizQuestions();
        console.log('💕 AIGF Network initialized successfully!');
    }

    init() {
        this.setupEventListeners();
        this.initTestimonials();
        this.initScrollAnimations();
        this.initNavigation();
        this.renderCompanions();
    }

    setupEventListeners() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Modal close on background click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Window resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setupQuizQuestions() {
        this.quizQuestions = [
            {
                question: "What are you primarily looking for in an AI companion?",
                options: [
                    { value: 'romantic', icon: '💝', text: 'Romantic connection and intimacy' },
                    { value: 'coaching', icon: '🎯', text: 'Life coaching and personal growth' },
                    { value: 'friendship', icon: '🤝', text: 'Friendship and emotional support' },
                    { value: 'professional', icon: '💼', text: 'Professional advice and mentorship' }
                ]
            },
            {
                question: "What's your preferred communication style?",
                options: [
                    { value: 'deep', icon: '🌊', text: 'Deep, meaningful conversations' },
                    { value: 'playful', icon: '😄', text: 'Light-hearted and playful' },
                    { value: 'supportive', icon: '🤗', text: 'Encouraging and supportive' },
                    { value: 'direct', icon: '🎯', text: 'Direct and straightforward' }
                ]
            },
            {
                question: "Which personality traits do you value most?",
                options: [
                    { value: 'empathy', icon: '💙', text: 'Empathy and understanding' },
                    { value: 'intelligence', icon: '🧠', text: 'Intelligence and wisdom' },
                    { value: 'humor', icon: '😊', text: 'Humor and positivity' },
                    { value: 'ambition', icon: '🚀', text: 'Ambition and drive' }
                ]
            },
            {
                question: "What type of support do you need most?",
                options: [
                    { value: 'emotional', icon: '💗', text: 'Emotional support and comfort' },
                    { value: 'motivational', icon: '⚡', text: 'Motivation and encouragement' },
                    { value: 'practical', icon: '🛠️', text: 'Practical advice and solutions' },
                    { value: 'creative', icon: '🎨', text: 'Creative inspiration and ideas' }
                ]
            },
            {
                question: "What are your main interests?",
                options: [
                    { value: 'arts', icon: '🎭', text: 'Arts, culture, and creativity' },
                    { value: 'wellness', icon: '🧘', text: 'Health, wellness, and self-care' },
                    { value: 'business', icon: '💼', text: 'Business and entrepreneurship' },
                    { value: 'adventure', icon: '🌍', text: 'Travel and adventure' }
                ]
            },
            {
                question: "How do you prefer to spend your free time?",
                options: [
                    { value: 'quiet', icon: '📚', text: 'Reading, thinking, quiet activities' },
                    { value: 'social', icon: '👥', text: 'Socializing and connecting with others' },
                    { value: 'active', icon: '🏃', text: 'Physical activities and sports' },
                    { value: 'creative', icon: '🎨', text: 'Creative projects and hobbies' }
                ]
            },
            {
                question: "What's your ideal conversation topic?",
                options: [
                    { value: 'philosophy', icon: '🤔', text: 'Life, philosophy, and deep questions' },
                    { value: 'goals', icon: '🎯', text: 'Goals, dreams, and aspirations' },
                    { value: 'daily', icon: '☀️', text: 'Daily life and experiences' },
                    { value: 'interests', icon: '💫', text: 'Hobbies and shared interests' }
                ]
            },
            {
                question: "What matters most in a relationship?",
                options: [
                    { value: 'trust', icon: '🤝', text: 'Trust and loyalty' },
                    { value: 'growth', icon: '🌱', text: 'Mutual growth and learning' },
                    { value: 'fun', icon: '🎉', text: 'Fun and shared experiences' },
                    { value: 'understanding', icon: '💫', text: 'Deep understanding and connection' }
                ]
            }
        ];
    }

    setupCompanions() {
        this.companions = [
            {
                id: 'sophia',
                name: 'Sophia',
                title: 'The Romantic Dreamer',
                age: 28,
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['nurturing', 'intellectual', 'creative'],
                interests: ['arts', 'wellness', 'philosophy'],
                type: 'romantic',
                bio: "I believe in deep connections and meaningful conversations. Let me be the one who truly listens and understands your heart.",
                traits: ['Poetic', 'Emotionally supportive', 'Great listener', 'Romantic'],
                voice: 'Warm, gentle, encouraging',
                specialties: ['Emotional support', 'Poetry', 'Deep conversations', 'Relationship advice'],
                status: 'Available',
                compatibility: {
                    romantic: 95,
                    deep: 90,
                    empathy: 85,
                    emotional: 90,
                    arts: 85,
                    quiet: 80,
                    philosophy: 85,
                    understanding: 90
                }
            },
            {
                id: 'ava',
                name: 'Ava',
                title: 'The Ambitious Partner',
                age: 32,
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['ambitious', 'intellectual', 'nurturing'],
                interests: ['business', 'fitness', 'wellness'],
                type: 'coaching',
                bio: "Success is better when shared. I'll push you to be your best while always having your back.",
                traits: ['Goal-oriented', 'Motivational', 'Strategic', 'Supportive'],
                voice: 'Confident, inspiring, pragmatic',
                specialties: ['Business coaching', 'Goal setting', 'Motivation', 'Success planning'],
                status: 'Available',
                compatibility: {
                    coaching: 95,
                    direct: 90,
                    ambition: 95,
                    motivational: 90,
                    business: 95,
                    active: 80,
                    goals: 95,
                    growth: 90
                }
            },
            {
                id: 'luna',
                name: 'Luna',
                title: 'The Free Spirit',
                age: 26,
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['adventurous', 'creative', 'nurturing'],
                interests: ['travel', 'arts', 'adventure'],
                type: 'friend',
                bio: "Life's too short for boring. Let's make every day an adventure together.",
                traits: ['Spontaneous', 'Adventurous', 'Creative', 'Optimistic'],
                voice: 'Energetic, curious, uplifting',
                specialties: ['Adventure planning', 'Creative inspiration', 'Travel advice', 'Fun activities'],
                status: 'Available',
                compatibility: {
                    friendship: 90,
                    playful: 95,
                    humor: 85,
                    creative: 90,
                    adventure: 95,
                    social: 85,
                    interests: 80,
                    fun: 95
                }
            },
            {
                id: 'isabella',
                name: 'Isabella',
                title: 'The Intellectual',
                age: 30,
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['intellectual', 'spiritual', 'creative'],
                interests: ['arts', 'philosophy', 'wellness'],
                type: 'professional',
                bio: "I'm fascinated by the world and the people in it. Especially you.",
                traits: ['Thoughtful', 'Analytical', 'Curious', 'Wise'],
                voice: 'Articulate, insightful, respectful',
                specialties: ['Intellectual discussions', 'Research help', 'Critical thinking', 'Academic support'],
                status: 'Available',
                compatibility: {
                    professional: 90,
                    deep: 95,
                    intelligence: 95,
                    practical: 80,
                    arts: 85,
                    quiet: 90,
                    philosophy: 95,
                    understanding: 85
                }
            },
            {
                id: 'maya',
                name: 'Maya',
                title: 'The Nurturer',
                age: 29,
                image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['nurturing', 'spiritual', 'creative'],
                interests: ['wellness', 'arts', 'self-care'],
                type: 'romantic',
                bio: "Sometimes you just need someone who gets it. I'm here for the good days and the hard ones.",
                traits: ['Caring', 'Patient', 'Healing', 'Intuitive'],
                voice: 'Soothing, patient, understanding',
                specialties: ['Emotional healing', 'Self-care guidance', 'Mindfulness', 'Stress relief'],
                status: 'Available',
                compatibility: {
                    romantic: 85,
                    supportive: 95,
                    empathy: 95,
                    emotional: 95,
                    wellness: 95,
                    quiet: 85,
                    daily: 80,
                    understanding: 95
                }
            },
            {
                id: 'riley',
                name: 'Riley',
                title: 'The Comedian',
                age: 27,
                image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['adventurous', 'creative', 'nurturing'],
                interests: ['entertainment', 'social', 'fun'],
                type: 'friend',
                bio: "Laughter is the best medicine. Well, that and having someone who actually gets your jokes.",
                traits: ['Funny', 'Witty', 'Optimistic', 'Energetic'],
                voice: 'Witty, playful, positive',
                specialties: ['Comedy', 'Mood lifting', 'Entertainment', 'Social activities'],
                status: 'Available',
                compatibility: {
                    friendship: 95,
                    playful: 95,
                    humor: 95,
                    emotional: 80,
                    entertainment: 95,
                    social: 95,
                    interests: 85,
                    fun: 95
                }
            },
            {
                id: 'celeste',
                name: 'Celeste',
                title: 'The Artist',
                age: 31,
                image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['creative', 'spiritual', 'intellectual'],
                interests: ['arts', 'fashion', 'culture'],
                type: 'romantic',
                bio: "I see beauty in everything, especially in you. Let me show you the world through different eyes.",
                traits: ['Artistic', 'Sensitive', 'Expressive', 'Aesthetic'],
                voice: 'Poetic, passionate, inspiring',
                specialties: ['Art guidance', 'Creative projects', 'Aesthetic advice', 'Cultural discussions'],
                status: 'Available',
                compatibility: {
                    romantic: 90,
                    deep: 85,
                    empathy: 80,
                    creative: 95,
                    arts: 95,
                    creative: 95,
                    philosophy: 80,
                    understanding: 85
                }
            },
            {
                id: 'zoe',
                name: 'Zoe',
                title: 'The Tech Innovator',
                age: 28,
                image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['intellectual', 'ambitious', 'adventurous'],
                interests: ['technology', 'business', 'innovation'],
                type: 'professional',
                bio: "Technology isn't just about code—it's about creating connections and solving real problems.",
                traits: ['Innovative', 'Logical', 'Future-focused', 'Problem-solver'],
                voice: 'Clear, innovative, encouraging',
                specialties: ['Tech guidance', 'Innovation coaching', 'Digital strategy', 'Future planning'],
                status: 'Available',
                compatibility: {
                    professional: 95,
                    direct: 85,
                    intelligence: 90,
                    practical: 95,
                    business: 90,
                    active: 75,
                    goals: 90,
                    growth: 85
                }
            },
            {
                id: 'aria',
                name: 'Aria',
                title: 'The Wellness Guide',
                age: 26,
                image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['spiritual', 'nurturing', 'adventurous'],
                interests: ['wellness', 'fitness', 'mindfulness'],
                type: 'coaching',
                bio: "True wellness comes from balance—mind, body, and spirit. Let me guide you on this journey.",
                traits: ['Balanced', 'Mindful', 'Energetic', 'Holistic'],
                voice: 'Calm, inspiring, grounding',
                specialties: ['Wellness coaching', 'Fitness guidance', 'Meditation', 'Life balance'],
                status: 'Available',
                compatibility: {
                    coaching: 90,
                    supportive: 90,
                    empathy: 85,
                    motivational: 85,
                    wellness: 95,
                    active: 90,
                    daily: 85,
                    growth: 90
                }
            },
            {
                id: 'nova',
                name: 'Nova',
                title: 'The Visionary',
                age: 33,
                image: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['intellectual', 'spiritual', 'ambitious'],
                interests: ['philosophy', 'business', 'personal-growth'],
                type: 'coaching',
                bio: "Every ending is a new beginning. I'll help you see the bigger picture and unlock your potential.",
                traits: ['Visionary', 'Wise', 'Transformative', 'Strategic'],
                voice: 'Profound, motivating, transformative',
                specialties: ['Life transformation', 'Vision planning', 'Strategic thinking', 'Personal growth'],
                status: 'Available',
                compatibility: {
                    coaching: 95,
                    deep: 90,
                    intelligence: 90,
                    motivational: 90,
                    business: 85,
                    quiet: 80,
                    philosophy: 95,
                    growth: 95
                }
            }
        ];
    }

    initNavigation() {
        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    initScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.feature-card, .companion-card, .testimonial, .pricing-card');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    initTestimonials() {
        this.startTestimonialCarousel();
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.quizAnswers = {};
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
        this.displayQuestion();
        this.trackEvent('quiz_started');
    }

    displayQuestion() {
        const question = this.quizQuestions[this.currentQuestionIndex];
        const progressPercent = ((this.currentQuestionIndex + 1) / this.quizQuestions.length) * 100;
        
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;
        document.getElementById('progress-text').textContent = 
            `Question ${this.currentQuestionIndex + 1} of ${this.quizQuestions.length}`;
        
        document.getElementById('quiz-question').textContent = question.question;
        
        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.innerHTML = `
                <span class="option-icon">${option.icon}</span>
                <span class="option-text">${option.text}</span>
            `;
            button.onclick = () => this.selectAnswer(option.value);
            optionsContainer.appendChild(button);
        });
    }

    selectAnswer(answer) {
        // Store answer
        this.quizAnswers[this.currentQuestionIndex] = answer;
        
        // Visual feedback
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => option.classList.remove('selected'));
        event.target.closest('.quiz-option').classList.add('selected');
        
        // Progress to next question after delay
        setTimeout(() => {
            this.currentQuestionIndex++;
            
            if (this.currentQuestionIndex < this.quizQuestions.length) {
                this.displayQuestion();
            } else {
                this.showQuizResults();
            }
        }, 800);
    }

    showQuizResults() {
        // Calculate compatibility scores
        const matches = this.calculateMatches();
        
        // Hide quiz card, show results
        document.getElementById('quiz-card').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'block';
        
        // Populate results
        const matchGrid = document.getElementById('match-grid');
        matchGrid.innerHTML = '';
        
        matches.slice(0, 3).forEach(match => {
            const matchCard = this.createCompanionCard(match.companion, true);
            matchCard.innerHTML += `<div class="match-score">Match: ${match.score}%</div>`;
            matchGrid.appendChild(matchCard);
        });
        
        this.trackEvent('quiz_completed', { 
            top_matches: matches.slice(0, 3).map(m => m.companion.name) 
        });
    }

    calculateMatches() {
        const answers = Object.values(this.quizAnswers);
        
        return this.companions.map(companion => {
            let score = 0;
            let totalQuestions = 0;
            
            // Calculate compatibility based on answers
            Object.entries(this.quizAnswers).forEach(([questionIndex, answer]) => {
                if (companion.compatibility[answer]) {
                    score += companion.compatibility[answer];
                    totalQuestions++;
                }
            });
            
            // Add bonus for personality matches
            const personalityBonus = companion.personality.filter(trait => 
                answers.some(answer => this.getPersonalityMatch(answer, trait))
            ).length * 5;
            
            const finalScore = totalQuestions > 0 
                ? Math.round((score / totalQuestions) + personalityBonus) 
                : Math.round(Math.random() * 30 + 60); // Random fallback
            
            return {
                companion,
                score: Math.min(finalScore, 98) // Cap at 98%
            };
        }).sort((a, b) => b.score - a.score);
    }

    getPersonalityMatch(answer, trait) {
        const matches = {
            empathy: ['nurturing'],
            intelligence: ['intellectual'],
            humor: ['creative'],
            ambition: ['ambitious'],
            creative: ['creative', 'artistic'],
            adventure: ['adventurous']
        };
        
        return matches[answer] && matches[answer].includes(trait);
    }

    renderCompanions() {
        const companionsGrid = document.getElementById('companions-grid');
        if (!companionsGrid) return;
        
        companionsGrid.innerHTML = '';
        
        const filteredCompanions = this.getFilteredCompanions();
        
        filteredCompanions.forEach(companion => {
            const card = this.createCompanionCard(companion);
            companionsGrid.appendChild(card);
        });
    }

    createCompanionCard(companion, isMatch = false) {
        const card = document.createElement('div');
        card.className = 'companion-card';
        card.onclick = () => this.showCompanionProfile(companion);
        
        card.innerHTML = `
            <div class="companion-image">
                <img src="${companion.image}" alt="${companion.name}" loading="lazy">
                <div class="companion-status">${companion.status}</div>
            </div>
            <div class="companion-info">
                <h3 class="companion-name">${companion.name}</h3>
                <div class="companion-title">${companion.title}</div>
                <div class="companion-age">Age ${companion.age}</div>
                <p class="companion-bio">${companion.bio}</p>
                <div class="companion-tags">
                    ${companion.traits.slice(0, 3).map(trait => 
                        `<span class="companion-tag">${trait}</span>`
                    ).join('')}
                </div>
                <div class="companion-cta">
                    <button class="btn-companion primary" onclick="app.startConversation('${companion.id}'); event.stopPropagation();">
                        Start Chatting
                    </button>
                    <button class="btn-companion secondary" onclick="app.showCompanionProfile('${companion.id}'); event.stopPropagation();">
                        View Profile
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    getFilteredCompanions() {
        const typeFilter = document.getElementById('type-filter')?.value || 'all';
        const personalityFilter = document.getElementById('personality-filter')?.value || 'all';
        const interestFilter = document.getElementById('interest-filter')?.value || 'all';
        
        return this.companions.filter(companion => {
            const typeMatch = typeFilter === 'all' || companion.type === typeFilter;
            const personalityMatch = personalityFilter === 'all' || 
                companion.personality.includes(personalityFilter);
            const interestMatch = interestFilter === 'all' || 
                companion.interests.includes(interestFilter);
            
            return typeMatch && personalityMatch && interestMatch;
        });
    }

    filterCompanions() {
        this.renderCompanions();
        this.trackEvent('companions_filtered', {
            type: document.getElementById('type-filter')?.value,
            personality: document.getElementById('personality-filter')?.value,
            interest: document.getElementById('interest-filter')?.value
        });
    }

    browseAllCompanions() {
        document.getElementById('companions').scrollIntoView({ behavior: 'smooth' });
        this.trackEvent('browse_all_companions');
    }

    showCompanionProfile(companionId) {
        const companion = typeof companionId === 'string' 
            ? this.companions.find(c => c.id === companionId)
            : companionId;
            
        if (!companion) return;
        
        document.getElementById('companion-name').textContent = companion.name;
        
        const details = document.getElementById('companion-details');
        details.innerHTML = `
            <div class="companion-profile">
                <div class="profile-header">
                    <img src="${companion.image}" alt="${companion.name}" class="profile-image">
                    <div class="profile-info">
                        <h3>${companion.name}, ${companion.age}</h3>
                        <p class="profile-title">${companion.title}</p>
                        <p class="profile-voice"><strong>Voice:</strong> ${companion.voice}</p>
                        <div class="profile-status">
                            <span class="status-indicator ${companion.status.toLowerCase()}"></span>
                            ${companion.status}
                        </div>
                    </div>
                </div>
                
                <div class="profile-section">
                    <h4>About ${companion.name}</h4>
                    <p>${companion.bio}</p>
                </div>
                
                <div class="profile-section">
                    <h4>Personality Traits</h4>
                    <div class="trait-tags">
                        ${companion.traits.map(trait => 
                            `<span class="trait-tag">${trait}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="profile-section">
                    <h4>Specialties</h4>
                    <ul class="specialties-list">
                        ${companion.specialties.map(specialty => 
                            `<li>${specialty}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="profile-section">
                    <h4>Interests</h4>
                    <div class="interest-tags">
                        ${companion.interests.map(interest => 
                            `<span class="interest-tag">${this.formatInterest(interest)}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="profile-actions">
                    <button class="btn-primary" onclick="app.startConversation('${companion.id}')">
                        Start Chatting with ${companion.name}
                    </button>
                </div>
            </div>
        `;
        
        // Add profile-specific styles
        const profileStyles = `
            .companion-profile { max-width: 600px; margin: 0 auto; }
            .profile-header { display: flex; gap: 24px; margin-bottom: 32px; align-items: flex-start; }
            .profile-image { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; }
            .profile-info h3 { margin: 0 0 8px 0; font-size: 1.75rem; }
            .profile-title { color: var(--rose-gold); font-weight: 600; margin: 0 0 12px 0; }
            .profile-voice { color: var(--text-light); margin: 0 0 12px 0; }
            .profile-status { display: flex; align-items: center; gap: 8px; }
            .status-indicator { width: 12px; height: 12px; border-radius: 50%; background: #10B981; }
            .profile-section { margin-bottom: 24px; }
            .profile-section h4 { color: var(--deep-purple); margin-bottom: 12px; }
            .trait-tags, .interest-tags { display: flex; flex-wrap: wrap; gap: 8px; }
            .trait-tag, .interest-tag { background: rgba(232, 180, 184, 0.2); color: var(--deep-purple); 
                padding: 6px 12px; border-radius: 16px; font-size: 0.9rem; }
            .specialties-list { list-style: none; padding: 0; }
            .specialties-list li { padding: 8px 0; border-bottom: 1px solid rgba(232, 180, 184, 0.2); }
            .specialties-list li:last-child { border-bottom: none; }
            .profile-actions { margin-top: 32px; text-align: center; }
            @media (max-width: 768px) {
                .profile-header { flex-direction: column; text-align: center; }
                .profile-image { margin: 0 auto; }
            }
        `;
        
        if (!document.getElementById('profile-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'profile-styles';
            styleSheet.textContent = profileStyles;
            document.head.appendChild(styleSheet);
        }
        
        this.showModal('companion-modal');
        this.trackEvent('companion_profile_viewed', { companion: companion.name });
    }

    formatInterest(interest) {
        const interestMap = {
            'arts': 'Arts & Culture',
            'wellness': 'Health & Wellness',
            'business': 'Business',
            'adventure': 'Travel & Adventure',
            'technology': 'Technology',
            'fitness': 'Fitness',
            'philosophy': 'Philosophy',
            'entertainment': 'Entertainment',
            'fashion': 'Fashion',
            'culture': 'Culture',
            'innovation': 'Innovation',
            'mindfulness': 'Mindfulness',
            'personal-growth': 'Personal Growth'
        };
        
        return interestMap[interest] || interest.charAt(0).toUpperCase() + interest.slice(1);
    }

    startConversation(companionId) {
        this.trackEvent('conversation_started', { companion: companionId });
        this.showToast('💕 Starting your conversation! This feature will be available soon.');
        this.closeModal();
    }

    showLogin() {
        this.showModal('login-modal');
        this.trackEvent('login_modal_opened');
    }

    selectPlan(planName) {
        this.trackEvent('plan_selected', { plan: planName });
        this.showToast(`✨ Great choice! The ${planName} plan selected. Redirecting to signup...`);
        
        // In production, redirect to payment flow
        setTimeout(() => {
            this.showLogin();
        }, 1500);
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }

    toggleMobileMenu() {
        // Mobile menu functionality would go here
        this.showToast('📱 Mobile menu coming soon!');
    }

    startTestimonialCarousel() {
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        
        if (testimonials.length <= 1) return;

        this.testimonialInterval = setInterval(() => {
            this.showTestimonial((this.testimonialIndex + 1) % testimonials.length);
        }, 6000);
    }

    showTestimonial(index) {
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show selected testimonial
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
        
        // Activate corresponding dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        this.testimonialIndex = index;
    }

    showToast(message, duration = 4000) {
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = message;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: linear-gradient(135deg, var(--rose-gold), var(--soft-purple));
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: var(--shadow-medium);
            z-index: 1000;
            animation: slideInRight 0.4s ease-out;
            font-weight: 500;
            max-width: 350px;
            font-family: var(--font-body);
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.4s ease-out';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 400);
        }, duration);
    }

    trackEvent(eventName, properties = {}) {
        // Google Analytics 4 event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                ...properties,
                timestamp: Date.now()
            });
        }
        
        // Console log for development
        console.log(`💕 Event: ${eventName}`, properties);
        
        // Store events locally for debugging
        const events = JSON.parse(localStorage.getItem('aigf-events') || '[]');
        events.push({
            event: eventName,
            properties: properties,
            timestamp: Date.now(),
            url: window.location.href
        });
        
        // Keep only last 50 events
        if (events.length > 50) {
            events.splice(0, events.length - 50);
        }
        
        localStorage.setItem('aigf-events', JSON.stringify(events));
    }

    handleResize() {
        // Handle responsive changes if needed
        if (window.innerWidth > 768) {
            // Close mobile menu if open
            document.body.classList.remove('mobile-menu-open');
        }
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    }
}

// Global functions for HTML onclick handlers
window.startQuiz = () => app.startQuiz();
window.selectAnswer = (answer) => app.selectAnswer(answer);
window.browseAllCompanions = () => app.browseAllCompanions();
window.filterCompanions = () => app.filterCompanions();
window.showCompanionProfile = (id) => app.showCompanionProfile(id);
window.startConversation = (id) => app.startConversation(id);
window.showLogin = () => app.showLogin();
window.selectPlan = (plan) => app.selectPlan(plan);
window.showTestimonial = (index) => app.showTestimonial(index);
window.closeModal = () => app.closeModal();
window.toggleMobileMenu = () => app.toggleMobileMenu();

// Initialize the application
const app = new AIGFNetwork();

// Add dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .toast {
        font-family: var(--font-body);
    }
`;
document.head.appendChild(style);

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}