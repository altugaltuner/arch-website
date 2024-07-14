import React from 'react';
import "./AdminSupportSettings.scss";

function AdminSupportSettings() {

    return (
        <div className="admin-support-settings-main">
            <div className='support-div'>
                <h2 className='support-div-header'>Geri Bildirim</h2>
                <p className='support-div-p'>Geri Bildirimleriniz İçin : altugaltuner6@gmail.com adresine email atabilirsiniz.</p>
            </div>
            <div className='support-div'>
                <h2 className='support-div-header'>Sıkça Sorulan Sorular</h2>
                <p className='support-div-question'>Ofisim Nedir?</p>
                <p className='support-div-answer'>Ofisim, işinizi organize etmenize ve ekibinizle etkin bir şekilde işbirliği yapmanıza yardımcı olan, kullanımı kolay ve güçlü bir proje yönetim aracıdır. Ofisim platformu, projelerinizi, dosyalarınızı ve ekip üyelerinizi tek bir yerde toplar, iş süreçlerinizi daha verimli hale getirir.</p>
                <p className='support-div-question'>Neden Ofisim?</p>
                <p className='support-div-answer'>Ofisim, kullanıcı dostu arayüzü ile her işletmenin kolayca adapte olabileceği bir yapıya sahiptir. Farklı sektörlere ve çalışma tarzlarına uyum sağlayacak şekilde özelleştirilebilir. Depolama seçenekleriyle ihtiyaca göre ayarlanabilir.</p>
                <p className='support-div-question'>Proje ve Gruplara nasıl dahil olacağım?</p>
                <p className='support-div-answer'>Proje ve grupları oluşturan adminlere ulaşmanız ve onlardan kod talep etmeniz gerekir. Bu sayede giriş yapabilir ve gruba/projeye sadece gerekli kişilerin alınması sağlanabilir. </p>
                <p className='support-div-question'>Proje ve Grup nasıl oluşturabilirim?</p>
                <p className='support-div-answer'>Proje ve gruplarınızı oluşturmak için admin yetkisine sahip olmanız gerekmektedir. Admin yetkisi ile projeler ve gruplar oluşturabilir, düzenleyebilir ve silebilirsiniz. </p>
                <p className='support-div-question'>Proje dosyalarına erişim ve düzenleme ile ilgili ne bilmem gerekiyor?</p>
                <p className='support-div-answer'>Proje dosyalarına erişim ve düzenleme yetkisi, proje admini tarafından verilir. Proje admini, dosyaların kimler tarafından görüntüleneceğini ve kimler tarafından düzenleneceğini belirler. Eğer admin tarafından "contributor" olarak atanmışsanız proje klasörlerine dosya yükleyebilir ve kendi yüklediğiniz dosyaları silebilirsiniz. Ancak "spectator" olarak atanmışsanız sadece dosyaları görüntüleyebilir ve indirebilirsiniz. Dosya yükleyip silemezsiniz.</p>
                <p className='support-div-question'>Daha fazla depolama alanına ihtiyacım var ise ne yapmam gerekir?</p>
                <p className='support-div-answer'>Daha fazla depolama alanına ihtiyacınız var ise, şirket yöneticiniz ile iletişime geçerek depolama alanınızı genişletmek için bizimle iletişime geçmesi için talepte bulunabilirsiniz. Şirketin aboneliği kapsamında bir depolama hizmeti sunmaktayız.</p>

            </div>
            <div className='support-div'>
                <h2 className='support-div-header'>Destek Talepleri</h2>
                <p className='support-div-p'>Geri Bildirimleriniz İçin : altugaltuner6@gmail.com adresine email atabilirsiniz.</p>
            </div>
        </div>
    );
}

export default AdminSupportSettings;