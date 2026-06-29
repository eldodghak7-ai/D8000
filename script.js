
/**
 * D8000 BRAND ARCHIVE SYSTEM - CORE PRODUCTION ENGINE
 * ARCHITECT & OWNER: ENG / MOHAMED MAGDY (ELDODG)
 * VERSION: 2.6.0 (ULTIMATE COMPATIBILITY & PERFORMANCE)
 */

const BRAND_ENGINE = {
    basePrice: 550,
    shippingCost: 0,
    selectedColor: "",
    selectedSize: "",
    logisticsMatrix: {
        "Cairo": 75, "Giza": 75, "Alexandria": 80, "Qalyubia": 80, "Sharqia": 80, 
        "Gharbia": 80, "Dakahlia": 80, "Monufia": 80, "Beheira": 80, "Suez": 80, 
        "Ismailia": 80, "Port Said": 80, "Fayoum": 100, "Beni Suef": 100, "Minya": 100, 
        "Assiut": 100, "Sohag": 100, "Qena": 100, "Luxor": 100, "Aswan": 100, 
        "New Valley": 140, "Red Sea": 140, "Marsa Matrouh": 140
    }
};

let globalSelectedColor = "";

// ==========================================
// 1. إدارة محرك الفيديو والتوافق الكلي مع الموبايل والـ iOS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('introVideo');
    if (video) {
        // إعداد الخصائص برمجياً لتأمين القفل الصارم في المتصفحات
        video.muted = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.loop = true;
        video.currentTime = 0;
        
        // محاولة التشغيل الفوري بأكثر من طريقة
        const forcePlayVideo = () => {
            let playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("D8000 Intro Video Loaded & Playing Successfully.");
                }).catch(error => {
                    console.log("Autoplay blocked. Initializing user interaction backup listener.");
                    document.addEventListener('touchstart', () => { video.play(); }, { once: true });
                    document.addEventListener('click', () => { video.play(); }, { once: true });
                });
            }
        };

        // التنفيذ بعد 100ms لضمان استقرار الـ DOM
        setTimeout(forcePlayVideo, 100);
    }

    // تهيئة الـ Form لمنع أي سلوك افتراضي مزعج أثناء الضغط على الإدخال
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', executeCheckout);
    }

    // ربط لينكات المطور وتوجيهه للواتساب الشخصي
    const devLink = document.querySelector('.dev-link');
    if (devLink) {
        const personalMsg = "اطلب موقعك الان";
        devLink.setAttribute('href', `https://wa.me/201096141190?text=${encodeURIComponent(personalMsg)}`);
        devLink.setAttribute('target', '_blank');
    }

    // 🚀 محرك إظهار وإخفاء زرار الشراء العائم للموبايل مع السكرول (معدل للتوافق المطلق)
    const stickyBtn = document.getElementById('stickyMobileBtn');
    if (stickyBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                stickyBtn.classList.add('show');
                document.body.classList.add('has-sticky-btn'); // تفعيل مساحة الأمان تحت في الـ body بالتبعية
                
                const products = document.querySelectorAll('.clean-product-card');
                if (products.length > 0) {
                    let currentProduct = products[0]; 
                    
                    products.forEach(prod => {
                        const rect = prod.getBoundingClientRect();
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            currentProduct = prod;
                        }
                    });

                    const btnAction = currentProduct.querySelector('.card-action-button');
                    if (btnAction) {
                        stickyBtn.setAttribute('onclick', btnAction.getAttribute('onclick'));
                    }
                }
            } else {
                stickyBtn.classList.remove('show');
                document.body.classList.remove('has-sticky-btn'); // إلغاء مساحة الأمان عند اختفاء الزرار
            }
        });
    }

    // 🔄 محرك الحركة التلقائية الانسيابي لقسم الـ Reviews (تحديث مطور بالتزامن المطلق لمنع الاختفاء والجمود)
    const initializeReviewsAutoplay = () => {
        const reviewsTrack = document.getElementById('dynamicReviewsGrid') || document.querySelector('.reviews-grid-scrollable');
        if (!reviewsTrack) return;

        let scrollSpeed = 1; 
        let autoScrollInterval;

        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                const maxScroll = reviewsTrack.scrollWidth - reviewsTrack.clientWidth;
                
                // حل برمي ذكي للتعامل مع متصفحات الموبايل والـ iOS في بيئة الـ RTL
                if (Math.abs(reviewsTrack.scrollLeft) >= maxScroll - 1) {
                    reviewsTrack.scrollLeft = 0;
                } else {
                    if (reviewsTrack.scrollLeft <= 0) {
                        reviewsTrack.scrollLeft -= scrollSpeed;
                    } else {
                        reviewsTrack.scrollLeft += scrollSpeed;
                    }
                }
            }, 30); 
        };

        const stopAutoScroll = () => clearInterval(autoScrollInterval);

        // تشغيل المحرك فورا بعد التأكد تماماً من حقن البيانات
        startAutoScroll();

        // إيقاف مؤقت عند تفاعل العميل لضمان تجربة مستخدم مريحة وقراءة الريفيوهات
        reviewsTrack.addEventListener('mouseenter', stopAutoScroll);
        reviewsTrack.addEventListener('mouseleave', startAutoScroll);
        reviewsTrack.addEventListener('touchstart', stopAutoScroll, { passive: true });
        reviewsTrack.addEventListener('touchend', startAutoScroll, { passive: true });
    };

    // تأمين مزدوج: لو الـ Reviews جاهزة شغل المحرك فورا، لو لسه استنى الـ Event الخاص بالحقن
    if (document.getElementById('dynamicReviewsGrid') && document.getElementById('dynamicReviewsGrid').children.length > 0) {
        initializeReviewsAutoplay();
    } else {
        document.addEventListener('reviewsEngineReady', initializeReviewsAutoplay);
    }
});

// دالة إغلاق الإنترو والانتقال للموقع
function closeIntro() {
    const intro = document.getElementById('introOverlay');
    const video = document.getElementById('introVideo');
    
    if (intro) {
        intro.classList.add('fade-out');
        setTimeout(() => {
            if (video) video.pause();
            intro.style.display = 'none';
        }, 600);
    }
}

// ==========================================
// 2. محرك السلايدر المتطور وحساب النقاط (Dots Tracker)
// ==========================================
function updateDots(track, cardIndex) {
    if (!track) return;
    
    const scrollLeft = Math.abs(track.scrollLeft); 
    const width = track.clientWidth;
    const activeIndex = Math.round(scrollLeft / width);
    
    const cards = document.querySelectorAll('.clean-product-card');
    const currentCard = cards[cardIndex];
    
    if (currentCard) {
        const dots = currentCard.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            if (idx === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

function moveSlider(button, direction) {
    const container = button.closest('.product-slider-container');
    if (!container) return;
    
    const track = container.querySelector('.product-image-track');
    if (!track) return;
    
    const slideWidth = track.clientWidth;
    track.scrollBy({
        left: direction * slideWidth * -1,
        behavior: 'smooth'
    });
}

// ==========================================
// 3. إدارة النافذة المنبثقة للطلب (Checkout Modal Ecosystem)
// ==========================================
function openPurchaseModal(productName, productImgSrc) {
    globalSelectedColor = productName;
    
    const sizeInput = document.getElementById('custSize');
    if (sizeInput) sizeInput.value = "";
    
    document.querySelectorAll('.checkout-modal-window .size-circle-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const modalImg = document.getElementById('modalProductImg');
    if (modalImg && productImgSrc) {
        modalImg.src = productImgSrc;
    }

    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
    
    updateInvoiceManifestLocal();
}

function closePurchaseModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    }
}

function selectSizeCircle(sizeValue) {
    const sizeInput = document.getElementById('custSize');
    if (sizeInput) sizeInput.value = sizeValue;
    
    document.querySelectorAll('.checkout-modal-window .size-circle-btn').forEach(btn => {
        if (btn.innerText.trim() === sizeValue.toString().trim()) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    updateInvoiceManifestLocal();
}

// ==========================================
// 4. المحرك المالي الديناميكي وحساب الفاتورة الحية
// ==========================================
function updateInvoiceManifestLocal() {
    const sizeInput = document.getElementById('custSize');
    const sizeVal = (sizeInput && sizeInput.value) ? sizeInput.value : "لم يتم اختيار المقاس";
    const govSelect = document.getElementById('custGovernorate');
    
    let shippingCost = 0;
    if (govSelect && govSelect.value) {
        shippingCost = BRAND_ENGINE.logisticsMatrix[govSelect.value.trim()] || 0;
    }

    const shippingDisplay = document.getElementById('shippingPriceDisplay');
    const totalDisplay = document.getElementById('aggregateTotalDisplay');
    const manifest = document.getElementById('invoiceManifest');
    
    const grandTotal = BRAND_ENGINE.basePrice + shippingCost;

    if (shippingDisplay) shippingDisplay.innerText = shippingCost + " EGP";
    if (totalDisplay) totalDisplay.innerText = grandTotal + " EGP";
    if (manifest) manifest.innerText = `${globalSelectedColor} (${sizeVal})`;
}

// ==========================================
// 5. بوابة التنفيذ وإرسال الطلب الاحترافي للواتساب
// ==========================================
function executeCheckout(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    
    const sizeInput = document.getElementById('custSize');
    const size = sizeInput ? sizeInput.value : "";
    
    if (!size) { 
        alert('برجاء اختيار المقاس المناسب لك أولاً (M, L, XL, 2XL)'); 
        return; 
    }

    const nameNode = document.getElementById('custName');
    const phoneNode = document.getElementById('custPhone');
    const govSelect = document.getElementById('custGovernorate');
    const addrNode = document.getElementById('custAddress');

    const name = nameNode ? nameNode.value.trim() : "";
    const phone = phoneNode ? phoneNode.value.trim() : "";
    const addr = addrNode ? addrNode.value.trim() : "";

    if (!name || !phone || !govSelect || !govSelect.value || !addr) {
        alert('برجاء ملء جميع البيانات الإجبارية لشحن المنتج إليك.');
        return;
    }

    if (phone.length < 11) {
        alert('برجاء إدخال رقم موبايل صحيح مكون من 11 رقم.');
        return;
    }

    const selectedTextAr = govSelect.options[govSelect.selectedIndex].text.trim();
    const shippingCost = BRAND_ENGINE.logisticsMatrix[govSelect.value.trim()] || 0;
    const grandTotal = BRAND_ENGINE.basePrice + shippingCost;

    const msg = `*NEW ARCHIVE ORDER — D8000*\n` +
                `----------------------------------\n` +
                `• *الاسم:* ${name}\n` +
                `• *الموبايل:* ${phone}\n` +
                `• *المحافظة:* ${selectedTextAr}\n` +
                `• *العنوان:* ${addr}\n\n` +
                `*تفاصيل القطعة / GARMENT:*\n` +
                `• *المنتج:* Oversized T-Shirt\n` +
                `• *اللون المختـار:* ${globalSelectedColor}\n` +
                `• *المقـاس:* ${size}\n\n` +
                `*تفاصيل الحساب الفوري:*\n` +
                `• *سعر القطعة:* ${BRAND_ENGINE.basePrice} EGP\n` +
                `• *مصاريف الشحن:* ${shippingCost} EGP\n` +
                `• *الإجمالي الكلي:* ${grandTotal} EGP\n` +
                `----------------------------------\n` +
                `_تم إنشاء الطلب تلقائياً عبر منصة D8000 ARCHIVE_`;
    
    const whatsappUrl = `https://wa.me/201271458000?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
}
