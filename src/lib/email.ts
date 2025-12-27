import nodemailer from 'nodemailer';

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true pour 465, false pour autres ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Vérifier la configuration
export async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log('✅ Email configuration OK');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error);
    return false;
  }
}

// Envoyer un email de confirmation d'inscription
export async function sendConfirmationEmail(
  email: string,
  firstName: string | null,
  token: string,
  locale: string = 'fr'
) {
  const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/newsletter/confirm?token=${token}`;
  
  const subject = locale === 'fr' 
    ? '✉️ Confirmez votre inscription à la newsletter'
    : '✉️ Confirm your newsletter subscription';
  
  const htmlContent = locale === 'fr' ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #BE2722 0%, #a02020 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; background: #2E9B51; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
        .button:hover { background: #267d3f; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🙏 Archidiocèse de Yaoundé</h1>
          <p>Confirmation d'inscription à la newsletter</p>
        </div>
        <div class="content">
          <p>Bonjour ${firstName || 'cher(e) abonné(e)'},</p>
          <p>Merci de votre intérêt pour la newsletter de l'Archidiocèse de Yaoundé !</p>
          <p>Pour confirmer votre inscription et commencer à recevoir nos actualités, veuillez cliquer sur le bouton ci-dessous :</p>
          <div style="text-align: center;">
            <a href="${confirmUrl}" class="button">Confirmer mon inscription</a>
          </div>
          <p>Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :</p>
          <p style="word-break: break-all; color: #666; font-size: 12px;">${confirmUrl}</p>
          <p><strong>Ce lien est valable pendant 48 heures.</strong></p>
          <p>Si vous n'avez pas demandé cette inscription, vous pouvez ignorer cet email.</p>
          <p>Que Dieu vous bénisse ! 🙏</p>
        </div>
        <div class="footer">
          <p>Archidiocèse de Yaoundé - Cameroun</p>
          <p>© ${new Date().getFullYear()} Tous droits réservés</p>
        </div>
      </div>
    </body>
    </html>
  ` : `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #BE2722 0%, #a02020 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; background: #2E9B51; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
        .button:hover { background: #267d3f; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🙏 Archdiocese of Yaoundé</h1>
          <p>Newsletter Subscription Confirmation</p>
        </div>
        <div class="content">
          <p>Hello ${firstName || 'dear subscriber'},</p>
          <p>Thank you for your interest in the Archdiocese of Yaoundé newsletter!</p>
          <p>To confirm your subscription and start receiving our news, please click the button below:</p>
          <div style="text-align: center;">
            <a href="${confirmUrl}" class="button">Confirm my subscription</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666; font-size: 12px;">${confirmUrl}</p>
          <p><strong>This link is valid for 48 hours.</strong></p>
          <p>If you didn't request this subscription, you can ignore this email.</p>
          <p>God bless you! 🙏</p>
        </div>
        <div class="footer">
          <p>Archdiocese of Yaoundé - Cameroon</p>
          <p>© ${new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Archidiocèse de Yaoundé" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject,
      html: htmlContent,
    });
    console.log(`✅ Confirmation email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
    throw error;
  }
}

// Envoyer une newsletter à tous les abonnés actifs
export async function sendNewsletterEmail(
  subscribers: Array<{ email: string; firstName?: string; language: string }>,
  newsTitle: string,
  newsExcerpt: string,
  newsSlug: string,
  newsImage?: string
) {
  const results = {
    sent: 0,
    failed: 0,
    errors: [] as string[],
  };

  for (const subscriber of subscribers) {
    const locale = subscriber.language || 'fr';
    const newsUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/actualites/${newsSlug}`;
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/newsletter/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;
    
    const subject = locale === 'fr'
      ? `📰 Nouvelle actualité : ${newsTitle}`
      : `📰 New article: ${newsTitle}`;

    const htmlContent = locale === 'fr' ? `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #BE2722 0%, #a02020 100%); color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #ffffff; }
          .news-image { width: 100%; height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 20px; }
          .news-title { color: #BE2722; font-size: 24px; font-weight: bold; margin-bottom: 15px; }
          .news-excerpt { color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
          .button { display: inline-block; background: #2E9B51; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .button:hover { background: #267d3f; }
          .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          .unsubscribe { color: #999; text-decoration: none; font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🙏 Archidiocèse de Yaoundé</h1>
            <p>Newsletter - Nouvelles du diocèse</p>
          </div>
          <div class="content">
            <p>Bonjour ${subscriber.firstName || 'cher(e) abonné(e)'},</p>
            ${newsImage ? `<img src="${newsImage}" alt="${newsTitle}" class="news-image" />` : ''}
            <h2 class="news-title">${newsTitle}</h2>
            <p class="news-excerpt">${newsExcerpt}</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${newsUrl}" class="button">Lire l'article complet</a>
            </div>
            <p style="color: #999; font-size: 13px;">Que Dieu vous bénisse ! 🙏</p>
          </div>
          <div class="footer">
            <p>Archidiocèse de Yaoundé - Cameroun</p>
            <p>© ${new Date().getFullYear()} Tous droits réservés</p>
            <p><a href="${unsubscribeUrl}" class="unsubscribe">Se désabonner de la newsletter</a></p>
          </div>
        </div>
      </body>
      </html>
    ` : `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #BE2722 0%, #a02020 100%); color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #ffffff; }
          .news-image { width: 100%; height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 20px; }
          .news-title { color: #BE2722; font-size: 24px; font-weight: bold; margin-bottom: 15px; }
          .news-excerpt { color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
          .button { display: inline-block; background: #2E9B51; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .button:hover { background: #267d3f; }
          .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          .unsubscribe { color: #999; text-decoration: none; font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🙏 Archdiocese of Yaoundé</h1>
            <p>Newsletter - Diocese News</p>
          </div>
          <div class="content">
            <p>Hello ${subscriber.firstName || 'dear subscriber'},</p>
            ${newsImage ? `<img src="${newsImage}" alt="${newsTitle}" class="news-image" />` : ''}
            <h2 class="news-title">${newsTitle}</h2>
            <p class="news-excerpt">${newsExcerpt}</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${newsUrl}" class="button">Read full article</a>
            </div>
            <p style="color: #999; font-size: 13px;">God bless you! 🙏</p>
          </div>
          <div class="footer">
            <p>Archdiocese of Yaoundé - Cameroon</p>
            <p>© ${new Date().getFullYear()} All rights reserved</p>
            <p><a href="${unsubscribeUrl}" class="unsubscribe">Unsubscribe from newsletter</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await transporter.sendMail({
        from: `"Archidiocèse de Yaoundé" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: subscriber.email,
        subject,
        html: htmlContent,
      });
      results.sent++;
      console.log(`✅ Newsletter sent to ${subscriber.email}`);
    } catch (error) {
      results.failed++;
      results.errors.push(`${subscriber.email}: ${error}`);
      console.error(`❌ Error sending to ${subscriber.email}:`, error);
    }
  }

  return results;
}
