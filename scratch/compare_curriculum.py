import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

def set_cell_background(cell, color_hex):
    tcPr = cell._element.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), color_hex)
    tcPr.append(shd)

def generate_comparison_report():
    doc = Document()
    
    # Page setup
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    # Title
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title_run = title.add_run("AMOK İNGİLİZCE UYGULAMASI\nMÜFREDAT VE KİTAP İÇİNDEKİLER KARŞILAŞTIRMA RAPORU\n(TÜM BÖLÜMLER)")
    title_run.font.name = 'Arial'
    title_run.font.size = Pt(16)
    title_run.font.bold = True
    title_run.font.color.rgb = RGBColor(31, 78, 121) # Navy Blue

    doc.add_paragraph("\n")

    # Intro
    p_intro = doc.add_paragraph()
    p_intro.add_run(
        "Bu rapor, AMOK İngilizce Öğrenme Uygulaması'nın veri tabanında (data.js) yer alan tüm üniteler (Unit 1 - 30 ile ek kelime/zaman üniteleri) "
        "ile temel alınan kitabın orijinal içindekiler (TOC) listesinin detaylı bir karşılaştırmasını içermektedir. "
        "Analiz kapsamında uygulamadaki eksik, fazla ve sıralaması değişmiş olan ünite/derslerin tam listesi çıkarılmıştır."
    )
    p_intro.runs[0].font.name = 'Arial'
    p_intro.runs[0].font.size = Pt(11)

    # Summary Table Title
    h_summary = doc.add_paragraph()
    h_summary_run = h_summary.add_run("1. Ünite Bazlı Genel Karşılaştırma Tablosu")
    h_summary_run.font.name = 'Arial'
    h_summary_run.font.size = Pt(13)
    h_summary_run.font.bold = True
    h_summary_run.font.color.rgb = RGBColor(31, 78, 121)

    # Table
    table = doc.add_table(rows=1, cols=4)
    table.style = 'Light Shading Accent 1'
    
    headers = ["Kitap Bölümü (TOC)", "Uygulama Karşılığı", "Durum", "Detay / Açıklama"]
    for i, header in enumerate(headers):
        cell = table.cell(0, i)
        cell.text = ""
        p = cell.paragraphs[0]
        run = p.add_run(header)
        run.font.bold = True
        run.font.name = 'Arial'
        run.font.size = Pt(10)
        set_cell_background(cell, "1F4E79")
        run.font.color.rgb = RGBColor(255, 255, 255)

    comparison_data = [
        # Part 1
        ("I. Yapılar (A-D) (Sf. 1-6)", "Unit 6: Yapılar", "Sıralama Değişikliği", "Kitapta en başta yer alırken uygulamada pedagojik nedenlerle 6. üniteye alınmıştır."),
        ("II. İsim ve Edat (A-F) (Sf. 7-19)", "Unit 1: İsim ve Edat Yapıları", "Genişletilmiş", "Uygulamaya 'Giriş' dersi eklenmiş, kitaptaki II.A dersi E harfine kaydırılmıştır."),
        ("III. Fiil ve Edat (A-B) (Sf. 21-23)", "Unit 2: Fiil ve Edat Yapıları", "Sıralama Değişikliği", "Roma rakamı kaydırılmış, içerik birebir aynıdır."),
        ("IV. Özne + Fiil + Nesne (Sf. 32)", "Unit 7: Özne - Fiil + Nesne", "Sıralama Değişikliği", "Roma rakamı kaydırılmış, içerik birebir aynıdır."),
        ("V. There Yapısı (A-B) (Sf. 38-39)", "Unit 8: There Yapıları", "Sıralama Değişikliği", "Roma rakamı kaydırılmış, içerik birebir aynıdır."),
        ("VI. Soru Strüktürleri (A-C) (Sf. 49-53)", "Unit 9: Soru Yapıları", "Sıralama Değişikliği", "Evet/Hayır (Auxiliary) soruları, soru kelimeli soruların önüne alınmıştır."),
        ("VII. Edilgen Strüktürü (Sf. 55)", "Unit 10: Edilgen Yapısı", "Bölünmüş / Genişletilmiş", "Kitaptaki tek başlık uygulamada daha detaylı 4 alt derse bölünmüştür."),
        ("VIII. Edilgen Mastarı (Sf. 63)", "Unit 11: Edilgen Mastarı", "Bölünmüş / Genişletilmiş", "Kitaptaki tek başlık uygulamada daha detaylı 6 alt derse bölünmüştür."),
        ("IX. İsim Tamlaması (A-B) (Sf. 72-78)", "Unit 3: İsim Tamlaması", "Kısmi Eksik", "Kitapta IX.B altındaki 'Sıfat + İsim' yapısı uygulamada eksiktir."),
        ("X. Present Participle (A-B) (Sf. 81-84)", "Unit 4: Present Participle", "Sıralama Değişikliği", "Roma rakamı kaydırılmış, içerik birebir aynıdır."),
        ("XI. Past Participle (A-B) (Sf. 85-88)", "Unit 5: Past Participle", "Sıralama Değişikliği", "Roma rakamı kaydırılmış, içerik birebir aynıdır."),
        ("XII. Participle Takımları (A-C) (Sf. 88-95)", "Unit 12: Participle Yapıları", "Yeniden Yapılandırılmış", "Kitaptaki XII.A dersi uygulamada A ve B derslerine bölünmüş, XII.B ise C yapılmıştır."),
        ("XIII. Mastar (A-B) (Sf. 98-100)", "Unit 14: Mastar (Infinitive)", "Eşleşiyor", "İçerikler ve başlıklar birebir uyumludur."),
        ("XIV. Strüktürel 'It' (A-B) (Sf. 103-105)", "Unit 15: Yapısal It Cümlesi", "Eksik", "Kitaptaki XIV.B 'It + olmak + sıfat + mastar + nesnesi' uygulamada eksiktir."),
        ("XV. Maksad için Mastar (A-B) (Sf. 107-110)", "Unit 16: Maksat ve Amaç", "Genişletilmiş", "Uygulamaya akademik genişletilmiş cümleler içeren 'C' dersi eklenmiştir."),
        ("XVI. Fiil İsmi + Nesnesi (A-B) (Sf. 112-113)", "Unit 18: Fiil İsmi (Gerund)", "Eksik", "Kitaptaki XVI.B 'Edattan sonra gelen fiil (+ nesnesi)' uygulamada eksiktir."),
        ("XVII. Eylemsi / Kısaltmalar (A-C) (Sf. 116-120)", "Unit 19: Edattan Sonra Fiil", "Eşleşiyor", "Başlık adı sadeleştirilmiş, içerik birebir uyumludur."),
        ("XVIII. Soru Kelimeli Mastar (Sf. 124)", "Unit 20: Soru Kelimeli Mastar", "Bölünmüş / Genişletilmiş", "Kitaptaki tek başlık uygulamada daha detaylı 3 alt derse bölünmüştür."),
        
        # Part 2
        ("II. BÖLÜM I.A. Zaman (before, after, when)", "Unit 23 & 24 & 25", "Eşleşiyor / Genişletilmiş", "after/before Unit 23, when Unit 24, since/while/until Unit 25 olarak bölünmüştür."),
        ("II. BÖLÜM I.B. Sebeb (because, since, as)", "Unit 30 (Kısmen)", "Kısmen Eşleşiyor", "Neden ve Etki Yapıları (Unit 30) altında bağlaç olarak işlenmiştir."),
        ("II. BÖLÜM I.C. 'Although' (Sf. 194)", "Yok", "EKSİK İÇERİK", "Kitaptaki Aunque/Zıtlık bağlacı (Although) uygulamada ders olarak bulunmamaktadır."),
        ("II. BÖLÜM I.D. Derece (Sf. 198)", "Yok", "EKSİK İÇERİK", "Kitaptaki Derece zarf cümlecikleri uygulamada ders olarak bulunmamaktadır."),
        ("II. BÖLÜM I.E. Maksat (Sf. 201)", "Yok", "EKSİK İÇERİK", "Kitaptaki Maksat bildiren zarf cümlecikleri uygulamada ders olarak bulunmamaktadır."),
        ("II. BÖLÜM I.F. Netice (Sf. 204)", "Yok", "EKSİK İÇERİK", "Kitaptaki Sonuç (Result) bildiren zarf cümlecikleri uygulamada ders olarak bulunmamaktadır."),
        ("II. BÖLÜM I.G. Şart (if, unless) (Sf. 206-213)", "Yok", "EKSİK İÇERİK", "Kitaptaki Koşul (Conditional - if/unless) cümlecikleri uygulamada ders olarak bulunmamaktadır."),
        ("II. BÖLÜM II. Mukayese (A-C) (Sf. 216-222)", "Unit 26: Karşılaştırma Yapıları", "Eşleşiyor", "İçerik birebir eşleşmektedir (Ders 78, 79, 80)."),
        ("II. BÖLÜM III. Sıfat Cümleciği (a-g) (Sf. 224-239)", "Unit 27: Sıfat Cümleciği", "Eşleşiyor", "7 alt dersin tamamı birebir uyumlu şekilde yer almaktadır."),
        ("II. BÖLÜM IV. İsim Cümleciği (a-d) (Sf. 240-248)", "Unit 28: İsim Cümleciği", "Eşleşiyor", "4 alt dersin tamamı birebir uyumlu şekilde yer almaktadır."),
        ("II. BÖLÜM V. It + sıfat + that (Sf. 251)", "Unit 29 (Ders 92)", "Eşleşiyor", "It is apparent that... yapısı Ders 92 olarak yer alır."),
        ("II. BÖLÜM VI. It + sıfat + mastar + that (Sf. 254)", "Unit 29 (Ders 93)", "Eşleşiyor", "It is easy to assume that... yapısı Ders 93 olarak yer alır."),
        ("II. BÖLÜM VII. Neden/Etki Yapıları (Sf. 256)", "Unit 30: Neden ve Etki Yapıları", "Eşleşiyor", "6 alt dersin tamamı birebir uyumlu şekilde yer almaktadır.")
    ]

    for item in comparison_data:
        row_cells = table.add_row().cells
        for col_idx, text in enumerate(item):
            row_cells[col_idx].text = text
            p = row_cells[col_idx].paragraphs[0]
            run = p.runs[0]
            run.font.name = 'Arial'
            run.font.size = Pt(9.5)
            if "EKSİK" in text or "Kısmi Eksik" in text:
                run.font.bold = True
                run.font.color.rgb = RGBColor(192, 0, 0) # Red
            elif "Genişletilmiş" in text:
                run.font.bold = True
                run.font.color.rgb = RGBColor(0, 128, 0) # Green

    doc.add_paragraph("\n")

    # Section 2: Detailed Missing
    h_missing = doc.add_paragraph()
    h_missing_run = h_missing.add_run("2. Kitapta Olan Fakat Uygulamada Eksik Olan Konular")
    h_missing_run.font.name = 'Arial'
    h_missing_run.font.size = Pt(13)
    h_missing_run.font.bold = True
    h_missing_run.font.color.rgb = RGBColor(31, 78, 121)

    missing_items = [
        ("Bölüm IX.B: Sıfat + İsim (Sayfa 78)", "İsim Tamlamaları ünitesinin altında 'İsim + isim' ve 'İsim + isim + isim' dersleri varken, Sıfat + İsim tamlama yapısı uygulamaya aktarılmamıştır."),
        ("Bölüm XIV.B: It + olmak + sıfat + mastar + nesnesi (Sayfa 105)", "Yapısal It cümlesi öznesi ünitesinde nesneli yapı (It is important for us to learn...) uygulamada eksiktir."),
        ("Bölüm XVI.B: Edattan sonra gelen fiil (+ nesnesi) (Sayfa 113)", "Fiil ismi (Gerund) ünitesinin ikinci dersi olan edatlardan sonraki gerund yapısı (used for measuring vb.) uygulamada yer almamaktadır."),
        ("Bölüm II.I.C: 'Although' Zıtlık Cümlecikleri (Sayfa 194)", "Kitabın ikinci bölümündeki en önemli zıtlık bağlacı yapısı olan although dersi uygulamada bağımsız bir ders olarak eksiktir."),
        ("Bölüm II.I.D: Derece Zarf Cümlecikleri (Sayfa 198)", "Derece bildiren zarf cümleleri uygulamada ders olarak bulunmamaktadır."),
        ("Bölüm II.I.E: Maksat Zarf Cümlecikleri (Sayfa 201)", "Maksat/amaç bildiren bağlaçlı zarf cümleleri uygulamada ders olarak bulunmamaktadır."),
        ("Bölüm II.I.F: Netice Zarf Cümlecikleri (Sayfa 204)", "Sonuç bildiren bağlaçlı zarf cümleleri uygulamada ders olarak bulunmamaktadır."),
        ("Bölüm II.I.G: Şart Cümlecikleri (if, unless) (Sayfa 206-213)", "İngilizce dil bilgisinde çok kritik yer tutan Conditional (Koşul) zarf cümleleri (if / unless) uygulamada ders olarak tamamen eksiktir.")
    ]

    for m_title, m_desc in missing_items:
        p = doc.add_paragraph(style='List Bullet')
        run_t = p.add_run(m_title + "\n")
        run_t.font.bold = True
        run_t.font.name = 'Arial'
        run_t.font.size = Pt(11)
        run_t.font.color.rgb = RGBColor(192, 0, 0)
        
        run_d = p.add_run("Açıklama: " + m_desc)
        run_d.font.name = 'Arial'
        run_d.font.size = Pt(10)

    doc.add_paragraph("\n")

    # Section 3: Extra items
    h_extra = doc.add_paragraph()
    h_extra_run = h_extra.add_run("3. Kitapta Olmayıp Uygulamaya Ekstra Eklenen (Fazla) Konular")
    h_extra_run.font.name = 'Arial'
    h_extra_run.font.size = Pt(13)
    h_extra_run.font.bold = True
    h_extra_run.font.color.rgb = RGBColor(31, 78, 121)

    extra_items = [
        ("Unit 13: Ara Bölüm 1 - Tercih Bildiren Yapılar (Would rather) (Ders 41 - 44)", "Geniş ve geçmiş zamanda would rather kullanımı ve nesneli varyasyonları (16 alıştırma) uygulamaya özel eklenmiştir."),
        ("Unit 17: Ara Bölüm 2 - Rica ve İzin İsteme Yapıları (Ders 51 - 54)", "Would you / could you / do you mind if gibi günlük dilde sıkça kullanılan yapı dersleri uygulamaya dahil edilmiştir."),
        ("Unit 21: Ara Bölüm 3 - Before Bağlaçlı Cümle Yapıları (Ders 62 - 65)", "Kitapta küçük bir alt başlık olan before yapısı, 4 ders halinde genişletilerek bağımsız bir ünite yapılmıştır."),
        ("Unit 102: Zaman Zarfları ve Zaman Uyumu (Ders 100 - 102)", "Uygulama sonuna dil bilgisi süreçlerini pekiştirmek için eklenmiş zaman uyumu üniteleridir."),
        ("Unit 101: Zaman Uyumu: By the time, Since vs. (Ders 103 - 106)", "Zaman uyumunda by the time, since, it is time gibi kritik sınav kalıplarını içeren ekstra ünitedir."),
        ("Unit 103: Öbeksel Kipler (Phrasal Modals) (Ders 107 - 122)", "15 farklı öbeksel kipi (be likely to, be doomed to vb.) içeren 16 derslik devasa bir kelime ve yapı pekiştirme ünitesidir.")
    ]

    for e_title, e_desc in extra_items:
        p = doc.add_paragraph(style='List Bullet')
        run_t = p.add_run(e_title + "\n")
        run_t.font.bold = True
        run_t.font.name = 'Arial'
        run_t.font.size = Pt(11)
        run_t.font.color.rgb = RGBColor(0, 128, 0)
        
        run_d = p.add_run("Açıklama: " + e_desc)
        run_d.font.name = 'Arial'
        run_d.font.size = Pt(10)

    doc.save("/Users/faruknafizfazlioglu/Desktop/AMOK Müfredat Karşılaştırma Raporu.docx")
    print("Created comparison report: /Users/faruknafizfazlioglu/Desktop/AMOK Müfredat Karşılaştırma Raporu.docx")

if __name__ == "__main__":
    generate_comparison_report()
