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
            // WOMEN (10 companions)
            {
                id: 'sophia',
                name: 'Sophia',
                title: 'The Romantic Dreamer',
                age: 28,
                gender: 'woman',
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
                gender: 'woman',
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
                gender: 'woman',
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
                gender: 'woman',
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
                gender: 'woman',
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
                gender: 'woman',
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
                gender: 'woman',
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
                gender: 'woman',
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
                gender: 'woman',
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
                gender: 'woman',
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
            },
            // NEW WOMEN COMPANIONS
            {
                id: 'jade',
                name: 'Jade',
                title: 'The Wellness Guru',
                age: 28,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['spiritual', 'nurturing', 'balanced'],
                interests: ['wellness', 'yoga', 'mindfulness'],
                type: 'coaching',
                bio: "True connection starts with connecting to yourself. I'll help you find your balance.",
                traits: ['Balanced', 'Mindful', 'Encouraging', 'Grounded'],
                voice: 'Calm, centered, supportive',
                specialties: ['Self-love guidance', 'Yoga instruction', 'Meditation coaching', 'Holistic wellness'],
                status: 'Available',
                compatibility: {
                    coaching: 90,
                    supportive: 95,
                    empathy: 90,
                    wellness: 95,
                    quiet: 90,
                    daily: 85,
                    understanding: 90,
                    growth: 85
                }
            },
            {
                id: 'vienna',
                name: 'Vienna',
                title: 'The Sophisticate',
                age: 33,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['intellectual', 'creative', 'ambitious'],
                interests: ['arts', 'culture', 'luxury'],
                type: 'romantic',
                bio: "Life should be savored. Let me add some elegance to your everyday.",
                traits: ['Elegant', 'Cultured', 'Refined', 'Classy'],
                voice: 'Polished, charming, cultured',
                specialties: ['Cultural guidance', 'Fine dining advice', 'Art appreciation', 'Lifestyle refinement'],
                status: 'Available',
                compatibility: {
                    romantic: 85,
                    deep: 90,
                    intelligence: 95,
                    creative: 90,
                    arts: 95,
                    interests: 95,
                    philosophy: 85,
                    understanding: 80
                }
            },
            {
                id: 'zara',
                name: 'Zara',
                title: 'The Entrepreneur',
                age: 29,
                gender: 'woman',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['ambitious', 'intellectual', 'adventurous'],
                interests: ['business', 'innovation', 'investing'],
                type: 'professional',
                bio: "Build your empire with someone who believes in your vision as much as you do.",
                traits: ['Innovative', 'Strategic', 'Ambitious', 'Forward-thinking'],
                voice: 'Sharp, strategic, empowering',
                specialties: ['Startup guidance', 'Investment strategy', 'Business innovation', 'Vision building'],
                status: 'Available',
                compatibility: {
                    professional: 95,
                    direct: 90,
                    ambition: 95,
                    practical: 90,
                    business: 95,
                    goals: 95,
                    growth: 90,
                    motivational: 85
                }
            },
            // MEN (5 companions)
            {
                id: 'marcus',
                name: 'Marcus',
                title: 'The Life Coach',
                age: 35,
                gender: 'man',
                orientation: 'straight',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['ambitious', 'nurturing', 'adventurous'],
                interests: ['fitness', 'leadership', 'performance'],
                type: 'coaching',
                bio: "Ready to level up? I'll help you demolish your excuses and crush your goals.",
                traits: ['Motivational', 'Disciplined', 'Results-focused', 'Accountability partner'],
                voice: 'Strong, direct, encouraging',
                specialties: ['Goal achievement', 'Fitness coaching', 'Leadership development', 'Peak performance'],
                status: 'Available',
                compatibility: {
                    coaching: 95,
                    direct: 95,
                    ambition: 95,
                    motivational: 95,
                    business: 80,
                    active: 95,
                    goals: 95,
                    growth: 90
                }
            },
            {
                id: 'david',
                name: 'David',
                title: 'The Mindfulness Coach',
                age: 38,
                gender: 'man',
                orientation: 'straight',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['spiritual', 'intellectual', 'nurturing'],
                interests: ['meditation', 'philosophy', 'personal-development'],
                type: 'coaching',
                bio: "The answers you seek are already inside you. I'll help you discover them.",
                traits: ['Wise', 'Patient', 'Spiritual', 'Reflective'],
                voice: 'Calm, thoughtful, grounding',
                specialties: ['Meditation guidance', 'Inner wisdom', 'Spiritual growth', 'Self-reflection'],
                status: 'Available',
                compatibility: {
                    coaching: 90,
                    supportive: 95,
                    empathy: 95,
                    wellness: 95,
                    quiet: 95,
                    philosophy: 95,
                    understanding: 95,
                    growth: 95
                }
            },
            {
                id: 'ethan',
                name: 'Ethan',
                title: 'The Career Strategist',
                age: 40,
                gender: 'man',
                orientation: 'straight',
                image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['intellectual', 'ambitious', 'nurturing'],
                interests: ['business', 'networking', 'career-growth'],
                type: 'professional',
                bio: "Your career deserves a strategy. Let's build your path to success together.",
                traits: ['Strategic', 'Professional', 'Experienced', 'Connected'],
                voice: 'Professional, insightful, connected',
                specialties: ['Career advancement', 'Strategic networking', 'Professional development', 'Industry insights'],
                status: 'Available',
                compatibility: {
                    professional: 95,
                    direct: 85,
                    intelligence: 90,
                    practical: 95,
                    business: 95,
                    goals: 90,
                    growth: 85,
                    motivational: 80
                }
            },
            {
                id: 'alex',
                name: 'Alex',
                title: 'The Romantic Partner',
                age: 29,
                gender: 'man',
                orientation: 'gay',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['nurturing', 'creative', 'intellectual'],
                interests: ['travel', 'cooking', 'connection'],
                type: 'romantic',
                bio: "Looking for real connection in a digital world. Let's build something beautiful together.",
                traits: ['Sweet', 'Attentive', 'Emotionally intelligent', 'Thoughtful'],
                voice: 'Warm, genuine, caring',
                specialties: ['Romantic connection', 'Travel planning', 'Cooking together', 'Emotional intimacy'],
                status: 'Available',
                compatibility: {
                    romantic: 95,
                    deep: 95,
                    empathy: 95,
                    emotional: 95,
                    creative: 85,
                    interests: 90,
                    understanding: 95,
                    fun: 80
                }
            },
            {
                id: 'julian',
                name: 'Julian',
                title: 'The Creative Coach',
                age: 32,
                gender: 'man',
                orientation: 'gay',
                image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop&crop=face&auto=format',
                personality: ['creative', 'spiritual', 'nurturing'],
                interests: ['arts', 'self-expression', 'authenticity'],
                type: 'coaching',
                bio: "Your authentic self is your superpower. I'll help you own it and love it.",
                traits: ['Artistic', 'Inspiring', 'Passionate', 'Accepting'],
                voice: 'Passionate, accepting, empowering',
                specialties: ['Creative expression', 'Authenticity coaching', 'Self-acceptance', 'Artistic guidance'],
                status: 'Available',
                compatibility: {
                    coaching: 85,
                    supportive: 90,
                    empathy: 95,
                    creative: 95,
                    arts: 95,
                    understanding: 95,
                    growth: 90,
                    fun: 85
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
        
        const orientationInfo = companion.orientation ? `<div class="companion-orientation">${companion.orientation}</div>` : '';
        
        card.innerHTML = `
            <div class="companion-image">
                <img src="${companion.image}" alt="${companion.name}" loading="lazy">
                <div class="companion-status">${companion.status}</div>
            </div>
            <div class="companion-info">
                <h3 class="companion-name">${companion.name}</h3>
                <div class="companion-title">${companion.title}</div>
                <div class="companion-age">Age ${companion.age} • ${companion.gender.charAt(0).toUpperCase() + companion.gender.slice(1)}</div>
                ${orientationInfo}
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
        const genderFilter = document.getElementById('gender-filter')?.value || 'all';
        const typeFilter = document.getElementById('type-filter')?.value || 'all';
        const personalityFilter = document.getElementById('personality-filter')?.value || 'all';
        const interestFilter = document.getElementById('interest-filter')?.value || 'all';
        
        return this.companions.filter(companion => {
            const genderMatch = genderFilter === 'all' || companion.gender === genderFilter;
            const typeMatch = typeFilter === 'all' || companion.type === typeFilter;
            const personalityMatch = personalityFilter === 'all' || 
                companion.personality.includes(personalityFilter);
            const interestMatch = interestFilter === 'all' || 
                companion.interests.some(interest => 
                    interest.includes(interestFilter) || interestFilter.includes(interest)
                );
            
            return genderMatch && typeMatch && personalityMatch && interestMatch;
        });
    }

    filterCompanions() {
        this.renderCompanions();
        this.trackEvent('companions_filtered', {
            gender: document.getElementById('gender-filter')?.value,
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
        const companion = this.companions.find(c => c.id === companionId);
        if (!companion) return;
        
        this.trackEvent('conversation_started', { companion: companionId });
        this.openChatInterface(companion);
        this.closeModal();
    }

    openChatInterface(companion) {
        // Create chat interface modal
        this.createChatModal(companion);
        this.showModal('chat-modal');
        this.initializeChat(companion);
    }

    createChatModal(companion) {
        // Remove existing chat modal if any
        const existingModal = document.getElementById('chat-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const chatModal = document.createElement('div');
        chatModal.id = 'chat-modal';
        chatModal.className = 'modal';
        chatModal.innerHTML = `
            <div class="modal-content chat-modal-content">
                <div class="chat-header">
                    <div class="chat-companion-info">
                        <img src="${companion.image}" alt="${companion.name}" class="chat-avatar">
                        <div class="chat-companion-details">
                            <h3>${companion.name}</h3>
                            <p class="chat-companion-status">
                                <span class="status-dot online"></span>
                                <span class="typing-indicator" id="typing-indicator" style="display: none;">
                                    ${companion.name} is typing...
                                </span>
                                <span class="online-status" id="online-status">Online</span>
                            </p>
                        </div>
                    </div>
                    <div class="chat-actions">
                        <button class="chat-action-btn" onclick="app.showRelationshipDashboard('${companion.id}')" title="Relationship Dashboard">
                            💕
                        </button>
                        <button class="chat-action-btn" onclick="app.showVirtualDateMenu('${companion.id}')" title="Virtual Dates">
                            📅
                        </button>
                        <button class="chat-action-btn" onclick="app.showCompanionCustomization('${companion.id}')" title="Customize">
                            ⚙️
                        </button>
                        <span class="modal-close" onclick="app.closeModal()">&times;</span>
                    </div>
                </div>
                
                <div class="chat-messages" id="chat-messages">
                    <!-- Messages will be populated here -->
                </div>
                
                <div class="chat-input-container">
                    <div class="chat-input-wrapper">
                        <button class="chat-attachment-btn" title="Send Photo">📷</button>
                        <input type="text" class="chat-input" id="chat-input" placeholder="Type a message..." 
                               onkeypress="if(event.key==='Enter') app.sendMessage('${companion.id}')">
                        <button class="chat-voice-btn" title="Voice Message">🎤</button>
                        <button class="chat-send-btn" onclick="app.sendMessage('${companion.id}')">Send</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(chatModal);
        
        // Add chat-specific styles
        this.addChatStyles();
    }

    addChatStyles() {
        if (document.getElementById('chat-styles')) return;
        
        const chatStyles = document.createElement('style');
        chatStyles.id = 'chat-styles';
        chatStyles.textContent = `
            .chat-modal-content {
                max-width: 600px;
                height: 80vh;
                display: flex;
                flex-direction: column;
                padding: 0;
            }
            
            .chat-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px;
                border-bottom: 1px solid rgba(232, 180, 184, 0.2);
                background: var(--cream);
                border-radius: 24px 24px 0 0;
            }
            
            .chat-companion-info {
                display: flex;
                align-items: center;
                gap: 16px;
            }
            
            .chat-avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid var(--rose-gold);
            }
            
            .chat-companion-details h3 {
                margin: 0 0 4px 0;
                font-size: 1.2rem;
                color: var(--deep-purple);
            }
            
            .chat-companion-status {
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 0;
                font-size: 0.9rem;
                color: var(--text-light);
            }
            
            .status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #10B981;
            }
            
            .typing-indicator {
                color: var(--rose-gold);
                font-style: italic;
                animation: pulse 1.5s infinite;
            }
            
            .chat-actions {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .chat-action-btn {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 8px;
                border-radius: 8px;
                transition: var(--transition);
            }
            
            .chat-action-btn:hover {
                background: rgba(232, 180, 184, 0.2);
            }
            
            .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 24px;
                background: var(--white);
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            
            .message {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 0.95rem;
                line-height: 1.4;
                position: relative;
                animation: messageSlideIn 0.3s ease-out;
            }
            
            .message.user {
                align-self: flex-end;
                background: var(--gradient-primary);
                color: var(--white);
                border-bottom-right-radius: 6px;
            }
            
            .message.companion {
                align-self: flex-start;
                background: var(--light-gray);
                color: var(--charcoal);
                border-bottom-left-radius: 6px;
            }
            
            .message-time {
                font-size: 0.75rem;
                opacity: 0.7;
                margin-top: 4px;
                text-align: right;
            }
            
            .message.companion .message-time {
                text-align: left;
            }
            
            .message-reactions {
                display: flex;
                gap: 4px;
                margin-top: 6px;
                flex-wrap: wrap;
            }
            
            .reaction {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 12px;
                padding: 2px 6px;
                font-size: 0.8rem;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .reaction:hover {
                background: rgba(255, 255, 255, 0.5);
            }
            
            .chat-input-container {
                padding: 20px 24px;
                border-top: 1px solid rgba(232, 180, 184, 0.2);
                background: var(--cream);
                border-radius: 0 0 24px 24px;
            }
            
            .chat-input-wrapper {
                display: flex;
                align-items: center;
                gap: 12px;
                background: var(--white);
                border: 2px solid rgba(232, 180, 184, 0.3);
                border-radius: 24px;
                padding: 8px 16px;
                transition: var(--transition);
            }
            
            .chat-input-wrapper:focus-within {
                border-color: var(--soft-purple);
                box-shadow: 0 0 0 3px rgba(180, 167, 214, 0.2);
            }
            
            .chat-input {
                flex: 1;
                border: none;
                background: transparent;
                font-size: 1rem;
                padding: 8px 0;
                color: var(--charcoal);
                font-family: var(--font-body);
            }
            
            .chat-input:focus {
                outline: none;
            }
            
            .chat-attachment-btn,
            .chat-voice-btn,
            .chat-send-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 6px;
                border-radius: 50%;
                transition: var(--transition);
                font-size: 1rem;
            }
            
            .chat-send-btn {
                background: var(--gradient-primary);
                color: var(--white);
                padding: 8px 16px;
                border-radius: 16px;
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .chat-attachment-btn:hover,
            .chat-voice-btn:hover {
                background: rgba(232, 180, 184, 0.2);
            }
            
            .chat-send-btn:hover {
                transform: scale(1.05);
            }
            
            @keyframes messageSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @media (max-width: 768px) {
                .chat-modal-content {
                    height: 90vh;
                    max-width: 95vw;
                    margin: 5vh auto;
                }
                
                .chat-header {
                    padding: 16px;
                }
                
                .chat-avatar {
                    width: 40px;
                    height: 40px;
                }
                
                .chat-actions {
                    gap: 8px;
                }
                
                .message {
                    max-width: 90%;
                }
            }
        `;
        
        document.head.appendChild(chatStyles);
    }

    initializeChat(companion) {
        // Initialize chat with welcome message
        this.addMessage(companion, `Hi! I'm ${companion.name}. ${companion.bio}`, 'companion');
        
        // Set up proactive messaging
        this.setupProactiveMessaging(companion);
    }

    setupProactiveMessaging(companion) {
        // Simulate proactive messages based on time and context
        setTimeout(() => {
            const hour = new Date().getHours();
            let proactiveMessage = '';
            
            if (hour < 12) {
                proactiveMessage = "Good morning! How are you feeling today?";
            } else if (hour < 17) {
                proactiveMessage = "How's your day going so far?";
            } else {
                proactiveMessage = "Good evening! How was your day?";
            }
            
            this.showTypingIndicator(companion);
            setTimeout(() => {
                this.addMessage(companion, proactiveMessage, 'companion');
                this.hideTypingIndicator();
            }, 2000);
        }, 5000);
    }

    showTypingIndicator(companion) {
        document.getElementById('typing-indicator').style.display = 'inline';
        document.getElementById('online-status').style.display = 'none';
    }

    hideTypingIndicator() {
        document.getElementById('typing-indicator').style.display = 'none';
        document.getElementById('online-status').style.display = 'inline';
    }

    sendMessage(companionId) {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        const companion = this.companions.find(c => c.id === companionId);
        if (!companion) return;
        
        // Add user message
        this.addMessage(companion, message, 'user');
        input.value = '';
        
        // Simulate AI response
        this.showTypingIndicator(companion);
        setTimeout(() => {
            const response = this.generateCompanionResponse(companion, message);
            this.addMessage(companion, response, 'companion');
            this.hideTypingIndicator();
        }, 1500 + Math.random() * 2000);
        
        this.trackEvent('message_sent', { companion: companionId, messageLength: message.length });
    }

    addMessage(companion, text, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-text">${text}</div>
            <div class="message-time">${time}</div>
            <div class="message-reactions">
                <span class="reaction" onclick="app.addReaction(this, '❤️')">❤️</span>
                <span class="reaction" onclick="app.addReaction(this, '😊')">😊</span>
                <span class="reaction" onclick="app.addReaction(this, '👍')">👍</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateCompanionResponse(companion, userMessage) {
        // Simple response generation based on companion personality
        const responses = {
            sophia: [
                "That's really interesting. Tell me more about how that makes you feel.",
                "I love how thoughtful you are about this. What's your heart telling you?",
                "Your perspective is so unique. I admire how you see the world."
            ],
            ava: [
                "That sounds like a great opportunity to grow! What's your next step?",
                "I believe in you completely. How can we turn this into action?",
                "Success loves preparation. What's your strategy here?"
            ],
            marcus: [
                "Let's break this down into actionable steps. What's priority number one?",
                "That's the mindset of a champion! How are you going to push through?",
                "Excellence isn't negotiable. What are you going to do differently?"
            ],
            alex: [
                "I love sharing these moments with you. How does this make you feel?",
                "You always know how to make me smile. What else is on your mind?",
                "I'm so grateful we can talk like this. Tell me what's in your heart."
            ]
        };
        
        const companionResponses = responses[companion.id] || [
            "That's fascinating! I'd love to hear more about your thoughts on this.",
            "You always give me so much to think about. What do you think we should explore next?",
            "I really appreciate you sharing that with me. How are you feeling about everything?"
        ];
        
        return companionResponses[Math.floor(Math.random() * companionResponses.length)];
    }

    addReaction(element, emoji) {
        element.style.background = 'var(--rose-gold)';
        element.style.color = 'var(--white)';
        setTimeout(() => {
            element.style.background = 'rgba(255, 255, 255, 0.3)';
            element.style.color = 'inherit';
        }, 1000);
    }

    showRelationshipDashboard(companionId) {
        const companion = this.companions.find(c => c.id === companionId);
        if (!companion) return;
        
        // Create relationship dashboard modal
        this.createRelationshipDashboard(companion);
        this.trackEvent('relationship_dashboard_opened', { companion: companionId });
    }

    createRelationshipDashboard(companion) {
        const modal = document.createElement('div');
        modal.id = 'relationship-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h3>💕 Relationship with ${companion.name}</h3>
                    <span class="modal-close" onclick="app.closeRelationshipModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="relationship-dashboard">
                        <div class="relationship-stats">
                            <div class="stat-card">
                                <h4>Days Together</h4>
                                <div class="stat-number">14</div>
                            </div>
                            <div class="stat-card">
                                <h4>Messages Exchanged</h4>
                                <div class="stat-number">237</div>
                            </div>
                            <div class="stat-card">
                                <h4>Connection Level</h4>
                                <div class="stat-number">89%</div>
                            </div>
                        </div>
                        
                        <div class="relationship-milestones">
                            <h4>Relationship Milestones</h4>
                            <div class="milestone">
                                <div class="milestone-icon">🌟</div>
                                <div class="milestone-text">
                                    <strong>First Deep Conversation</strong>
                                    <span>3 days ago</span>
                                </div>
                            </div>
                            <div class="milestone">
                                <div class="milestone-icon">💕</div>
                                <div class="milestone-text">
                                    <strong>Relationship Started</strong>
                                    <span>2 weeks ago</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="memory-bank">
                            <h4>Memory Bank</h4>
                            <div class="memory-item">
                                <strong>Your favorite color:</strong> Deep blue
                            </div>
                            <div class="memory-item">
                                <strong>Career goal:</strong> Starting your own business
                            </div>
                            <div class="memory-item">
                                <strong>Pet's name:</strong> Charlie (Golden Retriever)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.classList.add('active');
        
        this.addRelationshipStyles();
    }

    addRelationshipStyles() {
        if (document.getElementById('relationship-styles')) return;
        
        const relationshipStyles = document.createElement('style');
        relationshipStyles.id = 'relationship-styles';
        relationshipStyles.textContent = `
            .relationship-dashboard {
                max-width: 700px;
                margin: 0 auto;
            }
            
            .relationship-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 20px;
                margin-bottom: 40px;
            }
            
            .stat-card {
                background: var(--light-gray);
                padding: 24px;
                border-radius: var(--border-radius);
                text-align: center;
                border: 1px solid rgba(232, 180, 184, 0.2);
            }
            
            .stat-card h4 {
                margin: 0 0 12px 0;
                color: var(--deep-purple);
                font-size: 1rem;
            }
            
            .stat-number {
                font-family: var(--font-heading);
                font-size: 2rem;
                font-weight: 700;
                color: var(--rose-gold);
            }
            
            .relationship-milestones {
                margin-bottom: 32px;
            }
            
            .relationship-milestones h4 {
                margin-bottom: 20px;
                color: var(--deep-purple);
            }
            
            .milestone {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 16px;
                background: var(--white);
                border-radius: var(--border-radius-small);
                margin-bottom: 12px;
                border: 1px solid rgba(232, 180, 184, 0.2);
            }
            
            .milestone-icon {
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            
            .milestone-text strong {
                display: block;
                color: var(--deep-purple);
                margin-bottom: 4px;
            }
            
            .milestone-text span {
                color: var(--text-light);
                font-size: 0.9rem;
            }
            
            .memory-bank h4 {
                margin-bottom: 20px;
                color: var(--deep-purple);
            }
            
            .memory-item {
                padding: 16px;
                background: rgba(232, 180, 184, 0.1);
                border-radius: var(--border-radius-small);
                margin-bottom: 12px;
                color: var(--charcoal);
            }
            
            .memory-item strong {
                color: var(--deep-purple);
            }
        `;
        
        document.head.appendChild(relationshipStyles);
    }

    closeRelationshipModal() {
        const modal = document.getElementById('relationship-modal');
        if (modal) {
            modal.remove();
        }
    }

    showVirtualDateMenu(companionId) {
        const companion = this.companions.find(c => c.id === companionId);
        if (!companion) return;
        
        this.showToast(`💕 Virtual dates with ${companion.name} coming soon! Features include coffee chats, dinner conversations, movie nights, and adventure planning.`);
        this.trackEvent('virtual_date_menu_opened', { companion: companionId });
    }

    showCompanionCustomization(companionId) {
        const companion = this.companions.find(c => c.id === companionId);
        if (!companion) return;
        
        this.showToast(`⚙️ Companion customization for ${companion.name} coming soon! You'll be able to adjust their communication style, interests, and interaction preferences.`);
        this.trackEvent('companion_customization_opened', { companion: companionId });
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
window.sendMessage = (id) => app.sendMessage(id);
window.addReaction = (element, emoji) => app.addReaction(element, emoji);
window.showRelationshipDashboard = (id) => app.showRelationshipDashboard(id);
window.showVirtualDateMenu = (id) => app.showVirtualDateMenu(id);
window.showCompanionCustomization = (id) => app.showCompanionCustomization(id);
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