/**
 * D8000 VERIFIED REVIEWS ARCHIVE - FULL PRODUCTION
 * OWNER: ENG / MOHAMED MAGDY (ELDODG)
 */

const D8000_REVIEWS = Object.freeze([
    { name: "كريم ممدوح", avatar: "كـ", text: "التيشيرت الماتيريال بتاعته حكاية، الـ Heavyweight مدياله ثقل وفخامة مش طبيعية، والـ Drop shoulder مظبوط بالملي زي البراندات العالمية." },
    { name: "يوسف الديب", avatar: "يـ", text: "أكتر حاجة كانت بتبوظ مني الياقة بتوسع بعد الغسيل، بس هنا الـ Ribbed collar تقيل وماسك نفسه وبيرجع زي الأول بعد كذا غسلة. شابوه بجد." },
    { name: "أحمد منصور", avatar: "أـ", text: "التوصيل كان سريع جداً لـ حد البيت، والـ Packaging فخم يفتح النفس كأنك شاري حتة أوريجينال تقيلة من برة." },
    { name: "عبد الرحمن حامد", avatar: "عـ", text: "التقفيل والسجاف من جوه نضيف أوي مفيش فتلة طالعة، والقطن ناعم ومبيحررش خالص بالرغم من إنه تقيل و320 GSM." },
    { name: "مصطفى خالد", avatar: "مـ", text: "جربت البني والأسود والاتنين أحلى من بعض، ألوانهم ثابتة مبهتتش خالص مع الغسيل والـ Fit اكنه متفصل عليا." },
    { name: "عمر الشريف", avatar: "عـ", text: "خدمة العملاء على الواتساب محترمين جداً، ساعدوني اختار المقاس المناسب لوزني وطولي وطلع مظبوط بالظبط زي ما قالوا." },
    { name: "خالد وليد", avatar: "خـ", text: "الستايل الأوفرسايز بتاعه مش واسع بعباطة، لاء منسق وهيكلي وشكله شيك جداً في اللبس مع الجينز أو السويت بانتس." },
    { name: "سامح عبد العزيز", avatar: "سـ", text: "سعر التيشيرت مقارنة بالجودة دي لقطة بصراحة، براندات تانية بتبيعه بضعف السعر ومبيطلعش بنفس الخامات دي." },
    { name: "هاني سلامة", avatar: "هـ", text: "فتحت الشحنة وعاينت التيشيرت والريت العالي قبل ما ادفع للمندوب، المصداقية دي لوحدها تخليك تشتري وإنت مغمض عينك." },
    { name: "زياد طارق", avatar: "زـ", text: "الـ White عندهم ناصع البياض وتقيل مش شفاف زي التيشرتات التانية، بجد الماتيريال تستاهل كل جنيه اندفع فيها." }
]);

function initializeD8000ReviewsEngine() {
    const reviewsGrid = document.getElementById('dynamicReviewsGrid');
    if (reviewsGrid) {
        reviewsGrid.innerHTML = D8000_REVIEWS.map(rev => `
            <div class="review-card-eg">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${rev.avatar}</div>
                    <div class="reviewer-details">
                        <h5>${rev.name}</h5>
                        <div class="review-stars">★★★★★</div>
                    </div>
                    <span class="verified-badge">مشتري مؤكد</span>
                </div>
                <p class="review-text">"${rev.text}"</p>
            </div>
        `).join('');
        
        // إطلاق إشارة للـ script.js إن العناصر بقت موجودة في الصفحة
        document.dispatchEvent(new CustomEvent('reviewsEngineReady'));
    }
}

// تنفيذ الحقن فوراً
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeD8000ReviewsEngine);
} else {
    initializeD8000ReviewsEngine();
}

