import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | RealDots Properties',
  description: 'Get in touch with RealDots Properties',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="property" style={{ padding: '100px 0', background: 'var(--cultured-2)' }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--white)', padding: '50px', borderRadius: '10px', boxShadow: 'var(--shadow-1)' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="h2 section-title" style={{ marginBottom: '10px' }}>Contact RealDots</h1>
                <p className="section-text" style={{ color: 'var(--cadet)' }}>
                  Have questions about a property or looking to list your own? Send us a message and we'll get back to you shortly.
                </p>
              </div>

              <ContactForm propertyId="general-inquiry" propertyTitle="General Inquiry" />

              <div style={{ marginTop: '50px', borderTop: '1px solid var(--alice-blue)', paddingTop: '30px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <ion-icon name="location-outline" style={{ fontSize: '30px', color: 'var(--orange-soda)' }}></ion-icon>
                  <h3 className="h4" style={{ margin: '10px 0 5px' }}>Visit Us</h3>
                  <address style={{ fontStyle: 'normal', color: 'var(--cadet)' }}>Lekki, Lagos</address>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <ion-icon name="call-outline" style={{ fontSize: '30px', color: 'var(--orange-soda)' }}></ion-icon>
                  <h3 className="h4" style={{ margin: '10px 0 5px' }}>Call Us</h3>
                  <a href="tel:+2348034382235" style={{ color: 'var(--cadet)' }}>+234 803 438 2235</a>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <ion-icon name="mail-outline" style={{ fontSize: '30px', color: 'var(--orange-soda)' }}></ion-icon>
                  <h3 className="h4" style={{ margin: '10px 0 5px' }}>Email Us</h3>
                  <a href="mailto:realdotsproperties@gmail.com" style={{ color: 'var(--cadet)' }}>realdotsproperties@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
