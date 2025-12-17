# Guide de déploiement Vercel

## ✅ Configuration effectuée

Votre projet est maintenant prêt pour Vercel. Les modifications suivantes ont été apportées :

### 1. package.json
- ✅ Suppression du flag `--turbopack` du script build (incompatible en production)

### 2. Fichiers créés
- ✅ `.env.example` : Template pour les variables d'environnement
- ✅ `vercel.json` : Configuration spécifique Vercel
- ✅ `.vercelignore` : Fichiers à exclure du déploiement

### 3. .gitignore
- ✅ Autorise le commit de `.env.example` pour la documentation

## 🚀 Étapes de déploiement

### Option 1 : Via l'interface Vercel (Recommandé)

1. **Créer un compte sur Vercel**
   - Allez sur https://vercel.com
   - Connectez-vous avec votre compte GitHub/GitLab/Bitbucket

2. **Importer votre projet**
   - Cliquez sur "New Project"
   - Importez votre repository Git

3. **Configurer les variables d'environnement**
   Dans les paramètres du projet, ajoutez :
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZnJlc2gtbWFtbWFsLTU4LmNsZXJrLmFjY291bnRzLmRldiQ
   CLERK_SECRET_KEY=sk_test_Ll9bOS38trGnCVN5M6B0aw6fTyPfgCvjm2UdcoIMK7
   CLERK_WEBHOOK_SECRET=whsec_2GWq8GCndo+wnTO1cslJDzorVMS1LVQ0
   MONGODB_URI=mongodb+srv://archidiocese:archidiocese123456@cluster0.0av3uwn.mongodb.net
   MONGODB_DB=archidiocese
   ADMIN_EMAILS=marcellinonana530@gmail.com
   ```

4. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez la fin du build (2-5 minutes)

### Option 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

## ⚙️ Configuration MongoDB

Assurez-vous que votre MongoDB Atlas est configuré pour :
1. Autoriser les connexions depuis n'importe quelle IP (0.0.0.0/0) pour Vercel
2. Ou ajouter les IPs de Vercel dans la whitelist

## 🔒 Sécurité

### ⚠️ Important pour les webhooks Clerk

Après le déploiement, mettez à jour vos webhooks Clerk :
1. Allez sur https://dashboard.clerk.com
2. Configurez l'endpoint webhook : `https://votre-domaine.vercel.app/api/webhooks/clerk`

## 🧪 Test local avant déploiement

```bash
# Nettoyer le cache
Remove-Item -Recurse -Force .next

# Build en mode production
npm run build

# Tester le build
npm run start
```

## 📊 Monitoring

Une fois déployé, Vercel vous fournira :
- URL de production : `https://votre-projet.vercel.app`
- Logs en temps réel
- Analytics de performance
- Aperçu automatique pour chaque PR

## 🔧 Configuration avancée

Si vous avez besoin de configurations spécifiques (régions, redirections, headers), modifiez le fichier `vercel.json`.

## ❓ Problèmes courants

### Build échoue
- Vérifiez les logs sur le dashboard Vercel
- Assurez-vous que toutes les variables d'environnement sont définies
- Testez `npm run build` localement

### Erreurs de connexion MongoDB
- Vérifiez la whitelist IP dans MongoDB Atlas
- Vérifiez la chaîne de connexion MONGODB_URI

### Erreurs Clerk
- Vérifiez les clés API Clerk
- Mettez à jour l'URL du webhook après le déploiement
