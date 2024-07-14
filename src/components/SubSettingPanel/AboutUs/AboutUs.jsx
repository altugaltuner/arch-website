import React from 'react';
import './AboutUs.scss';

const faqData = [
    {
        question: "Neden Ofisim?",
        answer: "Ofisim, kullanıcı dostu arayüzü ile her işletmenin kolayca adapte olabileceği bir yapıya sahiptir. Farklı sektörlere ve çalışma tarzlarına uyum sağlayacak şekilde özelleştirilebilir. Depolama seçenekleriyle ihtiyaca göre ayarlanabilir."
    },
    {
        question: "Proje ve Gruplara nasıl dahil olacağım?",
        answer: "Proje ve grupları oluşturan adminlere ulaşmanız ve onlardan kod talep etmeniz gerekir. Bu sayede giriş yapabilir ve gruba/projeye sadece gerekli kişilerin alınması sağlanabilir."
    },
    {
        question: "Proje ve Grup nasıl oluşturabilirim?",
        answer: "Proje ve gruplarınızı oluşturmak için admin yetkisine sahip olmanız gerekmektedir. Admin yetkisi ile projeler ve gruplar oluşturabilir, düzenleyebilir ve silebilirsiniz."
    },
    {
        question: "Proje dosyalarına erişim ve düzenleme ile ilgili ne bilmem gerekiyor?",
        answer: "Proje dosyalarına erişim ve düzenleme yetkisi, proje admini tarafından verilir. Proje admini, dosyaların kimler tarafından görüntüleneceğini ve kimler tarafından düzenleneceğini belirler. Eğer admin tarafından 'contributor' olarak atanmışsanız proje klasörlerine dosya yükleyebilir ve kendi yüklediğiniz dosyaları silebilirsiniz. Ancak 'spectator' olarak atanmışsanız sadece dosyaları görüntüleyebilir ve indirebilirsiniz. Dosya yükleyip silemezsiniz."
    },
    {
        question: "Daha fazla depolama alanına ihtiyacım var ise ne yapmam gerekir?",
        answer: "Daha fazla depolama alanına ihtiyacınız var ise, şirket yöneticiniz ile iletişime geçerek depolama alanınızı genişletmek için bizimle iletişime geçmesi için talepte bulunabilirsiniz. Şirketin aboneliği kapsamında bir depolama hizmeti sunmaktayız."
    }
];

const AboutUs = () => (
    <div className="personal-info-subsetting-column-aboutus">
        <div className="personal-info-subsetting-oneline">
            <h3 className="subsetting-header">Ofisim Proje Yönetim Sistemi</h3>
            <p className="subsetting-paragraph-special">İşinizi organize etmenize ve ekibinizle etkin bir şekilde işbirliği yapmanıza yardımcı olan, kullanımı kolay ve güçlü bir proje yönetim aracıdır. Ofisim sayesinde projelerinizi, dosyalarınızı ve ekip üyelerinizi tek bir platformda toplar, iş süreçlerinizi daha verimli hale getirir.</p>
        </div>
        <div className="personal-info-subsetting-oneline">
            <h3 className="subsetting-header">Sıkça Sorulan Sorular</h3>
            {faqData.map((faq, index) => (
                <div className='one-question-div' key={index}>
                    <p className="subsetting-paragraph-big">{faq.question}</p>
                    <p className="subsetting-paragraph">{faq.answer}</p>
                </div>
            ))}
        </div>
        <div className="personal-info-subsetting-oneline">
            <h3 className="subsetting-header">Bize Ulaşın</h3>
            <p className="subsetting-paragraph">altugaltuner6@gmail.com</p>
            <p className="subsetting-paragraph">linkedin.com/in/altug-altuner/</p>
            <p className="subsetting-paragraph">instagram/altugaltuner</p>
        </div>
    </div>
);

export default AboutUs;
