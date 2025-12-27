# Configuration de la Newsletter - Archidiocèse de Yaoundé

## 📧 Système de newsletter fonctionnel

Le système de newsletter a été complètement implémenté avec les fonctionnalités suivantes :

### ✅ Fonctionnalités implémentées

1. **Inscription à la newsletter**
   - Formulaire d'inscription avec email, prénom, nom
   - Envoi automatique d'email de confirmation
   - Double opt-in (confirmation requise)

2. **Confirmation d'inscription**
   - Email avec lien de confirmation (valide 48h)
   - Page de confirmation `/[locale]/newsletter/confirm`
   - Activation automatique après confirmation

3. **Désinscription**
   - Lien de désinscription dans chaque email
   - Page de désinscription `/[locale]/newsletter/unsubscribe`
   - Option GET et POST pour la flexibilité

4. **Envoi de newsletters**
   - Bouton admin pour envoyer une actualité aux abonnés
   - Emails HTML personnalisés par langue (FR/EN)
   - Statistiques d'envoi (réussis/échecs)
   - Envoi en masse à tous les abonnés actifs

### 📁 Fichiers créés/modifiés

#### Nouveaux fichiers :
- `src/lib/email.ts` - Service d'envoi d'emails (nodemailer)
- `src/app/api/newsletter/confirm/route.ts` - API confirmation
- `src/app/api/newsletter/unsubscribe/route.ts` - API désinscription
- `src/app/api/newsletter/send/route.ts` - API envoi newsletter
- `src/components/admin/SendNewsletterButton.tsx` - Composant admin
- `src/app/[locale]/newsletter/confirm/page.tsx` - Page confirmation
- `src/app/[locale]/newsletter/unsubscribe/page.tsx` - Page désinscription

#### Fichiers modifiés :
- `src/app/api/newsletter/subscribe/route.ts` - Ajout envoi email confirmation

### ⚙️ Configuration requise

Ajouter dans `.env` :

```env
# Configuration SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-application
SMTP_FROM=noreply@archidiocese-yaounde.org

# URL du site
NEXT_PUBLIC_BASE_URL=https://votre-domaine.com
```

### 🔧 Configuration Gmail (recommandé pour les tests)

1. Activer l'authentification à 2 facteurs sur votre compte Gmail
2. Générer un "mot de passe d'application" :
   - Google Account → Sécurité → Mots de passe d'application
3. Utiliser ce mot de passe dans `SMTP_PASS`

### 📮 Autres services SMTP recommandés

- **SendGrid** (gratuit jusqu'à 100 emails/jour)
- **Mailgun** (gratuit jusqu'à 5000 emails/mois)
- **Resend** (gratuit jusqu'à 3000 emails/mois)
- **Amazon SES** (très peu coûteux)

### 🚀 Utilisation

#### Pour les utilisateurs :
1. S'inscrire via le formulaire newsletter
2. Recevoir l'email de confirmation
3. Cliquer sur le lien de confirmation
4. Recevoir automatiquement les nouvelles actualités

#### Pour les admins :
1. Créer/publier une actualité
2. Utiliser le bouton "Envoyer la newsletter" dans l'admin
3. Les emails sont envoyés à tous les abonnés actifs
4. Voir les statistiques d'envoi

### 📊 Modèle de données

Le modèle `NewsletterSubscription` contient :
- `email` : Email de l'abonné (unique)
- `firstName`, `lastName` : Nom et prénom (optionnels)
- `isActive` : Statut actif/inactif
- `confirmed` : Email confirmé ou non
- `language` : Langue préférée (fr/en)
- `confirmationToken` : Token de confirmation
- `subscriptionDate`, `unsubscriptionDate` : Dates

### 🎨 Templates d'emails

Les emails sont en HTML responsive avec :
- En-tête avec logo de l'archidiocèse
- Contenu principal avec bouton CTA
- Pied de page avec lien de désinscription
- Support multilingue (FR/EN)

### 🔒 Sécurité

- Tokens de confirmation aléatoires
- Expiration des tokens après 48h
- Authentification admin requise pour l'envoi
- Protection contre le spam
- Double opt-in obligatoire

### 📝 TODO (améliorations futures)

- [ ] Planification d'envoi différé
- [ ] Segmentation des abonnés par catégorie
- [ ] Analytics d'ouverture des emails
- [ ] Templates d'emails personnalisables
- [ ] Export des abonnés en CSV
- [ ] Webhook d'intégration avec d'autres services
