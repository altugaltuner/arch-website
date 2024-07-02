import React from 'react';
import "./AdminSentMessages.scss";

export const adminMessages = [
    { title: "Altın Kule Bina Statiği Güncellemesi", content: "Yapılan son statik hesaplamalar neticesinde, binanın temel yapısında bazı revizyonlar yapılması gerektiği ortaya çıkmıştır. Bu revizyonlar, binanın genel güvenliği ve dayanıklılığı açısından büyük önem arz etmektedir.", date: "05.12.2024" },

    { title: "Yeşil Vadi Projesi", content: "Betonarme yapılar için kullanılan malzemelerde kalite artırımı yapılacaktır. Özellikle kolon ve kirişlerde daha yüksek dayanıklılığa sahip beton türlerine geçilecektir.", date: "05.12.2024" },

    { title: "Zemin Etüdü", content: "Zemin etüdü çalışmalarında elde edilen yeni veriler ışığında, binanın oturacağı zeminde bazı iyileştirme çalışmaları yapılması planlanmıştır. Bu çalışmalar, yapının uzun vadede stabil kalmasını sağlayacaktır.", date: "05.12.2024" }
];

function AdminSentMessages() {
    return (
        <div className="admin-sent-messages-main">

        </div>
    );
}

export default AdminSentMessages;
